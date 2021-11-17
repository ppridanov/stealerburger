import React, {useEffect, useMemo} from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import feedDetailsStyle from './feed-details.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {getOrder} from "../../services/actions/orders";
import {getDate} from "../../utils/funcs";

export  const FeedDetails: React.FC<any> = ({orderId}) => {
  const {id}: {id: string} = useParams();
  const orderNumber = id || orderId;

  const dispatch = useDispatch();
  const {orders} = useSelector((state: RootState) => state.orderData);
  const {ingredients} = useSelector((state: RootState) => state.burgerIngredients);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrder(orderNumber));
    }
  }, [dispatch])

  const order = orders.find((item) => item.number === Number(orderNumber));

  const uniqueOrder = useMemo(() => {
    return Array.from(new Set(order?.ingredients));
  }, [order])

  const orderIngredients = useMemo(() => {
    return uniqueOrder.map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient);
    });
  }, [uniqueOrder])

  const price = useMemo(() => {
    return orderIngredients && orderIngredients.reduce((acc: any, item: any): any => {
      console.log(item)
      console.log(orderIngredients)
      if (item.type === 'bun') {
        acc += item.price * 2;
      } else {
        acc += item.price;
      }
      return acc;
    }, 0)
  }, [orderIngredients]);

  if (!orderNumber) return (<h1>Произошла ошибка</h1>)

  return (
    <>
      {orderIngredients.length === 0 && (<h1>Загрузка</h1>)}
      {order && orderIngredients.length > 0 && (
      <div className={`${feedDetailsStyle.feed}`}>
        <p className={`text text_type_digits-default ${feedDetailsStyle.title}`}>#{order?.number}</p>
        <p className={`text text_type_main-medium  mt-10`}>{order?.name}</p>
        <p className={`text text_type_main-default text_color_success mt-2`}>{order?.status === 'done' ? 'Выполнен' : 'В работе'}</p>
        <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
        <div className={`${feedDetailsStyle.ingredients} custom-scroll`}>
          {orderIngredients && orderIngredients.map((item, index) => {
            return (
              <div key={index} className={`${feedDetailsStyle.ingredient}`}>
                <div className={`${feedDetailsStyle.ingredient__info}`}>
                  <img src={item?.image_mobile} alt=""
                       className={`${feedDetailsStyle.ingredient__image}`}/>
                  <p className="text text_type_main-default ml-4">{item?.name}</p>
                </div>
                <div className={`${feedDetailsStyle.ingredient__price}`}>
                  <span className={`text text_type_digits-default mr-2`}>{item?.type === 'bun' ? 2 : 1} x {item?.price}</span>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
            )
          })}

        </div>
        <div className={`${feedDetailsStyle.feed__footer}`}>
          <p className={`text text_type_main-default ml-4 text_color_inactive`}>{getDate(order?.createdAt)}</p>
          <div className={`total__${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>{price}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    )}
    </>


  )
}