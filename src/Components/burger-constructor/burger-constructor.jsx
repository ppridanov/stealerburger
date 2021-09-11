import React from 'react';
import cStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component{
    render() {
        return (
            <div className={`${cStyle.constr} mt-25`}>
                    <ul className={`${cStyle.list}`}>
                        <li className={cStyle.item}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={1255}
                                thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                            />
                        </li>
                        <li className={cStyle.item}>
                            <ul className={cStyle.list__scroll} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end" }}>
                                {this.props.ingredient.filter((item) => item.type !== 'bun').map((item) => {
                                    return (<li className={cStyle.item} key={item._id}>
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
                        <li className={cStyle.item}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i (низ)"
                                price={1255}
                                thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                            />
                        </li>
                    </ul>
                    <div className={`${cStyle.order} mr-8`}>
                        <div className={`${cStyle.total__price} mr-10`}>
                            <span className="text text_type_digits-medium">610</span>
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
