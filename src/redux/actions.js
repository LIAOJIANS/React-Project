import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
} from './action-types'
import {
    reqLogin,
    reqRegister,
    reqUpadataUser,
    reqUser
} from '../api/index'
// 登录、注册
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 完善信息
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
const resetUser = (msg) => ({ type: RESET_USER, data: msg })

// 异步注册
export const register = (user) => {

    return async dispatch => {
        // 发送请求
        const response = await reqRegister(user)
        const result = response.data
        console.log(result)
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data))
        } else { // 失败
            dispatch(errorMsg(result.msg))
        }
    }
}
// 异步登录
export const login = (user) => {

    return async dispatch => {
        // 发送请求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data))
        } else { // 失败
            dispatch(errorMsg(result.msg))
        }
    }
}
// 异步完善信息
export const updata = (user) => {

    return async dispatch => {
        // 发送请求
       const response = await reqUpadataUser(user)
        const result = response.data
        if (result.code === 0) { // 成功
            dispatch(receiveUser(result.data))
        } else { // 失败
            dispatch(resetUser(result.msg))
        }
    }
}
// 异步获取个人信息
export const userInfo = () => {

    return async dispatch => {
        // 发送请求
        const response = await reqUser()
        const result = response.data
        if(result.code === 0) {
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}
