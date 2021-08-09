import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'DynamicDataImport',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      rows: () => [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
