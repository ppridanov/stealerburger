import React from 'react';
import constructorStyle from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/data";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const handleOpenModal = () => {
        setModalIsOpen(!modalIsOpen);
    }
    return (
        <>
            <div className={`${constructorStyle.constr} mt-25`}>
                <ul className={`${constructorStyle.list}`}>
                    <li className={constructorStyle.item}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={1255}
                            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                        />
                    </li>
                    <li className={constructorStyle.item}>
                        <ul className={constructorStyle.list__scroll} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end" }}>
                            {props.ingredients.filter((item) => item.type !== 'bun').map((item) => {
                                return (<li _id={item._id} className={constructorStyle.item} key={item._id}>
                                    <div className="mr-2">
                                        <DragIcon type={"primary"} />
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
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={1255}
                            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                        />
                    </li>
                </ul>
                <div className={`${constructorStyle.order} mr-8`}>
                    <div className={`${constructorStyle.total__price} mr-10`}>
                        <span className="text text_type_digits-medium">610</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {modalIsOpen &&
            <Modal onClose={handleOpenModal}>
                <OrderDetails />
            </Modal>
            }
        </>

    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}
export default BurgerConstructor;
