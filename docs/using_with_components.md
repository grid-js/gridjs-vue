# Using with Vue components

`gridjs-vue` comes with a [helper method](helpers.md), `$gridjs.helper()`, with which you can insert a Vue component
directly into a table cell or row.

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
passing `methods` to `$gridjs.helper()` containing your event handler, just as you would normally.

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

## Using A Global Event Bus

Because it is instantiating within a Preact component, each Vue component becomes its own Vue instance and therefore cannot
communicate back with the main Vue application unless using a separate global event bus, as shown in the following implementation.

```js
import Emittery from 'https://cdn.skypack.dev/emittery'
import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/index.esm.js'

window.emitter = new Emittery()

const TestComponent = {
  name: 'TestComponent',
  props: {
    content: {
      type: String,
      default: 'Hello, world!'
    },
    emitter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      styling: 'color: #f00;'
    }
  },
  methods: {
    emit(args) {
      return window.emitter.emit(args)
    }
  },
  template: `
    <div>
      <div :style="styling" v-html="content" @click="emit('sayHello')"></div>
    </div>
  `
}

export default {
  name: 'SharedEventBus',
  components: {
    Grid
  },
  data() {
    return {
      emitter: window.emitter,
      columns: [
        {
          name: 'Name',
          formatter: cell => {
            return this.$gridjs.helper({
              components: { TestComponent },
              template: `<test-component :content="content"></test-component>`,
              data() {
                return {
                  content: `🥳 ${cell}`
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
  },
  mounted() {
    this.emitter.on('sayHello', () => console.log('hello'))
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
```

[< Back to contents](index.md)
