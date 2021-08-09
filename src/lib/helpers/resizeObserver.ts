import { ResizeObserver as Polyfill } from '@juggle/resize-observer'
import { GridVue } from '../../main.d'
import update from '../methods/update'

const resizeObserver = (component: GridVue) => {
  try {
    const ResizeObserver = window.ResizeObserver || Polyfill

    component.resize = new ResizeObserver(() => {
      update(component)
    })

    if (component.$refs && component.uuid && component.$refs[component.uuid])
      component.resize.observe(component.$refs[component.uuid] as Element)
  } catch (error) {
    console.error(error)
  }
}

export default resizeObserver
