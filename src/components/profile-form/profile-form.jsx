import React, {useEffect, useRef, useState} from "react";
import styles from "../../pages/profile/profile.module.css";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCustomInput} from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/actions/users";

export function ProfileForm() {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: null,
        email: null,
        password: "********"
    })

    useEffect(() => {
        dispatch(getUserInfo());
        setFormData({
            ...formData,
            name: user.name,
            email: user.email
        })
    }, [])

    const nameCustomInput = useCustomInput();
    const passCustomInput = useCustomInput();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form className={`${styles.form}`}>
            <div className="form__item mb-6">
                <Input
                    placeholder="Имя"
                    error={false}
                    name={"name"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"text"}
                    icon={"EditIcon"}
                    onBlur={passCustomInput.handleBlur}
                    onIconClick={passCustomInput.handleIconClick}
                    disabled={true}
                    ref={passCustomInput.ref}
                    value={user.name}
                />
            </div>
            <div className="form__item mb-6">
                <EmailInput onChange={handleOnChange} value={user.email} name={'email'}/>
            </div>
            <div className="form__item mb-6">
                <Input
                    placeholder="Пароль"
                    error={false}
                    name={"password"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"password"}
                    icon={"EditIcon"}
                    onBlur={nameCustomInput.handleBlur}
                    onIconClick={nameCustomInput.handleIconClick}
                    disabled={true}
                    ref={nameCustomInput.ref}
                    value={formData.password}
                />
            </div>
        </form>
    )
}