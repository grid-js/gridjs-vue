(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es.regexp.exec'), require('core-js/modules/es.string.search'), require('@babel/runtime/regenerator'), require('regenerator-runtime/runtime'), require('gridjs'), require('uuid'), require('element-ready')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.string.search', '@babel/runtime/regenerator', 'regenerator-runtime/runtime', 'gridjs', 'uuid', 'element-ready'], factory) :
  (global = global || self, factory(global.Grid = {}, null, null, global._regeneratorRuntime, null, global.gridjs, global.uuid, global.elementReady));
}(this, (function (exports, es_regexp_exec, es_string_search, _regeneratorRuntime, runtime, gridjs, uuid, elementReady) { 'use strict';

  _regeneratorRuntime = _regeneratorRuntime && Object.prototype.hasOwnProperty.call(_regeneratorRuntime, 'default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  elementReady = elementReady && Object.prototype.hasOwnProperty.call(elementReady, 'default') ? elementReady['default'] : elementReady;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
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

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{class:("gridjs__wrapper " + _vm.theme),attrs:{"data-uuid":_vm.uuid}})};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = "data-v-69be1d58";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var component = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('Grid', component);
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

  exports.default = component;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
