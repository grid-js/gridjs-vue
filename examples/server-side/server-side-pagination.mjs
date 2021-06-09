import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'ServerSidePagination',
  components: {
    Grid
  },
  data() {
    return {
      columns: ['Pokemon', 'URL'],
      pagination: {
        enabled: true,
        limit: 5,
        server: {
          url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`
        }
      },
      server: {
        url: 'https://pokeapi.co/api/v2/pokemon',
        then: data =>
          data.results.map(pokemon => [
            pokemon.name,
            this.$gridjs.html(`<a href='${pokemon.url}'>Link to ${pokemon.name}</a>`)
          ]),
        total: data => data.count
      }
    }
  },
  template: `
    <div><grid :columns="columns" :server="server" :pagination="pagination"></grid></div>
  `
}
