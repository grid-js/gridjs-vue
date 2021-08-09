import { GridVue } from '../../main.d'

const onDestroyed = (component: GridVue) => {
  // unload from memory
  try {
    if (component.resize) component.resize.disconnect()
    component.grid = undefined
    component.wrapper = undefined
  } catch (error) {
    console.error(error)
  }
}

export default onDestroyed
