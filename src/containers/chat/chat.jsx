import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, List } from 'antd-mobile'


const Item = List.Item

class Chat extends Component {
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
                   <InputItem palceholder='请输入' extra={ <span>发送</span> }>
                   </InputItem>
               </div>
           </div>
       )
   }
}
export default connect(
    state => ({}),
    {}
)(Chat)
