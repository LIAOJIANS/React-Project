/*
*  主页面路由组件
* */
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DaShenInfo from '../dashen-info/dashen-info'
import LaoBanInfo from '../laoban-info/laoban-info'

 class Main extends Component {
   render() {
       const { user} = this.props
       if(!user._id) {
           return <Redirect to='/login' />
       }
       return (
           <div>
               <Switch>
                   <Route path='/dasheninfo' component={ DaShenInfo }></Route>
                   <Route path='/laobaninfo' component={ LaoBanInfo }></Route>
               </Switch>
           </div>
       )
   }
}
export default connect(
    state => ({ user: state.user })
)(Main)
