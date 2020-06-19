<template>
  <article :id="`gridjs__${uuid}`" :data-uuid="uuid" :class="`gridjs__wrapper`"></article>
</template>

<script>
import { Grid } from 'gridjs'
import { nanoid } from 'nanoid'
import elementReady from 'element-ready'

export default {
  name: 'Grid',
  props: {
    autoWidth: {
      type: Boolean,
      default: true
    },
    cols: {
      type: Array,
      default: undefined
    },
    from: {
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
    rows: {
      type: Array,
      default: undefined
    },
    search: {
      type: [Object, Boolean],
      default: false
    },
    server: {
      type: Object,
      default: undefined
    },
    sort: {
      type: [Object, Boolean],
      default: false
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
      wrapper: null
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

      if (this.from) options.from = this.from
      if (this.language) options.language = this.language
      if (this.search) options.search = this.search
      if (this.server) options.server = this.server

      return options
    }
  },
  watch: {
    autoWidth() {
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
    width() {
      this.update()
    }
  },
  async mounted() {
    // give table a unique id
    this.uuid = nanoid()

    // select the unique wrapper element
    this.wrapper = await elementReady(`[data-uuid="${this.uuid}"]`)

    // assign styles
    if (this.theme !== 'none') await this.assignStyles()

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
    async assignStyles() {
      const themes = ['mermaid']

      if (themes.includes(this.theme)) {
        await import(`gridjs/dist/theme/${this.theme}.css`)
      }

      const styleSheets = document.styleSheets
      const id = `#gridjs__${this.uuid}`

      for (const sheetIndex in styleSheets) {
        const ss = styleSheets[sheetIndex]
        if (
          ss.cssRules &&
          ss.cssRules.length &&
          ss.cssRules[0] &&
          ss.cssRules[0].selectorText &&
          /^.gridjs/.test(ss.cssRules[0].selectorText)
        ) {
          for (const index in ss.cssRules) {
            let css = ss.cssRules[index].cssText
            if (css && !/@/g.test(css)) {
              const rule = `${id} ${css}`
              ss.deleteRule(index)
              ss.insertRule(rule, index)
            }
          }

          const wrapperStyle = `
            ${id}.gridjs__wrapper {
              align-items: center;
              display: flex;
              height: fit-content;
              justify-content: center;
              width: 100%;
            }
          `
          ss.insertRule(wrapperStyle)
          styleSheets[sheetIndex].disabled = false
          break
        }
      }
    },
    update() {
      this.grid.updateConfig(this.options).forceRender()
    }
  }
}
</script>
