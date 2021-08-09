import { Grid } from '../../dist/main.esm.js'

export default {
  name: 'ServerSideSorting',
  components: {
    Grid
  },
  data() {
    return {
      sort: {
        multiColumn: false,
        server: {
          url: (prev, columns) => {
            if (!columns.length) return prev

            const col = columns[0]
            const dir = col.direction === 1 ? 'asc' : 'desc'
            let colName = ['name', 'rarity'][col.index]

            return `${prev}&order=${colName}&dir=${dir}`
          }
        }
      },
      columns: [
        'Name',
        'Rarity',
        {
          name: 'Image',
          width: '50px',
          sort: false,
          formatter: img => this.$gridjs.html(`<center><img src='${img}'/></center>`)
        }
      ],
      server: {
        url: 'https://api.scryfall.com/cards/search?q=Inspiring',
        then: data => data.data.map(card => [card.name, card.rarity, card.image_uris.small]),
        total: data => data.total_cards
      }
    }
  },
  template: `
    <div><grid :columns="columns" :server="server" :sort="sort"></grid></div>
  `
}
