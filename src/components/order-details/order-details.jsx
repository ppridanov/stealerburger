import React from 'react';
import modalStyles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
    return(
        <div class={`${modalStyles.order}`}>
            <h3 className={`${modalStyles.title} text text_primary_ligth text_type_digits-large mt-30`}>
                034536
            </h3>
            <p className={modalStyles.subtitle}>идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p>Ваш заказ начали готовить</p>
            <p>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default  OrderDetails;