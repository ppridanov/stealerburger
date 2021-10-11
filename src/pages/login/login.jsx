import React, {useState} from "react";
import styles from "./login.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../services/actions/users";

export function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.user);
    console.log(isAuth, 'login')
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin({
            email: formData.email,
            password: formData.password
        }, history))
    }

    return (
        <>
            {(isAuth) ? history.replace({pathname: '/'}) :
                (<div className="container">
                    <div className={styles.login__container}>
                        <h3 className="text text_type_main-medium mb-6">Вход</h3>
                        <form className="form">
                            <div className="form__item mb-6">
                                <Input
                                    placeholder="E-mail"
                                    error={false}
                                    errorText={"Ошибка какая то"}
                                    name={"email"}
                                    size={"default"}
                                    type={"email"}
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="form__item mb-6">
                                <PasswordInput
                                    type={"password"}
                                    size={"default"}
                                    placeholder="Пароль"
                                    error={false}
                                    errorText={"Ошибка какая то"}
                                    name={"password"}
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </div>
                            <div className={`${styles.form__button} mb-20`}>
                                <Button type={"primary"} size="medium" onClick={handleSubmit}>Войти</Button>
                            </div>
                        </form>
                        <div className={styles.login__links}>
                            <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый
                                пользователь? <Link
                                    to={"/register"} className="text text_color_accent">Зарегистрироваться</Link></p>
                            <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link
                                to={"/forgot-password"} className="text text_color_accent">Восстановить пароль</Link>
                            </p>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}