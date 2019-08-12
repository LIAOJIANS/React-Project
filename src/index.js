import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'


import './assets/css/index.css'
import './test/socketio_test'
import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'


render( (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={ Register } ></Route>
                <Route path='/login' component={ Login }></Route>
                <Route component={ Main }></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root') )
