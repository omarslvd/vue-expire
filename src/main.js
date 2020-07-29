import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import '@progress/kendo-ui'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DatePicker } from '@progress/kendo-vue-dateinputs'

Vue.config.productionTip = false
Vue.component('datepicker', DatePicker)

new Vue({
  render: h => h(App),
}).$mount('#app')
