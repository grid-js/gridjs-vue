import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'ImportServerSideData',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Name', 'Language', 'Released At', 'Artist'],
      server: {
        url: 'https://api.scryfall.com/cards/search?q=Inspiring',
        then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist])
      }
    }
  },
  template: `
    <div><grid :columns="columns" :server="server"></grid></div>
  `
}
