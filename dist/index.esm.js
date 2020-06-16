/*!
 * vue-gridjs v0.1.0
 * (c) 
 */
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.search';
import { Grid } from 'gridjs';
import uuid from 'uuid-random';
import elementReady from 'element-ready';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';
import __vue_create_injector__ from 'vue-runtime-helpers/dist/inject-style/browser.mjs';

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

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
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    search: {
      type: [Object, Boolean],
      default: false
    },
    server: {
      type: Object,
      default: undefined
    },
    sort: {
      type: [Object, Boolean],
      default: false
    },
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
    try {
      var _this2 = this;

      // give table a unique id
      _this2.uuid = uuid(); // select the unique wrapper element

      return _await(elementReady("[data-uuid=\"".concat(_this2.uuid, "\"]")), function (_elementReady) {
        _this2.wrapper = _elementReady;

        if (_this2.data && _this2.data.rows || _this2.server || _this2.from) {
          _this2.grid = new Grid({
            autoWidth: false,
            columns: _this2.data.cols,
            data: _this2.data.rows,
            from: _this2.from,
            pagination: _this2.pagination,
            search: _this2.search,
            server: _this2.server,
            sort: _this2.sort,
            width: _this2.width
          }).render(_this2.wrapper);
        }
      }); // instantiate grid.js
    } catch (e) {
      return Promise.reject(e);
    }
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
  inject("data-v-68133c66_0", {
    source: ".mermaid[data-v-68133c66]{@import '~gridjs/dist/theme/mermaid.css';}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-68133c66";
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

export default __vue_component__;
export { install };
