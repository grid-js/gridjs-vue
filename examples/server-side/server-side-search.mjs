import { Grid } from '../../dist/index.esm.js'

export default {
  name: 'ServerSideSearch',
  components: {
    Grid
  },
  data() {
    return {
      pagination: true,
      search: {
        server: {
          url: (prev, keyword) => `${prev}?search=${keyword}`
        }
      },
      columns: ['Title', 'Director', 'Producer'],
      server: {
        url: 'https://swapi.dev/api/films/',
        then: data => data.results.map(movie => [movie.title, movie.director, movie.producer])
      }
    }
  },
  template: `
    <div><grid :columns="columns" :server="server" :search="search" :pagination="pagination"></grid></div>
  `
}
