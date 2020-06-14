<template>
  <div id="app">
    <div v-for="(config, key) in configs" :key="key">
      <grid
        :auto-width="config.autowidth"
        :data="config.data"
        :from="config.from"
        :language="config.language"
        :pagination="config.pagination"
        :search="config.search"
        :server="config.server"
        :sort="config.sort"
        :width="config.width"
      ></grid>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'

export default {
  name: 'App',
  components: {
    Grid
  },
  data() {
    return {
      configs: [
        {
          data: {
            cols: ['a'],
            rows: ['b']
          }
        },
        {
          autoWidth: false,
          data: {
            cols: ['a'],
            rows: ['b']
          },
          pagination: false,
          search: false,
          sort: false,
          width: '500px'
        }
      ]
    }
  }
}
</script>
