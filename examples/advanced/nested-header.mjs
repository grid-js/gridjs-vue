import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'NestedHeader',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          columns: [
            {
              name: 'First'
            },
            {
              name: 'Last'
            }
          ]
        },
        'Email',
        {
          name: 'Address',
          columns: [
            {
              name: 'Country'
            },
            {
              name: 'City',
              columns: [
                {
                  name: 'Name'
                }
              ]
            }
          ]
        }
      ],
      rows: Array(5)
        .fill()
        .map(() => [
          faker.name.firstName(),
          faker.name.lastName(),
          faker.internet.email(),
          faker.address.countryCode(),
          faker.address.city()
        ])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
