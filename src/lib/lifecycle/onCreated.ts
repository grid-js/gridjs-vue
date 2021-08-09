import { Grid } from 'gridjs'
import { UserConfig } from 'gridjs/dist/src/config.d'
import { uid } from 'uid'
import { GridVue } from '../../main.d'
import waitForSelector from '../helpers/waitForSelector'

const onCreated = async (component: GridVue) => {
  try {
    // give table a unique id
    component.uuid = uid(16)

    // get the wrapper
    if (component.divId) {
      await waitForSelector(`#${component.divId}`)
      component.wrapper = document.getElementById(component.divId)
    }

    // instantiate grid.js
    if (
      component.wrapper &&
      component.options &&
      (component.options.data || component.options.from || component.options.server)
    ) {
      component.grid = new Grid(component.options as UserConfig).render(component.wrapper)
    }

    // return the updated component
    return component
  } catch (error) {
    console.error(error)
  }
}

export default onCreated
