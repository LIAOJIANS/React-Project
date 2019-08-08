/*
*  登录路由组件
* */
import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import {
    NavBar,
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile'

class Login extends Component {
    state = {
        msg: '' // 提示信息
    }
    login =() => {
        // 1、获取用户信息
        const username = this.userName.state.value.trim()
        const password = this.passWord.state.value.trim()
        // 2、合法性校验
        if(!username) {
            this.setState({ msg: '请输入用户名' })
            return;
        } else if(!password) {
            this.setState({ msg: '请输入密码' })
            return;
        } else {
            this.setState({ msg: '' })
            // 3、异步发送请求
            this.props.login({username, password})
        }
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
   render() {
        const showMsg = this.state.msg
        const { msg, redirectTo } = this.props.user
       if(redirectTo) {
           return <Redirect to={ redirectTo }/>
       }
       return (
           <div>
                <NavBar>山山直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        { msg ? <div className='errorMsg'>{ msg }</div> : null}
                        { showMsg ? <div className='errorMsg'>{ showMsg }</div> : null}
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
export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)
