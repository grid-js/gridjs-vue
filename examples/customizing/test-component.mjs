export default {
  name: 'TestComponent',
  props: {
    content: {
      type: String,
      default: 'Hello, world!'
    }
  },
  data() {
    return {
      styling: 'color: #f00;'
    }
  },
  template: `
    <div>
      <div :style="styling" v-html="content"></div>
    </div>
  `
}
