'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = _interopDefault(require('crypto'));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$1 = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$2 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$2();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process$1 = global_1.process;
var versions = process$1 && process$1.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$2 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

// @@search logic
fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regexpExecAbstract(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime =  module.exports ;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(e,n){return (t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);})(e,n)};function e(e,n){function r(){this.constructor=e;}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r);}var n=function(){return (n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function r(t,e,n,r){return new(n||(n=Promise))((function(o,i){function s(t){try{u(r.next(t));}catch(t){i(t);}}function a(t){try{u(r.throw(t));}catch(t){i(t);}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e);}))).then(s,a);}u((r=r.apply(t,e||[])).next());}))}function o(t,e){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s);}catch(t){i=[6,t],r=0;}finally{n=o=0;}if(5&i[0])throw i[1];return {value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function i(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],s=0,a=i.length;s<a;s++,o++)r[o]=i[s];return r}function s(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return ("x"==t?e:3&e|8).toString(16)}))}var a,u,c,l,p,h,f$5,d=function(){function t(t){this._id=t||s();}return Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),t}(),_={},y=[],g=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function m(t,e){for(var n in e)t[n]=e[n];return t}function v(t){var e=t.parentNode;e&&e.removeChild(t);}function b(t,e,n){var r,o=arguments,i={};for(r in e)"key"!==r&&"ref"!==r&&(i[r]=e[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof t&&null!=t.defaultProps)for(r in t.defaultProps)void 0===i[r]&&(i[r]=t.defaultProps[r]);return w(t,i,e&&e.key,e&&e.ref,null)}function w(t,e,n,r,o){var i={type:t,props:e,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o};return null==o&&(i.__v=i),a.vnode&&a.vnode(i),i}function P(t){return t.children}function S(t,e){this.props=t,this.context=e;}function x(t,e){if(null==e)return t.__?x(t.__,t.__.__k.indexOf(t)+1):null;for(var n;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e)return n.__e;return "function"==typeof t.type?x(t):null}function C(t){var e,n;if(null!=(t=t.__)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e){t.__e=t.__c.base=n.__e;break}return C(t)}}function N(t){(!t.__d&&(t.__d=!0)&&u.push(t)&&!c++||p!==a.debounceRendering)&&((p=a.debounceRendering)||l)(E);}function E(){for(var t;c=u.length;)t=u.sort((function(t,e){return t.__v.__b-e.__v.__b})),u=[],t.some((function(t){var e,n,r,o,i,s,a;t.__d&&(s=(i=(e=t).__v).__e,(a=e.__P)&&(n=[],(r=m({},i)).__v=r,o=U(a,i,r,e.__n,void 0!==a.ownerSVGElement,null,n,null==s?x(i):s),j(n,i),o!=s&&C(i)));}));}function O(t,e,n,r,o,i,s,a,u,c){var l,p,h,f,d,g,m,b,k,S=r&&r.__k||y,C=S.length;for(u==_&&(u=null!=s?s[0]:C?x(r,0):null),n.__k=[],l=0;l<e.length;l++)if(null!=(f=n.__k[l]=null==(f=e[l])||"boolean"==typeof f?null:"string"==typeof f||"number"==typeof f?w(null,f,null,null,f):Array.isArray(f)?w(P,{children:f},null,null,null):null!=f.__e||null!=f.__c?w(f.type,f.props,f.key,null,f.__v):f)){if(f.__=n,f.__b=n.__b+1,null===(h=S[l])||h&&f.key==h.key&&f.type===h.type)S[l]=void 0;else for(p=0;p<C;p++){if((h=S[p])&&f.key==h.key&&f.type===h.type){S[p]=void 0;break}h=null;}if(d=U(t,f,h=h||_,o,i,s,a,u,c),(p=f.ref)&&h.ref!=p&&(b||(b=[]),h.ref&&b.push(h.ref,null,f),b.push(p,f.__c||d,f)),null!=d){if(null==m&&(m=d),k=void 0,void 0!==f.__d)k=f.__d,f.__d=void 0;else if(s==h||d!=u||null==d.parentNode){t:if(null==u||u.parentNode!==t)t.appendChild(d),k=null;else {for(g=u,p=0;(g=g.nextSibling)&&p<C;p+=2)if(g==d)break t;t.insertBefore(d,u),k=u;}"option"==n.type&&(t.value="");}u=void 0!==k?k:d.nextSibling,"function"==typeof n.type&&(n.__d=u);}else u&&h.__e==u&&u.parentNode!=t&&(u=x(h));}if(n.__e=m,null!=s&&"function"!=typeof n.type)for(l=s.length;l--;)null!=s[l]&&v(s[l]);for(l=C;l--;)null!=S[l]&&R(S[l],S[l]);if(b)for(l=0;l<b.length;l++)A(b[l],b[++l],b[++l]);}function T(t,e,n){"-"===e[0]?t.setProperty(e,n):t[e]="number"==typeof n&&!1===g.test(e)?n+"px":null==n?"":n;}function D(t,e,n,r,o){var i,s,a,u,c;if(o?"className"===e&&(e="class"):"class"===e&&(e="className"),"style"===e)if(i=t.style,"string"==typeof n)i.cssText=n;else {if("string"==typeof r&&(i.cssText="",r=null),r)for(u in r)n&&u in n||T(i,u,"");if(n)for(c in n)r&&n[c]===r[c]||T(i,c,n[c]);}else "o"===e[0]&&"n"===e[1]?(s=e!==(e=e.replace(/Capture$/,"")),a=e.toLowerCase(),e=(a in t?a:e).slice(2),n?(r||t.addEventListener(e,L,s),(t.l||(t.l={}))[e]=n):t.removeEventListener(e,L,s)):"list"!==e&&"tagName"!==e&&"form"!==e&&"type"!==e&&"size"!==e&&!o&&e in t?t[e]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==n||!1===n?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(e)?t.removeAttribute(e):t.setAttribute(e,n));}function L(t){this.l[t.type](a.event?a.event(t):t);}function U(t,e,n,r,o,i,s,u,c){var l,p,h,f,d,_,y,g,v,b,w,k=e.type;if(void 0!==e.constructor)return null;(l=a.__b)&&l(e);try{t:if("function"==typeof k){if(g=e.props,v=(l=k.contextType)&&r[l.__c],b=l?v?v.props.value:l.__:r,n.__c?y=(p=e.__c=n.__c).__=p.__E:("prototype"in k&&k.prototype.render?e.__c=p=new k(g,b):(e.__c=p=new S(g,b),p.constructor=k,p.render=M),v&&v.sub(p),p.props=g,p.state||(p.state={}),p.context=b,p.__n=r,h=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=k.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=m({},p.__s)),m(p.__s,k.getDerivedStateFromProps(g,p.__s))),f=p.props,d=p.state,h)null==k.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else {if(null==k.getDerivedStateFromProps&&g!==f&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(g,b),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(g,p.__s,b)||e.__v===n.__v){for(p.props=g,p.state=p.__s,e.__v!==n.__v&&(p.__d=!1),p.__v=e,e.__e=n.__e,e.__k=n.__k,p.__h.length&&s.push(p),l=0;l<e.__k.length;l++)e.__k[l]&&(e.__k[l].__=e);break t}null!=p.componentWillUpdate&&p.componentWillUpdate(g,p.__s,b),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(f,d,_);}));}p.context=b,p.props=g,p.state=p.__s,(l=a.__r)&&l(e),p.__d=!1,p.__v=e,p.__P=t,l=p.render(p.props,p.state,p.context),null!=p.getChildContext&&(r=m(m({},r),p.getChildContext())),h||null==p.getSnapshotBeforeUpdate||(_=p.getSnapshotBeforeUpdate(f,d)),w=null!=l&&l.type==P&&null==l.key?l.props.children:l,O(t,Array.isArray(w)?w:[w],e,n,r,o,i,s,u,c),p.base=e.__e,p.__h.length&&s.push(p),y&&(p.__E=p.__=null),p.__e=!1;}else null==i&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=I(n.__e,e,n,r,o,i,s,c);(l=a.diffed)&&l(e);}catch(t){e.__v=null,a.__e(t,e,n);}return e.__e}function j(t,e){a.__c&&a.__c(e,t),t.some((function(e){try{t=e.__h,e.__h=[],t.some((function(t){t.call(e);}));}catch(t){a.__e(t,e.__v);}}));}function I(t,e,n,r,o,i,s,a){var u,c,l,p,h,f=n.props,d=e.props;if(o="svg"===e.type||o,null!=i)for(u=0;u<i.length;u++)if(null!=(c=i[u])&&((null===e.type?3===c.nodeType:c.localName===e.type)||t==c)){t=c,i[u]=null;break}if(null==t){if(null===e.type)return document.createTextNode(d);t=o?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type,d.is&&{is:d.is}),i=null,a=!1;}if(null===e.type)f!==d&&t.data!=d&&(t.data=d);else {if(null!=i&&(i=y.slice.call(t.childNodes)),l=(f=n.props||_).dangerouslySetInnerHTML,p=d.dangerouslySetInnerHTML,!a){if(null!=i)for(f={},h=0;h<t.attributes.length;h++)f[t.attributes[h].name]=t.attributes[h].value;(p||l)&&(p&&l&&p.__html==l.__html||(t.innerHTML=p&&p.__html||""));}(function(t,e,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in e||D(t,i,null,n[i],r);for(i in e)o&&"function"!=typeof e[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===e[i]||D(t,i,e[i],n[i],r);})(t,d,f,o,a),p?e.__k=[]:(u=e.props.children,O(t,Array.isArray(u)?u:[u],e,n,r,"foreignObject"!==e.type&&o,i,s,_,a)),a||("value"in d&&void 0!==(u=d.value)&&u!==t.value&&D(t,"value",u,f.value,!1),"checked"in d&&void 0!==(u=d.checked)&&u!==t.checked&&D(t,"checked",u,f.checked,!1));}return t}function A(t,e,n){try{"function"==typeof t?t(e):t.current=e;}catch(t){a.__e(t,n);}}function R(t,e,n){var r,o,i;if(a.unmount&&a.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||A(r,null,e)),n||"function"==typeof t.type||(n=null!=(o=t.__e)),t.__e=t.__d=void 0,null!=(r=t.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount();}catch(t){a.__e(t,e);}r.base=r.__P=null;}if(r=t.__k)for(i=0;i<r.length;i++)r[i]&&R(r[i],e,n);null!=o&&v(o);}function M(t,e,n){return this.constructor(t,n)}function H(t,e,n){var r,o,i;a.__&&a.__(t,e),o=(r=n===h)?null:n&&n.__k||e.__k,t=b(P,null,[t]),i=[],U(e,(r?e:n||e).__k=t,o||_,_,void 0!==e.ownerSVGElement,n&&!r?[n]:o?null:e.childNodes.length?y.slice.call(e.childNodes):null,i,n||_,r),j(i,t);}function F(t){if(!t)return null;var e=Object.keys(t);return e.length?t[e[0]].props.value:null}a={__e:function(t,e){for(var n,r;e=e.__;)if((n=e.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(t))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(t)),r)return N(n.__E=n)}catch(e){t=e;}throw t}},S.prototype.setState=function(t,e){var n;n=this.__s!==this.state?this.__s:this.__s=m({},this.state),"function"==typeof t&&(t=t(n,this.props)),t&&m(n,t),null!=t&&this.__v&&(e&&this.__h.push(e),N(this));},S.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),N(this));},S.prototype.render=P,u=[],c=0,l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,h=_,f$5=0;var W={search:{placeholder:"Type a keyword..."},sort:{sortAsc:"Sort column ascending",sortDesc:"Sort column descending"},pagination:{previous:"Previous",next:"Next",navigate:function(t,e){return "Page "+t+" of "+e},page:function(t){return "Page "+t},showing:"Showing",of:"of",to:"to",results:"results"},loading:"Loading...",noRecordsFound:"No matching records found",error:"An error happened while fetching the data"},B=function(){function t(t){this._language=t,this._defaultLanguage=W;}return t.prototype.getString=function(t,e){if(!e||!t)return null;var n=t.split("."),r=n[0];if(e[r]){var o=e[r];return "string"==typeof o?function(){return o}:"function"==typeof o?o:this.getString(n.slice(1).join("."),o)}return null},t.prototype.translate=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r,o=this.getString(t,this._language);return (r=o||this.getString(t,this._defaultLanguage))?r.apply(void 0,e):t},t}();var q=function(t){function n(e,n){var r,o=t.call(this,e,n)||this;return o.config=F(n),o.config&&(o._=(r=o.config.translator,function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return r.translate.apply(r,i([t],e))})),o}return e(n,t),n}(S),G=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.render=function(){return b(this.props.parentElement,{dangerouslySetInnerHTML:{__html:this.props.content}})},n.defaultProps={parentElement:"span"},n}(q);function K(t,e){return b(G,{content:t,parentElement:e})}var $=function(t){function n(e){var n=t.call(this)||this;return n.setData(e),n}return e(n,t),n.prototype.cast=function(t){return t instanceof HTMLElement?K(t.outerHTML):t},n.prototype.setData=function(t){return this.data=this.cast(t),this},n}(d),z=function(t){function n(e){var n=t.call(this)||this;return n.cells=e||[],n}return e(n,t),Object.defineProperty(n.prototype,"cells",{get:function(){return this._cells},set:function(t){this._cells=t;},enumerable:!1,configurable:!0}),n.fromCells=function(t){return new n(t.map((function(t){return new $(t.data)})))},Object.defineProperty(n.prototype,"length",{get:function(){return this.cells.length},enumerable:!1,configurable:!0}),n}(d);var V=function(t){function n(e){var n=t.call(this)||this;return n.rows=e instanceof Array?e:e instanceof z?[e]:[],n}return e(n,t),Object.defineProperty(n.prototype,"rows",{get:function(){return this._rows},set:function(t){this._rows=t;},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"length",{get:function(){return this._length||this.rows.length},set:function(t){this._length=t;},enumerable:!1,configurable:!0}),n.fromRows=function(t){return new n(t.map((function(t){return z.fromCells(t.cells)})))},n.fromArray=function(t){return new n((t=function(t){return !t[0]||t[0]instanceof Array?t:[t]}(t)).map((function(t){return new z(t.map((function(t){return new $(t)})))})))},n}(d);function Y(t,e){return "string"==typeof t?t.indexOf("%")>-1?e/100*parseInt(t,10):parseInt(t,10):t}function X(t){return t?Math.floor(t)+"px":""}function Z(t,e){if(!t)return null;var n=t.querySelectorAll("tr:first-child > td");return n&&n[e]?n[e].clientWidth:null}var J=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),r.prototype.resetStyle=function(){return {padding:0,margin:0,border:"none",outline:"none"}},r.prototype.head=function(){var t=this;return b("thead",{style:this.resetStyle()},b("tr",null,this.props.header.columns.map((function(e){return b("th",{style:n(n({},t.resetStyle()),{whiteSpace:"nowrap",paddingRight:e.sort?"18px":"0"})},e.name)}))))},r.prototype.td=function(t){return b("td",{style:this.resetStyle()},t.data)},r.prototype.tr=function(t){var e=this;return b("tr",{style:this.resetStyle()},t.cells.map((function(t){return e.td(t)})))},r.prototype.body=function(){var t=this;return b("tbody",{style:this.resetStyle()},this.props.data&&this.props.data.rows.map((function(e){return t.tr(e)})))},r.prototype.render=function(){return b("table",{style:n({position:"absolute",zIndex:"-2147483640",visibility:"hidden",tableLayout:"auto",width:"auto"},this.resetStyle())},this.head(),this.body())},r}(q);var Q,tt=function(t){function r(){var e=t.call(this)||this;return e._columns=[],e}return e(r,t),Object.defineProperty(r.prototype,"columns",{get:function(){return this._columns},set:function(t){this._columns=t;},enumerable:!1,configurable:!0}),r.prototype.adjustWidth=function(t,e,n,r){if(void 0===r&&(r=!0),!t)return this;var o=t.clientWidth,i={};if(n&&n.length&&r){var s=b(J,{data:V.fromRows(n.rows.slice(0,10)),header:this});s.ref=i,H(s,e.current);}for(var a=0,u=this.columns;a<u.length;a++){var c=u[a];!c.width&&r?c.width=X(Z(i.current.base,this.columns.indexOf(c))):c.width=X(Y(c.width,o));}return n&&n.length&&r&&H(null,e.current),this},r.prototype.setSort=function(t){for(var e=0,r=this.columns;e<r.length;e++){var o=r[e];void 0===o.sort&&t.sort&&(o.sort={enabled:!0}),o.sort?"object"==typeof o.sort&&(o.sort=n({enabled:!0},o.sort)):o.sort={enabled:!1};}},r.prototype.setID=function(){for(var t=0,e=this.columns;t<e.length;t++){var n=e[t];n.id||(n.id=n.name.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(t,e){return 0==+t?"":0===e?t.toLowerCase():t.toUpperCase()})));}},r.fromUserConfig=function(t){var e=new r;if(t.from)e.columns=r.fromHTMLTable(t.from).columns;else if(t.columns)for(var n=0,o=t.columns;n<o.length;n++){var i=o[n];"string"==typeof i?e.columns.push({name:i}):"object"==typeof i&&e.columns.push(i);}else !t.data||"object"!=typeof t.data[0]||t.data[0]instanceof Array||(e.columns=Object.keys(t.data[0]).map((function(t){return {name:t}})));return e.columns.length?(e.setID(),e.setSort(t),e):null},r.fromHTMLTable=function(t){for(var e=new r,n=0,o=t.querySelector("thead").querySelectorAll("th");n<o.length;n++){var i=o[n];e.columns.push({name:i.innerText,width:i.width});}return e},r}(d),et=function(){function t(){this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1;}return t.prototype.register=function(t){var e="ID_"+this._lastID++;return this._callbacks[e]=t,e},t.prototype.unregister=function(t){if(!this._callbacks[t])throw Error("Dispatcher.unregister(...): "+t+" does not map to a registered callback.");delete this._callbacks[t];},t.prototype.waitFor=function(t){if(!this._isDispatching)throw Error("Dispatcher.waitFor(...): Must be invoked while dispatching.");for(var e=0;e<t.length;e++){var n=t[e];if(this._isPending[n]){if(!this._isHandled[n])throw Error("Dispatcher.waitFor(...): Circular dependency detected while ' +\n            'waiting for "+n+".")}else {if(!this._callbacks[n])throw Error("Dispatcher.waitFor(...): "+n+" does not map to a registered callback.");this._invokeCallback(n);}}},t.prototype.dispatch=function(t){if(this._isDispatching)throw Error("Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.");this._startDispatching(t);try{for(var e in this._callbacks)this._isPending[e]||this._invokeCallback(e);}finally{this._stopDispatching();}},t.prototype.isDispatching=function(){return this._isDispatching},t.prototype._invokeCallback=function(t){this._isPending[t]=!0,this._callbacks[t](this._pendingPayload),this._isHandled[t]=!0;},t.prototype._startDispatching=function(t){for(var e in this._callbacks)this._isPending[e]=!1,this._isHandled[e]=!1;this._pendingPayload=t,this._isDispatching=!0;},t.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1;},t}(),nt=function(){},rt=function(t){function n(e){var n=t.call(this)||this;return n.set(e),n}return e(n,t),n.prototype.get=function(){return r(this,void 0,void 0,(function(){var t;return o(this,(function(e){switch(e.label){case 0:return [4,this.data()];case 1:return [2,{data:t=e.sent(),total:t.length}]}}))}))},n.prototype.set=function(t){return t instanceof Array?this.data=function(){return t}:t instanceof Function&&(this.data=t),this},n}(nt),ot=new(function(){function t(){}return t.prototype.format=function(t,e){return "[Grid.js] ["+e.toUpperCase()+"]: "+t},t.prototype.error=function(t,e){void 0===e&&(e=!1);var n=this.format(t,"error");if(e)throw Error(n);console.error(n);},t.prototype.warn=function(t){console.warn(this.format(t,"warn"));},t.prototype.info=function(t){console.info(this.format(t,"info"));},t}()),it=function(t){function r(e){var n=t.call(this)||this;return n.options=e,n}return e(r,t),r.prototype.handler=function(t){return "function"==typeof this.options.handle?this.options.handle(t):t.ok?t.json():(ot.error("Could not fetch data: "+t.status+" - "+t.statusText,!0),null)},r.prototype.get=function(t){var e=n(n({},this.options),t);return fetch(e.url,e).then(this.handler.bind(this)).then((function(t){return {data:e.then(t),total:"function"==typeof e.total?e.total(t):void 0}}))},r}(nt),st=function(){function t(){}return t.createFromUserConfig=function(t){var e=null;return t.data&&(e=new rt(t.data)),t.from&&(e=new rt(this.tableElementToArray(t.from)),t.from.style.display="none"),t.server&&(e=new it(t.server)),e||ot.error("Could not determine the storage type",!0),e},t.tableElementToArray=function(t){for(var e=[],n=0,r=t.querySelector("tbody").querySelectorAll("tr");n<r.length;n++){for(var o=[],i=0,s=r[n].querySelectorAll("td");i<s.length;i++){var a=s[i];1===a.childNodes.length&&a.childNodes[0].nodeType===Node.TEXT_NODE?o.push(a.innerText):o.push(K(a.innerHTML));}e.push(o);}return e},t}();function at(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t&&t.forEach((function(t){return t.apply(void 0,e)}));}!function(t){t[t.Initiator=0]="Initiator",t[t.ServerFilter=1]="ServerFilter",t[t.ServerSort=2]="ServerSort",t[t.ServerLimit=3]="ServerLimit",t[t.Extractor=4]="Extractor",t[t.Transformer=5]="Transformer",t[t.Filter=6]="Filter",t[t.Sort=7]="Sort",t[t.Limit=8]="Limit";}(Q||(Q={}));var ut,ct=function(){function t(t){this.propsUpdatedCallback=new Set,this.beforeProcessCallback=new Set,this.afterProcessCallback=new Set,this._props={},this.id=s(),t&&this.setProps(t);}return t.prototype.process=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.validateProps instanceof Function&&this.validateProps.apply(this,t),at.apply(void 0,i([this.beforeProcessCallback],t));var n=this._process.apply(this,t);return at.apply(void 0,i([this.afterProcessCallback],t)),n},t.prototype.setProps=function(t){return Object.assign(this._props,t),at(this.propsUpdatedCallback,this),this},Object.defineProperty(t.prototype,"props",{get:function(){return this._props},enumerable:!1,configurable:!0}),t.prototype.propsUpdated=function(t){return this.propsUpdatedCallback.add(t),this},t.prototype.beforeProcess=function(t){return this.beforeProcessCallback.add(t),this},t.prototype.afterProcess=function(t){return this.afterProcessCallback.add(t),this},t}(),lt=function(){function t(t){var e=this;this._steps=new Map,this.cache=new Map,this.lastProcessorIndexUpdated=-1,this.propsUpdatedCallback=new Set,this.afterRegisterCallback=new Set,this.updatedCallback=new Set,this.afterProcessCallback=new Set,this.onErrorCallback=new Set,t&&t.forEach((function(t){return e.register(t)}));}return t.prototype.clearCache=function(){this.cache=new Map;},t.prototype.register=function(t,e){if(void 0===e&&(e=null),null===t.type)throw Error("Processor type is not defined");t.propsUpdated(this.processorPropsUpdated.bind(this)),this.addProcessorByPriority(t,e),this.afterRegistered(t);},t.prototype.addProcessorByPriority=function(t,e){var n=this._steps.get(t.type);if(!n){var r=[];this._steps.set(t.type,r),n=r;}if(null===e||e<0)n.push(t);else if(n[e]){var o=n.slice(0,e-1),i=n.slice(e+1);this._steps.set(t.type,o.concat(t).concat(i));}else n[e]=t;},Object.defineProperty(t.prototype,"steps",{get:function(){for(var t=[],e=0,n=this.getSortedProcessorTypes();e<n.length;e++){var r=n[e],o=this._steps.get(r);o&&o.length&&(t=t.concat(o));}return t.filter((function(t){return t}))},enumerable:!1,configurable:!0}),t.prototype.getStepsByType=function(t){return this.steps.filter((function(e){return e.type===t}))},t.prototype.getSortedProcessorTypes=function(){return Object.keys(Q).filter((function(t){return !isNaN(Number(t))})).map((function(t){return Number(t)}))},t.prototype.process=function(t){return r(this,void 0,void 0,(function(){var e,n,r,i,s,a,u;return o(this,(function(o){switch(o.label){case 0:e=this.lastProcessorIndexUpdated,n=this.steps,r=t,o.label=1;case 1:o.trys.push([1,7,,8]),i=0,s=n,o.label=2;case 2:return i<s.length?(a=s[i],this.findProcessorIndexByID(a.id)>=e?[4,a.process(r)]:[3,4]):[3,6];case 3:return r=o.sent(),this.cache.set(a.id,r),[3,5];case 4:r=this.cache.get(a.id),o.label=5;case 5:return i++,[3,2];case 6:return [3,8];case 7:throw u=o.sent(),ot.error(u),at(this.onErrorCallback,r),u;case 8:return this.lastProcessorIndexUpdated=n.length,at(this.afterProcessCallback,r),[2,r]}}))}))},t.prototype.findProcessorIndexByID=function(t){return this.steps.findIndex((function(e){return e.id==t}))},t.prototype.setLastProcessorIndex=function(t){var e=this.findProcessorIndexByID(t.id);this.lastProcessorIndexUpdated>e&&(this.lastProcessorIndexUpdated=e);},t.prototype.processorPropsUpdated=function(t){this.setLastProcessorIndex(t),at(this.propsUpdatedCallback),at(this.updatedCallback,t);},t.prototype.afterRegistered=function(t){this.setLastProcessorIndex(t),at(this.afterRegisterCallback),at(this.updatedCallback,t);},t.prototype.propsUpdated=function(t){return this.propsUpdatedCallback.add(t),this},t.prototype.afterRegister=function(t){return this.afterRegisterCallback.add(t),this},t.prototype.updated=function(t){return this.updatedCallback.add(t),this},t.prototype.afterProcess=function(t){return this.afterProcessCallback.add(t),this},t.prototype.onError=function(t){return this.onErrorCallback.add(t),this},t}(),pt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),Object.defineProperty(n.prototype,"type",{get:function(){return Q.Extractor},enumerable:!1,configurable:!0}),n.prototype._process=function(t){return r(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return [4,this.props.storage.get(t)];case 1:return [2,e.sent()]}}))}))},n}(ct),ht=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),Object.defineProperty(n.prototype,"type",{get:function(){return Q.Transformer},enumerable:!1,configurable:!0}),n.prototype._process=function(t){var e=V.fromArray(t.data);return e.length=t.total,e},n}(ct),ft=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),Object.defineProperty(n.prototype,"type",{get:function(){return Q.Initiator},enumerable:!1,configurable:!0}),n.prototype._process=function(){return {url:this.props.serverStorageOptions.url,method:this.props.serverStorageOptions.method}},n}(ct),dt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),Object.defineProperty(n.prototype,"type",{get:function(){return Q.Transformer},enumerable:!1,configurable:!0}),n.prototype.castData=function(t){var e=this;return t&&t.length?t[0]instanceof Array?t:"object"!=typeof t[0]||t[0]instanceof Array?[]:t.map((function(t){return e.props.header.columns.map((function(e){return t[e.id]}))})):[]},n.prototype._process=function(t){return {data:this.castData(t.data),total:t.total}},n}(ct),_t=function(){function t(){}return t.createFromConfig=function(t){var e=new lt;return t.storage instanceof it&&e.register(new ft({serverStorageOptions:t.server})),e.register(new pt({storage:t.storage})),e.register(new dt({header:t.header})),e.register(new ht),e},t}(),yt=function(){function t(e){var r=n(n({},t.defaultConfig()),e);this._userConfig={},Object.assign(this,r);}return t.prototype.assign=function(t){for(var e=0,n=Object.keys(t);e<n.length;e++){var r=n[e];"_userConfig"!==r&&(this[r]=t[r]);}return this},t.prototype.update=function(e){return e?(this._userConfig=n(n({},this._userConfig),e),this.assign(t.fromUserConfig(this._userConfig)),this):this},t.defaultConfig=function(){return {dispatcher:new et,tempRef:{},width:"100%",autoWidth:!0,style:{},className:{}}},t.fromUserConfig=function(e){var r=new t(e);return r._userConfig=e,"boolean"==typeof e.sort&&e.sort&&r.assign({sort:{multiColumn:!0}}),r.assign({header:tt.fromUserConfig(r)}),r.assign({storage:st.createFromUserConfig(e)}),r.assign({pipeline:_t.createFromConfig(r)}),r.assign({pagination:n({enabled:!0===e.pagination||e.pagination instanceof Object},e.pagination)}),r.assign({search:n({enabled:!0===e.search||e.search instanceof Object},e.search)}),r.assign({translator:new B(e.language)}),r},t}();function gt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="gridjs";return ""+n+t.reduce((function(t,e){return t+"-"+e}),"")}function mt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.filter((function(t){return t})).reduce((function(t,e){return (t||"")+" "+e}),"").trim()}!function(t){t[t.Init=0]="Init",t[t.Loading=1]="Loading",t[t.Loaded=2]="Loaded",t[t.Rendered=3]="Rendered",t[t.Error=4]="Error";}(ut||(ut={}));var vt=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),r.prototype.content=function(){return this.props.column&&"function"==typeof this.props.column.formatter?this.props.column.formatter(this.props.cell.data,this.props.row,this.props.column):this.props.cell.data},r.prototype.render=function(){return b("td",{role:this.props.role,colSpan:this.props.colSpan,className:mt(gt("td"),this.props.className,this.config.className.td),style:n({},this.config.style.td)},this.content())},r}(q),bt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.getColumn=function(t){return this.props.header?this.props.header.columns[t]:null},n.prototype.render=function(){var t=this;return this.props.children?b("tr",{className:gt("tr")},this.props.children):b("tr",{className:gt("tr")},this.props.row.cells.map((function(e,n){return b(vt,{key:e.id,cell:e,row:t.props.row,column:t.getColumn(n)})})))},n}(q),wt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.render=function(){return b(bt,null,b(vt,{role:"alert",colSpan:this.props.colSpan,cell:new $(this.props.message),className:mt(gt("message"),this.props.className?this.props.className:null)}))},n}(q),kt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.headerLength=function(){return this.props.header?this.props.header.columns.length:0},n.prototype.render=function(){var t=this;return b("tbody",{className:gt("tbody")},this.props.data&&this.props.data.rows.map((function(e){return b(bt,{key:e.id,row:e,header:t.props.header})})),this.props.status===ut.Loading&&(!this.props.data||0===this.props.data.length)&&b(wt,{message:this._("loading"),colSpan:this.headerLength(),className:gt("loading")}),this.props.status===ut.Loaded&&this.props.data&&0===this.props.data.length&&b(wt,{message:this._("noRecordsFound"),colSpan:this.headerLength(),className:gt("notfound")}),this.props.status===ut.Error&&b(wt,{message:this._("error"),colSpan:this.headerLength(),className:gt("error")}))},n}(q),Pt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.validateProps=function(){for(var t=0,e=this.props.columns;t<e.length;t++){var n=e[t];void 0===n.direction&&(n.direction=1),1!==n.direction&&-1!==n.direction&&ot.error("Invalid sort direction "+n.direction);}},Object.defineProperty(n.prototype,"type",{get:function(){return Q.Sort},enumerable:!1,configurable:!0}),n.prototype.compare=function(t,e){return t>e?1:t<e?-1:0},n.prototype.compareWrapper=function(t,e){for(var n=0,r=0,o=this.props.columns;r<o.length;r++){var i=o[r];if(0!==n)break;var s=t.cells[i.index].data,a=e.cells[i.index].data;"function"==typeof i.compare?n|=i.compare(s,a)*i.direction:n|=this.compare(s,a)*i.direction;}return n},n.prototype._process=function(t){var e=i(t.rows);return e.sort(this.compareWrapper.bind(this)),new V(e)},n}(ct),St=function(t){function n(e){var n=t.call(this)||this;return n.dispatcher=e,n._state=n.getInitialState(),e.register(n._handle.bind(n)),n}return e(n,t),n.prototype._handle=function(t){this.handle(t.type,t.payload);},n.prototype.setState=function(t){var e=this._state;this._state=t,this.emit("updated",t,e);},Object.defineProperty(n.prototype,"state",{get:function(){return this._state},enumerable:!1,configurable:!0}),n}(function(){function t(){}return t.prototype.init=function(t){this.callbacks||(this.callbacks={}),t&&!this.callbacks[t]&&(this.callbacks[t]=[]);},t.prototype.on=function(t,e){return this.init(t),this.callbacks[t].push(e),this},t.prototype.off=function(t,e){var n=t;return this.init(),this.callbacks[n]&&0!==this.callbacks[n].length?(this.callbacks[n]=this.callbacks[n].filter((function(t){return t!=e})),this):this},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=t;return this.init(r),this.callbacks[r].length>0&&(this.callbacks[r].forEach((function(t){return t.apply(void 0,e)})),!0)},t}()),xt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.getInitialState=function(){return []},n.prototype.handle=function(t,e){if("SORT_COLUMN"===t){var n=e.index,r=e.direction,o=e.multi,i=e.compare;this.sortColumn(n,r,o,i);}else if("SORT_COLUMN_TOGGLE"===t){n=e.index,o=e.multi,i=e.compare;this.sortToggle(n,o,i);}},n.prototype.sortToggle=function(t,e,n){var r=i(this.state).find((function(e){return e.index===t}));r?this.sortColumn(t,1===r.direction?-1:1,e,n):this.sortColumn(t,1,e,n);},n.prototype.sortColumn=function(t,e,n,r){var o=i(this.state),s=o.length,a=o.find((function(e){return e.index===t})),u=!1,c=!1,l=!1,p=!1;if(void 0!==a?n?-1===a.direction?l=!0:p=!0:1===s?p=!0:s>1&&(c=!0,u=!0):0===s?u=!0:s>0&&!n?(u=!0,c=!0):s>0&&n&&(u=!0),c&&(o=[]),u)o.push({index:t,direction:e,compare:r});else if(p){var h=o.indexOf(a);o[h].direction=e;}else if(l){var f=o.indexOf(a);o.splice(f,1);}this.setState(o);},n}(St),Ct=function(){function t(t){this.dispatcher=t;}return t.prototype.dispatch=function(t,e){this.dispatcher.dispatch({type:t,payload:e});},t}(),Nt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.sortColumn=function(t,e,n,r){this.dispatch("SORT_COLUMN",{index:t,direction:e,multi:n,compare:r});},n.prototype.sortToggle=function(t,e,n){this.dispatch("SORT_COLUMN_TOGGLE",{index:t,multi:e,compare:n});},n}(Ct),Et=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),Object.defineProperty(r.prototype,"type",{get:function(){return Q.ServerSort},enumerable:!1,configurable:!0}),r.prototype._process=function(t){var e={};return this.props.url&&(e.url=this.props.url(t.url,this.props.columns)),this.props.body&&(e.body=this.props.body(t.body,this.props.columns)),n(n({},t),e)},r}(ct),Ot=function(t){function r(e,n){var r=t.call(this,e,n)||this;return r.actions=new Nt(r.config.dispatcher),r.store=new xt(r.config.dispatcher),e.enabled&&(r.sortProcessor=r.getOrCreateSortProcessor(),r.store.on("updated",r.storeUpdated.bind(r)),r.state={direction:0}),r}return e(r,t),r.prototype.componentWillUnmount=function(){this.store.off("updated",this.storeUpdated.bind(this));},r.prototype.storeUpdated=function(){var t=this,e=this.store.state.find((function(e){return e.index===t.props.index}));e?this.setState({direction:e.direction}):this.setState({direction:0});},r.prototype.getOrCreateSortProcessor=function(){var t=this,e=Q.Sort;this.config.sort&&"object"==typeof this.config.sort.server&&(e=Q.ServerSort);var r,o=this.config.pipeline.getStepsByType(e);return o.length>1&&ot.warn("There are more than sorting pipeline registered, selecting the first one"),o.length>0?r=o[0]:(this.store.on("updated",(function(e){t.sortProcessor.setProps({columns:e});})),r=e===Q.ServerSort?new Et(n({columns:this.store.state},this.config.sort.server)):new Pt({columns:this.store.state}),this.config.pipeline.register(r)),r},r.prototype.changeDirection=function(t){t.preventDefault(),t.stopPropagation(),this.actions.sortToggle(this.props.index,!0===t.shiftKey&&this.config.sort.multiColumn,this.props.compare);},r.prototype.render=function(){if(!this.props.enabled)return null;var t=this.state.direction,e="neutral";return 1===t?e="asc":-1===t&&(e="desc"),b("button",{tabIndex:-1,"aria-label":this._("sort.sort"+(1===t?"Desc":"Asc")),title:this._("sort.sort"+(1===t?"Desc":"Asc")),className:mt(gt("sort"),gt("sort",e)),onClick:this.changeDirection.bind(this)})},r}(q),Tt=function(t){function r(){var e=null!==t&&t.apply(this,arguments)||this;return e.sortRef={},e}return e(r,t),r.prototype.isSortable=function(){return this.props.column.sort.enabled},r.prototype.onClick=function(t){t.stopPropagation(),this.isSortable()&&this.sortRef.current.changeDirection(t);},r.prototype.keyDown=function(t){this.isSortable()&&13===t.which&&this.onClick(t);},r.prototype.render=function(){var t={};return this.isSortable()&&(t.tabIndex=0),b("th",n({className:mt(gt("th"),this.isSortable()?gt("th","sort"):null,this.config.className.th),onClick:this.onClick.bind(this),style:n(n({},this.config.style.th),{width:this.props.column.width}),onKeyDown:this.keyDown.bind(this)},t),this.props.column.name,this.isSortable()&&b(Ot,n({ref:this.sortRef,index:this.props.index},this.props.column.sort)))},r}(q),Dt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.render=function(){return this.props.header?b("thead",{key:this.props.header.id,className:gt("thead")},b(bt,null,this.props.header.columns.map((function(t,e){return b(Tt,{column:t,index:e})})))):null},n}(q),Lt=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),r.prototype.render=function(){return b("table",{role:"grid",className:mt(gt("table"),this.config.className.table),style:n(n({},this.config.style.table),{width:this.props.width})},b(Dt,{header:this.props.header}),b(kt,{data:this.props.data,status:this.props.status,header:this.props.header}))},r}(q);var Ut,jt,It,At=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),Object.defineProperty(n.prototype,"type",{get:function(){return Q.Filter},enumerable:!1,configurable:!0}),n.prototype._process=function(t){return this.props.keyword?(e=String(this.props.keyword).trim(),n=t,e=e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),new V(n.rows.filter((function(t){return t.cells.some((function(t){if(!t||!t.data)return !1;var n="";if("object"==typeof t.data){var r=t.data;r.props.content&&(n=r.props.content);}else n=String(t.data);return new RegExp(e,"gi").test(n)}))})))):t;var e,n;},n}(ct),Rt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.getInitialState=function(){return {keyword:null}},n.prototype.handle=function(t,e){if("SEARCH_KEYWORD"===t){var n=e.keyword;this.search(n);}},n.prototype.search=function(t){this.setState({keyword:t});},n}(St),Mt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.search=function(t){this.dispatch("SEARCH_KEYWORD",{keyword:t});},n}(Ct),Ht=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),Object.defineProperty(r.prototype,"type",{get:function(){return Q.ServerFilter},enumerable:!1,configurable:!0}),r.prototype._process=function(t){if(!this.props.keyword)return t;var e={};return this.props.url&&(e.url=this.props.url(t.url,this.props.keyword)),this.props.body&&(e.body=this.props.body(t.body,this.props.keyword)),n(n({},t),e)},r}(ct),Ft=function(t){function n(e,n){var r=t.call(this,e,n)||this;r.actions=new Mt(r.config.dispatcher),r.store=new Rt(r.config.dispatcher);var o=e.enabled,i=e.keyword;if(o){r.actions.search(i),r.store.on("updated",r.storeUpdated.bind(r));var s=void 0;s=e.server?new Ht({keyword:e.keyword,url:e.server.url,body:e.server.body}):new At({keyword:e.keyword}),r.searchProcessor=s,r.config.pipeline.register(s);}return r}return e(n,t),n.prototype.storeUpdated=function(t){this.searchProcessor.setProps({keyword:t.keyword});},n.prototype.onChange=function(t){var e=t.target.value;this.actions.search(e);},n.prototype.render=function(){if(!this.props.enabled)return null;var t,e,n,r=this.onChange.bind(this);return this.searchProcessor instanceof Ht&&(t=r,e=this.props.debounceTimeout,r=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return new Promise((function(o){n&&clearTimeout(n),n=setTimeout((function(){return o(t.apply(void 0,r))}),e);}))}),b("div",{className:gt("search")},b("input",{type:"search",placeholder:this._("search.placeholder"),"aria-label":this._("search.placeholder"),onInput:r,className:mt(gt("input"),gt("search","input")),value:this.store.state.keyword}))},n.defaultProps={debounceTimeout:250},n}(q),Wt=0,Bt=[],qt=a.__r,Gt=a.diffed,Kt=a.__c,$t=a.unmount;function zt(t,e){a.__h&&a.__h(jt,t,Wt||e),Wt=0;var n=jt.__H||(jt.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function Yt(t){return Wt=5,function(t,e){var n=zt(Ut++,7);return Qt(n.__H,e)?(n.__H=e,n.__h=t,n.__=t()):n.__}((function(){return {current:t}}),[])}function Xt(){Bt.some((function(t){if(t.__P)try{t.__H.__h.forEach(Zt),t.__H.__h.forEach(Jt),t.__H.__h=[];}catch(e){return t.__H.__h=[],a.__e(e,t.__v),!0}})),Bt=[];}function Zt(t){"function"==typeof t.u&&t.u();}function Jt(t){t.u=t.__();}function Qt(t,e){return !t||e.some((function(e,n){return e!==t[n]}))}a.__r=function(t){qt&&qt(t),Ut=0;var e=(jt=t.__c).__H;e&&(e.__h.forEach(Zt),e.__h.forEach(Jt),e.__h=[]);},a.diffed=function(t){Gt&&Gt(t);var e=t.__c;e&&e.__H&&e.__H.__h.length&&(1!==Bt.push(e)&&It===a.requestAnimationFrame||((It=a.requestAnimationFrame)||function(t){var e,n=function(){clearTimeout(r),cancelAnimationFrame(e),setTimeout(t);},r=setTimeout(n,100);"undefined"!=typeof window&&(e=requestAnimationFrame(n));})(Xt));},a.__c=function(t,e){e.some((function(t){try{t.__h.forEach(Zt),t.__h=t.__h.filter((function(t){return !t.__||Jt(t)}));}catch(n){e.some((function(t){t.__h&&(t.__h=[]);})),e=[],a.__e(n,t.__v);}})),Kt&&Kt(t,e);},a.unmount=function(t){$t&&$t(t);var e=t.__c;if(e&&e.__H)try{e.__H.__.forEach(Zt);}catch(t){a.__e(t,e.__v);}};var te=function(t){function r(e,n){var r=t.call(this,e,n)||this;return r.headerRef=Yt(null),r.state={isActive:!0},r}return e(r,t),r.prototype.componentDidMount=function(){0===this.headerRef.current.children.length&&this.setState({isActive:!1});},r.prototype.render=function(){var t=F(this.context);return this.state.isActive?b("div",{ref:this.headerRef,className:mt(gt("head"),this.config.className.header),style:n({},this.config.style.header)},b(Ft,n({},t.search))):null},r}(q),ee=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return e(n,t),n.prototype.validateProps=function(){if(isNaN(Number(this.props.limit))||isNaN(Number(this.props.page)))throw Error("Invalid parameters passed")},Object.defineProperty(n.prototype,"type",{get:function(){return Q.Limit},enumerable:!1,configurable:!0}),n.prototype._process=function(t){var e=this.props.page,n=e*this.props.limit,r=(e+1)*this.props.limit;return new V(t.rows.slice(n,r))},n}(ct),ne=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e(r,t),Object.defineProperty(r.prototype,"type",{get:function(){return Q.ServerLimit},enumerable:!1,configurable:!0}),r.prototype._process=function(t){var e={};return this.props.url&&(e.url=this.props.url(t.url,this.props.page,this.props.limit)),this.props.body&&(e.body=this.props.body(t.body,this.props.page,this.props.limit)),n(n({},t),e)},r}(ct),re=function(t){function n(e,n){var r=t.call(this,e,n)||this;return r.state={limit:e.limit,page:e.page||0,total:0},r}return e(n,t),n.prototype.componentWillMount=function(){var t=this;if(this.props.enabled){var e=void 0;this.props.server?(e=new ne({limit:this.state.limit,page:this.state.page,url:this.props.server.url,body:this.props.server.body}),this.config.pipeline.afterProcess((function(e){t.setTotal(e.length);}))):(e=new ee({limit:this.state.limit,page:this.state.page})).beforeProcess((function(e){return r(t,void 0,void 0,(function(){return o(this,(function(t){return this.setTotal(e.length),[2]}))}))})),this.processor=e,this.config.pipeline.register(e),this.config.pipeline.onError((function(){t.setState({total:0,page:0});}));}},n.prototype.componentDidMount=function(){var t=this;F(this.context).pipeline.updated((function(e){e!==t.processor&&t.setPage(0);}));},Object.defineProperty(n.prototype,"pages",{get:function(){return Math.ceil(this.state.total/this.state.limit)},enumerable:!1,configurable:!0}),n.prototype.setPage=function(t){if(t>=this.pages||t<0||t===this.state.page)return null;this.setState({page:t}),this.processor.setProps({page:t});},n.prototype.setTotal=function(t){this.setState({total:t});},n.prototype.render=function(){var t=this;if(!this.props.enabled)return null;var e=Math.min(this.pages,this.props.buttonsCount),n=Math.min(this.state.page,Math.floor(e/2));return this.state.page+Math.floor(e/2)>=this.pages&&(n=e-(this.pages-this.state.page)),b("div",{className:gt("pagination")},this.props.summary&&this.state.total>0&&b("div",{role:"status",className:gt("summary"),title:this._("pagination.navigate",this.state.page+1,this.pages)},this._("pagination.showing")," ",b("b",null,this._(""+(this.state.page*this.state.limit+1)))," ",this._("pagination.to")," ",b("b",null,this._(""+Math.min((this.state.page+1)*this.state.limit,this.state.total)))," ",this._("pagination.of")," ",b("b",null,this._(""+this.state.total))," ",this._("pagination.results")),b("div",{className:gt("pages")},this.props.prevButton&&b("button",{tabIndex:0,disabled:0===this.state.page,onClick:this.setPage.bind(this,this.state.page-1)},this._("pagination.previous")),this.pages>e&&this.state.page-n>0&&b(P,null,b("button",{tabIndex:0,onClick:this.setPage.bind(this,0),title:this._("pagination.firstPage")},this._("1")),b("button",{className:gt("spread")},"...")),Array.from(Array(e).keys()).map((function(e){return t.state.page+(e-n)})).map((function(e){return b("button",{tabIndex:0,onClick:t.setPage.bind(t,e),className:t.state.page===e?gt("currentPage"):null,title:t._("pagination.page",e+1)},t._(""+(e+1)))})),this.pages>e&&this.pages>this.state.page+n+1&&b(P,null,b("button",{tabIndex:-1,className:gt("spread")},"..."),b("button",{tabIndex:0,onClick:this.setPage.bind(this,this.pages-1),title:this._("pagination.page",this.pages)},this._(""+this.pages))),this.props.nextButton&&b("button",{tabIndex:0,disabled:this.pages===this.state.page+1||0===this.pages,onClick:this.setPage.bind(this,this.state.page+1)},this._("pagination.next"))))},n.defaultProps={summary:!0,nextButton:!0,prevButton:!0,buttonsCount:3,limit:10},n}(q),oe=function(t){function r(e,n){var r=t.call(this,e,n)||this;return r.footerRef=Yt(null),r.state={isActive:!0},r}return e(r,t),r.prototype.componentDidMount=function(){0===this.footerRef.current.children.length&&this.setState({isActive:!1});},r.prototype.render=function(){var t=F(this.context);return this.state.isActive?b("div",{ref:this.footerRef,className:mt(gt("footer"),this.config.className.footer),style:n({},this.config.style.footer)},b(re,n({},t.pagination))):null},r}(q),ie=function(t){function i(e,n){var r=t.call(this,e,n)||this;return r.configContext=function(t){var e={},n={__c:"__cC"+f$5++,__:t,Consumer:function(t,e){return t.children(e)},Provider:function(t){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return e[n.__c]=o,e},this.shouldComponentUpdate=function(t){o.props.value!==t.value&&r.some((function(e){e.context=t.value,N(e);}));},this.sub=function(t){r.push(t);var e=t.componentWillUnmount;t.componentWillUnmount=function(){r.splice(r.indexOf(t),1),e&&e.call(t);};}),t.children}};return n.Consumer.contextType=n,n.Provider.__=n,n}(null),r.state={status:ut.Loading,header:e.header,data:null},r}return e(i,t),i.prototype.processPipeline=function(){return r(this,void 0,void 0,(function(){var t,e,n;return o(this,(function(r){switch(r.label){case 0:this.setState({status:ut.Loading}),r.label=1;case 1:return r.trys.push([1,3,,4]),t=this.setState,e={},[4,this.props.pipeline.process()];case 2:return t.apply(this,[(e.data=r.sent(),e.status=ut.Loaded,e)]),[3,4];case 3:return n=r.sent(),ot.error(n),this.setState({status:ut.Error,data:null}),[3,4];case 4:return [2]}}))}))},i.prototype.componentDidMount=function(){return r(this,void 0,void 0,(function(){var t,e=this;return o(this,(function(n){switch(n.label){case 0:return t=this.props.config,[4,this.processPipeline()];case 1:return n.sent(),t.header&&this.state.data&&this.state.data.length&&this.setState({header:t.header.adjustWidth(t.container,t.tempRef,this.state.data,t.autoWidth)}),this.props.pipeline.updated((function(){return r(e,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return [4,this.processPipeline()];case 1:return t.sent(),[2]}}))}))})),[2]}}))}))},i.prototype.render=function(){return b(this.configContext.Provider,{value:this.props.config},b("div",{role:"complementary",className:mt("gridjs",gt("container"),this.state.status===ut.Loading?gt("loading"):null,this.props.config.className.container),style:n(n({},this.props.config.style.container),{width:this.props.width})},this.state.status===ut.Loading&&b("div",{className:gt("loading-bar")}),b(te,null),b("div",{className:gt("wrapper"),style:{width:this.props.width}},b(Lt,{data:this.state.data,header:this.state.header,width:this.props.width,status:this.state.status})),b(oe,null)),b("div",{ref:this.props.config.tempRef,id:"gridjs-temp",className:gt("temp")}))},i}(q),se=function(){function t(t){this.config=(new yt).update(t);}return t.prototype.updateConfig=function(t){return this.config.update(t),this},t.prototype.createElement=function(){return b(ie,{config:this.config,pipeline:this.config.pipeline,header:this.config.header,width:this.config.width})},t.prototype.forceRender=function(){return this.config&&this.config.container||ot.error("Container is empty. Make sure you call render() before forceRender()",!0),this.config.pipeline.clearCache(),H(null,this.config.container),H(this.createElement(),this.config.container),this},t.prototype.render=function(t){return t||ot.error("Container element cannot be null",!0),t.childNodes.length>0?(ot.error("The container element "+t+" is not empty. Make sure the container is empty and call render() again"),this):(this.config.container=t,H(this.createElement(),t),this)},t}();

// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

// We reuse buffers with the same size to avoid memory fragmentations
// for better performance.
let buffers = {};
let random = bytes => {
  let buffer = buffers[bytes];
  if (!buffer) {
    // `Buffer.allocUnsafe()` is faster because it doesn’t flush the memory.
    // Memory flushing is unnecessary since the buffer allocation itself resets
    // the memory with the new bytes.
    buffer = Buffer.allocUnsafe(bytes);
    if (bytes <= 255) buffers[bytes] = buffer;
  }
  return crypto.randomFillSync(buffer)
};

let nanoid = (size = 21) => {
  let bytes = random(size);
  let id = '';
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    id += urlAlphabet[bytes[size] & 63];
  }
  return id
};

var manyKeysMap = createCommonjsModule(function (module) {

const getInternalKeys = Symbol('getInternalKeys');
const getPrivateKey = Symbol('getPrivateKey');
const publicKeys = Symbol('publicKeys');
const objectHashes = Symbol('objectHashes');
const symbolHashes = Symbol('symbolHashes');
const nullKey = Symbol('null'); // `objectHashes` key for null

let keyCounter = 0;
function checkKeys(keys) {
	if (!Array.isArray(keys)) {
		throw new TypeError('The keys parameter must be an array');
	}
}

module.exports = class ManyKeysMap extends Map {
	constructor() {
		super();

		this[objectHashes] = new WeakMap();
		this[symbolHashes] = new Map(); // https://github.com/tc39/ecma262/issues/1194
		this[publicKeys] = new Map();

		// eslint-disable-next-line prefer-rest-params
		const [pairs] = arguments; // Map compat
		if (pairs === null || pairs === undefined) {
			return;
		}

		if (typeof pairs[Symbol.iterator] !== 'function') {
			throw new TypeError(typeof pairs + ' is not iterable (cannot read property Symbol(Symbol.iterator))');
		}

		for (const [keys, value] of pairs) {
			this.set(keys, value);
		}
	}

	[getInternalKeys](keys, create = false) {
		const privateKey = this[getPrivateKey](keys, create);

		let publicKey;
		if (privateKey && this[publicKeys].has(privateKey)) {
			publicKey = this[publicKeys].get(privateKey);
		} else if (create) {
			publicKey = [...keys]; // Regenerate keys array to avoid external interaction
			this[publicKeys].set(privateKey, publicKey);
		}

		return {privateKey, publicKey};
	}

	[getPrivateKey](keys, create = false) {
		const privateKeys = [];
		for (let key of keys) {
			if (key === null) {
				key = nullKey;
			}

			const hashes = typeof key === 'object' || typeof key === 'function' ? objectHashes : typeof key === 'symbol' ? symbolHashes : false;

			if (!hashes) {
				privateKeys.push(key);
			} else if (this[hashes].has(key)) {
				privateKeys.push(this[hashes].get(key));
			} else if (create) {
				const privateKey = `@@mkm-ref-${keyCounter++}@@`;
				this[hashes].set(key, privateKey);
				privateKeys.push(privateKey);
			} else {
				return false;
			}
		}

		return JSON.stringify(privateKeys);
	}

	set(keys, value) {
		checkKeys(keys);
		const {publicKey} = this[getInternalKeys](keys, true);
		return super.set(publicKey, value);
	}

	get(keys) {
		checkKeys(keys);
		const {publicKey} = this[getInternalKeys](keys);
		return super.get(publicKey);
	}

	has(keys) {
		checkKeys(keys);
		const {publicKey} = this[getInternalKeys](keys);
		return super.has(publicKey);
	}

	delete(keys) {
		checkKeys(keys);
		const {publicKey, privateKey} = this[getInternalKeys](keys);
		return Boolean(publicKey && super.delete(publicKey) && this[publicKeys].delete(privateKey));
	}

	clear() {
		super.clear();
		this[symbolHashes].clear();
		this[publicKeys].clear();
	}

	get [Symbol.toStringTag]() {
		return 'ManyKeysMap';
	}

	get size() {
		return super.size;
	}
};

if (process.env.NODE_ENV === 'test') {
	Object.assign(module.exports, {publicKeys, symbolHashes});
}
});

