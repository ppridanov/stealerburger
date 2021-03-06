import React, {useEffect} from 'react';
import orderDetailsStyles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import doneImage from '../../images/graphics.svg'

import { CLEAR_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from '../../hooks/store';

const OrderDetails = () => {
  const { orderNumber } = useSelector((state) => state.orderData)
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderNumber) {
        dispatch({
          type: CLEAR_CONSTRUCTOR
        })
      }
  }, [orderNumber, dispatch])

  return (
    <>
      {!orderNumber && (<h1>Отправка данных на сервер. Подождите...</h1>)}
      {orderNumber && (<div className={`${orderDetailsStyles.order} pb-15`}>
        <h3 className={`${orderDetailsStyles.title} text text_primary_ligth text_type_digits-large`}>
          {orderNumber}
        </h3>
        <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
        <div className={`${orderDetailsStyles.status} mt-15 mb-15`}>
          <img src={doneImage} alt="done" />
          <CheckMarkIcon type="primary" />
        </div>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной
          станции</p>
      </div>)
      }
    </>
  );
}

export default OrderDetails;