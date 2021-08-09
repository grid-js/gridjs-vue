import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'CellFormatting',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell => `Name: ${cell}`
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
