import parseStylesheet from 'https://cdn.skypack.dev/parse-css-stylesheet'
import { injectStyle } from 'https://cdn.skypack.dev/styl-injector'
import { uid } from 'https://cdn.skypack.dev/uid'
import { Grid } from 'https://unpkg.com/gridjs@5.0.1/dist/gridjs.module.js'

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
    fixedHeader: {
      type: Boolean,
      default: false
    },
    from: {
      type: [String, Function],
      default: undefined
    },
    height: {
      type: String,
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
    resizable: {
      type: Boolean,
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
      grid: null,
      resize: null,
      uuid: null,
      wrapper: null
    }
  },
  computed: {
    options() {
      let options = {
        autoWidth: this.autoWidth,
        fixedHeader: this.fixedHeader,
        pagination: this.pagination,
        resizable: this.resizable,
        sort: this.sort,
        width: this.width
      }

      if (this.columns) options.columns = this.columns
      if (this.rows) options.data = this.rows
      if (this.className) options.className = this.className
      if (this.from)
        options.from =
          typeof this.from === 'string'
            ? document.querySelector(this.from)
            : document.createRange().createContextualFragment(this.from())
      if (this.height) options.height = this.height
      if (this.language) options.language = this.language
      if (this.search) options.search = this.search
      if (this.server) options.server = this.server
      if (this.styles) options.style = this.styles

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
    fixedHeader() {
      this.update()
    },
    from() {
      this.update()
    },
    height() {
      this.update()
    },
    language() {
      this.update()
    },
    pagination() {
      this.update()
    },
    resizable() {
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
    this.$nextTick(() => this.$emit('ready'))
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

          let stylesheet = ''

          for (const index in theme.cssRules) {
            let css = theme.cssRules[index].cssText
            if (css && !/^@/g.test(css)) {
              stylesheet = `${stylesheet}\n\n#${this.divId} ${css}`
            }
          }

          injectStyle(stylesheet, `${this.divId}_styles`)
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
    <article :id="divId" :data-uuid="uuid"></article>
  `
}
