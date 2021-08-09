import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'HiddenColumns',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          hidden: true
        },
        'Email',
        'Title'
      ],
      sort: true,
      pagination: true,
      rows: Array(50)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email(), faker.name.title()])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort" :pagination="pagination"></grid></div>
  `
}
