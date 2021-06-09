# gridjs-vue

![gridjs-vue logo](https://user-images.githubusercontent.com/2541728/84843482-ffc31c00-b015-11ea-95e8-dc6fb3931ad5.png)

A Vue wrapper component for [Grid.js](https://gridjs.io).

[![npm](https://img.shields.io/npm/v/gridjs-vue?color=blue&label=current&style=flat-square)](https://www.npmjs.com/package/gridjs-vue)
![Grid.js API
version](https://img.shields.io/badge/Grid.js%20API-v5.0.1-blue?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/grid-js/gridjs-vue?color=41B883&style=flat-square)
[![GitHub
issues](https://img.shields.io/github/issues/grid-js/gridjs-vue?color=41B883&style=flat-square)](https://github.com/grid-js/gridjs-vue/issues)
[![Discord](https://img.shields.io/discord/711188165850955858?color=41B883&style=flat-square&label=discord)](https://discord.com/invite/K55BwDY)

## Install

```sh
npm install gridjs-vue
```

Also available on [unpkg](https://unpkg.com/browse/gridjs-vue@5.0.1/dist/) and [Skypack](https://www.skypack.dev/view/gridjs-vue)!

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
import { GridGlobal } from 'gridjs-vue'

Vue.use(GridGlobal)
```

## Usage

Pass `columns` (an array of column headers) and either `rows`, `from`, or `server` as a data source to the component. Everything else is optional. Pass in new data to update the table.

Refer to [Grid.js documentation](https://gridjs.io/docs/config/) for specific configuration options. This module may lag behind the main Grid.js module somewhat, so check the API version badge at the top of this README.

### Basic Example

```html
<template>
  <grid :columns="columns" :rows="rows" @ready="myMethod"></grid>
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
        columns: ['Make', 'Model', 'Year', 'Color'],
        rows: [
          ['Ford', 'Fusion', '2011', 'Silver'],
          ['Chevrolet', 'Cruz', '2018', 'White']
        ]
      }
    },
    methods: {
      myMethod() {
        console.log("It's ready!")
      }
    }
  }
</script>
```

### Default Options

```json
{
  "autoWidth": true,
  "className": undefined,
  "columns": [""],
  "fixedHeader": false,
  "from": undefined,
  "height": undefined,
  "language": undefined,
  "pagination": false,
  "resizable": true,
  "rows": undefined,
  "search": false,
  "server": undefined,
  "sort": false,
  "style": undefined,
  "theme": "mermaid",
  "width": "100%"
}
```

### Extended Options

```html
<template>
  <grid
    :auto-width="autoWidth"
    :class-name="className"
    :columns="columns"
    :fixed-header="fixedHeader"
    :from="from"
    :height="height"
    :language="language"
    :pagination="pagination"
    :resizable="resizable"
    :rows="rows"
    :search="search"
    :server="server"
    :sort="sort"
    :style="style"
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
        columns: ['col 1', 'col 2'],

        // OR an array containing objects defining column headers
        columns: [
          {
            name: 'Column 1',
            id: 'col1'
          },
          {
            name: 'Column 2',
            id: 'col2',
            formatter: (cell) => this.$gridjs.html(`<b>${cell}</b>`)
          }
        ],

        // AND EITHER an array containing row data
        // `data` in the Grid.js API
        rows: [
          ['row 1 col 1', 'row 1 col 2'],
          ['row 2 col 1', 'row 2 col 2']
        ],

        // OR an array containing JSON row data
        rows: [
          { col1: 'row 1', col2: 'row 1' },
          { col1: 'row 2', col2: 'row 2' }
        ],

        // OR a function returning an array of row data
        rows() {
          return [
            { col1: 3 + 4, col2: 5 + 6 },
            { col1: 1 * 2, col2: 7 * 8 }
          ]
        },

        // OR a string of an HTML table selector to import
        from: '.my-element',

        // OR a function returning an HTML table string
        from() {
          return `
            <table>
              <tr><th>column 1</th></tr>
              <tr><td>${1 * 2}</td></tr>
            </table>
          `
        },

        // OR a server settings function or object
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

        // Object with CSS class definitions (see Grid.js API)
        className: {},

        // Boolean to fix positioning of table header
        fixedHeader: true / false,

        // CSS string setting explicit table height
        height: '500px',

        // Localization dictionary object (see Grid.js API)
        language: {},

        // Boolean or pagination settings object
        pagination: true / false || {},

        // Boolean to enable column resizing
        resizable: true / false || {}

        // Boolean to enable search bar
        search: true / false || {},

        // Boolean or sort settings object
        sort: true / false || {},

        // Object with CSS styles (see Grid.js API)
        styles: {},

        // String with name of theme or 'none' to disable
        theme: 'mermaid' || 'none',

        // CSS string setting explicit table width
        width: '100%',
      }
    }
  }
</script>
```

### Helper Functions

#### \$gridjs.helper

Simplifies use of Vue components in table formatters.

Usage:

```js
export default {
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell =>
            this.$gridjs.helper({
              components: { TestComponent },
              template: `<test-component :content="content"></test-component>`,
              data() {
                return {
                  content: `🥳 ${cell}`
                }
              }
            })
        },
        'Email'
      ],
      rows: Array(5)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email()])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
```

#### \$gridjs.html

Renders [HTML in a formatter function](https://gridjs.io/docs/examples/html-cells).

Example:

```js
this.columns = [
  {
    name: 'Model',
    formatter: cell => this.$gridjs.html(`<b>${cell}</b>`)
  }
]
```

#### \$gridjs.h

Grid.js is built in Preact, so why not take advantage of it? Renders a [Preact virtual DOM instance](https://gridjs.io/docs/examples/virtual-dom).

Usage:

```js
this.columns = [
  {
    name: 'Actions',
    formatter: (cell, row) => {
      return this.$gridjs.h(
        'button',
        {
          onClick: () =>
            alert(`
          Editing "${row.cells[0].data}"
        `)
        },
        'Edit'
      )
    }
  }
]
```

## Examples

Be sure to check out the [`examples` folder](https://github.com/grid-js/gridjs-vue), where you'll find a Vue implementation of each example on the Grid.js website.

## 🤝 Contributing

Originally authored by [Daniel Sieradski](https://twitter.com/self_agency).

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/grid-js/gridjs-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!
