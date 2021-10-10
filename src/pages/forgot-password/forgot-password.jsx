import React from "react";
import styles from "./forgot-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ForgotPassword() {
    return (
        <div className="container">
            <div className={styles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            placeholder="Укажите E-mail"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    <div className={`${styles.form__button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={styles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспомнили пароль? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}