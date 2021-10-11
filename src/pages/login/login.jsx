import React, {useState} from "react";
import styles from "./login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";

export function Login() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData);
    }
    return (
        <div className="container">
            <div className={styles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Вход</h3>
                <form className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            placeholder="E-mail"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            onChange={onChange}
                            value={formData.email}
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
                            onChange={onChange}
                            value={formData.password}
                        />
                    </div>
                    <div className={`${styles.form__button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={styles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь? <Link
                        to={"/register"} className="text text_color_accent">Зарегистрироваться</Link></p>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link
                        to={"/forgot-password"} className="text text_color_accent">Восстановить пароль</Link></p>
                </div>
            </div>
        </div>
    )
}