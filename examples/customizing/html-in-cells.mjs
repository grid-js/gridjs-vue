import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'HtmlInCells',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell => this.$gridjs.html(`<b>${cell}</b>`)
        },
        'Email',
        {
          name: 'Actions',
          formatter: (_, row) => this.$gridjs.html(`<a href='mailto:${row.cells[1].data}'>Email</a>`)
        }
      ],
      rows: Array(5)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email(), null])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
