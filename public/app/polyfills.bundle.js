<<<<<<< HEAD
webpackJsonp([0],{"+GRi":function(t,e,n){var r=n("Wo2w"),o=n("Wy9r");t.exports=function(t){return r(o(t))}},"+Q6C":function(t,e,n){var r=n("CDXM"),o=n("6De9").f,i=n("+pQw");r(r.S,"Reflect",{deleteProperty:function(t,e){var n=o(i(t),e);return!(n&&!n.configurable)&&delete t[e]}})},"+iEx":function(t,e,n){n("fHxy"),n("5GJ3"),n("X0O/"),n("HCkn"),n("ncNB"),n("soMw"),n("8sYH"),n("IJ3P"),n("t6ta"),t.exports=n("b4gG").Reflect},"+pQw":function(t,e,n){var r=n("JXkd");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},"/XRd":function(t,e,n){var r=n("tose"),o=n("CDXM"),i=n("+pQw"),a=n("A1WY");o(o.S+o.F*n("umMR")(function(){Reflect.defineProperty(r.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,e,n){i(t),e=a(e,!0),i(n);try{return r.f(t,e,n),!0}catch(t){return!1}}})},"/wY1":function(t,e,n){n("rMMT"),n("dlwK"),n("/XRd"),n("+Q6C"),n("dBNB"),n("7Fno"),n("gZpL"),n("dSHT"),n("d+61"),n("V2Dj"),n("wJYt"),n("gdNQ"),n("VsLy"),n("wLW2"),t.exports=n("b4gG").Reflect},1:function(t,e,n){t.exports=n("TU+8")},"2Fuj":function(t,e,n){var r=n("R5c1"),o=n("a/Sk");t.exports=Object.keys||function(t){return r(t,o)}},"3LDD":function(t,e,n){"use strict";var r=n("tose").f,o=n("51pc"),i=n("pBmS"),a=n("pa70"),c=n("Lcie"),u=n("p/bR"),s=n("WsSm"),f=n("w/BM"),l=n("KpXt"),p=n("V+0c"),h=n("xI8H").fastKey,v=n("Y5fy"),d=p?"_s":"size",g=function(t,e){var n,r=h(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,s){var f=t(function(t,r){c(t,f,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=r&&u(r,n,t[s],t)});return i(f.prototype,{clear:function(){for(var t=v(this,e),n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[d]=0},delete:function(t){var n=v(this,e),r=g(n,t);if(r){var o=r.n,i=r.p;delete n._i[r.i],r.r=!0,i&&(i.n=o),o&&(o.p=i),n._f==r&&(n._f=o),n._l==r&&(n._l=i),n[d]--}return!!r},forEach:function(t){v(this,e);for(var n,r=a(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!g(v(this,e),t)}}),p&&r(f.prototype,"size",{get:function(){return v(this,e)[d]}}),f},def:function(t,e,n){var r,o,i=g(t,e);return i?i.v=n:(t._l=i={i:o=h(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[d]++,"F"!==o&&(t._i[o]=i)),t},getEntry:g,setStrong:function(t,e,n){s(t,e,function(t,n){this._t=v(t,e),this._k=n,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?f(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,f(1))},n?"entries":"values",!n,!0),l(e)}}},"3r0D":function(t,e,n){var r=n("Iclu")("wks"),o=n("c09d"),i=n("ptrv").Symbol,a="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))}).store=r},"51pc":function(t,e,n){var r=n("+pQw"),o=n("ewdp"),i=n("a/Sk"),a=n("yIWP")("IE_PROTO"),c=function(){},u="prototype",s=function(){var t,e=n("BQSv")("iframe"),r=i.length;for(e.style.display="none",n("Ed9o").appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s[u][i[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(c[u]=r(t),n=new c,c[u]=null,n[a]=t):n=s(),void 0===e?n:o(n,e)}},"5GJ3":function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=r.key,a=r.map,c=r.store;r.exp({deleteMetadata:function(t,e){var n=arguments.length<3?void 0:i(arguments[2]),r=a(o(e),n,!1);if(void 0===r||!r.delete(t))return!1;if(r.size)return!0;var u=c.get(e);return u.delete(n),!!u.size||c.delete(e)}})},"5b+r":function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},"5oDA":function(t,e,n){var r=n("JXkd"),o=n("+pQw"),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n("pa70")(Function.call,n("6De9").f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},"6De9":function(t,e,n){var r=n("9e9+"),o=n("piOq"),i=n("+GRi"),a=n("A1WY"),c=n("rMsi"),u=n("gNkH"),s=Object.getOwnPropertyDescriptor;e.f=n("V+0c")?s:function(t,e){if(t=i(t),e=a(e,!0),u)try{return s(t,e)}catch(t){}if(c(t,e))return o(!r.f.call(t,e),t[e])}},"7Fno":function(t,e,n){var r=n("6De9"),o=n("TJLg"),i=n("rMsi"),a=n("CDXM"),c=n("JXkd"),u=n("+pQw");a(a.S,"Reflect",{get:function t(e,n){var a,s,f=arguments.length<3?e:arguments[2];return u(e)===f?e[n]:(a=r.f(e,n))?i(a,"value")?a.value:void 0!==a.get?a.get.call(f):void 0:c(s=o(e))?t(s,n,f):void 0}})},"8sYH":function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=n("TJLg"),a=r.has,c=r.key,u=function(t,e,n){if(a(t,e,n))return!0;var r=i(e);return null!==r&&u(t,r,n)};r.exp({hasMetadata:function(t,e){return u(t,o(e),arguments.length<3?void 0:c(arguments[2]))}})},"9ScN":function(t,e,n){"use strict";var r=n("51pc"),o=n("piOq"),i=n("P6IN"),a={};n("gxdV")(a,n("3r0D")("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},"9e9+":function(t,e){e.f={}.propertyIsEnumerable},"9wYb":function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},A1WY:function(t,e,n){var r=n("JXkd");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},BCYq:function(t,e,n){var r=n("pa70"),o=n("Wo2w"),i=n("RT4T"),a=n("rppw"),c=n("UKZQ");t.exports=function(t,e){var n=1==t,u=2==t,s=3==t,f=4==t,l=6==t,p=5==t||l,h=e||c;return function(e,c,v){for(var d,g,y=i(e),_=o(y),k=r(c,v,3),m=a(_.length),b=0,w=n?h(e,m):u?h(e,0):void 0;m>b;b++)if((p||b in _)&&(g=k(d=_[b],b,y),t))if(n)w[b]=g;else if(g)switch(t){case 3:return!0;case 5:return d;case 6:return b;case 2:w.push(d)}else if(f)return!1;return l?-1:s||f?f:w}}},BQSv:function(t,e,n){var r=n("JXkd"),o=n("ptrv").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},CDXM:function(t,e,n){var r=n("ptrv"),o=n("b4gG"),i=n("gxdV"),a=n("lfBE"),c=n("pa70"),u="prototype",s=function(t,e,n){var f,l,p,h,v=t&s.F,d=t&s.G,g=t&s.P,y=t&s.B,_=d?r:t&s.S?r[e]||(r[e]={}):(r[e]||{})[u],k=d?o:o[e]||(o[e]={}),m=k[u]||(k[u]={});d&&(n=e);for(f in n)p=((l=!v&&_&&void 0!==_[f])?_:n)[f],h=y&&l?c(p,r):g&&"function"==typeof p?c(Function.call,p):p,_&&a(_,f,p,t&s.U),k[f]!=p&&i(k,f,h),g&&m[f]!=p&&(m[f]=p)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},Ed9o:function(t,e,n){var r=n("ptrv").document;t.exports=r&&r.documentElement},HCkn:function(t,e,n){var r=n("Ps07"),o=n("WGJ/"),i=n("gBtn"),a=n("+pQw"),c=n("TJLg"),u=i.keys,s=i.key,f=function(t,e){var n=u(t,e),i=c(t);if(null===i)return n;var a=f(i,e);return a.length?n.length?o(new r(n.concat(a))):a:n};i.exp({getMetadataKeys:function(t){return f(a(t),arguments.length<2?void 0:s(arguments[1]))}})},IJ3P:function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=r.has,a=r.key;r.exp({hasOwnMetadata:function(t,e){return i(t,o(e),arguments.length<3?void 0:a(arguments[2]))}})},Iclu:function(t,e,n){var r=n("ptrv"),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},JXkd:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},KGrn:function(t,e){t.exports=!1},KM3d:function(t,e,n){var r=n("9wYb"),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},"KpI+":function(t,e,n){var r=n("lexG"),o=n("3r0D")("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},KpXt:function(t,e,n){"use strict";var r=n("ptrv"),o=n("tose"),i=n("V+0c"),a=n("3r0D")("species");t.exports=function(t){var e=r[t];i&&e&&!e[a]&&o.f(e,a,{configurable:!0,get:function(){return this}})}},Lcie:function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},NISB:function(t,e,n){var r=n("PNtC"),o=n("lzDK"),i=n("+pQw"),a=n("ptrv").Reflect;t.exports=a&&a.ownKeys||function(t){var e=r.f(i(t)),n=o.f;return n?e.concat(n(t)):e}},P6IN:function(t,e,n){var r=n("tose").f,o=n("rMsi"),i=n("3r0D")("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},PNtC:function(t,e,n){var r=n("R5c1"),o=n("a/Sk").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},Ps07:function(t,e,n){"use strict";var r=n("3LDD"),o=n("Y5fy");t.exports=n("cpZ/")("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(o(this,"Set"),t=0===t?0:t,t)}},r)},QZhw:function(t,e,n){"use strict";var r,o=n("BCYq")(0),i=n("lfBE"),a=n("xI8H"),c=n("rIdM"),u=n("XRS9"),s=n("JXkd"),f=n("umMR"),l=n("Y5fy"),p="WeakMap",h=a.getWeak,v=Object.isExtensible,d=u.ufstore,g={},y=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},_={get:function(t){if(s(t)){var e=h(t);return!0===e?d(l(this,p)).get(t):e?e[this._i]:void 0}},set:function(t,e){return u.def(l(this,p),t,e)}},k=t.exports=n("cpZ/")(p,y,_,u,!0,!0);f(function(){return 7!=(new k).set((Object.freeze||Object)(g),7).get(g)})&&(c((r=u.getConstructor(y,p)).prototype,_),a.NEED=!0,o(["delete","has","get","set"],function(t){var e=k.prototype,n=e[t];i(e,t,function(e,o){if(s(e)&&!v(e)){this._f||(this._f=new r);var i=this._f[t](e,o);return"set"==t?this:i}return n.call(this,e,o)})}))},R5c1:function(t,e,n){var r=n("rMsi"),o=n("+GRi"),i=n("vyV2")(!1),a=n("yIWP")("IE_PROTO");t.exports=function(t,e){var n,c=o(t),u=0,s=[];for(n in c)n!=a&&r(c,n)&&s.push(n);for(;e.length>u;)r(c,n=e[u++])&&(~i(s,n)||s.push(n));return s}},RT4T:function(t,e,n){var r=n("Wy9r");t.exports=function(t){return Object(r(t))}},TJLg:function(t,e,n){var r=n("rMsi"),o=n("RT4T"),i=n("yIWP")("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},"TU+8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("/wY1"),o=(n.n(r),n("+iEx")),i=(n.n(o),n("eFQL"));n.n(i)},UKZQ:function(t,e,n){var r=n("a7b8");t.exports=function(t,e){return new(r(t))(e)}},ULWX:function(t,e,n){var r=n("+pQw");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},UlVq:function(t,e,n){var r=n("3r0D")("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},t(i)}catch(t){}return n}},Ula3:function(t,e,n){var r=n("JXkd"),o=n("5oDA").set;t.exports=function(t,e,n){var i,a=e.constructor;return a!==n&&"function"==typeof a&&(i=a.prototype)!==n.prototype&&r(i)&&o&&o(t,i),t}},"V+0c":function(t,e,n){t.exports=!n("umMR")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},V2Dj:function(t,e,n){var r=n("CDXM"),o=n("+pQw"),i=Object.isExtensible;r(r.S,"Reflect",{isExtensible:function(t){return o(t),!i||i(t)}})},VceJ:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},VsLy:function(t,e,n){var r=n("tose"),o=n("6De9"),i=n("TJLg"),a=n("rMsi"),c=n("CDXM"),u=n("piOq"),s=n("+pQw"),f=n("JXkd");c(c.S,"Reflect",{set:function t(e,n,c){var l,p,h=arguments.length<4?e:arguments[3],v=o.f(s(e),n);if(!v){if(f(p=i(e)))return t(p,n,c,h);v=u(0)}return a(v,"value")?!(!1===v.writable||!f(h)||((l=o.f(h,n)||u(0)).value=c,r.f(h,n,l),0)):void 0!==v.set&&(v.set.call(h,c),!0)}})},"WGJ/":function(t,e,n){var r=n("p/bR");t.exports=function(t,e){var n=[];return r(t,!1,n.push,n,e),n}},Wo2w:function(t,e,n){var r=n("VceJ");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},WsSm:function(t,e,n){"use strict";var r=n("KGrn"),o=n("CDXM"),i=n("lfBE"),a=n("gxdV"),c=n("rMsi"),u=n("lexG"),s=n("9ScN"),f=n("P6IN"),l=n("TJLg"),p=n("3r0D")("iterator"),h=!([].keys&&"next"in[].keys()),v="values",d=function(){return this};t.exports=function(t,e,n,g,y,_,k){s(n,e,g);var m,b,w,T=function(t){if(!h&&t in O)return O[t];switch(t){case"keys":case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},E=e+" Iterator",S=y==v,x=!1,O=t.prototype,D=O[p]||O["@@iterator"]||y&&O[y],M=!h&&D||T(y),P=y?S?T("entries"):M:void 0,j="Array"==e&&O.entries||D;if(j&&(w=l(j.call(new t)))!==Object.prototype&&w.next&&(f(w,E,!0),r||c(w,p)||a(w,p,d)),S&&D&&D.name!==v&&(x=!0,M=function(){return D.call(this)}),r&&!k||!h&&!x&&O[p]||a(O,p,M),u[e]=M,u[E]=d,y)if(m={values:S?M:T(v),keys:_?M:T("keys"),entries:P},k)for(b in m)b in O||i(O,b,m[b]);else o(o.P+o.F*(h||x),e,m);return m}},Wy9r:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},"X0O/":function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=n("TJLg"),a=r.has,c=r.get,u=r.key,s=function(t,e,n){if(a(t,e,n))return c(t,e,n);var r=i(e);return null!==r?s(t,r,n):void 0};r.exp({getMetadata:function(t,e){return s(t,o(e),arguments.length<3?void 0:u(arguments[2]))}})},XRS9:function(t,e,n){"use strict";var r=n("pBmS"),o=n("xI8H").getWeak,i=n("+pQw"),a=n("JXkd"),c=n("Lcie"),u=n("p/bR"),s=n("BCYq"),f=n("rMsi"),l=n("Y5fy"),p=s(5),h=s(6),v=0,d=function(t){return t._l||(t._l=new g)},g=function(){this.a=[]},y=function(t,e){return p(t.a,function(t){return t[0]===e})};g.prototype={get:function(t){var e=y(this,t);if(e)return e[1]},has:function(t){return!!y(this,t)},set:function(t,e){var n=y(this,t);n?n[1]=e:this.a.push([t,e])},delete:function(t){var e=h(this.a,function(e){return e[0]===t});return~e&&this.a.splice(e,1),!!~e}},t.exports={getConstructor:function(t,e,n,i){var s=t(function(t,r){c(t,s,e,"_i"),t._t=e,t._i=v++,t._l=void 0,void 0!=r&&u(r,n,t[i],t)});return r(s.prototype,{delete:function(t){if(!a(t))return!1;var n=o(t);return!0===n?d(l(this,e)).delete(t):n&&f(n,this._i)&&delete n[this._i]},has:function(t){if(!a(t))return!1;var n=o(t);return!0===n?d(l(this,e)).has(t):n&&f(n,this._i)}}),s},def:function(t,e,n){var r=o(i(e),!0);return!0===r?d(t).set(e,n):r[t._i]=n,t},ufstore:d}},Y5fy:function(t,e,n){var r=n("JXkd");t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},ZI9W:function(t,e,n){"use strict";var r=n("3LDD"),o=n("Y5fy");t.exports=n("cpZ/")("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=r.getEntry(o(this,"Map"),t);return e&&e.v},set:function(t,e){return r.def(o(this,"Map"),0===t?0:t,e)}},r,!0)},"a/Sk":function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},a7b8:function(t,e,n){var r=n("JXkd"),o=n("rKhO"),i=n("3r0D")("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},b4gG:function(t,e){var n=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=n)},c09d:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},"cpZ/":function(t,e,n){"use strict";var r=n("ptrv"),o=n("CDXM"),i=n("lfBE"),a=n("pBmS"),c=n("xI8H"),u=n("p/bR"),s=n("Lcie"),f=n("JXkd"),l=n("umMR"),p=n("UlVq"),h=n("P6IN"),v=n("Ula3");t.exports=function(t,e,n,d,g,y){var _=r[t],k=_,m=g?"set":"add",b=k&&k.prototype,w={},T=function(t){var e=b[t];i(b,t,"delete"==t?function(t){return!(y&&!f(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(y&&!f(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return y&&!f(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof k&&(y||b.forEach&&!l(function(){(new k).entries().next()}))){var E=new k,S=E[m](y?{}:-0,1)!=E,x=l(function(){E.has(1)}),O=p(function(t){new k(t)}),D=!y&&l(function(){for(var t=new k,e=5;e--;)t[m](e,e);return!t.has(-0)});O||((k=e(function(e,n){s(e,k,t);var r=v(new _,e,k);return void 0!=n&&u(n,g,r[m],r),r})).prototype=b,b.constructor=k),(x||D)&&(T("delete"),T("has"),g&&T("get")),(D||S)&&T(m),y&&b.clear&&delete b.clear}else k=d.getConstructor(e,t,g,m),a(k.prototype,n),c.NEED=!0;return h(k,t),w[t]=k,o(o.G+o.W+o.F*(k!=_),w),y||d.setStrong(k,t,g),k}},"d+61":function(t,e,n){var r=n("CDXM");r(r.S,"Reflect",{has:function(t,e){return e in t}})},dBNB:function(t,e,n){"use strict";var r=n("CDXM"),o=n("+pQw"),i=function(t){this._t=o(t),this._i=0;var e,n=this._k=[];for(e in t)n.push(e)};n("9ScN")(i,"Object",function(){var t,e=this._k;do{if(this._i>=e.length)return{value:void 0,done:!0}}while(!((t=e[this._i++])in this._t));return{value:t,done:!1}}),r(r.S,"Reflect",{enumerate:function(t){return new i(t)}})},dSHT:function(t,e,n){var r=n("CDXM"),o=n("TJLg"),i=n("+pQw");r(r.S,"Reflect",{getPrototypeOf:function(t){return o(i(t))}})},"dXJ/":function(t,e,n){var r=n("VceJ"),o=n("3r0D")("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},dlwK:function(t,e,n){var r=n("CDXM"),o=n("51pc"),i=n("uNkO"),a=n("+pQw"),c=n("JXkd"),u=n("umMR"),s=n("p9up"),f=(n("ptrv").Reflect||{}).construct,l=u(function(){function t(){}return!(f(function(){},[],t)instanceof t)}),p=!u(function(){f(function(){})});r(r.S+r.F*(l||p),"Reflect",{construct:function(t,e){i(t),a(e);var n=arguments.length<3?t:i(arguments[2]);if(p&&!l)return f(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(s.apply(t,r))}var u=n.prototype,h=o(c(u)?u:Object.prototype),v=Function.apply.call(t,h,e);return c(v)?v:h}})},eFQL:function(t,e,n){(function(t){!function(){"use strict";!function(t){var e="function",n=t.performance;function r(t){n&&n.mark&&n.mark(t)}function o(t,e){n&&n.measure&&n.measure(t,e)}if(r("Zone"),t.Zone)throw new Error("Zone already loaded.");var i=function(){function n(t,e){this._properties=null,this._parent=t,this._name=e?e.name||"unnamed":"<root>",this._properties=e&&e.properties||{},this._zoneDelegate=new u(this,this._parent&&this._parent._zoneDelegate,e)}return n.assertZonePatched=function(){if(t.Promise!==O.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")},Object.defineProperty(n,"root",{get:function(){for(var t=n.current;t.parent;)t=t.parent;return t},enumerable:!0,configurable:!0}),Object.defineProperty(n,"current",{get:function(){return M.zone},enumerable:!0,configurable:!0}),Object.defineProperty(n,"currentTask",{get:function(){return P},enumerable:!0,configurable:!0}),n.__load_patch=function(e,i){if(O.hasOwnProperty(e))throw Error("Already loaded patch: "+e);if(!t["__Zone_disable_"+e]){var a="Zone:"+e;r(a),O[e]=i(t,n,D),o(a,a)}},Object.defineProperty(n.prototype,"parent",{get:function(){return this._parent},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),n.prototype.get=function(t){var e=this.getZoneWith(t);if(e)return e._properties[t]},n.prototype.getZoneWith=function(t){for(var e=this;e;){if(e._properties.hasOwnProperty(t))return e;e=e._parent}return null},n.prototype.fork=function(t){if(!t)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,t)},n.prototype.wrap=function(t,n){if(typeof t!==e)throw new Error("Expecting function got: "+t);var r=this._zoneDelegate.intercept(this,t,n),o=this;return function(){return o.runGuarded(r,this,arguments,n)}},n.prototype.run=function(t,e,n,r){void 0===e&&(e=void 0),void 0===n&&(n=null),void 0===r&&(r=null),M={parent:M,zone:this};try{return this._zoneDelegate.invoke(this,t,e,n,r)}finally{M=M.parent}},n.prototype.runGuarded=function(t,e,n,r){void 0===e&&(e=null),void 0===n&&(n=null),void 0===r&&(r=null),M={parent:M,zone:this};try{try{return this._zoneDelegate.invoke(this,t,e,n,r)}catch(t){if(this._zoneDelegate.handleError(this,t))throw t}}finally{M=M.parent}},n.prototype.runTask=function(t,e,n){if(t.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(t.zone||y).name+"; Execution: "+this.name+")");if(t.state!==_||t.type!==x){var r=t.state!=b;r&&t._transitionTo(b,m),t.runCount++;var o=P;P=t,M={parent:M,zone:this};try{t.type==S&&t.data&&!t.data.isPeriodic&&(t.cancelFn=null);try{return this._zoneDelegate.invokeTask(this,t,e,n)}catch(t){if(this._zoneDelegate.handleError(this,t))throw t}}finally{t.state!==_&&t.state!==T&&(t.type==x||t.data&&t.data.isPeriodic?r&&t._transitionTo(m,b):(t.runCount=0,this._updateTaskCount(t,-1),r&&t._transitionTo(_,b,_))),M=M.parent,P=o}}},n.prototype.scheduleTask=function(t){if(t.zone&&t.zone!==this)for(var e=this;e;){if(e===t.zone)throw Error("can not reschedule task to "+this.name+" which is descendants of the original zone "+t.zone.name);e=e.parent}t._transitionTo(k,_);var n=[];t._zoneDelegates=n,t._zone=this;try{t=this._zoneDelegate.scheduleTask(this,t)}catch(e){throw t._transitionTo(T,k,_),this._zoneDelegate.handleError(this,e),e}return t._zoneDelegates===n&&this._updateTaskCount(t,1),t.state==k&&t._transitionTo(m,k),t},n.prototype.scheduleMicroTask=function(t,e,n,r){return this.scheduleTask(new s(E,t,e,n,r,null))},n.prototype.scheduleMacroTask=function(t,e,n,r,o){return this.scheduleTask(new s(S,t,e,n,r,o))},n.prototype.scheduleEventTask=function(t,e,n,r,o){return this.scheduleTask(new s(x,t,e,n,r,o))},n.prototype.cancelTask=function(t){if(t.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(t.zone||y).name+"; Execution: "+this.name+")");t._transitionTo(w,m,b);try{this._zoneDelegate.cancelTask(this,t)}catch(e){throw t._transitionTo(T,w),this._zoneDelegate.handleError(this,e),e}return this._updateTaskCount(t,-1),t._transitionTo(_,w),t.runCount=0,t},n.prototype._updateTaskCount=function(t,e){var n=t._zoneDelegates;-1==e&&(t._zoneDelegates=null);for(var r=0;r<n.length;r++)n[r]._updateTaskCount(t.type,e)},n}();i.__symbol__=R;var a,c={name:"",onHasTask:function(t,e,n,r){return t.hasTask(n,r)},onScheduleTask:function(t,e,n,r){return t.scheduleTask(n,r)},onInvokeTask:function(t,e,n,r,o,i){return t.invokeTask(n,r,o,i)},onCancelTask:function(t,e,n,r){return t.cancelTask(n,r)}},u=function(){function t(t,e,n){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=t,this._parentDelegate=e,this._forkZS=n&&(n&&n.onFork?n:e._forkZS),this._forkDlgt=n&&(n.onFork?e:e._forkDlgt),this._forkCurrZone=n&&(n.onFork?this.zone:e.zone),this._interceptZS=n&&(n.onIntercept?n:e._interceptZS),this._interceptDlgt=n&&(n.onIntercept?e:e._interceptDlgt),this._interceptCurrZone=n&&(n.onIntercept?this.zone:e.zone),this._invokeZS=n&&(n.onInvoke?n:e._invokeZS),this._invokeDlgt=n&&(n.onInvoke?e:e._invokeDlgt),this._invokeCurrZone=n&&(n.onInvoke?this.zone:e.zone),this._handleErrorZS=n&&(n.onHandleError?n:e._handleErrorZS),this._handleErrorDlgt=n&&(n.onHandleError?e:e._handleErrorDlgt),this._handleErrorCurrZone=n&&(n.onHandleError?this.zone:e.zone),this._scheduleTaskZS=n&&(n.onScheduleTask?n:e._scheduleTaskZS),this._scheduleTaskDlgt=n&&(n.onScheduleTask?e:e._scheduleTaskDlgt),this._scheduleTaskCurrZone=n&&(n.onScheduleTask?this.zone:e.zone),this._invokeTaskZS=n&&(n.onInvokeTask?n:e._invokeTaskZS),this._invokeTaskDlgt=n&&(n.onInvokeTask?e:e._invokeTaskDlgt),this._invokeTaskCurrZone=n&&(n.onInvokeTask?this.zone:e.zone),this._cancelTaskZS=n&&(n.onCancelTask?n:e._cancelTaskZS),this._cancelTaskDlgt=n&&(n.onCancelTask?e:e._cancelTaskDlgt),this._cancelTaskCurrZone=n&&(n.onCancelTask?this.zone:e.zone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;var r=n&&n.onHasTask;(r||e&&e._hasTaskZS)&&(this._hasTaskZS=r?n:c,this._hasTaskDlgt=e,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=t,n.onScheduleTask||(this._scheduleTaskZS=c,this._scheduleTaskDlgt=e,this._scheduleTaskCurrZone=this.zone),n.onInvokeTask||(this._invokeTaskZS=c,this._invokeTaskDlgt=e,this._invokeTaskCurrZone=this.zone),n.onCancelTask||(this._cancelTaskZS=c,this._cancelTaskDlgt=e,this._cancelTaskCurrZone=this.zone))}return t.prototype.fork=function(t,e){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,t,e):new i(t,e)},t.prototype.intercept=function(t,e,n){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,t,e,n):e},t.prototype.invoke=function(t,e,n,r,o){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,t,e,n,r,o):e.apply(n,r)},t.prototype.handleError=function(t,e){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,t,e)},t.prototype.scheduleTask=function(t,e){var n=e;if(this._scheduleTaskZS)this._hasTaskZS&&n._zoneDelegates.push(this._hasTaskDlgtOwner),(n=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,t,e))||(n=e);else if(e.scheduleFn)e.scheduleFn(e);else{if(e.type!=E)throw new Error("Task is missing scheduleFn.");d(e)}return n},t.prototype.invokeTask=function(t,e,n,r){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,t,e,n,r):e.callback.apply(n,r)},t.prototype.cancelTask=function(t,e){var n;if(this._cancelTaskZS)n=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,t,e);else{if(!e.cancelFn)throw Error("Task is not cancelable");n=e.cancelFn(e)}return n},t.prototype.hasTask=function(t,e){try{return this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,t,e)}catch(e){this.handleError(t,e)}},t.prototype._updateTaskCount=function(t,e){var n=this._taskCounts,r=n[t],o=n[t]=r+e;if(o<0)throw new Error("More tasks executed then were scheduled.");0!=r&&0!=o||this.hasTask(this.zone,{microTask:n.microTask>0,macroTask:n.macroTask>0,eventTask:n.eventTask>0,change:t})},t}(),s=function(){function e(n,r,o,i,a,c){this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=n,this.source=r,this.data=i,this.scheduleFn=a,this.cancelFn=c,this.callback=o;var u=this;this.invoke=n===x&&i&&i.useG?e.invokeTask:function(){return e.invokeTask.call(t,u,this,arguments)}}return e.invokeTask=function(t,e,n){t||(t=this),j++;try{return t.runCount++,t.zone.runTask(t,e,n)}finally{1==j&&g(),j--}},Object.defineProperty(e.prototype,"zone",{get:function(){return this._zone},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),e.prototype.cancelScheduleRequest=function(){this._transitionTo(_,k)},e.prototype._transitionTo=function(t,e,n){if(this._state!==e&&this._state!==n)throw new Error(this.type+" '"+this.source+"': can not transition to '"+t+"', expecting state '"+e+"'"+(n?" or '"+n+"'":"")+", was '"+this._state+"'.");this._state=t,t==_&&(this._zoneDelegates=null)},e.prototype.toString=function(){return this.data&&"undefined"!=typeof this.data.handleId?this.data.handleId:Object.prototype.toString.call(this)},e.prototype.toJSON=function(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}},e}(),f=R("setTimeout"),l=R("Promise"),p=R("then"),h=[],v=!1;function d(e){0===j&&0===h.length&&(a||t[l]&&(a=t[l].resolve(0)),a?a[p](g):t[f](g,0)),e&&h.push(e)}function g(){if(!v){for(v=!0;h.length;){var t=h;h=[];for(var e=0;e<t.length;e++){var n=t[e];try{n.zone.runTask(n,null,null)}catch(t){D.onUnhandledError(t)}}}D.microtaskDrainDone(),v=!1}}var y={name:"NO ZONE"},_="notScheduled",k="scheduling",m="scheduled",b="running",w="canceling",T="unknown",E="microTask",S="macroTask",x="eventTask",O={},D={symbol:R,currentZoneFrame:function(){return M},onUnhandledError:Z,microtaskDrainDone:Z,scheduleMicroTask:d,showUncaughtError:function(){return!i[R("ignoreConsoleErrorUncaughtError")]},patchEventTarget:function(){return[]},patchOnProperties:Z,patchMethod:function(){return Z},bindArguments:function(){return null},setNativePromise:function(t){t&&typeof t.resolve===e&&(a=t.resolve(0))}},M={parent:null,zone:new i(null,null)},P=null,j=0;function Z(){}function R(t){return"__zone_symbol__"+t}o("Zone","Zone"),t.Zone=i}("undefined"!=typeof window&&window||"undefined"!=typeof self&&self||t),Zone.__load_patch("ZoneAwarePromise",function(t,e,n){var r=Object.getOwnPropertyDescriptor,o=Object.defineProperty,i=n.symbol,a=[],c=i("Promise"),u=i("then"),s="__creationTrace__";n.onUnhandledError=function(t){if(n.showUncaughtError()){var e=t&&t.rejection;e?console.error("Unhandled Promise rejection:",e instanceof Error?e.message:e,"; Zone:",t.zone.name,"; Task:",t.task&&t.task.source,"; Value:",e,e instanceof Error?e.stack:void 0):console.error(t)}},n.microtaskDrainDone=function(){for(;a.length;)for(var t=function(){var t=a.shift();try{t.zone.runGuarded(function(){throw t})}catch(t){l(t)}};a.length;)t()};var f=i("unhandledPromiseRejectionHandler");function l(t){n.onUnhandledError(t);try{var r=e[f];r&&"function"==typeof r&&r.call(this,t)}catch(t){}}function p(t){return t&&t.then}function h(t){return t}function v(t){return P.reject(t)}var d=i("state"),g=i("value"),y="Promise.then",_=null,k=!0,m=!1,b=0;function w(t,e){return function(n){try{x(t,e,n)}catch(e){x(t,!1,e)}}}var T=function(){var t=!1;return function(e){return function(){t||(t=!0,e.apply(null,arguments))}}},E="Promise resolved with itself",S=i("currentTaskTrace");function x(t,r,i){var c,u=T();if(t===i)throw new TypeError(E);if(t[d]===_){var f=null;try{"object"!=typeof i&&"function"!=typeof i||(f=i&&i.then)}catch(e){return u(function(){x(t,!1,e)})(),t}if(r!==m&&i instanceof P&&i.hasOwnProperty(d)&&i.hasOwnProperty(g)&&i[d]!==_)D(i),x(t,i[d],i[g]);else if(r!==m&&"function"==typeof f)try{f.call(i,u(w(t,r)),u(w(t,!1)))}catch(e){u(function(){x(t,!1,e)})()}else{t[d]=r;var l=t[g];if(t[g]=i,r===m&&i instanceof Error){var p=e.currentTask&&e.currentTask.data&&e.currentTask.data[s];p&&o(i,S,{configurable:!0,enumerable:!1,writable:!0,value:p})}for(var h=0;h<l.length;)M(t,l[h++],l[h++],l[h++],l[h++]);if(0==l.length&&r==m){t[d]=b;try{throw new Error("Uncaught (in promise): "+((c=i)&&c.toString===Object.prototype.toString?(c.constructor&&c.constructor.name||"")+": "+JSON.stringify(c):c?c.toString():Object.prototype.toString.call(c))+(i&&i.stack?"\n"+i.stack:""))}catch(r){var v=r;v.rejection=i,v.promise=t,v.zone=e.current,v.task=e.currentTask,a.push(v),n.scheduleMicroTask()}}}}return t}var O=i("rejectionHandledHandler");function D(t){if(t[d]===b){try{var n=e[O];n&&"function"==typeof n&&n.call(this,{rejection:t[g],promise:t})}catch(t){}t[d]=m;for(var r=0;r<a.length;r++)t===a[r].promise&&a.splice(r,1)}}function M(t,e,n,r,o){D(t);var i=t[d]?"function"==typeof r?r:h:"function"==typeof o?o:v;e.scheduleMicroTask(y,function(){try{x(n,!0,e.run(i,void 0,[t[g]]))}catch(t){x(n,!1,t)}})}var P=function(){function t(e){var n=this;if(!(n instanceof t))throw new Error("Must be an instanceof Promise.");n[d]=_,n[g]=[];try{e&&e(w(n,k),w(n,m))}catch(t){x(n,!1,t)}}return t.toString=function(){return"function ZoneAwarePromise() { [native code] }"},t.resolve=function(t){return x(new this(null),k,t)},t.reject=function(t){return x(new this(null),m,t)},t.race=function(t){var e,n,r=new this(function(t,r){e=t,n=r});function o(t){r&&(r=e(t))}function i(t){r&&(r=n(t))}for(var a=0,c=t;a<c.length;a++){var u=c[a];p(u)||(u=this.resolve(u)),u.then(o,i)}return r},t.all=function(t){for(var e,n,r=new this(function(t,r){e=t,n=r}),o=0,i=[],a=0,c=t;a<c.length;a++){var u=c[a];p(u)||(u=this.resolve(u)),u.then(function(t){return function(n){i[t]=n,--o||e(i)}}(o),n),o++}return o||e(i),r},t.prototype.then=function(t,n){var r=new this.constructor(null),o=e.current;return this[d]==_?this[g].push(o,r,t,n):M(this,o,r,t,n),r},t.prototype.catch=function(t){return this.then(null,t)},t}();P.resolve=P.resolve,P.reject=P.reject,P.race=P.race,P.all=P.all;var j=t[c]=t.Promise,Z=e.__symbol__("ZoneAwarePromise"),R=r(t,"Promise");R&&!R.configurable||(R&&delete R.writable,R&&delete R.value,R||(R={configurable:!0,enumerable:!0}),R.get=function(){return t[Z]?t[Z]:t[c]},R.set=function(e){e===P?t[Z]=e:(t[c]=e,e.prototype[u]||I(e),n.setNativePromise(e))},o(t,"Promise",R)),t.Promise=P;var C,z=i("thenPatched");function I(t){var e=t.prototype,n=e.then;e[u]=n;var i=r(t.prototype,"then");i&&!1===i.writable&&i.configurable&&o(t.prototype,"then",{writable:!0}),t.prototype.then=function(t,e){var r=this;return new P(function(t,e){n.call(r,t,e)}).then(t,e)},t[z]=!0}if(j){I(j);var L=t.fetch;"function"==typeof L&&(t.fetch=(C=L,function(){var t=C.apply(this,arguments);if(t instanceof P)return t;var e=t.constructor;return e[z]||I(e),t}))}return Promise[e.__symbol__("uncaughtPromiseErrors")]=a,P});var e=Object.getOwnPropertyDescriptor,n=Object.defineProperty,r=Object.getPrototypeOf,o=Object.create,i=Array.prototype.slice,a="addEventListener",c="removeEventListener",u=Zone.__symbol__(a),s=Zone.__symbol__(c),f="true",l="false",p="__zone_symbol__";function h(t,e){return Zone.current.wrap(t,e)}function v(t,e,n,r,o){return Zone.current.scheduleMacroTask(t,e,n,r,o)}var d=Zone.__symbol__,g="undefined"!=typeof window,y=g?window:void 0,_=g&&y||"object"==typeof self&&self||t,k="removeAttribute",m=[null];function b(t,e){for(var n=t.length-1;n>=0;n--)"function"==typeof t[n]&&(t[n]=h(t[n],e+"_"+n));return t}function w(t){return!t||!1!==t.writable&&!("function"==typeof t.get&&"undefined"==typeof t.set)}var T="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,E=!("nw"in _)&&"undefined"!=typeof _.process&&"[object process]"==={}.toString.call(_.process),S=!E&&!T&&!(!g||!y.HTMLElement),x="undefined"!=typeof _.process&&"[object process]"==={}.toString.call(_.process)&&!T&&!(!g||!y.HTMLElement),O={},D=function(t){if(t=t||_.event){var e=O[t.type];e||(e=O[t.type]=d("ON_PROPERTY"+t.type));var n=(this||t.target||_)[e],r=n&&n.apply(this,arguments);return void 0==r||r||t.preventDefault(),r}};function M(t,r,o){var i=e(t,r);if(!i&&o&&e(o,r)&&(i={enumerable:!0,configurable:!0}),i&&i.configurable){delete i.writable,delete i.value;var a=i.get,c=i.set,u=r.substr(2),s=O[u];s||(s=O[u]=d("ON_PROPERTY"+u)),i.set=function(e){var n=this;n||t!==_||(n=_),n&&(n[s]&&n.removeEventListener(u,D),c&&c.apply(n,m),"function"==typeof e?(n[s]=e,n.addEventListener(u,D,!1)):n[s]=null)},i.get=function(){var e=this;if(e||t!==_||(e=_),!e)return null;var n=e[s];if(n)return n;if(a){var o=a&&a.call(this);if(o)return i.set.call(this,o),"function"==typeof e[k]&&e.removeAttribute(r),o}return null},n(t,r,i)}}function P(t,e,n){if(e)for(var r=0;r<e.length;r++)M(t,"on"+e[r],n);else{var o=[];for(var i in t)"on"==i.substr(0,2)&&o.push(i);for(var a=0;a<o.length;a++)M(t,o[a],n)}}var j=d("originalInstance");function Z(t){var e=_[t];if(e){_[d(t)]=e,_[t]=function(){var n=b(arguments,t);switch(n.length){case 0:this[j]=new e;break;case 1:this[j]=new e(n[0]);break;case 2:this[j]=new e(n[0],n[1]);break;case 3:this[j]=new e(n[0],n[1],n[2]);break;case 4:this[j]=new e(n[0],n[1],n[2],n[3]);break;default:throw new Error("Arg list too long.")}},C(_[t],e);var r,o=new e(function(){});for(r in o)"XMLHttpRequest"===t&&"responseBlob"===r||function(e){"function"==typeof o[e]?_[t].prototype[e]=function(){return this[j][e].apply(this[j],arguments)}:n(_[t].prototype,e,{set:function(n){"function"==typeof n?(this[j][e]=h(n,t+"."+e),C(this[j][e],n)):this[j][e]=n},get:function(){return this[j][e]}})}(r);for(r in e)"prototype"!==r&&e.hasOwnProperty(r)&&(_[t][r]=e[r])}}function R(t,n,o){for(var i=t;i&&!i.hasOwnProperty(n);)i=r(i);!i&&t[n]&&(i=t);var a,c=d(n);if(i&&!(a=i[c])&&(a=i[c]=i[n],w(i&&e(i,n)))){var u=o(a,c,n);i[n]=function(){return u(this,arguments)},C(i[n],a)}return a}function C(t,e){t[d("OriginalDelegate")]=e}var z=!1,I=!1;Zone.__load_patch("toString",function(t,e){var n=e.__zone_symbol__originalToString=Function.prototype.toString,r=d("OriginalDelegate"),o=d("Promise"),i=d("Error");Function.prototype.toString=function(){if("function"==typeof this){var e=this[r];if(e)return"function"==typeof e?n.apply(this[r],arguments):Object.prototype.toString.call(e);if(this===Promise){var a=t[o];if(a)return n.apply(a,arguments)}if(this===Error){var c=t[i];if(c)return n.apply(c,arguments)}}return n.apply(this,arguments)};var a=Object.prototype.toString;Object.prototype.toString=function(){return this instanceof Promise?"[object Promise]":a.apply(this,arguments)}});var L={useG:!0},F={},B={},H=/^__zone_symbol__(\w+)(true|false)$/,X="__zone_symbol__propagationStopped";function N(t,e,n){var o=n&&n.add||a,i=n&&n.rm||c,u=n&&n.listeners||"eventListeners",s=n&&n.rmAll||"removeAllListeners",h=d(o),v="."+o+":",g="prependListener",y="."+g+":",_=function(t,e,n){if(!t.isRemoved){var r=t.callback;"object"==typeof r&&r.handleEvent&&(t.callback=function(t){return r.handleEvent(t)},t.originalDelegate=r),t.invoke(t,e,[n]);var o=t.options;o&&"object"==typeof o&&o.once&&e[i].call(e,n.type,t.originalDelegate?t.originalDelegate:t.callback,o)}},k=function(e){if(e=e||t.event){var n=this||e.target||t,r=n[F[e.type][l]];if(r)if(1===r.length)_(r[0],n,e);else for(var o=r.slice(),i=0;i<o.length&&(!e||!0!==e[X]);i++)_(o[i],n,e)}},m=function(e){if(e=e||t.event){var n=this||e.target||t,r=n[F[e.type][f]];if(r)if(1===r.length)_(r[0],n,e);else for(var o=r.slice(),i=0;i<o.length&&(!e||!0!==e[X]);i++)_(o[i],n,e)}};function b(e,n){if(!e)return!1;var a=!0;n&&void 0!==n.useG&&(a=n.useG);var c=n&&n.vh,_=!0;n&&void 0!==n.chkDup&&(_=n.chkDup);var b=!1;n&&void 0!==n.rt&&(b=n.rt);for(var w=e;w&&!w.hasOwnProperty(o);)w=r(w);if(!w&&e[o]&&(w=e),!w)return!1;if(w[h])return!1;var T,E={},S=w[h]=w[o],x=w[d(i)]=w[i],O=w[d(u)]=w[u],D=w[d(s)]=w[s];n&&n.prepend&&(T=w[d(n.prepend)]=w[n.prepend]);var M=a?function(){if(!E.isExisting)return S.call(E.target,E.eventName,E.capture?m:k,E.options)}:function(t){return S.call(E.target,E.eventName,t.invoke,E.options)},P=a?function(t){if(!t.isRemoved){var e=F[t.eventName],n=void 0;e&&(n=e[t.capture?f:l]);var r=n&&t.target[n];if(r)for(var o=0;o<r.length;o++)if(r[o]===t){r.splice(o,1),t.isRemoved=!0,0===r.length&&(t.allRemoved=!0,t.target[n]=null);break}}if(t.allRemoved)return x.call(t.target,t.eventName,t.capture?m:k,t.options)}:function(t){return x.call(t.target,t.eventName,t.invoke,t.options)},j=n&&n.diff?n.diff:function(t,e){var n=typeof e;return"function"===n&&t.callback===e||"object"===n&&t.originalDelegate===e},Z=Zone[Zone.__symbol__("BLACK_LISTED_EVENTS")],R=function(e,n,r,o,i,u){return void 0===i&&(i=!1),void 0===u&&(u=!1),function(){var s=this||t,h=arguments[1];if(!h)return e.apply(this,arguments);var v=!1;if("function"!=typeof h){if(!h.handleEvent)return e.apply(this,arguments);v=!0}if(!c||c(e,h,s,arguments)){var d,g=arguments[0],y=arguments[2];if(Z)for(var k=0;k<Z.length;k++)if(g===Z[k])return e.apply(this,arguments);var m=!1;void 0===y?d=!1:!0===y?d=!0:!1===y?d=!1:(d=!!y&&!!y.capture,m=!!y&&!!y.once);var b,w=Zone.current,T=F[g];if(T)b=T[d?f:l];else{var S=p+(g+l),x=p+(g+f);F[g]={},F[g][l]=S,F[g][f]=x,b=d?x:S}var O,D=s[b],M=!1;if(D){if(M=!0,_)for(k=0;k<D.length;k++)if(j(D[k],h))return}else D=s[b]=[];var P=s.constructor.name,R=B[P];R&&(O=R[g]),O||(O=P+n+g),E.options=y,m&&(E.options.once=!1),E.target=s,E.capture=d,E.eventName=g,E.isExisting=M;var C=a?L:null;C&&(C.taskData=E);var z=w.scheduleEventTask(O,h,C,r,o);return E.target=null,C&&(C.taskData=null),m&&(y.once=!0),z.options=y,z.target=s,z.capture=d,z.eventName=g,v&&(z.originalDelegate=h),u?D.unshift(z):D.push(z),i?s:void 0}}};return w[o]=R(S,v,M,P,b),T&&(w[g]=R(T,y,function(t){return T.call(E.target,E.eventName,t.invoke,E.options)},P,b,!0)),w[i]=function(){var e,n=this||t,r=arguments[0],o=arguments[2];e=void 0!==o&&(!0===o||!1!==o&&!!o&&!!o.capture);var i=arguments[1];if(!i)return x.apply(this,arguments);if(!c||c(x,i,n,arguments)){var a,u=F[r];u&&(a=u[e?f:l]);var s=a&&n[a];if(s)for(var p=0;p<s.length;p++){var h=s[p];if(j(h,i))return s.splice(p,1),h.isRemoved=!0,0===s.length&&(h.allRemoved=!0,n[a]=null),void h.zone.cancelTask(h)}return x.apply(this,arguments)}},w[u]=function(){for(var e=[],n=A(this||t,arguments[0]),r=0;r<n.length;r++){var o=n[r];e.push(o.originalDelegate?o.originalDelegate:o.callback)}return e},w[s]=function(){var e=this||t,n=arguments[0];if(n){var r=F[n];if(r){var o=e[r[l]],a=e[r[f]];if(o){var c=o.slice();for(h=0;h<c.length;h++)this[i].call(this,n,(u=c[h]).originalDelegate?u.originalDelegate:u.callback,u.options)}if(a)for(c=a.slice(),h=0;h<c.length;h++){var u;this[i].call(this,n,(u=c[h]).originalDelegate?u.originalDelegate:u.callback,u.options)}}}else{for(var p=Object.keys(e),h=0;h<p.length;h++){var v=H.exec(p[h]),d=v&&v[1];d&&"removeListener"!==d&&this[s].call(this,d)}this[s].call(this,"removeListener")}},C(w[o],S),C(w[i],x),D&&C(w[s],D),O&&C(w[u],O),!0}for(var w=[],T=0;T<e.length;T++)w[T]=b(e[T],n);return w}function A(t,e){var n=[];for(var r in t){var o=H.exec(r),i=o&&o[1];if(i&&(!e||i===e)){var a=t[r];if(a)for(var c=0;c<a.length;c++)n.push(a[c])}}return n}var W=d("zoneTask");function q(t,e,n,r){var o=null,i=null;n+=r;var a={};function c(e){var n=e.data;return n.args[0]=function(){try{e.invoke.apply(this,arguments)}finally{e.data&&e.data.isPeriodic||("number"==typeof n.handleId?delete a[n.handleId]:n.handleId&&(n.handleId[W]=null))}},n.handleId=o.apply(t,n.args),e}function u(t){return i(t.data.handleId)}o=R(t,e+=r,function(n){return function(o,i){if("function"==typeof i[0]){var s=v(e,i[0],{handleId:null,isPeriodic:"Interval"===r,delay:"Timeout"===r||"Interval"===r?i[1]||0:null,args:i},c,u);if(!s)return s;var f=s.data.handleId;return"number"==typeof f?a[f]=s:f&&(f[W]=s),f&&f.ref&&f.unref&&"function"==typeof f.ref&&"function"==typeof f.unref&&(s.ref=f.ref.bind(f),s.unref=f.unref.bind(f)),"number"==typeof f||f?f:s}return n.apply(t,i)}}),i=R(t,n,function(e){return function(n,r){var o,i=r[0];"number"==typeof i?o=a[i]:(o=i&&i[W])||(o=i),o&&"string"==typeof o.type?"notScheduled"!==o.state&&(o.cancelFn&&o.data.isPeriodic||0===o.runCount)&&("number"==typeof i?delete a[i]:i&&(i[W]=null),o.zone.cancelTask(o)):e.apply(t,r)}})}var Q=Object[d("defineProperty")]=Object.defineProperty,J=Object[d("getOwnPropertyDescriptor")]=Object.getOwnPropertyDescriptor,G=Object.create,V=d("unconfigurables");function K(t,e){return t&&t[V]&&t[V][e]}function U(t,e,n){return Object.isFrozen(n)||(n.configurable=!0),n.configurable||(t[V]||Object.isFrozen(t)||Q(t,V,{writable:!0,value:{}}),t[V]&&(t[V][e]=!0)),n}function Y(t,e,n,r){try{return Q(t,e,n)}catch(i){if(!n.configurable)throw i;"undefined"==typeof r?delete n.configurable:n.configurable=r;try{return Q(t,e,n)}catch(r){var o=null;try{o=JSON.stringify(n)}catch(t){o=n.toString()}console.log("Attempting to configure '"+e+"' with descriptor '"+o+"' on object '"+t+"' and got error, giving up: "+r)}}}var $=["absolutedeviceorientation","afterinput","afterprint","appinstalled","beforeinstallprompt","beforeprint","beforeunload","devicelight","devicemotion","deviceorientation","deviceorientationabsolute","deviceproximity","hashchange","languagechange","message","mozbeforepaint","offline","online","paint","pageshow","pagehide","popstate","rejectionhandled","storage","unhandledrejection","unload","userproximity","vrdisplyconnected","vrdisplaydisconnected","vrdisplaypresentchange"],tt=["encrypted","waitingforkey","msneedkey","mozinterruptbegin","mozinterruptend"],et=["load"],nt=["blur","error","focus","load","resize","scroll","messageerror"],rt=["bounce","finish","start"],ot=["loadstart","progress","abort","error","load","progress","timeout","loadend","readystatechange"],it=["upgradeneeded","complete","abort","success","error","blocked","versionchange","close"],at=["close","error","open","message"],ct=["error","message"],ut=["abort","animationcancel","animationend","animationiteration","auxclick","beforeinput","blur","cancel","canplay","canplaythrough","change","compositionstart","compositionupdate","compositionend","cuechange","click","close","contextmenu","curechange","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","drop","durationchange","emptied","ended","error","focus","focusin","focusout","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadstart","loadeddata","loadedmetadata","lostpointercapture","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","orientationchange","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointerlockchange","mozpointerlockchange","webkitpointerlockerchange","pointerlockerror","mozpointerlockerror","webkitpointerlockerror","pointermove","pointout","pointerover","pointerup","progress","ratechange","reset","resize","scroll","seeked","seeking","select","selectionchange","selectstart","show","sort","stalled","submit","suspend","timeupdate","volumechange","touchcancel","touchmove","touchstart","touchend","transitioncancel","transitionend","waiting","wheel"].concat(["webglcontextrestored","webglcontextlost","webglcontextcreationerror"],["autocomplete","autocompleteerror"],["toggle"],["afterscriptexecute","beforescriptexecute","DOMContentLoaded","fullscreenchange","mozfullscreenchange","webkitfullscreenchange","msfullscreenchange","fullscreenerror","mozfullscreenerror","webkitfullscreenerror","msfullscreenerror","readystatechange","visibilitychange"],$,["beforecopy","beforecut","beforepaste","copy","cut","paste","dragstart","loadend","animationstart","search","transitionrun","transitionstart","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkittransitionend"],["activate","afterupdate","ariarequest","beforeactivate","beforedeactivate","beforeeditfocus","beforeupdate","cellchange","controlselect","dataavailable","datasetchanged","datasetcomplete","errorupdate","filterchange","layoutcomplete","losecapture","move","moveend","movestart","propertychange","resizeend","resizestart","rowenter","rowexit","rowsdelete","rowsinserted","command","compassneedscalibration","deactivate","help","mscontentzoom","msmanipulationstatechanged","msgesturechange","msgesturedoubletap","msgestureend","msgesturehold","msgesturestart","msgesturetap","msgotpointercapture","msinertiastart","mslostpointercapture","mspointercancel","mspointerdown","mspointerenter","mspointerhover","mspointerleave","mspointermove","mspointerout","mspointerover","mspointerup","pointerout","mssitemodejumplistitemremoved","msthumbnailclick","stop","storagecommit"]);function st(t,e,n,r){P(t,function(t,e,n){if(!n)return e;var r=n.filter(function(e){return e.target===t});if(!r||0===r.length)return e;var o=r[0].ignoreProperties;return e.filter(function(t){return-1===o.indexOf(t)})}(t,e,n),r)}var ft=d("unbound");Zone.__load_patch("util",function(t,e,n){n.patchOnProperties=P,n.patchMethod=R,n.bindArguments=b}),Zone.__load_patch("timers",function(t){var e="clear";q(t,"set",e,"Timeout"),q(t,"set",e,"Interval"),q(t,"set",e,"Immediate")}),Zone.__load_patch("requestAnimationFrame",function(t){q(t,"request","cancel","AnimationFrame"),q(t,"mozRequest","mozCancel","AnimationFrame"),q(t,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",function(t,e){for(var n=["alert","prompt","confirm"],r=0;r<n.length;r++)R(t,n[r],function(n,r,o){return function(r,i){return e.current.run(n,t,i,o)}})}),Zone.__load_patch("EventTarget",function(t,e,n){var r,o=e.__symbol__("BLACK_LISTED_EVENTS");t[o]&&(e[o]=t[o]),(r=t.Event)&&r.prototype&&n.patchMethod(r.prototype,"stopImmediatePropagation",function(t){return function(e,n){e[X]=!0,t&&t.apply(e,n)}}),function(t,e){var n="Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video",r="ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket".split(","),o="EventTarget",i=[],a=t.wtf,c=n.split(",");a?i=c.map(function(t){return"HTML"+t+"Element"}).concat(r):t[o]?i.push(o):i=r;for(var u=t.__Zone_disable_IE_check||!1,s=t.__Zone_enable_cross_context_check||!1,h=function(){if(z)return I;z=!0;try{var t=y.navigator.userAgent;return-1===t.indexOf("MSIE ")&&-1===t.indexOf("Trident/")&&-1===t.indexOf("Edge/")||(I=!0),I}catch(t){}}(),v="[object FunctionWrapper]",d="function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }",g=0;g<ut.length;g++){var _=p+((T=ut[g])+l),k=p+(T+f);F[T]={},F[T][l]=_,F[T][f]=k}for(g=0;g<n.length;g++)for(var m=c[g],b=B[m]={},w=0;w<ut.length;w++){var T;b[T=ut[w]]=m+".addEventListener:"+T}var E=[];for(g=0;g<i.length;g++){var S=t[i[g]];E.push(S&&S.prototype)}N(t,E,{vh:function(t,e,n,r){if(!u&&h){if(s)try{var o;if((o=e.toString())===v||o==d)return t.apply(n,r),!1}catch(e){return t.apply(n,r),!1}else if((o=e.toString())===v||o==d)return t.apply(n,r),!1}else if(s)try{e.toString()}catch(e){return t.apply(n,r),!1}return!0}}),e.patchEventTarget=N}(t,n);var i=t.XMLHttpRequestEventTarget;i&&i.prototype&&n.patchEventTarget(t,[i.prototype]),Z("MutationObserver"),Z("WebKitMutationObserver"),Z("IntersectionObserver"),Z("FileReader")}),Zone.__load_patch("on_property",function(t,u,s){(function(t,u){if(!E||x){var s="undefined"!=typeof WebSocket;if(function(){if((S||x)&&!e(HTMLElement.prototype,"onclick")&&"undefined"!=typeof Element){var t=e(Element.prototype,"onclick");if(t&&!t.configurable)return!1}var r="onreadystatechange",o=XMLHttpRequest.prototype,i=e(o,r);if(i){n(o,r,{enumerable:!0,configurable:!0,get:function(){return!0}});var a=!!(u=new XMLHttpRequest).onreadystatechange;return n(o,r,i||{}),a}var c=d("fake");n(o,r,{enumerable:!0,configurable:!0,get:function(){return this[c]},set:function(t){this[c]=t}});var u,s=function(){};return(u=new XMLHttpRequest).onreadystatechange=s,a=u[c]===s,u.onreadystatechange=null,a}()){var f=u.__Zone_ignore_on_properties;if(S){var l=window;st(l,ut.concat(["messageerror"]),f,r(l)),st(Document.prototype,ut,f),"undefined"!=typeof l.SVGElement&&st(l.SVGElement.prototype,ut,f),st(Element.prototype,ut,f),st(HTMLElement.prototype,ut,f),st(HTMLMediaElement.prototype,tt,f),st(HTMLFrameSetElement.prototype,$.concat(nt),f),st(HTMLBodyElement.prototype,$.concat(nt),f),st(HTMLFrameElement.prototype,et,f),st(HTMLIFrameElement.prototype,et,f);var p=l.HTMLMarqueeElement;p&&st(p.prototype,rt,f);var v=l.Worker;v&&st(v.prototype,ct,f)}st(XMLHttpRequest.prototype,ot,f);var g=u.XMLHttpRequestEventTarget;g&&st(g&&g.prototype,ot,f),"undefined"!=typeof IDBIndex&&(st(IDBIndex.prototype,it,f),st(IDBRequest.prototype,it,f),st(IDBOpenDBRequest.prototype,it,f),st(IDBDatabase.prototype,it,f),st(IDBTransaction.prototype,it,f),st(IDBCursor.prototype,it,f)),s&&st(WebSocket.prototype,at,f)}else!function(){for(var t=function(t){var e=ut[t],n="on"+e;self.addEventListener(e,function(t){var e,r,o=t.target;for(r=o?o.constructor.name+"."+n:"unknown."+n;o;)o[n]&&!o[n][ft]&&((e=h(o[n],r))[ft]=o[n],o[n]=e),o=o.parentElement},!0)},e=0;e<ut.length;e++)t(e)}(),Z("XMLHttpRequest"),s&&function(t,n){var r=n.WebSocket;n.EventTarget||N(n,[r.prototype]),n.WebSocket=function(t,n){var u,s,f=arguments.length>1?new r(t,n):new r(t),l=e(f,"onmessage");return l&&!1===l.configurable?(u=o(f),s=f,[a,c,"send","close"].forEach(function(t){u[t]=function(){var e=i.call(arguments);if(t===a||t===c){var n=e.length>0?e[0]:void 0;if(n){var r=Zone.__symbol__("ON_PROPERTY"+n);f[r]=u[r]}}return f[t].apply(f,e)}})):u=f,P(u,["close","error","message","open"],s),u};var u=n.WebSocket;for(var s in r)u[s]=r[s]}(0,u)}})(0,t),Object.defineProperty=function(t,e,n){if(K(t,e))throw new TypeError("Cannot assign to read only property '"+e+"' of "+t);var r=n.configurable;return"prototype"!==e&&(n=U(t,e,n)),Y(t,e,n,r)},Object.defineProperties=function(t,e){return Object.keys(e).forEach(function(n){Object.defineProperty(t,n,e[n])}),t},Object.create=function(t,e){return"object"!=typeof e||Object.isFrozen(e)||Object.keys(e).forEach(function(n){e[n]=U(t,n,e[n])}),G(t,e)},Object.getOwnPropertyDescriptor=function(t,e){var n=J(t,e);return K(t,e)&&(n.configurable=!1),n},function(n){if((S||x)&&"registerElement"in t.document){var r=document.registerElement,o=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"];document.registerElement=function(t,n){return n&&n.prototype&&o.forEach(function(t){var r,o,i,a,c="Document.registerElement::"+t,u=n.prototype;if(u.hasOwnProperty(t)){var s=e(u,t);s&&s.value?(s.value=h(s.value,c),a=(i=s).configurable,Y(r=n.prototype,o=t,i=U(r,o,i),a)):u[t]=h(u[t],c)}else u[t]&&(u[t]=h(u[t],c))}),r.call(document,t,n)},C(document.registerElement,r)}}()}),Zone.__load_patch("canvas",function(t){var e=t.HTMLCanvasElement;"undefined"!=typeof e&&e.prototype&&e.prototype.toBlob&&function(t,n,r){var o=null;function i(t){var e=t.data;return e.args[e.cbIdx]=function(){t.invoke.apply(this,arguments)},o.apply(e.target,e.args),t}o=R(e.prototype,"toBlob",function(t){return function(e,n){var r={name:"HTMLCanvasElement.toBlob",target:e,cbIdx:0,args:n};return r.cbIdx>=0&&"function"==typeof n[r.cbIdx]?v(r.name,n[r.cbIdx],r,i,null):t.apply(e,n)}})}()}),Zone.__load_patch("XHR",function(t,e){!function(e){var c=XMLHttpRequest.prototype,f=c[u],l=c[s];if(!f){var p=t.XMLHttpRequestEventTarget;if(p){var h=p.prototype;f=h[u],l=h[s]}}var d="readystatechange",g="scheduled";function y(t){XMLHttpRequest[i]=!1;var e=t.data,r=e.target,a=r[o];f||(f=r[u],l=r[s]),a&&l.call(r,d,a);var c=r[o]=function(){r.readyState===r.DONE&&!e.aborted&&XMLHttpRequest[i]&&t.state===g&&t.invoke()};return f.call(r,d,c),r[n]||(r[n]=t),b.apply(r,e.args),XMLHttpRequest[i]=!0,t}function _(){}function k(t){var e=t.data;return e.aborted=!0,w.apply(e.target,e.args)}var m=R(c,"open",function(){return function(t,e){return t[r]=0==e[2],t[a]=e[1],m.apply(t,e)}}),b=R(c,"send",function(){return function(t,e){return t[r]?b.apply(t,e):v("XMLHttpRequest.send",_,{target:t,url:t[a],isPeriodic:!1,delay:null,args:e,aborted:!1},y,k)}}),w=R(c,"abort",function(){return function(t){var e=t[n];if(e&&"string"==typeof e.type){if(null==e.cancelFn||e.data&&e.data.aborted)return;e.zone.cancelTask(e)}}})}();var n=d("xhrTask"),r=d("xhrSync"),o=d("xhrListener"),i=d("xhrScheduled"),a=d("xhrURL")}),Zone.__load_patch("geolocation",function(t){t.navigator&&t.navigator.geolocation&&function(t,n){for(var r=t.constructor.name,o=function(o){var i,a,c=n[o],u=t[c];if(u){if(!w(e(t,c)))return"continue";t[c]=(C(a=function(){return i.apply(this,b(arguments,r+"."+c))},i=u),a)}},i=0;i<n.length;i++)o(i)}(t.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",function(t,e){function n(e){return function(n){A(t,e).forEach(function(r){var o=t.PromiseRejectionEvent;if(o){var i=new o(e,{promise:n.promise,reason:n.rejection});r.invoke(i)}})}}t.PromiseRejectionEvent&&(e[d("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),e[d("rejectionHandledHandler")]=n("rejectionhandled"))})}()}).call(e,n("fRUx"))},ewdp:function(t,e,n){var r=n("tose"),o=n("+pQw"),i=n("2Fuj");t.exports=n("V+0c")?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),c=a.length,u=0;c>u;)r.f(t,n=a[u++],e[n]);return t}},fC8q:function(t,e,n){var r=n("dXJ/"),o=n("3r0D")("iterator"),i=n("lexG");t.exports=n("b4gG").getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},fHxy:function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=r.key,a=r.set;r.exp({defineMetadata:function(t,e,n,r){a(t,e,o(n),i(r))}})},fRUx:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},gBtn:function(t,e,n){var r=n("ZI9W"),o=n("CDXM"),i=n("Iclu")("metadata"),a=i.store||(i.store=new(n("QZhw"))),c=function(t,e,n){var o=a.get(t);if(!o){if(!n)return;a.set(t,o=new r)}var i=o.get(e);if(!i){if(!n)return;o.set(e,i=new r)}return i};t.exports={store:a,map:c,has:function(t,e,n){var r=c(e,n,!1);return void 0!==r&&r.has(t)},get:function(t,e,n){var r=c(e,n,!1);return void 0===r?void 0:r.get(t)},set:function(t,e,n,r){c(n,r,!0).set(t,e)},keys:function(t,e){var n=c(t,e,!1),r=[];return n&&n.forEach(function(t,e){r.push(e)}),r},key:function(t){return void 0===t||"symbol"==typeof t?t:String(t)},exp:function(t){o(o.S,"Reflect",t)}}},gNkH:function(t,e,n){t.exports=!n("V+0c")&&!n("umMR")(function(){return 7!=Object.defineProperty(n("BQSv")("div"),"a",{get:function(){return 7}}).a})},gZpL:function(t,e,n){var r=n("6De9"),o=n("CDXM"),i=n("+pQw");o(o.S,"Reflect",{getOwnPropertyDescriptor:function(t,e){return r.f(i(t),e)}})},gdNQ:function(t,e,n){var r=n("CDXM"),o=n("+pQw"),i=Object.preventExtensions;r(r.S,"Reflect",{preventExtensions:function(t){o(t);try{return i&&i(t),!0}catch(t){return!1}}})},gxdV:function(t,e,n){var r=n("tose"),o=n("piOq");t.exports=n("V+0c")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},lexG:function(t,e){t.exports={}},lfBE:function(t,e,n){var r=n("ptrv"),o=n("gxdV"),i=n("rMsi"),a=n("c09d")("src"),c="toString",u=Function[c],s=(""+u).split(c);n("b4gG").inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,c){var u="function"==typeof n;u&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(u&&(i(n,a)||o(n,a,t[e]?""+t[e]:s.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,c,function(){return"function"==typeof this&&this[a]||u.call(this)})},lzDK:function(t,e){e.f=Object.getOwnPropertySymbols},ncNB:function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=r.get,a=r.key;r.exp({getOwnMetadata:function(t,e){return i(t,o(e),arguments.length<3?void 0:a(arguments[2]))}})},"p/bR":function(t,e,n){var r=n("pa70"),o=n("ULWX"),i=n("KpI+"),a=n("+pQw"),c=n("rppw"),u=n("fC8q"),s={},f={};(e=t.exports=function(t,e,n,l,p){var h,v,d,g,y=p?function(){return t}:u(t),_=r(n,l,e?2:1),k=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(i(y)){for(h=c(t.length);h>k;k++)if((g=e?_(a(v=t[k])[0],v[1]):_(t[k]))===s||g===f)return g}else for(d=y.call(t);!(v=d.next()).done;)if((g=o(d,_,v.value,e))===s||g===f)return g}).BREAK=s,e.RETURN=f},p9up:function(t,e,n){"use strict";var r=n("uNkO"),o=n("JXkd"),i=n("5b+r"),a=[].slice,c={};t.exports=Function.bind||function(t){var e=r(this),n=a.call(arguments,1),u=function(){var r=n.concat(a.call(arguments));return this instanceof u?function(t,e,n){if(!(e in c)){for(var r=[],o=0;o<e;o++)r[o]="a["+o+"]";c[e]=Function("F,a","return new F("+r.join(",")+")")}return c[e](t,n)}(e,r.length,r):i(e,r,t)};return o(e.prototype)&&(u.prototype=e.prototype),u}},pBmS:function(t,e,n){var r=n("lfBE");t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},pa70:function(t,e,n){var r=n("uNkO");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},piOq:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},ptrv:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},rIdM:function(t,e,n){"use strict";var r=n("2Fuj"),o=n("lzDK"),i=n("9e9+"),a=n("RT4T"),c=n("Wo2w"),u=Object.assign;t.exports=!u||n("umMR")(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=r})?function(t,e){for(var n=a(t),u=arguments.length,s=1,f=o.f,l=i.f;u>s;)for(var p,h=c(arguments[s++]),v=f?r(h).concat(f(h)):r(h),d=v.length,g=0;d>g;)l.call(h,p=v[g++])&&(n[p]=h[p]);return n}:u},rKhO:function(t,e,n){var r=n("VceJ");t.exports=Array.isArray||function(t){return"Array"==r(t)}},rMMT:function(t,e,n){var r=n("CDXM"),o=n("uNkO"),i=n("+pQw"),a=(n("ptrv").Reflect||{}).apply,c=Function.apply;r(r.S+r.F*!n("umMR")(function(){a(function(){})}),"Reflect",{apply:function(t,e,n){var r=o(t),u=i(n);return a?a(r,e,u):c.call(r,e,u)}})},rMsi:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},rppw:function(t,e,n){var r=n("9wYb"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},soMw:function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=r.keys,a=r.key;r.exp({getOwnMetadataKeys:function(t){return i(o(t),arguments.length<2?void 0:a(arguments[1]))}})},t6ta:function(t,e,n){var r=n("gBtn"),o=n("+pQw"),i=n("uNkO"),a=r.key,c=r.set;r.exp({metadata:function(t,e){return function(n,r){c(t,e,(void 0!==r?o:i)(n),a(r))}}})},tose:function(t,e,n){var r=n("+pQw"),o=n("gNkH"),i=n("A1WY"),a=Object.defineProperty;e.f=n("V+0c")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},uNkO:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},umMR:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},vyV2:function(t,e,n){var r=n("+GRi"),o=n("rppw"),i=n("KM3d");t.exports=function(t){return function(e,n,a){var c,u=r(e),s=o(u.length),f=i(a,s);if(t&&n!=n){for(;s>f;)if((c=u[f++])!=c)return!0}else for(;s>f;f++)if((t||f in u)&&u[f]===n)return t||f||0;return!t&&-1}}},"w/BM":function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},wJYt:function(t,e,n){var r=n("CDXM");r(r.S,"Reflect",{ownKeys:n("NISB")})},wLW2:function(t,e,n){var r=n("CDXM"),o=n("5oDA");o&&r(r.S,"Reflect",{setPrototypeOf:function(t,e){o.check(t,e);try{return o.set(t,e),!0}catch(t){return!1}}})},xI8H:function(t,e,n){var r=n("c09d")("meta"),o=n("JXkd"),i=n("rMsi"),a=n("tose").f,c=0,u=Object.isExtensible||function(){return!0},s=!n("umMR")(function(){return u(Object.preventExtensions({}))}),f=function(t){a(t,r,{value:{i:"O"+ ++c,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return s&&l.NEED&&u(t)&&!i(t,r)&&f(t),t}}},yIWP:function(t,e,n){var r=n("Iclu")("keys"),o=n("c09d");t.exports=function(t){return r[t]||(r[t]=o(t))}}},[1]);
=======
webpackJsonp(["polyfills"],{

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** Evergreen browsers require these. **/


/**
 * Required to support Web Animations `@angular/animation`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';


/***/ }),

/***/ "../../../../core-js/es6/reflect.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../core-js/modules/es6.reflect.apply.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.construct.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.define-property.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.delete-property.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.enumerate.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.get.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.get-own-property-descriptor.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.get-prototype-of.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.has.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.is-extensible.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.own-keys.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.prevent-extensions.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.set.js");
__webpack_require__("../../../../core-js/modules/es6.reflect.set-prototype-of.js");
module.exports = __webpack_require__("../../../../core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "../../../../core-js/es7/reflect.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__("../../../../core-js/modules/es7.reflect.metadata.js");
module.exports = __webpack_require__("../../../../core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "../../../../core-js/modules/_a-function.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "../../../../core-js/modules/_an-instance.js":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "../../../../core-js/modules/_an-object.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "../../../../core-js/modules/_array-from-iterable.js":
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__("../../../../core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "../../../../core-js/modules/_array-includes.js":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("../../../../core-js/modules/_to-iobject.js");
var toLength = __webpack_require__("../../../../core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__("../../../../core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
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
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "../../../../core-js/modules/_array-methods.js":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("../../../../core-js/modules/_ctx.js");
var IObject = __webpack_require__("../../../../core-js/modules/_iobject.js");
var toObject = __webpack_require__("../../../../core-js/modules/_to-object.js");
var toLength = __webpack_require__("../../../../core-js/modules/_to-length.js");
var asc = __webpack_require__("../../../../core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "../../../../core-js/modules/_array-species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var isArray = __webpack_require__("../../../../core-js/modules/_is-array.js");
var SPECIES = __webpack_require__("../../../../core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "../../../../core-js/modules/_array-species-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("../../../../core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "../../../../core-js/modules/_bind.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("../../../../core-js/modules/_a-function.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var invoke = __webpack_require__("../../../../core-js/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "../../../../core-js/modules/_classof.js":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("../../../../core-js/modules/_cof.js");
var TAG = __webpack_require__("../../../../core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "../../../../core-js/modules/_cof.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../../../../core-js/modules/_collection-strong.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js").f;
var create = __webpack_require__("../../../../core-js/modules/_object-create.js");
var redefineAll = __webpack_require__("../../../../core-js/modules/_redefine-all.js");
var ctx = __webpack_require__("../../../../core-js/modules/_ctx.js");
var anInstance = __webpack_require__("../../../../core-js/modules/_an-instance.js");
var forOf = __webpack_require__("../../../../core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__("../../../../core-js/modules/_iter-define.js");
var step = __webpack_require__("../../../../core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__("../../../../core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__("../../../../core-js/modules/_descriptors.js");
var fastKey = __webpack_require__("../../../../core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__("../../../../core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "../../../../core-js/modules/_collection-weak.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__("../../../../core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__("../../../../core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var anInstance = __webpack_require__("../../../../core-js/modules/_an-instance.js");
var forOf = __webpack_require__("../../../../core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__("../../../../core-js/modules/_array-methods.js");
var $has = __webpack_require__("../../../../core-js/modules/_has.js");
var validate = __webpack_require__("../../../../core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "../../../../core-js/modules/_collection.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../../core-js/modules/_global.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var redefine = __webpack_require__("../../../../core-js/modules/_redefine.js");
var redefineAll = __webpack_require__("../../../../core-js/modules/_redefine-all.js");
var meta = __webpack_require__("../../../../core-js/modules/_meta.js");
var forOf = __webpack_require__("../../../../core-js/modules/_for-of.js");
var anInstance = __webpack_require__("../../../../core-js/modules/_an-instance.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../../core-js/modules/_fails.js");
var $iterDetect = __webpack_require__("../../../../core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__("../../../../core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__("../../../../core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "../../../../core-js/modules/_core.js":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../../core-js/modules/_ctx.js":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("../../../../core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../../../core-js/modules/_defined.js":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "../../../../core-js/modules/_descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../../core-js/modules/_dom-create.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var document = __webpack_require__("../../../../core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../../core-js/modules/_enum-bug-keys.js":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "../../../../core-js/modules/_export.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../../core-js/modules/_global.js");
var core = __webpack_require__("../../../../core-js/modules/_core.js");
var hide = __webpack_require__("../../../../core-js/modules/_hide.js");
var redefine = __webpack_require__("../../../../core-js/modules/_redefine.js");
var ctx = __webpack_require__("../../../../core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "../../../../core-js/modules/_fails.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "../../../../core-js/modules/_for-of.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../../../../core-js/modules/_ctx.js");
var call = __webpack_require__("../../../../core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../../../../core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var toLength = __webpack_require__("../../../../core-js/modules/_to-length.js");
var getIterFn = __webpack_require__("../../../../core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "../../../../core-js/modules/_global.js":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../../core-js/modules/_has.js":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../../../../core-js/modules/_hide.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js");
var createDesc = __webpack_require__("../../../../core-js/modules/_property-desc.js");
module.exports = __webpack_require__("../../../../core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../../core-js/modules/_html.js":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("../../../../core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "../../../../core-js/modules/_ie8-dom-define.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("../../../../core-js/modules/_descriptors.js") && !__webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__("../../../../core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../../core-js/modules/_inherit-if-required.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__("../../../../core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "../../../../core-js/modules/_invoke.js":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "../../../../core-js/modules/_iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("../../../../core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "../../../../core-js/modules/_is-array-iter.js":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("../../../../core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__("../../../../core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "../../../../core-js/modules/_is-array.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("../../../../core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "../../../../core-js/modules/_is-object.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../../../../core-js/modules/_iter-call.js":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "../../../../core-js/modules/_iter-create.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("../../../../core-js/modules/_object-create.js");
var descriptor = __webpack_require__("../../../../core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__("../../../../core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("../../../../core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__("../../../../core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "../../../../core-js/modules/_iter-define.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../../../../core-js/modules/_library.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var redefine = __webpack_require__("../../../../core-js/modules/_redefine.js");
var hide = __webpack_require__("../../../../core-js/modules/_hide.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var Iterators = __webpack_require__("../../../../core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__("../../../../core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__("../../../../core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__("../../../../core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "../../../../core-js/modules/_iter-detect.js":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("../../../../core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "../../../../core-js/modules/_iter-step.js":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "../../../../core-js/modules/_iterators.js":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../../../../core-js/modules/_library.js":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "../../../../core-js/modules/_meta.js":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("../../../../core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var setDesc = __webpack_require__("../../../../core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "../../../../core-js/modules/_metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__("../../../../core-js/modules/es6.map.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var shared = __webpack_require__("../../../../core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__("../../../../core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ "../../../../core-js/modules/_object-assign.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("../../../../core-js/modules/_object-keys.js");
var gOPS = __webpack_require__("../../../../core-js/modules/_object-gops.js");
var pIE = __webpack_require__("../../../../core-js/modules/_object-pie.js");
var toObject = __webpack_require__("../../../../core-js/modules/_to-object.js");
var IObject = __webpack_require__("../../../../core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "../../../../core-js/modules/_object-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var dPs = __webpack_require__("../../../../core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__("../../../../core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__("../../../../core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("../../../../core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("../../../../core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "../../../../core-js/modules/_object-dp.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../../core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__("../../../../core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__("../../../../core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../../../core-js/modules/_object-dps.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var getKeys = __webpack_require__("../../../../core-js/modules/_object-keys.js");

module.exports = __webpack_require__("../../../../core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "../../../../core-js/modules/_object-gopd.js":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("../../../../core-js/modules/_object-pie.js");
var createDesc = __webpack_require__("../../../../core-js/modules/_property-desc.js");
var toIObject = __webpack_require__("../../../../core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("../../../../core-js/modules/_to-primitive.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../../core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("../../../../core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../../../../core-js/modules/_object-gopn.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("../../../../core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__("../../../../core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "../../../../core-js/modules/_object-gops.js":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../../../core-js/modules/_object-gpo.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var toObject = __webpack_require__("../../../../core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__("../../../../core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "../../../../core-js/modules/_object-keys-internal.js":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("../../../../core-js/modules/_has.js");
var toIObject = __webpack_require__("../../../../core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__("../../../../core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__("../../../../core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../../../../core-js/modules/_object-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("../../../../core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__("../../../../core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "../../../../core-js/modules/_object-pie.js":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "../../../../core-js/modules/_own-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("../../../../core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__("../../../../core-js/modules/_object-gops.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var Reflect = __webpack_require__("../../../../core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "../../../../core-js/modules/_property-desc.js":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../../../core-js/modules/_redefine-all.js":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("../../../../core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "../../../../core-js/modules/_redefine.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../../core-js/modules/_global.js");
var hide = __webpack_require__("../../../../core-js/modules/_hide.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var SRC = __webpack_require__("../../../../core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("../../../../core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "../../../../core-js/modules/_set-proto.js":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("../../../../core-js/modules/_ctx.js")(Function.call, __webpack_require__("../../../../core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "../../../../core-js/modules/_set-species.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../../core-js/modules/_global.js");
var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__("../../../../core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__("../../../../core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../../../../core-js/modules/_set-to-string-tag.js":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("../../../../core-js/modules/_object-dp.js").f;
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var TAG = __webpack_require__("../../../../core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "../../../../core-js/modules/_shared-key.js":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("../../../../core-js/modules/_shared.js")('keys');
var uid = __webpack_require__("../../../../core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../../../../core-js/modules/_shared.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../../core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "../../../../core-js/modules/_to-absolute-index.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../../../../core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "../../../../core-js/modules/_to-integer.js":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "../../../../core-js/modules/_to-iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("../../../../core-js/modules/_iobject.js");
var defined = __webpack_require__("../../../../core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "../../../../core-js/modules/_to-length.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("../../../../core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../../core-js/modules/_to-object.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("../../../../core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "../../../../core-js/modules/_to-primitive.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../../../core-js/modules/_uid.js":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "../../../../core-js/modules/_validate-collection.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "../../../../core-js/modules/_wks.js":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("../../../../core-js/modules/_shared.js")('wks');
var uid = __webpack_require__("../../../../core-js/modules/_uid.js");
var Symbol = __webpack_require__("../../../../core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "../../../../core-js/modules/core.get-iterator-method.js":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("../../../../core-js/modules/_classof.js");
var ITERATOR = __webpack_require__("../../../../core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__("../../../../core-js/modules/_iterators.js");
module.exports = __webpack_require__("../../../../core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../../../core-js/modules/es6.map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("../../../../core-js/modules/_collection-strong.js");
var validate = __webpack_require__("../../../../core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__("../../../../core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.apply.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var aFunction = __webpack_require__("../../../../core-js/modules/_a-function.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var rApply = (__webpack_require__("../../../../core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.construct.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var create = __webpack_require__("../../../../core-js/modules/_object-create.js");
var aFunction = __webpack_require__("../../../../core-js/modules/_a-function.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../../core-js/modules/_fails.js");
var bind = __webpack_require__("../../../../core-js/modules/_bind.js");
var rConstruct = (__webpack_require__("../../../../core-js/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.define-property.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__("../../../../core-js/modules/_to-primitive.js");

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__("../../../../core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.delete-property.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var gOPD = __webpack_require__("../../../../core-js/modules/_object-gopd.js").f;
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.enumerate.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__("../../../../core-js/modules/_iter-create.js")(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__("../../../../core-js/modules/_object-gopd.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var getProto = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.get.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__("../../../../core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.has.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.is-extensible.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.own-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");

$export($export.S, 'Reflect', { ownKeys: __webpack_require__("../../../../core-js/modules/_own-keys.js") });


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.prevent-extensions.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var setProto = __webpack_require__("../../../../core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../../core-js/modules/es6.reflect.set.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__("../../../../core-js/modules/_object-dp.js");
var gOPD = __webpack_require__("../../../../core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var has = __webpack_require__("../../../../core-js/modules/_has.js");
var $export = __webpack_require__("../../../../core-js/modules/_export.js");
var createDesc = __webpack_require__("../../../../core-js/modules/_property-desc.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ "../../../../core-js/modules/es6.set.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("../../../../core-js/modules/_collection-strong.js");
var validate = __webpack_require__("../../../../core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__("../../../../core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "../../../../core-js/modules/es6.weak-map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__("../../../../core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__("../../../../core-js/modules/_redefine.js");
var meta = __webpack_require__("../../../../core-js/modules/_meta.js");
var assign = __webpack_require__("../../../../core-js/modules/_object-assign.js");
var weak = __webpack_require__("../../../../core-js/modules/_collection-weak.js");
var isObject = __webpack_require__("../../../../core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../../core-js/modules/_fails.js");
var validate = __webpack_require__("../../../../core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__("../../../../core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.define-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.delete-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.get-metadata-keys.js":
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__("../../../../core-js/modules/es6.set.js");
var from = __webpack_require__("../../../../core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.get-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.get-own-metadata-keys.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.get-own-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.has-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__("../../../../core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.has-own-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "../../../../core-js/modules/es7.reflect.metadata.js":
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__("../../../../core-js/modules/_metadata.js");
var anObject = __webpack_require__("../../../../core-js/modules/_an-object.js");
var aFunction = __webpack_require__("../../../../core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "../../../../webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../../../zone.js/dist/zone.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var FUNCTION = 'function';
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                throw Error('Already loaded patch: ' + name);
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== FUNCTION) {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            // we have to define an variable here, if not
            // typescript compiler will complain below
            var isNotScheduled = task.state === notScheduled;
            if (isNotScheduled && task.type === eventTask) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        return Zone;
    }());
    Zone.__symbol__ = __symbol__;
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                nativeMicroTaskQueuePromise[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return null; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === FUNCTION) {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        // check Ctor.prototype.then propertyDescriptor is writable or not
        // in meteor env, writable is false, we have to make it to be true.
        var prop = ObjectGetOwnPropertyDescriptor(Ctor.prototype, 'then');
        if (prop && prop.writable === false && prop.configurable) {
            ObjectDefineProperty(Ctor.prototype, 'then', { writable: true });
        }
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result = listener && listener.apply(this, arguments);
    if (result != undefined && !result) {
        event.preventDefault();
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask, null);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global, Zone) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Zone['__zone_symbol__originalToString'] =
        Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    Function.prototype.toString = function () {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        var customScheduleGlobal = function () {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var eventName = arguments[0];
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = eventName + FALSE_STR;
                    var trueEventName = eventName + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource + eventName;
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : null;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                task.options = options;
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return _registerElement.call(document, name, opts);
    };
    attachOriginToPatched(document.registerElement, _registerElement);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
    registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            var target = data.target;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        task.invoke();
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = {
                    target: self,
                    url: self[XHR_URL],
                    isPeriodic: false,
                    delay: null,
                    args: args,
                    aborted: false
                };
                return scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("../../../../webpack/buildin/global.js")))

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/polyfills.ts");


/***/ })

},[1]);
//# sourceMappingURL=polyfills.bundle.js.map
>>>>>>> dev build
