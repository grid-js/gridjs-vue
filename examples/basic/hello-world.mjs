import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'HelloWorld',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
      ]
    }
  },
  methods: {
    log(text) {
      console.log(text)
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" @ready="log('Hi to you too!')"></grid></div>
  `
}
