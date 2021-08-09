import { UserConfig } from 'gridjs/dist/src/config.d'
import { GridVue } from '../../main.d'

const update = (component: GridVue) => {
  try {
    if (component) {
      const opts = component.options as Partial<UserConfig>
      if (component.grid) component.grid.updateConfig(opts).forceRender()
    }
  } catch (error) {
    console.error(error)
  }
}

export default update
