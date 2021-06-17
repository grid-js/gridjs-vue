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

Also available on [unpkg](https://unpkg.com/browse/gridjs-vue/dist/) and [Skypack](https://www.skypack.dev/view/gridjs-vue)!

```html
<script>
  import { Grid } from 'gridjs-vue'

  export default {
    components: {
      Grid
    }
  }
</script>
```

## Basic Usage

Pass `columns` (an array of column headers) and either `rows`, `from`, or `server` as a data source to the component. Everything else is optional. Pass in new data to update the table.

**[Read the full documentation](docs/index.md) for further configuration options.**

### Example

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

## 🤝 Contributing

Originally authored by [Daniel Sieradski](https://twitter.com/self_agency).

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/grid-js/gridjs-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!
