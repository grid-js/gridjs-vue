import { GridVue } from '../../main.d'
import resizeObserver from '../helpers/resizeObserver'
import { activatePlugins } from '../setup/options'
import { assignTheme } from '../setup/theme'

const onMounted = (component: GridVue) => {
  try {
    assignTheme(component)
    activatePlugins(component)
    resizeObserver(component)
    component.$nextTick(() => component.$emit('ready'))
    return component
  } catch (error) {
    console.error(error)
  }
}

export default onMounted
