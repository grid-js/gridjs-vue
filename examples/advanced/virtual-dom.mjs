import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'VirtualDom',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email'],
      rows: Array(5)
        .fill()
        .map(() => [faker.name.findName(), this.bold(faker.internet.email())])
    }
  },
  methods: {
    bold(text) {
      return this.$gridjs.h('b', {}, text)
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
