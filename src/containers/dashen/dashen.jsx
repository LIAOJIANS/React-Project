/* 大神页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

 class Dashen extends Component {
     componentDidMount = () => {
        // 发送请求
        this.props.getUserList('laoban')
    }
     render() {
       return (
           <div>
               <UserList userList={ this.props.userList } />
           </div>
       )
   }
}
export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Dashen)
