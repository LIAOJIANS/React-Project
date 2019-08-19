import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, List, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { sendMsg, updataReadCount } from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content: '', // 发送内容
        isShow: false, // 是否显示
    }
    componentWillMount() {
        const emjop = ['😃', '😁', '😆', '😅', '😇', '😍', '😃', '😁', '😆', '😅', '😇', '😍',
            '😃', '😁', '😆', '😅', '😇', '😍', '😃', '😁', '😆', '😅', '😇', '😍',
            '😃', '😁', '😆', '😅', '😇', '😍', '😃', '😁', '😆', '😅', '😇', '😍',
            '😃', '😁', '😆', '😅', '😇', '😍', '😃', '😁', '😆', '😅', '😇', '😍',
        ]
        this.emjop = emjop.map(item => ({ text: item }))
    }
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if(isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        // 获取对方的ID
        const targetId = this.props.match.params.userid
        // 获取我的ID
        const meId = this.props.user._id
        // 发送请求更新消息的未读状态
        this.props.updataReadCount(targetId, meId)
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
        this.setState({ content: '', isShow: false })
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
           console.log(users[meId])
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
       const targetIcon = targetHeader ? require(`../../assets/images/${ targetHeader }.png`) : null
       return (
           <div id='chat-page' style={{ marginBottom: 50, marginTop: 50 }}>
               <NavBar icon={<Icon type='left'/>} className='sticky-header' onLeftClick={()=> this.props.history.goBack()}>
                   { users[targetId].username }
               </NavBar>
               <List>
                   <QueueAnim type='left' delay={ 100 }>
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
                   </QueueAnim>
               </List>
               <div className='am-tab-bar'>
                   <InputItem palceholder='请输入' value={ this.state.content } onChange={ val => this.setState({ content: val })} onFocus={() => this.setState({isShow: false})} extra={
                       <span>
                            <span onClick={ this.toggleShow } style={{marginRight:5}}>😊</span>
                            <span onClick={ this.handleSend } >发送</span>
                       </span>
                   }>
                   </InputItem>
                   { this.state.isShow ? (
                       <Grid
                           data={ this.emjop }
                           columnNum={ 8 }
                           carouselMaxRow={4}
                           isCarousel={ true }
                           onClick={(item) => {
                               this.setState({ content: this.state.content + item.text })
                           }}
                       />
                   ) : null}
               </div>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, updataReadCount }
)(Chat)
