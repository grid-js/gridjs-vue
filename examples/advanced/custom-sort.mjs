import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'CustomSort',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        'Name',
        'Email',
        {
          name: 'Phone Number',
          sort: {
            compare: (a, b) => {
              const code = x => x.split(' ')[0]

              if (code(a) > code(b)) {
                return 1
              } else if (code(b) > code(a)) {
                return -1
              } else {
                return 0
              }
            }
          }
        }
      ],
      sort: true,
      rows: [
        ['John', 'john@example.com', '+353 40 222 3333'],
        ['Mark', 'mark@gmail.com', '+1 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '+355 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '+313 333 1923']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort"></grid></div>
  `
}
