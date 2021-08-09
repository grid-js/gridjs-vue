import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'Events',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      sort: true,
      search: true,
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923']
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.myGrid && this.$refs.myGrid.grid) {
        this.$refs.myGrid.grid.on('rowClick', (...args) => {
          console.log(`row: ${JSON.stringify(args)}`)
        })

        this.$refs.myGrid.grid.on('cellClick', (...args) => {
          console.log(`cell: ${JSON.stringify(args)}`)
        })
      }
    })
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort" ref="myGrid"></grid></div>
  `
}
