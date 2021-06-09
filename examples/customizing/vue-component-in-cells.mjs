import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/index.esm.js'
import TestComponent from './test-component.mjs'

export default {
  name: 'VueComponentInCells',
  components: {
    Grid,
    TestComponent
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell =>
            this.$gridjs.helper({ TestComponent }, `<test-component content="🥳 ${cell}"></test-component>`)
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
