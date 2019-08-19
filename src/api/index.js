
import ajax from './ajax'

// 注册接口
export const reqRegister = ({ username, password, type }) => ajax('/register', { username, password, type }, 'POST')

// 登录接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')

// 完善用户信息接口
export const reqUpadataUser = ({ header, info, post, salary, company }) => ajax('/updata', { header, info, post, salary, company }, 'POST')

// 获取个人信息接口
export const reqUser = () => ajax('/user')

// 根据用户类型获取用户列表
export const reqUserList = (type) => ajax('/userlist', { type })

// 获取聊天记录列表
export const reqMsgList = () => ajax('/msglist')

// 标记信息已读
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'POST')
