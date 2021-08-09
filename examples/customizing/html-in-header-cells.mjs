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
          id: 'name',
          name: this.$gridjs.html('<i>Name</i>')
        },
        {
          id: 'email',
          name: this.$gridjs.html(
            '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;">Email</div>'
          )
        }
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
