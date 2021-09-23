import React from 'react';
import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {postOrderURL} from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import {sendData} from "../../utils/api";

function BurgerConstructor() {
    // const {ingredients} = React.useContext(BurgerConstructorContext);
    //
    // const [modalIsOpen, setModalIsOpen] = React.useState(false)
    // const [orderId, setOrderId] = React.useState(0);
    //
    // const chosenBun = ingredients.find(item => item.type === 'bun');
    // const filteredIngredients = ingredients.filter(item => item.type !== 'bun');
    // const chosenIngredients = filteredIngredients.concat(chosenBun);
    //
    // const totalPrice = ingredients.length !== 0 && chosenIngredients.reduce((acc, item) => {
    //     if (item.type === 'bun') {
    //         return item.price * 2 + acc;
    //     }
    //     return item.price + acc;
    // }, 0)
    //
    //
    // const handleOpenModal = () => {
    //     const idsArray = chosenIngredients.map(item => item._id);
    //     sendData({
    //         url: postOrderURL,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: {ingredients: idsArray}
    //     })
    //         .then((res) => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             throw new Error(`Something wrong: ${res.status}`)
    //         })
    //         .then(data => setOrderId(data.order.number));
    //     setModalIsOpen(!modalIsOpen);
    // }
    return (
        <div>123</div>
    )
    //     <>
    //         <div className={`${constructorStyle.constr} mt-25`}>
    //             <ul className={`${constructorStyle.list}`}>
    //                 <li className={constructorStyle.item}>
    //                     {chosenBun && (
    //                         <ConstructorElement
    //                             text={`${chosenBun.name} (верх)`}
    //                             price={chosenBun.price}
    //                             thumbnail={chosenBun.image}
    //                             type="top"
    //                             isLocked={true}
    //                         />)
    //                     }
    //                 </li>
    //                 <li className={constructorStyle.item}>
    //                     <ul className={constructorStyle.list__scroll}
    //                         style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
    //                         {filteredIngredients.map((item) => {
    //                             return (<li _id={item._id} className={constructorStyle.item} key={item._id}>
    //                                 <div className="mr-2">
    //                                     <DragIcon type={"primary"}/>
    //                                 </div>
    //                                 <ConstructorElement
    //                                     text={item.name}
    //                                     price={item.price}
    //                                     thumbnail={item.image}
    //                                 />
    //                             </li>)
    //                         })}
    //                     </ul>
    //                 </li>
    //                 <li className={constructorStyle.item}>
    //                     {chosenBun && (
    //                         <ConstructorElement
    //                             type="bottom"
    //                             isLocked={true}
    //                             text={`${chosenBun.name} (низ)`}
    //                             price={chosenBun.price}
    //                             thumbnail={chosenBun.image}
    //                         />
    //                     )}
    //                 </li>
    //             </ul>
    //             <div className={`${constructorStyle.order} mr-8`}>
    //                 <div className={`${constructorStyle.total__price} mr-10`}>
    //                     <span className="text text_type_digits-medium">{totalPrice}</span>
    //                     <CurrencyIcon type="primary"/>
    //                 </div>
    //                 <Button type="primary" size="large" onClick={handleOpenModal}>
    //                     Оформить заказ
    //                 </Button>
    //             </div>
    //         </div>
    //         {modalIsOpen &&
    //         <Modal onClose={handleOpenModal}>
    //             <OrderDetails id={orderId}/>
    //         </Modal>
    //         }
    //     </>
    //
    // )
}

export default BurgerConstructor;
