import { Grid } from 'https://unpkg.com/gridjs@5.0.1/dist/gridjs.module.js'
import parseStylesheet from 'https://unpkg.com/parse-css-stylesheet/index.js'
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
    className: {
      type: Object,
      default: undefined
    },
    columns: {
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
      type: [Object, Boolean],
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
      default: undefined
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      dict: {
        error: {
          columnsUndefined: 'Column headers are undefined',
          rowsUndefined: 'No data to display'
        }
      },
      grid: null,
      resize: null,
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
        columns: this.columns ? this.columns : [this.dict.error.columnsUndefined],
        data: this.tabularData,
        pagination: this.pagination,
        sort: this.sort,
        width: this.width
      }

      if (this.className) options.className = this.className
      if (this.from)
        options.from =
          typeof this.from === 'string'
            ? document.querySelector(this.from)
            : document.createRange().createContextualFragment(this.from())
      if (this.language) options.language = this.language
      if (this.search) options.search = this.search
      if (this.server) options.server = this.server
      if (this.style) options.style = this.style

      return options
    },
    activeTheme() {
      if (this.theme) return this.theme
      if (this.$gridjs.options.theme) return this.$gridjs.options.theme
      return 'mermaid'
    },
    divId() {
      return `gridjs__${this.uuid}`
    }
  },
  watch: {
    autoWidth() {
      this.update()
    },
    className() {
      this.update()
    },
    columns() {
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
    style() {
      this.update()
    },
    theme() {
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

      // get the wrapper
      await waitForSelector(this.divId)
      this.wrapper = document.getElementById(this.divId)

      // instantiate grid.js
      if (Object.keys(this.$gridjs.options).length) this.setOptions()
      if (this.wrapper && (this.options.data || this.options.from || this.options.server)) {
        this.grid = new Grid(this.options).render(this.wrapper)
      }
    } catch (error) {
      console.error(error)
    }
  },
  mounted() {
    this.assignTheme()

    this.resize = window.addEventListener('resize', () => this.update(), true)
  },
  destroyed() {
    // unload from memory
    this.grid = undefined
    this.wrapper = undefined
    window.removeEventListener(this.resize)
  },
  methods: {
    async assignTheme() {
      try {
        if (this.activeTheme !== 'none') {
          const head = document.getElementsByTagName('head')[0]

          let styles = document.createElement('style')
          styles.title = `${this.divId}__theme`
          styles.type = 'text/css'
          head.appendChild(styles)

          let theme = await fetch(`https://unpkg.com/gridjs/dist/theme/${this.activeTheme}.css`)
          theme = parseStylesheet(await theme.text())

          for (let index in document.styleSheets) {
            if (document.styleSheets[index].title === styles.title) {
              styles = document.styleSheets[index]
            }
          }

          for (const index in theme.cssRules) {
            let css = theme.cssRules[index].cssText
            if (css && !/^@/g.test(css)) {
              styles.insertRule(`#${this.divId} ${css}`)
            }
          }
        }
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
