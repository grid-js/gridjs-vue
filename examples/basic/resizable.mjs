import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'Resizable',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      sort: true,
      resizable: true,
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort" :resizable="resizable"></grid></div>
  `
}
