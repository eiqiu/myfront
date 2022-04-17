import Vue from 'vue'
import Router from 'vue-router'

import Main from '../views/Main'
import Login from '../views/Login'
import welcome from '../components/welcome'
import userAdmin from '../components/userAdmin'
Vue.use(Router)
//  设置路由
export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: welcome
        }, {
          path: 'userAdmin',
          name: 'userAdmin',
          component: userAdmin
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/goHome',
      component: Main
    }
  ]
})
