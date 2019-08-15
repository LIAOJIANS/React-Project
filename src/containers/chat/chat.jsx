import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, List } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content: '' // 发送内容
    }
    handleSend = () => {
        // 获取用户ID
        const from = this.props.user._id
        // 获取当前聊天人
        const to = this.props.match.params.userid
        // 获取聊天内容
        const content  = this.state.content.trim()
        if(content) {
            // 发送请求
            this.props.sendMsg({ from, to, content })
        }
        this.setState({ content: '' })
    }
   render() {
       return (
           <div id='chat-page' style={{ marginBottom: 50, marginTop: 50 }}>
               <NavBar>aaa</NavBar>
               <List>
                   <Item thumb={ require('../../assets/images/头像1.png') }>
                       你好1
                   </Item>
                   <Item thumb={ require('../../assets/images/头像1.png') }>
                       你好2
                   </Item>
                   <Item extra='我' className='chat-me' >
                       你好3
                   </Item>
               </List>
               <div className='am-tab-bar'>
                   <InputItem palceholder='请输入' value={ this.state.content } onChange={ val => this.setState({ content: val })} extra={ <span onClick={ this.handleSend } >发送</span> }>
                   </InputItem>
               </div>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user }),
    { sendMsg }
)(Chat)
