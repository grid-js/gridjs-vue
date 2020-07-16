import { createRef, h, html } from 'gridjs'
import elementReady from 'element-ready'
import { nanoid } from 'nanoid'

import Grid from './gridjs-vue.vue'

export function install(Vue) {
  if (install.installed) return
  install.installed = true

  const render = (el, usrComponent, props, opts) => {
    if (el && el.current) el = el.current

    if (typeof el === 'string' && usrComponent) {
      return elementReady(el, { stopOnDomReady: false })
        .then(() => {
          new Vue({
            render(createElement) {
              return createElement(usrComponent, { props, ...opts }, this.$slots.default)
            },
            components: {
              usrComponent
            }
          }).$mount(el)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      console.error('$gridjs.render() requires a target element and a component')
      return
    }
  }

  if (!Vue.prototype.$gridjs) {
    Vue.prototype.$gridjs = {
      createRef,
      h,
      html,
      render,
      uuid: nanoid
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
