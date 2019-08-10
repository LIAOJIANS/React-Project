/*
*  主页面路由组件
* */
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import DaShenInfo from '../dashen-info/dashen-info'
import LaoBanInfo from '../laoban-info/laoban-info'
import { getredirectTo } from '../../utils'

 class Main extends Component {
    componentDidMount() {
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if(userid && !_id) {
            // 发送个人信息查询接口
            console.log('发送获取信息接口！')
        }
    }
     render() {
       // 从浏览器中拿出cookie
       const userid = Cookies.get('userid')
       // 判断是否登录
       if(!userid) {
           return <Redirect to='/login' />
       }
       //  拿出头部信息，跟用户类型
       const { user } = this.props
       // 判断有cookie没id1的情况
      if(!user._id) {
          return null
      } else {
          let path = this.props.location.pathname
          if(path === '/') { // 重定向路径
              path = getredirectTo(user.type, user.header)
              return <Redirect to={ path } />
          }
      }
       return (
           <div>
               <Switch>
                   <Route path='/dasheninfo' component={ DaShenInfo }></Route>
                   <Route path='/laobaninfo' component={ LaoBanInfo }></Route>
               </Switch>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user })
)(Main)
