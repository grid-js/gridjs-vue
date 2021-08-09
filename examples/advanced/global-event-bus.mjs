import Emittery from 'https://cdn.skypack.dev/emittery'
import faker from 'https://cdn.skypack.dev/faker'
import { Grid } from '../../dist/main.esm.js'

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
