import React, {ChangeEvent, FormEvent, useState} from "react";
import resetStyles from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {DELETE_WAS_ON_FORGOT_PAGE, postResetPassword} from "../../services/actions/users";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";

export type TFormData = {
    password: string;
    token: string;
}

export function ResetPassword() {
    const history = useHistory();

    const {wasOnForgotPass, isAuth} = useSelector((state: RootState) => state.userData);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<TFormData>({
        password: "",
        token: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(postResetPassword(formData, history));
        dispatch({type: DELETE_WAS_ON_FORGOT_PAGE})
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    if (!wasOnForgotPass) {
        return (<Redirect to={'/forgot-password'}/>)
    }

    return (
        <div className="container">
            <div className={resetStyles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form onSubmit={handleFormSubmit} className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            type={"password"}
                            icon={"ShowIcon"}
                            size={"default"}
                            placeholder="Введите новый пароль"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <Input
                            type={"text"}
                            size={"default"}
                            placeholder="Введите код из письма"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"token"}
                            onChange={handleChange}
                            value={formData.token}
                        />
                    </div>
                    <div className={`${resetStyles.form__button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={resetStyles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}