/* 底部导航栏公共组件 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'


const Item = TabBar.Item
 class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
   render() {
        let { navList } = this.props
       // 过滤类型
       navList = navList.filter(nav => !nav.hide)
       const path = this.props.location.pathname
       return (
           <div>
             <TabBar>
                 {
                     navList.map(nav => (
                         <Item key={ nav.path }
                               title={ nav.text }
                               icon={ { uri: require(`./nav/${ nav.icon }.png`) } }
                               selectedIcon={{ uri: require(`./nav/${ nav.icon }-selected.png`) }}
                               selected={ path === nav.path }
                               onPress={ () => {
                                   this.props.history.replace(nav.path)
                               } }
                         />
                     ))
                 }
             </TabBar>
           </div>
       )
   }
}
// 向外暴露组件，会向组件内部中传入一些由组件特有的属性：history/location/math

export default withRouter(NavFooter)
