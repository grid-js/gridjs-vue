import { Grid } from 'https://unpkg.com/gridjs@5.0.1/dist/gridjs.module.js'
import { injectStyle } from 'https://unpkg.com/styl-injector@1.4.0/dist/es2015/index.js'
import { uid } from 'https://unpkg.com/uid/single/index.mjs'

const waitForSelector = selector => {
  const element = document.querySelector(selector)
  if (element) return element

  const mutObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      const nodes = Array.from(mutation.addedNodes)
      for (const node of nodes) {
        if (node.matches && node.matches(selector)) {
          mutObserver.disconnect()
          return node
        }
      }
    }
  })

  mutObserver.observe(document.documentElement, { childList: true, subtree: true })
}

export default {
  name: 'Grid',
  props: {
    autoWidth: {
      type: Boolean,
      default: true
    },
    classNames: {
      type: Object,
      default: undefined
    },
    cols: {
      type: [Array, Function],
      default: undefined
    },
    from: {
      type: [String, Function],
      default: undefined
    },
    language: {
      type: Object,
      default: undefined
    },
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    rows: {
      type: [Array, Function],
      default: undefined
    },
    search: {
      type: Boolean,
      default: false
    },
    server: {
      type: [Object, Function],
      default: undefined
    },
    sort: {
      type: [Object, Boolean],
      default: false
    },
    styles: {
      type: Object,
      default: undefined
    },
    theme: {
      type: String,
      default: 'mermaid'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      activeTheme: null,
      dict: {
        error: {
          columnsUndefined: 'Column headers are undefined',
          rowsUndefined: 'No data to display'
        }
      },
      grid: null,
      uuid: null,
      wrapper: null
    }
  },
  computed: {
    tabularData() {
      if (this.rows) return this.rows
      if (this.from || this.server) return undefined
      return [[this.dict.error.rowsUndefined]]
    },
    options() {
      let options = {
        autoWidth: this.autoWidth,
        columns: this.cols ? this.cols : [this.dict.error.columnsUndefined],
        data: this.tabularData,
        pagination: this.pagination,
        sort: this.sort,
        width: this.width
      }

      if (this.classNames) options.className = this.classNames
      if (this.from)
        options.from =
          typeof this.from === 'string'
            ? document.querySelector(this.from)
            : document.createRange().createContextualFragment(this.from())
      if (this.language) options.language = this.language
      if (this.search) options.search = this.search
      if (this.server) options.server = this.server
      if (this.styles) options.style = this.styles

      return options
    },
    divId() {
      return `gridjs__${this.uuid}`
    }
  },
  watch: {
    autoWidth() {
      this.update()
    },
    classNames() {
      this.update()
    },
    cols() {
      this.update()
    },
    from() {
      this.update()
    },
    language() {
      this.update()
    },
    pagination() {
      this.update()
    },
    rows() {
      this.update()
    },
    search() {
      this.update()
    },
    server() {
      this.update()
    },
    sort() {
      this.update()
    },
    styles() {
      this.update()
    },
    width() {
      this.update()
    }
  },
  async created() {
    try {
      // give table a unique id
      this.uuid = uid(16)

      await waitForSelector(this.divId)
      this.wrapper = document.getElementById(this.divId)

      // assign styles
      this.activeTheme = !this.theme && this.$gridjs.options.theme ? this.$gridjs.options.theme : this.theme
      if (this.activeTheme !== 'none') this.assignTheme()
      if (Object.keys(this.$gridjs.options).length) this.setOptions()

      // instantiate grid.js
      if (this.wrapper && (this.options.data || this.options.from || this.options.server)) {
        this.grid = new Grid(this.options).render(this.wrapper)
      }
    } catch (error) {
      console.error(error)
    }
  },
  destroyed() {
    // unload from memory
    this.grid = undefined
    this.wrapper = undefined
  },
  methods: {
    async assignTheme() {
      try {
        const head = document.getElementsByTagName('head')[0]

        let styles = document.createElement('style')
        styles.id = `${this.divId}__theme`
        styles.type = 'text/css'
        head.appendChild(styles)

        let theme = await fetch(`https://unpkg.com/gridjs/dist/theme/mermaid.css`)
        theme = await theme.text()
        injectStyle(theme, styles.id)
      } catch (error) {
        console.error(error)
      }
    },
    setOptions() {
      try {
        const plugins = this.$gridjs.options.plugins
        if (plugins) {
          plugins.forEach(plugin => {
            this.grid.plugin.add(plugin)
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    update() {
      try {
        if (this.grid) this.grid.updateConfig(this.options).forceRender()
      } catch (error) {
        console.error(error)
      }
    }
  },
  template: `
    <article :id="divId" :data-uuid="uuid" class="gridjs__wrapper"></article>
  `
}
