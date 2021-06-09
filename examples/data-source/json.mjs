import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'Json',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          id: 'name',
          name: 'Name'
        },
        {
          id: 'email',
          name: 'Email'
        },
        {
          id: 'phoneNumber',
          name: 'Phone Number'
        }
      ],
      rows: [
        { name: 'John', email: 'john@example.com', phoneNumber: '(353) 01 222 3333' },
        { name: 'Mark', email: 'mark@gmail.com', phoneNumber: '(01) 22 888 4444' }
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
