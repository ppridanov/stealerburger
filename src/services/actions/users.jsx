import {checkResponseStatus, sendData} from "../../utils/api";
import {apiURL} from "../../utils/constants";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const postForgotPassword = (emailValue, history) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/password-reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {email: emailValue}
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`);
            })
            .then(res => {
                    if (res && res.success) {
                        history.push('/reset-password');
                    } else {
                        dispatch({
                            type: GET_USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_USER_FAILED
                })
            })
    }
}
export const postResetPassword = (formData, history) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/password-reset/reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                password: formData.password,
                token: formData.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`);
            })
            .then(res => {
                    if (res && res.success) {
                        history.push('/login');
                    } else {
                        dispatch({
                            type: GET_USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_USER_FAILED
                })
            })
    }
}

export const postRegister = (formData, history) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/password-reset/reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: formData.email,
                password: formData.password,
                name: formData.name
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`);
            })
            .then(res => {
                    if (res && res.success) {
                        history.push('/login');
                    } else {
                        dispatch({
                            type: GET_USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_USER_FAILED
                })
            })
    }
}