// 引入客户端 io
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'
import {
    reqLogin,
    reqRegister,
    reqUpadataUser,
    reqUser,
    reqUserList
} from '../api/index'
// 登录、注册
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 完善信息
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

// 接收用户列表
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })


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
// 异步获取用户列表
export const getUserList = (type) => {

    return async dispatch => {
        // 发送请求
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

function initIO() {
    if(!io.socket) {
        // 连接服务器, 得到代表连接的 socket 对象
        io.socket = io('ws://localhost:4000')
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('浏览器端接收到消息:', chatMsg)
        })
    }
}
// 异步发送消息
export const sendMsg = ({ from, to, content }) => {

    return dispatch => {
        console.log('返送消息', { from, to, content })
        initIO()
        // 发消息
        io.socket.emit('sendMsg', { from, to, content })
    }
}
