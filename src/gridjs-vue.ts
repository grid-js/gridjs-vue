import onCreated from './lib/lifecycle/onCreated'
import onDestroyed from './lib/lifecycle/onDestroyed'
import onMounted from './lib/lifecycle/onMounted'
import setOptions from './lib/setup/options'
import props from './lib/setup/props'
import { setTheme } from './lib/setup/theme'
import watcher from './lib/setup/watch'
import { Grid, GridOptions, GridVue } from './main.d'

export default Vue.extend({
  name: 'Grid',
  props,
  data() {
    return {
      grid: null as null | Grid,
      resize: null as null | ResizeObserver,
      uuid: null as null | string,
      wrapper: null as null | HTMLElement
    }
  },
  computed: {
    options(): GridOptions {
      return setOptions(this)
    },
    activeTheme(): string {
      return setTheme(this)
    },
    divId(): string {
      return `gridjs__${this.uuid}`
    }
  },
  watch: watcher(this),
  async created(): Promise<GridVue | undefined> {
    return await onCreated(this as GridVue)
  },
  mounted(): GridVue | undefined {
    return onMounted(this as GridVue)
  },
  destroyed(): void {
    return onDestroyed(this as GridVue)
  },
  template: `
    <article :id="divId" :data-uuid="uuid" :ref="uuid"></article>
  `
})
