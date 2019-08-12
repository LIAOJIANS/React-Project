/* 个人中心页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'


const Item = List.Item
const Brief = Item.Brief

 class Personal extends Component {

    logout = () => {
        Modal.alert('退出', '确认退出登录嘛？', [
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },
            {
                text: '确认',
                onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
   render() {
        const { user } = this.props
       console.log(user)
       return (
           <div  style={{ marginBottom: 50, marginTop: 50 }}>
               <Result img={ <img src={ require(`../../assets/images/${ user.header }.png`) } style={{ width: 50 }} alt= 'header' /> } title={ user.username } message={ user.company }  />
               <List renderHeader={() => '相关信息'} >
                    <Item multipleLine>
                        <Brief>职位：{ user.post }</Brief>
                        <Brief>简介：{ user.info }</Brief>
                        { user.salary ? <Brief>薪资：{ user.salary }</Brief> : null }
                    </Item>
               </List>
               <WhiteSpace />
               <Button type='warning' onClick={ this.logout } >退&nbsp;&nbsp;&nbsp;出</Button>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)
