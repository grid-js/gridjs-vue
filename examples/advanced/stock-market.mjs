import VueChartist from 'https://cdn.skypack.dev/v-chartist'
import { Grid } from '../../dist/index.esm.js'

const Bold = {
  props: {
    content: {
      type: Number,
      default: 0
    }
  },
  computed: {
    status() {
      return `color: ${this.content > 0 ? 'green' : 'red'};`
    }
  },
  template: `<strong :style="status">{{ content }}</strong>`
}

export default {
  name: 'StockMarket',
  components: {
    Grid
  },
  data() {
    return {
      sort: true,
      columns: [
        'Symbol',
        'Last price',
        {
          name: 'Difference',
          formatter: cell => {
            return this.$gridjs.helper({ Bold }, `<bold :content="${cell}"></bold>`)
          }
        },
        {
          name: 'Trend',
          sort: false,
          width: '100px',
          formatter: cell => {
            const data = {
              data: { series: [cell] },
              options: {
                height: '30px',
                showPoint: false,
                fullWidth: true,
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
                axisX: { showGrid: false, showLabel: false, offset: 0 },
                axisY: { showGrid: false, showLabel: false, offset: 0 }
              }
            }
            const template = `
            <div>
              <link rel="stylesheet" href="https://unpkg.com/chartist@0.11.4/dist/chartist.min.css"/>
              <vue-chartist :data="data" :options="options" type="Line"></vue-chartist>
            </div>
            `
            return this.$gridjs.helper({ VueChartist }, template, data)
          }
        }
      ],
      rows: [
        ['AAPL', 360.2, 20.19, [360, 363, 366, 361, 366, 350, 370]],
        ['ETSY', 102.1, 8.22, [90, 91, 92, 90, 94, 95, 99, 102]],
        ['AMZN', 2734.8, -30.01, [2779, 2786, 2792, 2780, 2750, 2765, 2740, 2734]],
        ['TSLA', 960.85, -40.91, [993, 990, 985, 983, 970, 985, 988, 960]]
      ]
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows" :sort="sort"></grid></div>
  `
}
