import { createRef, h, html } from 'gridjs'
import Grid from './gridjs-vue.vue'

export function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.component('Grid', Grid)

  if (!Vue.prototype.$gridjs) {
    Vue.prototype.$gridjs = {
      createRef,
      h,
      html
    }
  }
}

const plugin = {
  install
}

let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export { Grid, plugin as GridGlobal }
export default Grid
