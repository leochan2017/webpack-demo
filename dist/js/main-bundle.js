/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _layer = __webpack_require__(7);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
    var dom = document.getElementById('app');

    var layer = new _layer2.default();

    dom.innerHTML = layer.tpl({
        name: 'Leo',
        arr: ['apple', 'mi', 'nokia']
    });
};

new App();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--3-2!./commom.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--3-2!./commom.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(5), "");

// module
exports.push([module.i, "html, body {\n    padding: 0;\n    margin: 0;\n    background-color: pink;\n}\n\nul, li {\n    padding: 0;\n    margin: 0;\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".flex-div {\n    display: flex;\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(8);

var _layer = __webpack_require__(11);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function layer() {
    return {
        name: 'layer',
        tpl: _layer2.default
    };
}
// import tpl from './layer.html'
exports.default = layer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--4-2!../../../node_modules/less-loader/dist/cjs.js!./layer.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--4-2!../../../node_modules/less-loader/dist/cjs.js!./layer.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".test_autoprefixer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.layer {\n  width: 600px;\n  height: 200px;\n  background-color: yellow;\n}\n.layer > div {\n  width: 400px;\n  height: 200px;\n  background-color: pink;\n  background-repeat: no-repeat;\n  background-image: url(" + __webpack_require__(10) + ");\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="layer">\n    <!-- 在模版中引入图片: -->\n    <!-- 不能这样 -->\n    <!-- <img src="../../assets/bg2.jpg" alt="" width="100"> -->\n    <!-- 要这样: -->\n    <img src="' +
((__t = ( __webpack_require__(12) )) == null ? '' : __t) +
'" alt="" width="100">\n    <div>this is a ' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n    ';
 for(var i = 0; i < arr.length; i++) { ;
__p += '\n        ' +
((__t = ( arr[i] )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n</div>';

}
return __p
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bg2-81846.jpg";

/***/ })
/******/ ]);