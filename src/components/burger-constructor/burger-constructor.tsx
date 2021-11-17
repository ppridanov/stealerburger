import React, {useMemo} from 'react';
import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR
} from "../../services/actions/burger-constructor";
import {CLEAR_ORDER_NUMBER, postOrder} from "../../services/actions/orders";

import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';

import BurgerConstructorIngredient from "../burger-constructor-item/burger-constructor-item";
import {useHistory} from "react-router-dom";
import {RootState, TConstructorIngredient} from '../../types';

const BurgerConstructor: React.FC = () => {
    const {ingredients, bun, orderNumber, isAuth} = useSelector((state: RootState) => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        orderNumber: state.orderData.orderNumber,
        isAuth: state.userData.isAuth
    }));
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(orderNumber)
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
    const moveIngredient = (ingredient: TConstructorIngredient) => {
        dispatch({
            type: ingredient.type === 'bun' ? ADD_BUN_TO_CONSTRUCTOR : ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: {...ingredient, uuid: uuidv4()}
        })
    }
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item:TConstructorIngredient) {
            moveIngredient(item);
        }
    });

    const handleOpenModal = () => {
        if (!bun) {
            return alert('Выберите булку');
        }
        if (!isAuth) {
            history.push('/login');
        }
        //Здесь я не понял как мне две булки отправлять или же она одна?
        const idsArr = [...ingredients.map((item: TConstructorIngredient) => item._id), bun._id, bun._id];
        dispatch(postOrder(idsArr));
        setModalIsOpen(true)
    }

    const handleClose = () => {
        dispatch({
            type: CLEAR_ORDER_NUMBER
        })
        dispatch({
            type: CLEAR_CONSTRUCTOR
        })
        setModalIsOpen(false);
    }

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc: number, item: TConstructorIngredient) => {
            return item.price + acc;
        }, 0);
        bun && (price += bun.price * 2);
        return price;
    }, [ingredients, bun])

    return (
        <>
            <div ref={dropTarget} className={`${constructorStyle.constr} mt-25`}>
                <ul className={`${constructorStyle.list}`}>
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>

                        {bun ? (
                            <ConstructorElement
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                                type="top"
                                isLocked={true}
                            />
                        ) : (
                            <div className={`${constructorStyle.nobun_top} text text_type_main-default`}>
                                <p>Выберите булочку</p>
                            </div>
                        )}
                    </li>
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
                        <ul className={constructorStyle.list__scroll}
                            style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
                            {ingredients.map((item: TConstructorIngredient, idx: number) => {
                                return <BurgerConstructorIngredient {...item} index={idx} key={item.uuid}/>
                            })}
                        </ul>
                    </li>
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
                        {bun ? (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={`${constructorStyle.nobun_bottom} text text_type_main-default`}>
                                <p>Выберите булочку</p>
                            </div>
                        )}
                    </li>
                </ul>
                {(ingredients || bun) && (
                    <div className={`${constructorStyle.order} mr-8`}>
                        <div className={`${constructorStyle.total__price} mr-10`}>
                            <span className="text text_type_digits-medium">{totalPrice}</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <Button type="primary" size="large" onClick={handleOpenModal}>
                            Оформить заказ
                        </Button>
                    </div>
                )}
            </div>
            {modalIsOpen && orderNumber && (
                <Modal onClose={handleClose}>
                    <OrderDetails id={orderNumber}/>
                </Modal>
            )}
        </>

    )
}

export default BurgerConstructor;
