import Vue from 'vue'
import App from './App.vue'
import VueFancyBackground from 'plugin'

Vue.use(VueFancyBackground)

new Vue({
  el: '#app',
  render: h => h(App)
})