import { Necktie } from '@lesniewski.pro/necktie'
import { h, html, PluginPosition } from 'gridjs/dist/gridjs.module.js'
import { uid } from 'uid'
import Grid from './gridjs-vue.mjs'

export function install(Vue, options = {}) {
  if (install.installed) return
  install.installed = true

  const helper = vueConfig => {
    const uuid = uid(16)
    const tie = new Necktie()
    tie.startListening()

    tie.bind(
      `[data-obj-id='${uuid}']`,
      el =>
        new Vue({
          el,
          ...vueConfig
        })
    )

    return html(`<span data-obj-id=${uuid}></span>`)
  }

  if (!Vue.prototype.$gridjs) {
    Vue.prototype.$gridjs = {
      h,
      helper,
      html,
      options,
      PluginPosition
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
