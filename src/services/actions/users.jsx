import {getUser, patchUser, sendData} from "../../utils/api";
import {apiURL} from "../../utils/constants";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_IS_AUTH = 'SET_IS_AUTH';
export const DELETE_IS_AUTH = 'DELETE_IS_AUTH';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const SET_WAS_ON_FORGOT_PAGE = 'SET_WAS_ON_FORGOT_PAGE';
export const DELETE_WAS_ON_FORGOT_PAGE = 'DELETE_WAS_ON_FORGOT_PAGE';

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
            url: `${apiURL}/auth/register`,
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
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: {
                                user: res.user
                            }
                        });
                        dispatch({
                            type: SET_IS_AUTH,
                            payload: {
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken
                            }
                        })
                        history.push({pathname: "/"});
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

export const postLogin = (formData, history) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/auth/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: formData.email,
                password: formData.password,
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status === 401 ? 'Неправильные введенные данные' : 'Произошла ошибка. Код ошибки: ' + res.status);
            })
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: {
                                user: res.user
                            },
                        });
                        dispatch({
                            type: SET_IS_AUTH,
                            payload: {
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken
                            }
                        })
                        history.replace({pathname: '/'})
                    } else {
                        dispatch({
                            type: GET_USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err)
                dispatch({
                    type: GET_USER_FAILED
                })
            })
    }
}

export const postLogout = (history) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/auth/logout`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                token: localStorage.getItem('refreshToken'),
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Произошла ошибка. Код ошибки: ' + res.status);
            })
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: DELETE_IS_AUTH
                        })
                        history.replace({pathname: '/'})
                    } else {
                        dispatch({
                            type: GET_USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err)
                dispatch({
                    type: GET_USER_FAILED
                })
            })
    }
}

export const getUserInfo = () => {
    return async function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        await getUser()
            .then(res => {
                    if (res && res.success) {
                        console.log(res);
                        dispatch({
                            type: GET_USER_INFO,
                            payload: {
                                user: res.user
                            }
                        })
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

export const postChangeUserInfo = (formData) => {
    return async function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        await patchUser(formData)
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: CHANGE_USER_INFO,
                            payload: {
                                user: res.user
                            }
                        })
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