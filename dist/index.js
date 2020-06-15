/*!
 * vue-gridjs v0.1.0
 * (c) 
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es.regexp.exec');
require('core-js/modules/es.string.search');
require('regenerator-runtime/runtime');
var _asyncToGenerator = _interopDefault(require('../node_modules/@babel/runtime/helpers/esm/asyncToGenerator'));
var gridjs = require('gridjs');
var uuid = require('uuid');
var elementReady = _interopDefault(require('element-ready'));
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.mjs'));
var __vue_create_injector__ = _interopDefault(require('vue-runtime-helpers/dist/inject-style/browser.mjs'));

var script = {
  name: 'Grid',
  props: {
    autoWidth: {
      type: Boolean,
      default: true
    },
    from: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: function _default() {
        return {
          cols: ['Table is null'],
          rows: ['Please add some data']
        };
      }
    },
    language: {
      type: Object,
      default: undefined
    },
    pagination: [Object, Boolean],
    search: [Object, Boolean],
    server: {
      type: Object,
      default: undefined
    },
    sort: [Object, Boolean],
    theme: {
      type: String,
      default: 'mermaid'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data: function data() {
    return {
      uuid: null,
      wrapper: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // give table a unique id
              _this.uuid = uuid.v4(); // select the unique wrapper element

              _context.next = 3;
              return elementReady("[data-uuid=\"".concat(_this.uuid, "\"]"));

            case 3:
              _this.wrapper = _context.sent;

              // instantiate grid.js
              if (_this.data && _this.data.rows || _this.server || _this.from) {
                _this.grid = new gridjs.Grid({
                  autoWidth: false,
                  columns: _this.data.cols,
                  data: _this.data.rows,
                  from: _this.from,
                  pagination: _this.pagination,
                  search: _this.search,
                  server: _this.server,
                  sort: _this.sort,
                  width: _this.width
                }).render(_this.wrapper);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  destroyed: function destroyed() {
    // unload from memory
    this.grid = undefined;
    this.wrapper = undefined;
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('article', {
    class: "gridjs__wrapper " + _vm.theme,
    attrs: {
      "data-uuid": _vm.uuid
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-69be1d58_0", {
    source: ".mermaid[data-v-69be1d58]{@import '~gridjs/dist/theme/mermaid.css';}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-69be1d58";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, undefined, undefined);

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('Grid', __vue_component__);
}
var plugin = {
  install: install
};
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

exports.default = __vue_component__;
exports.install = install;
