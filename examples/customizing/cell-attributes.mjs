import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'CellAttributes',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          attributes: {
            'data-field': 'name'
          }
        },
        'Email'
      ],
      rows: Array(5)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email()])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
