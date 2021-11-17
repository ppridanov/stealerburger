import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import feedDetailsStyle from './feed-details.module.css';
import {useParams, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../types";

export  const FeedDetails: React.FC<any> = ({page}) => {
  const {id}: {id: string} = useParams();
  const {url} = useRouteMatch();
  const {orders} = useSelector((state: RootState) => state.feed);
  const {userOrders} = useSelector((state: RootState) => state.order);
  console.log(Number(id))
  const order = (url === 'feed') ? orders.find((item) => item.number === Number(id)) : userOrders.find((item) => item.number === Number(id));
  console.log(order);

  return (
    <div className={`${feedDetailsStyle.feed}`}>
      <p className={`text text_type_digits-default ${feedDetailsStyle.title}`}>#034533</p>
      <p className={`text text_type_main-medium  mt-10`}>Black Hole Singularity острый бургер</p>
      <p className={`text text_type_main-default text_color_success mt-2`}>Выполнен</p>
      <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
      <div className={`${feedDetailsStyle.ingredients} custom-scroll`}>
        <div className={`${feedDetailsStyle.ingredient}`}>
          <div className={`${feedDetailsStyle.ingredient__info}`}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
                 className={`${feedDetailsStyle.ingredient__image}`}/>
            <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <div className={`${feedDetailsStyle.ingredient}`}>
          <div className={`${feedDetailsStyle.ingredient__info}`}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
                 className={`${feedDetailsStyle.ingredient__image}`}/>
            <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <div className={`${feedDetailsStyle.ingredient}`}>
          <div className={`${feedDetailsStyle.ingredient__info}`}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
                 className={`${feedDetailsStyle.ingredient__image}`}/>
            <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <div className={`${feedDetailsStyle.ingredient}`}>
          <div className={`${feedDetailsStyle.ingredient__info}`}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
                 className={`${feedDetailsStyle.ingredient__image}`}/>
            <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <div className={`${feedDetailsStyle.ingredient}`}>
          <div className={`${feedDetailsStyle.ingredient__info}`}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
                 className={`${feedDetailsStyle.ingredient__image}`}/>
            <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`${feedDetailsStyle.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
      <div className={`${feedDetailsStyle.feed__footer}`}>
        <p className={`text text_type_main-default ml-4 text_color_inactive`}>Вчера, 13:50 i-GMT+3</p>
        <div className={`total__${feedDetailsStyle.ingredient__price}`}>
          <span className={`text text_type_digits-default mr-2`}>2 x 20</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}