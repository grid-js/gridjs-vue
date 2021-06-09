# Basic Usage

Pass `columns` (an array of column headers) and either `rows`, `from`, or `server` as a data source to the component. Everything else is optional. Pass in new data to update the table.

## Example

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

## Default Options

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

## Advanced Usage

[Click here](advanced_usage.md) for advanced usage instructions.

[< Back to contents](index.md)
