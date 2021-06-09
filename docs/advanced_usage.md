# Advanced Usage

## Extended Options

Refer to [Grid.js documentation](https://gridjs.io/docs/config/) for specific configuration options.

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

## Directly accessing the Grid.js instance

This component is innately reactive and updates itself when you change the component's data or options in Vue.
Interacting with the Grid.js instance directly should not be necessary but remains optional, as this implementation
demonstrates. The Grid.js instance can be accessed directly using a `ref` attribute, as shown below.

```html
<template>
  <grid :columns="columns" :rows="rows" ref="myGrid"></grid>
</template>

<script>
  export default {
    components: {
      Grid
    },
    data() {
      return {
        columns: ['Name', 'Email', 'Phone Number'],
        rows: [['Mark', 'mark@gmail.com', '(01) 22 888 4444']]
      }
    },
    mounted() {
      setTimeout(() => {
        this.$refs.myGrid.grid
          .updateConfig({
            search: true,
            data: [
              ['John', 'john@example.com', '(353) 01 222 3333'],
              ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
            ]
          })
          .forceRender()
      }, 5000)
    }
  }
</script>
```

[< Back to contents](index.md)