const pDefer = () => {
	const deferred = {};

	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
};

var pDefer_1 = pDefer;

const cache = new manyKeysMap();
const isDomReady = () => document.readyState === 'interactive' || document.readyState === 'complete';

const elementReady = (selector, {
	target = document,
	stopOnDomReady = true,
	timeout = Infinity
} = {}) => {
	const cacheKeys = [target, selector, stopOnDomReady, timeout];
	const cachedPromise = cache.get(cacheKeys);
	if (cachedPromise) {
		return cachedPromise;
	}

	let rafId;
	const deferred = pDefer_1();
	const {promise} = deferred;

	cache.set(cacheKeys, promise);

	const stop = () => {
		cancelAnimationFrame(rafId);
		cache.delete(cacheKeys, promise);
		deferred.resolve();
	};

	if (timeout !== Infinity) {
		setTimeout(stop, timeout);
	}

	// Interval to keep checking for it to come into the DOM.
	(function check() {
		const element = target.querySelector(selector);

		if (element) {
			deferred.resolve(element);
			stop();
		} else if (stopOnDomReady && isDomReady()) {
			stop();
		} else {
			rafId = requestAnimationFrame(check);
		}
	})();

	return Object.assign(promise, {stop});
};

var elementReady_1 = elementReady;

var themeMermaid = "\n.gridjs button {\n  cursor: pointer;\n  background-color: transparent;\n  background-image: none;\n  padding: 0;\n  margin: 0;\n  border: none;\n  outline: none; }\n\n.gridjs-head {\n  margin-bottom: 5px;\n  padding: 5px 1px; }\n  .gridjs-head::after {\n    content: '';\n    display: block;\n    clear: both; }\n\n.gridjs-head:empty {\n  padding: 0;\n  border: none; }\n\n.gridjs-container {\n  overflow: hidden;\n  display: inline-block;\n  padding-left: 2px;\n  padding-right: 2px;\n  padding-bottom: 2px;\n  color: #000;\n  position: relative;\n  z-index: 0; }\n\n.gridjs-footer {\n  display: block;\n  position: relative;\n  z-index: 5;\n  padding: 12px 24px;\n  border-top: 1px solid #e5e7eb;\n  background-color: #fff;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 0 0 8px 8px;\n  border-bottom-width: 1px;\n  border-color: #e5e7eb; }\n\n.gridjs-footer:empty {\n  padding: 0;\n  border: none; }\n\ninput.gridjs-input {\n  outline: none;\n  background-color: #fff;\n  border: 1px solid #d2d6dc;\n  border-radius: 5px;\n  padding: 10px 13px;\n  font-size: 14px;\n  line-height: 1.45;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n  input.gridjs-input:focus {\n    box-shadow: 0 0 0 3px rgba(149, 189, 243, 0.5);\n    border-color: #9bc2f7; }\n\n.gridjs-pagination {\n  color: #3d4044; }\n  .gridjs-pagination::after {\n    content: '';\n    display: block;\n    clear: both; }\n  .gridjs-pagination .gridjs-summary {\n    float: left;\n    margin-top: 5px; }\n  .gridjs-pagination .gridjs-pages {\n    float: right; }\n    .gridjs-pagination .gridjs-pages button {\n      padding: 5px 14px;\n      border: 1px solid #d2d6dc;\n      background-color: #fff;\n      border-right: none;\n      outline: none;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .gridjs-pagination .gridjs-pages button:focus {\n      box-shadow: 0 0 0 2px rgba(149, 189, 243, 0.5); }\n    .gridjs-pagination .gridjs-pages button:hover {\n      background-color: #f7f7f7;\n      color: #3c4257;\n      outline: none; }\n    .gridjs-pagination .gridjs-pages button:disabled, .gridjs-pagination .gridjs-pages button[disabled], .gridjs-pagination .gridjs-pages button:hover:disabled {\n      cursor: default;\n      background-color: #fff;\n      color: #6b7280; }\n    .gridjs-pagination .gridjs-pages button.gridjs-spread {\n      cursor: default;\n      box-shadow: none;\n      background-color: #fff; }\n    .gridjs-pagination .gridjs-pages button.gridjs-currentPage {\n      background-color: #f7f7f7;\n      font-weight: bold; }\n    .gridjs-pagination .gridjs-pages button:last-child {\n      border-bottom-right-radius: 6px;\n      border-top-right-radius: 6px;\n      border-right: 1px solid #d2d6dc; }\n    .gridjs-pagination .gridjs-pages button:first-child {\n      border-bottom-left-radius: 6px;\n      border-top-left-radius: 6px; }\n\nbutton.gridjs-sort {\n  float: right;\n  height: 24px;\n  width: 16px;\n  background-repeat: no-repeat; }\n  button.gridjs-sort-neutral {\n    opacity: 0.3;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVQ4T6WTUQ5BQQxFz1uG4IdnH2xHgo3w/xKLYSOEiMQqkCatSE2nwfy297Rz70zDn6dJ9APgAVyjvhpgAuyAOzADDiVIBDBxX0WXCFICeLENLkI8oAX2gE32WwtkChyt4AFzYJkYuwG2EeDrULMYU6AHLIBVoloDXXSFkZo4DCBnNfFU82CsD8hDPsQCiTzwkKK4BpCaQeQpS/avtd+vl6XQ0890++UzpRFKwxNZzCARuMPL3wAAAABJRU5ErkJggg==\");\n    background-position-y: center; }\n  button.gridjs-sort-asc {\n    padding-bottom: 6px;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4T+3SsQ1AUBQF0GMfQ5hEoddILKHR6VT2MIZtJBoSkf/9iE68+t1T3NzMy8te5v2AZAc1Vgyxsu9KbNHtwQZ9CIkB5/CRCyIhIBSOIlegwpgYV4np+LkCOYoEMGOJAY+X/YEpbzl7DBHJyXtQAAAAAElFTkSuQmCC\");\n    background-position-y: top; }\n  button.gridjs-sort-desc {\n    padding-top: 6px;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4T2NkoBAwUqifYRgaIMPAwGBAIFzOMzAwPIWpQQ+DYgYGhh4CBuQzMDBMwmUAEwMDw1QGBoYMHIaA5HIZGBj+4zIAJI7LEAzNIMW4ohHdEKya8RkAc0kvAwPDHwYGhjJkZyN7bxgmJJLzFsVhAAAclRAR/sEwnwAAAABJRU5ErkJggg==\");\n    background-position-y: bottom; }\n\nbutton.gridjs-sort:focus {\n  outline: none; }\n\ntable.gridjs-table {\n  max-width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  display: table;\n  margin: 0;\n  padding: 0;\n  overflow: auto;\n  table-layout: fixed; }\n\ntd.gridjs-td {\n  border: 1px solid #e5e7eb;\n  padding: 12px 24px;\n  background-color: #fff;\n  box-sizing: content-box; }\n\ntd.gridjs-td:first-child {\n  border-left: none; }\n\ntd.gridjs-td:last-child {\n  border-right: none; }\n\ntd.gridjs-message {\n  text-align: center; }\n\nth.gridjs-th {\n  border: 1px solid #e5e7eb;\n  padding: 14px 24px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  box-sizing: content-box;\n  white-space: nowrap;\n  outline: none; }\n  th.gridjs-th-sort {\n    cursor: pointer; }\n  th.gridjs-th-sort:hover {\n    background-color: #e5e7eb; }\n  th.gridjs-th-sort:focus {\n    background-color: #e5e7eb; }\n\nth.gridjs-th:first-child {\n  border-left: none; }\n\nth.gridjs-th:last-child {\n  border-right: none; }\n\n.gridjs-tbody {\n  background-color: #fff; }\n\n.gridjs-tr:last-child td {\n  border-bottom: 0; }\n\n.gridjs *, .gridjs :after, .gridjs :before {\n  box-sizing: border-box; }\n\n.gridjs-thead {\n  color: #6b7280;\n  background-color: #f9fafb; }\n\n.gridjs-wrapper {\n  position: relative;\n  z-index: 1;\n  overflow: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 8px 8px 0 0;\n  display: block;\n  border-top-width: 1px;\n  border-color: #e5e7eb; }\n\n.gridjs-wrapper:last-of-type {\n  border-radius: 8px;\n  border-bottom-width: 1px; }\n\n.gridjs-search {\n  float: left; }\n  .gridjs-search-input {\n    width: 250px; }\n\n.gridjs-loading-bar {\n  z-index: 10;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #fff;\n  opacity: 0.5; }\n  .gridjs-loading-bar::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transform: translateX(-100%);\n    background-image: linear-gradient(90deg, rgba(204, 204, 204, 0) 0, rgba(204, 204, 204, 0.2) 20%, rgba(204, 204, 204, 0.5) 60%, rgba(204, 204, 204, 0));\n    animation: shimmer 2s infinite;\n    content: ''; }\n\n@keyframes shimmer {\n  100% {\n    transform: translateX(100%); } }\n\n/*# sourceMappingURL=theme/mermaid.css.map */";

