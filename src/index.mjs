import { createRef, h, html, PluginPosition } from 'https://unpkg.com/gridjs@5.0.1/dist/gridjs.module.js'
import { uid } from 'https://unpkg.com/uid/single/index.mjs'
import Grid from './gridjs-vue.mjs'

export function install(Vue, options = {}) {
  if (install.installed) return
  install.installed = true

  const render = (el, usrComponent, props, opts) => {
    if (el && el.current) el = el.current

    if (typeof el === 'string' && usrComponent) {
      new Vue({
        render(createElement) {
          return createElement(usrComponent, { props, ...opts }, this.$slots.default)
        },
        components: {
          usrComponent
        }
      }).$mount(el)
    } else {
      console.error('$gridjs.render() requires a target element and a component')
    }
  }

  if (!Vue.prototype.$gridjs) {
    Vue.prototype.$gridjs = {
      createRef,
      h,
      html,
      options,
      PluginPosition,
      render,
      uuid: uid(16)
    }
  }

  Vue.component('Grid', Grid)
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
