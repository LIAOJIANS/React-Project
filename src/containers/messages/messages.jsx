/* 消息页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

// 得到每个组的LastMsg组成的数据
function getLastMsgs(chatMsgs, userid) {
    // 1、找出每个聊天的LastMsg，并用一个对象容器保存
    const LastMsgObj = { }
    chatMsgs.forEach(msg => {
        // 对msg进行个体的统计
        if (msg.to === userid && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        // 得到聊天的ID
        const chatId = msg.chat_id
        // 获取以保存的当前组件
        const lastMsg = LastMsgObj[chatId]
        // 如果没有
        if(!lastMsg) {
            LastMsgObj[chatId] = msg
        } else { // 如果有
            // 累加unReadCount = 已统计的 + 当前msg
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            // 如果msg比lastMsg晚，就将msg保存为lastMsg
            if (msg.create_time > lastMsg.create_time) {
                LastMsgObj[chatId] = msg
            }
            LastMsgObj[chatId].unReadCount = unReadCount
        }
    })
    // 2、得到lastMsgs数组
    const lastMsgs = Object.values(LastMsgObj)
    // 3、降序返回
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

 class Messages extends Component {
   render() {
       const user = this.props.user
       const { users, chatMsgs } = this.props.chat
       const lastMsgs = getLastMsgs(chatMsgs, user._id)
       console.log(lastMsgs)
       return (
           <List style={{ marginBottom: 50, marginTop: 50 }}>
               {
                   lastMsgs.map(msg => {
                       // 得到目标用户的id
                       const targetUserId = msg.to === user._id ? msg.from : msg.to
                       // 得到目标用户的信息
                       const targetUser = users[targetUserId]
                       console.log(targetUser)
                       console.log(1)
                       return (
                           <Item
                               key={ msg._id }
                               extra={ <Badge text={ msg.unReadCount } /> }
                               thumb={ targetUser.header ? require(`../../assets/images/${ targetUser.header }.png`) : null }
                               arrow='horizontal'
                               onClick={ () => this.props.history.push(`/chat/${ targetUserId }`) }
                           >
                               { msg.content }
                               <Brief>{ targetUser.username }</Brief>
                           </Item>
                       )
                   })
               }

           </List>
       )
   }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Messages)
