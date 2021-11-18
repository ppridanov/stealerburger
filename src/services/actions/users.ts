import { checkResponse, getUser, patchUser, sendData } from "../../utils/api";
import { apiURL } from "../../utils/constants";
import { History } from 'history';
import {AppDispatch, TResetPasswordForm, TFormData, TLoginForm, AppThunk} from "../../utils/types";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const GET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
export const SET_IS_AUTH: 'SET_IS_AUTH' = 'SET_IS_AUTH';
export const DELETE_IS_AUTH: 'DELETE_IS_AUTH' = 'DELETE_IS_AUTH';
export const CHANGE_USER_INFO: 'CHANGE_USER_INFO' = 'CHANGE_USER_INFO';
export const SET_WAS_ON_FORGOT_PAGE: 'SET_WAS_ON_FORGOT_PAGE' = 'SET_WAS_ON_FORGOT_PAGE';
export const DELETE_WAS_ON_FORGOT_PAGE: 'DELETE_WAS_ON_FORGOT_PAGE' = 'DELETE_WAS_ON_FORGOT_PAGE';

export const postForgotPassword = (emailValue: string, history: History): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    sendData({
      url: `${apiURL}/password-reset`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailValue })
    })
      .then(res => checkResponse(res))
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

export const postResetPassword = (formData: TResetPasswordForm, history: History): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    sendData({
      url: `${apiURL}/password-reset/reset`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: formData.password,
        token: formData.token
      })
    })
      .then(res => checkResponse(res))
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

export const postRegister = (formData: TFormData, history: History): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    sendData({
      url: `${apiURL}/auth/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user

          });
          dispatch({
            type: SET_IS_AUTH,
            payload: {
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            }
          })
          history.push({ pathname: "/" });
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

export const postLogin = (formData: TLoginForm, history: History, from: { pathname: string }): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    sendData({
      url: `${apiURL}/auth/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          });
          dispatch({
            type: SET_IS_AUTH,
            payload: {
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            }
          })
          history.replace(from)
        } else {
          dispatch({
            type: GET_USER_FAILED
          })
        }
      }
      )
      .catch(err => {
        console.log(err)
        alert(err.message)
        dispatch({
          type: GET_USER_FAILED
        })
      })
  }
}

export const postLogout = (history: History): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    sendData({
      url: `${apiURL}/auth/logout`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: DELETE_IS_AUTH
          })
          history.replace({ pathname: '/login' })
        } else {
          dispatch({
            type: GET_USER_FAILED
          })
        }
      }
      )
      .catch(err => {
        console.log(err)
        alert(err.message)
        dispatch({
          type: GET_USER_FAILED
        })
      })
  }
}

export const getUserInfo = (): AppThunk => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    await getUser()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_INFO,
            user: res.user
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

export const postChangeUserInfo = (formData: TFormData): AppThunk => {
  return async function (dispatch: AppDispatch) {
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