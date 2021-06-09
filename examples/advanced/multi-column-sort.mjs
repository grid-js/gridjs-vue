import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'MultiColumnSort',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Age', 'Email'],
      sort: true,
      rows: [
        ['Mark', 25, 'john@example.com'],
        ['Nancy', 25, 'n99@gmail.com'],
        ['Eoin', 55, 'eo3n@yahoo.com'],
        ['Nisen', 60, 'nis900@gmail.com']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort"></grid></div>
  `
}
