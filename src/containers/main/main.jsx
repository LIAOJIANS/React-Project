/*
*  主页面路由组件
* */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import DaShenInfo from '../dashen-info/dashen-info'
import LaoBanInfo from '../laoban-info/laoban-info'

export default class Main extends Component {
   render() {
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
