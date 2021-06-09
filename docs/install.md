# Install

```sh
npm install gridjs-vue
```

Also available on [unpkg](https://unpkg.com/browse/gridjs-vue@5.0.1/dist/) and [Skypack](https://www.skypack.dev/view/gridjs-vue)!

## Component Registration

### Local Registration

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

### Global Registration

```js
/* in `main.js` or wherever you specify your global components */
import { GridGlobal } from 'gridjs-vue'

Vue.use(GridGlobal)
```

[< Back to contents](index.md)
