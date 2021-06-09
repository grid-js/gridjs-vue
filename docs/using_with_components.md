# Using with Vue components

`gridjs-vue` comes with a [helper method](helpers.md), `$gridjs.helper()`, with which you can insert a Vue component directly into a
table cell or row.

```html
<template>
  <grid :columns="columns" :rows="rows"></grid>
</template>

<script>
  import faker from 'https://cdn.skypack.dev/faker'
  import { Grid } from '../../dist/index.esm.js'
  import TestComponent from '../test-component.mjs'

  export default {
    name: 'VueComponentInCells',
    components: {
      Grid
    },
    data() {
      return {
        columns: [
          {
            name: 'Name',
            formatter: cell =>
              return this.$gridjs.helper({
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
    }
  }
</script>
```

## Handling child component events

If the Vue component you are inserting into the Grid.js instance has events that bubble up, you can handle them by
passing a `methods` object to `$gridjs.helper()` containing your event handler.

```html
<template>
  <grid :columns="columns" :rows="rows"></grid>
</template>

<script>
  import faker from 'https://cdn.skypack.dev/faker'
  import { Grid } from '../../dist/index.esm.js'
  import TestComponent from '../test-component.mjs'

  export default {
    name: 'VueEvents',
    components: {
      Grid
    },
    data() {
      return {
        columns: [
          {
            name: 'Name',
            formatter: cell => {
              return this.$gridjs.helper({
                components: { TestComponent },
                template: `<test-component :content="content" @sayHello="hello"></test-component>`,
                data() {
                  return {
                    content: `🥳 ${cell}`
                  }
                },
                methods: {
                  hello() {
                    console.log('Hello!')
                  }
                }
              })
            }
          },
          'Email'
        ],
        rows: Array(5)
          .fill()
          .map(() => [faker.name.findName(), faker.internet.email()])
      }
    }
  }
</script>
```

[< Back to contents](index.md)
