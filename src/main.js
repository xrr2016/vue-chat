import Vue from 'vue'
import 'whatwg-fetch'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import './main.css'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
