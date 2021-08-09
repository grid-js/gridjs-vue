import { h, html, PluginPosition } from 'gridjs'
import Grid from '../gridjs-vue'
import { VueInstance } from '../main.d'
import bindToCell from './methods/bindToCell'

const install = (instance: VueInstance, options = {}): void => {
  try {
    if (instance.installed) return
    instance.installed = true

    if (instance.prototype && !instance.prototype.$gridjs) {
      instance.prototype.$gridjs = {
        h,
        helper: bindToCell,
        html,
        options,
        PluginPosition
      }
    }

    instance.component('Grid', Grid)
  } catch (error) {
    console.error(error)
  }
}

export default install
