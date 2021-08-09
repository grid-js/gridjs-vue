export default {
  autoWidth: {
    type: Boolean,
    default: true
  },
  className: {
    type: Object,
    default: undefined
  },
  columns: {
    type: [Array, Function],
    default: undefined
  },
  fixedHeader: {
    type: Boolean,
    default: false
  },
  from: {
    type: [String, Function],
    default: undefined
  },
  height: {
    type: String,
    default: undefined
  },
  language: {
    type: Object,
    default: undefined
  },
  pagination: {
    type: [Object, Boolean],
    default: false
  },
  resizable: {
    type: Boolean,
    default: false
  },
  rows: {
    type: [Array, Function],
    default: undefined
  },
  search: {
    type: [Object, Boolean],
    default: false
  },
  server: {
    type: [Object, Function],
    default: undefined
  },
  sort: {
    type: [Object, Boolean],
    default: false
  },
  styles: {
    type: Object,
    default: undefined
  },
  theme: {
    type: String,
    default: undefined
  },
  width: {
    type: String,
    default: '100%'
  }
}
