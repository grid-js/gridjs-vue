import { Grid, UserConfig } from 'gridjs/dist/main.d'
import { CombinedVueInstance, Vue, VueConstructor } from 'vue/types/vue.d'

interface GridFrom {
  from?: HTMLElement | DocumentFragment | string | null
}

interface GridOptions extends Partial<UserConfig> {
  autoWidth?: boolean
  className?: object
  columns?: Function | any[]
  data?: Function | any[]
  fixedHeader?: boolean
  from?: From
  height?: string
  language?: string
  pagination?: object | boolean
  resizable?: boolean
  search?: object | boolean
  server?: object
  sort?: object | boolean
  style?: object
  styles?: string
  width?: string
}

interface GridVue extends GridOptions, CombinedVueInstance, Vue {
  $gridjs?: any
  activeTheme?: string | null
  divId?: string | null
  grid?: Grid
  options?: GridOptions
  resize?: ResizeObserver | null
  rows?: Function | any[]
  update?: Function
  uuid?: string | null
  wrapper?: HTMLElement | null
}

interface VueInstance extends VueConstructor {
  prototype?: {
    $gridjs?: any
  }
  installed?: boolean
}

export { GridFrom, GridOptions, GridVue, Grid, VueInstance }
