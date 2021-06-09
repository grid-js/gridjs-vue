import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/index.esm.js'
import TestComponent from '../test-component.mjs'

export default {
  name: 'VueEvents',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell => {
            return this.$gridjs.helper({
              components: { TestComponent },
              template: `<test-component :content="content" @sayHello="hello"></test-component>`,
              data() {
                return {
                  content: `🥳 ${cell}`
                }
              },
              methods: {
                hello() {
                  console.log('Hello!')
                }
              }
            })
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
