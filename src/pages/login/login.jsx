import React from "react";
import AppHeader from "../../components/app-header/app-header";
import styles from "./login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function Login() {
    return (
        <div>
            <AppHeader />
            <main>
                <div className="container">
                    <div className={styles.login__container}>
                        <h3 className="text text_type_main-medium mb-6">Вход</h3>
                        <form className="form" action="">
                            <div className="form__item mb-6">
                                <Input placeholder="E-mail" />
                            </div>
                            <div className="form__item mb-6">
                                <Input type={"password"} icon={"ShowIcon"} size={"default"} placeholder="Пароль"/>
                            </div>
                            <div className={`${styles.form__button} mb-20`}>
                                <Button type={"primary"} size="medium">Войти</Button>
                            </div>
                        </form>
                        <div className={styles.login__links}>
                            <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь? <Link to={"/register"} className="text text_color_accent">Зарегистрироваться</Link></p>
                            <p className="text text_type_main-default text_color_inactive">Забыли пароль? <a className="text text_color_accent">Восстановить пароль</a></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}