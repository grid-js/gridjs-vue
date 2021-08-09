import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'
import TestComponent from '../test-component.mjs'

export default {
  name: 'VueComponentInCells',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell =>
            this.$gridjs.helper({
              components: { TestComponent },
              template: `<test-component :content="content"></test-component>`,
              data() {
                return {
                  content: `🥳 ${cell}`
                }
              }
            })
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
