import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'LoadingState',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      sort: true,
      search: true,
      rows: () => {
        return new Promise(resolve => {
          setTimeout(
            () =>
              resolve([
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
              ]),
            2000
          )
        })
      }
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort" :search="search"></grid></div>
  `
}
