import Vue from 'vue'
import 'whatwg-fetch'

import './main.css'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
