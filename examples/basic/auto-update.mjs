import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'AutoUpdate',
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
      this.rows.push(['John', 'john@example.com', '(353) 01 222 3333'])
    }, 5000)
  },
  template: `
    <div><grid :columns="columns" :rows="rows" ref="myGrid"></grid></div>
  `
}
