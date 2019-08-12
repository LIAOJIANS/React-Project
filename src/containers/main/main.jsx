/*
*  主页面路由组件
* */
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import DaShenInfo from '../dashen-info/dashen-info'
import LaoBanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Messages from '../messages/messages'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import { getredirectTo } from '../../utils'
import { userInfo } from '../../redux/actions'

 class Main extends Component {
    navList = [
        {
            path: '/laoban',
            title: '老板列表',
            component: Laoban,
            icon: 'laoban',
            text: '老板'
        },
        {
            path: '/dashen',
            title: '大神列表',
            component: Dashen,
            icon: 'dashen',
            text: '大神'
        },
        {
            path: '/message',
            title: '消息列表',
            component: Messages,
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal',
            title: '个人中心',
            component: Personal,
            icon: 'personal',
            text: '个人'
        }
    ]
    componentDidMount() {
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if(userid && !_id) {
            // 发送个人信息查询接口
           this.props.userInfo()
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
      // 获取路由消息数据
          const { navList } = this
         // 获取当前路由地址
         const path = this.props.location.pathname
         // 查找路由数据匹配路由
          const isShow =  navList.find( nav => path === nav.path )
         // 判断用户类型
         if(isShow) {
             if (user.type === 'laoban') {
                 navList[1].hide = true
             } else {
                 navList[0].hide = true
             }
         }
       return (
           <div>
               { isShow ? <NavBar>{ isShow.title }</NavBar> : null }
               <Switch>
                   {
                       navList.map( (item, index) =>  <Route key={ index } path={ item.path } component={ item.component }></Route> )
                   }
                   <Route path='/dasheninfo' component={ DaShenInfo }></Route>
                   <Route path='/laobaninfo' component={ LaoBanInfo }></Route>

                   <Route path='/chat/:userid' component={ Chat }></Route>
                   <Route component={ NotFound } />
               </Switch>
               { isShow ? <NavFooter navList={ navList } /> : null }
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user }),
    {userInfo}
)(Main)
