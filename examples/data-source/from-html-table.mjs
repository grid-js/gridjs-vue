import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'FromHtmlTable',
  components: {
    Grid
  },
  template: `
    <div>
      <table class="data">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <td>Mike</td>
            <td><b>mike@example.com</b></td>
          </tr>
        </tbody>
      </table>
      <grid from=".data"></grid>
    </div>
  `
}
