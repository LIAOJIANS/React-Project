/* 个人中心页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class NotFound extends Component {
   render() {
       return (
           <div>
               <h2>暂无此页面</h2>
               <button onClick={ () => this.props.history.replace('/') } >回到首页</button>
           </div>
       )
   }
}
export default connect(
    state => ({}),
    {}
)(NotFound)
