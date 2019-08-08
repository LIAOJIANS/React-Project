/*
* 包含多个reducer函数
* */

import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

const initUser = {
    username: '', // 用户名
    type: '', // 用户类型
    msg: '', // 提示信息
    redirectTo: '' // 需要自动重定向路由路径
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...action.data, redirectTo: '/' }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        default:
            return state
    }
}

export default combineReducers({
    user
})
