/* 头像选择组件 */


import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelect extends Component {
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i <20; i++) {
            this.headerList.push({
                text: `头像${ i+1 }`,
                icon: require( `./images/头像${ i+1 }.png` )
            })
        }
    }
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon: ''
    }
    handleClick = ({ icon, text }) => {
        // 更新状态
        this.setState({ icon })
        // 更新父组件的hander
        this.props.setHeader(text)
    }
   render() {
        const { icon } = this.state
       const headerTop = icon ? (
           <div>已选头像：<img src={ icon } alt=""/></div>
       ) : '请选择头像'
       return (
           <List renderHeader={ () => headerTop }>
                <Grid data={ this.headerList } columnNum={ 5 } onClick={ this.handleClick }>

                </Grid>
           </List>
       )
   }
}

