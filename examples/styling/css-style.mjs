import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'CssStyle',
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
      styles: {
        table: {
          border: '3px solid #ccc'
        },
        th: {
          'background-color': 'rgba(0, 0, 0, 0.1)',
          color: '#000',
          'border-bottom': '3px solid #ccc',
          'text-align': 'center'
        },
        td: {
          'text-align': 'center'
        }
      }
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :styles="styles"></grid></div>
  `
}
