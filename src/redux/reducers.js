/*
* 包含多个reducer函数
* */

import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types'
import { getredirectTo } from '../utils'

const initUser = {
    username: '', // 用户名
    type: '', // 用户类型
    msg: '', // 提示信息
    redirectTo: '' // 需要自动重定向路由路径
}
// 用户信息
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...action.data, redirectTo: getredirectTo(type, header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state

    }
}

// 存储用户列表数据
const initUserList = []

// 用户列表
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}


const initMsgList = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}

// 聊天信息
function chat(state = initMsgList, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST :
            const { users, chatMsgs } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: 0
            }
        case RECEIVE_MSG:
            const chatMsg = action.data
            return {
                users: state.users,
                chatMsgs: [ ...state.chatMsgs, chatMsg ],
                unReadCount: 0
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
