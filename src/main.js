import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/index.styl'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
