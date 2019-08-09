/* 老板信息完善界面 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, Button, InputItem, TextareaItem } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelect from '../../components/header-select/header-select'
import { updata } from '../../redux/actions'

 class LaoBanInfo extends Component {
    state = {
        header: "", // 头像名称
        post: "",  // 职位
        info: "",  // 个人或职位简介
        company: "", // 公司名称
        salary: "",  // 工资
    }
    setHeader = (header) => {
        this.setState({ header })
    }
    handleInfo = (name, value) => {
        this.setState({
            [name]: value
        })
     }
     save = () => {
        const user = this.state
        this.props.updata(user)
     }
   render() {
        const { type, header } = this.props.user
       if(header) {
           const path = type === 'dashen' ? '/dashen': '/laoban'
           return <Redirect to={ path } />
       }
       return (
           <div>
              <NavBar>老板信息完善</NavBar>
               <HeaderSelect setHeader={ this.setHeader } />
               <InputItem placeholder='请输入招聘职位' onChange={ val => this.handleInfo('post', val) } >招聘职位：</InputItem>
               <InputItem placeholder='请输入公司名称' onChange={ val => this.handleInfo('company', val) } >公司名称：</InputItem>
               <InputItem placeholder='请输入薪资' onChange={ val => this.handleInfo('salary', val) } >职位薪资：</InputItem>
               <TextareaItem title='职位要求' rows={ 3 } onChange={ val => this.handleInfo('info', val) } />
               <Button type='primary'onClick={ this.save } >保&nbsp;&nbsp;&nbsp;存</Button>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user }),
    { updata }
)(LaoBanInfo)
