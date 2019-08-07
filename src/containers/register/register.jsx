/*
*  注册路由组件
* */
import React, { Component } from 'react'
import {
    Button,
    InputItem,
    List,
    WhiteSpace,
    Radio,
    WingBlank,
    NavBar
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
const ListItem = List.Item

export default class Register extends Component {
    state = {
        type: 'dashen'
    }
    regist = () => {
        // 1、 获取文本框的信息
        const userName = this.userName.state.value.trim()
        const password = this.password.state.value.trim()
        const otherPassWord = this.otherPassWord.state.value.trim()
        const { type } = this.state
        // 2、进行合法性的校验
        if (!userName) {
            console.log('用户名没有输入')
            return;
        } else if ( !password ) {
            console.log('密码没有输入')
            return;
        } else if ( !otherPassWord || password !== otherPassWord) {
            console.log('两次输入的密码不相等')
            return;
        } else {
            // 3、发送异步注册
            console.log('注册成功！')
        }

    }
    change = (value) => {
        // const values = value
     this.setState({ type:value })
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }
   render() {
        const { type } = this.state
       return (
           <div>
               <NavBar>山&nbsp;山&nbsp;职&nbsp;聘</NavBar>
               <Logo />
               <WingBlank>
                   <List>
                       <WhiteSpace />
                       <InputItem ref={ userName => this.userName = userName }>用户名：</InputItem>
                       <WhiteSpace />
                       <InputItem type='password' ref={ password => this.password = password }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                       <WhiteSpace />
                       <InputItem type='password' ref={ otherPassWord => this.otherPassWord = otherPassWord }>确认密码：</InputItem>
                       <WhiteSpace />
                       <ListItem>
                           <span>用户类型：</span>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={ type === 'dashen' } onChange = { () => this.change('dashen') }>大神</Radio>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <Radio checked={ type === 'laoban' } onChange = { () => this.change('laoban') } >老板</Radio>
                       </ListItem>
                       <Button type='primary' onClick={ this.regist }>注&nbsp;&nbsp;&nbsp;册</Button>
                       <WhiteSpace />
                       <Button onClick={ this.toLogin }>已有账号</Button>
                   </List>
               </WingBlank>
           </div>
       )
   }
}
