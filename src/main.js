// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//  引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//  导入cookies
import VueCookies from 'vue-cookies'

//  导入全局组件
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

//  配置axios拦截器
axios.interceptors.request.use(config => {
  //  为请求头添加token验证的Authorization字段
  config.headers.token = window.$cookies.get('token')
  return config
})

//  配置response拦截器
axios.interceptors.response.use(config => {
  if (config.data.status === 422) {
    window.$cookies.remove('token')
    Vue.prototype.tokenAlert()
    router.push({name: 'login'})
  } else {
    return config
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})

//  添加全局方法
Vue.prototype.tokenAlert = function () {
  this.$message.warning('用户身份过期，请重新登陆')
}
