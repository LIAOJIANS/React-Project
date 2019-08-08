
import ajax from './ajax'

// 注册接口
export const reqRegister = ({ username, password, type }) => ajax('/register', { username, password, type }, 'POST')

// 登录接口
export const reqLogin = ({ username, password }) => ajax('login', { username, password }, 'POST')

// 完善用户信息接口
export const reqUpadataUser = ({ header, info, post, salary, company }) => ajax('/updata', { header, info, post, salary, company }, 'POST')
