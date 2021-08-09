import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'ForceRender',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      rows: [['Mark', 'mark@gmail.com', '(01) 22 888 4444']]
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.myGrid.grid
        .updateConfig({
          search: true,
          data: [
            ['John', 'john@example.com', '(353) 01 222 3333'],
            ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
          ]
        })
        .forceRender()
    }, 5000)
  },
  template: `
    <div><grid :columns="columns" :rows="rows" ref="myGrid"></grid></div>
  `
}
