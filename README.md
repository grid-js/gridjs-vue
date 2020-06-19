# gridjs-vue

<center><img src="https://user-images.githubusercontent.com/2541728/84843482-ffc31c00-b015-11ea-95e8-dc6fb3931ad5.png" alt="gridjs-vue logo" /></center>

A Vue wrapper component for [Grid.js](https://gridjs.io).

## Install

```sh
npm install gridjs-vue
```

### Component Registration

#### Local Registration

```html
<script>
  import Grid from 'gridjs-vue'

  export default {
    components: {
      Grid
    }
  }
</script>
```

#### Global Registration

```js
/* in `main.js` or wherever you specify your global components */
import Grid from 'gridjs-vue'

Vue.use(Grid)
```

## Usage

Pass `cols` (an array of column headers) and either `rows`, `from`, or `server` as a data source to the component. Everything else is optional.

Refer to [Grid.js documentation](https://gridjs.io/docs/config/) for specific configuration options.

### Basic Example

```html
<template>
  <grid :cols="cols" :rows="rows"></grid>
</template>

<script>
  import Grid from 'gridjs-vue'

  export default {
    name: 'Cars',
    components: {
      Grid
    },
    data() {
      return {
        cols: ['Make', 'Model', 'Year', 'Color'],
        rows: [
          ['Ford', 'Fusion', '2011', 'Silver'],
          ['Chevrolet', 'Cruz', '2018', 'White']
        ]
      }
    }
  }
</script>
```

### Default Options

```json
{
  "autoWidth": true,
  "cols": [""],
  "from": undefined,
  "language": undefined,
  "pagination": false,
  "rows": undefined,
  "search": false,
  "server": undefined,
  "sort": false,
  "theme": "mermaid",
  "width": "100%"
}
```

### Extended Options

```html
<template>
  <grid
    :auto-width="autoWidth"
    :cols="cols"
    :from="from"
    :language="language"
    :pagination="pagination"
    :rows="rows"
    :search="search"
    :server="server"
    :sort="sort"
    :width="width"
  ></grid>
</template>

<script>
  import Grid from 'gridjs-vue'

  export default {
    name: 'MyTable',
    components: {
      Grid
    },
    data() {
      return {
        // REQUIRED:

        // An array containing strings of column headers
        cols: ['col 1', 'col 2'],

        // AND EITHER an array containing row data
        rows: [
          ['row 1 col 1', 'row 1 col 2'],
          ['row 2 col 1', 'row 2 col 2']
        ],

        // OR a string of an HTML table selector to import
        from: '.my-element'

        // OR a server settings object
        server() ({
          url: 'https://api.com/search?q=my%20query',
          then: res => res.data.map(col => [col1.data, col2.data]),
          handle: res => res.status === 404
            ? { data: [] } : res.ok
            ? res.json() : new Error('Something went wrong')
        }),

        // OPTIONAL:

        // Boolean to automatically set table width
        autoWidth: true / false,

        // Localization dictionary object
        language: {},

        // Boolean or pagination settings object
        pagination: true / false || {},

        // Boolean or search settings object
        search: true / false || {},

        // Boolean or sort settings object
        sort: true / false || {},

        // String with name of theme or 'none' to disable
        theme: 'mermaid',

        // String with css width value
        width: '100%',
      }
    }
  }
</script>
```

## 🤝 Contributing

Originally authored by [Daniel Sieradski](https://twitter.com/self_agency).

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/grid-js/gridjs-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!
