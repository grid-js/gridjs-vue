import { css } from 'https://cdn.skypack.dev/@emotion/css'
import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'CssStyle',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Email', 'Phone Number'],
      search: true,
      rows: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923']
      ],
      className: {
        container: css`
          * {
            font-family: 'Tahoma';
          }
        `,
        table: css`
          tr:hover td {
            background-color: rgba(0, 0, 0, 0.1);
          }
        `,
        th: css`
          text-align: center;
          &:hover {
            background-color: #999;
            color: #fff;
          }
        `,
        td: css`
          color: #999;
          &:hover {
            color: #000;
          }
        `
      }
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :className="className" :search="search"></grid></div>
  `
}
