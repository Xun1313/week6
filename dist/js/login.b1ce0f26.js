(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"07e3":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"11e9":function(t,e,n){var r=n("52a7"),i=n("4630"),o=n("6821"),a=n("6a99"),c=n("69a8"),s=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=o(t),e=a(e,!0),s)try{return u(t,e)}catch(n){}if(c(t,e))return i(!r.f.call(t,e),t[e])}},"1bc3":function(t,e,n){var r=n("f772");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(t,e,n){var r=n("f772"),i=n("e53d").document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},"26a3":function(t,e,n){},"294c":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"35e8":function(t,e,n){var r=n("d9f6"),i=n("aebd");t.exports=n("8e60")?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},"454f":function(t,e,n){n("46a7");var r=n("584a").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},"456d":function(t,e,n){var r=n("4bf8"),i=n("0d58");n("5eda")("keys",function(){return function(t){return i(r(t))}})},"46a7":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"584a":function(t,e){var n=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=n)},"588e":function(t,e,n){"use strict";var r=n("26a3"),i=n.n(r);i.a},"5eda":function(t,e,n){var r=n("5ca1"),i=n("8378"),o=n("79e5");t.exports=function(t,e){var n=(i.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*o(function(){n(1)}),"Object",a)}},"63b6":function(t,e,n){var r=n("e53d"),i=n("584a"),o=n("d864"),a=n("35e8"),c=n("07e3"),s="prototype",u=function(t,e,n){var f,l,p,d=t&u.F,v=t&u.G,m=t&u.S,g=t&u.P,y=t&u.B,h=t&u.W,b=v?i:i[e]||(i[e]={}),w=b[s],O=v?r:m?r[e]:(r[e]||{})[s];for(f in v&&(n=e),n)l=!d&&O&&void 0!==O[f],l&&c(b,f)||(p=l?O[f]:n[f],b[f]=v&&"function"!=typeof O[f]?n[f]:y&&l?o(p,r):h&&O[f]==p?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(p):g&&"function"==typeof p?o(Function.call,p):p,g&&((b.virtual||(b.virtual={}))[f]=p,t&u.R&&w&&!w[f]&&a(w,f,p)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},"794b":function(t,e,n){t.exports=!n("8e60")&&!n("294c")(function(){return 7!=Object.defineProperty(n("1ec9")("div"),"a",{get:function(){return 7}}).a})},"79aa":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"85f2":function(t,e,n){t.exports=n("454f")},"8e60":function(t,e,n){t.exports=!n("294c")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"8e6e":function(t,e,n){var r=n("5ca1"),i=n("990b"),o=n("6821"),a=n("11e9"),c=n("f1ae");r(r.S,"Object",{getOwnPropertyDescriptors:function(t){var e,n,r=o(t),s=a.f,u=i(r),f={},l=0;while(u.length>l)n=s(r,e=u[l++]),void 0!==n&&c(f,e,n);return f}})},9093:function(t,e,n){var r=n("ce10"),i=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},"990b":function(t,e,n){var r=n("9093"),i=n("2621"),o=n("cb7c"),a=n("7726").Reflect;t.exports=a&&a.ownKeys||function(t){var e=r.f(o(t)),n=i.f;return n?e.concat(n(t)):e}},ac6a:function(t,e,n){for(var r=n("cadf"),i=n("0d58"),o=n("2aba"),a=n("7726"),c=n("32e9"),s=n("84f2"),u=n("2b4c"),f=u("iterator"),l=u("toStringTag"),p=s.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},v=i(d),m=0;m<v.length;m++){var g,y=v[m],h=d[y],b=a[y],w=b&&b.prototype;if(w&&(w[f]||c(w,f,p),w[l]||c(w,l,y),s[y]=p,h))for(g in r)w[g]||o(w,g,r[g],!0)}},aebd:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},bd86:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var r=n("85f2"),i=n.n(r);function o(t,e,n){return e in t?i()(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},d864:function(t,e,n){var r=n("79aa");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},d9f6:function(t,e,n){var r=n("e4ae"),i=n("794b"),o=n("1bc3"),a=Object.defineProperty;e.f=n("8e60")?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return a(t,e,n)}catch(c){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},dd7b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg-login"},[n("div",{staticClass:"opacity-login"},[n("div",{staticClass:"login"},[n("i",{staticClass:"fas fa-user-alt login-icon"}),n("div",{staticClass:"login-title"},[t._v("MEMBER LOGIN")]),n("div",{staticClass:"login-name"},[t._v("email")]),n("div",{staticClass:"login-item"},[n("div",{staticClass:"login-item-flex",class:{error:t.errors.has("email")}},[t._m(0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.account.email,expression:"account.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"login-item-flex-input",attrs:{type:"email",placeholder:"Email ID","data-vv-as":"電子郵件",name:"email"},domProps:{value:t.account.email},on:{input:function(e){e.target.composing||t.$set(t.account,"email",e.target.value)}}})]),t.errors.has("email")?n("div",{staticClass:"login-item-error"},[t._v("不符合email格式")]):t._e()]),n("div",{staticClass:"login-name"},[t._v("密碼")]),n("div",{staticClass:"login-item"},[n("div",{staticClass:"login-item-flex",class:{error:t.errors.has("password")}},[t._m(1),n("input",{directives:[{name:"model",rawName:"v-model",value:t.account.password,expression:"account.password"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"password",staticClass:"login-item-flex-input",attrs:{type:"password",placeholder:"Password","data-vv-as":"密碼",name:"password"},domProps:{value:t.account.password},on:{input:function(e){e.target.composing||t.$set(t.account,"password",e.target.value)}}}),n("i",{staticClass:"far fa-eye login-item-flex-eye",class:[t.eye?"fa-eye":"fa-eye-slash"],on:{click:function(e){return t.eyeHandler()}}})]),t.errors.has("password")?n("div",{staticClass:"login-item-error"},[t._v("密碼為必填")]):t._e()]),t.error?n("div",{staticClass:"login-item-error"},[t._v("帳號或密碼有誤")]):t._e(),n("button",{staticClass:"login-login",attrs:{type:"button"},on:{click:function(e){return t.signin()}}},[t._v("SIGN IN")]),n("router-link",{staticClass:"login-register",attrs:{to:"/signup"}},[t._v("立即註冊")])],1)])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-item-flex-icon"},[n("i",{staticClass:"far fa-envelope"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-item-flex-icon"},[n("i",{staticClass:"fas fa-lock"})])}],o=(n("8e6e"),n("ac6a"),n("456d"),n("bd86"));function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(n,!0).forEach(function(e){Object(o["a"])(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var s={data:function(){return{error:!1,account:{email:"",password:""},eye:!1}},methods:{eyeHandler:function(){this.eye?this.$refs.password.type="password":this.$refs.password.type="text",this.eye=!this.eye},toFavorite:function(){this.$http.post("".concat("https://guarded-castle-26873.herokuapp.com","/favorite"),{id:"-LmcnJQtYP45XMHKhckV"}).then(function(t){console.log(t)})},signin:function(){var t=this;this.$validator.validate().then(function(e){e&&(t.$bus.$emit("isLoading",!0),t.$http.post("".concat("https://guarded-castle-26873.herokuapp.com","/users/signin"),c({},t.account)).then(function(e){e.data.success?(t.$bus.$emit("refreshSignin"),t.$router.push("/")):t.error=!0,t.$bus.$emit("isLoading",!1)}))})},deleteFavorite:function(){this.$http.delete("".concat("https://guarded-castle-26873.herokuapp.com","/favorite/-LmcHMVJzVF35Zg25qm4")).then(function(t){console.log(t)})}}},u=s,f=(n("588e"),n("2877")),l=Object(f["a"])(u,r,i,!1,null,"341ee96e",null);e["default"]=l.exports},e4ae:function(t,e,n){var r=n("f772");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},e53d:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},f1ae:function(t,e,n){"use strict";var r=n("86cc"),i=n("4630");t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},f772:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}}}]);
//# sourceMappingURL=login.b1ce0f26.js.map