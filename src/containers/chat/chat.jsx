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
       // 获取当前用户信息
        const { user } = this.props
       // 获取聊天双方的信息与聊天内容
       const { users, chatMsgs } = this.props.chat
       // 获取我的ID
       const meId = user._id
       // 如果还没从后台拿到数据
       if(!users[meId]) {
           return null
       }
       // 获取对方的ID
       const targetId = this.props.match.params.userid
       const chatId = [ meId, targetId ].sort().join('_')
       // 对聊天信息进行过滤
       const msgs = chatMsgs.filter( msg => msg.chat_id === chatId )
       // 获取对方的头像信息
       const targetHeader = users[targetId].header
       // 添加头像
       const targetIcon = require(`../../assets/images/${ targetHeader }.png`)
       return (
           <div id='chat-page' style={{ marginBottom: 50, marginTop: 50 }}>
               <NavBar>aaa</NavBar>
               <List>
                   {
                       msgs.map( msg => {
                           if(targetId === msg.from) { // 对方发给我的
                              return (
                                  <Item key={ msg._id } thumb={ targetIcon }>
                                      { msg.content }
                                  </Item>
                              )
                           } else {
                                return (
                                    <Item  key={ msg._id } extra='我' className='chat-me' >
                                        { msg.content }
                                    </Item>
                                )
                           }
                       })
                   }
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
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)
