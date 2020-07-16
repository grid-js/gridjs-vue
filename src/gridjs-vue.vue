<template>
  <article :id="`gridjs__${uuid}`" :data-uuid="uuid" :class="`gridjs__wrapper`"></article>
</template>

<script>
import { Grid } from 'gridjs'
import { nanoid } from 'nanoid'
import elementReady from 'element-ready'

import themeMermaid from 'gridjs/dist/theme/mermaid.css'

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
      dict: {
        error: {
          columnsUndefined: 'Column headers are undefined',
          rowsUndefined: 'No data to display'
        }
      },
      grid: null,
      uuid: null,
      wrapper: null,
      themes: {
        mermaid: themeMermaid
      }
    }
  },
  computed: {
    options() {
      let options = {
        autoWidth: this.autoWidth,
        columns: this.cols ? this.cols : [this.dict.error.columnsUndefined],
        data: this.rows ? this.rows : this.from || this.server ? undefined : [[this.dict.error.rowsUndefined]],
        pagination: this.pagination,
        sort: this.sort,
        width: this.width
      }

      // let classNames

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
  async mounted() {
    // give table a unique id
    this.uuid = nanoid()

    // select the unique wrapper element
    this.wrapper = await elementReady(`[data-uuid="${this.uuid}"]`, { stopOnDomReady: false })

    // assign styles
    if (this.theme !== 'none') await this.assignTheme()

    // instantiate grid.js
    if (this.wrapper && (this.options.data || this.options.from || this.options.server)) {
      this.grid = new Grid(this.options).render(this.wrapper)
    }
  },
  destroyed() {
    // unload from memory
    this.grid = undefined
    this.wrapper = undefined
  },
  methods: {
    async assignTheme() {
      const head = document.getElementsByTagName('head')[0]
      const id = `gridjs__${this.uuid}`

      let stylesheet = document.createRange().createContextualFragment(`
        <style title="${id}_theme" type="text/css">
          ${this.themes[this.theme]}
        </style>
      `)
      head.appendChild(stylesheet)

      for (let index in document.styleSheets) {
        if (document.styleSheets[index].title === `${id}_theme`) stylesheet = document.styleSheets[index]
      }

      if (stylesheet instanceof CSSStyleSheet) {
        for (const index in stylesheet.cssRules) {
          let css = stylesheet.cssRules[index].cssText
          if (css && !/@/g.test(css)) {
            const rule = `#${id} ${css}`
            stylesheet.deleteRule(index)
            stylesheet.insertRule(rule, index)
          }
        }
      }
    },
    update() {
      if (this.grid) this.grid.updateConfig(this.options).forceRender()
    }
  }
}
</script>

<style scoped>
.gridjs__wrapper {
  align-items: center;
  display: flex;
  height: fit-content;
  justify-content: center;
  width: 100%;
}
</style>
