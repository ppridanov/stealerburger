import React from 'react';
import styles from "./profile-menu.module.css";
import {Link, NavLink, useHistory} from "react-router-dom";
import {postLogout} from "../../services/actions/users";
import {useDispatch} from "react-redux";

export function ProfileMenu() {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = () => {
        dispatch(postLogout(history));
    }
    return (
        <div className={styles.profile__cont}>
            <ul className={`${styles.profile__menu} mr-15`}>
                <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/profile`} activeClassName={"text_color_primary"}>Профиль</NavLink>
                </li>
                <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <Link to={`/profile/orders`}>История заказов</Link>
                </li>
                <li onClick={handleClick} className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <a href={"#exit"}>Выход</a>
                </li>
            </ul>
            <p className={`${styles.profile__menuSubtitle} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

    )
}