"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var t=require("gridjs");require("core-js/modules/es.array.concat"),require("core-js/modules/es.object.to-string"),require("core-js/modules/es.promise"),require("core-js/modules/es.regexp.exec"),require("core-js/modules/es.string.search");var i=require("nanoid"),r=e(require("element-ready")),s=e(require("gridjs/dist/theme/mermaid.css")),n=e(require("vue-runtime-helpers/dist/normalize-component.mjs")),o=e(require("vue-runtime-helpers/dist/inject-style/browser.mjs"));function a(){}function d(e,t,i){return i?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}var u=n({render:function(){var e=this.$createElement;return(this._self._c||e)("article",{class:"gridjs__wrapper",attrs:{id:"gridjs__"+this.uuid,"data-uuid":this.uuid}})},staticRenderFns:[]},(function(e){e&&e("data-v-fc3dc69a_0",{source:".gridjs__wrapper[data-v-fc3dc69a]{align-items:center;display:flex;height:fit-content;justify-content:center;width:100%}",map:void 0,media:void 0})}),{name:"Grid",props:{autoWidth:{type:Boolean,default:!0},classNames:{type:Object,default:void 0},cols:{type:Array,default:void 0},from:{type:[String,Function],default:void 0},language:{type:Object,default:void 0},pagination:{type:[Object,Boolean],default:!1},rows:{type:[Array,Function],default:void 0},search:{type:Boolean,default:!1},server:{type:[Object,Function],default:void 0},sort:{type:[Object,Boolean],default:!1},styles:{type:Object,default:void 0},theme:{type:String,default:"mermaid"},width:{type:String,default:"100%"}},data:function(){return{dict:{error:{columnsUndefined:"Column headers are undefined",rowsUndefined:"No data to display"}},grid:null,uuid:null,wrapper:null,themes:{mermaid:s}}},computed:{options:function(){var e={autoWidth:this.autoWidth,columns:this.cols?this.cols:[this.dict.error.columnsUndefined],data:this.rows?this.rows:this.from||this.server?void 0:[[this.dict.error.rowsUndefined]],pagination:this.pagination,sort:this.sort,width:this.width};return this.classNames&&(e.className=this.classNames),this.from&&(e.from="string"==typeof this.from?document.querySelector(this.from):document.createRange().createContextualFragment(this.from())),this.language&&(e.language=this.language),this.search&&(e.search=this.search),this.server&&(e.server=this.server),this.styles&&(e.style=this.styles),e}},watch:{autoWidth:function(){this.update()},classNames:function(){this.update()},cols:function(){this.update()},from:function(){this.update()},language:function(){this.update()},pagination:function(){this.update()},rows:function(){this.update()},search:function(){this.update()},server:function(){this.update()},sort:function(){this.update()},styles:function(){this.update()},width:function(){this.update()}},mounted:function(){try{var e=this;return e.uuid=i.nanoid(),d(r('[data-uuid="'.concat(e.uuid,'"]'),{stopOnDomReady:!1}),(function(i){return e.wrapper=i,r=function(){e.wrapper&&(e.options.data||e.options.from||e.options.server)&&(e.grid=new t.Grid(e.options).render(e.wrapper))},(s=function(){if("none"!==e.theme)return function(e,t){if(!t)return e&&e.then?e.then(a):Promise.resolve()}(e.assignTheme())}())&&s.then?s.then(r):r(s);var r,s}))}catch(e){return Promise.reject(e)}},destroyed:function(){this.grid=void 0,this.wrapper=void 0},methods:{assignTheme:function(){try{var e=document.getElementsByTagName("head")[0],t="gridjs__".concat(this.uuid),i=document.createRange().createContextualFragment('\n        <style title="'.concat(t,'_theme" type="text/css">\n          ').concat(this.themes[this.theme],"\n        </style>\n      "));for(var r in e.appendChild(i),document.styleSheets)document.styleSheets[r].title==="".concat(t,"_theme")&&(i=document.styleSheets[r]);if(i instanceof CSSStyleSheet)for(var s in i.cssRules){var n=i.cssRules[s].cssText;if(n&&!/@/g.test(n)){var o="#".concat(t," ").concat(n);i.deleteRule(s),i.insertRule(o,s)}}return d()}catch(e){return Promise.reject(e)}},update:function(){this.grid.updateConfig(this.options).forceRender()}}},"data-v-fc3dc69a",!1,void 0,!1,o,void 0,void 0);function c(e){c.installed||(c.installed=!0,e.component("Grid",u),e.prototype.$gridjs||(e.prototype.$gridjs={createRef:t.createRef,h:t.h,html:t.html}))}var l={install:c},h=null;"undefined"!=typeof window?h=window.Vue:"undefined"!=typeof global&&(h=global.Vue),h&&h.use(l),exports.Grid=u,exports.GridGlobal=l,exports.default=u,exports.install=c;
//# sourceMappingURL=index.js.map
