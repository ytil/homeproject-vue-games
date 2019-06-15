import Vue from 'vue'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import Toasted from 'vue-toasted'


import App from './App.vue'
import store from './store'
import router from './router'

import 'vuetify/dist/vuetify.min.css'
import './custom-elementui-styles.scss'

Vue.use(Vuetify, {
  iconfont: 'fa',
})
Vue.use(ElementUI)
Vue.use(Toasted, {
  position: 'top-center',
  duration: 2500,
  iconPack: 'material',
  containerClass: 'toast-wrapper',
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