var script = {
  name: 'Grid',
  props: {
    autoWidth: {
      type: Boolean,
      default: true
    },
    classNames: {
      type: Object,
      default: undefined
    },
    cols: {
      type: Array,
      default: undefined
    },
    from: {
      type: [String, Function],
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
    rows: {
      type: [Array, Function],
      default: undefined
    },
    search: {
      type: Boolean,
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
      default: 'mermaid'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data: function data() {
    return {
      dict: {
        error: {
          columnsUndefined: 'Column headers are undefined',
          rowsUndefined: 'No data to display'
        }
      },
      grid: null,
      uuid: null,
      wrapper: null,
      themes: {
        mermaid: themeMermaid
      }
    };
  },
  computed: {
    options: function options() {
      var options = {
        autoWidth: this.autoWidth,
        columns: this.cols ? this.cols : [this.dict.error.columnsUndefined],
        data: this.rows ? this.rows : this.from || this.server ? undefined : [[this.dict.error.rowsUndefined]],
        pagination: this.pagination,
        sort: this.sort,
        width: this.width
      }; // let classNames

      if (this.classNames) options.className = this.classNames;
      if (this.from) options.from = typeof this.from === 'string' ? document.querySelector(this.from) : document.createRange().createContextualFragment(this.from);
      if (this.language) options.language = this.language;
      if (this.search) options.search = this.search;
      if (this.server) options.server = this.server;
      if (this.styles) options.style = this.styles;
      return options;
    }
  },
  watch: {
    autoWidth: function autoWidth() {
      this.update();
    },
    cols: function cols() {
      this.update();
    },
    from: function from() {
      this.update();
    },
    language: function language() {
      this.update();
    },
    pagination: function pagination() {
      this.update();
    },
    rows: function rows() {
      this.update();
    },
    search: function search() {
      this.update();
    },
    server: function server() {
      this.update();
    },
    sort: function sort() {
      this.update();
    },
    width: function width() {
      this.update();
    }
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // give table a unique id
              _this.uuid = nanoid(); // select the unique wrapper element

              _context.next = 3;
              return elementReady_1("[data-uuid=\"".concat(_this.uuid, "\"]"));

            case 3:
              _this.wrapper = _context.sent;

              if (!(_this.theme !== 'none')) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return _this.assignTheme();

            case 7:
              // instantiate grid.js
              if (_this.wrapper && (_this.options.data || _this.options.from || _this.options.server)) {
                _this.grid = new se(_this.options).render(_this.wrapper);
              }

            case 8:
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
  },
  methods: {
    assignTheme: function assignTheme() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var head, id, stylesheet, index, _index, css, rule;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                head = document.getElementsByTagName('head')[0];
                id = "gridjs__".concat(_this2.uuid);
                stylesheet = document.createRange().createContextualFragment("\n        <style title=\"".concat(id, "_theme\" type=\"text/css\">\n          ").concat(_this2.themes[_this2.theme], "\n        </style>\n      "));
                head.appendChild(stylesheet);

                for (index in document.styleSheets) {
                  if (document.styleSheets[index].title === "".concat(id, "_theme")) stylesheet = document.styleSheets[index];
                }

                if (stylesheet instanceof CSSStyleSheet) {
                  for (_index in stylesheet.cssRules) {
                    css = stylesheet.cssRules[_index].cssText;

                    if (css && !/@/g.test(css)) {
                      rule = "#".concat(id, " ").concat(css);
                      stylesheet.deleteRule(_index);
                      stylesheet.insertRule(rule, _index);
                    }
                  }
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    update: function update() {
      this.grid.updateConfig(this.options).forceRender();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("article", {
    class: "gridjs__wrapper",
    attrs: { id: "gridjs__" + _vm.uuid, "data-uuid": _vm.uuid }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-b9c95e4a_0", { source: "\n.gridjs__wrapper[data-v-b9c95e4a] {\n  align-items: center;\n  display: flex;\n  height: fit-content;\n  justify-content: center;\n  width: 100%;\n}\n", map: {"version":3,"sources":["/Users/daniel/code/gridjs-vue/src/gridjs-vue.vue"],"names":[],"mappings":";AAqMA;EACA,mBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;AACA","file":"gridjs-vue.vue","sourcesContent":["<template>\n  <article :id=\"`gridjs__${uuid}`\" :data-uuid=\"uuid\" :class=\"`gridjs__wrapper`\"></article>\n</template>\n\n<script>\nimport { Grid } from 'gridjs'\nimport { nanoid } from 'nanoid'\nimport elementReady from 'element-ready'\n\nimport themeMermaid from 'gridjs/dist/theme/mermaid.css'\n\nexport default {\n  name: 'Grid',\n  props: {\n    autoWidth: {\n      type: Boolean,\n      default: true\n    },\n    classNames: {\n      type: Object,\n      default: undefined\n    },\n    cols: {\n      type: Array,\n      default: undefined\n    },\n    from: {\n      type: [String, Function],\n      default: undefined\n    },\n    language: {\n      type: Object,\n      default: undefined\n    },\n    pagination: {\n      type: [Object, Boolean],\n      default: false\n    },\n    rows: {\n      type: [Array, Function],\n      default: undefined\n    },\n    search: {\n      type: Boolean,\n      default: false\n    },\n    server: {\n      type: [Object, Function],\n      default: undefined\n    },\n    sort: {\n      type: [Object, Boolean],\n      default: false\n    },\n    styles: {\n      type: Object,\n      default: undefined\n    },\n    theme: {\n      type: String,\n      default: 'mermaid'\n    },\n    width: {\n      type: String,\n      default: '100%'\n    }\n  },\n  data() {\n    return {\n      dict: {\n        error: {\n          columnsUndefined: 'Column headers are undefined',\n          rowsUndefined: 'No data to display'\n        }\n      },\n      grid: null,\n      uuid: null,\n      wrapper: null,\n      themes: {\n        mermaid: themeMermaid\n      }\n    }\n  },\n  computed: {\n    options() {\n      let options = {\n        autoWidth: this.autoWidth,\n        columns: this.cols ? this.cols : [this.dict.error.columnsUndefined],\n        data: this.rows ? this.rows : this.from || this.server ? undefined : [[this.dict.error.rowsUndefined]],\n        pagination: this.pagination,\n        sort: this.sort,\n        width: this.width\n      }\n\n      // let classNames\n\n      if (this.classNames) options.className = this.classNames\n      if (this.from)\n        options.from =\n          typeof this.from === 'string'\n            ? document.querySelector(this.from)\n            : document.createRange().createContextualFragment(this.from)\n      if (this.language) options.language = this.language\n      if (this.search) options.search = this.search\n      if (this.server) options.server = this.server\n      if (this.styles) options.style = this.styles\n\n      return options\n    }\n  },\n  watch: {\n    autoWidth() {\n      this.update()\n    },\n    cols() {\n      this.update()\n    },\n    from() {\n      this.update()\n    },\n    language() {\n      this.update()\n    },\n    pagination() {\n      this.update()\n    },\n    rows() {\n      this.update()\n    },\n    search() {\n      this.update()\n    },\n    server() {\n      this.update()\n    },\n    sort() {\n      this.update()\n    },\n    width() {\n      this.update()\n    }\n  },\n  async mounted() {\n    // give table a unique id\n    this.uuid = nanoid()\n\n    // select the unique wrapper element\n    this.wrapper = await elementReady(`[data-uuid=\"${this.uuid}\"]`)\n\n    // assign styles\n    if (this.theme !== 'none') await this.assignTheme()\n\n    // instantiate grid.js\n    if (this.wrapper && (this.options.data || this.options.from || this.options.server)) {\n      this.grid = new Grid(this.options).render(this.wrapper)\n    }\n  },\n  destroyed() {\n    // unload from memory\n    this.grid = undefined\n    this.wrapper = undefined\n  },\n  methods: {\n    async assignTheme() {\n      const head = document.getElementsByTagName('head')[0]\n      const id = `gridjs__${this.uuid}`\n\n      let stylesheet = document.createRange().createContextualFragment(`\n        <style title=\"${id}_theme\" type=\"text/css\">\n          ${this.themes[this.theme]}\n        </style>\n      `)\n      head.appendChild(stylesheet)\n\n      for (let index in document.styleSheets) {\n        if (document.styleSheets[index].title === `${id}_theme`) stylesheet = document.styleSheets[index]\n      }\n\n      if (stylesheet instanceof CSSStyleSheet) {\n        for (const index in stylesheet.cssRules) {\n          let css = stylesheet.cssRules[index].cssText\n          if (css && !/@/g.test(css)) {\n            const rule = `#${id} ${css}`\n            stylesheet.deleteRule(index)\n            stylesheet.insertRule(rule, index)\n          }\n        }\n      }\n    },\n    update() {\n      this.grid.updateConfig(this.options).forceRender()\n    }\n  }\n}\n</script>\n\n<style scoped>\n.gridjs__wrapper {\n  align-items: center;\n  display: flex;\n  height: fit-content;\n  justify-content: center;\n  width: 100%;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-b9c95e4a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

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
