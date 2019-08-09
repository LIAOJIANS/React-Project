/* 大神信息完善界面 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputItem, NavBar, TextareaItem } from "antd-mobile"
import HeaderSelect from "../../components/header-select/header-select"

class DaShenInfo extends Component {
    state = {
        header: "", // 头像名称
        post: "",  // 职位
        info: "",  // 个人或职位简介
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
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelect setHeader={ this.setHeader } />
                <InputItem placeholder='请输入求职岗位' onChange={ val => this.handleInfo('post', val) } >求职岗位：</InputItem>
                <TextareaItem title='个人介绍' rows={ 3 } onChange={ val => this.handleInfo('info', val) } />
                <Button type='primary' onClick={ this.save }>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(DaShenInfo)
