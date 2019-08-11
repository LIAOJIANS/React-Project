/* 老板页面的路由 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Laoban extends Component {
   render() {
       return (
           <div>
                LaoBan
           </div>
       )
   }
}
export default connect(
    state => ({}),
    {}
)(Laoban)
