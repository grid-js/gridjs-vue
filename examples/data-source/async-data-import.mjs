import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'AsyncDataImport',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      rows: () => {
        return new Promise(resolve => {
          setTimeout(
            () =>
              resolve([
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
              ]),
            1000
          )
        })
      }
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
