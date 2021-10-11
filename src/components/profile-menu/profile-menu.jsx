import React from 'react';
import styles from "./profile-menu.module.css";
import {Link, NavLink} from "react-router-dom";

export function ProfileMenu() {
    return (
        <ul className={`${styles.profile__menu} mr-15`}>
            <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                <NavLink to={`/profile`} activeClassName={"text_color_primary"}>Профиль</NavLink>
            </li>
            <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                <Link to={`/profile/orders`}>История заказов</Link>
            </li>
            <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                <Link to={`/exit`}>Выход</Link>
            </li>
        </ul>
    )
}