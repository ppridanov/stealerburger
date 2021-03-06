import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./login.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { postLogin } from "../../services/actions/users";
import { Location } from "history";
import { useDispatch, useSelector } from "../../hooks/store";

export type TFormData = {
  email: string;
  password: string;
}

type TLocationState = {
  from: Location
}

export function Login() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation<TLocationState>();

  const { isAuth } = useSelector((state) => state.userData);

  const [formData, setFormData] = useState<TFormData>({
    email: "",
    password: ""
  })

  let { from } = location.state || { from: { pathname: '/' } }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(postLogin({
      email: formData.email,
      password: formData.password
    }, history, from))
  }
  
  if (isAuth) {
    return (<Redirect to={{ pathname: '/' }} />)
  }

  return (
    <div className="container">
      <div className={styles.login__container}>
        <h3 className="text text_type_main-medium mb-6">Вход</h3>
        <form onSubmit={handleFormSubmit} className="form">
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
              size={"default"}
              name={"password"}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className={`${styles.form__button} mb-20`}>
            <Button type={"primary"} size="medium">Войти</Button>
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
    </div>
  )
}
