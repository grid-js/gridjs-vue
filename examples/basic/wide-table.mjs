import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'WideTable',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Title', 'Company', 'Country', 'County'],
      sort: true,
      pagination: true,
      rows: Array(50)
        .fill()
        .map(() => [
          faker.name.findName(),
          faker.internet.email(),
          faker.name.title(),
          faker.company.companyName(),
          faker.address.country(),
          faker.address.county()
        ])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort" :pagination="pagination"></grid></div>
  `
}
