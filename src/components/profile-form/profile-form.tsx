import React, {ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState} from "react";
import styles from "./profile-form.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCustomInput} from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, postChangeUserInfo} from "../../services/actions/users";
import {RootState, TFormData} from "../../types";

export const ProfileForm: React.FC = () => {
    const {user} = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<TFormData>({
        name: "",
        email: "",
        password: ""
    })

    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setFormData({
            ...formData,
            email: user.email,
            name: user.name
        })
    }, [user])

    const nameCustomInput = useCustomInput();
    const passCustomInput = useCustomInput();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (!target) {
            return
        }
        setFormData({
            ...formData,
            [target.name]: target.value
        })
        setIsChangeInput(true);
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(postChangeUserInfo(formData));
        setIsChangeInput(false);
    }

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormData({
            email: user.email,
            name: user.name,
            password: ""
        })
        setIsChangeInput(false);
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
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
                    value={formData.name}
                />
            </div>
            <div className="form__item mb-6">
                <EmailInput onChange={handleOnChange} value={formData.email} name={'email'}/>
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
            {isChangeInput && (
                <div className={`${styles.form__buttons} mb-20`}>
                    <Button type={"primary"} size="medium">Сохранить</Button>
                    <Button type={"secondary"} size="medium" onClick={handleCancel}>Отмена</Button>
                </div>
            )}
        </form>
    )
}