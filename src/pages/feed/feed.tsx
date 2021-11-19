import React, { useEffect } from 'react';
import feedStyles from './feed.module.css';
import { FeedItem } from "../../components/feed-item/feed-item";
import { orderWsConnectionClosed, orderWsConnectionStart } from "../../services/actions/orders";
import { wsURL } from "../../utils/constants";
import { useDispatch, useSelector } from '../../hooks/store';

export const Feed = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday, wsConnected, wsError } = useSelector((state) => state.orderData);

  useEffect(() => {
    dispatch(orderWsConnectionStart(`${wsURL}/all`));
    return () => {
      dispatch(orderWsConnectionClosed());
    }
  }, [dispatch])

  return (
    <>
      {wsError && <h1 style={{textAlign: "center"}}>Произошла ошибка</h1>}
      {!wsError && wsConnected && orders && orders.length === 0 && (<h1 style={{ textAlign: "center" }}>Идет загрузка</h1>)}
      {(total && totalToday && orders.length !== 0) ? (
        <div className={`container pl-5 pr-5`}>
          <div className={`main__container`}>
            <div className={feedStyles.feeds__container}>
              <h1 className="text text_type_main-large mt-10 text_colo">Лента заказов</h1>
              <div className={`${feedStyles.feeds} mt-5 custom-scroll`}>
                {orders.map((item, index) => <FeedItem data={item} key={index} />)}
              </div>
            </div>
            <div className={`${feedStyles.feed__info}`}>
              <div className={feedStyles.feed__board}>
                <div className={feedStyles.feed__boardLeft}>
                  <p className={`text text_type_main-medium mb-6`}>Готовы</p>
                  <ul className={feedStyles.feed__completed}>
                    {orders
                      .filter((item) => item.status === 'done')
                      .map((item, index) => (<li className={`text text_type_digits-small text_color_success`} key={index}>{item.number}</li>))
                    }
                  </ul>
                </div>
                <div className={feedStyles.feed__boardRight}>
                  <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                  <ul className={feedStyles.feed__inProgress}>
                    {orders
                      .filter((item) => item.status === 'pending')
                      .map((item, index) => (<li className={`text text_type_digits-small text_color_success`} key={index}>{item.number}</li>))
                    }
                  </ul>
                </div>

              </div>
              <div className="feed__allCount mt-15">
                <p className={`text text_type_main-default`}>Выполнено за все время:</p>
                <p className={`text text_type_digits-large text_color_primary ${feedStyles.feed__mainTitle}`}>{total}</p>
              </div>
              <div className="feed__todayCount mt-15">
                <p className={`text text_type_main-default`}>Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large  text_color_primary ${feedStyles.feed__mainTitle}`}>{totalToday}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}