    
import VueFancyBackground from './VueFancyBackground.vue'

let installed = false

export default {
  install(Vue) {
    if (installed) {
      return
    }
    
    Vue.component('VueFancyBackground', VueFancyBackground)
    installed = true
  }
}

export {
  VueFancyBackground
}