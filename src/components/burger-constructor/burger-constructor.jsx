import React, {useMemo} from 'react';
import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {postOrderURL} from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import {sendData} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT_TO_CONSTRUCTOR} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";

function BurgerConstructor() {
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const dispatch = useDispatch();
    // const totalPrice = useMemo(() => {
    //     ingredients.length !== 0 && bun.length !== 0 && ingredients.concat(bun).reduce((acc, item) => {
    //         return item.type === 'bun' ? item.price * 2 + acc : item.price + acc;
    //     }, 0)
    // }, [ingredients, bun])

    const moveIngredient = (item) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: item
        })
        console.log(ingredients)
    }
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            item.type === 'bun' ? console.log('wtf') : moveIngredient(item);
        }
    });

    const handleOpenModal = () => {
        const idsArray = ingredients.map(item => item._id);

    }
    return (
        <>
            <div ref={dropTarget} className={`${constructorStyle.constr} mt-25`}>
                <ul className={`${constructorStyle.list}`}>
                    <li className={constructorStyle.item}>

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
                    <li className={constructorStyle.item}>
                        <ul className={constructorStyle.list__scroll}
                            style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
                            {ingredients.map((item) => {
                                return (<li _id={item._id} className={constructorStyle.item} key={item._id}>
                                    <div className="mr-2">
                                        <DragIcon type={"primary"}/>
                                    </div>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>)
                            })}
                        </ul>
                    </li>
                    <li className={constructorStyle.item}>
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
                {ingredients.length > 1 && (
                    <div className={`${constructorStyle.order} mr-8`}>
                        <div className={`${constructorStyle.total__price} mr-10`}>
                            {/*<span className="text text_type_digits-medium">{totalPrice}</span>*/}
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
                <OrderDetails id={123} />
            </Modal>
            }
        </>

    )
}

export default BurgerConstructor;
