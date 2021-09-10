import React from 'react';
import cStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component{
    render() {
        const {image} = this.props;
        return (
            <div className={`${cStyle.constr} mt-25`}>
                    <ul className={`${cStyle.list} ml-4`}>
                        <div className="list__top">
                            <li className={cStyle.item}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text="Краторная булка N-200i (верх)"
                                    price={1255}
                                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                                />
                            </li>
                        </div>
                        <div className={cStyle.list__scroll} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end" }}>
                            {this.props.ingredient.filter((item) => item.type !== 'bun').map((item) => {
                                return (<li className={cStyle.item}>
                                    <DragIcon type={"primary"} />
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>)
                            })}
                        </div>
                        <div className="list__bottom">
                            <li className={cStyle.item}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text="Краторная булка N-200i (низ)"
                                    price={1255}
                                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                                />
                            </li>
                        </div>
                    </ul>
                    <div className="order">
                        <div className="total-price">
                            <span>610</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>
            </div>
        );
    }

}

export default BurgerConstructor;
