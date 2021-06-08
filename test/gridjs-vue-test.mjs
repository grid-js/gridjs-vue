import { Grid } from '../dist/index.esm.js'

export default {
  name: 'GridTest',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Permit Type', 'Capacity', 'Issued', 'Waiting', 'Notified', '%Sold'],
      rows: [
        ['Commuter', 1000, 150, 20, 10, 15],
        ['Disability', 50, 50, 0, 0, 100],
        ['Employee', 100, 90, 0, 5, 90],
        ['Guest Permit', 'N/A', 492, 5, 3, 'N/A'],
        ['Night', 60, 32, 0, 0, 0.53],
        ['One Day', 'N/A', 101, 8, 3, 'N/A'],
        ['Resident', 250, 250, 0, 0, 100],
        ['Temporary', 'N/A', 23, 34, 12, 'N/A']
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :search="true" :sort="true"></grid></div>
  `
}
