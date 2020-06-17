# gridjs-vue

![gridjs-vue](https://user-images.githubusercontent.com/2541728/84843482-ffc31c00-b015-11ea-95e8-dc6fb3931ad5.png)

A [Vue.js](https://vuejs.org) wrapper component for [Grid.js](https://grid.io)

### 🏠 [Homepage](https://gridjs.io)

## Install

```sh
yarn install gridjs-vue || npm install gridjs-vue
```

## Component Registration

### Global Registration

```js
/* in `main.js` or wherever you specify your global components */
import Grid from 'gridjs-vue'

Vue.use(Grid)
```

### Local Registration

```vue
<script>
import Grid from 'gridjs-vue'

export default {
  components: {
    Grid
  }
}
</script>
```

## Usage

Pass either `data`, `from`, or `server` as a data source. Everything else is optional.

Refer to [Grid.js documentation](https://gridjs.io/docs/config/) for specific configuration options.

```vue
<template>
  <grid
    :auto-width="autoWidth"
    :data="data"
    :from="from"
    :language="language"
    :pagination="pagination"
    :search="search"
    :server="server"
    :sort="sort"
    :width="width"
  ></grid>
</template>

<script>
import Grid from 'vue-gridjs'

export default {
  name: 'MyTable',
  components: {
    Grid
  },
  data() {
    return {
      autoWidth: true / false, // boolean to automatically set table width
      data: {
        // object containing arrays columns & rows
        cols: ['column 1', 'column 2'],
        rows: ['row 1: col 1', 'row 1: col 2']
      },
      from: '.my-element', // string of HTML table selector
      language: {}, // localization dictionary object
      pagination: true / false || {}, // boolean or pagination settings object
      search: true / false || {}, // boolean or search settings object
      server: {}, // server settings object
      sort: true / false || {}, // boolean or sort settings object
      theme: 'mermaid', // string with name of theme
      width: '100%' // string with css width value
    }
  }
}
</script>
```

### Default settings

```json
{
  "autoWidth": true,
  "data": {
    "cols": [""],
    "rows": [""]
  },
  "from": undefined,
  "language": undefined,
  "pagination": false,
  "search": false,
  "server": undefined,
  "sort": false,
  "theme": "mermaid",
  "width": "100%"
}
```

## Known Issues

- The full API for updating the component's data has not yet been implemented.
- The module currently loads CSS in the global scope. A future release will ensure that CSS is scoped solely to the component itself.
- Presently, the `mermaid.css` stylesheet, is the only available theme for Grid.js.

## 🤝 Contributing

Originally authored by [Daniel Sieradski](https://twitter.com/self_agency).

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/gridjs/gridjs-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!
