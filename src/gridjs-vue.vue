<template>
  <!-- TODO: Figure out a way to scope CSS to the component rather than the global scope -->
  <!-- TODO: Implement full Grid.js API -->
  <article :data-uuid="uuid" :class="`gridjs__wrapper`"></article>
</template>

<script>
import { Grid } from 'gridjs'
import uuid from 'uuid-random'
import elementReady from 'element-ready'

export default {
  name: 'Grid',
  props: {
    autoWidth: {
      type: Boolean,
      default: true
    },
    from: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: () => ({
        cols: ['Table is null'],
        rows: ['Please add some data']
      })
    },
    language: {
      type: Object,
      default: undefined
    },
    pagination: {
      type: [Object, Boolean],
      default: false
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
      uuid: null,
      wrapper: null
    }
  },
  async mounted() {
    // give table a unique id
    this.uuid = uuid()

    // select the unique wrapper element
    this.wrapper = await elementReady(`[data-uuid="${this.uuid}"]`)

    // instantiate grid.js
    if ((this.data && this.data.rows) || this.server || this.from) {
      this.grid = new Grid({
        autoWidth: false,
        columns: this.data.cols,
        data: this.data.rows,
        from: this.from,
        pagination: this.pagination,
        search: this.search,
        server: this.server,
        sort: this.sort,
        width: this.width
      }).render(this.wrapper)
    }
  },
  destroyed() {
    // unload from memory
    this.grid = undefined
    this.wrapper = undefined
  }
}
</script>

<style scoped>
@import '~gridjs/dist/theme/mermaid.css';
</style>
