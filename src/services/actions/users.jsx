import {sendData} from "../../utils/api";
import {apiURL} from "../../utils/constants";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const postPasswordReset = (emailValue) => {
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
                throw new Error(`Something wrong: ${res.status}`)
            })
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: res.order.number
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