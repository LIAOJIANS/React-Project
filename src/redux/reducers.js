/*
* 包含多个reducer函数
* */

import { combineReducers } from 'redux'

function xxx(state=0, action) {

    return state
}

function yyy(state=0, action) {

    return state
}

export default combineReducers({
    xxx,
    yyy
})
