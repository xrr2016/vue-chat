import Vue from 'vue'
import 'whatwg-fetch'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import './main.css'
import App from './App.vue'
import './registerServiceWorker'

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
