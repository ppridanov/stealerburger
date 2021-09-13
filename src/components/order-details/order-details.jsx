import React from 'react';
import modalStyles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import doneImage from '../../images/graphics.svg'
function OrderDetails() {
    return(
        <div className={`${modalStyles.order} pt-30 pb-30`}>
            <h3 className={`${modalStyles.title} text text_primary_ligth text_type_digits-large`}>
                034536
            </h3>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <div className={`${modalStyles.status} mt-15 mb-15`}>
                <img src={doneImage} alt="done" className={modalStyles.status__image}/>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default  OrderDetails;