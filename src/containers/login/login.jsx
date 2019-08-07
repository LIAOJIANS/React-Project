/*
*  登录路由组件
* */
import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import {
    NavBar,
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile'

export default class Login extends Component {
    login =() => {
        // 1、获取用户信息
        const userName = this.userName.state.value.trim()
        const passWord = this.passWord.state.value.trim()
        // 2、合法性校验
        if(!userName) {
            console.log('请输入用户名')
            return;
        } else if(!passWord) {
            console.log('请输入密码')
            return;
        } else {
            // 3、异步发送请求
            console.log("登录成功")
        }
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
   render() {
       return (
           <div>
                <NavBar>山山直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem ref={ userName => this.userName = userName }>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem ref={ passWord => this.passWord = passWord }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />
                        <Button type='primary' onClick = { this.login }>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={ this.toRegister }>立即注册</Button>
                    </List>
                </WingBlank>
           </div>
       )
   }
}
