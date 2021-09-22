import React from 'react';
import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientsPropTypes} from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";

function BurgerConstructor() {
    const {ingredients} = React.useContext(BurgerConstructorContext);
    console.log(ingredients)
    const chosenBun = ingredients.find(item => item.type === 'bun');
    const filteredIngredients = ingredients.filter(item => item.type !== 'bun');
    const chosenIngredients = filteredIngredients.concat(chosenBun);
    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const totalPrice = ingredients.length !== 0 && chosenIngredients.reduce((acc, item) => {
        if (item.type === 'bun') {
            return item.price * 2 + acc;
        }
        return item.price + acc;
    }, 0)
    console.log(totalPrice)
    const handleOpenModal = () => {
        setModalIsOpen(!modalIsOpen);
    }
    return (
        <>
            <div className={`${constructorStyle.constr} mt-25`}>
                <ul className={`${constructorStyle.list}`}>
                    <li className={constructorStyle.item}>
                        {chosenBun && (
                            <ConstructorElement
                                text={`${chosenBun.name} (верх)`}
                                price={chosenBun.price}
                                thumbnail={chosenBun.image}
                                type="top"
                                isLocked={true}
                            />)
                        }
                    </li>
                    <li className={constructorStyle.item}>
                        <ul className={constructorStyle.list__scroll}
                            style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
                            {filteredIngredients.map((item) => {
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
                        {chosenBun && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${chosenBun.name} (низ)`}
                                price={chosenBun.price}
                                thumbnail={chosenBun.image}
                            />
                        )}
                    </li>
                </ul>
                <div className={`${constructorStyle.order} mr-8`}>
                    <div className={`${constructorStyle.total__price} mr-10`}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {modalIsOpen &&
            <Modal onClose={handleOpenModal}>
                <OrderDetails/>
            </Modal>
            }
        </>

    )
}

export default BurgerConstructor;
