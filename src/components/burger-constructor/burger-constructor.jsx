import React, {useMemo} from 'react';
import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {postOrderURL} from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import {sendData} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from "../../services/actions/burger-constructor";

import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';

import BurgerConstructorIngredient from "../burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
    const {ingredients, bun} = useSelector(state => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun
    }));
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const moveIngredient = (ingredient) => {
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
        drop(item) {
            moveIngredient(item);
        }
    });
    const handleOpenModal = () => {
        if (!bun) {
            alert('Выберите булку');
            return;
        }

        const idsArray =
        console.log(idsArray);
    }

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc, item) => {
            return item.price + acc;
        }, 0);
        price += bun && bun.price * 2;
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
                            {ingredients.map((item) => {
                                return <BurgerConstructorIngredient {...item} key={item.uuid}/>
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
            {modalIsOpen &&
            <Modal onClose={handleOpenModal}>
                <OrderDetails id={123}/>
            </Modal>
            }
        </>

    )
}

export default BurgerConstructor;
