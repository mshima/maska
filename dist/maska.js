/*!
 * maska v1.5.2
 * (c) 2019-2022 Alexander Shabunevich
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Maska={})}(this,(function(e){"use strict";function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function n(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,i(r.key),r)}}function o(e,t,n){return(t=i(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}var s={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return l(t).length>1?p(t)(e,t,n,r):c(e,t,n,r)}function l(e){try{return JSON.parse(e)}catch(t){return[e]}}function p(e){var t=l(e).sort((function(e,t){return e.length-t.length}));return function(e,r,a){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=t.map((function(t){return c(e,t,a,!1)})),s=i.pop();for(var u in t)if(n(s,t[u],a))return c(e,t[u],a,o);return""};function n(e,t,n){for(var r in n)n[r].escape&&(t=t.replace(new RegExp(r+".{1}","g"),""));return t.split("").filter((function(e){return n[e]&&n[e].pattern})).length>=e.length}}function c(e,t,n){for(var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=0,o=0,i="",s="";a<t.length&&o<e.length;){var u=t[a],l=e[o],p=n[u];if(p&&p.pattern)p.pattern.test(l)&&(i+=f(l,p),a++,r&&t[a]&&(n[t[a]]?n[t[a]]&&n[t[a]].escape&&(i+=t[a+1],a+=2):(i+=t[a],a++))),o++;else if(p&&p.repeat){var c=n[t[a-1]];c&&!c.pattern.test(l)?a++:a--}else p&&p.escape&&(u=t[++a]),r&&(i+=u),l===u&&o++,a++}for(;r&&a<t.length;){var v=t[a];if(n[v]){s="";break}s+=v,a++}return i+s}function f(e,t){return t.transform&&(e=t.transform(e)),t.uppercase?e.toLocaleUpperCase():t.lowercase?e.toLocaleLowerCase():e}function v(e){return e instanceof HTMLInputElement?e:e.querySelector("input")||e}function d(e){return"[object String]"===Object.prototype.toString.call(e)}var m=function(){function e(t){var a=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r(this,e),!t)throw new Error("Maska: no element for mask");if(null!=o.preprocessor&&"function"!=typeof o.preprocessor)throw new Error("Maska: preprocessor must be a function");if(o.tokens)for(var i in o.tokens)o.tokens[i]=n({},o.tokens[i]),o.tokens[i].pattern&&d(o.tokens[i].pattern)&&(o.tokens[i].pattern=new RegExp(o.tokens[i].pattern));this._opts={mask:o.mask,tokens:n(n({},s),o.tokens),preprocessor:o.preprocessor},this._el=d(t)?document.querySelectorAll(t):t.length?t:[t],this.inputEvent=function(e){return a.updateValue(e.target,e)},this.init()}var t,o,i;return t=e,o=[{key:"init",value:function(){for(var e=this,t=function(t){var n=v(e._el[t]);!e._opts.mask||n.dataset.mask&&n.dataset.mask===e._opts.mask||(n.dataset.mask=e._opts.mask),setTimeout((function(){return e.updateValue(n)}),0),n.dataset.maskInited||(n.dataset.maskInited=!0,n.addEventListener("input",e.inputEvent),n.addEventListener("beforeinput",e.beforeInput))},n=0;n<this._el.length;n++)t(n)}},{key:"destroy",value:function(){for(var e=0;e<this._el.length;e++){var t=v(this._el[e]);t.removeEventListener("input",this.inputEvent),t.removeEventListener("beforeinput",this.beforeInput),delete t.dataset.mask,delete t.dataset.maskInited}}},{key:"updateValue",value:function(e,t){if(e&&e.type){var n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return e.dataset.maskRawValue="",void this.dispatch("maska",e,t);var r=e.selectionEnd,a=e.value,o=a[r-1];e.dataset.maskRawValue=u(e.value,e.dataset.mask,this._opts.tokens,!1);var i=e.value;this._opts.preprocessor&&(i=this._opts.preprocessor(i)),e.value=u(i,e.dataset.mask,this._opts.tokens),t&&"insertText"===t.inputType&&r===a.length&&(r=e.value.length),function(e,t,n){for(;t&&t<e.value.length&&e.value.charAt(t-1)!==n;)t++;(e.type?e.type.match(/^(text|search|password|tel|url)$/i):!e.type)&&e===document.activeElement&&(e.setSelectionRange(t,t),setTimeout((function(){e.setSelectionRange(t,t)}),0))}(e,r,o),this.dispatch("maska",e,t),e.value!==a&&this.dispatch("input",e,t)}}},{key:"beforeInput",value:function(e){e&&e.target&&e.target.type&&e.target.type.match(/^number$/i)&&e.data&&isNaN(e.target.value+e.data)&&e.preventDefault()}},{key:"dispatch",value:function(e,t,n){t.dispatchEvent(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createEvent("Event");return n.initEvent(e,!0,!0),t&&(n.inputType=t),n}(e,n&&n.inputType||null))}}],o&&a(t.prototype,o),i&&a(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();var h,y=(h=new WeakMap,function(e,t){t.value&&(h.has(e)&&!function(e){return!(d(e.value)&&e.value===e.oldValue||Array.isArray(e.value)&&JSON.stringify(e.value)===JSON.stringify(e.oldValue)||e.value&&e.value.mask&&e.oldValue&&e.oldValue.mask&&e.value.mask===e.oldValue.mask)}(t)||h.set(e,new m(e,function(e){var t={};return e.mask?(t.mask=Array.isArray(e.mask)?JSON.stringify(e.mask):e.mask,t.tokens=e.tokens?n({},e.tokens):{},t.preprocessor=e.preprocessor):t.mask=Array.isArray(e)?JSON.stringify(e):e,t}(t.value))))});function k(e){e.directive("maska",y)}"undefined"!=typeof window&&window.Vue&&window.Vue.use&&window.Vue.use(k),e.create=function(e,t){return new m(e,t)},e.default=k,e.install=k,e.mask=u,e.maska=y,e.tokens=s,Object.defineProperty(e,"__esModule",{value:!0})}));
