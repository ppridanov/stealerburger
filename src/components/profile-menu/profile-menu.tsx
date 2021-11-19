import React from 'react';
import styles from "./profile-menu.module.css";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { postLogout } from "../../services/actions/users";
import { useDispatch } from "react-redux";

export function ProfileMenu() {
  const dispatch = useDispatch();

  const isProfileOrders = !!useRouteMatch('/profile/orders');

  const history = useHistory();

  const handleClick = () => {
    dispatch(postLogout(history));
  }

  return (
    <div className={`${styles.profile__cont} mt-30`} >
      <ul className={`${styles.profile__menu} mr-15`}>
        <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
          <NavLink to={`/profile`} exact={true} activeClassName={"text_color_primary"}>Профиль</NavLink>
        </li>
        <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
          <NavLink to={`/profile/orders`} activeClassName={"text_color_primary"}>История заказов</NavLink>
        </li>
        <li onClick={handleClick} className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
          <NavLink exact={true} to={`/login`} activeClassName={"text_color_primary"}>Выход</NavLink>
        </li>
      </ul>
      <p className={`${styles.profile__menuSubtitle} mt-20 text text_type_main-default text_color_inactive`}>
        {isProfileOrders ?
          ('В этом разделе вы можете просмотреть свою историю заказов')
          :
          ('В этом разделе вы можете изменить свои персональные данные')
        }
      </p>
    </div>
  );
}