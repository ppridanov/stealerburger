import React, {FC, SyntheticEvent, useMemo} from 'react';
import feedStyles from "../../pages/feed/feed.module.css";
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useRouteMatch} from "react-router-dom";
import {RootState, TLocationState} from "../../types";
import {useSelector} from "react-redux";
import {getDate} from "../../utils/funcs";
import {TFeedItem} from "../../types/user";

type TFeedItemProps = {
  data?: TFeedItem;
  openModal: (e: SyntheticEvent) => void;
}

export const FeedItem: FC<TFeedItemProps> = (props: any) => {
  const location = useLocation<TLocationState>();
  const { url } = useRouteMatch();

  const {ingredients} = useSelector((state: RootState) => state.burgerIngredients);
  const _id = props.data.number;

  const uniqueOrderIngredients = Array.from(new Set(props.data.ingredients));

  const orderIngredients = uniqueOrderIngredients.map((ingredient) => {
    return ingredients.find((item) => item._id === ingredient);
  });

  const totalPrice = useMemo(() => {
    let price = orderIngredients.reduce((acc: number, item: any) => {
      if (item.bun) {
        acc += item.price * 2
      }
      return item.price + acc;
    }, 0);
    return price;
  }, [orderIngredients]);

  return (
    <Link to={{pathname: `${url}/${_id}`, state: {background: location}}}
          className={`${feedStyles.feed} mt-4`}
          onClick={props.openModal}>
      <div className={`${feedStyles.feed__top}`}>
        <p className={`text text_type_digits-default`}>#{props.data.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{getDate(props.data.createdAt)}</p>
      </div>
      <div className="feed__center">
        <h3 className={`text text_type_digits-default mt-6 mb-6`}>{props.data.name}</h3>
      </div>
      <div className={`${feedStyles.feed__bottom}`}>
        <div className={`${feedStyles.ingredients}`} style={{position: "relative"}}>
          {orderIngredients.slice(0, 5).map((item, index) => (<img src={item?.image_mobile} alt="" className={`${feedStyles.ingredient}`} key={index} style={{zIndex: 5-index}} />))}
          {orderIngredients.length > 4 && (<span className={`${feedStyles.more} text text_type_main-default`}>+{orderIngredients.length - 4}</span>)}
        </div>
        <div className={`${constructorStyle.total__price} mr-10`}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>
  )
}