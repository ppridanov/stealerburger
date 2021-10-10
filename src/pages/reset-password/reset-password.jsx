import React from "react";
import AppHeader from "../../components/app-header/app-header";
import styles from "./reset-password.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ResetPassword() {
    return (
        <div>
            <AppHeader/>
            <main>
                <div className="container">
                    <div className={styles.login__container}>
                        <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
                        <form className="form" action="">
                            <div className="form__item mb-6">
                                <Input
                                    type={"password"}
                                    icon={"ShowIcon"}
                                    size={"default"}
                                    placeholder="Введите новый пароль"
                                    error={false}
                                    errorText={"Ошибка какая то"}
                                    name={"password"}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__item mb-6">
                                <Input
                                    type={"text"}
                                    size={"default"}
                                    placeholder="Введите код из письма"
                                    error={false}
                                    errorText={"Ошибка какая то"}
                                    name={"password"}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={`${styles.form__button} mb-20`}>
                                <Button type={"primary"} size="medium">Войти</Button>
                            </div>
                        </form>
                        <div className={styles.login__links}>
                            <p className="text text_type_main-default text_color_inactive mb-4">
                                Уже зарегистрированы? <Link to={`/login`}
                                                            className="text text_color_accent">Войти</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}