import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'RowButtons',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name'
        },
        'Email',
        {
          name: 'Actions',
          formatter: (cell, row) => {
            return this.$gridjs.h(
              'button',
              {
                className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
              },
              'Edit'
            )
          }
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
