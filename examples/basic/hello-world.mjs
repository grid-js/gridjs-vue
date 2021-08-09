import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'HelloWorld',
  components: {
    Grid
  },
  data() {
    return {
      sort: true,
      columns: [
        'Name',
        'Email',
        {
          name: 'Phone Number',
          sort: {
            compare: (a, b) => {
              a = parseInt(a.replace(/\(|\)|\s/g, ''))
              b = parseInt(b.replace(/\(|\)|\s/g, ''))
              let out = 0
              if (a > b) out = 1
              if (a < b) out = -1
              return out
            }
          }
        }
      ],
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" ref="helloWorld"></grid></div>
  `
}
