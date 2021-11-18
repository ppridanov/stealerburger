import React, { useEffect, useMemo } from 'react';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedDetailsStyle from './feed-details.module.css';
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/orders";
import { getDate } from "../../utils/funcs";
import { useDispatch, useSelector } from '../../hooks/store';

export const FeedDetails = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderData);
  const { ingredients } = useSelector((state) => state.burgerIngredients);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrder(id));
    }
  }, [dispatch, orders, id])

  const order = orders && orders.find((item) => item.number === Number(id));

  const orderIngredients = useMemo(() => {
    return Array.from(new Set(order?.ingredients)).map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient);
    });;
  }, [order, ingredients])

  const price = useMemo(() => {
    return orderIngredients.reduce((acc, item) => {
      if (item && item.type === 'bun') {
        acc += item && item.price * 2;
      } else if (item) {
        acc += item && item.price;
      }
      return acc;
    }, 0)
  }, [orderIngredients]);

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
                      className={`${feedDetailsStyle.ingredient__image}`} />
                    <p className="text text_type_main-default ml-4">{item?.name}</p>
                  </div>
                  <div className={`${feedDetailsStyle.ingredient__price}`}>
                    <span className={`text text_type_digits-default mr-2`}>{item?.type === 'bun' ? 2 : 1} x {item?.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              )
            })}

          </div>
          <div className={`${feedDetailsStyle.feed__footer}`}>
            <p className={`text text_type_main-default ml-4 text_color_inactive`}>{getDate(order?.createdAt)}</p>
            <div className={`total__${feedDetailsStyle.ingredient__price}`}>
              <span className={`text text_type_digits-default mr-2`}>{price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}