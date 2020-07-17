# gridjs-vue

![gridjs-vue logo](https://user-images.githubusercontent.com/2541728/84843482-ffc31c00-b015-11ea-95e8-dc6fb3931ad5.png)

A Vue wrapper component for [Grid.js](https://gridjs.io).

[![npm](https://img.shields.io/npm/v/gridjs-vue?color=41B883&label=current&style=flat-square)](https://www.npmjs.com/package/gridjs-vue) [![Grid.js API version](https://img.shields.io/github/package-json/dependency-version/grid-js/gridjs-vue/gridjs?color=41B883&label=grid.js%20api&style=flat-square)](https://gridjs.io/docs/index) ![GitHub last commit](https://img.shields.io/github/last-commit/grid-js/gridjs-vue?color=41B883&style=flat-square) [![GitHub issues](https://img.shields.io/github/issues/grid-js/gridjs-vue?color=41B883&style=flat-square)](https://github.com/grid-js/gridjs-vue/issues) [![Discord](https://img.shields.io/discord/711188165850955858?color=41B883&style=flat-square&label=discord)](https://discord.com/invite/K55BwDY)

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
import { GridGlobal } from 'gridjs-vue'

Vue.use(GridGlobal)
```

## Usage

Pass `cols` (an array of column headers) and either `rows`, `from`, or `server` as a data source to the component. Everything else is optional. Pass in new data to update the table.

Refer to [Grid.js documentation](https://gridjs.io/docs/config/) for specific configuration options. This module may lag behind the main Grid.js module somewhat, so check the API version badge at the top of this README.

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
  "classNames": undefined,
  "cols": [""],
  "from": undefined,
  "language": undefined,
  "pagination": false,
  "rows": undefined,
  "search": false,
  "server": undefined,
  "sort": false,
  "styles": undefined,
  "theme": "mermaid",
  "width": "100%"
}
```

### Extended Options

```html
<template>
  <grid
    :auto-width="autoWidth"
    :class-names="classNames"
    :cols="cols"
    :from="from"
    :language="language"
    :pagination="pagination"
    :rows="rows"
    :search="search"
    :server="server"
    :sort="sort"
    :styles="styles"
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

        // An array containing strings of column headers (`columns` in the Grid.js API)
        cols: ['col 1', 'col 2'],

        // OR an array containing objects defining column headers
        cols: [
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

        // AND EITHER an array containing row data (`data` in the Grid.js API)
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

        // Object with CSS class names (`className` in the Grid.js API)
        classNames: {},

        // Localization dictionary object
        language: {},

        // Boolean or pagination settings object
        pagination: true / false || {},

        // Boolean
        search: true / false,

        // Boolean or sort settings object
        sort: true / false || {},

        // Object with CSS styles (`style` in the Grid.js API)
        styles: {},

        // String with name of theme or 'none' to disable
        theme: 'mermaid',

        // String with css width value
        width: '100%',
      }
    }
  }
</script>
```

### Helper Functions

If you install the component globally, rather than importing it locally, the following helpers are added to the Vue prototype and are available globally.

#### \$gridjs.uuid

Returns a unique identifier that can be used to reference the current cell.

Usage:

```js
const ref = this.$gridjs.uuid()
```

#### \$gridjs.h

Renders a [Preact virtual DOM instance](https://gridjs.io/docs/examples/virtual-dom). Grid.js is built in Preact, so why not take advantage of it?

Usage:

```js
this.cols = [
  {
    name: 'Actions',
    formatter: (cell, row) => {
      return this.$gridjs.h('button', {
        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
        onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
      } 'Edit');
    }
  },
  { ... },
  { ... }
]
```

#### \$gridjs.html

Renders [HTML in a formatter function](https://gridjs.io/docs/examples/html-cells).

Example:

```js
this.cols = [
  {
    name: 'Model',
    formatter: cell => this.$gridjs.html(`<b>${cell}</b>`)
  },
  { ... },
  { ... }
]
```

#### \$gridjs.render

Renders a Vue component. Refer to [Vue documentation](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments) for advanced options.

Usage:

```js
this.$gridjs.render(ref, component, { props }, { options })
```

Example:

```js
import FormatterComponent from './FormatterComponent.vue'

[...]

this.cols = [
  {
    name: 'Model',
    formatter: cell => {
      const current = this.$gridjs.uuid()
      this.$gridjs.render(
        `[data-ref="${current}"]`,
        FormatterComponent,
        {
          content: cell,
          otherProp: true
        }
      )
      return this.$gridjs.html(`<div data-ref="${current}"></div>`)
    }
  },
  { ... },
  { ... }
]
```

## 🤝 Contributing

Originally authored by [Daniel Sieradski](https://twitter.com/self_agency).

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/grid-js/gridjs-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!
