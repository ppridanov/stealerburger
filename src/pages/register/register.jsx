import React from "react";
import AppHeader from "../../components/app-header/app-header";
import styles from "./register.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

export function Register() {
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
                                    placeholder="Имя"
                                    error={false}
                                    name={"name"}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                    }}
                                    errorText={'Ошибка какая то'}
                                    size={"default"}
                                    type={"text"}
                                />
                            </div>
                            <div className="form__item mb-6">
                                <Input
                                    placeholder="E-mail"
                                    error={false}
                                    errorText={"Ошибка какая то"}
                                    name={"email"}
                                    size={"default"}
                                    type={"email"}
                                    onChange={(e) => console.log(e.target.value)}
                                />
                            </div>
                            <div className="form__item mb-6">
                                <Input
                                    type={"password"}
                                    icon={"ShowIcon"}
                                    size={"default"}
                                    placeholder="Пароль"
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
                            <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый
                                пользователь? <a className="text text_color_accent">Зарегистрироваться</a></p>
                            <p className="text text_type_main-default text_color_inactive">Забыли пароль? <a
                                className="text text_color_accent">Восстановить пароль</a></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}