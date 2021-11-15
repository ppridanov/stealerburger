import React from 'react';
import feedStyles from "../../pages/feed/feed.module.css";
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useRouteMatch} from "react-router-dom";
import {TLocationState} from "../../types";

export const FeedItem = (props: any) => {
  const location = useLocation<TLocationState>();
  const { url } = useRouteMatch();
  const _id = '123';
  return (
    <Link to={{pathname: `${url}/${_id}`, state: {background: location}}}
          className={`${feedStyles.feed} mt-4`}
          onClick={props.openModal}>
      <div className={`${feedStyles.feed__top}`}>
        <p className={`text text_type_digits-default`}>#034535</p>
        <p className={`text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div className="feed__center">
        <h3 className={`text text_type_digits-default mt-6 mb-6`}>Death Star Starship Main бургер</h3>
      </div>
      <div className={`${feedStyles.feed__bottom}`}>
        <div className={`${feedStyles.ingredients}`} style={{position: "relative"}}>
          <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
               className={`${feedStyles.ingredient}`}/>
          <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
               className={`${feedStyles.ingredient}`}/>
          <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
               className={`${feedStyles.ingredient}`}/>
          <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""
               className={`${feedStyles.ingredient}`}/>
        </div>
        <div className={`${constructorStyle.total__price} mr-10`}>
          <span className="text text_type_digits-medium">123</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>
  )
}