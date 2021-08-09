import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'FixedHeader',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Title'],
      sort: true,
      pagination: true,
      fixedHeader: true,
      height: '400px',
      rows: Array(50)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email(), faker.name.title()])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :height="height" :sort="sort" :pagination="pagination" :fixed-header="fixedHeader"></grid></div>
  `
}
