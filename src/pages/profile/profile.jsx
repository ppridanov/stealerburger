import React, {useState} from "react";
import AppHeader from "../../components/app-header/app-header";
import styles from "./profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {postRegister, postResetPassword} from "../../services/actions/users";
import {useDispatch} from "react-redux";

export function Profile() {
    return (
        <div className="container">
            <div className="profile__container">
                <div className="profile__menu">
                    <div className="profile__links">
                        <Link to={`/profile`}>Профиль</Link>
                        <Link to={`/profile/orders`}>История заказов</Link>
                        <Link to={`/exit`}>Выход</Link>
                    </div>
                </div>
                <div className="profile__content"></div>
            </div>
        </div>
    )
}