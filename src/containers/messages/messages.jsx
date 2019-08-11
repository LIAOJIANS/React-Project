/* 消息页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Messages extends Component {
   render() {
       return (
           <div>
               Messages
           </div>
       )
   }
}
export default connect(
    state => ({}),
    {}
)(Messages)
