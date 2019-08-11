/* 个人中心页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Personal extends Component {
   render() {
       return (
           <div>
               Personal
           </div>
       )
   }
}
export default connect(
    state => ({}),
    {}
)(Personal)
