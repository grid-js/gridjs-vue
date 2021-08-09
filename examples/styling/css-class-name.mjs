import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'CssClassName',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      search: true,
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923']
      ],
      className: {
        td: 'my-custom-td-class',
        table: 'custom-table-classname'
      }
    }
  },
  template: `
    <div>
      <grid :columns="columns" :rows="rows" :className="className"></grid>
    </div>
  `
}
