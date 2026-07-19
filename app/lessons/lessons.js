(function(){"use strict";var Vx;var cc={exports:{}},Is={},fc={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var An=Symbol.for("react.element"),_x=Symbol.for("react.portal"),Yx=Symbol.for("react.fragment"),Hx=Symbol.for("react.strict_mode"),qx=Symbol.for("react.profiler"),$x=Symbol.for("react.provider"),Kx=Symbol.for("react.context"),Qx=Symbol.for("react.forward_ref"),Gx=Symbol.for("react.suspense"),Xx=Symbol.for("react.memo"),Jx=Symbol.for("react.lazy"),pc=Symbol.iterator;function Zx(e){return e===null||typeof e!="object"?null:(e=pc&&e[pc]||e["@@iterator"],typeof e=="function"?e:null)}var uc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hc=Object.assign,xc={};function Ni(e,t,i){this.props=e,this.context=t,this.refs=xc,this.updater=i||uc}Ni.prototype.isReactComponent={},Ni.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},Ni.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function gc(){}gc.prototype=Ni.prototype;function jo(e,t,i){this.props=e,this.context=t,this.refs=xc,this.updater=i||uc}var Mo=jo.prototype=new gc;Mo.constructor=jo,hc(Mo,Ni.prototype),Mo.isPureReactComponent=!0;var mc=Array.isArray,yc=Object.prototype.hasOwnProperty,No={current:null},vc={key:!0,ref:!0,__self:!0,__source:!0};function bc(e,t,i){var n,s={},r=null,o=null;if(t!=null)for(n in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(r=""+t.key),t)yc.call(t,n)&&!vc.hasOwnProperty(n)&&(s[n]=t[n]);var l=arguments.length-2;if(l===1)s.children=i;else if(1<l){for(var d=Array(l),c=0;c<l;c++)d[c]=arguments[c+2];s.children=d}if(e&&e.defaultProps)for(n in l=e.defaultProps,l)s[n]===void 0&&(s[n]=l[n]);return{$$typeof:An,type:e,key:r,ref:o,props:s,_owner:No.current}}function eg(e,t){return{$$typeof:An,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Po(e){return typeof e=="object"&&e!==null&&e.$$typeof===An}function tg(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(i){return t[i]})}var wc=/\/+/g;function Lo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?tg(""+e.key):t.toString(36)}function Os(e,t,i,n,s){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(r){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case An:case _x:o=!0}}if(o)return o=e,s=s(o),e=n===""?"."+Lo(o,0):n,mc(s)?(i="",e!=null&&(i=e.replace(wc,"$&/")+"/"),Os(s,t,i,"",function(c){return c})):s!=null&&(Po(s)&&(s=eg(s,i+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(wc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,n=n===""?".":n+":",mc(e))for(var l=0;l<e.length;l++){r=e[l];var d=n+Lo(r,l);o+=Os(r,t,i,d,s)}else if(d=Zx(e),typeof d=="function")for(e=d.call(e),l=0;!(r=e.next()).done;)r=r.value,d=n+Lo(r,l++),o+=Os(r,t,i,d,s);else if(r==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Bs(e,t,i){if(e==null)return e;var n=[],s=0;return Os(e,n,"","",function(r){return t.call(i,r,s++)}),n}function ig(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i)},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},Fs={transition:null},ng={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:Fs,ReactCurrentOwner:No};function kc(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:Bs,forEach:function(e,t,i){Bs(e,function(){t.apply(this,arguments)},i)},count:function(e){var t=0;return Bs(e,function(){t++}),t},toArray:function(e){return Bs(e,function(t){return t})||[]},only:function(e){if(!Po(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},L.Component=Ni,L.Fragment=Yx,L.Profiler=qx,L.PureComponent=jo,L.StrictMode=Hx,L.Suspense=Gx,L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ng,L.act=kc,L.cloneElement=function(e,t,i){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=hc({},e.props),s=e.key,r=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(r=t.ref,o=No.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(d in t)yc.call(t,d)&&!vc.hasOwnProperty(d)&&(n[d]=t[d]===void 0&&l!==void 0?l[d]:t[d])}var d=arguments.length-2;if(d===1)n.children=i;else if(1<d){l=Array(d);for(var c=0;c<d;c++)l[c]=arguments[c+2];n.children=l}return{$$typeof:An,type:e.type,key:s,ref:r,props:n,_owner:o}},L.createContext=function(e){return e={$$typeof:Kx,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:$x,_context:e},e.Consumer=e},L.createElement=bc,L.createFactory=function(e){var t=bc.bind(null,e);return t.type=e,t},L.createRef=function(){return{current:null}},L.forwardRef=function(e){return{$$typeof:Qx,render:e}},L.isValidElement=Po,L.lazy=function(e){return{$$typeof:Jx,_payload:{_status:-1,_result:e},_init:ig}},L.memo=function(e,t){return{$$typeof:Xx,type:e,compare:t===void 0?null:t}},L.startTransition=function(e){var t=Fs.transition;Fs.transition={};try{e()}finally{Fs.transition=t}},L.unstable_act=kc,L.useCallback=function(e,t){return ke.current.useCallback(e,t)},L.useContext=function(e){return ke.current.useContext(e)},L.useDebugValue=function(){},L.useDeferredValue=function(e){return ke.current.useDeferredValue(e)},L.useEffect=function(e,t){return ke.current.useEffect(e,t)},L.useId=function(){return ke.current.useId()},L.useImperativeHandle=function(e,t,i){return ke.current.useImperativeHandle(e,t,i)},L.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)},L.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)},L.useMemo=function(e,t){return ke.current.useMemo(e,t)},L.useReducer=function(e,t,i){return ke.current.useReducer(e,t,i)},L.useRef=function(e){return ke.current.useRef(e)},L.useState=function(e){return ke.current.useState(e)},L.useSyncExternalStore=function(e,t,i){return ke.current.useSyncExternalStore(e,t,i)},L.useTransition=function(){return ke.current.useTransition()},L.version="18.3.1",fc.exports=L;var k=fc.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sg=k,rg=Symbol.for("react.element"),og=Symbol.for("react.fragment"),ag=Object.prototype.hasOwnProperty,lg=sg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,dg={key:!0,ref:!0,__self:!0,__source:!0};function Sc(e,t,i){var n,s={},r=null,o=null;i!==void 0&&(r=""+i),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(o=t.ref);for(n in t)ag.call(t,n)&&!dg.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)s[n]===void 0&&(s[n]=t[n]);return{$$typeof:rg,type:e,key:r,ref:o,props:s,_owner:lg.current}}Is.Fragment=og,Is.jsx=Sc,Is.jsxs=Sc,cc.exports=Is;var a=cc.exports,Ec={exports:{}},Le={},Cc={exports:{}},Tc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(R,M){var N=R.length;R.push(M);e:for(;0<N;){var F=N-1>>>1,se=R[F];if(0<s(se,M))R[F]=M,R[N]=se,N=F;else break e}}function i(R){return R.length===0?null:R[0]}function n(R){if(R.length===0)return null;var M=R[0],N=R.pop();if(N!==M){R[0]=N;e:for(var F=0,se=R.length,Ro=se>>>1;F<Ro;){var ji=2*(F+1)-1,dc=R[ji],Mi=ji+1,Do=R[Mi];if(0>s(dc,N))Mi<se&&0>s(Do,dc)?(R[F]=Do,R[Mi]=N,F=Mi):(R[F]=dc,R[ji]=N,F=ji);else if(Mi<se&&0>s(Do,N))R[F]=Do,R[Mi]=N,F=Mi;else break e}}return M}function s(R,M){var N=R.sortIndex-M.sortIndex;return N!==0?N:R.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var d=[],c=[],f=1,p=null,u=3,v=!1,g=!1,m=!1,b=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(R){for(var M=i(c);M!==null;){if(M.callback===null)n(c);else if(M.startTime<=R)n(c),M.sortIndex=M.expirationTime,t(d,M);else break;M=i(c)}}function w(R){if(m=!1,y(R),!g)if(i(d)!==null)g=!0,Pe(S);else{var M=i(c);M!==null&&zo(w,M.startTime-R)}}function S(R,M){g=!1,m&&(m=!1,h(T),T=-1),v=!0;var N=u;try{for(y(M),p=i(d);p!==null&&(!(p.expirationTime>M)||R&&!O());){var F=p.callback;if(typeof F=="function"){p.callback=null,u=p.priorityLevel;var se=F(p.expirationTime<=M);M=e.unstable_now(),typeof se=="function"?p.callback=se:p===i(d)&&n(d),y(M)}else n(d);p=i(d)}if(p!==null)var Ro=!0;else{var ji=i(c);ji!==null&&zo(w,ji.startTime-M),Ro=!1}return Ro}finally{p=null,u=N,v=!1}}var E=!1,C=null,T=-1,P=5,z=-1;function O(){return!(e.unstable_now()-z<P)}function ne(){if(C!==null){var R=e.unstable_now();z=R;var M=!0;try{M=C(!0,R)}finally{M?Ue():(E=!1,C=null)}}else E=!1}var Ue;if(typeof x=="function")Ue=function(){x(ne)};else if(typeof MessageChannel<"u"){var Ve=new MessageChannel,ft=Ve.port2;Ve.port1.onmessage=ne,Ue=function(){ft.postMessage(null)}}else Ue=function(){b(ne,0)};function Pe(R){C=R,E||(E=!0,Ue())}function zo(R,M){T=b(function(){R(e.unstable_now())},M)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){g||v||(g=!0,Pe(S))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return i(d)},e.unstable_next=function(R){switch(u){case 1:case 2:case 3:var M=3;break;default:M=u}var N=u;u=M;try{return R()}finally{u=N}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,M){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var N=u;u=R;try{return M()}finally{u=N}},e.unstable_scheduleCallback=function(R,M,N){var F=e.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?F+N:F):N=F,R){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=N+se,R={id:f++,callback:M,priorityLevel:R,startTime:N,expirationTime:se,sortIndex:-1},N>F?(R.sortIndex=N,t(c,R),i(d)===null&&R===i(c)&&(m?(h(T),T=-1):m=!0,zo(w,N-F))):(R.sortIndex=se,t(d,R),g||v||(g=!0,Pe(S))),R},e.unstable_shouldYield=O,e.unstable_wrapCallback=function(R){var M=u;return function(){var N=u;u=M;try{return R.apply(this,arguments)}finally{u=N}}}})(Tc),Cc.exports=Tc;var cg=Cc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fg=k,Ie=cg;function A(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,i=1;i<arguments.length;i++)t+="&args[]="+encodeURIComponent(arguments[i]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ac=new Set,zn={};function li(e,t){Pi(e,t),Pi(e+"Capture",t)}function Pi(e,t){for(zn[e]=t,e=0;e<t.length;e++)Ac.add(t[e])}var Et=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Io=Object.prototype.hasOwnProperty,pg=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zc={},Rc={};function ug(e){return Io.call(Rc,e)?!0:Io.call(zc,e)?!1:pg.test(e)?Rc[e]=!0:(zc[e]=!0,!1)}function hg(e,t,i,n){if(i!==null&&i.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:i!==null?!i.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function xg(e,t,i,n){if(t===null||typeof t>"u"||hg(e,t,i,n))return!0;if(n)return!1;if(i!==null)switch(i.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Se(e,t,i,n,s,r,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=i,this.propertyName=e,this.type=t,this.sanitizeURL=r,this.removeEmptyString=o}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new Se(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];pe[t]=new Se(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new Se(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new Se(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new Se(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new Se(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){pe[e]=new Se(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){pe[e]=new Se(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){pe[e]=new Se(e,5,!1,e.toLowerCase(),null,!1,!1)});var Oo=/[\-:]([a-z])/g;function Bo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Oo,Bo);pe[t]=new Se(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Oo,Bo);pe[t]=new Se(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Oo,Bo);pe[t]=new Se(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new Se(e,1,!1,e.toLowerCase(),null,!1,!1)}),pe.xlinkHref=new Se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){pe[e]=new Se(e,1,!1,e.toLowerCase(),null,!0,!0)});function Fo(e,t,i,n){var s=pe.hasOwnProperty(t)?pe[t]:null;(s!==null?s.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(xg(t,i,s,n)&&(i=null),n||s===null?ug(t)&&(i===null?e.removeAttribute(t):e.setAttribute(t,""+i)):s.mustUseProperty?e[s.propertyName]=i===null?s.type===3?!1:"":i:(t=s.attributeName,n=s.attributeNamespace,i===null?e.removeAttribute(t):(s=s.type,i=s===3||s===4&&i===!0?"":""+i,n?e.setAttributeNS(n,t,i):e.setAttribute(t,i))))}var Ct=fg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ws=Symbol.for("react.element"),Li=Symbol.for("react.portal"),Ii=Symbol.for("react.fragment"),Wo=Symbol.for("react.strict_mode"),Uo=Symbol.for("react.profiler"),Dc=Symbol.for("react.provider"),jc=Symbol.for("react.context"),Vo=Symbol.for("react.forward_ref"),_o=Symbol.for("react.suspense"),Yo=Symbol.for("react.suspense_list"),Ho=Symbol.for("react.memo"),Lt=Symbol.for("react.lazy"),Mc=Symbol.for("react.offscreen"),Nc=Symbol.iterator;function Rn(e){return e===null||typeof e!="object"?null:(e=Nc&&e[Nc]||e["@@iterator"],typeof e=="function"?e:null)}var q=Object.assign,qo;function Dn(e){if(qo===void 0)try{throw Error()}catch(i){var t=i.stack.trim().match(/\n( *(at )?)/);qo=t&&t[1]||""}return`
`+qo+e}var $o=!1;function Ko(e,t){if(!e||$o)return"";$o=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var n=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){n=c}e.call(t.prototype)}else{try{throw Error()}catch(c){n=c}e()}}catch(c){if(c&&n&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),r=n.stack.split(`
`),o=s.length-1,l=r.length-1;1<=o&&0<=l&&s[o]!==r[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==r[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==r[l]){var d=`
`+s[o].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=o&&0<=l);break}}}finally{$o=!1,Error.prepareStackTrace=i}return(e=e?e.displayName||e.name:"")?Dn(e):""}function gg(e){switch(e.tag){case 5:return Dn(e.type);case 16:return Dn("Lazy");case 13:return Dn("Suspense");case 19:return Dn("SuspenseList");case 0:case 2:case 15:return e=Ko(e.type,!1),e;case 11:return e=Ko(e.type.render,!1),e;case 1:return e=Ko(e.type,!0),e;default:return""}}function Qo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ii:return"Fragment";case Li:return"Portal";case Uo:return"Profiler";case Wo:return"StrictMode";case _o:return"Suspense";case Yo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case jc:return(e.displayName||"Context")+".Consumer";case Dc:return(e._context.displayName||"Context")+".Provider";case Vo:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ho:return t=e.displayName||null,t!==null?t:Qo(e.type)||"Memo";case Lt:t=e._payload,e=e._init;try{return Qo(e(t))}catch{}}return null}function mg(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qo(t);case 8:return t===Wo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function It(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function yg(e){var t=Pc(e)?"checked":"value",i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,r=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){n=""+o,r.call(this,o)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Us(e){e._valueTracker||(e._valueTracker=yg(e))}function Lc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var i=t.getValue(),n="";return e&&(n=Pc(e)?e.checked?"true":"false":e.value),e=n,e!==i?(t.setValue(e),!0):!1}function Vs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Go(e,t){var i=t.checked;return q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:i??e._wrapperState.initialChecked})}function Ic(e,t){var i=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;i=It(t.value!=null?t.value:i),e._wrapperState={initialChecked:n,initialValue:i,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Oc(e,t){t=t.checked,t!=null&&Fo(e,"checked",t,!1)}function Xo(e,t){Oc(e,t);var i=It(t.value),n=t.type;if(i!=null)n==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+i):e.value!==""+i&&(e.value=""+i);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Jo(e,t.type,i):t.hasOwnProperty("defaultValue")&&Jo(e,t.type,It(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Bc(e,t,i){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,i||t===e.value||(e.value=t),e.defaultValue=t}i=e.name,i!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,i!==""&&(e.name=i)}function Jo(e,t,i){(t!=="number"||Vs(e.ownerDocument)!==e)&&(i==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+i&&(e.defaultValue=""+i))}var jn=Array.isArray;function Oi(e,t,i,n){if(e=e.options,t){t={};for(var s=0;s<i.length;s++)t["$"+i[s]]=!0;for(i=0;i<e.length;i++)s=t.hasOwnProperty("$"+e[i].value),e[i].selected!==s&&(e[i].selected=s),s&&n&&(e[i].defaultSelected=!0)}else{for(i=""+It(i),t=null,s=0;s<e.length;s++){if(e[s].value===i){e[s].selected=!0,n&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Zo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(A(91));return q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Fc(e,t){var i=t.value;if(i==null){if(i=t.children,t=t.defaultValue,i!=null){if(t!=null)throw Error(A(92));if(jn(i)){if(1<i.length)throw Error(A(93));i=i[0]}t=i}t==null&&(t=""),i=t}e._wrapperState={initialValue:It(i)}}function Wc(e,t){var i=It(t.value),n=It(t.defaultValue);i!=null&&(i=""+i,i!==e.value&&(e.value=i),t.defaultValue==null&&e.defaultValue!==i&&(e.defaultValue=i)),n!=null&&(e.defaultValue=""+n)}function Uc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ea(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _s,_c=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,i,n,s){MSApp.execUnsafeLocalFunction(function(){return e(t,i,n,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_s=_s||document.createElement("div"),_s.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_s.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mn(e,t){if(t){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=t;return}}e.textContent=t}var Nn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vg=["Webkit","ms","Moz","O"];Object.keys(Nn).forEach(function(e){vg.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Nn[t]=Nn[e]})});function Yc(e,t,i){return t==null||typeof t=="boolean"||t===""?"":i||typeof t!="number"||t===0||Nn.hasOwnProperty(e)&&Nn[e]?(""+t).trim():t+"px"}function Hc(e,t){e=e.style;for(var i in t)if(t.hasOwnProperty(i)){var n=i.indexOf("--")===0,s=Yc(i,t[i],n);i==="float"&&(i="cssFloat"),n?e.setProperty(i,s):e[i]=s}}var bg=q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ta(e,t){if(t){if(bg[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(A(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(A(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(A(61))}if(t.style!=null&&typeof t.style!="object")throw Error(A(62))}}function ia(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var na=null;function sa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ra=null,Bi=null,Fi=null;function qc(e){if(e=ts(e)){if(typeof ra!="function")throw Error(A(280));var t=e.stateNode;t&&(t=pr(t),ra(e.stateNode,e.type,t))}}function $c(e){Bi?Fi?Fi.push(e):Fi=[e]:Bi=e}function Kc(){if(Bi){var e=Bi,t=Fi;if(Fi=Bi=null,qc(e),t)for(e=0;e<t.length;e++)qc(t[e])}}function Qc(e,t){return e(t)}function Gc(){}var oa=!1;function Xc(e,t,i){if(oa)return e(t,i);oa=!0;try{return Qc(e,t,i)}finally{oa=!1,(Bi!==null||Fi!==null)&&(Gc(),Kc())}}function Pn(e,t){var i=e.stateNode;if(i===null)return null;var n=pr(i);if(n===null)return null;i=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error(A(231,t,typeof i));return i}var aa=!1;if(Et)try{var Ln={};Object.defineProperty(Ln,"passive",{get:function(){aa=!0}}),window.addEventListener("test",Ln,Ln),window.removeEventListener("test",Ln,Ln)}catch{aa=!1}function wg(e,t,i,n,s,r,o,l,d){var c=Array.prototype.slice.call(arguments,3);try{t.apply(i,c)}catch(f){this.onError(f)}}var In=!1,Ys=null,Hs=!1,la=null,kg={onError:function(e){In=!0,Ys=e}};function Sg(e,t,i,n,s,r,o,l,d){In=!1,Ys=null,wg.apply(kg,arguments)}function Eg(e,t,i,n,s,r,o,l,d){if(Sg.apply(this,arguments),In){if(In){var c=Ys;In=!1,Ys=null}else throw Error(A(198));Hs||(Hs=!0,la=c)}}function di(e){var t=e,i=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(i=t.return),e=t.return;while(e)}return t.tag===3?i:null}function Jc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Zc(e){if(di(e)!==e)throw Error(A(188))}function Cg(e){var t=e.alternate;if(!t){if(t=di(e),t===null)throw Error(A(188));return t!==e?null:e}for(var i=e,n=t;;){var s=i.return;if(s===null)break;var r=s.alternate;if(r===null){if(n=s.return,n!==null){i=n;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===i)return Zc(s),e;if(r===n)return Zc(s),t;r=r.sibling}throw Error(A(188))}if(i.return!==n.return)i=s,n=r;else{for(var o=!1,l=s.child;l;){if(l===i){o=!0,i=s,n=r;break}if(l===n){o=!0,n=s,i=r;break}l=l.sibling}if(!o){for(l=r.child;l;){if(l===i){o=!0,i=r,n=s;break}if(l===n){o=!0,n=r,i=s;break}l=l.sibling}if(!o)throw Error(A(189))}}if(i.alternate!==n)throw Error(A(190))}if(i.tag!==3)throw Error(A(188));return i.stateNode.current===i?e:t}function ef(e){return e=Cg(e),e!==null?tf(e):null}function tf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=tf(e);if(t!==null)return t;e=e.sibling}return null}var nf=Ie.unstable_scheduleCallback,sf=Ie.unstable_cancelCallback,Tg=Ie.unstable_shouldYield,Ag=Ie.unstable_requestPaint,Z=Ie.unstable_now,zg=Ie.unstable_getCurrentPriorityLevel,da=Ie.unstable_ImmediatePriority,rf=Ie.unstable_UserBlockingPriority,qs=Ie.unstable_NormalPriority,Rg=Ie.unstable_LowPriority,of=Ie.unstable_IdlePriority,$s=null,pt=null;function Dg(e){if(pt&&typeof pt.onCommitFiberRoot=="function")try{pt.onCommitFiberRoot($s,e,void 0,(e.current.flags&128)===128)}catch{}}var et=Math.clz32?Math.clz32:Ng,jg=Math.log,Mg=Math.LN2;function Ng(e){return e>>>=0,e===0?32:31-(jg(e)/Mg|0)|0}var Ks=64,Qs=4194304;function On(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gs(e,t){var i=e.pendingLanes;if(i===0)return 0;var n=0,s=e.suspendedLanes,r=e.pingedLanes,o=i&268435455;if(o!==0){var l=o&~s;l!==0?n=On(l):(r&=o,r!==0&&(n=On(r)))}else o=i&~s,o!==0?n=On(o):r!==0&&(n=On(r));if(n===0)return 0;if(t!==0&&t!==n&&!(t&s)&&(s=n&-n,r=t&-t,s>=r||s===16&&(r&4194240)!==0))return t;if(n&4&&(n|=i&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)i=31-et(t),s=1<<i,n|=e[i],t&=~s;return n}function Pg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Lg(e,t){for(var i=e.suspendedLanes,n=e.pingedLanes,s=e.expirationTimes,r=e.pendingLanes;0<r;){var o=31-et(r),l=1<<o,d=s[o];d===-1?(!(l&i)||l&n)&&(s[o]=Pg(l,t)):d<=t&&(e.expiredLanes|=l),r&=~l}}function ca(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function af(){var e=Ks;return Ks<<=1,!(Ks&4194240)&&(Ks=64),e}function fa(e){for(var t=[],i=0;31>i;i++)t.push(e);return t}function Bn(e,t,i){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-et(t),e[t]=i}function Ig(e,t){var i=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<i;){var s=31-et(i),r=1<<s;t[s]=0,n[s]=-1,e[s]=-1,i&=~r}}function pa(e,t){var i=e.entangledLanes|=t;for(e=e.entanglements;i;){var n=31-et(i),s=1<<n;s&t|e[n]&t&&(e[n]|=t),i&=~s}}var B=0;function lf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var df,ua,cf,ff,pf,ha=!1,Xs=[],Ot=null,Bt=null,Ft=null,Fn=new Map,Wn=new Map,Wt=[],Og="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function uf(e,t){switch(e){case"focusin":case"focusout":Ot=null;break;case"dragenter":case"dragleave":Bt=null;break;case"mouseover":case"mouseout":Ft=null;break;case"pointerover":case"pointerout":Fn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wn.delete(t.pointerId)}}function Un(e,t,i,n,s,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:i,eventSystemFlags:n,nativeEvent:r,targetContainers:[s]},t!==null&&(t=ts(t),t!==null&&ua(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Bg(e,t,i,n,s){switch(t){case"focusin":return Ot=Un(Ot,e,t,i,n,s),!0;case"dragenter":return Bt=Un(Bt,e,t,i,n,s),!0;case"mouseover":return Ft=Un(Ft,e,t,i,n,s),!0;case"pointerover":var r=s.pointerId;return Fn.set(r,Un(Fn.get(r)||null,e,t,i,n,s)),!0;case"gotpointercapture":return r=s.pointerId,Wn.set(r,Un(Wn.get(r)||null,e,t,i,n,s)),!0}return!1}function hf(e){var t=ci(e.target);if(t!==null){var i=di(t);if(i!==null){if(t=i.tag,t===13){if(t=Jc(i),t!==null){e.blockedOn=t,pf(e.priority,function(){cf(i)});return}}else if(t===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Js(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var i=ga(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(i===null){i=e.nativeEvent;var n=new i.constructor(i.type,i);na=n,i.target.dispatchEvent(n),na=null}else return t=ts(i),t!==null&&ua(t),e.blockedOn=i,!1;t.shift()}return!0}function xf(e,t,i){Js(e)&&i.delete(t)}function Fg(){ha=!1,Ot!==null&&Js(Ot)&&(Ot=null),Bt!==null&&Js(Bt)&&(Bt=null),Ft!==null&&Js(Ft)&&(Ft=null),Fn.forEach(xf),Wn.forEach(xf)}function Vn(e,t){e.blockedOn===t&&(e.blockedOn=null,ha||(ha=!0,Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority,Fg)))}function _n(e){function t(s){return Vn(s,e)}if(0<Xs.length){Vn(Xs[0],e);for(var i=1;i<Xs.length;i++){var n=Xs[i];n.blockedOn===e&&(n.blockedOn=null)}}for(Ot!==null&&Vn(Ot,e),Bt!==null&&Vn(Bt,e),Ft!==null&&Vn(Ft,e),Fn.forEach(t),Wn.forEach(t),i=0;i<Wt.length;i++)n=Wt[i],n.blockedOn===e&&(n.blockedOn=null);for(;0<Wt.length&&(i=Wt[0],i.blockedOn===null);)hf(i),i.blockedOn===null&&Wt.shift()}var Wi=Ct.ReactCurrentBatchConfig,Zs=!0;function Wg(e,t,i,n){var s=B,r=Wi.transition;Wi.transition=null;try{B=1,xa(e,t,i,n)}finally{B=s,Wi.transition=r}}function Ug(e,t,i,n){var s=B,r=Wi.transition;Wi.transition=null;try{B=4,xa(e,t,i,n)}finally{B=s,Wi.transition=r}}function xa(e,t,i,n){if(Zs){var s=ga(e,t,i,n);if(s===null)Na(e,t,n,er,i),uf(e,n);else if(Bg(s,e,t,i,n))n.stopPropagation();else if(uf(e,n),t&4&&-1<Og.indexOf(e)){for(;s!==null;){var r=ts(s);if(r!==null&&df(r),r=ga(e,t,i,n),r===null&&Na(e,t,n,er,i),r===s)break;s=r}s!==null&&n.stopPropagation()}else Na(e,t,n,null,i)}}var er=null;function ga(e,t,i,n){if(er=null,e=sa(n),e=ci(e),e!==null)if(t=di(e),t===null)e=null;else if(i=t.tag,i===13){if(e=Jc(t),e!==null)return e;e=null}else if(i===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return er=e,null}function gf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zg()){case da:return 1;case rf:return 4;case qs:case Rg:return 16;case of:return 536870912;default:return 16}default:return 16}}var Ut=null,ma=null,tr=null;function mf(){if(tr)return tr;var e,t=ma,i=t.length,n,s="value"in Ut?Ut.value:Ut.textContent,r=s.length;for(e=0;e<i&&t[e]===s[e];e++);var o=i-e;for(n=1;n<=o&&t[i-n]===s[r-n];n++);return tr=s.slice(e,1<n?1-n:void 0)}function ir(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function nr(){return!0}function yf(){return!1}function Oe(e){function t(i,n,s,r,o){this._reactName=i,this._targetInst=s,this.type=n,this.nativeEvent=r,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(i=e[l],this[l]=i?i(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?nr:yf,this.isPropagationStopped=yf,this}return q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=nr)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=nr)},persist:function(){},isPersistent:nr}),t}var Ui={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ya=Oe(Ui),Yn=q({},Ui,{view:0,detail:0}),Vg=Oe(Yn),va,ba,Hn,sr=q({},Yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ka,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Hn&&(Hn&&e.type==="mousemove"?(va=e.screenX-Hn.screenX,ba=e.screenY-Hn.screenY):ba=va=0,Hn=e),va)},movementY:function(e){return"movementY"in e?e.movementY:ba}}),vf=Oe(sr),_g=q({},sr,{dataTransfer:0}),Yg=Oe(_g),Hg=q({},Yn,{relatedTarget:0}),wa=Oe(Hg),qg=q({},Ui,{animationName:0,elapsedTime:0,pseudoElement:0}),$g=Oe(qg),Kg=q({},Ui,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qg=Oe(Kg),Gg=q({},Ui,{data:0}),bf=Oe(Gg),Xg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Jg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function em(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zg[e])?!!t[e]:!1}function ka(){return em}var tm=q({},Yn,{key:function(e){if(e.key){var t=Xg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ir(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Jg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ka,charCode:function(e){return e.type==="keypress"?ir(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ir(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),im=Oe(tm),nm=q({},sr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wf=Oe(nm),sm=q({},Yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ka}),rm=Oe(sm),om=q({},Ui,{propertyName:0,elapsedTime:0,pseudoElement:0}),am=Oe(om),lm=q({},sr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),dm=Oe(lm),cm=[9,13,27,32],Sa=Et&&"CompositionEvent"in window,qn=null;Et&&"documentMode"in document&&(qn=document.documentMode);var fm=Et&&"TextEvent"in window&&!qn,kf=Et&&(!Sa||qn&&8<qn&&11>=qn),Sf=" ",Ef=!1;function Cf(e,t){switch(e){case"keyup":return cm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vi=!1;function pm(e,t){switch(e){case"compositionend":return Tf(t);case"keypress":return t.which!==32?null:(Ef=!0,Sf);case"textInput":return e=t.data,e===Sf&&Ef?null:e;default:return null}}function um(e,t){if(Vi)return e==="compositionend"||!Sa&&Cf(e,t)?(e=mf(),tr=ma=Ut=null,Vi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return kf&&t.locale!=="ko"?null:t.data;default:return null}}var hm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Af(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hm[e.type]:t==="textarea"}function zf(e,t,i,n){$c(n),t=dr(t,"onChange"),0<t.length&&(i=new ya("onChange","change",null,i,n),e.push({event:i,listeners:t}))}var $n=null,Kn=null;function xm(e){qf(e,0)}function rr(e){var t=$i(e);if(Lc(t))return e}function gm(e,t){if(e==="change")return t}var Rf=!1;if(Et){var Ea;if(Et){var Ca="oninput"in document;if(!Ca){var Df=document.createElement("div");Df.setAttribute("oninput","return;"),Ca=typeof Df.oninput=="function"}Ea=Ca}else Ea=!1;Rf=Ea&&(!document.documentMode||9<document.documentMode)}function jf(){$n&&($n.detachEvent("onpropertychange",Mf),Kn=$n=null)}function Mf(e){if(e.propertyName==="value"&&rr(Kn)){var t=[];zf(t,Kn,e,sa(e)),Xc(xm,t)}}function mm(e,t,i){e==="focusin"?(jf(),$n=t,Kn=i,$n.attachEvent("onpropertychange",Mf)):e==="focusout"&&jf()}function ym(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return rr(Kn)}function vm(e,t){if(e==="click")return rr(t)}function bm(e,t){if(e==="input"||e==="change")return rr(t)}function wm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var tt=typeof Object.is=="function"?Object.is:wm;function Qn(e,t){if(tt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var i=Object.keys(e),n=Object.keys(t);if(i.length!==n.length)return!1;for(n=0;n<i.length;n++){var s=i[n];if(!Io.call(t,s)||!tt(e[s],t[s]))return!1}return!0}function Nf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Pf(e,t){var i=Nf(e);e=0;for(var n;i;){if(i.nodeType===3){if(n=e+i.textContent.length,e<=t&&n>=t)return{node:i,offset:t-e};e=n}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Nf(i)}}function Lf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Lf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function If(){for(var e=window,t=Vs();t instanceof e.HTMLIFrameElement;){try{var i=typeof t.contentWindow.location.href=="string"}catch{i=!1}if(i)e=t.contentWindow;else break;t=Vs(e.document)}return t}function Ta(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function km(e){var t=If(),i=e.focusedElem,n=e.selectionRange;if(t!==i&&i&&i.ownerDocument&&Lf(i.ownerDocument.documentElement,i)){if(n!==null&&Ta(i)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in i)i.selectionStart=t,i.selectionEnd=Math.min(e,i.value.length);else if(e=(t=i.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=i.textContent.length,r=Math.min(n.start,s);n=n.end===void 0?r:Math.min(n.end,s),!e.extend&&r>n&&(s=n,n=r,r=s),s=Pf(i,r);var o=Pf(i,n);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),r>n?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=i;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<t.length;i++)e=t[i],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Sm=Et&&"documentMode"in document&&11>=document.documentMode,_i=null,Aa=null,Gn=null,za=!1;function Of(e,t,i){var n=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;za||_i==null||_i!==Vs(n)||(n=_i,"selectionStart"in n&&Ta(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Gn&&Qn(Gn,n)||(Gn=n,n=dr(Aa,"onSelect"),0<n.length&&(t=new ya("onSelect","select",null,t,i),e.push({event:t,listeners:n}),t.target=_i)))}function or(e,t){var i={};return i[e.toLowerCase()]=t.toLowerCase(),i["Webkit"+e]="webkit"+t,i["Moz"+e]="moz"+t,i}var Yi={animationend:or("Animation","AnimationEnd"),animationiteration:or("Animation","AnimationIteration"),animationstart:or("Animation","AnimationStart"),transitionend:or("Transition","TransitionEnd")},Ra={},Bf={};Et&&(Bf=document.createElement("div").style,"AnimationEvent"in window||(delete Yi.animationend.animation,delete Yi.animationiteration.animation,delete Yi.animationstart.animation),"TransitionEvent"in window||delete Yi.transitionend.transition);function ar(e){if(Ra[e])return Ra[e];if(!Yi[e])return e;var t=Yi[e],i;for(i in t)if(t.hasOwnProperty(i)&&i in Bf)return Ra[e]=t[i];return e}var Ff=ar("animationend"),Wf=ar("animationiteration"),Uf=ar("animationstart"),Vf=ar("transitionend"),_f=new Map,Yf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Vt(e,t){_f.set(e,t),li(t,[e])}for(var Da=0;Da<Yf.length;Da++){var ja=Yf[Da],Em=ja.toLowerCase(),Cm=ja[0].toUpperCase()+ja.slice(1);Vt(Em,"on"+Cm)}Vt(Ff,"onAnimationEnd"),Vt(Wf,"onAnimationIteration"),Vt(Uf,"onAnimationStart"),Vt("dblclick","onDoubleClick"),Vt("focusin","onFocus"),Vt("focusout","onBlur"),Vt(Vf,"onTransitionEnd"),Pi("onMouseEnter",["mouseout","mouseover"]),Pi("onMouseLeave",["mouseout","mouseover"]),Pi("onPointerEnter",["pointerout","pointerover"]),Pi("onPointerLeave",["pointerout","pointerover"]),li("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),li("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),li("onBeforeInput",["compositionend","keypress","textInput","paste"]),li("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),li("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),li("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Tm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xn));function Hf(e,t,i){var n=e.type||"unknown-event";e.currentTarget=i,Eg(n,t,void 0,e),e.currentTarget=null}function qf(e,t){t=(t&4)!==0;for(var i=0;i<e.length;i++){var n=e[i],s=n.event;n=n.listeners;e:{var r=void 0;if(t)for(var o=n.length-1;0<=o;o--){var l=n[o],d=l.instance,c=l.currentTarget;if(l=l.listener,d!==r&&s.isPropagationStopped())break e;Hf(s,l,c),r=d}else for(o=0;o<n.length;o++){if(l=n[o],d=l.instance,c=l.currentTarget,l=l.listener,d!==r&&s.isPropagationStopped())break e;Hf(s,l,c),r=d}}}if(Hs)throw e=la,Hs=!1,la=null,e}function _(e,t){var i=t[Fa];i===void 0&&(i=t[Fa]=new Set);var n=e+"__bubble";i.has(n)||($f(t,e,2,!1),i.add(n))}function Ma(e,t,i){var n=0;t&&(n|=4),$f(i,e,n,t)}var lr="_reactListening"+Math.random().toString(36).slice(2);function Jn(e){if(!e[lr]){e[lr]=!0,Ac.forEach(function(i){i!=="selectionchange"&&(Tm.has(i)||Ma(i,!1,e),Ma(i,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[lr]||(t[lr]=!0,Ma("selectionchange",!1,t))}}function $f(e,t,i,n){switch(gf(t)){case 1:var s=Wg;break;case 4:s=Ug;break;default:s=xa}i=s.bind(null,t,i,e),s=void 0,!aa||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),n?s!==void 0?e.addEventListener(t,i,{capture:!0,passive:s}):e.addEventListener(t,i,!0):s!==void 0?e.addEventListener(t,i,{passive:s}):e.addEventListener(t,i,!1)}function Na(e,t,i,n,s){var r=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var l=n.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=n.return;o!==null;){var d=o.tag;if((d===3||d===4)&&(d=o.stateNode.containerInfo,d===s||d.nodeType===8&&d.parentNode===s))return;o=o.return}for(;l!==null;){if(o=ci(l),o===null)return;if(d=o.tag,d===5||d===6){n=r=o;continue e}l=l.parentNode}}n=n.return}Xc(function(){var c=r,f=sa(i),p=[];e:{var u=_f.get(e);if(u!==void 0){var v=ya,g=e;switch(e){case"keypress":if(ir(i)===0)break e;case"keydown":case"keyup":v=im;break;case"focusin":g="focus",v=wa;break;case"focusout":g="blur",v=wa;break;case"beforeblur":case"afterblur":v=wa;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=vf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Yg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=rm;break;case Ff:case Wf:case Uf:v=$g;break;case Vf:v=am;break;case"scroll":v=Vg;break;case"wheel":v=dm;break;case"copy":case"cut":case"paste":v=Qg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=wf}var m=(t&4)!==0,b=!m&&e==="scroll",h=m?u!==null?u+"Capture":null:u;m=[];for(var x=c,y;x!==null;){y=x;var w=y.stateNode;if(y.tag===5&&w!==null&&(y=w,h!==null&&(w=Pn(x,h),w!=null&&m.push(Zn(x,w,y)))),b)break;x=x.return}0<m.length&&(u=new v(u,g,null,i,f),p.push({event:u,listeners:m}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",u&&i!==na&&(g=i.relatedTarget||i.fromElement)&&(ci(g)||g[Tt]))break e;if((v||u)&&(u=f.window===f?f:(u=f.ownerDocument)?u.defaultView||u.parentWindow:window,v?(g=i.relatedTarget||i.toElement,v=c,g=g?ci(g):null,g!==null&&(b=di(g),g!==b||g.tag!==5&&g.tag!==6)&&(g=null)):(v=null,g=c),v!==g)){if(m=vf,w="onMouseLeave",h="onMouseEnter",x="mouse",(e==="pointerout"||e==="pointerover")&&(m=wf,w="onPointerLeave",h="onPointerEnter",x="pointer"),b=v==null?u:$i(v),y=g==null?u:$i(g),u=new m(w,x+"leave",v,i,f),u.target=b,u.relatedTarget=y,w=null,ci(f)===c&&(m=new m(h,x+"enter",g,i,f),m.target=y,m.relatedTarget=b,w=m),b=w,v&&g)t:{for(m=v,h=g,x=0,y=m;y;y=Hi(y))x++;for(y=0,w=h;w;w=Hi(w))y++;for(;0<x-y;)m=Hi(m),x--;for(;0<y-x;)h=Hi(h),y--;for(;x--;){if(m===h||h!==null&&m===h.alternate)break t;m=Hi(m),h=Hi(h)}m=null}else m=null;v!==null&&Kf(p,u,v,m,!1),g!==null&&b!==null&&Kf(p,b,g,m,!0)}}e:{if(u=c?$i(c):window,v=u.nodeName&&u.nodeName.toLowerCase(),v==="select"||v==="input"&&u.type==="file")var S=gm;else if(Af(u))if(Rf)S=bm;else{S=ym;var E=mm}else(v=u.nodeName)&&v.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(S=vm);if(S&&(S=S(e,c))){zf(p,S,i,f);break e}E&&E(e,u,c),e==="focusout"&&(E=u._wrapperState)&&E.controlled&&u.type==="number"&&Jo(u,"number",u.value)}switch(E=c?$i(c):window,e){case"focusin":(Af(E)||E.contentEditable==="true")&&(_i=E,Aa=c,Gn=null);break;case"focusout":Gn=Aa=_i=null;break;case"mousedown":za=!0;break;case"contextmenu":case"mouseup":case"dragend":za=!1,Of(p,i,f);break;case"selectionchange":if(Sm)break;case"keydown":case"keyup":Of(p,i,f)}var C;if(Sa)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Vi?Cf(e,i)&&(T="onCompositionEnd"):e==="keydown"&&i.keyCode===229&&(T="onCompositionStart");T&&(kf&&i.locale!=="ko"&&(Vi||T!=="onCompositionStart"?T==="onCompositionEnd"&&Vi&&(C=mf()):(Ut=f,ma="value"in Ut?Ut.value:Ut.textContent,Vi=!0)),E=dr(c,T),0<E.length&&(T=new bf(T,e,null,i,f),p.push({event:T,listeners:E}),C?T.data=C:(C=Tf(i),C!==null&&(T.data=C)))),(C=fm?pm(e,i):um(e,i))&&(c=dr(c,"onBeforeInput"),0<c.length&&(f=new bf("onBeforeInput","beforeinput",null,i,f),p.push({event:f,listeners:c}),f.data=C))}qf(p,t)})}function Zn(e,t,i){return{instance:e,listener:t,currentTarget:i}}function dr(e,t){for(var i=t+"Capture",n=[];e!==null;){var s=e,r=s.stateNode;s.tag===5&&r!==null&&(s=r,r=Pn(e,i),r!=null&&n.unshift(Zn(e,r,s)),r=Pn(e,t),r!=null&&n.push(Zn(e,r,s))),e=e.return}return n}function Hi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Kf(e,t,i,n,s){for(var r=t._reactName,o=[];i!==null&&i!==n;){var l=i,d=l.alternate,c=l.stateNode;if(d!==null&&d===n)break;l.tag===5&&c!==null&&(l=c,s?(d=Pn(i,r),d!=null&&o.unshift(Zn(i,d,l))):s||(d=Pn(i,r),d!=null&&o.push(Zn(i,d,l)))),i=i.return}o.length!==0&&e.push({event:t,listeners:o})}var Am=/\r\n?/g,zm=/\u0000|\uFFFD/g;function Qf(e){return(typeof e=="string"?e:""+e).replace(Am,`
`).replace(zm,"")}function cr(e,t,i){if(t=Qf(t),Qf(e)!==t&&i)throw Error(A(425))}function fr(){}var Pa=null,La=null;function Ia(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Oa=typeof setTimeout=="function"?setTimeout:void 0,Rm=typeof clearTimeout=="function"?clearTimeout:void 0,Gf=typeof Promise=="function"?Promise:void 0,Dm=typeof queueMicrotask=="function"?queueMicrotask:typeof Gf<"u"?function(e){return Gf.resolve(null).then(e).catch(jm)}:Oa;function jm(e){setTimeout(function(){throw e})}function Ba(e,t){var i=t,n=0;do{var s=i.nextSibling;if(e.removeChild(i),s&&s.nodeType===8)if(i=s.data,i==="/$"){if(n===0){e.removeChild(s),_n(t);return}n--}else i!=="$"&&i!=="$?"&&i!=="$!"||n++;i=s}while(i);_n(t)}function _t(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Xf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="$"||i==="$!"||i==="$?"){if(t===0)return e;t--}else i==="/$"&&t++}e=e.previousSibling}return null}var qi=Math.random().toString(36).slice(2),ut="__reactFiber$"+qi,es="__reactProps$"+qi,Tt="__reactContainer$"+qi,Fa="__reactEvents$"+qi,Mm="__reactListeners$"+qi,Nm="__reactHandles$"+qi;function ci(e){var t=e[ut];if(t)return t;for(var i=e.parentNode;i;){if(t=i[Tt]||i[ut]){if(i=t.alternate,t.child!==null||i!==null&&i.child!==null)for(e=Xf(e);e!==null;){if(i=e[ut])return i;e=Xf(e)}return t}e=i,i=e.parentNode}return null}function ts(e){return e=e[ut]||e[Tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function $i(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(A(33))}function pr(e){return e[es]||null}var Wa=[],Ki=-1;function Yt(e){return{current:e}}function Y(e){0>Ki||(e.current=Wa[Ki],Wa[Ki]=null,Ki--)}function V(e,t){Ki++,Wa[Ki]=e.current,e.current=t}var Ht={},me=Yt(Ht),ze=Yt(!1),fi=Ht;function Qi(e,t){var i=e.type.contextTypes;if(!i)return Ht;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var s={},r;for(r in i)s[r]=t[r];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Re(e){return e=e.childContextTypes,e!=null}function ur(){Y(ze),Y(me)}function Jf(e,t,i){if(me.current!==Ht)throw Error(A(168));V(me,t),V(ze,i)}function Zf(e,t,i){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return i;n=n.getChildContext();for(var s in n)if(!(s in t))throw Error(A(108,mg(e)||"Unknown",s));return q({},i,n)}function hr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ht,fi=me.current,V(me,e),V(ze,ze.current),!0}function ep(e,t,i){var n=e.stateNode;if(!n)throw Error(A(169));i?(e=Zf(e,t,fi),n.__reactInternalMemoizedMergedChildContext=e,Y(ze),Y(me),V(me,e)):Y(ze),V(ze,i)}var At=null,xr=!1,Ua=!1;function tp(e){At===null?At=[e]:At.push(e)}function Pm(e){xr=!0,tp(e)}function qt(){if(!Ua&&At!==null){Ua=!0;var e=0,t=B;try{var i=At;for(B=1;e<i.length;e++){var n=i[e];do n=n(!0);while(n!==null)}At=null,xr=!1}catch(s){throw At!==null&&(At=At.slice(e+1)),nf(da,qt),s}finally{B=t,Ua=!1}}return null}var Gi=[],Xi=0,gr=null,mr=0,_e=[],Ye=0,pi=null,zt=1,Rt="";function ui(e,t){Gi[Xi++]=mr,Gi[Xi++]=gr,gr=e,mr=t}function ip(e,t,i){_e[Ye++]=zt,_e[Ye++]=Rt,_e[Ye++]=pi,pi=e;var n=zt;e=Rt;var s=32-et(n)-1;n&=~(1<<s),i+=1;var r=32-et(t)+s;if(30<r){var o=s-s%5;r=(n&(1<<o)-1).toString(32),n>>=o,s-=o,zt=1<<32-et(t)+s|i<<s|n,Rt=r+e}else zt=1<<r|i<<s|n,Rt=e}function Va(e){e.return!==null&&(ui(e,1),ip(e,1,0))}function _a(e){for(;e===gr;)gr=Gi[--Xi],Gi[Xi]=null,mr=Gi[--Xi],Gi[Xi]=null;for(;e===pi;)pi=_e[--Ye],_e[Ye]=null,Rt=_e[--Ye],_e[Ye]=null,zt=_e[--Ye],_e[Ye]=null}var Be=null,Fe=null,H=!1,it=null;function np(e,t){var i=Ke(5,null,null,0);i.elementType="DELETED",i.stateNode=t,i.return=e,t=e.deletions,t===null?(e.deletions=[i],e.flags|=16):t.push(i)}function sp(e,t){switch(e.tag){case 5:var i=e.type;return t=t.nodeType!==1||i.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Be=e,Fe=_t(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Be=e,Fe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(i=pi!==null?{id:zt,overflow:Rt}:null,e.memoizedState={dehydrated:t,treeContext:i,retryLane:1073741824},i=Ke(18,null,null,0),i.stateNode=t,i.return=e,e.child=i,Be=e,Fe=null,!0):!1;default:return!1}}function Ya(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ha(e){if(H){var t=Fe;if(t){var i=t;if(!sp(e,t)){if(Ya(e))throw Error(A(418));t=_t(i.nextSibling);var n=Be;t&&sp(e,t)?np(n,i):(e.flags=e.flags&-4097|2,H=!1,Be=e)}}else{if(Ya(e))throw Error(A(418));e.flags=e.flags&-4097|2,H=!1,Be=e}}}function rp(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Be=e}function yr(e){if(e!==Be)return!1;if(!H)return rp(e),H=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ia(e.type,e.memoizedProps)),t&&(t=Fe)){if(Ya(e))throw op(),Error(A(418));for(;t;)np(e,t),t=_t(t.nextSibling)}if(rp(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="/$"){if(t===0){Fe=_t(e.nextSibling);break e}t--}else i!=="$"&&i!=="$!"&&i!=="$?"||t++}e=e.nextSibling}Fe=null}}else Fe=Be?_t(e.stateNode.nextSibling):null;return!0}function op(){for(var e=Fe;e;)e=_t(e.nextSibling)}function Ji(){Fe=Be=null,H=!1}function qa(e){it===null?it=[e]:it.push(e)}var Lm=Ct.ReactCurrentBatchConfig;function is(e,t,i){if(e=i.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(i._owner){if(i=i._owner,i){if(i.tag!==1)throw Error(A(309));var n=i.stateNode}if(!n)throw Error(A(147,e));var s=n,r=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===r?t.ref:(t=function(o){var l=s.refs;o===null?delete l[r]:l[r]=o},t._stringRef=r,t)}if(typeof e!="string")throw Error(A(284));if(!i._owner)throw Error(A(290,e))}return e}function vr(e,t){throw e=Object.prototype.toString.call(t),Error(A(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ap(e){var t=e._init;return t(e._payload)}function lp(e){function t(h,x){if(e){var y=h.deletions;y===null?(h.deletions=[x],h.flags|=16):y.push(x)}}function i(h,x){if(!e)return null;for(;x!==null;)t(h,x),x=x.sibling;return null}function n(h,x){for(h=new Map;x!==null;)x.key!==null?h.set(x.key,x):h.set(x.index,x),x=x.sibling;return h}function s(h,x){return h=ei(h,x),h.index=0,h.sibling=null,h}function r(h,x,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<x?(h.flags|=2,x):y):(h.flags|=2,x)):(h.flags|=1048576,x)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function l(h,x,y,w){return x===null||x.tag!==6?(x=Ol(y,h.mode,w),x.return=h,x):(x=s(x,y),x.return=h,x)}function d(h,x,y,w){var S=y.type;return S===Ii?f(h,x,y.props.children,w,y.key):x!==null&&(x.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Lt&&ap(S)===x.type)?(w=s(x,y.props),w.ref=is(h,x,y),w.return=h,w):(w=_r(y.type,y.key,y.props,null,h.mode,w),w.ref=is(h,x,y),w.return=h,w)}function c(h,x,y,w){return x===null||x.tag!==4||x.stateNode.containerInfo!==y.containerInfo||x.stateNode.implementation!==y.implementation?(x=Bl(y,h.mode,w),x.return=h,x):(x=s(x,y.children||[]),x.return=h,x)}function f(h,x,y,w,S){return x===null||x.tag!==7?(x=wi(y,h.mode,w,S),x.return=h,x):(x=s(x,y),x.return=h,x)}function p(h,x,y){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Ol(""+x,h.mode,y),x.return=h,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ws:return y=_r(x.type,x.key,x.props,null,h.mode,y),y.ref=is(h,null,x),y.return=h,y;case Li:return x=Bl(x,h.mode,y),x.return=h,x;case Lt:var w=x._init;return p(h,w(x._payload),y)}if(jn(x)||Rn(x))return x=wi(x,h.mode,y,null),x.return=h,x;vr(h,x)}return null}function u(h,x,y,w){var S=x!==null?x.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return S!==null?null:l(h,x,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ws:return y.key===S?d(h,x,y,w):null;case Li:return y.key===S?c(h,x,y,w):null;case Lt:return S=y._init,u(h,x,S(y._payload),w)}if(jn(y)||Rn(y))return S!==null?null:f(h,x,y,w,null);vr(h,y)}return null}function v(h,x,y,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return h=h.get(y)||null,l(x,h,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Ws:return h=h.get(w.key===null?y:w.key)||null,d(x,h,w,S);case Li:return h=h.get(w.key===null?y:w.key)||null,c(x,h,w,S);case Lt:var E=w._init;return v(h,x,y,E(w._payload),S)}if(jn(w)||Rn(w))return h=h.get(y)||null,f(x,h,w,S,null);vr(x,w)}return null}function g(h,x,y,w){for(var S=null,E=null,C=x,T=x=0,P=null;C!==null&&T<y.length;T++){C.index>T?(P=C,C=null):P=C.sibling;var z=u(h,C,y[T],w);if(z===null){C===null&&(C=P);break}e&&C&&z.alternate===null&&t(h,C),x=r(z,x,T),E===null?S=z:E.sibling=z,E=z,C=P}if(T===y.length)return i(h,C),H&&ui(h,T),S;if(C===null){for(;T<y.length;T++)C=p(h,y[T],w),C!==null&&(x=r(C,x,T),E===null?S=C:E.sibling=C,E=C);return H&&ui(h,T),S}for(C=n(h,C);T<y.length;T++)P=v(C,h,T,y[T],w),P!==null&&(e&&P.alternate!==null&&C.delete(P.key===null?T:P.key),x=r(P,x,T),E===null?S=P:E.sibling=P,E=P);return e&&C.forEach(function(O){return t(h,O)}),H&&ui(h,T),S}function m(h,x,y,w){var S=Rn(y);if(typeof S!="function")throw Error(A(150));if(y=S.call(y),y==null)throw Error(A(151));for(var E=S=null,C=x,T=x=0,P=null,z=y.next();C!==null&&!z.done;T++,z=y.next()){C.index>T?(P=C,C=null):P=C.sibling;var O=u(h,C,z.value,w);if(O===null){C===null&&(C=P);break}e&&C&&O.alternate===null&&t(h,C),x=r(O,x,T),E===null?S=O:E.sibling=O,E=O,C=P}if(z.done)return i(h,C),H&&ui(h,T),S;if(C===null){for(;!z.done;T++,z=y.next())z=p(h,z.value,w),z!==null&&(x=r(z,x,T),E===null?S=z:E.sibling=z,E=z);return H&&ui(h,T),S}for(C=n(h,C);!z.done;T++,z=y.next())z=v(C,h,T,z.value,w),z!==null&&(e&&z.alternate!==null&&C.delete(z.key===null?T:z.key),x=r(z,x,T),E===null?S=z:E.sibling=z,E=z);return e&&C.forEach(function(ne){return t(h,ne)}),H&&ui(h,T),S}function b(h,x,y,w){if(typeof y=="object"&&y!==null&&y.type===Ii&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Ws:e:{for(var S=y.key,E=x;E!==null;){if(E.key===S){if(S=y.type,S===Ii){if(E.tag===7){i(h,E.sibling),x=s(E,y.props.children),x.return=h,h=x;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Lt&&ap(S)===E.type){i(h,E.sibling),x=s(E,y.props),x.ref=is(h,E,y),x.return=h,h=x;break e}i(h,E);break}else t(h,E);E=E.sibling}y.type===Ii?(x=wi(y.props.children,h.mode,w,y.key),x.return=h,h=x):(w=_r(y.type,y.key,y.props,null,h.mode,w),w.ref=is(h,x,y),w.return=h,h=w)}return o(h);case Li:e:{for(E=y.key;x!==null;){if(x.key===E)if(x.tag===4&&x.stateNode.containerInfo===y.containerInfo&&x.stateNode.implementation===y.implementation){i(h,x.sibling),x=s(x,y.children||[]),x.return=h,h=x;break e}else{i(h,x);break}else t(h,x);x=x.sibling}x=Bl(y,h.mode,w),x.return=h,h=x}return o(h);case Lt:return E=y._init,b(h,x,E(y._payload),w)}if(jn(y))return g(h,x,y,w);if(Rn(y))return m(h,x,y,w);vr(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,x!==null&&x.tag===6?(i(h,x.sibling),x=s(x,y),x.return=h,h=x):(i(h,x),x=Ol(y,h.mode,w),x.return=h,h=x),o(h)):i(h,x)}return b}var Zi=lp(!0),dp=lp(!1),br=Yt(null),wr=null,en=null,$a=null;function Ka(){$a=en=wr=null}function Qa(e){var t=br.current;Y(br),e._currentValue=t}function Ga(e,t,i){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===i)break;e=e.return}}function tn(e,t){wr=e,$a=en=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(De=!0),e.firstContext=null)}function He(e){var t=e._currentValue;if($a!==e)if(e={context:e,memoizedValue:t,next:null},en===null){if(wr===null)throw Error(A(308));en=e,wr.dependencies={lanes:0,firstContext:e}}else en=en.next=e;return t}var hi=null;function Xa(e){hi===null?hi=[e]:hi.push(e)}function cp(e,t,i,n){var s=t.interleaved;return s===null?(i.next=i,Xa(t)):(i.next=s.next,s.next=i),t.interleaved=i,Dt(e,n)}function Dt(e,t){e.lanes|=t;var i=e.alternate;for(i!==null&&(i.lanes|=t),i=e,e=e.return;e!==null;)e.childLanes|=t,i=e.alternate,i!==null&&(i.childLanes|=t),i=e,e=e.return;return i.tag===3?i.stateNode:null}var $t=!1;function Ja(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function jt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Kt(e,t,i){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,I&2){var s=n.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),n.pending=t,Dt(e,i)}return s=n.interleaved,s===null?(t.next=t,Xa(n)):(t.next=s.next,s.next=t),n.interleaved=t,Dt(e,i)}function kr(e,t,i){if(t=t.updateQueue,t!==null&&(t=t.shared,(i&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,pa(e,i)}}function pp(e,t){var i=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,i===n)){var s=null,r=null;if(i=i.firstBaseUpdate,i!==null){do{var o={eventTime:i.eventTime,lane:i.lane,tag:i.tag,payload:i.payload,callback:i.callback,next:null};r===null?s=r=o:r=r.next=o,i=i.next}while(i!==null);r===null?s=r=t:r=r.next=t}else s=r=t;i={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:n.shared,effects:n.effects},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=t:e.next=t,i.lastBaseUpdate=t}function Sr(e,t,i,n){var s=e.updateQueue;$t=!1;var r=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var d=l,c=d.next;d.next=null,o===null?r=c:o.next=c,o=d;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=d))}if(r!==null){var p=s.baseState;o=0,f=c=d=null,l=r;do{var u=l.lane,v=l.eventTime;if((n&u)===u){f!==null&&(f=f.next={eventTime:v,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var g=e,m=l;switch(u=t,v=i,m.tag){case 1:if(g=m.payload,typeof g=="function"){p=g.call(v,p,u);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=m.payload,u=typeof g=="function"?g.call(v,p,u):g,u==null)break e;p=q({},p,u);break e;case 2:$t=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else v={eventTime:v,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=v,d=p):f=f.next=v,o|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(f===null&&(d=p),s.baseState=d,s.firstBaseUpdate=c,s.lastBaseUpdate=f,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else r===null&&(s.shared.lanes=0);mi|=o,e.lanes=o,e.memoizedState=p}}function up(e,t,i){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],s=n.callback;if(s!==null){if(n.callback=null,n=i,typeof s!="function")throw Error(A(191,s));s.call(n)}}}var ns={},ht=Yt(ns),ss=Yt(ns),rs=Yt(ns);function xi(e){if(e===ns)throw Error(A(174));return e}function Za(e,t){switch(V(rs,t),V(ss,e),V(ht,ns),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ea(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ea(t,e)}Y(ht),V(ht,t)}function nn(){Y(ht),Y(ss),Y(rs)}function hp(e){xi(rs.current);var t=xi(ht.current),i=ea(t,e.type);t!==i&&(V(ss,e),V(ht,i))}function el(e){ss.current===e&&(Y(ht),Y(ss))}var $=Yt(0);function Er(e){for(var t=e;t!==null;){if(t.tag===13){var i=t.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||i.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var tl=[];function il(){for(var e=0;e<tl.length;e++)tl[e]._workInProgressVersionPrimary=null;tl.length=0}var Cr=Ct.ReactCurrentDispatcher,nl=Ct.ReactCurrentBatchConfig,gi=0,K=null,re=null,de=null,Tr=!1,os=!1,as=0,Im=0;function ye(){throw Error(A(321))}function sl(e,t){if(t===null)return!1;for(var i=0;i<t.length&&i<e.length;i++)if(!tt(e[i],t[i]))return!1;return!0}function rl(e,t,i,n,s,r){if(gi=r,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Cr.current=e===null||e.memoizedState===null?Wm:Um,e=i(n,s),os){r=0;do{if(os=!1,as=0,25<=r)throw Error(A(301));r+=1,de=re=null,t.updateQueue=null,Cr.current=Vm,e=i(n,s)}while(os)}if(Cr.current=Rr,t=re!==null&&re.next!==null,gi=0,de=re=K=null,Tr=!1,t)throw Error(A(300));return e}function ol(){var e=as!==0;return as=0,e}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?K.memoizedState=de=e:de=de.next=e,de}function qe(){if(re===null){var e=K.alternate;e=e!==null?e.memoizedState:null}else e=re.next;var t=de===null?K.memoizedState:de.next;if(t!==null)de=t,re=e;else{if(e===null)throw Error(A(310));re=e,e={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},de===null?K.memoizedState=de=e:de=de.next=e}return de}function ls(e,t){return typeof t=="function"?t(e):t}function al(e){var t=qe(),i=t.queue;if(i===null)throw Error(A(311));i.lastRenderedReducer=e;var n=re,s=n.baseQueue,r=i.pending;if(r!==null){if(s!==null){var o=s.next;s.next=r.next,r.next=o}n.baseQueue=s=r,i.pending=null}if(s!==null){r=s.next,n=n.baseState;var l=o=null,d=null,c=r;do{var f=c.lane;if((gi&f)===f)d!==null&&(d=d.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),n=c.hasEagerState?c.eagerState:e(n,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};d===null?(l=d=p,o=n):d=d.next=p,K.lanes|=f,mi|=f}c=c.next}while(c!==null&&c!==r);d===null?o=n:d.next=l,tt(n,t.memoizedState)||(De=!0),t.memoizedState=n,t.baseState=o,t.baseQueue=d,i.lastRenderedState=n}if(e=i.interleaved,e!==null){s=e;do r=s.lane,K.lanes|=r,mi|=r,s=s.next;while(s!==e)}else s===null&&(i.lanes=0);return[t.memoizedState,i.dispatch]}function ll(e){var t=qe(),i=t.queue;if(i===null)throw Error(A(311));i.lastRenderedReducer=e;var n=i.dispatch,s=i.pending,r=t.memoizedState;if(s!==null){i.pending=null;var o=s=s.next;do r=e(r,o.action),o=o.next;while(o!==s);tt(r,t.memoizedState)||(De=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),i.lastRenderedState=r}return[r,n]}function xp(){}function gp(e,t){var i=K,n=qe(),s=t(),r=!tt(n.memoizedState,s);if(r&&(n.memoizedState=s,De=!0),n=n.queue,dl(vp.bind(null,i,n,e),[e]),n.getSnapshot!==t||r||de!==null&&de.memoizedState.tag&1){if(i.flags|=2048,ds(9,yp.bind(null,i,n,s,t),void 0,null),ce===null)throw Error(A(349));gi&30||mp(i,t,s)}return s}function mp(e,t,i){e.flags|=16384,e={getSnapshot:t,value:i},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.stores=[e]):(i=t.stores,i===null?t.stores=[e]:i.push(e))}function yp(e,t,i,n){t.value=i,t.getSnapshot=n,bp(t)&&wp(e)}function vp(e,t,i){return i(function(){bp(t)&&wp(e)})}function bp(e){var t=e.getSnapshot;e=e.value;try{var i=t();return!tt(e,i)}catch{return!0}}function wp(e){var t=Dt(e,1);t!==null&&ot(t,e,1,-1)}function kp(e){var t=xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t.queue=e,e=e.dispatch=Fm.bind(null,K,e),[t.memoizedState,e]}function ds(e,t,i,n){return e={tag:e,create:t,destroy:i,deps:n,next:null},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.lastEffect=e.next=e):(i=t.lastEffect,i===null?t.lastEffect=e.next=e:(n=i.next,i.next=e,e.next=n,t.lastEffect=e)),e}function Sp(){return qe().memoizedState}function Ar(e,t,i,n){var s=xt();K.flags|=e,s.memoizedState=ds(1|t,i,void 0,n===void 0?null:n)}function zr(e,t,i,n){var s=qe();n=n===void 0?null:n;var r=void 0;if(re!==null){var o=re.memoizedState;if(r=o.destroy,n!==null&&sl(n,o.deps)){s.memoizedState=ds(t,i,r,n);return}}K.flags|=e,s.memoizedState=ds(1|t,i,r,n)}function Ep(e,t){return Ar(8390656,8,e,t)}function dl(e,t){return zr(2048,8,e,t)}function Cp(e,t){return zr(4,2,e,t)}function Tp(e,t){return zr(4,4,e,t)}function Ap(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function zp(e,t,i){return i=i!=null?i.concat([e]):null,zr(4,4,Ap.bind(null,t,e),i)}function cl(){}function Rp(e,t){var i=qe();t=t===void 0?null:t;var n=i.memoizedState;return n!==null&&t!==null&&sl(t,n[1])?n[0]:(i.memoizedState=[e,t],e)}function Dp(e,t){var i=qe();t=t===void 0?null:t;var n=i.memoizedState;return n!==null&&t!==null&&sl(t,n[1])?n[0]:(e=e(),i.memoizedState=[e,t],e)}function jp(e,t,i){return gi&21?(tt(i,t)||(i=af(),K.lanes|=i,mi|=i,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,De=!0),e.memoizedState=i)}function Om(e,t){var i=B;B=i!==0&&4>i?i:4,e(!0);var n=nl.transition;nl.transition={};try{e(!1),t()}finally{B=i,nl.transition=n}}function Mp(){return qe().memoizedState}function Bm(e,t,i){var n=Jt(e);if(i={lane:n,action:i,hasEagerState:!1,eagerState:null,next:null},Np(e))Pp(t,i);else if(i=cp(e,t,i,n),i!==null){var s=Ce();ot(i,e,n,s),Lp(i,t,n)}}function Fm(e,t,i){var n=Jt(e),s={lane:n,action:i,hasEagerState:!1,eagerState:null,next:null};if(Np(e))Pp(t,s);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var o=t.lastRenderedState,l=r(o,i);if(s.hasEagerState=!0,s.eagerState=l,tt(l,o)){var d=t.interleaved;d===null?(s.next=s,Xa(t)):(s.next=d.next,d.next=s),t.interleaved=s;return}}catch{}finally{}i=cp(e,t,s,n),i!==null&&(s=Ce(),ot(i,e,n,s),Lp(i,t,n))}}function Np(e){var t=e.alternate;return e===K||t!==null&&t===K}function Pp(e,t){os=Tr=!0;var i=e.pending;i===null?t.next=t:(t.next=i.next,i.next=t),e.pending=t}function Lp(e,t,i){if(i&4194240){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,pa(e,i)}}var Rr={readContext:He,useCallback:ye,useContext:ye,useEffect:ye,useImperativeHandle:ye,useInsertionEffect:ye,useLayoutEffect:ye,useMemo:ye,useReducer:ye,useRef:ye,useState:ye,useDebugValue:ye,useDeferredValue:ye,useTransition:ye,useMutableSource:ye,useSyncExternalStore:ye,useId:ye,unstable_isNewReconciler:!1},Wm={readContext:He,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:He,useEffect:Ep,useImperativeHandle:function(e,t,i){return i=i!=null?i.concat([e]):null,Ar(4194308,4,Ap.bind(null,t,e),i)},useLayoutEffect:function(e,t){return Ar(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ar(4,2,e,t)},useMemo:function(e,t){var i=xt();return t=t===void 0?null:t,e=e(),i.memoizedState=[e,t],e},useReducer:function(e,t,i){var n=xt();return t=i!==void 0?i(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=Bm.bind(null,K,e),[n.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:kp,useDebugValue:cl,useDeferredValue:function(e){return xt().memoizedState=e},useTransition:function(){var e=kp(!1),t=e[0];return e=Om.bind(null,e[1]),xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,i){var n=K,s=xt();if(H){if(i===void 0)throw Error(A(407));i=i()}else{if(i=t(),ce===null)throw Error(A(349));gi&30||mp(n,t,i)}s.memoizedState=i;var r={value:i,getSnapshot:t};return s.queue=r,Ep(vp.bind(null,n,r,e),[e]),n.flags|=2048,ds(9,yp.bind(null,n,r,i,t),void 0,null),i},useId:function(){var e=xt(),t=ce.identifierPrefix;if(H){var i=Rt,n=zt;i=(n&~(1<<32-et(n)-1)).toString(32)+i,t=":"+t+"R"+i,i=as++,0<i&&(t+="H"+i.toString(32)),t+=":"}else i=Im++,t=":"+t+"r"+i.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Um={readContext:He,useCallback:Rp,useContext:He,useEffect:dl,useImperativeHandle:zp,useInsertionEffect:Cp,useLayoutEffect:Tp,useMemo:Dp,useReducer:al,useRef:Sp,useState:function(){return al(ls)},useDebugValue:cl,useDeferredValue:function(e){var t=qe();return jp(t,re.memoizedState,e)},useTransition:function(){var e=al(ls)[0],t=qe().memoizedState;return[e,t]},useMutableSource:xp,useSyncExternalStore:gp,useId:Mp,unstable_isNewReconciler:!1},Vm={readContext:He,useCallback:Rp,useContext:He,useEffect:dl,useImperativeHandle:zp,useInsertionEffect:Cp,useLayoutEffect:Tp,useMemo:Dp,useReducer:ll,useRef:Sp,useState:function(){return ll(ls)},useDebugValue:cl,useDeferredValue:function(e){var t=qe();return re===null?t.memoizedState=e:jp(t,re.memoizedState,e)},useTransition:function(){var e=ll(ls)[0],t=qe().memoizedState;return[e,t]},useMutableSource:xp,useSyncExternalStore:gp,useId:Mp,unstable_isNewReconciler:!1};function nt(e,t){if(e&&e.defaultProps){t=q({},t),e=e.defaultProps;for(var i in e)t[i]===void 0&&(t[i]=e[i]);return t}return t}function fl(e,t,i,n){t=e.memoizedState,i=i(n,t),i=i==null?t:q({},t,i),e.memoizedState=i,e.lanes===0&&(e.updateQueue.baseState=i)}var Dr={isMounted:function(e){return(e=e._reactInternals)?di(e)===e:!1},enqueueSetState:function(e,t,i){e=e._reactInternals;var n=Ce(),s=Jt(e),r=jt(n,s);r.payload=t,i!=null&&(r.callback=i),t=Kt(e,r,s),t!==null&&(ot(t,e,s,n),kr(t,e,s))},enqueueReplaceState:function(e,t,i){e=e._reactInternals;var n=Ce(),s=Jt(e),r=jt(n,s);r.tag=1,r.payload=t,i!=null&&(r.callback=i),t=Kt(e,r,s),t!==null&&(ot(t,e,s,n),kr(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var i=Ce(),n=Jt(e),s=jt(i,n);s.tag=2,t!=null&&(s.callback=t),t=Kt(e,s,n),t!==null&&(ot(t,e,n,i),kr(t,e,n))}};function Ip(e,t,i,n,s,r,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,r,o):t.prototype&&t.prototype.isPureReactComponent?!Qn(i,n)||!Qn(s,r):!0}function Op(e,t,i){var n=!1,s=Ht,r=t.contextType;return typeof r=="object"&&r!==null?r=He(r):(s=Re(t)?fi:me.current,n=t.contextTypes,r=(n=n!=null)?Qi(e,s):Ht),t=new t(i,r),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Dr,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=r),t}function Bp(e,t,i,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(i,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(i,n),t.state!==e&&Dr.enqueueReplaceState(t,t.state,null)}function pl(e,t,i,n){var s=e.stateNode;s.props=i,s.state=e.memoizedState,s.refs={},Ja(e);var r=t.contextType;typeof r=="object"&&r!==null?s.context=He(r):(r=Re(t)?fi:me.current,s.context=Qi(e,r)),s.state=e.memoizedState,r=t.getDerivedStateFromProps,typeof r=="function"&&(fl(e,t,r,i),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Dr.enqueueReplaceState(s,s.state,null),Sr(e,i,s,n),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function sn(e,t){try{var i="",n=t;do i+=gg(n),n=n.return;while(n);var s=i}catch(r){s=`
Error generating stack: `+r.message+`
`+r.stack}return{value:e,source:t,stack:s,digest:null}}function ul(e,t,i){return{value:e,source:null,stack:i??null,digest:t??null}}function hl(e,t){try{console.error(t.value)}catch(i){setTimeout(function(){throw i})}}var _m=typeof WeakMap=="function"?WeakMap:Map;function Fp(e,t,i){i=jt(-1,i),i.tag=3,i.payload={element:null};var n=t.value;return i.callback=function(){Or||(Or=!0,Rl=n),hl(e,t)},i}function Wp(e,t,i){i=jt(-1,i),i.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var s=t.value;i.payload=function(){return n(s)},i.callback=function(){hl(e,t)}}var r=e.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(i.callback=function(){hl(e,t),typeof n!="function"&&(Gt===null?Gt=new Set([this]):Gt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),i}function Up(e,t,i){var n=e.pingCache;if(n===null){n=e.pingCache=new _m;var s=new Set;n.set(t,s)}else s=n.get(t),s===void 0&&(s=new Set,n.set(t,s));s.has(i)||(s.add(i),e=ny.bind(null,e,t,i),t.then(e,e))}function Vp(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function _p(e,t,i,n,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,i.flags|=131072,i.flags&=-52805,i.tag===1&&(i.alternate===null?i.tag=17:(t=jt(-1,1),t.tag=2,Kt(i,t,1))),i.lanes|=1),e)}var Ym=Ct.ReactCurrentOwner,De=!1;function Ee(e,t,i,n){t.child=e===null?dp(t,null,i,n):Zi(t,e.child,i,n)}function Yp(e,t,i,n,s){i=i.render;var r=t.ref;return tn(t,s),n=rl(e,t,i,n,r,s),i=ol(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Mt(e,t,s)):(H&&i&&Va(t),t.flags|=1,Ee(e,t,n,s),t.child)}function Hp(e,t,i,n,s){if(e===null){var r=i.type;return typeof r=="function"&&!Il(r)&&r.defaultProps===void 0&&i.compare===null&&i.defaultProps===void 0?(t.tag=15,t.type=r,qp(e,t,r,n,s)):(e=_r(i.type,null,n,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!(e.lanes&s)){var o=r.memoizedProps;if(i=i.compare,i=i!==null?i:Qn,i(o,n)&&e.ref===t.ref)return Mt(e,t,s)}return t.flags|=1,e=ei(r,n),e.ref=t.ref,e.return=t,t.child=e}function qp(e,t,i,n,s){if(e!==null){var r=e.memoizedProps;if(Qn(r,n)&&e.ref===t.ref)if(De=!1,t.pendingProps=n=r,(e.lanes&s)!==0)e.flags&131072&&(De=!0);else return t.lanes=e.lanes,Mt(e,t,s)}return xl(e,t,i,n,s)}function $p(e,t,i){var n=t.pendingProps,s=n.children,r=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},V(on,We),We|=i;else{if(!(i&1073741824))return e=r!==null?r.baseLanes|i:i,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,V(on,We),We|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=r!==null?r.baseLanes:i,V(on,We),We|=n}else r!==null?(n=r.baseLanes|i,t.memoizedState=null):n=i,V(on,We),We|=n;return Ee(e,t,s,i),t.child}function Kp(e,t){var i=t.ref;(e===null&&i!==null||e!==null&&e.ref!==i)&&(t.flags|=512,t.flags|=2097152)}function xl(e,t,i,n,s){var r=Re(i)?fi:me.current;return r=Qi(t,r),tn(t,s),i=rl(e,t,i,n,r,s),n=ol(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Mt(e,t,s)):(H&&n&&Va(t),t.flags|=1,Ee(e,t,i,s),t.child)}function Qp(e,t,i,n,s){if(Re(i)){var r=!0;hr(t)}else r=!1;if(tn(t,s),t.stateNode===null)Mr(e,t),Op(t,i,n),pl(t,i,n,s),n=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var d=o.context,c=i.contextType;typeof c=="object"&&c!==null?c=He(c):(c=Re(i)?fi:me.current,c=Qi(t,c));var f=i.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==n||d!==c)&&Bp(t,o,n,c),$t=!1;var u=t.memoizedState;o.state=u,Sr(t,n,o,s),d=t.memoizedState,l!==n||u!==d||ze.current||$t?(typeof f=="function"&&(fl(t,i,f,n),d=t.memoizedState),(l=$t||Ip(t,i,l,n,u,d,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=d),o.props=n,o.state=d,o.context=c,n=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{o=t.stateNode,fp(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:nt(t.type,l),o.props=c,p=t.pendingProps,u=o.context,d=i.contextType,typeof d=="object"&&d!==null?d=He(d):(d=Re(i)?fi:me.current,d=Qi(t,d));var v=i.getDerivedStateFromProps;(f=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||u!==d)&&Bp(t,o,n,d),$t=!1,u=t.memoizedState,o.state=u,Sr(t,n,o,s);var g=t.memoizedState;l!==p||u!==g||ze.current||$t?(typeof v=="function"&&(fl(t,i,v,n),g=t.memoizedState),(c=$t||Ip(t,i,c,n,u,g,d)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,g,d),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,g,d)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=g),o.props=n,o.state=g,o.context=d,n=c):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),n=!1)}return gl(e,t,i,n,r,s)}function gl(e,t,i,n,s,r){Kp(e,t);var o=(t.flags&128)!==0;if(!n&&!o)return s&&ep(t,i,!1),Mt(e,t,r);n=t.stateNode,Ym.current=t;var l=o&&typeof i.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&o?(t.child=Zi(t,e.child,null,r),t.child=Zi(t,null,l,r)):Ee(e,t,l,r),t.memoizedState=n.state,s&&ep(t,i,!0),t.child}function Gp(e){var t=e.stateNode;t.pendingContext?Jf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Jf(e,t.context,!1),Za(e,t.containerInfo)}function Xp(e,t,i,n,s){return Ji(),qa(s),t.flags|=256,Ee(e,t,i,n),t.child}var ml={dehydrated:null,treeContext:null,retryLane:0};function yl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Jp(e,t,i){var n=t.pendingProps,s=$.current,r=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(r=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),V($,s&1),e===null)return Ha(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=n.children,e=n.fallback,r?(n=t.mode,r=t.child,o={mode:"hidden",children:o},!(n&1)&&r!==null?(r.childLanes=0,r.pendingProps=o):r=Yr(o,n,0,null),e=wi(e,n,i,null),r.return=t,e.return=t,r.sibling=e,t.child=r,t.child.memoizedState=yl(i),t.memoizedState=ml,e):vl(t,o));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Hm(e,t,o,n,l,s,i);if(r){r=n.fallback,o=t.mode,s=e.child,l=s.sibling;var d={mode:"hidden",children:n.children};return!(o&1)&&t.child!==s?(n=t.child,n.childLanes=0,n.pendingProps=d,t.deletions=null):(n=ei(s,d),n.subtreeFlags=s.subtreeFlags&14680064),l!==null?r=ei(l,r):(r=wi(r,o,i,null),r.flags|=2),r.return=t,n.return=t,n.sibling=r,t.child=n,n=r,r=t.child,o=e.child.memoizedState,o=o===null?yl(i):{baseLanes:o.baseLanes|i,cachePool:null,transitions:o.transitions},r.memoizedState=o,r.childLanes=e.childLanes&~i,t.memoizedState=ml,n}return r=e.child,e=r.sibling,n=ei(r,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=i),n.return=t,n.sibling=null,e!==null&&(i=t.deletions,i===null?(t.deletions=[e],t.flags|=16):i.push(e)),t.child=n,t.memoizedState=null,n}function vl(e,t){return t=Yr({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function jr(e,t,i,n){return n!==null&&qa(n),Zi(t,e.child,null,i),e=vl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Hm(e,t,i,n,s,r,o){if(i)return t.flags&256?(t.flags&=-257,n=ul(Error(A(422))),jr(e,t,o,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(r=n.fallback,s=t.mode,n=Yr({mode:"visible",children:n.children},s,0,null),r=wi(r,s,o,null),r.flags|=2,n.return=t,r.return=t,n.sibling=r,t.child=n,t.mode&1&&Zi(t,e.child,null,o),t.child.memoizedState=yl(o),t.memoizedState=ml,r);if(!(t.mode&1))return jr(e,t,o,null);if(s.data==="$!"){if(n=s.nextSibling&&s.nextSibling.dataset,n)var l=n.dgst;return n=l,r=Error(A(419)),n=ul(r,n,void 0),jr(e,t,o,n)}if(l=(o&e.childLanes)!==0,De||l){if(n=ce,n!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(n.suspendedLanes|o)?0:s,s!==0&&s!==r.retryLane&&(r.retryLane=s,Dt(e,s),ot(n,e,s,-1))}return Ll(),n=ul(Error(A(421))),jr(e,t,o,n)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=sy.bind(null,e),s._reactRetry=t,null):(e=r.treeContext,Fe=_t(s.nextSibling),Be=t,H=!0,it=null,e!==null&&(_e[Ye++]=zt,_e[Ye++]=Rt,_e[Ye++]=pi,zt=e.id,Rt=e.overflow,pi=t),t=vl(t,n.children),t.flags|=4096,t)}function Zp(e,t,i){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Ga(e.return,t,i)}function bl(e,t,i,n,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:i,tailMode:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=n,r.tail=i,r.tailMode=s)}function eu(e,t,i){var n=t.pendingProps,s=n.revealOrder,r=n.tail;if(Ee(e,t,n.children,i),n=$.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zp(e,i,t);else if(e.tag===19)Zp(e,i,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(V($,n),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(i=t.child,s=null;i!==null;)e=i.alternate,e!==null&&Er(e)===null&&(s=i),i=i.sibling;i=s,i===null?(s=t.child,t.child=null):(s=i.sibling,i.sibling=null),bl(t,!1,s,i,r);break;case"backwards":for(i=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Er(e)===null){t.child=s;break}e=s.sibling,s.sibling=i,i=s,s=e}bl(t,!0,i,null,r);break;case"together":bl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Mr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Mt(e,t,i){if(e!==null&&(t.dependencies=e.dependencies),mi|=t.lanes,!(i&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(A(153));if(t.child!==null){for(e=t.child,i=ei(e,e.pendingProps),t.child=i,i.return=t;e.sibling!==null;)e=e.sibling,i=i.sibling=ei(e,e.pendingProps),i.return=t;i.sibling=null}return t.child}function qm(e,t,i){switch(t.tag){case 3:Gp(t),Ji();break;case 5:hp(t);break;case 1:Re(t.type)&&hr(t);break;case 4:Za(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,s=t.memoizedProps.value;V(br,n._currentValue),n._currentValue=s;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(V($,$.current&1),t.flags|=128,null):i&t.child.childLanes?Jp(e,t,i):(V($,$.current&1),e=Mt(e,t,i),e!==null?e.sibling:null);V($,$.current&1);break;case 19:if(n=(i&t.childLanes)!==0,e.flags&128){if(n)return eu(e,t,i);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),V($,$.current),n)break;return null;case 22:case 23:return t.lanes=0,$p(e,t,i)}return Mt(e,t,i)}var tu,wl,iu,nu;tu=function(e,t){for(var i=t.child;i!==null;){if(i.tag===5||i.tag===6)e.appendChild(i.stateNode);else if(i.tag!==4&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}},wl=function(){},iu=function(e,t,i,n){var s=e.memoizedProps;if(s!==n){e=t.stateNode,xi(ht.current);var r=null;switch(i){case"input":s=Go(e,s),n=Go(e,n),r=[];break;case"select":s=q({},s,{value:void 0}),n=q({},n,{value:void 0}),r=[];break;case"textarea":s=Zo(e,s),n=Zo(e,n),r=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=fr)}ta(i,n);var o;i=null;for(c in s)if(!n.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(i||(i={}),i[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(zn.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in n){var d=n[c];if(l=s!=null?s[c]:void 0,n.hasOwnProperty(c)&&d!==l&&(d!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||d&&d.hasOwnProperty(o)||(i||(i={}),i[o]="");for(o in d)d.hasOwnProperty(o)&&l[o]!==d[o]&&(i||(i={}),i[o]=d[o])}else i||(r||(r=[]),r.push(c,i)),i=d;else c==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,l=l?l.__html:void 0,d!=null&&l!==d&&(r=r||[]).push(c,d)):c==="children"?typeof d!="string"&&typeof d!="number"||(r=r||[]).push(c,""+d):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(zn.hasOwnProperty(c)?(d!=null&&c==="onScroll"&&_("scroll",e),r||l===d||(r=[])):(r=r||[]).push(c,d))}i&&(r=r||[]).push("style",i);var c=r;(t.updateQueue=c)&&(t.flags|=4)}},nu=function(e,t,i,n){i!==n&&(t.flags|=4)};function cs(e,t){if(!H)switch(e.tailMode){case"hidden":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var n=null;i!==null;)i.alternate!==null&&(n=i),i=i.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ve(e){var t=e.alternate!==null&&e.alternate.child===e.child,i=0,n=0;if(t)for(var s=e.child;s!==null;)i|=s.lanes|s.childLanes,n|=s.subtreeFlags&14680064,n|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)i|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=n,e.childLanes=i,t}function $m(e,t,i){var n=t.pendingProps;switch(_a(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ve(t),null;case 1:return Re(t.type)&&ur(),ve(t),null;case 3:return n=t.stateNode,nn(),Y(ze),Y(me),il(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,it!==null&&(Ml(it),it=null))),wl(e,t),ve(t),null;case 5:el(t);var s=xi(rs.current);if(i=t.type,e!==null&&t.stateNode!=null)iu(e,t,i,n,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(A(166));return ve(t),null}if(e=xi(ht.current),yr(t)){n=t.stateNode,i=t.type;var r=t.memoizedProps;switch(n[ut]=t,n[es]=r,e=(t.mode&1)!==0,i){case"dialog":_("cancel",n),_("close",n);break;case"iframe":case"object":case"embed":_("load",n);break;case"video":case"audio":for(s=0;s<Xn.length;s++)_(Xn[s],n);break;case"source":_("error",n);break;case"img":case"image":case"link":_("error",n),_("load",n);break;case"details":_("toggle",n);break;case"input":Ic(n,r),_("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!r.multiple},_("invalid",n);break;case"textarea":Fc(n,r),_("invalid",n)}ta(i,r),s=null;for(var o in r)if(r.hasOwnProperty(o)){var l=r[o];o==="children"?typeof l=="string"?n.textContent!==l&&(r.suppressHydrationWarning!==!0&&cr(n.textContent,l,e),s=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(r.suppressHydrationWarning!==!0&&cr(n.textContent,l,e),s=["children",""+l]):zn.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&_("scroll",n)}switch(i){case"input":Us(n),Bc(n,r,!0);break;case"textarea":Us(n),Uc(n);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(n.onclick=fr)}n=s,t.updateQueue=n,n!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vc(i)),e==="http://www.w3.org/1999/xhtml"?i==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=o.createElement(i,{is:n.is}):(e=o.createElement(i),i==="select"&&(o=e,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):e=o.createElementNS(e,i),e[ut]=t,e[es]=n,tu(e,t,!1,!1),t.stateNode=e;e:{switch(o=ia(i,n),i){case"dialog":_("cancel",e),_("close",e),s=n;break;case"iframe":case"object":case"embed":_("load",e),s=n;break;case"video":case"audio":for(s=0;s<Xn.length;s++)_(Xn[s],e);s=n;break;case"source":_("error",e),s=n;break;case"img":case"image":case"link":_("error",e),_("load",e),s=n;break;case"details":_("toggle",e),s=n;break;case"input":Ic(e,n),s=Go(e,n),_("invalid",e);break;case"option":s=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},s=q({},n,{value:void 0}),_("invalid",e);break;case"textarea":Fc(e,n),s=Zo(e,n),_("invalid",e);break;default:s=n}ta(i,s),l=s;for(r in l)if(l.hasOwnProperty(r)){var d=l[r];r==="style"?Hc(e,d):r==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&_c(e,d)):r==="children"?typeof d=="string"?(i!=="textarea"||d!=="")&&Mn(e,d):typeof d=="number"&&Mn(e,""+d):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(zn.hasOwnProperty(r)?d!=null&&r==="onScroll"&&_("scroll",e):d!=null&&Fo(e,r,d,o))}switch(i){case"input":Us(e),Bc(e,n,!1);break;case"textarea":Us(e),Uc(e);break;case"option":n.value!=null&&e.setAttribute("value",""+It(n.value));break;case"select":e.multiple=!!n.multiple,r=n.value,r!=null?Oi(e,!!n.multiple,r,!1):n.defaultValue!=null&&Oi(e,!!n.multiple,n.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=fr)}switch(i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ve(t),null;case 6:if(e&&t.stateNode!=null)nu(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(A(166));if(i=xi(rs.current),xi(ht.current),yr(t)){if(n=t.stateNode,i=t.memoizedProps,n[ut]=t,(r=n.nodeValue!==i)&&(e=Be,e!==null))switch(e.tag){case 3:cr(n.nodeValue,i,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&cr(n.nodeValue,i,(e.mode&1)!==0)}r&&(t.flags|=4)}else n=(i.nodeType===9?i:i.ownerDocument).createTextNode(n),n[ut]=t,t.stateNode=n}return ve(t),null;case 13:if(Y($),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(H&&Fe!==null&&t.mode&1&&!(t.flags&128))op(),Ji(),t.flags|=98560,r=!1;else if(r=yr(t),n!==null&&n.dehydrated!==null){if(e===null){if(!r)throw Error(A(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(A(317));r[ut]=t}else Ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ve(t),r=!1}else it!==null&&(Ml(it),it=null),r=!0;if(!r)return t.flags&65536?t:null}return t.flags&128?(t.lanes=i,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||$.current&1?oe===0&&(oe=3):Ll())),t.updateQueue!==null&&(t.flags|=4),ve(t),null);case 4:return nn(),wl(e,t),e===null&&Jn(t.stateNode.containerInfo),ve(t),null;case 10:return Qa(t.type._context),ve(t),null;case 17:return Re(t.type)&&ur(),ve(t),null;case 19:if(Y($),r=t.memoizedState,r===null)return ve(t),null;if(n=(t.flags&128)!==0,o=r.rendering,o===null)if(n)cs(r,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Er(e),o!==null){for(t.flags|=128,cs(r,!1),n=o.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=i,i=t.child;i!==null;)r=i,e=n,r.flags&=14680066,o=r.alternate,o===null?(r.childLanes=0,r.lanes=e,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=o.childLanes,r.lanes=o.lanes,r.child=o.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=o.memoizedProps,r.memoizedState=o.memoizedState,r.updateQueue=o.updateQueue,r.type=o.type,e=o.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),i=i.sibling;return V($,$.current&1|2),t.child}e=e.sibling}r.tail!==null&&Z()>an&&(t.flags|=128,n=!0,cs(r,!1),t.lanes=4194304)}else{if(!n)if(e=Er(o),e!==null){if(t.flags|=128,n=!0,i=e.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),cs(r,!0),r.tail===null&&r.tailMode==="hidden"&&!o.alternate&&!H)return ve(t),null}else 2*Z()-r.renderingStartTime>an&&i!==1073741824&&(t.flags|=128,n=!0,cs(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(i=r.last,i!==null?i.sibling=o:t.child=o,r.last=o)}return r.tail!==null?(t=r.tail,r.rendering=t,r.tail=t.sibling,r.renderingStartTime=Z(),t.sibling=null,i=$.current,V($,n?i&1|2:i&1),t):(ve(t),null);case 22:case 23:return Pl(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?We&1073741824&&(ve(t),t.subtreeFlags&6&&(t.flags|=8192)):ve(t),null;case 24:return null;case 25:return null}throw Error(A(156,t.tag))}function Km(e,t){switch(_a(t),t.tag){case 1:return Re(t.type)&&ur(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return nn(),Y(ze),Y(me),il(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return el(t),null;case 13:if(Y($),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(A(340));Ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Y($),null;case 4:return nn(),null;case 10:return Qa(t.type._context),null;case 22:case 23:return Pl(),null;case 24:return null;default:return null}}var Nr=!1,be=!1,Qm=typeof WeakSet=="function"?WeakSet:Set,D=null;function rn(e,t){var i=e.ref;if(i!==null)if(typeof i=="function")try{i(null)}catch(n){G(e,t,n)}else i.current=null}function kl(e,t,i){try{i()}catch(n){G(e,t,n)}}var su=!1;function Gm(e,t){if(Pa=Zs,e=If(),Ta(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var n=i.getSelection&&i.getSelection();if(n&&n.rangeCount!==0){i=n.anchorNode;var s=n.anchorOffset,r=n.focusNode;n=n.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break e}var o=0,l=-1,d=-1,c=0,f=0,p=e,u=null;t:for(;;){for(var v;p!==i||s!==0&&p.nodeType!==3||(l=o+s),p!==r||n!==0&&p.nodeType!==3||(d=o+n),p.nodeType===3&&(o+=p.nodeValue.length),(v=p.firstChild)!==null;)u=p,p=v;for(;;){if(p===e)break t;if(u===i&&++c===s&&(l=o),u===r&&++f===n&&(d=o),(v=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=v}i=l===-1||d===-1?null:{start:l,end:d}}else i=null}i=i||{start:0,end:0}}else i=null;for(La={focusedElem:e,selectionRange:i},Zs=!1,D=t;D!==null;)if(t=D,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,D=e;else for(;D!==null;){t=D;try{var g=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var m=g.memoizedProps,b=g.memoizedState,h=t.stateNode,x=h.getSnapshotBeforeUpdate(t.elementType===t.type?m:nt(t.type,m),b);h.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(A(163))}}catch(w){G(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,D=e;break}D=t.return}return g=su,su=!1,g}function fs(e,t,i){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&e)===e){var r=s.destroy;s.destroy=void 0,r!==void 0&&kl(t,i,r)}s=s.next}while(s!==n)}}function Pr(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var i=t=t.next;do{if((i.tag&e)===e){var n=i.create;i.destroy=n()}i=i.next}while(i!==t)}}function Sl(e){var t=e.ref;if(t!==null){var i=e.stateNode;switch(e.tag){case 5:e=i;break;default:e=i}typeof t=="function"?t(e):t.current=e}}function ru(e){var t=e.alternate;t!==null&&(e.alternate=null,ru(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ut],delete t[es],delete t[Fa],delete t[Mm],delete t[Nm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ou(e){return e.tag===5||e.tag===3||e.tag===4}function au(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ou(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function El(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?i.nodeType===8?i.parentNode.insertBefore(e,t):i.insertBefore(e,t):(i.nodeType===8?(t=i.parentNode,t.insertBefore(e,i)):(t=i,t.appendChild(e)),i=i._reactRootContainer,i!=null||t.onclick!==null||(t.onclick=fr));else if(n!==4&&(e=e.child,e!==null))for(El(e,t,i),e=e.sibling;e!==null;)El(e,t,i),e=e.sibling}function Cl(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?i.insertBefore(e,t):i.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Cl(e,t,i),e=e.sibling;e!==null;)Cl(e,t,i),e=e.sibling}var ue=null,st=!1;function Qt(e,t,i){for(i=i.child;i!==null;)lu(e,t,i),i=i.sibling}function lu(e,t,i){if(pt&&typeof pt.onCommitFiberUnmount=="function")try{pt.onCommitFiberUnmount($s,i)}catch{}switch(i.tag){case 5:be||rn(i,t);case 6:var n=ue,s=st;ue=null,Qt(e,t,i),ue=n,st=s,ue!==null&&(st?(e=ue,i=i.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)):ue.removeChild(i.stateNode));break;case 18:ue!==null&&(st?(e=ue,i=i.stateNode,e.nodeType===8?Ba(e.parentNode,i):e.nodeType===1&&Ba(e,i),_n(e)):Ba(ue,i.stateNode));break;case 4:n=ue,s=st,ue=i.stateNode.containerInfo,st=!0,Qt(e,t,i),ue=n,st=s;break;case 0:case 11:case 14:case 15:if(!be&&(n=i.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){s=n=n.next;do{var r=s,o=r.destroy;r=r.tag,o!==void 0&&(r&2||r&4)&&kl(i,t,o),s=s.next}while(s!==n)}Qt(e,t,i);break;case 1:if(!be&&(rn(i,t),n=i.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=i.memoizedProps,n.state=i.memoizedState,n.componentWillUnmount()}catch(l){G(i,t,l)}Qt(e,t,i);break;case 21:Qt(e,t,i);break;case 22:i.mode&1?(be=(n=be)||i.memoizedState!==null,Qt(e,t,i),be=n):Qt(e,t,i);break;default:Qt(e,t,i)}}function du(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var i=e.stateNode;i===null&&(i=e.stateNode=new Qm),t.forEach(function(n){var s=ry.bind(null,e,n);i.has(n)||(i.add(n),n.then(s,s))})}}function rt(e,t){var i=t.deletions;if(i!==null)for(var n=0;n<i.length;n++){var s=i[n];try{var r=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:ue=l.stateNode,st=!1;break e;case 3:ue=l.stateNode.containerInfo,st=!0;break e;case 4:ue=l.stateNode.containerInfo,st=!0;break e}l=l.return}if(ue===null)throw Error(A(160));lu(r,o,s),ue=null,st=!1;var d=s.alternate;d!==null&&(d.return=null),s.return=null}catch(c){G(s,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)cu(t,e),t=t.sibling}function cu(e,t){var i=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(rt(t,e),gt(e),n&4){try{fs(3,e,e.return),Pr(3,e)}catch(m){G(e,e.return,m)}try{fs(5,e,e.return)}catch(m){G(e,e.return,m)}}break;case 1:rt(t,e),gt(e),n&512&&i!==null&&rn(i,i.return);break;case 5:if(rt(t,e),gt(e),n&512&&i!==null&&rn(i,i.return),e.flags&32){var s=e.stateNode;try{Mn(s,"")}catch(m){G(e,e.return,m)}}if(n&4&&(s=e.stateNode,s!=null)){var r=e.memoizedProps,o=i!==null?i.memoizedProps:r,l=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{l==="input"&&r.type==="radio"&&r.name!=null&&Oc(s,r),ia(l,o);var c=ia(l,r);for(o=0;o<d.length;o+=2){var f=d[o],p=d[o+1];f==="style"?Hc(s,p):f==="dangerouslySetInnerHTML"?_c(s,p):f==="children"?Mn(s,p):Fo(s,f,p,c)}switch(l){case"input":Xo(s,r);break;case"textarea":Wc(s,r);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!r.multiple;var v=r.value;v!=null?Oi(s,!!r.multiple,v,!1):u!==!!r.multiple&&(r.defaultValue!=null?Oi(s,!!r.multiple,r.defaultValue,!0):Oi(s,!!r.multiple,r.multiple?[]:"",!1))}s[es]=r}catch(m){G(e,e.return,m)}}break;case 6:if(rt(t,e),gt(e),n&4){if(e.stateNode===null)throw Error(A(162));s=e.stateNode,r=e.memoizedProps;try{s.nodeValue=r}catch(m){G(e,e.return,m)}}break;case 3:if(rt(t,e),gt(e),n&4&&i!==null&&i.memoizedState.isDehydrated)try{_n(t.containerInfo)}catch(m){G(e,e.return,m)}break;case 4:rt(t,e),gt(e);break;case 13:rt(t,e),gt(e),s=e.child,s.flags&8192&&(r=s.memoizedState!==null,s.stateNode.isHidden=r,!r||s.alternate!==null&&s.alternate.memoizedState!==null||(zl=Z())),n&4&&du(e);break;case 22:if(f=i!==null&&i.memoizedState!==null,e.mode&1?(be=(c=be)||f,rt(t,e),be=c):rt(t,e),gt(e),n&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&e.mode&1)for(D=e,f=e.child;f!==null;){for(p=D=f;D!==null;){switch(u=D,v=u.child,u.tag){case 0:case 11:case 14:case 15:fs(4,u,u.return);break;case 1:rn(u,u.return);var g=u.stateNode;if(typeof g.componentWillUnmount=="function"){n=u,i=u.return;try{t=n,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(m){G(n,i,m)}}break;case 5:rn(u,u.return);break;case 22:if(u.memoizedState!==null){uu(p);continue}}v!==null?(v.return=u,D=v):uu(p)}f=f.sibling}e:for(f=null,p=e;;){if(p.tag===5){if(f===null){f=p;try{s=p.stateNode,c?(r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(l=p.stateNode,d=p.memoizedProps.style,o=d!=null&&d.hasOwnProperty("display")?d.display:null,l.style.display=Yc("display",o))}catch(m){G(e,e.return,m)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(m){G(e,e.return,m)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:rt(t,e),gt(e),n&4&&du(e);break;case 21:break;default:rt(t,e),gt(e)}}function gt(e){var t=e.flags;if(t&2){try{e:{for(var i=e.return;i!==null;){if(ou(i)){var n=i;break e}i=i.return}throw Error(A(160))}switch(n.tag){case 5:var s=n.stateNode;n.flags&32&&(Mn(s,""),n.flags&=-33);var r=au(e);Cl(e,r,s);break;case 3:case 4:var o=n.stateNode.containerInfo,l=au(e);El(e,l,o);break;default:throw Error(A(161))}}catch(d){G(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xm(e,t,i){D=e,fu(e)}function fu(e,t,i){for(var n=(e.mode&1)!==0;D!==null;){var s=D,r=s.child;if(s.tag===22&&n){var o=s.memoizedState!==null||Nr;if(!o){var l=s.alternate,d=l!==null&&l.memoizedState!==null||be;l=Nr;var c=be;if(Nr=o,(be=d)&&!c)for(D=s;D!==null;)o=D,d=o.child,o.tag===22&&o.memoizedState!==null?hu(s):d!==null?(d.return=o,D=d):hu(s);for(;r!==null;)D=r,fu(r),r=r.sibling;D=s,Nr=l,be=c}pu(e)}else s.subtreeFlags&8772&&r!==null?(r.return=s,D=r):pu(e)}}function pu(e){for(;D!==null;){var t=D;if(t.flags&8772){var i=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:be||Pr(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!be)if(i===null)n.componentDidMount();else{var s=t.elementType===t.type?i.memoizedProps:nt(t.type,i.memoizedProps);n.componentDidUpdate(s,i.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var r=t.updateQueue;r!==null&&up(t,r,n);break;case 3:var o=t.updateQueue;if(o!==null){if(i=null,t.child!==null)switch(t.child.tag){case 5:i=t.child.stateNode;break;case 1:i=t.child.stateNode}up(t,o,i)}break;case 5:var l=t.stateNode;if(i===null&&t.flags&4){i=l;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&i.focus();break;case"img":d.src&&(i.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&_n(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(A(163))}be||t.flags&512&&Sl(t)}catch(u){G(t,t.return,u)}}if(t===e){D=null;break}if(i=t.sibling,i!==null){i.return=t.return,D=i;break}D=t.return}}function uu(e){for(;D!==null;){var t=D;if(t===e){D=null;break}var i=t.sibling;if(i!==null){i.return=t.return,D=i;break}D=t.return}}function hu(e){for(;D!==null;){var t=D;try{switch(t.tag){case 0:case 11:case 15:var i=t.return;try{Pr(4,t)}catch(d){G(t,i,d)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var s=t.return;try{n.componentDidMount()}catch(d){G(t,s,d)}}var r=t.return;try{Sl(t)}catch(d){G(t,r,d)}break;case 5:var o=t.return;try{Sl(t)}catch(d){G(t,o,d)}}}catch(d){G(t,t.return,d)}if(t===e){D=null;break}var l=t.sibling;if(l!==null){l.return=t.return,D=l;break}D=t.return}}var Jm=Math.ceil,Lr=Ct.ReactCurrentDispatcher,Tl=Ct.ReactCurrentOwner,$e=Ct.ReactCurrentBatchConfig,I=0,ce=null,ee=null,he=0,We=0,on=Yt(0),oe=0,ps=null,mi=0,Ir=0,Al=0,us=null,je=null,zl=0,an=1/0,Nt=null,Or=!1,Rl=null,Gt=null,Br=!1,Xt=null,Fr=0,hs=0,Dl=null,Wr=-1,Ur=0;function Ce(){return I&6?Z():Wr!==-1?Wr:Wr=Z()}function Jt(e){return e.mode&1?I&2&&he!==0?he&-he:Lm.transition!==null?(Ur===0&&(Ur=af()),Ur):(e=B,e!==0||(e=window.event,e=e===void 0?16:gf(e.type)),e):1}function ot(e,t,i,n){if(50<hs)throw hs=0,Dl=null,Error(A(185));Bn(e,i,n),(!(I&2)||e!==ce)&&(e===ce&&(!(I&2)&&(Ir|=i),oe===4&&Zt(e,he)),Me(e,n),i===1&&I===0&&!(t.mode&1)&&(an=Z()+500,xr&&qt()))}function Me(e,t){var i=e.callbackNode;Lg(e,t);var n=Gs(e,e===ce?he:0);if(n===0)i!==null&&sf(i),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(i!=null&&sf(i),t===1)e.tag===0?Pm(gu.bind(null,e)):tp(gu.bind(null,e)),Dm(function(){!(I&6)&&qt()}),i=null;else{switch(lf(n)){case 1:i=da;break;case 4:i=rf;break;case 16:i=qs;break;case 536870912:i=of;break;default:i=qs}i=Eu(i,xu.bind(null,e))}e.callbackPriority=t,e.callbackNode=i}}function xu(e,t){if(Wr=-1,Ur=0,I&6)throw Error(A(327));var i=e.callbackNode;if(ln()&&e.callbackNode!==i)return null;var n=Gs(e,e===ce?he:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=Vr(e,n);else{t=n;var s=I;I|=2;var r=yu();(ce!==e||he!==t)&&(Nt=null,an=Z()+500,vi(e,t));do try{ty();break}catch(l){mu(e,l)}while(!0);Ka(),Lr.current=r,I=s,ee!==null?t=0:(ce=null,he=0,t=oe)}if(t!==0){if(t===2&&(s=ca(e),s!==0&&(n=s,t=jl(e,s))),t===1)throw i=ps,vi(e,0),Zt(e,n),Me(e,Z()),i;if(t===6)Zt(e,n);else{if(s=e.current.alternate,!(n&30)&&!Zm(s)&&(t=Vr(e,n),t===2&&(r=ca(e),r!==0&&(n=r,t=jl(e,r))),t===1))throw i=ps,vi(e,0),Zt(e,n),Me(e,Z()),i;switch(e.finishedWork=s,e.finishedLanes=n,t){case 0:case 1:throw Error(A(345));case 2:bi(e,je,Nt);break;case 3:if(Zt(e,n),(n&130023424)===n&&(t=zl+500-Z(),10<t)){if(Gs(e,0)!==0)break;if(s=e.suspendedLanes,(s&n)!==n){Ce(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Oa(bi.bind(null,e,je,Nt),t);break}bi(e,je,Nt);break;case 4:if(Zt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,s=-1;0<n;){var o=31-et(n);r=1<<o,o=t[o],o>s&&(s=o),n&=~r}if(n=s,n=Z()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Jm(n/1960))-n,10<n){e.timeoutHandle=Oa(bi.bind(null,e,je,Nt),n);break}bi(e,je,Nt);break;case 5:bi(e,je,Nt);break;default:throw Error(A(329))}}}return Me(e,Z()),e.callbackNode===i?xu.bind(null,e):null}function jl(e,t){var i=us;return e.current.memoizedState.isDehydrated&&(vi(e,t).flags|=256),e=Vr(e,t),e!==2&&(t=je,je=i,t!==null&&Ml(t)),e}function Ml(e){je===null?je=e:je.push.apply(je,e)}function Zm(e){for(var t=e;;){if(t.flags&16384){var i=t.updateQueue;if(i!==null&&(i=i.stores,i!==null))for(var n=0;n<i.length;n++){var s=i[n],r=s.getSnapshot;s=s.value;try{if(!tt(r(),s))return!1}catch{return!1}}}if(i=t.child,t.subtreeFlags&16384&&i!==null)i.return=t,t=i;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zt(e,t){for(t&=~Al,t&=~Ir,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var i=31-et(t),n=1<<i;e[i]=-1,t&=~n}}function gu(e){if(I&6)throw Error(A(327));ln();var t=Gs(e,0);if(!(t&1))return Me(e,Z()),null;var i=Vr(e,t);if(e.tag!==0&&i===2){var n=ca(e);n!==0&&(t=n,i=jl(e,n))}if(i===1)throw i=ps,vi(e,0),Zt(e,t),Me(e,Z()),i;if(i===6)throw Error(A(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,bi(e,je,Nt),Me(e,Z()),null}function Nl(e,t){var i=I;I|=1;try{return e(t)}finally{I=i,I===0&&(an=Z()+500,xr&&qt())}}function yi(e){Xt!==null&&Xt.tag===0&&!(I&6)&&ln();var t=I;I|=1;var i=$e.transition,n=B;try{if($e.transition=null,B=1,e)return e()}finally{B=n,$e.transition=i,I=t,!(I&6)&&qt()}}function Pl(){We=on.current,Y(on)}function vi(e,t){e.finishedWork=null,e.finishedLanes=0;var i=e.timeoutHandle;if(i!==-1&&(e.timeoutHandle=-1,Rm(i)),ee!==null)for(i=ee.return;i!==null;){var n=i;switch(_a(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&ur();break;case 3:nn(),Y(ze),Y(me),il();break;case 5:el(n);break;case 4:nn();break;case 13:Y($);break;case 19:Y($);break;case 10:Qa(n.type._context);break;case 22:case 23:Pl()}i=i.return}if(ce=e,ee=e=ei(e.current,null),he=We=t,oe=0,ps=null,Al=Ir=mi=0,je=us=null,hi!==null){for(t=0;t<hi.length;t++)if(i=hi[t],n=i.interleaved,n!==null){i.interleaved=null;var s=n.next,r=i.pending;if(r!==null){var o=r.next;r.next=s,n.next=o}i.pending=n}hi=null}return e}function mu(e,t){do{var i=ee;try{if(Ka(),Cr.current=Rr,Tr){for(var n=K.memoizedState;n!==null;){var s=n.queue;s!==null&&(s.pending=null),n=n.next}Tr=!1}if(gi=0,de=re=K=null,os=!1,as=0,Tl.current=null,i===null||i.return===null){oe=1,ps=t,ee=null;break}e:{var r=e,o=i.return,l=i,d=t;if(t=he,l.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var c=d,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var u=f.alternate;u?(f.updateQueue=u.updateQueue,f.memoizedState=u.memoizedState,f.lanes=u.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=Vp(o);if(v!==null){v.flags&=-257,_p(v,o,l,r,t),v.mode&1&&Up(r,c,t),t=v,d=c;var g=t.updateQueue;if(g===null){var m=new Set;m.add(d),t.updateQueue=m}else g.add(d);break e}else{if(!(t&1)){Up(r,c,t),Ll();break e}d=Error(A(426))}}else if(H&&l.mode&1){var b=Vp(o);if(b!==null){!(b.flags&65536)&&(b.flags|=256),_p(b,o,l,r,t),qa(sn(d,l));break e}}r=d=sn(d,l),oe!==4&&(oe=2),us===null?us=[r]:us.push(r),r=o;do{switch(r.tag){case 3:r.flags|=65536,t&=-t,r.lanes|=t;var h=Fp(r,d,t);pp(r,h);break e;case 1:l=d;var x=r.type,y=r.stateNode;if(!(r.flags&128)&&(typeof x.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Gt===null||!Gt.has(y)))){r.flags|=65536,t&=-t,r.lanes|=t;var w=Wp(r,l,t);pp(r,w);break e}}r=r.return}while(r!==null)}bu(i)}catch(S){t=S,ee===i&&i!==null&&(ee=i=i.return);continue}break}while(!0)}function yu(){var e=Lr.current;return Lr.current=Rr,e===null?Rr:e}function Ll(){(oe===0||oe===3||oe===2)&&(oe=4),ce===null||!(mi&268435455)&&!(Ir&268435455)||Zt(ce,he)}function Vr(e,t){var i=I;I|=2;var n=yu();(ce!==e||he!==t)&&(Nt=null,vi(e,t));do try{ey();break}catch(s){mu(e,s)}while(!0);if(Ka(),I=i,Lr.current=n,ee!==null)throw Error(A(261));return ce=null,he=0,oe}function ey(){for(;ee!==null;)vu(ee)}function ty(){for(;ee!==null&&!Tg();)vu(ee)}function vu(e){var t=Su(e.alternate,e,We);e.memoizedProps=e.pendingProps,t===null?bu(e):ee=t,Tl.current=null}function bu(e){var t=e;do{var i=t.alternate;if(e=t.return,t.flags&32768){if(i=Km(i,t),i!==null){i.flags&=32767,ee=i;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,ee=null;return}}else if(i=$m(i,t,We),i!==null){ee=i;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);oe===0&&(oe=5)}function bi(e,t,i){var n=B,s=$e.transition;try{$e.transition=null,B=1,iy(e,t,i,n)}finally{$e.transition=s,B=n}return null}function iy(e,t,i,n){do ln();while(Xt!==null);if(I&6)throw Error(A(327));i=e.finishedWork;var s=e.finishedLanes;if(i===null)return null;if(e.finishedWork=null,e.finishedLanes=0,i===e.current)throw Error(A(177));e.callbackNode=null,e.callbackPriority=0;var r=i.lanes|i.childLanes;if(Ig(e,r),e===ce&&(ee=ce=null,he=0),!(i.subtreeFlags&2064)&&!(i.flags&2064)||Br||(Br=!0,Eu(qs,function(){return ln(),null})),r=(i.flags&15990)!==0,i.subtreeFlags&15990||r){r=$e.transition,$e.transition=null;var o=B;B=1;var l=I;I|=4,Tl.current=null,Gm(e,i),cu(i,e),km(La),Zs=!!Pa,La=Pa=null,e.current=i,Xm(i),Ag(),I=l,B=o,$e.transition=r}else e.current=i;if(Br&&(Br=!1,Xt=e,Fr=s),r=e.pendingLanes,r===0&&(Gt=null),Dg(i.stateNode),Me(e,Z()),t!==null)for(n=e.onRecoverableError,i=0;i<t.length;i++)s=t[i],n(s.value,{componentStack:s.stack,digest:s.digest});if(Or)throw Or=!1,e=Rl,Rl=null,e;return Fr&1&&e.tag!==0&&ln(),r=e.pendingLanes,r&1?e===Dl?hs++:(hs=0,Dl=e):hs=0,qt(),null}function ln(){if(Xt!==null){var e=lf(Fr),t=$e.transition,i=B;try{if($e.transition=null,B=16>e?16:e,Xt===null)var n=!1;else{if(e=Xt,Xt=null,Fr=0,I&6)throw Error(A(331));var s=I;for(I|=4,D=e.current;D!==null;){var r=D,o=r.child;if(D.flags&16){var l=r.deletions;if(l!==null){for(var d=0;d<l.length;d++){var c=l[d];for(D=c;D!==null;){var f=D;switch(f.tag){case 0:case 11:case 15:fs(8,f,r)}var p=f.child;if(p!==null)p.return=f,D=p;else for(;D!==null;){f=D;var u=f.sibling,v=f.return;if(ru(f),f===c){D=null;break}if(u!==null){u.return=v,D=u;break}D=v}}}var g=r.alternate;if(g!==null){var m=g.child;if(m!==null){g.child=null;do{var b=m.sibling;m.sibling=null,m=b}while(m!==null)}}D=r}}if(r.subtreeFlags&2064&&o!==null)o.return=r,D=o;else e:for(;D!==null;){if(r=D,r.flags&2048)switch(r.tag){case 0:case 11:case 15:fs(9,r,r.return)}var h=r.sibling;if(h!==null){h.return=r.return,D=h;break e}D=r.return}}var x=e.current;for(D=x;D!==null;){o=D;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,D=y;else e:for(o=x;D!==null;){if(l=D,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Pr(9,l)}}catch(S){G(l,l.return,S)}if(l===o){D=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,D=w;break e}D=l.return}}if(I=s,qt(),pt&&typeof pt.onPostCommitFiberRoot=="function")try{pt.onPostCommitFiberRoot($s,e)}catch{}n=!0}return n}finally{B=i,$e.transition=t}}return!1}function wu(e,t,i){t=sn(i,t),t=Fp(e,t,1),e=Kt(e,t,1),t=Ce(),e!==null&&(Bn(e,1,t),Me(e,t))}function G(e,t,i){if(e.tag===3)wu(e,e,i);else for(;t!==null;){if(t.tag===3){wu(t,e,i);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Gt===null||!Gt.has(n))){e=sn(i,e),e=Wp(t,e,1),t=Kt(t,e,1),e=Ce(),t!==null&&(Bn(t,1,e),Me(t,e));break}}t=t.return}}function ny(e,t,i){var n=e.pingCache;n!==null&&n.delete(t),t=Ce(),e.pingedLanes|=e.suspendedLanes&i,ce===e&&(he&i)===i&&(oe===4||oe===3&&(he&130023424)===he&&500>Z()-zl?vi(e,0):Al|=i),Me(e,t)}function ku(e,t){t===0&&(e.mode&1?(t=Qs,Qs<<=1,!(Qs&130023424)&&(Qs=4194304)):t=1);var i=Ce();e=Dt(e,t),e!==null&&(Bn(e,t,i),Me(e,i))}function sy(e){var t=e.memoizedState,i=0;t!==null&&(i=t.retryLane),ku(e,i)}function ry(e,t){var i=0;switch(e.tag){case 13:var n=e.stateNode,s=e.memoizedState;s!==null&&(i=s.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(A(314))}n!==null&&n.delete(t),ku(e,i)}var Su;Su=function(e,t,i){if(e!==null)if(e.memoizedProps!==t.pendingProps||ze.current)De=!0;else{if(!(e.lanes&i)&&!(t.flags&128))return De=!1,qm(e,t,i);De=!!(e.flags&131072)}else De=!1,H&&t.flags&1048576&&ip(t,mr,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Mr(e,t),e=t.pendingProps;var s=Qi(t,me.current);tn(t,i),s=rl(null,t,n,e,s,i);var r=ol();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Re(n)?(r=!0,hr(t)):r=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Ja(t),s.updater=Dr,t.stateNode=s,s._reactInternals=t,pl(t,n,e,i),t=gl(null,t,n,!0,r,i)):(t.tag=0,H&&r&&Va(t),Ee(null,t,s,i),t=t.child),t;case 16:n=t.elementType;e:{switch(Mr(e,t),e=t.pendingProps,s=n._init,n=s(n._payload),t.type=n,s=t.tag=ay(n),e=nt(n,e),s){case 0:t=xl(null,t,n,e,i);break e;case 1:t=Qp(null,t,n,e,i);break e;case 11:t=Yp(null,t,n,e,i);break e;case 14:t=Hp(null,t,n,nt(n.type,e),i);break e}throw Error(A(306,n,""))}return t;case 0:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:nt(n,s),xl(e,t,n,s,i);case 1:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:nt(n,s),Qp(e,t,n,s,i);case 3:e:{if(Gp(t),e===null)throw Error(A(387));n=t.pendingProps,r=t.memoizedState,s=r.element,fp(e,t),Sr(t,n,null,i);var o=t.memoizedState;if(n=o.element,r.isDehydrated)if(r={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){s=sn(Error(A(423)),t),t=Xp(e,t,n,i,s);break e}else if(n!==s){s=sn(Error(A(424)),t),t=Xp(e,t,n,i,s);break e}else for(Fe=_t(t.stateNode.containerInfo.firstChild),Be=t,H=!0,it=null,i=dp(t,null,n,i),t.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(Ji(),n===s){t=Mt(e,t,i);break e}Ee(e,t,n,i)}t=t.child}return t;case 5:return hp(t),e===null&&Ha(t),n=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,o=s.children,Ia(n,s)?o=null:r!==null&&Ia(n,r)&&(t.flags|=32),Kp(e,t),Ee(e,t,o,i),t.child;case 6:return e===null&&Ha(t),null;case 13:return Jp(e,t,i);case 4:return Za(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Zi(t,null,n,i):Ee(e,t,n,i),t.child;case 11:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:nt(n,s),Yp(e,t,n,s,i);case 7:return Ee(e,t,t.pendingProps,i),t.child;case 8:return Ee(e,t,t.pendingProps.children,i),t.child;case 12:return Ee(e,t,t.pendingProps.children,i),t.child;case 10:e:{if(n=t.type._context,s=t.pendingProps,r=t.memoizedProps,o=s.value,V(br,n._currentValue),n._currentValue=o,r!==null)if(tt(r.value,o)){if(r.children===s.children&&!ze.current){t=Mt(e,t,i);break e}}else for(r=t.child,r!==null&&(r.return=t);r!==null;){var l=r.dependencies;if(l!==null){o=r.child;for(var d=l.firstContext;d!==null;){if(d.context===n){if(r.tag===1){d=jt(-1,i&-i),d.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?d.next=d:(d.next=f.next,f.next=d),c.pending=d}}r.lanes|=i,d=r.alternate,d!==null&&(d.lanes|=i),Ga(r.return,i,t),l.lanes|=i;break}d=d.next}}else if(r.tag===10)o=r.type===t.type?null:r.child;else if(r.tag===18){if(o=r.return,o===null)throw Error(A(341));o.lanes|=i,l=o.alternate,l!==null&&(l.lanes|=i),Ga(o,i,t),o=r.sibling}else o=r.child;if(o!==null)o.return=r;else for(o=r;o!==null;){if(o===t){o=null;break}if(r=o.sibling,r!==null){r.return=o.return,o=r;break}o=o.return}r=o}Ee(e,t,s.children,i),t=t.child}return t;case 9:return s=t.type,n=t.pendingProps.children,tn(t,i),s=He(s),n=n(s),t.flags|=1,Ee(e,t,n,i),t.child;case 14:return n=t.type,s=nt(n,t.pendingProps),s=nt(n.type,s),Hp(e,t,n,s,i);case 15:return qp(e,t,t.type,t.pendingProps,i);case 17:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:nt(n,s),Mr(e,t),t.tag=1,Re(n)?(e=!0,hr(t)):e=!1,tn(t,i),Op(t,n,s),pl(t,n,s,i),gl(null,t,n,!0,e,i);case 19:return eu(e,t,i);case 22:return $p(e,t,i)}throw Error(A(156,t.tag))};function Eu(e,t){return nf(e,t)}function oy(e,t,i,n){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ke(e,t,i,n){return new oy(e,t,i,n)}function Il(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ay(e){if(typeof e=="function")return Il(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vo)return 11;if(e===Ho)return 14}return 2}function ei(e,t){var i=e.alternate;return i===null?(i=Ke(e.tag,t,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i.alternate=e,e.alternate=i):(i.pendingProps=t,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=e.flags&14680064,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,t=e.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i}function _r(e,t,i,n,s,r){var o=2;if(n=e,typeof e=="function")Il(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Ii:return wi(i.children,s,r,t);case Wo:o=8,s|=8;break;case Uo:return e=Ke(12,i,t,s|2),e.elementType=Uo,e.lanes=r,e;case _o:return e=Ke(13,i,t,s),e.elementType=_o,e.lanes=r,e;case Yo:return e=Ke(19,i,t,s),e.elementType=Yo,e.lanes=r,e;case Mc:return Yr(i,s,r,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Dc:o=10;break e;case jc:o=9;break e;case Vo:o=11;break e;case Ho:o=14;break e;case Lt:o=16,n=null;break e}throw Error(A(130,e==null?e:typeof e,""))}return t=Ke(o,i,t,s),t.elementType=e,t.type=n,t.lanes=r,t}function wi(e,t,i,n){return e=Ke(7,e,n,t),e.lanes=i,e}function Yr(e,t,i,n){return e=Ke(22,e,n,t),e.elementType=Mc,e.lanes=i,e.stateNode={isHidden:!1},e}function Ol(e,t,i){return e=Ke(6,e,null,t),e.lanes=i,e}function Bl(e,t,i){return t=Ke(4,e.children!==null?e.children:[],e.key,t),t.lanes=i,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ly(e,t,i,n,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fa(0),this.expirationTimes=fa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fa(0),this.identifierPrefix=n,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Fl(e,t,i,n,s,r,o,l,d){return e=new ly(e,t,i,l,d),t===1?(t=1,r===!0&&(t|=8)):t=0,r=Ke(3,null,null,t),e.current=r,r.stateNode=e,r.memoizedState={element:n,isDehydrated:i,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ja(r),e}function dy(e,t,i){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Li,key:n==null?null:""+n,children:e,containerInfo:t,implementation:i}}function Cu(e){if(!e)return Ht;e=e._reactInternals;e:{if(di(e)!==e||e.tag!==1)throw Error(A(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Re(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(A(171))}if(e.tag===1){var i=e.type;if(Re(i))return Zf(e,i,t)}return t}function Tu(e,t,i,n,s,r,o,l,d){return e=Fl(i,n,!0,e,s,r,o,l,d),e.context=Cu(null),i=e.current,n=Ce(),s=Jt(i),r=jt(n,s),r.callback=t??null,Kt(i,r,s),e.current.lanes=s,Bn(e,s,n),Me(e,n),e}function Hr(e,t,i,n){var s=t.current,r=Ce(),o=Jt(s);return i=Cu(i),t.context===null?t.context=i:t.pendingContext=i,t=jt(r,o),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=Kt(s,t,o),e!==null&&(ot(e,s,o,r),kr(e,s,o)),o}function qr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Au(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<t?i:t}}function Wl(e,t){Au(e,t),(e=e.alternate)&&Au(e,t)}function cy(){return null}var zu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ul(e){this._internalRoot=e}$r.prototype.render=Ul.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(A(409));Hr(e,t,null,null)},$r.prototype.unmount=Ul.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;yi(function(){Hr(null,e,null,null)}),t[Tt]=null}};function $r(e){this._internalRoot=e}$r.prototype.unstable_scheduleHydration=function(e){if(e){var t=ff();e={blockedOn:null,target:e,priority:t};for(var i=0;i<Wt.length&&t!==0&&t<Wt[i].priority;i++);Wt.splice(i,0,e),i===0&&hf(e)}};function Vl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Kr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ru(){}function fy(e,t,i,n,s){if(s){if(typeof n=="function"){var r=n;n=function(){var c=qr(o);r.call(c)}}var o=Tu(t,n,e,0,null,!1,!1,"",Ru);return e._reactRootContainer=o,e[Tt]=o.current,Jn(e.nodeType===8?e.parentNode:e),yi(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof n=="function"){var l=n;n=function(){var c=qr(d);l.call(c)}}var d=Fl(e,0,!1,null,null,!1,!1,"",Ru);return e._reactRootContainer=d,e[Tt]=d.current,Jn(e.nodeType===8?e.parentNode:e),yi(function(){Hr(t,d,i,n)}),d}function Qr(e,t,i,n,s){var r=i._reactRootContainer;if(r){var o=r;if(typeof s=="function"){var l=s;s=function(){var d=qr(o);l.call(d)}}Hr(t,o,e,s)}else o=fy(i,t,e,s,n);return qr(o)}df=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var i=On(t.pendingLanes);i!==0&&(pa(t,i|1),Me(t,Z()),!(I&6)&&(an=Z()+500,qt()))}break;case 13:yi(function(){var n=Dt(e,1);if(n!==null){var s=Ce();ot(n,e,1,s)}}),Wl(e,1)}},ua=function(e){if(e.tag===13){var t=Dt(e,134217728);if(t!==null){var i=Ce();ot(t,e,134217728,i)}Wl(e,134217728)}},cf=function(e){if(e.tag===13){var t=Jt(e),i=Dt(e,t);if(i!==null){var n=Ce();ot(i,e,t,n)}Wl(e,t)}},ff=function(){return B},pf=function(e,t){var i=B;try{return B=e,t()}finally{B=i}},ra=function(e,t,i){switch(t){case"input":if(Xo(e,i),t=i.name,i.type==="radio"&&t!=null){for(i=e;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<i.length;t++){var n=i[t];if(n!==e&&n.form===e.form){var s=pr(n);if(!s)throw Error(A(90));Lc(n),Xo(n,s)}}}break;case"textarea":Wc(e,i);break;case"select":t=i.value,t!=null&&Oi(e,!!i.multiple,t,!1)}},Qc=Nl,Gc=yi;var py={usingClientEntryPoint:!1,Events:[ts,$i,pr,$c,Kc,Nl]},xs={findFiberByHostInstance:ci,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},uy={bundleType:xs.bundleType,version:xs.version,rendererPackageName:xs.rendererPackageName,rendererConfig:xs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ct.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ef(e),e===null?null:e.stateNode},findFiberByHostInstance:xs.findFiberByHostInstance||cy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gr.isDisabled&&Gr.supportsFiber)try{$s=Gr.inject(uy),pt=Gr}catch{}}Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=py,Le.createPortal=function(e,t){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vl(t))throw Error(A(200));return dy(e,t,null,i)},Le.createRoot=function(e,t){if(!Vl(e))throw Error(A(299));var i=!1,n="",s=zu;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Fl(e,1,!1,null,null,i,!1,n,s),e[Tt]=t.current,Jn(e.nodeType===8?e.parentNode:e),new Ul(t)},Le.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(A(188)):(e=Object.keys(e).join(","),Error(A(268,e)));return e=ef(t),e=e===null?null:e.stateNode,e},Le.flushSync=function(e){return yi(e)},Le.hydrate=function(e,t,i){if(!Kr(t))throw Error(A(200));return Qr(null,e,t,!0,i)},Le.hydrateRoot=function(e,t,i){if(!Vl(e))throw Error(A(405));var n=i!=null&&i.hydratedSources||null,s=!1,r="",o=zu;if(i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(r=i.identifierPrefix),i.onRecoverableError!==void 0&&(o=i.onRecoverableError)),t=Tu(t,null,e,1,i??null,s,!1,r,o),e[Tt]=t.current,Jn(e),n)for(e=0;e<n.length;e++)i=n[e],s=i._getVersion,s=s(i._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[i,s]:t.mutableSourceEagerHydrationData.push(i,s);return new $r(t)},Le.render=function(e,t,i){if(!Kr(t))throw Error(A(200));return Qr(null,e,t,!1,i)},Le.unmountComponentAtNode=function(e){if(!Kr(e))throw Error(A(40));return e._reactRootContainer?(yi(function(){Qr(null,null,e,!1,function(){e._reactRootContainer=null,e[Tt]=null})}),!0):!1},Le.unstable_batchedUpdates=Nl,Le.unstable_renderSubtreeIntoContainer=function(e,t,i,n){if(!Kr(i))throw Error(A(200));if(e==null||e._reactInternals===void 0)throw Error(A(38));return Qr(e,t,i,!1,n)},Le.version="18.3.1-next-f1338f8080-20240426";function Du(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Du)}catch(e){console.error(e)}}Du(),Ec.exports=Le;var hy=Ec.exports,ju,Mu=hy;ju=Mu.createRoot,Mu.hydrateRoot;const Nu=k.createContext({});function xy(e){const t=k.useRef(null);return t.current===null&&(t.current=e()),t.current}const gy=typeof window<"u"?k.useLayoutEffect:k.useEffect,_l=k.createContext(null);function Yl(e,t){e.indexOf(t)===-1&&e.push(t)}function Xr(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}const mt=(e,t,i)=>i>t?t:i<e?e:i;function Pu(e,t){return t?`${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}`:e}let gs=()=>{},ki=()=>{};typeof process<"u"&&((Vx=process.env)==null?void 0:Vx.NODE_ENV)!=="production"&&(gs=(e,t,i)=>{!e&&typeof console<"u"&&console.warn(Pu(t,i))},ki=(e,t,i)=>{if(!e)throw new Error(Pu(t,i))});const ti={},Lu=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),Iu=e=>typeof e=="object"&&e!==null,Ou=e=>/^0[^.\s]+$/u.test(e);function Bu(e){let t;return()=>(t===void 0&&(t=e()),t)}const Qe=e=>e,ms=(...e)=>e.reduce((t,i)=>n=>i(t(n))),ys=(e,t,i)=>{const n=t-e;return n?(i-e)/n:1};class Hl{constructor(){this.subscriptions=[]}add(t){return Yl(this.subscriptions,t),()=>Xr(this.subscriptions,t)}notify(t,i,n){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,i,n);else for(let r=0;r<s;r++){const o=this.subscriptions[r];o&&o(t,i,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ne=e=>e*1e3,Ge=e=>e/1e3,Fu=(e,t)=>t?e*(1e3/t):0,Wu=(e,t,i)=>(((1-3*i+3*t)*e+(3*i-6*t))*e+3*t)*e,my=1e-7,yy=12;function vy(e,t,i,n,s){let r,o,l=0;do o=t+(i-t)/2,r=Wu(o,n,s)-e,r>0?i=o:t=o;while(Math.abs(r)>my&&++l<yy);return o}function vs(e,t,i,n){if(e===t&&i===n)return Qe;const s=r=>vy(r,0,1,e,i);return r=>r===0||r===1?r:Wu(s(r),t,n)}const Uu=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,Vu=e=>t=>1-e(1-t),_u=vs(.33,1.53,.69,.99),ql=Vu(_u),Yu=Uu(ql),Hu=e=>e>=1?1:(e*=2)<1?.5*ql(e):.5*(2-Math.pow(2,-10*(e-1))),$l=e=>1-Math.sin(Math.acos(e)),qu=Vu($l),$u=Uu($l),by=vs(.42,0,1,1),wy=vs(0,0,.58,1),Ku=vs(.42,0,.58,1),ky=e=>Array.isArray(e)&&typeof e[0]!="number",Qu=e=>Array.isArray(e)&&typeof e[0]=="number",Gu={linear:Qe,easeIn:by,easeInOut:Ku,easeOut:wy,circIn:$l,circInOut:$u,circOut:qu,backIn:ql,backInOut:Yu,backOut:_u,anticipate:Hu},Sy=e=>typeof e=="string",Xu=e=>{if(Qu(e)){ki(e.length===4,"Cubic bezier arrays must contain four numerical values.","cubic-bezier-length");const[t,i,n,s]=e;return vs(t,i,n,s)}else if(Sy(e))return ki(Gu[e]!==void 0,`Invalid easing type '${e}'`,"invalid-easing-type"),Gu[e];return e},Jr=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Ey(e){let t=new Set,i=new Set,n=!1,s=!1;const r=new WeakSet;let o={delta:0,timestamp:0,isProcessing:!1};function l(c){r.has(c)&&(d.schedule(c),e()),c(o)}const d={schedule:(c,f=!1,p=!1)=>{const v=p&&n?t:i;return f&&r.add(c),v.add(c),c},cancel:c=>{i.delete(c),r.delete(c)},process:c=>{if(o=c,n){s=!0;return}n=!0;const f=t;t=i,i=f,t.forEach(l),t.clear(),n=!1,s&&(s=!1,d.process(c))}};return d}const Cy=40;function Ju(e,t){let i=!1,n=!0;const s={delta:0,timestamp:0,isProcessing:!1},r=()=>i=!0,o=Jr.reduce((y,w)=>(y[w]=Ey(r),y),{}),{setup:l,read:d,resolveKeyframes:c,preUpdate:f,update:p,preRender:u,render:v,postRender:g}=o,m=()=>{const y=ti.useManualTiming,w=y?s.timestamp:performance.now();i=!1,y||(s.delta=n?1e3/60:Math.max(Math.min(w-s.timestamp,Cy),1)),s.timestamp=w,s.isProcessing=!0,l.process(s),d.process(s),c.process(s),f.process(s),p.process(s),u.process(s),v.process(s),g.process(s),s.isProcessing=!1,i&&t&&(n=!1,e(m))},b=()=>{i=!0,n=!0,s.isProcessing||e(m)};return{schedule:Jr.reduce((y,w)=>{const S=o[w];return y[w]=(E,C=!1,T=!1)=>(i||b(),S.schedule(E,C,T)),y},{}),cancel:y=>{for(let w=0;w<Jr.length;w++)o[Jr[w]].cancel(y)},state:s,steps:o}}const{schedule:W,cancel:ii,state:xe,steps:Kl}=Ju(typeof requestAnimationFrame<"u"?requestAnimationFrame:Qe,!0);let Zr;function Ty(){Zr=void 0}const Te={now:()=>(Zr===void 0&&Te.set(xe.isProcessing||ti.useManualTiming?xe.timestamp:performance.now()),Zr),set:e=>{Zr=e,queueMicrotask(Ty)}},Zu=e=>t=>typeof t=="string"&&t.startsWith(e),eh=Zu("--"),Ay=Zu("var(--"),Ql=e=>Ay(e)?zy.test(e.split("/*")[0].trim()):!1,zy=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function th(e){return typeof e!="string"?!1:e.split("/*")[0].includes("var(--")}const dn={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},bs={...dn,transform:e=>mt(0,1,e)},eo={...dn,default:1},ws=e=>Math.round(e*1e5)/1e5,Gl=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Ry(e){return e==null}const Dy=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Xl=(e,t)=>i=>!!(typeof i=="string"&&Dy.test(i)&&i.startsWith(e)||t&&!Ry(i)&&Object.prototype.hasOwnProperty.call(i,t)),ih=(e,t,i)=>n=>{if(typeof n!="string")return n;const[s,r,o,l]=n.match(Gl);return{[e]:parseFloat(s),[t]:parseFloat(r),[i]:parseFloat(o),alpha:l!==void 0?parseFloat(l):1}},jy=e=>mt(0,255,e),Jl={...dn,transform:e=>Math.round(jy(e))},Si={test:Xl("rgb","red"),parse:ih("red","green","blue"),transform:({red:e,green:t,blue:i,alpha:n=1})=>"rgba("+Jl.transform(e)+", "+Jl.transform(t)+", "+Jl.transform(i)+", "+ws(bs.transform(n))+")"};function My(e){let t="",i="",n="",s="";return e.length>5?(t=e.substring(1,3),i=e.substring(3,5),n=e.substring(5,7),s=e.substring(7,9)):(t=e.substring(1,2),i=e.substring(2,3),n=e.substring(3,4),s=e.substring(4,5),t+=t,i+=i,n+=n,s+=s),{red:parseInt(t,16),green:parseInt(i,16),blue:parseInt(n,16),alpha:s?parseInt(s,16)/255:1}}const Zl={test:Xl("#"),parse:My,transform:Si.transform},ks=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),Pt=ks("deg"),yt=ks("%"),j=ks("px"),Ny=ks("vh"),Py=ks("vw"),nh={...yt,parse:e=>yt.parse(e)/100,transform:e=>yt.transform(e*100)},cn={test:Xl("hsl","hue"),parse:ih("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:i,alpha:n=1})=>"hsla("+Math.round(e)+", "+yt.transform(ws(t))+", "+yt.transform(ws(i))+", "+ws(bs.transform(n))+")"},te={test:e=>Si.test(e)||Zl.test(e)||cn.test(e),parse:e=>Si.test(e)?Si.parse(e):cn.test(e)?cn.parse(e):Zl.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?Si.transform(e):cn.transform(e),getAnimatableNone:e=>{const t=te.parse(e);return t.alpha=0,te.transform(t)}},Ly=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Iy(e){var t,i;return isNaN(e)&&typeof e=="string"&&(((t=e.match(Gl))==null?void 0:t.length)||0)+(((i=e.match(Ly))==null?void 0:i.length)||0)>0}const sh="number",rh="color",Oy="var",By="var(",oh="${}",Fy=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function fn(e){const t=e.toString(),i=[],n={color:[],number:[],var:[]},s=[];let r=0;const l=t.replace(Fy,d=>(te.test(d)?(n.color.push(r),s.push(rh),i.push(te.parse(d))):d.startsWith(By)?(n.var.push(r),s.push(Oy),i.push(d)):(n.number.push(r),s.push(sh),i.push(parseFloat(d))),++r,oh)).split(oh);return{values:i,split:l,indexes:n,types:s}}function Wy(e){return fn(e).values}function ah({split:e,types:t}){const i=e.length;return n=>{let s="";for(let r=0;r<i;r++)if(s+=e[r],n[r]!==void 0){const o=t[r];o===sh?s+=ws(n[r]):o===rh?s+=te.transform(n[r]):s+=n[r]}return s}}function Uy(e){return ah(fn(e))}const Vy=e=>typeof e=="number"?0:te.test(e)?te.getAnimatableNone(e):e,_y=(e,t)=>typeof e=="number"?t!=null&&t.trim().endsWith("/")?e:0:Vy(e);function Yy(e){const t=fn(e);return ah(t)(t.values.map((n,s)=>_y(n,t.split[s])))}const at={test:Iy,parse:Wy,createTransformer:Uy,getAnimatableNone:Yy};function ed(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*(2/3-i)*6:e}function Hy({hue:e,saturation:t,lightness:i,alpha:n}){e/=360,t/=100,i/=100;let s=0,r=0,o=0;if(!t)s=r=o=i;else{const l=i<.5?i*(1+t):i+t-i*t,d=2*i-l;s=ed(d,l,e+1/3),r=ed(d,l,e),o=ed(d,l,e-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:n}}function to(e,t){return i=>i>0?t:e}const U=(e,t,i)=>e+(t-e)*i,td=(e,t,i)=>{const n=e*e,s=i*(t*t-n)+n;return s<0?0:Math.sqrt(s)},qy=[Zl,Si,cn],$y=e=>qy.find(t=>t.test(e));function lh(e){const t=$y(e);if(gs(!!t,`'${e}' is not an animatable color. Use the equivalent color code instead.`,"color-not-animatable"),!t)return!1;let i=t.parse(e);return t===cn&&(i=Hy(i)),i}const dh=(e,t)=>{const i=lh(e),n=lh(t);if(!i||!n)return to(e,t);const s={...i};return r=>(s.red=td(i.red,n.red,r),s.green=td(i.green,n.green,r),s.blue=td(i.blue,n.blue,r),s.alpha=U(i.alpha,n.alpha,r),Si.transform(s))},id=new Set(["none","hidden"]);function Ky(e,t){return id.has(e)?i=>i<=0?e:t:i=>i>=1?t:e}function Qy(e,t){return i=>U(e,t,i)}function nd(e){return typeof e=="number"?Qy:typeof e=="string"?Ql(e)?to:te.test(e)?dh:Jy:Array.isArray(e)?ch:typeof e=="object"?te.test(e)?dh:Gy:to}function ch(e,t){const i=[...e],n=i.length,s=e.map((r,o)=>nd(r)(r,t[o]));return r=>{for(let o=0;o<n;o++)i[o]=s[o](r);return i}}function Gy(e,t){const i={...e,...t},n={};for(const s in i)e[s]!==void 0&&t[s]!==void 0&&(n[s]=nd(e[s])(e[s],t[s]));return s=>{for(const r in n)i[r]=n[r](s);return i}}function Xy(e,t){const i=[],n={color:0,var:0,number:0};for(let s=0;s<t.values.length;s++){const r=t.types[s],o=e.indexes[r][n[r]],l=e.values[o]??0;i[s]=l,n[r]++}return i}const Jy=(e,t)=>{const i=at.createTransformer(t),n=fn(e),s=fn(t);return n.indexes.var.length===s.indexes.var.length&&n.indexes.color.length===s.indexes.color.length&&n.indexes.number.length>=s.indexes.number.length?id.has(e)&&!s.values.length||id.has(t)&&!n.values.length?Ky(e,t):ms(ch(Xy(n,s),s.values),i):(gs(!0,`Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,"complex-values-different"),to(e,t))};function fh(e,t,i){return typeof e=="number"&&typeof t=="number"&&typeof i=="number"?U(e,t,i):nd(e)(e,t)}const Zy=e=>{const t=({timestamp:i})=>e(i);return{start:(i=!0)=>W.update(t,i),stop:()=>ii(t),now:()=>xe.isProcessing?xe.timestamp:Te.now()}},ph=(e,t,i=10)=>{let n="";const s=Math.max(Math.round(t/i),2);for(let r=0;r<s;r++)n+=Math.round(e(r/(s-1))*1e4)/1e4+", ";return`linear(${n.substring(0,n.length-2)})`},io=2e4;function sd(e){let t=0;const i=50;let n=e.next(t);for(;!n.done&&t<io;)t+=i,n=e.next(t);return t>=io?1/0:t}function e1(e,t=100,i){const n=i({...e,keyframes:[0,t]}),s=Math.min(sd(n),io);return{type:"keyframes",ease:r=>n.next(s*r).value/t,duration:Ge(s)}}const Q={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function rd(e,t){return e*Math.sqrt(1-t*t)}const t1=12;function i1(e,t,i){let n=i;for(let s=1;s<t1;s++)n=n-e(n)/t(n);return n}const od=.001;function n1({duration:e=Q.duration,bounce:t=Q.bounce,velocity:i=Q.velocity,mass:n=Q.mass}){let s,r;gs(e<=Ne(Q.maxDuration),"Spring duration must be 10 seconds or less","spring-duration-limit");let o=1-t;o=mt(Q.minDamping,Q.maxDamping,o),e=mt(Q.minDuration,Q.maxDuration,Ge(e)),o<1?(s=c=>{const f=c*o,p=f*e,u=f-i,v=rd(c,o),g=Math.exp(-p);return od-u/v*g},r=c=>{const p=c*o*e,u=p*i+i,v=Math.pow(o,2)*Math.pow(c,2)*e,g=Math.exp(-p),m=rd(Math.pow(c,2),o);return(-s(c)+od>0?-1:1)*((u-v)*g)/m}):(s=c=>{const f=Math.exp(-c*e),p=(c-i)*e+1;return-od+f*p},r=c=>{const f=Math.exp(-c*e),p=(i-c)*(e*e);return f*p});const l=5/e,d=i1(s,r,l);if(e=Ne(e),isNaN(d))return{stiffness:Q.stiffness,damping:Q.damping,duration:e};{const c=Math.pow(d,2)*n;return{stiffness:c,damping:o*2*Math.sqrt(n*c),duration:e}}}const s1=["duration","bounce"],r1=["stiffness","damping","mass"];function uh(e,t){return t.some(i=>e[i]!==void 0)}function o1(e){let t={velocity:Q.velocity,stiffness:Q.stiffness,damping:Q.damping,mass:Q.mass,isResolvedFromDuration:!1,...e};if(!uh(e,r1)&&uh(e,s1))if(t.velocity=0,e.visualDuration){const i=e.visualDuration,n=2*Math.PI/(i*1.2),s=n*n,r=2*mt(.05,1,1-(e.bounce||0))*Math.sqrt(s);t={...t,mass:Q.mass,stiffness:s,damping:r}}else{const i=n1({...e,velocity:0});t={...t,...i,mass:Q.mass},t.isResolvedFromDuration=!0}return t}function no(e=Q.visualDuration,t=Q.bounce){const i=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:n,restDelta:s}=i;const r=i.keyframes[0],o=i.keyframes[i.keyframes.length-1],l={done:!1,value:r},{stiffness:d,damping:c,mass:f,duration:p,velocity:u,isResolvedFromDuration:v}=o1({...i,velocity:-Ge(i.velocity||0)}),g=u||0,m=c/(2*Math.sqrt(d*f)),b=o-r,h=Ge(Math.sqrt(d/f)),x=Math.abs(b)<5;n||(n=x?Q.restSpeed.granular:Q.restSpeed.default),s||(s=x?Q.restDelta.granular:Q.restDelta.default);let y,w,S,E,C,T;if(m<1)S=rd(h,m),E=(g+m*h*b)/S,y=z=>{const O=Math.exp(-m*h*z);return o-O*(E*Math.sin(S*z)+b*Math.cos(S*z))},C=m*h*E+b*S,T=m*h*b-E*S,w=z=>Math.exp(-m*h*z)*(C*Math.sin(S*z)+T*Math.cos(S*z));else if(m===1){y=O=>o-Math.exp(-h*O)*(b+(g+h*b)*O);const z=g+h*b;w=O=>Math.exp(-h*O)*(h*z*O-g)}else{const z=h*Math.sqrt(m*m-1);y=Ve=>{const ft=Math.exp(-m*h*Ve),Pe=Math.min(z*Ve,300);return o-ft*((g+m*h*b)*Math.sinh(Pe)+z*b*Math.cosh(Pe))/z};const O=(g+m*h*b)/z,ne=m*h*O-b*z,Ue=m*h*b-O*z;w=Ve=>{const ft=Math.exp(-m*h*Ve),Pe=Math.min(z*Ve,300);return ft*(ne*Math.sinh(Pe)+Ue*Math.cosh(Pe))}}const P={calculatedDuration:v&&p||null,velocity:z=>Ne(w(z)),next:z=>{if(!v&&m<1){const ne=Math.exp(-m*h*z),Ue=Math.sin(S*z),Ve=Math.cos(S*z),ft=o-ne*(E*Ue+b*Ve),Pe=Ne(ne*(C*Ue+T*Ve));return l.done=Math.abs(Pe)<=n&&Math.abs(o-ft)<=s,l.value=l.done?o:ft,l}const O=y(z);if(v)l.done=z>=p;else{const ne=Ne(w(z));l.done=Math.abs(ne)<=n&&Math.abs(o-O)<=s}return l.value=l.done?o:O,l},toString:()=>{const z=Math.min(sd(P),io),O=ph(ne=>P.next(z*ne).value,z,30);return z+"ms "+O},toTransition:()=>{}};return P}no.applyToOptions=e=>{const t=e1(e,100,no);return e.ease=t.ease,e.duration=Ne(t.duration),e.type="keyframes",e};const a1=5;function hh(e,t,i){const n=Math.max(t-a1,0);return Fu(i-e(n),t-n)}function ad({keyframes:e,velocity:t=0,power:i=.8,timeConstant:n=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:l,max:d,restDelta:c=.5,restSpeed:f}){const p=e[0],u={done:!1,value:p},v=T=>l!==void 0&&T<l||d!==void 0&&T>d,g=T=>l===void 0?d:d===void 0||Math.abs(l-T)<Math.abs(d-T)?l:d;let m=i*t;const b=p+m,h=o===void 0?b:o(b);h!==b&&(m=h-p);const x=T=>-m*Math.exp(-T/n),y=T=>h+x(T),w=T=>{const P=x(T),z=y(T);u.done=Math.abs(P)<=c,u.value=u.done?h:z};let S,E;const C=T=>{v(u.value)&&(S=T,E=no({keyframes:[u.value,g(u.value)],velocity:hh(y,T,u.value),damping:s,stiffness:r,restDelta:c,restSpeed:f}))};return C(0),{calculatedDuration:null,next:T=>{let P=!1;return!E&&S===void 0&&(P=!0,w(T),C(T)),S!==void 0&&T>=S?E.next(T-S):(!P&&w(T),u)}}}function l1(e,t,i){const n=[],s=i||ti.mix||fh,r=e.length-1;for(let o=0;o<r;o++){let l=s(e[o],e[o+1]);if(t){const d=Array.isArray(t)?t[o]||Qe:t;l=ms(d,l)}n.push(l)}return n}function d1(e,t,{clamp:i=!0,ease:n,mixer:s}={}){const r=e.length;if(ki(r===t.length,"Both input and output ranges must be the same length","range-length"),r===1)return()=>t[0];if(r===2&&t[0]===t[1])return()=>t[1];const o=e[0]===e[1];e[0]>e[r-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=l1(t,n,s),d=l.length,c=f=>{if(o&&f<e[0])return t[0];let p=0;if(d>1)for(;p<e.length-2&&!(f<e[p+1]);p++);const u=ys(e[p],e[p+1],f);return l[p](u)};return i?f=>c(mt(e[0],e[r-1],f)):c}function c1(e,t){const i=e[e.length-1];for(let n=1;n<=t;n++){const s=ys(0,t,n);e.push(U(i,1,s))}}function f1(e){const t=[0];return c1(t,e.length-1),t}function p1(e,t){return e.map(i=>i*t)}function u1(e,t){return e.map(()=>t||Ku).splice(0,e.length-1)}function Ss({duration:e=300,keyframes:t,times:i,ease:n="easeInOut"}){const s=ky(n)?n.map(Xu):Xu(n),r={done:!1,value:t[0]},o=p1(i&&i.length===t.length?i:f1(t),e),l=d1(o,t,{ease:Array.isArray(s)?s:u1(t,s)});return{calculatedDuration:e,next:d=>(r.value=l(d),r.done=d>=e,r)}}const h1=e=>e!==null;function so(e,{repeat:t,repeatType:i="loop"},n,s=1){const r=e.filter(h1),l=s<0||t&&i!=="loop"&&t%2===1?0:r.length-1;return!l||n===void 0?r[l]:n}const x1={decay:ad,inertia:ad,tween:Ss,keyframes:Ss,spring:no};function xh(e){typeof e.type=="string"&&(e.type=x1[e.type])}class ld{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,i){return this.finished.then(t,i)}}const g1=e=>e/100;class ro extends ld{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var n,s;const{motionValue:i}=this.options;i&&i.updatedAt!==Te.now()&&this.tick(Te.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(s=(n=this.options).onStop)==null||s.call(n))},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause()}initAnimation(){const{options:t}=this;xh(t);const{type:i=Ss,repeat:n=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=t;let{keyframes:l}=t;const d=i||Ss;d!==Ss&&typeof l[0]!="number"&&(this.mixKeyframes=ms(g1,fh(l[0],l[1])),l=[0,100]);const c=d({...t,keyframes:l});r==="mirror"&&(this.mirroredGenerator=d({...t,keyframes:[...l].reverse(),velocity:-o})),c.calculatedDuration===null&&(c.calculatedDuration=sd(c));const{calculatedDuration:f}=c;this.calculatedDuration=f,this.resolvedDuration=f+s,this.totalDuration=this.resolvedDuration*(n+1)-s,this.generator=c}updateTime(t){const i=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=i}tick(t,i=!1){const{generator:n,totalDuration:s,mixKeyframes:r,mirroredGenerator:o,resolvedDuration:l,calculatedDuration:d}=this;if(this.startTime===null)return n.next(0);const{delay:c=0,keyframes:f,repeat:p,repeatType:u,repeatDelay:v,type:g,onUpdate:m,finalKeyframe:b}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-s/this.speed,this.startTime)),i?this.currentTime=t:this.updateTime(t);const h=this.currentTime-c*(this.playbackSpeed>=0?1:-1),x=this.playbackSpeed>=0?h<0:h>s;this.currentTime=Math.max(h,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=s);let y=this.currentTime,w=n;if(p){const T=Math.min(this.currentTime,s)/l;let P=Math.floor(T),z=T%1;!z&&T>=1&&(z=1),z===1&&P--,P=Math.min(P,p+1),!!(P%2)&&(u==="reverse"?(z=1-z,v&&(z-=v/l)):u==="mirror"&&(w=o)),y=mt(0,1,z)*l}let S;x?(this.delayState.value=f[0],S=this.delayState):S=w.next(y),r&&!x&&(S.value=r(S.value));let{done:E}=S;!x&&d!==null&&(E=this.playbackSpeed>=0?this.currentTime>=s:this.currentTime<=0);const C=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&E);return C&&g!==ad&&(S.value=so(f,this.options,b,this.speed)),m&&m(S.value),C&&this.finish(),S}then(t,i){return this.finished.then(t,i)}get duration(){return Ge(this.calculatedDuration)}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+Ge(t)}get time(){return Ge(this.currentTime)}set time(t){t=Ne(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=t,this.tick(t))}getGeneratorVelocity(){const t=this.currentTime;if(t<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(t);const i=this.generator.next(t).value;return hh(n=>this.generator.next(n).value,t,i)}get speed(){return this.playbackSpeed}set speed(t){const i=this.playbackSpeed!==t;i&&this.driver&&this.updateTime(Te.now()),this.playbackSpeed=t,i&&this.driver&&(this.time=Ge(this.currentTime))}play(){var s,r;if(this.isStopped)return;const{driver:t=Zy,startTime:i}=this.options;this.driver||(this.driver=t(o=>this.tick(o))),(r=(s=this.options).onPlay)==null||r.call(s);const n=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=n):this.holdTime!==null?this.startTime=n-this.holdTime:this.startTime||(this.startTime=i??n),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Te.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var t,i;this.notifyFinished(),this.teardown(),this.state="finished",(i=(t=this.options).onComplete)==null||i.call(t)}cancel(){var t,i;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(i=(t=this.options).onCancel)==null||i.call(t)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){var i;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(i=this.driver)==null||i.stop(),t.observe(this)}}function m1(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}const Ei=e=>e*180/Math.PI,dd=e=>{const t=Ei(Math.atan2(e[1],e[0]));return cd(t)},y1={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:dd,rotateZ:dd,skewX:e=>Ei(Math.atan(e[1])),skewY:e=>Ei(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},cd=e=>(e=e%360,e<0&&(e+=360),e),gh=dd,mh=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),yh=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),v1={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:mh,scaleY:yh,scale:e=>(mh(e)+yh(e))/2,rotateX:e=>cd(Ei(Math.atan2(e[6],e[5]))),rotateY:e=>cd(Ei(Math.atan2(-e[2],e[0]))),rotateZ:gh,rotate:gh,skewX:e=>Ei(Math.atan(e[4])),skewY:e=>Ei(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function fd(e){return e.includes("scale")?1:0}function pd(e,t){if(!e||e==="none")return fd(t);const i=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let n,s;if(i)n=v1,s=i;else{const l=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);n=y1,s=l}if(!s)return fd(t);const r=n[t],o=s[1].split(",").map(w1);return typeof r=="function"?r(o):o[r]}const b1=(e,t)=>{const{transform:i="none"}=getComputedStyle(e);return pd(i,t)};function w1(e){return parseFloat(e.trim())}const pn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],un=new Set([...pn,"pathRotation"]),vh=e=>e===dn||e===j,k1=new Set(["x","y","z"]),S1=pn.filter(e=>!k1.has(e));function E1(e){const t=[];return S1.forEach(i=>{const n=e.getValue(i);n!==void 0&&(t.push([i,n.get()]),n.set(i.startsWith("scale")?1:0))}),t}const ni={width:({x:e},{paddingLeft:t="0",paddingRight:i="0",boxSizing:n})=>{const s=e.max-e.min;return n==="border-box"?s:s-parseFloat(t)-parseFloat(i)},height:({y:e},{paddingTop:t="0",paddingBottom:i="0",boxSizing:n})=>{const s=e.max-e.min;return n==="border-box"?s:s-parseFloat(t)-parseFloat(i)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>pd(t,"x"),y:(e,{transform:t})=>pd(t,"y")};ni.translateX=ni.x,ni.translateY=ni.y;const Ci=new Set;let ud=!1,hd=!1,xd=!1;function bh(){if(hd){const e=Array.from(Ci).filter(n=>n.needsMeasurement),t=new Set(e.map(n=>n.element)),i=new Map;t.forEach(n=>{const s=E1(n);s.length&&(i.set(n,s),n.render())}),e.forEach(n=>n.measureInitialState()),t.forEach(n=>{n.render();const s=i.get(n);s&&s.forEach(([r,o])=>{var l;(l=n.getValue(r))==null||l.set(o)})}),e.forEach(n=>n.measureEndState()),e.forEach(n=>{n.suspendedScrollY!==void 0&&window.scrollTo(0,n.suspendedScrollY)})}hd=!1,ud=!1,Ci.forEach(e=>e.complete(xd)),Ci.clear()}function wh(){Ci.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(hd=!0)})}function C1(){xd=!0,wh(),bh(),xd=!1}class gd{constructor(t,i,n,s,r,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=i,this.name=n,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(Ci.add(this),ud||(ud=!0,W.read(wh),W.resolveKeyframes(bh))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:i,element:n,motionValue:s}=this;if(t[0]===null){const r=s==null?void 0:s.get(),o=t[t.length-1];if(r!==void 0)t[0]=r;else if(n&&i){const l=n.readValue(i,o);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=o),s&&r===void 0&&s.set(t[0])}m1(t)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),Ci.delete(this)}cancel(){this.state==="scheduled"&&(Ci.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const T1=e=>e.startsWith("--");function kh(e,t,i){T1(t)?e.style.setProperty(t,i):e.style[t]=i}const A1={};function Sh(e,t){const i=Bu(e);return()=>A1[t]??i()}const z1=Sh(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Eh=Sh(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Es=([e,t,i,n])=>`cubic-bezier(${e}, ${t}, ${i}, ${n})`,Ch={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Es([0,.65,.55,1]),circOut:Es([.55,0,1,.45]),backIn:Es([.31,.01,.66,-.59]),backOut:Es([.33,1.53,.69,.99])};function Th(e,t){if(e)return typeof e=="function"?Eh()?ph(e,t):"ease-out":Qu(e)?Es(e):Array.isArray(e)?e.map(i=>Th(i,t)||Ch.easeOut):Ch[e]}function R1(e,t,i,{delay:n=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:l="easeOut",times:d}={},c=void 0){const f={[t]:i};d&&(f.offset=d);const p=Th(l,s);Array.isArray(p)&&(f.easing=p);const u={delay:n,duration:s,easing:Array.isArray(p)?"linear":p,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"};return c&&(u.pseudoElement=c),e.animate(f,u)}function Ah(e){return typeof e=="function"&&"applyToOptions"in e}function D1({type:e,...t}){return Ah(e)&&Eh()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}class zh extends ld{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!t)return;const{element:i,name:n,keyframes:s,pseudoElement:r,allowFlatten:o=!1,finalKeyframe:l,onComplete:d}=t;this.isPseudoElement=!!r,this.allowFlatten=o,this.options=t,ki(typeof t.type!="string",`Mini animate() doesn't support "type" as a string.`,"mini-spring");const c=D1(t);this.animation=R1(i,n,s,c,r),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!r){const f=so(s,this.options,l,this.speed);this.updateMotionValue&&this.updateMotionValue(f),kh(i,n,f),this.animation.cancel()}d==null||d(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var t,i;(i=(t=this.animation).finish)==null||i.call(t)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:t}=this;t==="idle"||t==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var i,n,s;const t=(i=this.options)==null?void 0:i.element;!this.isPseudoElement&&(t!=null&&t.isConnected)&&((s=(n=this.animation).commitStyles)==null||s.call(n))}get duration(){var i,n;const t=((n=(i=this.animation.effect)==null?void 0:i.getComputedTiming)==null?void 0:n.call(i).duration)||0;return Ge(Number(t))}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+Ge(t)}get time(){return Ge(Number(this.animation.currentTime)||0)}set time(t){const i=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ne(t),i&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(t){this.manualStartTime=this.animation.startTime=t}attachTimeline({timeline:t,rangeStart:i,rangeEnd:n,observe:s}){var r;return this.allowFlatten&&((r=this.animation.effect)==null||r.updateTiming({easing:"linear"})),this.animation.onfinish=null,t&&z1()?(this.animation.timeline=t,i&&(this.animation.rangeStart=i),n&&(this.animation.rangeEnd=n),Qe):s(this)}}const Rh={anticipate:Hu,backInOut:Yu,circInOut:$u};function j1(e){return e in Rh}function M1(e){typeof e.ease=="string"&&j1(e.ease)&&(e.ease=Rh[e.ease])}const md=10;class N1 extends zh{constructor(t){M1(t),xh(t),super(t),t.startTime!==void 0&&t.autoplay!==!1&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){const{motionValue:i,onUpdate:n,onComplete:s,element:r,...o}=this.options;if(!i)return;if(t!==void 0){i.set(t);return}const l=new ro({...o,autoplay:!1}),d=Math.max(md,Te.now()-this.startTime),c=mt(0,md,d-md),f=l.sample(d).value,{name:p}=this.options;r&&p&&kh(r,p,f),i.setWithVelocity(l.sample(Math.max(0,d-c)).value,f,c),l.stop()}}const Dh=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(at.test(e)||e==="0")&&!e.startsWith("url("));function P1(e){const t=e[0];if(e.length===1)return!0;for(let i=0;i<e.length;i++)if(e[i]!==t)return!0}function L1(e,t,i,n){const s=e[0];if(s===null)return!1;if(t==="display"||t==="visibility")return!0;const r=e[e.length-1],o=Dh(s,t),l=Dh(r,t);return gs(o===l,`You are trying to animate ${t} from "${s}" to "${r}". "${o?r:s}" is not an animatable value.`,"value-not-animatable"),!o||!l?!1:P1(e)||(i==="spring"||Ah(i))&&n}function yd(e){e.duration=0,e.type="keyframes"}const jh=new Set(["opacity","clipPath","filter","transform"]),I1=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function O1(e){for(let t=0;t<e.length;t++)if(typeof e[t]=="string"&&I1.test(e[t]))return!0;return!1}const B1=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),F1=Bu(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function W1(e){var p;const{motionValue:t,name:i,repeatDelay:n,repeatType:s,damping:r,type:o,keyframes:l}=e;if(!(((p=t==null?void 0:t.owner)==null?void 0:p.current)instanceof HTMLElement))return!1;const{onUpdate:c,transformTemplate:f}=t.owner.getProps();return F1()&&i&&(jh.has(i)||B1.has(i)&&O1(l))&&(i!=="transform"||!f)&&!c&&!n&&s!=="mirror"&&r!==0&&o!=="inertia"}const U1=40;class V1 extends ld{constructor({autoplay:t=!0,delay:i=0,type:n="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",keyframes:l,name:d,motionValue:c,element:f,...p}){var g;super(),this.stop=()=>{var m,b;this._animation&&(this._animation.stop(),(m=this.stopTimeline)==null||m.call(this)),(b=this.keyframeResolver)==null||b.cancel()},this.createdAt=Te.now();const u={autoplay:t,delay:i,type:n,repeat:s,repeatDelay:r,repeatType:o,name:d,motionValue:c,element:f,...p},v=(f==null?void 0:f.KeyframeResolver)||gd;this.keyframeResolver=new v(l,(m,b,h)=>this.onKeyframesResolved(m,b,u,!h),d,c,f),(g=this.keyframeResolver)==null||g.scheduleResolve()}onKeyframesResolved(t,i,n,s){var h,x;this.keyframeResolver=void 0;const{name:r,type:o,velocity:l,delay:d,isHandoff:c,onUpdate:f}=n;this.resolvedAt=Te.now();let p=!0;L1(t,r,o,l)||(p=!1,(ti.instantAnimations||!d)&&(f==null||f(so(t,n,i))),t[0]=t[t.length-1],yd(n),n.repeat=0);const v={startTime:s?this.resolvedAt?this.resolvedAt-this.createdAt>U1?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:i,...n,keyframes:t},g=p&&!c&&W1(v),m=(x=(h=v.motionValue)==null?void 0:h.owner)==null?void 0:x.current;let b;if(g)try{b=new N1({...v,element:m})}catch{b=new ro(v)}else b=new ro(v);b.finished.then(()=>{this.notifyFinished()}).catch(Qe),this.pendingTimeline&&(this.stopTimeline=b.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=b}get finished(){return this._animation?this.animation.finished:this._finished}then(t,i){return this.finished.finally(t).then(()=>{})}get animation(){var t;return this._animation||((t=this.keyframeResolver)==null||t.resume(),C1()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var t;this._animation&&this.animation.cancel(),(t=this.keyframeResolver)==null||t.cancel()}}function Mh(e,t,i,n=0,s=1){const r=Array.from(e).sort((c,f)=>c.sortNodePosition(f)).indexOf(t),o=e.size,l=(o-1)*n;return typeof i=="function"?i(r,o):s===1?r*n:l-r*n}const Nh=30,_1=e=>!isNaN(parseFloat(e));class Y1{constructor(t,i={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=n=>{var r;const s=Te.now();if(this.updatedAt!==s&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(n),this.current!==this.prev&&((r=this.events.change)==null||r.notify(this.current),this.dependents))for(const o of this.dependents)o.dirty()},this.hasAnimated=!1,this.setCurrent(t),this.owner=i.owner}setCurrent(t){this.current=t,this.updatedAt=Te.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=_1(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,i){this.events[t]||(this.events[t]=new Hl);const n=this.events[t].add(i);return t==="change"?()=>{n(),W.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,i){this.passiveEffect=t,this.stopPassiveEffect=i}set(t){this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t)}setWithVelocity(t,i,n){this.set(i),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-n}jump(t,i=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,i&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var t;(t=this.events.change)==null||t.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=Te.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Nh)return 0;const i=Math.min(this.updatedAt-this.prevUpdatedAt,Nh);return Fu(parseFloat(this.current)-parseFloat(this.prevFrameValue),i)}start(t){return this.stop(),new Promise(i=>{this.hasAnimated=!0,this.animation=t(i),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var t,i;(t=this.dependents)==null||t.clear(),(i=this.events.destroy)==null||i.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function hn(e,t){return new Y1(e,t)}function Ph(e,t){if(e!=null&&e.inherit&&t){const{inherit:i,...n}=e;return{...t,...n}}return e}function vd(e,t){const i=(e==null?void 0:e[t])??(e==null?void 0:e.default)??e;return i!==e?Ph(i,e):i}const H1={type:"spring",stiffness:500,damping:25,restSpeed:10},q1=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),$1={type:"keyframes",duration:.8},K1={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Q1=(e,{keyframes:t})=>t.length>2?$1:un.has(e)?e.startsWith("scale")?q1(t[1]):H1:K1,G1=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function X1(e){for(const t in e)if(!G1.has(t))return!0;return!1}const bd=(e,t,i,n={},s,r)=>o=>{const l=vd(n,e)||{},d=l.delay||n.delay||0;let{elapsed:c=0}=n;c=c-Ne(d);const f={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-c,onUpdate:u=>{t.set(u),l.onUpdate&&l.onUpdate(u)},onComplete:()=>{o(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:r?void 0:s};X1(l)||Object.assign(f,Q1(e,f)),f.duration&&(f.duration=Ne(f.duration)),f.repeatDelay&&(f.repeatDelay=Ne(f.repeatDelay)),f.from!==void 0&&(f.keyframes[0]=f.from);let p=!1;if((f.type===!1||f.duration===0&&!f.repeatDelay)&&(yd(f),f.delay===0&&(p=!0)),(ti.instantAnimations||ti.skipAnimations||s!=null&&s.shouldSkipAnimations||l.skipAnimations)&&(p=!0,yd(f),f.delay=0),f.allowFlatten=!l.type&&!l.ease,p&&!r&&t.get()!==void 0){const u=so(f.keyframes,l);if(u!==void 0){W.update(()=>{f.onUpdate(u),f.onComplete()});return}}return l.isSync?new ro(f):new V1(f)},J1=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function Z1(e){const t=J1.exec(e);if(!t)return[,];const[,i,n,s]=t;return[`--${i??n}`,s]}const e2=4;function Lh(e,t,i=1){ki(i<=e2,`Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,"max-css-var-depth");const[n,s]=Z1(e);if(!n)return;const r=window.getComputedStyle(t).getPropertyValue(n);if(r){const o=r.trim();return Lu(o)?parseFloat(o):o}return Ql(s)?Lh(s,t,i+1):s}function Ih(e){const t=[{},{}];return e==null||e.values.forEach((i,n)=>{t[0][n]=i.get(),t[1][n]=i.getVelocity()}),t}function wd(e,t,i,n){if(typeof t=="function"){const[s,r]=Ih(n);t=t(i!==void 0?i:e.custom,s,r)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[s,r]=Ih(n);t=t(i!==void 0?i:e.custom,s,r)}return t}function Ti(e,t,i){const n=e.getProps();return wd(n,t,i!==void 0?i:n.custom,e)}const Oh=new Set(["width","height","top","left","right","bottom",...pn]),kd=e=>Array.isArray(e);function t2(e,t,i){e.hasValue(t)?e.getValue(t).set(i):e.addValue(t,hn(i))}function i2(e){return kd(e)?e[e.length-1]||0:e}function n2(e,t){const i=Ti(e,t);let{transitionEnd:n={},transition:s={},...r}=i||{};r={...r,...n};for(const o in r){const l=i2(r[o]);t2(e,o,l)}}const ge=e=>!!(e&&e.getVelocity);function s2(e){return!!(ge(e)&&e.add)}function Sd(e,t){const i=e.getValue("willChange");if(s2(i))return i.add(t);if(!i&&ti.WillChange){const n=new ti.WillChange("auto");e.addValue("willChange",n),n.add(t)}}function Ed(e){return e.replace(/([A-Z])/g,t=>`-${t.toLowerCase()}`)}const Bh="data-"+Ed("framerAppearId");function Fh(e){return e.props[Bh]}function r2({protectedKeys:e,needsAnimating:t},i){const n=e.hasOwnProperty(i)&&t[i]!==!0;return t[i]=!1,n}function Wh(e,t,{delay:i=0,transitionOverride:n,type:s}={}){let{transition:r,transitionEnd:o,...l}=t;const d=e.getDefaultTransition();r=r?Ph(r,d):d;const c=r==null?void 0:r.reduceMotion,f=r==null?void 0:r.skipAnimations;n&&(r=n);const p=[],u=s&&e.animationState&&e.animationState.getState()[s],v=r==null?void 0:r.path;v&&v.animateVisualElement(e,l,r,i,p);for(const g in l){const m=e.getValue(g,e.latestValues[g]??null),b=l[g];if(b===void 0||u&&r2(u,g))continue;const h={delay:i,...vd(r||{},g)};f&&(h.skipAnimations=!0);const x=m.get();if(x!==void 0&&!m.isAnimating()&&!Array.isArray(b)&&b===x&&!h.velocity){W.update(()=>m.set(b));continue}let y=!1;if(window.MotionHandoffAnimation){const E=Fh(e);if(E){const C=window.MotionHandoffAnimation(E,g,W);C!==null&&(h.startTime=C,y=!0)}}Sd(e,g);const w=c??e.shouldReduceMotion;m.start(bd(g,m,b,w&&Oh.has(g)?{type:!1}:h,e,y));const S=m.animation;S&&p.push(S)}if(o){const g=()=>W.update(()=>{o&&n2(e,o)});p.length?Promise.all(p).then(g):g()}return p}function Cd(e,t,i={}){var d;const n=Ti(e,t,i.type==="exit"?(d=e.presenceContext)==null?void 0:d.custom:void 0);let{transition:s=e.getDefaultTransition()||{}}=n||{};i.transitionOverride&&(s=i.transitionOverride);const r=n?()=>Promise.all(Wh(e,n,i)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(c=0)=>{const{delayChildren:f=0,staggerChildren:p,staggerDirection:u}=s;return o2(e,t,c,f,p,u,i)}:()=>Promise.resolve(),{when:l}=s;if(l){const[c,f]=l==="beforeChildren"?[r,o]:[o,r];return c().then(()=>f())}else return Promise.all([r(),o(i.delay)])}function o2(e,t,i=0,n=0,s=0,r=1,o){const l=[];for(const d of e.variantChildren)d.notify("AnimationStart",t),l.push(Cd(d,t,{...o,delay:i+(typeof n=="function"?0:n)+Mh(e.variantChildren,d,n,s,r)}).then(()=>d.notify("AnimationComplete",t)));return Promise.all(l)}function a2(e,t,i={}){e.notify("AnimationStart",t);let n;if(Array.isArray(t)){const s=t.map(r=>Cd(e,r,i));n=Promise.all(s)}else if(typeof t=="string")n=Cd(e,t,i);else{const s=typeof t=="function"?Ti(e,t,i.custom):t;n=Promise.all(Wh(e,s,i))}return n.then(()=>{e.notify("AnimationComplete",t)})}const l2={test:e=>e==="auto",parse:e=>e},Uh=e=>t=>t.test(e),Vh=[dn,j,yt,Pt,Py,Ny,l2],_h=e=>Vh.find(Uh(e));function d2(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||Ou(e):!0}const c2=new Set(["brightness","contrast","saturate","opacity"]);function f2(e){const[t,i]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[n]=i.match(Gl)||[];if(!n)return e;const s=i.replace(n,"");let r=c2.has(t)?1:0;return n!==i&&(r*=100),t+"("+r+s+")"}const p2=/\b([a-z-]*)\(.*?\)/gu,Td={...at,getAnimatableNone:e=>{const t=e.match(p2);return t?t.map(f2).join(" "):e}},Ad={...at,getAnimatableNone:e=>{const t=at.parse(e);return at.createTransformer(e)(t.map(n=>typeof n=="number"?0:typeof n=="object"?{...n,alpha:1}:n))}},Yh={...dn,transform:Math.round},oo={borderWidth:j,borderTopWidth:j,borderRightWidth:j,borderBottomWidth:j,borderLeftWidth:j,borderRadius:j,borderTopLeftRadius:j,borderTopRightRadius:j,borderBottomRightRadius:j,borderBottomLeftRadius:j,width:j,maxWidth:j,height:j,maxHeight:j,top:j,right:j,bottom:j,left:j,inset:j,insetBlock:j,insetBlockStart:j,insetBlockEnd:j,insetInline:j,insetInlineStart:j,insetInlineEnd:j,padding:j,paddingTop:j,paddingRight:j,paddingBottom:j,paddingLeft:j,paddingBlock:j,paddingBlockStart:j,paddingBlockEnd:j,paddingInline:j,paddingInlineStart:j,paddingInlineEnd:j,margin:j,marginTop:j,marginRight:j,marginBottom:j,marginLeft:j,marginBlock:j,marginBlockStart:j,marginBlockEnd:j,marginInline:j,marginInlineStart:j,marginInlineEnd:j,fontSize:j,backgroundPositionX:j,backgroundPositionY:j,...{rotate:Pt,pathRotation:Pt,rotateX:Pt,rotateY:Pt,rotateZ:Pt,scale:eo,scaleX:eo,scaleY:eo,scaleZ:eo,skew:Pt,skewX:Pt,skewY:Pt,distance:j,translateX:j,translateY:j,translateZ:j,x:j,y:j,z:j,perspective:j,transformPerspective:j,opacity:bs,originX:nh,originY:nh,originZ:j},zIndex:Yh,fillOpacity:bs,strokeOpacity:bs,numOctaves:Yh},u2={...oo,color:te,backgroundColor:te,outlineColor:te,fill:te,stroke:te,borderColor:te,borderTopColor:te,borderRightColor:te,borderBottomColor:te,borderLeftColor:te,filter:Td,WebkitFilter:Td,mask:Ad,WebkitMask:Ad},Hh=e=>u2[e],h2=new Set([Td,Ad]);function qh(e,t){let i=Hh(e);return h2.has(i)||(i=at),i.getAnimatableNone?i.getAnimatableNone(t):void 0}const x2=new Set(["auto","none","0"]);function g2(e,t,i){let n=0,s;for(;n<e.length&&!s;){const r=e[n];typeof r=="string"&&!x2.has(r)&&fn(r).values.length&&(s=e[n]),n++}if(s&&i)for(const r of t)e[r]=qh(i,s)}class m2 extends gd{constructor(t,i,n,s,r){super(t,i,n,s,r,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:i,name:n}=this;if(!i||!i.current)return;super.readKeyframes();for(let f=0;f<t.length;f++){let p=t[f];if(typeof p=="string"&&(p=p.trim(),Ql(p))){const u=Lh(p,i.current);u!==void 0&&(t[f]=u),f===t.length-1&&(this.finalKeyframe=p)}}if(this.resolveNoneKeyframes(),!Oh.has(n)||t.length!==2)return;const[s,r]=t,o=_h(s),l=_h(r),d=th(s),c=th(r);if(d!==c&&ni[n]){this.needsMeasurement=!0;return}if(o!==l)if(vh(o)&&vh(l))for(let f=0;f<t.length;f++){const p=t[f];typeof p=="string"&&(t[f]=parseFloat(p))}else ni[n]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:i}=this,n=[];for(let s=0;s<t.length;s++)(t[s]===null||d2(t[s]))&&n.push(s);n.length&&g2(t,n,i)}measureInitialState(){const{element:t,unresolvedKeyframes:i,name:n}=this;if(!t||!t.current)return;n==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ni[n](t.measureViewportBox(),window.getComputedStyle(t.current)),i[0]=this.measuredOrigin;const s=i[i.length-1];s!==void 0&&t.getValue(n,s).jump(s,!1)}measureEndState(){var l;const{element:t,name:i,unresolvedKeyframes:n}=this;if(!t||!t.current)return;const s=t.getValue(i);s&&s.jump(this.measuredOrigin,!1);const r=n.length-1,o=n[r];n[r]=ni[i](t.measureViewportBox(),window.getComputedStyle(t.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),(l=this.removedTransforms)!=null&&l.length&&this.removedTransforms.forEach(([d,c])=>{t.getValue(d).set(c)}),this.resolveNoneKeyframes()}}const zd=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function $h(e,t,i){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e=="string"){let n=document;const s=(i==null?void 0:i[e])??n.querySelectorAll(e);return s?Array.from(s):[]}return Array.from(e).filter(n=>n!=null)}const Rd=(e,t)=>t&&typeof e=="number"?t.transform(e):e;function y2(e){return Iu(e)&&"offsetHeight"in e&&!("ownerSVGElement"in e)}const{schedule:Dd}=Ju(queueMicrotask,!1),lt={x:!1,y:!1};function Kh(){return lt.x||lt.y}function v2(e){return e==="x"||e==="y"?lt[e]?null:(lt[e]=!0,()=>{lt[e]=!1}):lt.x||lt.y?null:(lt.x=lt.y=!0,()=>{lt.x=lt.y=!1})}function Qh(e,t){const i=$h(e),n=new AbortController,s={passive:!0,...t,signal:n.signal};return[i,s,()=>n.abort()]}function b2(e){return!(e.pointerType==="touch"||Kh())}function w2(e,t,i={}){const[n,s,r]=Qh(e,i);return n.forEach(o=>{let l=!1,d=!1,c;const f=()=>{o.removeEventListener("pointerleave",g)},p=b=>{c&&(c(b),c=void 0),f()},u=b=>{l=!1,window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),d&&(d=!1,p(b))},v=()=>{l=!0,window.addEventListener("pointerup",u,s),window.addEventListener("pointercancel",u,s)},g=b=>{if(b.pointerType!=="touch"){if(l){d=!0;return}p(b)}},m=b=>{if(!b2(b))return;d=!1;const h=t(o,b);typeof h=="function"&&(c=h,o.addEventListener("pointerleave",g,s))};o.addEventListener("pointerenter",m,s),o.addEventListener("pointerdown",v,s)}),r}const Gh=(e,t)=>t?e===t?!0:Gh(e,t.parentElement):!1,jd=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,k2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function S2(e){return k2.has(e.tagName)||e.isContentEditable===!0}const E2=new Set(["INPUT","SELECT","TEXTAREA"]);function C2(e){return E2.has(e.tagName)||e.isContentEditable===!0}const ao=new WeakSet;function Xh(e){return t=>{t.key==="Enter"&&e(t)}}function Md(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const T2=(e,t)=>{const i=e.currentTarget;if(!i)return;const n=Xh(()=>{if(ao.has(i))return;Md(i,"down");const s=Xh(()=>{Md(i,"up")}),r=()=>Md(i,"cancel");i.addEventListener("keyup",s,t),i.addEventListener("blur",r,t)});i.addEventListener("keydown",n,t),i.addEventListener("blur",()=>i.removeEventListener("keydown",n),t)};function Jh(e){return jd(e)&&!Kh()}const Zh=new WeakSet;function A2(e,t,i={}){const[n,s,r]=Qh(e,i),o=l=>{const d=l.currentTarget;if(!Jh(l)||Zh.has(l))return;ao.add(d),i.stopPropagation&&Zh.add(l);const c=t(d,l),f={...s,capture:!0},p=(g,m)=>{window.removeEventListener("pointerup",u,f),window.removeEventListener("pointercancel",v,f),ao.has(d)&&ao.delete(d),Jh(g)&&typeof c=="function"&&c(g,{success:m})},u=g=>{p(g,d===window||d===document||i.useGlobalTarget||Gh(d,g.target))},v=g=>{p(g,!1)};window.addEventListener("pointerup",u,f),window.addEventListener("pointercancel",v,f)};return n.forEach(l=>{(i.useGlobalTarget?window:l).addEventListener("pointerdown",o,s),y2(l)&&(l.addEventListener("focus",c=>T2(c,s)),!S2(l)&&!l.hasAttribute("tabindex")&&(l.tabIndex=0))}),r}function Nd(e){return Iu(e)&&"ownerSVGElement"in e}const lo=new WeakMap;let si;const e0=(e,t,i)=>(n,s)=>s&&s[0]?s[0][e+"Size"]:Nd(n)&&"getBBox"in n?n.getBBox()[t]:n[i],z2=e0("inline","width","offsetWidth"),R2=e0("block","height","offsetHeight");function D2({target:e,borderBoxSize:t}){var i;(i=lo.get(e))==null||i.forEach(n=>{n(e,{get width(){return z2(e,t)},get height(){return R2(e,t)}})})}function j2(e){e.forEach(D2)}function M2(){typeof ResizeObserver>"u"||(si=new ResizeObserver(j2))}function N2(e,t){si||M2();const i=$h(e);return i.forEach(n=>{let s=lo.get(n);s||(s=new Set,lo.set(n,s)),s.add(t),si==null||si.observe(n)}),()=>{i.forEach(n=>{const s=lo.get(n);s==null||s.delete(t),s!=null&&s.size||si==null||si.unobserve(n)})}}const co=new Set;let xn;function P2(){xn=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};co.forEach(t=>t(e))},window.addEventListener("resize",xn)}function L2(e){return co.add(e),xn||P2(),()=>{co.delete(e),!co.size&&typeof xn=="function"&&(window.removeEventListener("resize",xn),xn=void 0)}}function t0(e,t){return typeof e=="function"?L2(e):N2(e,t)}function I2(e){return Nd(e)&&e.tagName==="svg"}const O2=[...Vh,te,at],B2=e=>O2.find(Uh(e)),i0=()=>({translate:0,scale:1,origin:0,originPoint:0}),gn=()=>({x:i0(),y:i0()}),n0=()=>({min:0,max:0}),ae=()=>({x:n0(),y:n0()}),F2=new WeakMap;function fo(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function Cs(e){return typeof e=="string"||Array.isArray(e)}const Pd=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Ld=["initial",...Pd];function po(e){return fo(e.animate)||Ld.some(t=>Cs(e[t]))}function s0(e){return!!(po(e)||e.variants)}function W2(e,t,i){for(const n in t){const s=t[n],r=i[n];if(ge(s))e.addValue(n,s);else if(ge(r))e.addValue(n,hn(s,{owner:e}));else if(r!==s)if(e.hasValue(n)){const o=e.getValue(n);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{const o=e.getStaticValue(n);e.addValue(n,hn(o!==void 0?o:s,{owner:e}))}}for(const n in i)t[n]===void 0&&e.removeValue(n);return t}const Id={current:null},r0={current:!1},U2=typeof window<"u";function V2(){if(r0.current=!0,!!U2)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Id.current=e.matches;e.addEventListener("change",t),t()}else Id.current=!1}const o0=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let uo={};function a0(e){uo=e}function _2(){return uo}class Y2{scrapeMotionValuesFromProps(t,i,n){return{}}constructor({parent:t,props:i,presenceContext:n,reducedMotionConfig:s,skipAnimations:r,blockInitialAnimation:o,visualState:l},d={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=gd,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const v=Te.now();this.renderScheduledAt<v&&(this.renderScheduledAt=v,W.render(this.render,!1,!0))};const{latestValues:c,renderState:f}=l;this.latestValues=c,this.baseTarget={...c},this.initialValues=i.initial?{...c}:{},this.renderState=f,this.parent=t,this.props=i,this.presenceContext=n,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.skipAnimationsConfig=r,this.options=d,this.blockInitialAnimation=!!o,this.isControllingVariants=po(i),this.isVariantNode=s0(i),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:p,...u}=this.scrapeMotionValuesFromProps(i,{},this);for(const v in u){const g=u[v];c[v]!==void 0&&ge(g)&&g.set(c[v])}}mount(t){var i,n;if(this.hasBeenMounted)for(const s in this.initialValues)(i=this.values.get(s))==null||i.jump(this.initialValues[s]),this.latestValues[s]=this.initialValues[s];this.current=t,F2.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((s,r)=>this.bindToMotionValue(r,s)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(r0.current||V2(),this.shouldReduceMotion=Id.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(n=this.parent)==null||n.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var t;this.projection&&this.projection.unmount(),ii(this.notifyUpdate),ii(this.render),this.valueSubscriptions.forEach(i=>i()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(t=this.parent)==null||t.removeChild(this);for(const i in this.events)this.events[i].clear();for(const i in this.features){const n=this.features[i];n&&(n.unmount(),n.isMounted=!1)}this.current=null}addChild(t){this.children.add(t),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(t)}removeChild(t){this.children.delete(t),this.enteringChildren&&this.enteringChildren.delete(t)}bindToMotionValue(t,i){if(this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)(),i.accelerate&&jh.has(t)&&this.current instanceof HTMLElement){const{factory:o,keyframes:l,times:d,ease:c,duration:f}=i.accelerate,p=new zh({element:this.current,name:t,keyframes:l,times:d,ease:c,duration:Ne(f)}),u=o(p);this.valueSubscriptions.set(t,()=>{u(),p.cancel()});return}const n=un.has(t);n&&this.onBindTransform&&this.onBindTransform();const s=i.on("change",o=>{this.latestValues[t]=o,this.props.onUpdate&&W.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let r;typeof window<"u"&&window.MotionCheckAppearSync&&(r=window.MotionCheckAppearSync(this,t,i)),this.valueSubscriptions.set(t,()=>{s(),r&&r()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in uo){const i=uo[t];if(!i)continue;const{isEnabled:n,Feature:s}=i;if(!this.features[t]&&s&&n(this.props)&&(this.features[t]=new s(this)),this.features[t]){const r=this.features[t];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ae()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,i){this.latestValues[t]=i}update(t,i){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=i;for(let n=0;n<o0.length;n++){const s=o0[n];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const r="on"+s,o=t[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=W2(this,this.scrapeMotionValuesFromProps(t,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const i=this.getClosestVariantNode();if(i)return i.variantChildren&&i.variantChildren.add(t),()=>i.variantChildren.delete(t)}addValue(t,i){const n=this.values.get(t);i!==n&&(n&&this.removeValue(t),this.bindToMotionValue(t,i),this.values.set(t,i),this.latestValues[t]=i.get())}removeValue(t){this.values.delete(t);const i=this.valueSubscriptions.get(t);i&&(i(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,i){if(this.props.values&&this.props.values[t])return this.props.values[t];let n=this.values.get(t);return n===void 0&&i!==void 0&&(n=hn(i===null?void 0:i,{owner:this}),this.addValue(t,n)),n}readValue(t,i){let n=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options);return n!=null&&(typeof n=="string"&&(Lu(n)||Ou(n))?n=parseFloat(n):!B2(n)&&at.test(i)&&(n=qh(t,i)),this.setBaseTarget(t,ge(n)?n.get():n)),ge(n)?n.get():n}setBaseTarget(t,i){this.baseTarget[t]=i}getBaseTarget(t){var r;const{initial:i}=this.props;let n;if(typeof i=="string"||typeof i=="object"){const o=wd(this.props,i,(r=this.presenceContext)==null?void 0:r.custom);o&&(n=o[t])}if(i&&n!==void 0)return n;const s=this.getBaseTargetFromProps(this.props,t);return s!==void 0&&!ge(s)?s:this.initialValues[t]!==void 0&&n===void 0?void 0:this.baseTarget[t]}on(t,i){return this.events[t]||(this.events[t]=new Hl),this.events[t].add(i)}notify(t,...i){this.events[t]&&this.events[t].notify(...i)}scheduleRenderMicrotask(){Dd.render(this.render)}}class l0 extends Y2{constructor(){super(...arguments),this.KeyframeResolver=m2}sortInstanceNodePosition(t,i){return t.compareDocumentPosition(i)&2?1:-1}getBaseTargetFromProps(t,i){const n=t.style;return n?n[i]:void 0}removeValueFromRenderState(t,{vars:i,style:n}){delete i[t],delete n[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;ge(t)&&(this.childSubscription=t.on("change",i=>{this.current&&(this.current.textContent=`${i}`)}))}}class ri{constructor(t){this.isMounted=!1,this.node=t}update(){}}function d0({top:e,left:t,right:i,bottom:n}){return{x:{min:t,max:i},y:{min:e,max:n}}}function H2({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function q2(e,t){if(!t)return e;const i=t({x:e.left,y:e.top}),n=t({x:e.right,y:e.bottom});return{top:i.y,left:i.x,bottom:n.y,right:n.x}}function Od(e){return e===void 0||e===1}function Bd({scale:e,scaleX:t,scaleY:i}){return!Od(e)||!Od(t)||!Od(i)}function Ai(e){return Bd(e)||c0(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function c0(e){return f0(e.x)||f0(e.y)}function f0(e){return e&&e!=="0%"}function ho(e,t,i){const n=e-i,s=t*n;return i+s}function p0(e,t,i,n,s){return s!==void 0&&(e=ho(e,s,n)),ho(e,i,n)+t}function Fd(e,t=0,i=1,n,s){e.min=p0(e.min,t,i,n,s),e.max=p0(e.max,t,i,n,s)}function u0(e,{x:t,y:i}){Fd(e.x,t.translate,t.scale,t.originPoint),Fd(e.y,i.translate,i.scale,i.originPoint)}const h0=.999999999999,x0=1.0000000000001;function $2(e,t,i,n=!1){var l;const s=i.length;if(!s)return;t.x=t.y=1;let r,o;for(let d=0;d<s;d++){r=i[d],o=r.projectionDelta;const{visualElement:c}=r.options;c&&c.props.style&&c.props.style.display==="contents"||(n&&r.options.layoutScroll&&r.scroll&&r!==r.root&&(vt(e.x,-r.scroll.offset.x),vt(e.y,-r.scroll.offset.y)),o&&(t.x*=o.x.scale,t.y*=o.y.scale,u0(e,o)),n&&Ai(r.latestValues)&&xo(e,r.latestValues,(l=r.layout)==null?void 0:l.layoutBox))}t.x<x0&&t.x>h0&&(t.x=1),t.y<x0&&t.y>h0&&(t.y=1)}function vt(e,t){e.min+=t,e.max+=t}function g0(e,t,i,n,s=.5){const r=U(e.min,e.max,s);Fd(e,t,i,r,n)}function m0(e,t){return typeof e=="string"?parseFloat(e)/100*(t.max-t.min):e}function xo(e,t,i){const n=i??e;g0(e.x,m0(t.x,n.x),t.scaleX,t.scale,t.originX),g0(e.y,m0(t.y,n.y),t.scaleY,t.scale,t.originY)}function y0(e,t){return d0(q2(e.getBoundingClientRect(),t))}function K2(e,t,i){const n=y0(e,i),{scroll:s}=t;return s&&(vt(n.x,s.offset.x),vt(n.y,s.offset.y)),n}const Q2={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},G2=pn.length;function X2(e,t,i){let n="",s=!0;for(let o=0;o<G2;o++){const l=pn[o],d=e[l];if(d===void 0)continue;let c=!0;if(typeof d=="number")c=d===(l.startsWith("scale")?1:0);else{const f=parseFloat(d);c=l.startsWith("scale")?f===1:f===0}if(!c||i){const f=Rd(d,oo[l]);if(!c){s=!1;const p=Q2[l]||l;n+=`${p}(${f}) `}i&&(t[l]=f)}}const r=e.pathRotation;return r&&(s=!1,n+=`rotate(${Rd(r,oo.pathRotation)}) `),n=n.trim(),i?n=i(t,s?"":n):s&&(n="none"),n}function Wd(e,t,i){const{style:n,vars:s,transformOrigin:r}=e;let o=!1,l=!1;for(const d in t){const c=t[d];if(un.has(d)){o=!0;continue}else if(eh(d)){s[d]=c;continue}else{const f=Rd(c,oo[d]);d.startsWith("origin")?(l=!0,r[d]=f):n[d]=f}}if(t.transform||(o||i?n.transform=X2(t,e.transform,i):n.transform&&(n.transform="none")),l){const{originX:d="50%",originY:c="50%",originZ:f=0}=r;n.transformOrigin=`${d} ${c} ${f}`}}function v0(e,{style:t,vars:i},n,s){const r=e.style;let o;for(o in t)r[o]=t[o];s==null||s.applyProjectionStyles(r,n);for(o in i)r.setProperty(o,i[o])}function b0(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const Ts={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(j.test(e))e=parseFloat(e);else return e;const i=b0(e,t.target.x),n=b0(e,t.target.y);return`${i}% ${n}%`}},J2={correct:(e,{treeScale:t,projectionDelta:i})=>{const n=e,s=at.parse(e);if(s.length>5)return n;const r=at.createTransformer(e),o=typeof s[0]!="number"?1:0,l=i.x.scale*t.x,d=i.y.scale*t.y;s[0+o]/=l,s[1+o]/=d;const c=U(l,d,.5);return typeof s[2+o]=="number"&&(s[2+o]/=c),typeof s[3+o]=="number"&&(s[3+o]/=c),r(s)}},Ud={borderRadius:{...Ts,applyTo:[...zd]},borderTopLeftRadius:Ts,borderTopRightRadius:Ts,borderBottomLeftRadius:Ts,borderBottomRightRadius:Ts,boxShadow:J2};function w0(e,{layout:t,layoutId:i}){return un.has(e)||e.startsWith("origin")||(t||i!==void 0)&&(!!Ud[e]||e==="opacity")}function Vd(e,t,i){var o;const n=e.style,s=t==null?void 0:t.style,r={};if(!n)return r;for(const l in n)(ge(n[l])||s&&ge(s[l])||w0(l,e)||((o=i==null?void 0:i.getValue(l))==null?void 0:o.liveStyle)!==void 0)&&(r[l]=n[l]);return r}function Z2(e){return window.getComputedStyle(e)}class ev extends l0{constructor(){super(...arguments),this.type="html",this.renderInstance=v0}readValueFromInstance(t,i){var n;if(un.has(i))return(n=this.projection)!=null&&n.isProjecting?fd(i):b1(t,i);{const s=Z2(t),r=(eh(i)?s.getPropertyValue(i):s[i])||0;return typeof r=="string"?r.trim():r}}measureInstanceViewportBox(t,{transformPagePoint:i}){return y0(t,i)}build(t,i,n){Wd(t,i,n.transformTemplate)}scrapeMotionValuesFromProps(t,i,n){return Vd(t,i,n)}}const tv={offset:"stroke-dashoffset",array:"stroke-dasharray"},iv={offset:"strokeDashoffset",array:"strokeDasharray"};function nv(e,t,i=1,n=0,s=!0){e.pathLength=1;const r=s?tv:iv;e[r.offset]=`${-n}`,e[r.array]=`${t} ${i}`}const sv=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function k0(e,{attrX:t,attrY:i,attrScale:n,pathLength:s,pathSpacing:r=1,pathOffset:o=0,...l},d,c,f){if(Wd(e,l,c),d){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:p,style:u}=e;p.transform&&(u.transform=p.transform,delete p.transform),(u.transform||p.transformOrigin)&&(u.transformOrigin=p.transformOrigin??"50% 50%",delete p.transformOrigin),u.transform&&(u.transformBox=(f==null?void 0:f.transformBox)??"fill-box",delete p.transformBox);for(const v of sv)p[v]!==void 0&&(u[v]=p[v],delete p[v]);t!==void 0&&(p.x=t),i!==void 0&&(p.y=i),n!==void 0&&(p.scale=n),s!==void 0&&nv(p,s,r,o,!1)}const S0=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),E0=e=>typeof e=="string"&&e.toLowerCase()==="svg";function rv(e,t,i,n){v0(e,t,void 0,n);for(const s in t.attrs)e.setAttribute(S0.has(s)?s:Ed(s),t.attrs[s])}function C0(e,t,i){const n=Vd(e,t,i);for(const s in e)if(ge(e[s])||ge(t[s])){const r=pn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;n[r]=e[s]}return n}class ov extends l0{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=ae}getBaseTargetFromProps(t,i){return t[i]}readValueFromInstance(t,i){if(un.has(i)){const n=Hh(i);return n&&n.default||0}return i=S0.has(i)?i:Ed(i),t.getAttribute(i)}scrapeMotionValuesFromProps(t,i,n){return C0(t,i,n)}build(t,i,n){k0(t,i,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(t,i,n,s){rv(t,i,n,s)}mount(t){this.isSVGTag=E0(t.tagName),super.mount(t)}}const av=Ld.length;function T0(e){if(!e)return;if(!e.isControllingVariants){const i=e.parent?T0(e.parent)||{}:{};return e.props.initial!==void 0&&(i.initial=e.props.initial),i}const t={};for(let i=0;i<av;i++){const n=Ld[i],s=e.props[n];(Cs(s)||s===!1)&&(t[n]=s)}return t}function A0(e,t){if(!Array.isArray(t))return!1;const i=t.length;if(i!==e.length)return!1;for(let n=0;n<i;n++)if(t[n]!==e[n])return!1;return!0}const lv=[...Pd].reverse(),dv=Pd.length;function cv(e){return t=>Promise.all(t.map(({animation:i,options:n})=>a2(e,i,n)))}function fv(e){let t=cv(e),i=z0(),n=!0,s=!1;const r=c=>(f,p)=>{var v;const u=Ti(e,p,c==="exit"?(v=e.presenceContext)==null?void 0:v.custom:void 0);if(u){const{transition:g,transitionEnd:m,...b}=u;f={...f,...b,...m}}return f};function o(c){t=c(e)}function l(c){const{props:f}=e,p=T0(e.parent)||{},u=[],v=new Set;let g={},m=1/0;for(let h=0;h<dv;h++){const x=lv[h],y=i[x],w=f[x]!==void 0?f[x]:p[x],S=Cs(w),E=x===c?y.isActive:null;E===!1&&(m=h);let C=w===p[x]&&w!==f[x]&&S;if(C&&(n||s)&&e.manuallyAnimateOnMount&&(C=!1),y.protectedKeys={...g},!y.isActive&&E===null||!w&&!y.prevProp||fo(w)||typeof w=="boolean")continue;if(x==="exit"&&y.isActive&&E!==!0){y.prevResolvedValues&&(g={...g,...y.prevResolvedValues});continue}const T=pv(y.prevProp,w);let P=T||x===c&&y.isActive&&!C&&S||h>m&&S,z=!1;const O=Array.isArray(w)?w:[w];let ne=O.reduce(r(x),{});E===!1&&(ne={});const{prevResolvedValues:Ue={}}=y,Ve={...Ue,...ne},ft=R=>{P=!0,v.has(R)&&(z=!0,v.delete(R)),y.needsAnimating[R]=!0;const M=e.getValue(R);M&&(M.liveStyle=!1)};for(const R in Ve){const M=ne[R],N=Ue[R];if(g.hasOwnProperty(R))continue;let F=!1;kd(M)&&kd(N)?F=!A0(M,N)||T:F=M!==N,F?M!=null?ft(R):v.add(R):M!==void 0&&v.has(R)?ft(R):y.protectedKeys[R]=!0}y.prevProp=w,y.prevResolvedValues=ne,y.isActive&&(g={...g,...ne}),(n||s)&&e.blockInitialAnimation&&(P=!1);const Pe=C&&T;P&&(!Pe||z)&&u.push(...O.map(R=>{const M={type:x};if(typeof R=="string"&&(n||s)&&!Pe&&e.manuallyAnimateOnMount&&e.parent){const{parent:N}=e,F=Ti(N,R);if(N.enteringChildren&&F){const{delayChildren:se}=F.transition||{};M.delay=Mh(N.enteringChildren,e,se)}}return{animation:R,options:M}}))}if(v.size){const h={};if(typeof f.initial!="boolean"){const x=Ti(e,Array.isArray(f.initial)?f.initial[0]:f.initial);x&&x.transition&&(h.transition=x.transition)}v.forEach(x=>{const y=e.getBaseTarget(x),w=e.getValue(x);w&&(w.liveStyle=!0),h[x]=y??null}),u.push({animation:h})}let b=!!u.length;return n&&(f.initial===!1||f.initial===f.animate)&&!e.manuallyAnimateOnMount&&(b=!1),n=!1,s=!1,b?t(u):Promise.resolve()}function d(c,f){var u;if(i[c].isActive===f)return Promise.resolve();(u=e.variantChildren)==null||u.forEach(v=>{var g;return(g=v.animationState)==null?void 0:g.setActive(c,f)}),i[c].isActive=f;const p=l(c);for(const v in i)i[v].protectedKeys={};return p}return{animateChanges:l,setActive:d,setAnimateFunction:o,getState:()=>i,reset:()=>{i=z0(),s=!0}}}function pv(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!A0(t,e):!1}function zi(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function z0(){return{animate:zi(!0),whileInView:zi(),whileHover:zi(),whileTap:zi(),whileDrag:zi(),whileFocus:zi(),exit:zi()}}function _d(e,t){e.min=t.min,e.max=t.max}function dt(e,t){_d(e.x,t.x),_d(e.y,t.y)}function R0(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}const D0=1e-4,uv=1-D0,hv=1+D0,j0=.01,xv=0-j0,gv=0+j0;function Ae(e){return e.max-e.min}function mv(e,t,i){return Math.abs(e-t)<=i}function M0(e,t,i,n=.5){e.origin=n,e.originPoint=U(t.min,t.max,e.origin),e.scale=Ae(i)/Ae(t),e.translate=U(i.min,i.max,e.origin)-e.originPoint,(e.scale>=uv&&e.scale<=hv||isNaN(e.scale))&&(e.scale=1),(e.translate>=xv&&e.translate<=gv||isNaN(e.translate))&&(e.translate=0)}function As(e,t,i,n){M0(e.x,t.x,i.x,n?n.originX:void 0),M0(e.y,t.y,i.y,n?n.originY:void 0)}function N0(e,t,i,n=0){const s=n?U(i.min,i.max,n):i.min;e.min=s+t.min,e.max=e.min+Ae(t)}function yv(e,t,i,n){N0(e.x,t.x,i.x,n==null?void 0:n.x),N0(e.y,t.y,i.y,n==null?void 0:n.y)}function P0(e,t,i,n=0){const s=n?U(i.min,i.max,n):i.min;e.min=t.min-s,e.max=e.min+Ae(t)}function go(e,t,i,n){P0(e.x,t.x,i.x,n==null?void 0:n.x),P0(e.y,t.y,i.y,n==null?void 0:n.y)}function L0(e,t,i,n,s){return e-=t,e=ho(e,1/i,n),s!==void 0&&(e=ho(e,1/s,n)),e}function vv(e,t=0,i=1,n=.5,s,r=e,o=e){if(yt.test(t)&&(t=parseFloat(t),t=U(o.min,o.max,t/100)-o.min),typeof t!="number")return;let l=U(r.min,r.max,n);e===r&&(l-=t),e.min=L0(e.min,t,i,l,s),e.max=L0(e.max,t,i,l,s)}function I0(e,t,[i,n,s],r,o){vv(e,t[i],t[n],t[s],t.scale,r,o)}const bv=["x","scaleX","originX"],wv=["y","scaleY","originY"];function O0(e,t,i,n){I0(e.x,t,bv,i?i.x:void 0,n?n.x:void 0),I0(e.y,t,wv,i?i.y:void 0,n?n.y:void 0)}function B0(e){return e.translate===0&&e.scale===1}function F0(e){return B0(e.x)&&B0(e.y)}function W0(e,t){return e.min===t.min&&e.max===t.max}function kv(e,t){return W0(e.x,t.x)&&W0(e.y,t.y)}function U0(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function V0(e,t){return U0(e.x,t.x)&&U0(e.y,t.y)}function _0(e){return Ae(e.x)/Ae(e.y)}function Y0(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}function bt(e){return[e("x"),e("y")]}function Sv(e,t,i){let n="";const s=e.x.translate/t.x,r=e.y.translate/t.y,o=(i==null?void 0:i.z)||0;if((s||r||o)&&(n=`translate3d(${s}px, ${r}px, ${o}px) `),(t.x!==1||t.y!==1)&&(n+=`scale(${1/t.x}, ${1/t.y}) `),i){const{transformPerspective:c,rotate:f,pathRotation:p,rotateX:u,rotateY:v,skewX:g,skewY:m}=i;c&&(n=`perspective(${c}px) ${n}`),f&&(n+=`rotate(${f}deg) `),p&&(n+=`rotate(${p}deg) `),u&&(n+=`rotateX(${u}deg) `),v&&(n+=`rotateY(${v}deg) `),g&&(n+=`skewX(${g}deg) `),m&&(n+=`skewY(${m}deg) `)}const l=e.x.scale*t.x,d=e.y.scale*t.y;return(l!==1||d!==1)&&(n+=`scale(${l}, ${d})`),n||"none"}const Ev=zd.length,H0=e=>typeof e=="string"?parseFloat(e):e,q0=e=>typeof e=="number"||j.test(e);function Cv(e,t,i,n,s,r){s?(e.opacity=U(0,i.opacity??1,Tv(n)),e.opacityExit=U(t.opacity??1,0,Av(n))):r&&(e.opacity=U(t.opacity??1,i.opacity??1,n));for(let o=0;o<Ev;o++){const l=zd[o];let d=$0(t,l),c=$0(i,l);if(d===void 0&&c===void 0)continue;d||(d=0),c||(c=0),d===0||c===0||q0(d)===q0(c)?(e[l]=Math.max(U(H0(d),H0(c),n),0),(yt.test(c)||yt.test(d))&&(e[l]+="%")):e[l]=c}(t.rotate||i.rotate)&&(e.rotate=U(t.rotate||0,i.rotate||0,n))}function $0(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const Tv=K0(0,.5,qu),Av=K0(.5,.95,Qe);function K0(e,t,i){return n=>n<e?0:n>t?1:i(ys(e,t,n))}function zv(e,t,i){const n=ge(e)?e:hn(e);return n.start(bd("",n,t,i)),n.animation}function zs(e,t,i,n={passive:!0}){return e.addEventListener(t,i,n),()=>e.removeEventListener(t,i,n)}const Rv=(e,t)=>e.depth-t.depth;class Dv{constructor(){this.children=[],this.isDirty=!1}add(t){Yl(this.children,t),this.isDirty=!0}remove(t){Xr(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(Rv),this.isDirty=!1,this.children.forEach(t)}}function jv(e,t){const i=Te.now(),n=({timestamp:s})=>{const r=s-i;r>=t&&(ii(n),e(r-t))};return W.setup(n,!0),()=>ii(n)}function mo(e){return ge(e)?e.get():e}class Mv{constructor(){this.members=[]}add(t){Yl(this.members,t);for(let i=this.members.length-1;i>=0;i--){const n=this.members[i];if(n===t||n===this.lead||n===this.prevLead)continue;const s=n.instance;(!s||s.isConnected===!1)&&!n.snapshot&&(Xr(this.members,n),n.unmount())}t.scheduleRender()}remove(t){if(Xr(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const i=this.members[this.members.length-1];i&&this.promote(i)}}relegate(t){var i;for(let n=this.members.indexOf(t)-1;n>=0;n--){const s=this.members[n];if(s.isPresent!==!1&&((i=s.instance)==null?void 0:i.isConnected)!==!1)return this.promote(s),!0}return!1}promote(t,i){var s;const n=this.lead;if(t!==n&&(this.prevLead=n,this.lead=t,t.show(),n)){n.updateSnapshot(),t.scheduleRender();const{layoutDependency:r}=n.options,{layoutDependency:o}=t.options;(r===void 0||r!==o)&&(t.resumeFrom=n,i&&(n.preserveOpacity=!0),n.snapshot&&(t.snapshot=n.snapshot,t.snapshot.latestValues=n.animationValues||n.latestValues),(s=t.root)!=null&&s.isUpdating&&(t.isLayoutDirty=!0)),t.options.crossfade===!1&&n.hide()}}exitAnimationComplete(){this.members.forEach(t=>{var i,n,s,r,o;(n=(i=t.options).onExitComplete)==null||n.call(i),(o=(s=t.resumingFrom)==null?void 0:(r=s.options).onExitComplete)==null||o.call(r)})}scheduleRender(){this.members.forEach(t=>t.instance&&t.scheduleRender(!1))}removeLeadSnapshot(){var t;(t=this.lead)!=null&&t.snapshot&&(this.lead.snapshot=void 0)}}const yo={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Yd=["","X","Y","Z"],Nv=1e3;let Pv=0;function Hd(e,t,i,n){const{latestValues:s}=t;s[e]&&(i[e]=s[e],t.setStaticValue(e,0),n&&(n[e]=0))}function Q0(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const i=Fh(t);if(window.MotionHasOptimisedAnimation(i,"transform")){const{layout:s,layoutId:r}=e.options;window.MotionCancelOptimisedAnimation(i,"transform",W,!(s||r))}const{parent:n}=e;n&&!n.hasCheckedOptimisedAppear&&Q0(n)}function G0({attachResizeListener:e,defaultParent:t,measureScroll:i,checkIsScrollRoot:n,resetTransform:s}){return class{constructor(o={},l=t==null?void 0:t()){this.id=Pv++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(Ov),this.nodes.forEach(_v),this.nodes.forEach(Yv),this.nodes.forEach(Bv)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let d=0;d<this.path.length;d++)this.path[d].shouldResetTransform=!0;this.root===this&&(this.nodes=new Dv)}addEventListener(o,l){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Hl),this.eventHandlers.get(o).add(l)}notifyListeners(o,...l){const d=this.eventHandlers.get(o);d&&d.notify(...l)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=Nd(o)&&!I2(o),this.instance=o;const{layoutId:l,layout:d,visualElement:c}=this.options;if(c&&!c.current&&c.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(d||l)&&(this.isLayoutDirty=!0),e){let f,p=0;const u=()=>this.root.updateBlockedByResize=!1;W.read(()=>{p=window.innerWidth}),e(o,()=>{const v=window.innerWidth;v!==p&&(p=v,this.root.updateBlockedByResize=!0,f&&f(),f=jv(u,250),yo.hasAnimatedSinceResize&&(yo.hasAnimatedSinceResize=!1,this.nodes.forEach(Z0)))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&c&&(l||d)&&this.addEventListener("didUpdate",({delta:f,hasLayoutChanged:p,hasRelativeLayoutChanged:u,layout:v})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const g=this.options.transition||c.getDefaultTransition()||Qv,{onLayoutAnimationStart:m,onLayoutAnimationComplete:b}=c.getProps(),h=!this.targetLayout||!V0(this.targetLayout,v),x=!p&&u;if(this.options.layoutRoot||this.resumeFrom||x||p&&(h||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const y={...vd(g,"layout"),onPlay:m,onComplete:b};(c.shouldReduceMotion||this.options.layoutRoot)&&(y.delay=0,y.type=!1),this.startAnimation(y),this.setAnimationOrigin(f,x,y.path)}else p||Z0(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=v})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),ii(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Hv),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Q0(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let f=0;f<this.path.length;f++){const p=this.path[f];p.shouldResetTransform=!0,(typeof p.latestValues.x=="string"||typeof p.latestValues.y=="string")&&(p.isLayoutDirty=!0),p.updateScroll("snapshot"),p.options.layoutRoot&&p.willUpdate(!1)}const{layoutId:l,layout:d}=this.options;if(l===void 0&&!d)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const d=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),d&&this.nodes.forEach(Wv),this.nodes.forEach(X0);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(J0);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(Uv),this.nodes.forEach(Vv),this.nodes.forEach(Lv),this.nodes.forEach(Iv)):this.nodes.forEach(J0),this.clearAllSnapshots();const l=Te.now();xe.delta=mt(0,1e3/60,l-xe.timestamp),xe.timestamp=l,xe.isProcessing=!0,Kl.update.process(xe),Kl.preRender.process(xe),Kl.render.process(xe),xe.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Dd.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Fv),this.sharedNodes.forEach(qv)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,W.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){W.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Ae(this.snapshot.measuredBox.x)&&!Ae(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let d=0;d<this.path.length;d++)this.path[d].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=ae()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(l=!1),l&&this.instance){const d=n(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:d,offset:i(this.instance),wasRoot:this.scroll?this.scroll.isRoot:d}}}resetTransform(){if(!s)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!F0(this.projectionDelta),d=this.getTransformTemplate(),c=d?d(this.latestValues,""):void 0,f=c!==this.prevTransformTemplateValue;o&&this.instance&&(l||Ai(this.latestValues)||f)&&(s(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const l=this.measurePageBox();let d=this.removeElementScroll(l);return o&&(d=this.removeTransform(d)),Gv(d),{animationId:this.root.animationId,measuredBox:l,layoutBox:d,latestValues:{},source:this.id}}measurePageBox(){var c;const{visualElement:o}=this.options;if(!o)return ae();const l=o.measureViewportBox();if(!(((c=this.scroll)==null?void 0:c.wasRoot)||this.path.some(Xv))){const{scroll:f}=this.root;f&&(vt(l.x,f.offset.x),vt(l.y,f.offset.y))}return l}removeElementScroll(o){var d;const l=ae();if(dt(l,o),(d=this.scroll)!=null&&d.wasRoot)return l;for(let c=0;c<this.path.length;c++){const f=this.path[c],{scroll:p,options:u}=f;f!==this.root&&p&&u.layoutScroll&&(p.wasRoot&&dt(l,o),vt(l.x,p.offset.x),vt(l.y,p.offset.y))}return l}applyTransform(o,l=!1,d){var f,p;const c=d||ae();dt(c,o);for(let u=0;u<this.path.length;u++){const v=this.path[u];!l&&v.options.layoutScroll&&v.scroll&&v!==v.root&&(vt(c.x,-v.scroll.offset.x),vt(c.y,-v.scroll.offset.y)),Ai(v.latestValues)&&xo(c,v.latestValues,(f=v.layout)==null?void 0:f.layoutBox)}return Ai(this.latestValues)&&xo(c,this.latestValues,(p=this.layout)==null?void 0:p.layoutBox),c}removeTransform(o){var d;const l=ae();dt(l,o);for(let c=0;c<this.path.length;c++){const f=this.path[c];if(!Ai(f.latestValues))continue;let p;f.instance&&(Bd(f.latestValues)&&f.updateSnapshot(),p=ae(),dt(p,f.measurePageBox())),O0(l,f.latestValues,(d=f.snapshot)==null?void 0:d.layoutBox,p)}return Ai(this.latestValues)&&O0(l,this.latestValues),l}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==xe.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var v;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const d=!!this.resumingFrom||this!==l;if(!(o||d&&this.isSharedProjectionDirty||this.isProjectionDirty||(v=this.parent)!=null&&v.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:f,layoutId:p}=this.options;if(!this.layout||!(f||p))return;this.resolvedRelativeTargetAt=xe.timestamp;const u=this.getClosestProjectingParent();u&&this.linkedParentVersion!==u.layoutVersion&&!u.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&u&&u.layout?this.createRelativeTarget(u,this.layout.layoutBox,u.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=ae(),this.targetWithTransforms=ae()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),yv(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):dt(this.target,this.layout.layoutBox),u0(this.target,this.targetDelta)):dt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&u&&!!u.resumingFrom==!!this.resumingFrom&&!u.options.layoutScroll&&u.target&&this.animationProgress!==1?this.createRelativeTarget(u,this.target,u.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Bd(this.parent.latestValues)||c0(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(o,l,d){this.relativeParent=o,this.linkedParentVersion=o.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ae(),this.relativeTargetOrigin=ae(),go(this.relativeTargetOrigin,l,d,this.options.layoutAnchor||void 0),dt(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var g;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let d=!0;if((this.isProjectionDirty||(g=this.parent)!=null&&g.isProjectionDirty)&&(d=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(d=!1),this.resolvedRelativeTargetAt===xe.timestamp&&(d=!1),d)return;const{layout:c,layoutId:f}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(c||f))return;dt(this.layoutCorrected,this.layout.layoutBox);const p=this.treeScale.x,u=this.treeScale.y;$2(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=ae());const{target:v}=o;if(!v){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(R0(this.prevProjectionDelta.x,this.projectionDelta.x),R0(this.prevProjectionDelta.y,this.projectionDelta.y)),As(this.projectionDelta,this.layoutCorrected,v,this.latestValues),(this.treeScale.x!==p||this.treeScale.y!==u||!Y0(this.projectionDelta.x,this.prevProjectionDelta.x)||!Y0(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",v))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var l;if((l=this.options.visualElement)==null||l.scheduleRender(),o){const d=this.getStack();d&&d.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=gn(),this.projectionDelta=gn(),this.projectionDeltaWithTransform=gn()}setAnimationOrigin(o,l=!1,d){const c=this.snapshot,f=c?c.latestValues:{},p={...this.latestValues},u=gn();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const v=ae(),g=c?c.source:void 0,m=this.layout?this.layout.source:void 0,b=g!==m,h=this.getStack(),x=!h||h.members.length<=1,y=!!(b&&!x&&this.options.crossfade===!0&&!this.path.some(Kv));this.animationProgress=0;let w;const S=d==null?void 0:d.interpolateProjection(o);this.mixTargetDelta=E=>{const C=E/1e3,T=S==null?void 0:S(C);T?(u.x.translate=T.x,u.x.scale=U(o.x.scale,1,C),u.x.origin=o.x.origin,u.x.originPoint=o.x.originPoint,u.y.translate=T.y,u.y.scale=U(o.y.scale,1,C),u.y.origin=o.y.origin,u.y.originPoint=o.y.originPoint):(ex(u.x,o.x,C),ex(u.y,o.y,C)),this.setTargetDelta(u),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(go(v,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),$v(this.relativeTarget,this.relativeTargetOrigin,v,C),w&&kv(this.relativeTarget,w)&&(this.isProjectionDirty=!1),w||(w=ae()),dt(w,this.relativeTarget)),b&&(this.animationValues=p,Cv(p,f,this.latestValues,C,y,x)),T&&T.rotate!==void 0&&(this.animationValues||(this.animationValues=p),this.animationValues.pathRotation=T.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=C},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){var l,d,c;this.notifyListeners("animationStart"),(l=this.currentAnimation)==null||l.stop(),(c=(d=this.resumingFrom)==null?void 0:d.currentAnimation)==null||c.stop(),this.pendingAnimation&&(ii(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=W.update(()=>{yo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=hn(0)),this.motionValue.jump(0,!1),this.currentAnimation=zv(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:f=>{this.mixTargetDelta(f),o.onUpdate&&o.onUpdate(f)},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Nv),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:l,target:d,layout:c,latestValues:f}=o;if(!(!l||!d||!c)){if(this!==o&&this.layout&&c&&rx(this.options.animationType,this.layout.layoutBox,c.layoutBox)){d=this.target||ae();const p=Ae(this.layout.layoutBox.x);d.x.min=o.target.x.min,d.x.max=d.x.min+p;const u=Ae(this.layout.layoutBox.y);d.y.min=o.target.y.min,d.y.max=d.y.min+u}dt(l,d),xo(l,f),As(this.projectionDeltaWithTransform,this.layoutCorrected,l,f)}}registerSharedNode(o,l){this.sharedNodes.has(o)||this.sharedNodes.set(o,new Mv),this.sharedNodes.get(o).add(l);const c=l.options.initialPromotionConfig;l.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(l):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var l;const{layoutId:o}=this.options;return o?((l=this.getStack())==null?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:o}=this.options;return o?(l=this.getStack())==null?void 0:l.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:l,preserveFollowOpacity:d}={}){const c=this.getStack();c&&c.promote(this,d),o&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let l=!1;const{latestValues:d}=o;if((d.z||d.rotate||d.rotateX||d.rotateY||d.rotateZ||d.skewX||d.skewY)&&(l=!0),!l)return;const c={};d.z&&Hd("z",o,c,this.animationValues);for(let f=0;f<Yd.length;f++)Hd(`rotate${Yd[f]}`,o,c,this.animationValues),Hd(`skew${Yd[f]}`,o,c,this.animationValues);o.render();for(const f in c)o.setStaticValue(f,c[f]),this.animationValues&&(this.animationValues[f]=c[f]);o.scheduleRender()}applyProjectionStyles(o,l){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const d=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=mo(l==null?void 0:l.pointerEvents)||"",o.transform=d?d(this.latestValues,""):"none";return}const c=this.getLead();if(!this.projectionDelta||!this.layout||!c.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=mo(l==null?void 0:l.pointerEvents)||""),this.hasProjected&&!Ai(this.latestValues)&&(o.transform=d?d({},""):"none",this.hasProjected=!1);return}o.visibility="";const f=c.animationValues||c.latestValues;this.applyTransformsToTarget();let p=Sv(this.projectionDeltaWithTransform,this.treeScale,f);d&&(p=d(f,p)),o.transform=p;const{x:u,y:v}=this.projectionDelta;o.transformOrigin=`${u.origin*100}% ${v.origin*100}% 0`,c.animationValues?o.opacity=c===this?f.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:f.opacityExit:o.opacity=c===this?f.opacity!==void 0?f.opacity:"":f.opacityExit!==void 0?f.opacityExit:0;for(const g in Ud){if(f[g]===void 0)continue;const{correct:m,applyTo:b,isCSSVariable:h}=Ud[g],x=p==="none"?f[g]:m(f[g],c);if(b){const y=b.length;for(let w=0;w<y;w++)o[b[w]]=x}else h?this.options.visualElement.renderState.vars[g]=x:o[g]=x}this.options.layoutId&&(o.pointerEvents=c===this?mo(l==null?void 0:l.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var l;return(l=o.currentAnimation)==null?void 0:l.stop()}),this.root.nodes.forEach(X0),this.root.sharedNodes.clear()}}}function Lv(e){e.updateLayout()}function Iv(e){var i;const t=((i=e.resumeFrom)==null?void 0:i.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){const{layoutBox:n,measuredBox:s}=e.layout,{animationType:r}=e.options,o=t.source!==e.layout.source;if(r==="size")bt(p=>{const u=o?t.measuredBox[p]:t.layoutBox[p],v=Ae(u);u.min=n[p].min,u.max=u.min+v});else if(r==="x"||r==="y"){const p=r==="x"?"y":"x";_d(o?t.measuredBox[p]:t.layoutBox[p],n[p])}else rx(r,t.layoutBox,n)&&bt(p=>{const u=o?t.measuredBox[p]:t.layoutBox[p],v=Ae(n[p]);u.max=u.min+v,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[p].max=e.relativeTarget[p].min+v)});const l=gn();As(l,n,t.layoutBox);const d=gn();o?As(d,e.applyTransform(s,!0),t.measuredBox):As(d,n,t.layoutBox);const c=!F0(l);let f=!1;if(!e.resumeFrom){const p=e.getClosestProjectingParent();if(p&&!p.resumeFrom){const{snapshot:u,layout:v}=p;if(u&&v){const g=e.options.layoutAnchor||void 0,m=ae();go(m,t.layoutBox,u.layoutBox,g);const b=ae();go(b,n,v.layoutBox,g),V0(m,b)||(f=!0),p.options.layoutRoot&&(e.relativeTarget=b,e.relativeTargetOrigin=m,e.relativeParent=p)}}}e.notifyListeners("didUpdate",{layout:n,snapshot:t,delta:d,layoutDelta:l,hasLayoutChanged:c,hasRelativeLayoutChanged:f})}else if(e.isLead()){const{onExitComplete:n}=e.options;n&&n()}e.options.transition=void 0}function Ov(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function Bv(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function Fv(e){e.clearSnapshot()}function X0(e){e.clearMeasurements()}function Wv(e){e.isLayoutDirty=!0,e.updateLayout()}function J0(e){e.isLayoutDirty=!1}function Uv(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function Vv(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function Z0(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function _v(e){e.resolveTargetDelta()}function Yv(e){e.calcProjection()}function Hv(e){e.resetSkewAndRotation()}function qv(e){e.removeLeadSnapshot()}function ex(e,t,i){e.translate=U(t.translate,0,i),e.scale=U(t.scale,1,i),e.origin=t.origin,e.originPoint=t.originPoint}function tx(e,t,i,n){e.min=U(t.min,i.min,n),e.max=U(t.max,i.max,n)}function $v(e,t,i,n){tx(e.x,t.x,i.x,n),tx(e.y,t.y,i.y,n)}function Kv(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const Qv={duration:.45,ease:[.4,0,.1,1]},ix=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),nx=ix("applewebkit/")&&!ix("chrome/")?Math.round:Qe;function sx(e){e.min=nx(e.min),e.max=nx(e.max)}function Gv(e){sx(e.x),sx(e.y)}function rx(e,t,i){return e==="position"||e==="preserve-aspect"&&!mv(_0(t),_0(i),.2)}function Xv(e){var t;return e!==e.root&&((t=e.scroll)==null?void 0:t.wasRoot)}const Jv=G0({attachResizeListener:(e,t)=>zs(e,"resize",t),measureScroll:()=>{var e,t;return{x:document.documentElement.scrollLeft||((e=document.body)==null?void 0:e.scrollLeft)||0,y:document.documentElement.scrollTop||((t=document.body)==null?void 0:t.scrollTop)||0}},checkIsScrollRoot:()=>!0}),qd={current:void 0},ox=G0({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!qd.current){const e=new Jv({});e.mount(window),e.setOptions({layoutScroll:!0}),qd.current=e}return qd.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),ax=k.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function Zv(e=!0){const t=k.useContext(_l);if(t===null)return[!0,null];const{isPresent:i,onExitComplete:n,register:s}=t,r=k.useId();k.useEffect(()=>{if(e)return s(r)},[e]);const o=k.useCallback(()=>e&&n&&n(r),[r,n,e]);return!i&&n?[!1,o]:[!0]}const lx=k.createContext({strict:!1}),dx={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let cx=!1;function eb(){if(cx)return;const e={};for(const t in dx)e[t]={isEnabled:i=>dx[t].some(n=>!!i[n])};a0(e),cx=!0}function fx(){return eb(),_2()}function tb(e){const t=fx();for(const i in e)t[i]={...t[i],...e[i]};a0(t)}const ib=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function vo(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||ib.has(e)}let px=e=>!vo(e);function nb(e){typeof e=="function"&&(px=t=>t.startsWith("on")?!vo(t):e(t))}try{nb(require("@emotion/is-prop-valid").default)}catch{}function sb(e,t,i){const n={};for(const s in e)s==="values"&&typeof e.values=="object"||ge(e[s])||(px(s)||i===!0&&vo(s)||!t&&!vo(s)||e.draggable&&s.startsWith("onDrag"))&&(n[s]=e[s]);return n}const bo=k.createContext({});function rb(e,t){if(po(e)){const{initial:i,animate:n}=e;return{initial:i===!1||Cs(i)?i:void 0,animate:Cs(n)?n:void 0}}return e.inherit!==!1?t:{}}function ob(e){const{initial:t,animate:i}=rb(e,k.useContext(bo));return k.useMemo(()=>({initial:t,animate:i}),[ux(t),ux(i)])}function ux(e){return Array.isArray(e)?e.join(" "):e}const $d=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function hx(e,t,i){for(const n in t)!ge(t[n])&&!w0(n,i)&&(e[n]=t[n])}function ab({transformTemplate:e},t){return k.useMemo(()=>{const i=$d();return Wd(i,t,e),Object.assign({},i.vars,i.style)},[t])}function lb(e,t){const i=e.style||{},n={};return hx(n,i,e),Object.assign(n,ab(e,t)),n}function db(e,t){const i={},n=lb(e,t);return e.drag&&e.dragListener!==!1&&(i.draggable=!1,n.userSelect=n.WebkitUserSelect=n.WebkitTouchCallout="none",n.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(i.tabIndex=0),i.style=n,i}const xx=()=>({...$d(),attrs:{}});function cb(e,t,i,n){const s=k.useMemo(()=>{const r=xx();return k0(r,t,E0(n),e.transformTemplate,e.style),{...r.attrs,style:{...r.style}}},[t]);if(e.style){const r={};hx(r,e.style,e),s.style={...r,...s.style}}return s}const fb=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Kd(e){return typeof e!="string"||e.includes("-")?!1:!!(fb.indexOf(e)>-1||/[A-Z]/u.test(e))}function pb(e,t,i,{latestValues:n},s,r=!1,o){const d=(o??Kd(e)?cb:db)(t,n,s,e),c=sb(t,typeof e=="string",r),f=e!==k.Fragment?{...c,...d,ref:i}:{},{children:p}=t,u=k.useMemo(()=>ge(p)?p.get():p,[p]);return k.createElement(e,{...f,children:u})}function ub({scrapeMotionValuesFromProps:e,createRenderState:t},i,n,s){return{latestValues:hb(i,n,s,e),renderState:t()}}function hb(e,t,i,n){const s={},r=n(e,{});for(const u in r)s[u]=mo(r[u]);let{initial:o,animate:l}=e;const d=po(e),c=s0(e);t&&c&&!d&&e.inherit!==!1&&(o===void 0&&(o=t.initial),l===void 0&&(l=t.animate));let f=i?i.initial===!1:!1;f=f||o===!1;const p=f?l:o;if(p&&typeof p!="boolean"&&!fo(p)){const u=Array.isArray(p)?p:[p];for(let v=0;v<u.length;v++){const g=wd(e,u[v]);if(g){const{transitionEnd:m,transition:b,...h}=g;for(const x in h){let y=h[x];if(Array.isArray(y)){const w=f?y.length-1:0;y=y[w]}y!==null&&(s[x]=y)}for(const x in m)s[x]=m[x]}}}return s}const gx=e=>(t,i)=>{const n=k.useContext(bo),s=k.useContext(_l),r=()=>ub(e,t,n,s);return i?r():xy(r)},xb=gx({scrapeMotionValuesFromProps:Vd,createRenderState:$d}),gb=gx({scrapeMotionValuesFromProps:C0,createRenderState:xx}),mb=Symbol.for("motionComponentSymbol");function yb(e,t,i){const n=k.useRef(i);k.useInsertionEffect(()=>{n.current=i});const s=k.useRef(null);return k.useCallback(r=>{var l;r&&((l=e.onMount)==null||l.call(e,r)),t&&(r?t.mount(r):t.unmount());const o=n.current;if(typeof o=="function")if(r){const d=o(r);typeof d=="function"&&(s.current=d)}else s.current?(s.current(),s.current=null):o(r);else o&&(o.current=r)},[t])}const mx=k.createContext({});function mn(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function vb(e,t,i,n,s,r){var y,w;const{visualElement:o}=k.useContext(bo),l=k.useContext(lx),d=k.useContext(_l),c=k.useContext(ax),f=c.reducedMotion,p=c.skipAnimations,u=k.useRef(null),v=k.useRef(!1);n=n||l.renderer,!u.current&&n&&(u.current=n(e,{visualState:t,parent:o,props:i,presenceContext:d,blockInitialAnimation:d?d.initial===!1:!1,reducedMotionConfig:f,skipAnimations:p,isSVG:r}),v.current&&u.current&&(u.current.manuallyAnimateOnMount=!0));const g=u.current,m=k.useContext(mx);g&&!g.projection&&s&&(g.type==="html"||g.type==="svg")&&bb(u.current,i,s,m);const b=k.useRef(!1);k.useInsertionEffect(()=>{g&&b.current&&g.update(i,d)});const h=i[Bh],x=k.useRef(!!h&&typeof window<"u"&&!((y=window.MotionHandoffIsComplete)!=null&&y.call(window,h))&&((w=window.MotionHasOptimisedAnimation)==null?void 0:w.call(window,h)));return gy(()=>{v.current=!0,g&&(b.current=!0,window.MotionIsMounted=!0,g.updateFeatures(),g.scheduleRenderMicrotask(),x.current&&g.animationState&&g.animationState.animateChanges())}),k.useEffect(()=>{g&&(!x.current&&g.animationState&&g.animationState.animateChanges(),x.current&&(queueMicrotask(()=>{var S;(S=window.MotionHandoffMarkAsComplete)==null||S.call(window,h)}),x.current=!1),g.enteringChildren=void 0)}),g}function bb(e,t,i,n){const{layoutId:s,layout:r,drag:o,dragConstraints:l,layoutScroll:d,layoutRoot:c,layoutAnchor:f,layoutCrossfade:p}=t;e.projection=new i(e.latestValues,t["data-framer-portal-id"]?void 0:yx(e.parent)),e.projection.setOptions({layoutId:s,layout:r,alwaysMeasureLayout:!!o||l&&mn(l),visualElement:e,animationType:typeof r=="string"?r:"both",initialPromotionConfig:n,crossfade:p,layoutScroll:d,layoutRoot:c,layoutAnchor:f})}function yx(e){if(e)return e.options.allowProjection!==!1?e.projection:yx(e.parent)}function Qd(e,{forwardMotionProps:t=!1,type:i}={},n,s){n&&tb(n);const r=i?i==="svg":Kd(e),o=r?gb:xb;function l(c,f){let p;const u={...k.useContext(ax),...c,layoutId:wb(c)},{isStatic:v}=u,g=ob(c),m=o(c,v);if(!v&&typeof window<"u"){kb();const b=Sb(u);p=b.MeasureLayout,g.visualElement=vb(e,m,u,s,b.ProjectionNode,r)}return a.jsxs(bo.Provider,{value:g,children:[p&&g.visualElement?a.jsx(p,{visualElement:g.visualElement,...u}):null,pb(e,c,yb(m,g.visualElement,f),m,v,t,r)]})}l.displayName=`motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;const d=k.forwardRef(l);return d[mb]=e,d}function wb({layoutId:e}){const t=k.useContext(Nu).id;return t&&e!==void 0?t+"-"+e:e}function kb(e,t){k.useContext(lx).strict}function Sb(e){const t=fx(),{drag:i,layout:n}=t;if(!i&&!n)return{};const s={...i,...n};return{MeasureLayout:i!=null&&i.isEnabled(e)||n!=null&&n.isEnabled(e)?s.MeasureLayout:void 0,ProjectionNode:s.ProjectionNode}}function Eb(e,t){if(typeof Proxy>"u")return Qd;const i=new Map,n=(r,o)=>Qd(r,o,e,t),s=(r,o)=>n(r,o);return new Proxy(s,{get:(r,o)=>o==="create"?n:(i.has(o)||i.set(o,Qd(o,void 0,e,t)),i.get(o))})}const Cb=(e,t)=>t.isSVG??Kd(e)?new ov(t):new ev(t,{allowProjection:e!==k.Fragment});class Tb extends ri{constructor(t){super(t),t.animationState||(t.animationState=fv(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();fo(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:i}=this.node.prevProps||{};t!==i&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)==null||t.call(this)}}let Ab=0;class zb extends ri{constructor(){super(...arguments),this.id=Ab++,this.isExitComplete=!1}update(){var r;if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:i}=this.node.presenceContext,{isPresent:n}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===n)return;if(t&&n===!1){if(this.isExitComplete){const{initial:o,custom:l}=this.node.getProps();if(typeof o=="string"||typeof o=="object"&&o!==null&&!Array.isArray(o)){const d=Ti(this.node,o,l);if(d){const{transition:c,transitionEnd:f,...p}=d;for(const u in p)(r=this.node.getValue(u))==null||r.jump(p[u])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const s=this.node.animationState.setActive("exit",!t);i&&!t&&s.then(()=>{this.isExitComplete=!0,i(this.id)})}mount(){const{register:t,onExitComplete:i}=this.node.presenceContext||{};i&&i(this.id),t&&(this.unmount=t(this.id))}unmount(){}}const Rb={animation:{Feature:Tb},exit:{Feature:zb}};function Rs(e){return{point:{x:e.pageX,y:e.pageY}}}const Db=e=>t=>jd(t)&&e(t,Rs(t));function Ds(e,t,i,n){return zs(e,t,Db(i),n)}const vx=({current:e})=>e?e.ownerDocument.defaultView:null,bx=(e,t)=>Math.abs(e-t);function jb(e,t){const i=bx(e.x,t.x),n=bx(e.y,t.y);return Math.sqrt(i**2+n**2)}const wx=new Set(["auto","scroll"]);class kx{constructor(t,i,{transformPagePoint:n,contextWindow:s=window,dragSnapToOrigin:r=!1,distanceThreshold:o=3,element:l}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=g=>{this.handleScroll(g.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=wo(this.lastRawMoveEventInfo,this.transformPagePoint));const g=Gd(this.lastMoveEventInfo,this.history),m=this.startEvent!==null,b=jb(g.offset,{x:0,y:0})>=this.distanceThreshold;if(!m&&!b)return;const{point:h}=g,{timestamp:x}=xe;this.history.push({...h,timestamp:x});const{onStart:y,onMove:w}=this.handlers;m||(y&&y(this.lastMoveEvent,g),this.startEvent=this.lastMoveEvent),w&&w(this.lastMoveEvent,g)},this.handlePointerMove=(g,m)=>{this.lastMoveEvent=g,this.lastRawMoveEventInfo=m,this.lastMoveEventInfo=wo(m,this.transformPagePoint),W.update(this.updatePoint,!0)},this.handlePointerUp=(g,m)=>{this.end();const{onEnd:b,onSessionEnd:h,resumeAnimation:x}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&x&&x(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const y=Gd(g.type==="pointercancel"?this.lastMoveEventInfo:wo(m,this.transformPagePoint),this.history);this.startEvent&&b&&b(g,y),h&&h(g,y)},!jd(t))return;this.dragSnapToOrigin=r,this.handlers=i,this.transformPagePoint=n,this.distanceThreshold=o,this.contextWindow=s||window;const d=Rs(t),c=wo(d,this.transformPagePoint),{point:f}=c,{timestamp:p}=xe;this.history=[{...f,timestamp:p}];const{onSessionStart:u}=i;u&&u(t,Gd(c,this.history));const v={passive:!0,capture:!0};this.removeListeners=ms(Ds(this.contextWindow,"pointermove",this.handlePointerMove,v),Ds(this.contextWindow,"pointerup",this.handlePointerUp,v),Ds(this.contextWindow,"pointercancel",this.handlePointerUp,v)),l&&this.startScrollTracking(l)}startScrollTracking(t){let i=t.parentElement;for(;i;){const n=getComputedStyle(i);(wx.has(n.overflowX)||wx.has(n.overflowY))&&this.scrollPositions.set(i,{x:i.scrollLeft,y:i.scrollTop}),i=i.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(t){const i=this.scrollPositions.get(t);if(!i)return;const n=t===window,s=n?{x:window.scrollX,y:window.scrollY}:{x:t.scrollLeft,y:t.scrollTop},r={x:s.x-i.x,y:s.y-i.y};r.x===0&&r.y===0||(n?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=r.x,this.lastMoveEventInfo.point.y+=r.y):this.history.length>0&&(this.history[0].x-=r.x,this.history[0].y-=r.y),this.scrollPositions.set(t,s),W.update(this.updatePoint,!0))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),ii(this.updatePoint)}}function wo(e,t){return t?{point:t(e.point)}:e}function Sx(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Gd({point:e},t){return{point:e,delta:Sx(e,Ex(t)),offset:Sx(e,Mb(t)),velocity:Nb(t,.1)}}function Mb(e){return e[0]}function Ex(e){return e[e.length-1]}function Nb(e,t){if(e.length<2)return{x:0,y:0};let i=e.length-1,n=null;const s=Ex(e);for(;i>=0&&(n=e[i],!(s.timestamp-n.timestamp>Ne(t)));)i--;if(!n)return{x:0,y:0};n===e[0]&&e.length>2&&s.timestamp-n.timestamp>Ne(t)*2&&(n=e[1]);const r=Ge(s.timestamp-n.timestamp);if(r===0)return{x:0,y:0};const o={x:(s.x-n.x)/r,y:(s.y-n.y)/r};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function Pb(e,{min:t,max:i},n){return t!==void 0&&e<t?e=n?U(t,e,n.min):Math.max(e,t):i!==void 0&&e>i&&(e=n?U(i,e,n.max):Math.min(e,i)),e}function Cx(e,t,i){return{min:t!==void 0?e.min+t:void 0,max:i!==void 0?e.max+i-(e.max-e.min):void 0}}function Lb(e,{top:t,left:i,bottom:n,right:s}){return{x:Cx(e.x,i,s),y:Cx(e.y,t,n)}}function Tx(e,t){let i=t.min-e.min,n=t.max-e.max;return t.max-t.min<e.max-e.min&&([i,n]=[n,i]),{min:i,max:n}}function Ib(e,t){return{x:Tx(e.x,t.x),y:Tx(e.y,t.y)}}function Ob(e,t){let i=.5;const n=Ae(e),s=Ae(t);return s>n?i=ys(t.min,t.max-n,e.min):n>s&&(i=ys(e.min,e.max-s,t.min)),mt(0,1,i)}function Bb(e,t){const i={};return t.min!==void 0&&(i.min=t.min-e.min),t.max!==void 0&&(i.max=t.max-e.min),i}const Xd=.35;function Fb(e=Xd){return e===!1?e=0:e===!0&&(e=Xd),{x:Ax(e,"left","right"),y:Ax(e,"top","bottom")}}function Ax(e,t,i){return{min:zx(e,t),max:zx(e,i)}}function zx(e,t){return typeof e=="number"?e:e[t]||0}const Wb=new WeakMap;class Ub{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ae(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=t}start(t,{snapToCursor:i=!1,distanceThreshold:n}={}){const{presenceContext:s}=this.visualElement;if(s&&s.isPresent===!1)return;const r=p=>{i&&this.snapToCursor(Rs(p).point),this.stopAnimation()},o=(p,u)=>{const{drag:v,dragPropagation:g,onDragStart:m}=this.getProps();if(v&&!g&&(this.openDragLock&&this.openDragLock(),this.openDragLock=v2(v),!this.openDragLock))return;this.latestPointerEvent=p,this.latestPanInfo=u,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),bt(h=>{let x=this.getAxisMotionValue(h).get()||0;if(yt.test(x)){const{projection:y}=this.visualElement;if(y&&y.layout){const w=y.layout.layoutBox[h];w&&(x=Ae(w)*(parseFloat(x)/100))}}this.originPoint[h]=x}),m&&W.update(()=>m(p,u),!1,!0),Sd(this.visualElement,"transform");const{animationState:b}=this.visualElement;b&&b.setActive("whileDrag",!0)},l=(p,u)=>{this.latestPointerEvent=p,this.latestPanInfo=u;const{dragPropagation:v,dragDirectionLock:g,onDirectionLock:m,onDrag:b}=this.getProps();if(!v&&!this.openDragLock)return;const{offset:h}=u;if(g&&this.currentDirection===null){this.currentDirection=_b(h),this.currentDirection!==null&&m&&m(this.currentDirection);return}this.updateAxis("x",u.point,h),this.updateAxis("y",u.point,h),this.visualElement.render(),b&&W.update(()=>b(p,u),!1,!0)},d=(p,u)=>{this.latestPointerEvent=p,this.latestPanInfo=u,this.stop(p,u),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{const{dragSnapToOrigin:p}=this.getProps();(p||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:f}=this.getProps();this.panSession=new kx(t,{onSessionStart:r,onStart:o,onMove:l,onSessionEnd:d,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:f,distanceThreshold:n,contextWindow:vx(this.visualElement),element:this.visualElement.current})}stop(t,i){const n=t||this.latestPointerEvent,s=i||this.latestPanInfo,r=this.isDragging;if(this.cancel(),!r||!s||!n)return;const{velocity:o}=s;this.startAnimation(o);const{onDragEnd:l}=this.getProps();l&&W.postRender(()=>l(n,s))}cancel(){this.isDragging=!1;const{projection:t,animationState:i}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:n}=this.getProps();!n&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),i&&i.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(t,i,n){const{drag:s}=this.getProps();if(!n||!ko(t,s,this.currentDirection))return;const r=this.getAxisMotionValue(t);let o=this.originPoint[t]+n[t];this.constraints&&this.constraints[t]&&(o=Pb(o,this.constraints[t],this.elastic[t])),r.set(o)}resolveConstraints(){var r;const{dragConstraints:t,dragElastic:i}=this.getProps(),n=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(r=this.visualElement.projection)==null?void 0:r.layout,s=this.constraints;t&&mn(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&n?this.constraints=Lb(n.layoutBox,t):this.constraints=!1,this.elastic=Fb(i),s!==this.constraints&&!mn(t)&&n&&this.constraints&&!this.hasMutatedConstraints&&bt(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=Bb(n.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:i}=this.getProps();if(!t||!mn(t))return!1;const n=t.current;ki(n!==null,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.","drag-constraints-ref");const{projection:s}=this.visualElement;if(!s||!s.layout)return!1;s.root&&(s.root.scroll=void 0,s.root.updateScroll());const r=K2(n,s.root,this.visualElement.getTransformPagePoint());let o=Ib(s.layout.layoutBox,r);if(i){const l=i(H2(o));this.hasMutatedConstraints=!!l,l&&(o=d0(l))}return o}startAnimation(t){const{drag:i,dragMomentum:n,dragElastic:s,dragTransition:r,dragSnapToOrigin:o,onDragTransitionEnd:l}=this.getProps(),d=this.constraints||{},c=bt(f=>{if(!ko(f,i,this.currentDirection))return;let p=d&&d[f]||{};(o===!0||o===f)&&(p={min:0,max:0});const u=s?200:1e6,v=s?40:1e7,g={type:"inertia",velocity:n?t[f]:0,bounceStiffness:u,bounceDamping:v,timeConstant:750,restDelta:1,restSpeed:10,...r,...p};return this.startAxisValueAnimation(f,g)});return Promise.all(c).then(l)}startAxisValueAnimation(t,i){const n=this.getAxisMotionValue(t);return Sd(this.visualElement,t),n.start(bd(t,n,0,i,this.visualElement,!1))}stopAnimation(){bt(t=>this.getAxisMotionValue(t).stop())}getAxisMotionValue(t){const i=`_drag${t.toUpperCase()}`,s=this.visualElement.getProps()[i];return s||this.visualElement.getValue(t,this.visualElement.latestValues[t]??0)}snapToCursor(t){bt(i=>{const{drag:n}=this.getProps();if(!ko(i,n,this.currentDirection))return;const{projection:s}=this.visualElement,r=this.getAxisMotionValue(i);if(s&&s.layout){const{min:o,max:l}=s.layout.layoutBox[i],d=r.get()||0;r.set(t[i]-U(o,l,.5)+d)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:i}=this.getProps(),{projection:n}=this.visualElement;if(!mn(i)||!n||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};bt(o=>{const l=this.getAxisMotionValue(o);if(l&&this.constraints!==!1){const d=l.get();s[o]=Ob({min:d,max:d},this.constraints[o])}});const{transformTemplate:r}=this.visualElement.getProps();this.visualElement.current.style.transform=r?r({},""):"none",n.root&&n.root.updateScroll(),n.updateLayout(),this.constraints=!1,this.resolveConstraints(),bt(o=>{if(!ko(o,t,null))return;const l=this.getAxisMotionValue(o),{min:d,max:c}=this.constraints[o];l.set(U(d,c,s[o]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;Wb.set(this.visualElement,this);const t=this.visualElement.current,i=Ds(t,"pointerdown",c=>{const{drag:f,dragListener:p=!0}=this.getProps(),u=c.target,v=u!==t&&C2(u);f&&p&&!v&&this.start(c)});let n;const s=()=>{const{dragConstraints:c}=this.getProps();mn(c)&&c.current&&(this.constraints=this.resolveRefConstraints(),n||(n=Vb(t,c.current,()=>this.scalePositionWithinConstraints())))},{projection:r}=this.visualElement,o=r.addEventListener("measure",s);r&&!r.layout&&(r.root&&r.root.updateScroll(),r.updateLayout()),W.read(s);const l=zs(window,"resize",()=>this.scalePositionWithinConstraints()),d=r.addEventListener("didUpdate",({delta:c,hasLayoutChanged:f})=>{this.isDragging&&f&&(bt(p=>{const u=this.getAxisMotionValue(p);u&&(this.originPoint[p]+=c[p].translate,u.set(u.get()+c[p].translate))}),this.visualElement.render())});return()=>{l(),i(),o(),d&&d(),n&&n()}}getProps(){const t=this.visualElement.getProps(),{drag:i=!1,dragDirectionLock:n=!1,dragPropagation:s=!1,dragConstraints:r=!1,dragElastic:o=Xd,dragMomentum:l=!0}=t;return{...t,drag:i,dragDirectionLock:n,dragPropagation:s,dragConstraints:r,dragElastic:o,dragMomentum:l}}}function Rx(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function Vb(e,t,i){const n=t0(e,Rx(i)),s=t0(t,Rx(i));return()=>{n(),s()}}function ko(e,t,i){return(t===!0||t===e)&&(i===null||i===e)}function _b(e,t=10){let i=null;return Math.abs(e.y)>t?i="y":Math.abs(e.x)>t&&(i="x"),i}class Yb extends ri{constructor(t){super(t),this.removeGroupControls=Qe,this.removeListeners=Qe,this.controls=new Ub(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Qe}update(){const{dragControls:t}=this.node.getProps(),{dragControls:i}=this.node.prevProps||{};t!==i&&(this.removeGroupControls(),t&&(this.removeGroupControls=t.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const Jd=e=>(t,i)=>{e&&W.update(()=>e(t,i),!1,!0)};class Hb extends ri{constructor(){super(...arguments),this.removePointerDownListener=Qe}onPointerDown(t){this.session=new kx(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:vx(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:i,onPan:n,onPanEnd:s}=this.node.getProps();return{onSessionStart:Jd(t),onStart:Jd(i),onMove:Jd(n),onEnd:(r,o)=>{delete this.session,s&&W.postRender(()=>s(r,o))}}}mount(){this.removePointerDownListener=Ds(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let Zd=!1;class qb extends k.Component{componentDidMount(){const{visualElement:t,layoutGroup:i,switchLayoutGroup:n,layoutId:s}=this.props,{projection:r}=t;r&&(i.group&&i.group.add(r),n&&n.register&&s&&n.register(r),Zd&&r.root.didUpdate(),r.addEventListener("animationComplete",()=>{this.safeToRemove()}),r.setOptions({...r.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),yo.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:i,visualElement:n,drag:s,isPresent:r}=this.props,{projection:o}=n;return o&&(o.isPresent=r,t.layoutDependency!==i&&o.setOptions({...o.options,layoutDependency:i}),Zd=!0,s||t.layoutDependency!==i||i===void 0||t.isPresent!==r?o.willUpdate():this.safeToRemove(),t.isPresent!==r&&(r?o.promote():o.relegate()||W.postRender(()=>{const l=o.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:t,layoutAnchor:i}=this.props,{projection:n}=t;n&&(n.options.layoutAnchor=i,n.root.didUpdate(),Dd.postRender(()=>{!n.currentAnimation&&n.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:i,switchLayoutGroup:n}=this.props,{projection:s}=t;Zd=!0,s&&(s.scheduleCheckAfterUnmount(),i&&i.group&&i.group.remove(s),n&&n.deregister&&n.deregister(s))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function Dx(e){const[t,i]=Zv(),n=k.useContext(Nu);return a.jsx(qb,{...e,layoutGroup:n,switchLayoutGroup:k.useContext(mx),isPresent:t,safeToRemove:i})}const $b={pan:{Feature:Hb},drag:{Feature:Yb,ProjectionNode:ox,MeasureLayout:Dx}};function jx(e,t,i){const{props:n}=e;e.animationState&&n.whileHover&&e.animationState.setActive("whileHover",i==="Start");const s="onHover"+i,r=n[s];r&&W.postRender(()=>r(t,Rs(t)))}class Kb extends ri{mount(){const{current:t}=this.node;t&&(this.unmount=w2(t,(i,n)=>(jx(this.node,n,"Start"),s=>jx(this.node,s,"End"))))}unmount(){}}class Qb extends ri{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ms(zs(this.node.current,"focus",()=>this.onFocus()),zs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Mx(e,t,i){const{props:n}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&n.whileTap&&e.animationState.setActive("whileTap",i==="Start");const s="onTap"+(i==="End"?"":i),r=n[s];r&&W.postRender(()=>r(t,Rs(t)))}class Gb extends ri{mount(){const{current:t}=this.node;if(!t)return;const{globalTapTarget:i,propagate:n}=this.node.props;this.unmount=A2(t,(s,r)=>(Mx(this.node,r,"Start"),(o,{success:l})=>Mx(this.node,o,l?"End":"Cancel")),{useGlobalTarget:i,stopPropagation:(n==null?void 0:n.tap)===!1})}unmount(){}}const ec=new WeakMap,tc=new WeakMap,Xb=e=>{const t=ec.get(e.target);t&&t(e)},Jb=e=>{e.forEach(Xb)};function Zb({root:e,...t}){const i=e||document;tc.has(i)||tc.set(i,{});const n=tc.get(i),s=JSON.stringify(t);return n[s]||(n[s]=new IntersectionObserver(Jb,{root:e,...t})),n[s]}function e5(e,t,i){const n=Zb(t);return ec.set(e,i),n.observe(e),()=>{ec.delete(e),n.unobserve(e)}}const t5={some:0,all:1};class i5 extends ri{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var d;(d=this.stopObserver)==null||d.call(this);const{viewport:t={}}=this.node.getProps(),{root:i,margin:n,amount:s="some",once:r}=t,o={root:i?i.current:void 0,rootMargin:n,threshold:typeof s=="number"?s:t5[s]},l=c=>{const{isIntersecting:f}=c;if(this.isInView===f||(this.isInView=f,r&&!f&&this.hasEnteredView))return;f&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",f);const{onViewportEnter:p,onViewportLeave:u}=this.node.getProps(),v=f?p:u;v&&v(c)};this.stopObserver=e5(this.node.current,o,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:i}=this.node;["amount","margin","root"].some(n5(t,i))&&this.startObserver()}unmount(){var t;(t=this.stopObserver)==null||t.call(this),this.hasEnteredView=!1,this.isInView=!1}}function n5({viewport:e={}},{viewport:t={}}={}){return i=>e[i]!==t[i]}const s5={...Rb,...{inView:{Feature:i5},tap:{Feature:Gb},focus:{Feature:Qb},hover:{Feature:Kb}},...$b,...{layout:{ProjectionNode:ox,MeasureLayout:Dx}}},yn=Eb(s5,Cb);function Nx({iconSize:e=32,variant:t="on-light"}){const i=t==="on-dark";return a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[a.jsxs("svg",{width:e,height:e,viewBox:"0 0 64 64",fill:"none",style:{flexShrink:0},"aria-hidden":"true",children:[a.jsx("rect",{x:"7",y:"7",width:"35",height:"35",rx:"10",fill:"#4338CA"}),a.jsx("rect",{x:"22",y:"22",width:"35",height:"35",rx:"10",fill:"#0891B2"}),a.jsx("rect",{x:"22",y:"22",width:"20",height:"20",rx:"9",fill:"#1D4ED8"})]}),a.jsxs("div",{style:{lineHeight:1.2},children:[a.jsxs("div",{style:{fontSize:Math.round(e*.41),fontWeight:600,color:i?"#fff":"#111827",fontFamily:"Inter, -apple-system, system-ui, sans-serif",letterSpacing:"-0.01em"},children:["Blended ",a.jsx("span",{style:{fontWeight:800,color:i?"#93c5fd":"#4338CA"},children:"Teaching"})," Content"]}),a.jsx("div",{style:{fontSize:Math.round(e*.27),color:i?"rgba(255,255,255,0.5)":"#6b7280",fontFamily:"Inter, -apple-system, system-ui, sans-serif",fontWeight:400,marginTop:1},children:"by Yasas Sri Wickramasinghe"})]})]})}const r5='-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue", system-ui, sans-serif',So=[.16,1,.3,1];function wt({eyebrow:e,titleLead:t,titleAccent:i,gradient:n,accent:s,orb2:r,orb3:o,subtitle:l,pills:d,children:c}){return a.jsxs("div",{style:{fontFamily:r5},className:"lessons-root min-h-screen bg-white text-[#1d1d1f]",children:[a.jsx("nav",{className:"sticky top-0 z-50 border-b border-black/[0.07] bg-white/90 backdrop-blur-xl",children:a.jsx("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-6 py-3",children:a.jsx("a",{href:"#/lessons",className:"no-underline",children:a.jsx(Nx,{iconSize:28,variant:"on-light"})})})}),a.jsxs("section",{className:"relative overflow-hidden px-6 pb-16 pt-20",children:[a.jsxs("div",{className:"pointer-events-none absolute inset-0 overflow-hidden",children:[a.jsx("div",{className:"absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl",style:{background:s+"17"}}),a.jsx("div",{className:"absolute bottom-[-8%] right-[5%] h-[360px] w-[360px] rounded-full blur-3xl",style:{background:r+"14"}}),a.jsx("div",{className:"absolute bottom-[0%] left-[2%] h-[280px] w-[280px] rounded-full blur-3xl",style:{background:o+"12"}})]}),a.jsxs("div",{className:"relative mx-auto max-w-3xl text-center",children:[a.jsx(yn.p,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.7,ease:So},className:"mb-5 text-[13px] font-semibold uppercase tracking-[0.24em]",style:{color:s},children:e}),a.jsxs(yn.h1,{initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.85,ease:So,delay:.06},className:"text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[68px]",children:[t," ",a.jsx("span",{className:"bg-clip-text text-transparent",style:{backgroundImage:n},children:i})]}),a.jsx(yn.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.85,ease:So,delay:.14},className:"mx-auto mt-7 max-w-xl text-[18px] leading-relaxed text-[#6e6e73] sm:text-[20px]",children:l}),d.length>0&&a.jsx(yn.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.7,ease:So,delay:.22},className:"mt-8 flex flex-wrap items-center justify-center gap-3",children:d.map(f=>a.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[14px] font-semibold",style:{borderColor:f.color+"44",background:f.color+"10",color:f.color},children:[f.emoji," ",f.name]},f.name))}),a.jsx(yn.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5,duration:.6},className:"mt-10 flex flex-col items-center gap-1.5",children:a.jsx(yn.div,{animate:{y:[0,7,0]},transition:{duration:1.8,repeat:1/0,ease:"easeInOut"},className:"text-[13px] font-medium text-[#aeaeb2]",children:"Scroll to begin"})})]})]}),a.jsx("section",{className:"mx-auto max-w-5xl px-4 pb-16 sm:px-6",children:c}),a.jsxs("footer",{className:"border-t border-black/[0.06] px-6 py-12 text-center",children:[a.jsx("div",{className:"mb-5 flex items-center justify-center",children:a.jsx(Nx,{iconSize:28,variant:"on-light"})}),a.jsx("p",{className:"text-[12px] text-[#aeaeb2]",children:"Everything here runs in your own browser. No login, no personal data collected."}),a.jsx("p",{className:"mt-4",children:a.jsx("a",{href:"#/lessons",className:"text-[13px] font-semibold",style:{color:s},children:"← Back to all lessons"})})]})]})}const X="#2563eb",js="#0891b2",Xe="#b45309",ct="#0d9488",kt="#7c3aed",we="#e5484d",Je="#30a46c";function o5(e=.12){const t=k.useRef(null),[i,n]=k.useState(!1);return k.useEffect(()=>{const s=t.current;if(!s)return;const r=new IntersectionObserver(([o])=>{o.isIntersecting&&(n(!0),r.disconnect())},{threshold:e});return r.observe(s),()=>r.disconnect()},[e]),{ref:t,visible:i}}function J({children:e,delay:t=0,className:i="",style:n={}}){const{ref:s,visible:r}=o5();return a.jsx("div",{ref:s,className:i,style:{opacity:r?1:0,transform:r?"translateY(0)":"translateY(26px)",transition:`opacity 0.6s ease ${t}s, transform 0.6s ease ${t}s`,...n},children:e})}function Ri({kicker:e,title:t,blurb:i,color:n=X}){return a.jsx(J,{children:a.jsxs("div",{style:{marginBottom:28},children:[a.jsx("p",{style:{margin:0,fontSize:13,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:n},children:e}),a.jsx("h2",{style:{margin:"10px 0 0",fontSize:"clamp(26px, 4vw, 38px)",fontWeight:600,letterSpacing:"-0.02em",lineHeight:1.08,color:"#1d1d1f"},children:t}),i&&a.jsx("p",{style:{margin:"14px 0 0",fontSize:17,lineHeight:1.6,color:"#6e6e73",maxWidth:680},children:i})]})})}function le({children:e,style:t={}}){return a.jsx("div",{style:{background:"#fafafa",border:"1px solid rgba(0,0,0,0.07)",borderRadius:24,padding:28,...t},children:e})}function oi({children:e,style:t={}}){return a.jsx("section",{style:{marginBottom:96,...t},children:e})}function fe(e,t=X){return{cursor:"pointer",font:"inherit",fontSize:14,fontWeight:600,padding:"9px 18px",borderRadius:999,border:e?"none":"1px solid rgba(0,0,0,0.12)",background:e?t:"#fff",color:e?"#fff":"#1d1d1f",transition:"all 0.2s ease"}}const ic={cursor:"pointer",font:"inherit",fontSize:12.5,fontWeight:600,padding:"7px 12px",borderRadius:999,border:"1px solid rgba(0,0,0,0.12)",background:"#fff",color:"#444"};function Ms({color:e,children:t}){return a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",background:e+"0e",border:`1px solid ${e}30`,borderRadius:16,padding:"14px 18px",marginBottom:22},children:[a.jsx("span",{style:{fontSize:18,lineHeight:1.4,flexShrink:0},children:"📌"}),a.jsxs("p",{style:{margin:0,fontSize:15,lineHeight:1.6,color:"#333"},children:[a.jsx("b",{style:{color:e},children:"Note."})," ",t]})]})}const a5=["CREATE","DATABASE","SCHEMA","TABLE","ALTER","ADD","COLUMN","MODIFY","CHANGE","PRIMARY","KEY","AUTO_INCREMENT","INSERT","INTO","VALUES","SELECT","FROM","WHERE","ORDER","BY","GROUP","COUNT","ASC","DESC","USE","AND","OR","DROP","AS","INT","VARCHAR","DECIMAL"];function l5(e){const t=new RegExp(`('[^']*')|(--[^
]*)|(#[^
]*)|\\b(${a5.join("|")})\\b`,"g"),i=[];let n=0,s,r=0;for(;s=t.exec(e);){s.index>n&&i.push(e.slice(n,s.index));const o=s[0];s[1]?i.push(a.jsx("span",{style:{color:"#86efac"},children:o},r++)):s[2]||s[3]?i.push(a.jsx("span",{style:{color:"#64748b"},children:o},r++)):i.push(a.jsx("span",{style:{color:"#7dd3fc"},children:o},r++)),n=t.lastIndex}return n<e.length&&i.push(e.slice(n)),i}function St({code:e,label:t}){return a.jsxs("div",{children:[t&&a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#6e6e73",marginBottom:8},children:t}),a.jsx("pre",{style:{margin:0,padding:"14px 16px",borderRadius:12,background:"#0f172a",color:"#e2e8f0",fontSize:13.5,lineHeight:1.65,overflowX:"auto",fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",whiteSpace:"pre"},children:a.jsx("code",{children:l5(e)})})]})}const Eo=[{id:1,title:"Atomic Habits",author:"James Clear",price:24.99,stock:12},{id:2,title:"Sapiens",author:"Yuval N. Harari",price:29.5,stock:7},{id:3,title:"The Pragmatic Programmer",author:"David Thomas",price:42,stock:3},{id:4,title:"Educated",author:"Tara Westover",price:18.75,stock:20},{id:5,title:"Deep Work",author:"Cal Newport",price:22,stock:9}],Px=[{key:"id",label:"id"},{key:"title",label:"title"},{key:"author",label:"author"},{key:"price",label:"price",align:"right"},{key:"stock",label:"stock_count",align:"right"}];function d5(e,t){return t==="price"?`$${e.price.toFixed(2)}`:String(e[t])}function nc({rows:e,sortKey:t,matchIds:i,fadeKey:n}){return a.jsx("div",{style:{overflowX:"auto",borderRadius:14,border:"1px solid rgba(0,0,0,0.08)"},children:a.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13.5,minWidth:460,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:[a.jsx("thead",{children:a.jsx("tr",{children:Px.map(s=>a.jsx("th",{style:{textAlign:s.align==="right"?"right":"left",padding:"11px 16px",background:t===s.key?X:"#1e293b",color:"#fff",fontWeight:700,fontSize:12.5,letterSpacing:"0.03em",whiteSpace:"nowrap",transition:"background 0.3s ease"},children:s.label},s.key))})}),a.jsx("tbody",{style:{animation:n!==void 0?"dbcFade 0.4s ease":void 0},children:e.map((s,r)=>{const o=!i||i.has(s.id);return a.jsx("tr",{style:{background:r%2?"#f6f8ff":"#fff",opacity:o?1:.32,transition:"opacity 0.3s ease"},children:Px.map(l=>a.jsx("td",{style:{textAlign:l.align==="right"?"right":"left",padding:"10px 16px",borderTop:"1px solid rgba(0,0,0,0.06)",color:"#1d1d1f",whiteSpace:"nowrap",fontWeight:t===l.key?700:400,background:o&&t===l.key?X+"0d":void 0},children:d5(s,l.key)},l.key))},s.id)})},n)]})})}function c5({num:e,color:t,title:i,explain:n,code:s,activityTask:r,activityAnswer:o}){const[l,d]=k.useState(!1);return a.jsxs(le,{children:[a.jsxs("div",{style:{display:"flex",gap:14,alignItems:"flex-start"},children:[a.jsx("div",{style:{flexShrink:0,width:32,height:32,borderRadius:"50%",background:t,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14},children:e}),a.jsxs("div",{style:{flex:1,minWidth:0},children:[a.jsx("h3",{style:{margin:0,fontSize:18,fontWeight:700,color:"#1d1d1f"},children:i}),a.jsx("p",{style:{margin:"8px 0 0",fontSize:15,lineHeight:1.6,color:"#444"},children:n}),a.jsx("div",{style:{marginTop:14},children:a.jsx(St,{code:s})})]})]}),a.jsxs("div",{style:{marginTop:16,padding:"14px 16px",borderRadius:14,background:t+"0c",border:`1px solid ${t}30`},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:t,marginBottom:6},children:"✏️ Your turn"}),a.jsx("p",{style:{margin:0,fontSize:14.5,lineHeight:1.55,color:"#333"},children:r}),a.jsx("button",{onClick:()=>d(c=>!c),style:{...fe(l,t),fontSize:13,marginTop:12},children:l?"Hide the answer":"Show the answer"}),l&&a.jsx("div",{style:{marginTop:12,animation:"dbcFade 0.3s ease"},children:a.jsx(St,{code:o})})]})]})}function Co({n:e,color:t,task:i,answer:n}){const[s,r]=k.useState(!1);return a.jsxs(le,{style:{background:t+"08",borderColor:t+"26"},children:[a.jsxs("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:t,marginBottom:8},children:["✏️ Activity ",e]}),a.jsx("p",{style:{margin:0,fontSize:14.5,lineHeight:1.55,color:"#333"},children:i}),a.jsx("button",{onClick:()=>r(o=>!o),style:{...fe(s,t),fontSize:13,marginTop:12},children:s?"Hide the answer":"Show the answer"}),s&&a.jsx("div",{style:{marginTop:12,animation:"dbcFade 0.3s ease"},children:a.jsx(St,{code:n})})]})}const f5=[{title:"1 · Create the database",explain:"Before we can make any tables, we need somewhere to keep them. CREATE DATABASE tells MySQL to start a fresh, empty space with the name we give it. We run this in MySQL Workbench, then click the refresh icon on the Schemas panel to see our new bookshop appear.",code:"CREATE DATABASE bookshop;",activityTask:"Create a database called bookshop in MySQL Workbench. Then double-click it in the Schemas panel so it becomes your active database (its name turns bold).",activityAnswer:"CREATE DATABASE bookshop;",color:X},{title:"2 · Create a table",explain:"A table is just a grid of rows and columns, a bit like a spreadsheet with rules. Every column needs a name and a data type. We use INT for whole numbers, VARCHAR(100) for short text (100 is the longest it can hold), and DECIMAL for money. For now we make price an INT on purpose, and we fix that in step 4.",code:`USE bookshop;

CREATE TABLE books (
  id     INT,
  title  VARCHAR(100),
  author VARCHAR(100),
  price  INT
);`,activityTask:"Inside bookshop, create a table called books with four columns: id (INT), title (VARCHAR 100), author (VARCHAR 100) and price (INT).",activityAnswer:`USE bookshop;

CREATE TABLE books (
  id     INT,
  title  VARCHAR(100),
  author VARCHAR(100),
  price  INT
);`,color:X},{title:"3 · Add a new column",explain:"Tables are not set in stone. With ALTER TABLE ADD COLUMN we can add a new field at any time, and none of the data we already have is lost. Let us say the shop now wants to keep track of how many copies of each book are in stock.",code:"ALTER TABLE books ADD COLUMN stock_count INT;",activityTask:"Add a new column called stock_count (INT) to the books table.",activityAnswer:"ALTER TABLE books ADD COLUMN stock_count INT;",color:X},{title:"4 · Change a column's data type",explain:"Right now price is an INT, so it can only hold whole numbers. But a book costs $19.99, not $19. MODIFY COLUMN lets us change the type of a column we already have. DECIMAL(6,2) means up to 6 digits in total, with 2 of them after the decimal point, which is perfect for prices.",code:"ALTER TABLE books MODIFY COLUMN price DECIMAL(6,2);",activityTask:"Change the price column from INT to DECIMAL(6,2) so it can hold cents.",activityAnswer:"ALTER TABLE books MODIFY COLUMN price DECIMAL(6,2);",color:X},{title:"5 · Make a column the primary key",explain:"A primary key is the column that gives every row its own identity. No two rows can share the same value, and it can never be left blank. id is the obvious choice here, because every book gets its own number and nothing else has to be unique.",code:"ALTER TABLE books ADD PRIMARY KEY (id);",activityTask:"Make id the primary key of the books table.",activityAnswer:"ALTER TABLE books ADD PRIMARY KEY (id);",color:X},{title:"6 · Make a column auto-increment",explain:"Typing an id by hand for every new book is slow and easy to get wrong. AUTO_INCREMENT asks MySQL to do the counting for us. When we add a book without giving an id, MySQL fills in the next free number by itself (1, 2, 3 and so on). In MySQL a column has to be a key before it can auto-increment, which is why we did step 5 first.",code:"ALTER TABLE books MODIFY COLUMN id INT AUTO_INCREMENT;",activityTask:"Make id AUTO_INCREMENT, then add a new book without giving it an id. Leave id out of the column list and watch MySQL fill in the number for you.",activityAnswer:`ALTER TABLE books MODIFY COLUMN id INT AUTO_INCREMENT;

INSERT INTO books (title, author, price, stock_count)
VALUES ('Atomic Habits', 'James Clear', 24.99, 12);`,color:X}],p5=`INSERT INTO books (title, author, price, stock_count) VALUES
('Atomic Habits',            'James Clear',     24.99, 12),
('Sapiens',                  'Yuval N. Harari', 29.50,  7),
('The Pragmatic Programmer', 'David Thomas',    42.00,  3),
('Educated',                 'Tara Westover',   18.75, 20),
('Deep Work',                'Cal Newport',     22.00,  9);`,sc="#d97706",u5=[{from:"DECIMAL(6,2)",to:"INT",flows:[{b:"24.99",a:"25",lost:!0},{b:"18.75",a:"19",lost:!0},{b:"42.00",a:"42",lost:!1}],note:"Decimals are rounded to the nearest whole number, so the cents are lost for good. Values that were already whole survive unchanged."},{from:"INT",to:"VARCHAR(20)",flows:[{b:"25",a:"'25'",lost:!1},{b:"100",a:"'100'",lost:!1}],note:'The value is kept, but it is now text. Sorting changes too, so "100" can come before "20".'},{from:"VARCHAR(20)",to:"INT",flows:[{b:"'25'",a:"25",lost:!1},{b:"'sale'",a:"0",lost:!0}],note:"Clean number text converts back fine. Anything that is not a number turns into 0."}];function To({text:e,color:t}){return a.jsx("span",{style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",fontSize:12.5,fontWeight:600,padding:"3px 9px",borderRadius:8,whiteSpace:"nowrap",background:t?t+"18":"#eef1f6",color:t||"#334155",border:`1px solid ${t?t+"44":"rgba(0,0,0,0.08)"}`},children:e})}function h5(){return a.jsxs(le,{style:{background:sc+"09",borderColor:sc+"2c"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:sc,marginBottom:6},children:"⚠️ Watch out: changing a type can change the data"}),a.jsx("p",{style:{margin:"0 0 16px",fontSize:14.5,lineHeight:1.55,color:"#444"},children:"Changing a column type is not always free. Sometimes the values inside change too. Here is what happens in three common cases. Green means the value is kept, red means it changes."}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:12},children:u5.map(e=>a.jsxs("div",{style:{background:"#fff",border:"1px solid rgba(0,0,0,0.08)",borderRadius:14,padding:16},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"},children:[a.jsx(To,{text:e.from}),a.jsx("span",{style:{color:X,fontWeight:800},children:"→"}),a.jsx(To,{text:e.to,color:X})]}),a.jsx("div",{style:{display:"grid",gap:6,marginBottom:12},children:e.flows.map((t,i)=>a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx(To,{text:t.b}),a.jsx("span",{style:{color:"#94a3b8"},children:"→"}),a.jsx(To,{text:t.a,color:t.lost?we:Je})]},i))}),a.jsx("p",{style:{margin:0,fontSize:12.5,lineHeight:1.5,color:"#6e6e73"},children:e.note})]},e.from+e.to))}),a.jsxs("p",{style:{margin:"14px 0 0",fontSize:13,lineHeight:1.55,color:"#6e6e73"},children:["The lesson: ",a.jsx("b",{style:{color:"#444"},children:"always back up before a big type change"}),", so we can restore if a value is lost. That is exactly what the backup section is for."]})]})}const x5=[{code:"ALTER TABLE books ADD COLUMN stock_count INT;",cols:["id","title","author","price","stock_count"],hi:"stock_count",note:"With no position given, the new column goes to the very end. This is the default."},{code:"ALTER TABLE books ADD COLUMN pages INT AFTER title;",cols:["id","title","pages","author","price"],hi:"pages",note:"AFTER title drops the new column in right after the title column."},{code:"ALTER TABLE books ADD COLUMN sku INT FIRST;",cols:["sku","id","title","author","price"],hi:"sku",note:"FIRST moves the new column to the very front of the table."}];function g5({cols:e,hi:t}){return a.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},children:e.map((i,n)=>a.jsxs(k.Fragment,{children:[n>0&&a.jsx("span",{style:{color:"#cbd5e1",fontSize:12},children:"·"}),a.jsx("span",{style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",fontSize:12,fontWeight:600,padding:"3px 9px",borderRadius:7,whiteSpace:"nowrap",background:i===t?X:"#eef1f6",color:i===t?"#fff":"#475569"},children:i})]},i))})}function m5(){return a.jsxs(le,{style:{background:X+"06",borderColor:X+"22"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:X,marginBottom:6},children:"📍 Where does the new column go?"}),a.jsxs("p",{style:{margin:"0 0 16px",fontSize:14.5,lineHeight:1.55,color:"#444"},children:["By default a new column lands at the very end of the table. If we want it somewhere else, we add ",a.jsx("code",{children:"AFTER"})," ","a column name, or ",a.jsx("code",{children:"FIRST"})," to put it at the front."]}),a.jsx("div",{style:{display:"grid",gap:16},children:x5.map(e=>a.jsxs("div",{children:[a.jsx(St,{code:e.code}),a.jsx("div",{style:{marginTop:10},children:a.jsx(g5,{cols:e.cols,hi:e.hi})}),a.jsx("p",{style:{margin:"8px 0 0",fontSize:12.5,lineHeight:1.5,color:"#6e6e73"},children:e.note})]},e.code))}),a.jsx("p",{style:{margin:"14px 0 0",fontSize:12.5,lineHeight:1.5,color:"#6e6e73"},children:"Position is just about the order the columns are listed in. It does not change any of the data inside them."})]})}const y5=`CREATE TABLE reviews (
  id      INT PRIMARY KEY,
  book_id INT,
  comment VARCHAR(200),
  FOREIGN KEY (book_id) REFERENCES books(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`,vn=[{id:1,title:"Atomic Habits"},{id:2,title:"Sapiens"}],ai=[{id:101,book_id:1,comment:"Loved it"},{id:102,book_id:2,comment:"Great read"},{id:103,book_id:2,comment:"Life changing"}];function bn({head:e,rows:t,dimIds:i,idKey:n}){return a.jsx("div",{style:{overflowX:"auto",borderRadius:12,border:"1px solid rgba(0,0,0,0.08)"},children:a.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:12.5,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:[a.jsx("thead",{children:a.jsx("tr",{children:e.map(s=>a.jsx("th",{style:{textAlign:"left",padding:"9px 12px",background:"#1e293b",color:"#fff",fontWeight:700,fontSize:11.5,whiteSpace:"nowrap"},children:s},s))})}),a.jsx("tbody",{children:t.map((s,r)=>{const o=i.has(Number(s[n]));return a.jsx("tr",{style:{background:r%2?"#f6f8ff":"#fff",opacity:o?.32:1,transition:"opacity 0.3s ease"},children:e.map(l=>a.jsx("td",{style:{padding:"8px 12px",borderTop:"1px solid rgba(0,0,0,0.06)",color:"#1d1d1f",whiteSpace:"nowrap"},children:s[l]},l))},r)})})]})})}function v5(){const[e,t]=k.useState("cascade"),[i,n]=k.useState(!1),s=i&&e!=="restrict"?vn.filter(d=>d.id!==2):vn,r=i?e==="cascade"?ai.filter(d=>d.book_id!==2):e==="setnull"?ai.map(d=>d.book_id===2?{...d,book_id:"NULL"}:d):ai:ai;let o=null;i&&(e==="cascade"?o={ok:!0,text:"Book #2 is deleted, and its two reviews were deleted right along with it, automatically. The delete cascaded down from the book to its reviews."}:e==="setnull"?o={ok:!0,text:'Book #2 is deleted, but its two reviews are kept. Their book_id is reset to NULL — "this review no longer points at any book."'}:o={ok:!1,text:"MySQL blocks this. Two reviews still point to book #2, so with no rule it refuses to delete the book and leave those reviews pointing at nothing."});const l=d=>{t(d),n(!1)};return a.jsxs(le,{children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:16},children:[a.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#1d1d1f"},children:"🗑️ Scenario 1 — what happens when you delete a book?"}),a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[a.jsx("button",{onClick:()=>l("cascade"),style:{...fe(e==="cascade",js),fontSize:13},children:"ON DELETE CASCADE"}),a.jsx("button",{onClick:()=>l("setnull"),style:{...fe(e==="setnull",Xe),fontSize:13},children:"ON DELETE SET NULL"}),a.jsx("button",{onClick:()=>l("restrict"),style:{...fe(e==="restrict",we),fontSize:13},children:"No rule"})]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:14,marginBottom:16},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"books"}),a.jsx(bn,{head:["id","title"],rows:s,dimIds:new Set,idKey:"id"})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"reviews (book_id points to books.id)"}),a.jsx(bn,{head:["id","book_id","comment"],rows:r,dimIds:new Set,idKey:"id"})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:o?16:0},children:[a.jsx("button",{onClick:()=>n(!0),disabled:i,style:{...fe(!0,we),fontSize:13,opacity:i?.5:1,cursor:i?"default":"pointer"},children:"🗑️ DELETE FROM books WHERE id = 2;"}),a.jsx("button",{onClick:()=>n(!1),style:{...fe(!1),fontSize:13},children:"↻ Reset"})]}),o&&a.jsxs("div",{style:{padding:"14px 16px",borderRadius:14,animation:"dbcFade 0.3s ease",display:"flex",gap:12,alignItems:"flex-start",background:(o.ok?Je:we)+"0e",border:`1.5px solid ${o.ok?Je:we}33`},children:[a.jsx("span",{style:{fontSize:20,flexShrink:0,lineHeight:1.2},children:o.ok?"✅":"🚫"}),a.jsx("div",{style:{fontSize:14,lineHeight:1.55,color:"#444"},children:o.text})]})]})}function b5(){const[e,t]=k.useState(!0),[i,n]=k.useState(!1),s=i&&e,r=s?vn.map(c=>c.id===2?{...c,id:9}:c):vn,o=s?ai.map(c=>c.book_id===2?{...c,book_id:9}:c):ai;let l=null;i&&(l=e?{ok:!0,text:"Book #2 becomes book #9, and both of its reviews were updated automatically to book_id 9. The rename cascaded down from the book to its reviews."}:{ok:!1,text:"MySQL blocks this. Two reviews still point to book_id 2, so with no rule it refuses to renumber the book and leave those reviews pointing at a book_id that no longer exists."});const d=c=>{t(c),n(!1)};return a.jsxs(le,{children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:16},children:[a.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#1d1d1f"},children:"✏️ Scenario 2 — what happens when a book's id changes?"}),a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[a.jsx("button",{onClick:()=>d(!0),style:{...fe(e,ct),fontSize:13},children:"ON UPDATE CASCADE"}),a.jsx("button",{onClick:()=>d(!1),style:{...fe(!e,we),fontSize:13},children:"No rule"})]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:14,marginBottom:16},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"books"}),a.jsx(bn,{head:["id","title"],rows:r,dimIds:new Set,idKey:"id"})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"reviews (book_id points to books.id)"}),a.jsx(bn,{head:["id","book_id","comment"],rows:o,dimIds:new Set,idKey:"id"})]})]}),a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:l?16:0},children:[a.jsx("button",{onClick:()=>n(!0),disabled:i,style:{...fe(!0,ct),fontSize:13,opacity:i?.5:1,cursor:i?"default":"pointer"},children:"✏️ UPDATE books SET id = 9 WHERE id = 2;"}),a.jsx("button",{onClick:()=>n(!1),style:{...fe(!1),fontSize:13},children:"↻ Reset"})]}),l&&a.jsxs("div",{style:{padding:"14px 16px",borderRadius:14,animation:"dbcFade 0.3s ease",display:"flex",gap:12,alignItems:"flex-start",background:(l.ok?Je:we)+"0e",border:`1.5px solid ${l.ok?Je:we}33`},children:[a.jsx("span",{style:{fontSize:20,flexShrink:0,lineHeight:1.2},children:l.ok?"✅":"🚫"}),a.jsx("div",{style:{fontSize:14,lineHeight:1.55,color:"#444"},children:l.text})]})]})}const Lx={id:0,title:"(Unknown book)"},w5=[Lx,vn[0]],k5=ai.map(e=>e.book_id===2?{...e,book_id:0}:e);function S5(){const[e,t]=k.useState(!1),i=e?w5:[Lx,...vn],n=e?k5:ai;return a.jsxs(le,{children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:10},children:[a.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#1d1d1f"},children:"🧩 Scenario 3 — populating a default value instead"}),a.jsx("span",{style:{fontSize:11.5,fontWeight:700,padding:"4px 10px",borderRadius:999,background:Xe+"15",color:Xe,whiteSpace:"nowrap"},children:"Concept only — not in MySQL"})]}),a.jsxs("p",{style:{margin:"0 0 14px",fontSize:14,lineHeight:1.6,color:"#444"},children:["Some databases (PostgreSQL, SQL Server) offer a third reaction: ",a.jsx("code",{children:"ON DELETE SET DEFAULT"}),". Instead of deleting the reviews (CASCADE) or blanking them out (SET NULL), the ",a.jsx("code",{children:"book_id"})," resets to a default value chosen up front — here, a placeholder book with ",a.jsx("code",{children:"id = 0"}),` called "(Unknown book)" that already sits in the table. Delete book #2, and its reviews quietly re-point at that placeholder instead of disappearing or breaking. MySQL's InnoDB does not support this: if you write `,a.jsx("code",{children:"ON DELETE SET DEFAULT"}),", MySQL refuses to create the table at all. ",a.jsx("b",{children:"SET NULL is the closest MySQL gets to this idea."})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:14,marginBottom:16},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"books"}),a.jsx(bn,{head:["id","title"],rows:i,dimIds:new Set,idKey:"id"})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:11.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6e6e73",marginBottom:6},children:"reviews"}),a.jsx(bn,{head:["id","book_id","comment"],rows:n,dimIds:new Set,idKey:"id"})]})]}),a.jsx("button",{onClick:()=>t(s=>!s),style:{...fe(e,Xe),fontSize:13},children:e?"↻ Reset":"🗑️ Delete book #2 (Sapiens)"})]})}const E5=[{icon:"🗑️",color:we,t:"ON DELETE CASCADE",d:"Delete a book, and all of its reviews are deleted with it, automatically. The delete cascades down to the linked rows."},{icon:"🈳",color:js,t:"ON DELETE SET NULL",d:'Delete a book, and its reviews are kept — but their book_id resets to NULL, meaning "we no longer know which book this was."'},{icon:"🧩",color:Xe,t:"ON DELETE / UPDATE SET DEFAULT",d:"Reset the foreign key to a default value chosen up front, like a placeholder book_id. Not supported by MySQL."},{icon:"✏️",color:ct,t:"ON UPDATE CASCADE",d:"Change a book's id, and every review that points to it updates to match, so no review is left pointing at the wrong book."},{icon:"🛑",color:"#64748b",t:"No rule (RESTRICT)",d:"MySQL refuses to delete or renumber a book while reviews still point to it, to avoid leaving broken links."}];function C5(){return a.jsxs("div",{style:{display:"grid",gap:18},children:[a.jsx(le,{children:a.jsxs("p",{style:{margin:0,fontSize:15,lineHeight:1.6,color:"#444"},children:["A backup is just a saved copy of our whole database. Every table and every row is written out into a single file of plain SQL commands, such as CREATE TABLE and INSERT INTO. If our database is ever deleted or damaged, or we make a change we cannot undo, we open that file and ",a.jsx("b",{children:"restore"})," everything exactly as it was."]})}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16},children:[a.jsxs(le,{style:{background:Xe+"08",borderColor:Xe+"26"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:Xe,marginBottom:10},children:"💾 Backing up in MySQL Workbench"}),a.jsxs("ol",{style:{margin:0,paddingLeft:20,display:"grid",gap:8,fontSize:14.5,lineHeight:1.5,color:"#333"},children:[a.jsxs("li",{children:["Open the Server menu → ",a.jsx("b",{children:"Data Export"})]}),a.jsxs("li",{children:["Tick the ",a.jsx("code",{children:"bookshop"})," schema"]}),a.jsxs("li",{children:["Choose ",a.jsx("b",{children:"Export to Self-Contained File"})," and pick where to save it"]}),a.jsxs("li",{children:["Click ",a.jsx("b",{children:"Start Export"})]})]}),a.jsxs("p",{style:{margin:"14px 0 0",fontSize:13,color:"#92400e"},children:["This gives us one ",a.jsx("code",{children:".sql"})," file, a complete snapshot of the database that we can keep safe."]})]}),a.jsxs(le,{style:{background:Je+"08",borderColor:Je+"26"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:Je,marginBottom:10},children:"♻️ Restoring in MySQL Workbench"}),a.jsxs("ol",{style:{margin:0,paddingLeft:20,display:"grid",gap:8,fontSize:14.5,lineHeight:1.5,color:"#333"},children:[a.jsxs("li",{children:["Open the Server menu → ",a.jsx("b",{children:"Data Import"})]}),a.jsxs("li",{children:["Choose ",a.jsx("b",{children:"Import from Self-Contained File"})," and select the ",a.jsx("code",{children:".sql"})," file we saved"]}),a.jsxs("li",{children:["Under Default Target Schema, choose or create ",a.jsx("code",{children:"bookshop"})]}),a.jsxs("li",{children:["Click ",a.jsx("b",{children:"Start Import"})]})]}),a.jsx("p",{style:{margin:"14px 0 0",fontSize:13,color:"#065f46"},children:"MySQL runs every command in the file again and rebuilds the database from scratch."})]})]}),a.jsxs(le,{children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#6e6e73",marginBottom:10},children:"The same thing on the command line"}),a.jsx("p",{style:{margin:"0 0 14px",fontSize:14,lineHeight:1.55,color:"#6e6e73"},children:"Those buttons in Workbench are really running these two commands for us. It is handy to recognise them if you ever see them written down."}),a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(St,{label:"Back up",code:"mysqldump -u root -p bookshop > bookshop_backup.sql"}),a.jsx(St,{label:"Restore",code:"mysql -u root -p bookshop < bookshop_backup.sql"})]})]}),a.jsxs(le,{style:{background:Xe+"0c",borderColor:Xe+"30"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:Xe,marginBottom:8},children:"✏️ Your turn: lose it, then bring it back"}),a.jsxs("ol",{style:{margin:0,paddingLeft:20,display:"grid",gap:6,fontSize:14.5,lineHeight:1.55,color:"#333"},children:[a.jsx("li",{children:"Export bookshop to a self-contained file."}),a.jsx("li",{children:"Right-click the bookshop schema and choose Drop Schema to delete it. This is safe, because we have a backup."}),a.jsx("li",{children:"Use Data Import to bring it back from the file we saved."}),a.jsxs("li",{children:["Run ",a.jsx("code",{children:"SELECT * FROM books;"})," to check that all of our books returned."]})]})]})]})}const Ix=[{key:"price",label:"price"},{key:"title",label:"title"},{key:"stock",label:"stock_count"}];function T5(){const[e,t]=k.useState("price"),[i,n]=k.useState("ASC"),s=[...Eo].sort((o,l)=>{let d;return e==="title"||e==="author"?d=String(o[e]).localeCompare(String(l[e])):d=Number(o[e])-Number(l[e]),i==="ASC"?d:-d}),r=Ix.find(o=>o.key===e).label;return a.jsxs(le,{children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ct,marginBottom:12},children:"🔀 Sort it live"}),a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:18,marginBottom:16},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#6e6e73",marginBottom:6},children:"Order by"}),a.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:Ix.map(o=>a.jsx("button",{onClick:()=>t(o.key),style:fe(e===o.key,ct),children:o.label},o.key))})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#6e6e73",marginBottom:6},children:"Direction"}),a.jsxs("div",{style:{display:"flex",gap:6},children:[a.jsx("button",{onClick:()=>n("ASC"),style:fe(i==="ASC",ct),children:"ASC ↑ low to high"}),a.jsx("button",{onClick:()=>n("DESC"),style:fe(i==="DESC",ct),children:"DESC ↓ high to low"})]})]})]}),a.jsx("div",{style:{marginBottom:16},children:a.jsx(St,{label:"The query we are running",code:`SELECT * FROM books ORDER BY ${r} ${i};`})}),a.jsx(nc,{rows:s,sortKey:e,fadeKey:`${e}-${i}`}),a.jsx("p",{style:{margin:"12px 0 0",fontSize:13,color:"#6e6e73"},children:"Notice that only the order of the rows changes. The books themselves stay exactly the same."})]})}const Ox=[{label:"All books",query:"SELECT COUNT(*) FROM books;",test:()=>!0},{label:"Priced over $20",query:"SELECT COUNT(*) FROM books WHERE price > 20;",test:e=>e.price>20},{label:"Low stock (< 10)",query:"SELECT COUNT(*) FROM books WHERE stock_count < 10;",test:e=>e.stock<10}];function A5(){const[e,t]=k.useState(0),i=Ox[e],n=Eo.filter(i.test),s=new Set(n.map(r=>r.id));return a.jsxs(le,{children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:kt,marginBottom:12},children:"🔢 Count it live"}),a.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16},children:Ox.map((r,o)=>a.jsx("button",{onClick:()=>t(o),style:fe(e===o,kt),children:r.label},r.label))}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,alignItems:"center",marginBottom:16},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:96,padding:"14px 20px",borderRadius:18,background:kt+"12",border:`1.5px solid ${kt}33`,animation:"dbcPop 0.35s ease"},children:[a.jsx("div",{style:{fontSize:40,fontWeight:800,color:kt,lineHeight:1},children:n.length}),a.jsx("div",{style:{fontSize:11,fontWeight:600,color:kt,marginTop:4,textTransform:"uppercase",letterSpacing:"0.05em"},children:"rows"})]},e),a.jsx("div",{style:{minWidth:0},children:a.jsx(St,{label:"The query we are running",code:i.query})})]}),a.jsx(nc,{rows:Eo,matchIds:s,fadeKey:e}),a.jsx("p",{style:{margin:"12px 0 0",fontSize:13,color:"#6e6e73"},children:"The rows that match stay bright, and COUNT simply adds them up. Faded rows are left out of the total."})]})}function z5({safe:e,username:t,password:i,trick:n}){const s={color:"#7dd3fc"},r=i?"•".repeat(Math.min(i.length,8)):"…";return a.jsx("pre",{style:{margin:0,padding:"16px 18px",borderRadius:12,background:"#0f172a",color:"#e2e8f0",fontSize:13.5,lineHeight:1.7,overflowX:"auto",fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",whiteSpace:"pre"},children:e?a.jsxs("code",{children:[a.jsx("span",{style:s,children:"SELECT"})," * ",a.jsx("span",{style:s,children:"FROM"})," users",`
`,a.jsx("span",{style:s,children:"WHERE"})," username = ",a.jsx("span",{style:{color:"#fca5a5"},children:"?"}),`
`,"  ",a.jsx("span",{style:s,children:"AND"})," password = ",a.jsx("span",{style:{color:"#fca5a5"},children:"?"}),";",`
`,a.jsx("span",{style:{color:"#64748b"},children:"-- our text is sent separately, as data, never as command"})]}):a.jsxs("code",{children:[a.jsx("span",{style:s,children:"SELECT"})," * ",a.jsx("span",{style:s,children:"FROM"})," users",`
`,a.jsx("span",{style:s,children:"WHERE"})," username = '",a.jsx("span",{style:{color:n?"#fca5a5":"#86efac",background:n?"rgba(248,113,113,0.18)":void 0,borderRadius:3,padding:n?"1px 3px":void 0,fontWeight:n?700:400},children:t||"…"}),"'",`
`,"  ",a.jsx("span",{style:s,children:"AND"})," password = '",a.jsx("span",{style:{color:"#86efac"},children:r}),"';"]})})}function R5(){const[e,t]=k.useState(!1),[i,n]=k.useState(""),[s,r]=k.useState(""),o=/('|--|\bOR\b)/i.test(i)||/('|--|\bOR\b)/i.test(s);let l=null;return(i||s)&&(!e&&o?l={ok:!0,head:"Logged in, with no real password check",body:"We closed the quote early and added OR '1'='1', which is always true. The naive query treated our text as part of the command, so it let us in without a real password. That is SQL injection in action."}:e&&o?l={ok:!1,head:"Login rejected",body:"The safe version never pastes our text into the command. It sends it separately as a plain value, so MySQL just looks for a user with that very strange name, finds nobody, and the trick does nothing."}:l={ok:!1,head:"A normal login attempt",body:"This is an ordinary username and password. Both versions handle it the same way. Try the trick button to see where they differ."}),a.jsxs(le,{children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:18},children:[a.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#1d1d1f"},children:"🔐 A pretend login form"}),a.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[a.jsx("button",{onClick:()=>t(!1),style:{...fe(!e,we),fontSize:13.5},children:"⚠️ Naive version"}),a.jsx("button",{onClick:()=>t(!0),style:{...fe(e,Je),fontSize:13.5},children:"🛡️ Safe version"})]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,marginBottom:12},children:[a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:13,fontWeight:600,color:"#6e6e73"},children:"Username"}),a.jsx("input",{value:i,onChange:d=>n(d.target.value),placeholder:"type a name…",style:{width:"100%",font:"inherit",fontSize:15,padding:"10px 12px",borderRadius:10,border:"1.5px solid rgba(0,0,0,0.15)",margin:"4px 0 0",boxSizing:"border-box"}})]}),a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:13,fontWeight:600,color:"#6e6e73"},children:"Password"}),a.jsx("input",{value:s,onChange:d=>r(d.target.value),placeholder:"type a password…",style:{width:"100%",font:"inherit",fontSize:15,padding:"10px 12px",borderRadius:10,border:"1.5px solid rgba(0,0,0,0.15)",margin:"4px 0 0",boxSizing:"border-box"}})]})]}),a.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18},children:[a.jsx("button",{onClick:()=>{n("sarah"),r("correcthorse")},style:ic,children:"😇 Try a normal login"}),a.jsx("button",{onClick:()=>{n("' OR '1'='1"),r("anything")},style:ic,children:"😈 Try the injection trick"}),a.jsx("button",{onClick:()=>{n(""),r("")},style:ic,children:"↻ Clear"})]}),a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#6e6e73",marginBottom:8},children:"What the database actually receives"}),a.jsx(z5,{safe:e,username:i,password:s,trick:o}),l&&a.jsxs("div",{style:{marginTop:16,padding:"14px 16px",borderRadius:14,animation:"dbcFade 0.3s ease",display:"flex",gap:12,alignItems:"flex-start",background:(l.ok?we:Je)+"0e",border:`1.5px solid ${l.ok?we:Je}33`},children:[a.jsx("span",{style:{fontSize:22,flexShrink:0,lineHeight:1.2},children:l.ok?"🔓":"🔒"}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:16,fontWeight:700,color:l.ok?we:Je},children:l.head}),a.jsx("div",{style:{fontSize:14,lineHeight:1.55,color:"#444",marginTop:4},children:l.body})]})]}),a.jsx("p",{style:{margin:"14px 0 0",fontSize:12,color:"#aeaeb2",fontStyle:"italic"},children:"Everything here runs in your browser only. There is no real database and no real login, and nothing is sent anywhere."})]})}const D5=[{icon:"🧱",t:"Never paste text into a command",d:"We send whatever the user typed as a separate value, never as part of the command itself. That is exactly what the safe version above does."},{icon:"🎯",t:"Check the input first",d:"A username box has no reason to accept quote marks or the word OR, so we can reject them before they cause trouble."},{icon:"🔒",t:"Give each account the least it needs",d:"A login page never needs to delete tables, so we do not give it that power, even if something slips through."}],j5=[{label:"Create a database",sql:"CREATE DATABASE bookshop;"},{label:"Create a table",sql:"CREATE TABLE books (id INT, title VARCHAR(100), author VARCHAR(100), price INT);"},{label:"Add a column",sql:"ALTER TABLE books ADD COLUMN stock_count INT;"},{label:"Add a column in a position",sql:"ALTER TABLE books ADD COLUMN pages INT AFTER title;"},{label:"Change a column type",sql:"ALTER TABLE books MODIFY COLUMN price DECIMAL(6,2);"},{label:"Link tables, cascade on delete",sql:"FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE"},{label:"Add a primary key",sql:"ALTER TABLE books ADD PRIMARY KEY (id);"},{label:"Make a column auto-increment",sql:"ALTER TABLE books MODIFY COLUMN id INT AUTO_INCREMENT;"},{label:"Sort results",sql:"SELECT * FROM books ORDER BY price ASC;"},{label:"Count rows",sql:"SELECT COUNT(*) FROM books;"},{label:"Back up",sql:"mysqldump -u root -p bookshop > bookshop_backup.sql"},{label:"Restore",sql:"mysql -u root -p bookshop < bookshop_backup.sql"}];function M5(){return a.jsx(le,{style:{padding:0,overflow:"hidden"},children:j5.map((e,t)=>a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"6px 16px",padding:"14px 20px",borderTop:t===0?"none":"1px solid rgba(0,0,0,0.06)"},children:[a.jsx("div",{style:{fontSize:13.5,fontWeight:600,color:"#1d1d1f",width:220,flexShrink:0},children:e.label}),a.jsx("code",{style:{fontSize:13,color:X,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:e.sql})]},e.label))})}function N5(){return a.jsxs("div",{children:[a.jsx("style",{children:`
        @keyframes dbcFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes dbcPop  { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
      `}),a.jsx(oi,{style:{marginBottom:72},children:a.jsxs(J,{children:[a.jsx("p",{style:{fontSize:19,lineHeight:1.7,color:"#1d1d1f",maxWidth:720,fontWeight:450},children:"In this lesson we look at what we can do with a database once it exists. We shape a table, keep it safe with backups, and ask it questions by sorting and counting. We finish with one important safety idea called SQL injection."}),a.jsxs(Ms,{color:X,children:["For the activities below, we use one database called ",a.jsx("code",{children:"bookshop"})," and one main table called"," ",a.jsx("code",{children:"books"}),". We build it up together, one step at a time, so we are always working with something familiar. Later we add one small partner table so we can see how two tables link. Everything runs in ",a.jsx("b",{children:"MySQL Workbench"}),"."]}),a.jsx("p",{style:{fontSize:16,lineHeight:1.7,color:"#6e6e73",maxWidth:720},children:"Each idea comes with a short explanation, the SQL we run, and a small activity to try before moving on. Take your time, and feel free to run every example yourself."})]})}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 1 · Shaping a table",color:X,title:"From an empty database to a real table",blurb:"Six small steps, each one building on the last. The same table follows us through the rest of the lesson."}),a.jsx("div",{style:{display:"grid",gap:16},children:f5.map(e=>a.jsxs(k.Fragment,{children:[a.jsx(J,{children:a.jsx(c5,{num:Number(e.title[0]),color:e.color,title:e.title,explain:e.explain,code:e.code,activityTask:e.activityTask,activityAnswer:e.activityAnswer})}),e.title.startsWith("3")&&a.jsx(J,{children:a.jsx(m5,{})}),e.title.startsWith("4")&&a.jsx(J,{children:a.jsx(h5,{})})]},e.title))}),a.jsx(J,{style:{marginTop:16},children:a.jsxs(le,{style:{background:X+"06",borderColor:X+"22"},children:[a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:X,marginBottom:10},children:"➕ Let us add some books"}),a.jsx("p",{style:{margin:"0 0 14px",fontSize:14.5,lineHeight:1.55,color:"#444"},children:"Before we sort and count, our table needs a few real rows to work with. We run this INSERT once, and then we have five books to play with for the rest of the lesson."}),a.jsx("div",{style:{marginBottom:16},children:a.jsx(St,{code:p5})}),a.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#6e6e73",marginBottom:8},children:"This is what books now holds"}),a.jsx(nc,{rows:Eo})]})})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 2 · Linking tables",color:js,title:"Foreign keys, and what CASCADE does",blurb:"Real databases have many tables, and they point at each other. A foreign key is a column that points to a row in another table. CASCADE (and its relatives) decide what happens to that link when the row it points to is deleted or changed."}),a.jsxs(Ms,{color:js,children:["We add one small partner table called ",a.jsx("code",{children:"reviews"}),", where each review points to a book. Every demo below reuses these exact same two tables — only the rule changes, so it is easier to see what each one does."]}),a.jsxs("div",{style:{display:"grid",gap:16},children:[a.jsx(J,{children:a.jsxs(le,{children:[a.jsxs("p",{style:{margin:"0 0 14px",fontSize:15,lineHeight:1.6,color:"#444"},children:["Here each review has a ",a.jsx("code",{children:"book_id"})," that points to a book in ",a.jsx("code",{children:"books"}),' — in plain English, "this review belongs to that book." The one tricky question is: what should happen to a review if the book it belongs to gets deleted, or gets a new id? We answer that question with a rule, set right when we create the table.']}),a.jsx(St,{code:y5})]})}),a.jsx(J,{children:a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:10},children:E5.map(e=>a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",background:"#fafafa",border:"1px solid rgba(0,0,0,0.07)",borderRadius:14,padding:"14px 16px"},children:[a.jsx("span",{style:{fontSize:22,flexShrink:0},children:e.icon}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:13.5,fontWeight:700,color:e.color,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:e.t}),a.jsx("div",{style:{fontSize:13,lineHeight:1.5,color:"#6e6e73",marginTop:3},children:e.d})]})]},e.t))})}),a.jsx(Ms,{color:js,children:"Three small scenarios below, each with the same click-and-see setup: pick a rule, then try the action, and watch the two tables react."}),a.jsx(J,{children:a.jsx(v5,{})}),a.jsx(J,{children:a.jsx(b5,{})}),a.jsx(J,{children:a.jsx(S5,{})})]})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 3 · Backup & restore",color:Xe,title:"Never lose a database again",blurb:"A backup is a safety net. We learn to make one, and prove it works by restoring from it."}),a.jsx(C5,{})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 4 · Sorting results",color:ct,title:"ORDER BY: putting rows in the order we want",blurb:"We keep the same books table and the same data. ORDER BY only changes the order the rows come back in. We add ASC to go low to high, or DESC to go high to low, after the column name."}),a.jsxs(Ms,{color:ct,children:["We keep using the same ",a.jsx("code",{children:"books"})," table we created and filled earlier. Nothing new to set up."]}),a.jsxs("div",{style:{display:"grid",gap:16},children:[a.jsx(J,{children:a.jsx(T5,{})}),a.jsx(J,{children:a.jsx(Co,{n:1,color:ct,task:"Write a query that lists every book from cheapest to most expensive.",answer:"SELECT * FROM books ORDER BY price ASC;"})}),a.jsx(J,{children:a.jsx(Co,{n:2,color:ct,task:"Write a query that lists every book title in reverse alphabetical order, from Z to A.",answer:"SELECT * FROM books ORDER BY title DESC;"})})]})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 5 · Counting rows",color:kt,title:"COUNT: answering how many",blurb:"COUNT tells us how many rows match, and nothing more. On its own, COUNT(*) counts every row. Add a WHERE and it counts only the rows we care about."}),a.jsxs(Ms,{color:kt,children:["Same ",a.jsx("code",{children:"books"})," table again. Pick a filter below and watch the total change."]}),a.jsxs("div",{style:{display:"grid",gap:16},children:[a.jsx(J,{children:a.jsx(A5,{})}),a.jsx(J,{children:a.jsx(Co,{n:1,color:kt,task:"Write a query that counts how many books cost more than $20.",answer:"SELECT COUNT(*) FROM books WHERE price > 20;"})}),a.jsx(J,{children:a.jsx(Co,{n:2,color:kt,task:"Stretch goal: count how many books we have for each author. (Hint: GROUP BY gathers matching rows together first, and then COUNT runs on each group.)",answer:`SELECT author, COUNT(*) AS how_many
FROM books
GROUP BY author;`})})]})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Part 6 · A safety topic",color:we,title:"SQL injection, in plain English",blurb:"We do not need to write any code to understand this. We just need to see it happen once."}),a.jsx(J,{children:a.jsx(le,{style:{background:we+"08",borderColor:we+"28",marginBottom:16},children:a.jsxs("p",{style:{margin:0,fontSize:15,lineHeight:1.65,color:"#444"},children:["Many websites build a database command by pasting whatever we type straight into a sentence. A login form might build something like ",a.jsx("i",{children:"find the user named (whatever was typed)"}),". Most of the time that is fine. But if the site never checks what we typed, we could type something that is not a name at all. It could be a piece of a database command, and the database cannot tell the difference, so it simply runs it. That is",a.jsx("b",{children:" SQL injection"}),": slipping a command into a box that was only meant to hold a word."]})})}),a.jsx(J,{children:a.jsx(R5,{})}),a.jsxs(J,{style:{marginTop:16},children:[a.jsx("h3",{style:{fontSize:19,fontWeight:700,color:"#1d1d1f",margin:"8px 0 10px"},children:"How real systems stay safe"}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:10},children:D5.map(e=>a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",background:"#fafafa",border:"1px solid rgba(0,0,0,0.07)",borderRadius:14,padding:"14px 16px"},children:[a.jsx("span",{style:{fontSize:22,flexShrink:0},children:e.icon}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:14.5,fontWeight:700,color:"#1d1d1f"},children:e.t}),a.jsx("div",{style:{fontSize:13,lineHeight:1.5,color:"#6e6e73",marginTop:2},children:e.d})]})]},e.t))})]})]}),a.jsxs(oi,{children:[a.jsx(Ri,{kicker:"Quick reference",color:"#1d1d1f",title:"Every query from this lesson, in one place",blurb:"Bookmark this. We will want it again during the practical lab."}),a.jsx(J,{children:a.jsx(M5,{})})]}),a.jsx(J,{children:a.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",borderTop:"1px solid rgba(0,0,0,0.07)"},children:[a.jsx("div",{style:{fontSize:30},children:"🗄️"}),a.jsx("p",{style:{fontSize:18,lineHeight:1.6,color:"#1d1d1f",maxWidth:620,margin:"14px auto 0",fontWeight:500},children:"One database, one table, and a handful of small commands. We can now shape it, protect it, sort it and count it. The habit that matters most is the last one: we never trust text typed into a box, and we never paste it straight into a command."}),a.jsx("p",{style:{fontSize:13,color:"#aeaeb2",marginTop:20},children:"Database Management Systems · Master of Business Informatics"})]})})]})}function P5(){return a.jsx(wt,{eyebrow:"Database Management",titleLead:"Let's make sense of",titleAccent:"Advanced Database Concepts",gradient:"linear-gradient(90deg, #2563eb, #0d9488, #7c3aed)",accent:"#2563eb",orb2:"#0d9488",orb3:"#dc2626",subtitle:"One database, one table, built up step by step. We create it, shape it, back it up, sort it and count it, then take a plain-English, hands-on look at SQL injection.",pills:[{emoji:"🗄️",name:"Table design",color:"#2563eb"},{emoji:"🔗",name:"Foreign keys & CASCADE",color:"#0891b2"},{emoji:"💾",name:"Backup & restore",color:"#b45309"},{emoji:"🛡️",name:"SQL injection",color:"#dc2626"}],children:a.jsx(N5,{})})}/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var L5={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I5=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),ie=(e,t)=>{const i=k.forwardRef(({color:n="currentColor",size:s=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:l="",children:d,...c},f)=>k.createElement("svg",{ref:f,...L5,width:s,height:s,stroke:n,strokeWidth:o?Number(r)*24/Number(s):r,className:["lucide",`lucide-${I5(e)}`,l].join(" "),...c},[...t.map(([p,u])=>k.createElement(p,u)),...Array.isArray(d)?d:[d]]));return i.displayName=`${e}`,i};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O5=ie("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B5=ie("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F5=ie("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wn=ie("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=ie("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W5=ie("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=ie("ExternalLink",[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}],["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["line",{x1:"10",x2:"21",y1:"14",y2:"3",key:"18c3s4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U5=ie("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V5=ie("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _5=ie("LayoutTemplate",[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y5=ie("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=ie("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const En=ie("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=ie("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tn=ie("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H5=ie("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q5=ie("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=ie("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $5=ie("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K5=ie("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),Q5=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

* {box-sizing:border-box;margin:0;padding:0}
.erd section {background:#FAF9F6;color:#1a2744;overflow:hidden;position:relative}
.erd .inner {position:absolute;inset:0;display:flex;flex-direction:column;padding:78px 108px 68px}
.erd .inner.center {align-items:center;justify-content:center;text-align:center}
.erd .kicker {font-size:24px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0d7a72;margin-bottom:14px}
.erd .stitle {font-size:58px;font-weight:700;line-height:1.1}
.erd .body {font-size:31px;line-height:1.6}
.erd .small {font-size:25px;line-height:1.55}
.erd .cap {font-size:19px;color:#9ca3af;font-style:italic;text-align:center;margin-top:8px}
.erd .dark {background:#1a2744!important;color:#FAF9F6!important}
.erd .navy2 {background:#1e3a6e!important;color:#FAF9F6!important}
.erd .dark .kicker, .erd .navy2 .kicker {color:#5eead4}
.erd .bar {width:60px;height:6px;border-radius:3px;background:#0d7a72;margin-bottom:32px}
.erd .bar-amber {background:#c47c1a}
.erd .two {display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start}
.erd .three {display:grid;grid-template-columns:1fr 1fr 1fr;gap:36px;align-items:start}
.erd .card {background:white;border-radius:14px;padding:32px 38px;box-shadow:0 2px 16px rgba(0,0,0,.07)}
.erd .card-t {background:#e6f4f3;border-left:5px solid #0d7a72;border-radius:10px;padding:28px 34px}
.erd .card-a {background:#fdf4e3;border-left:5px solid #c47c1a;border-radius:10px;padding:28px 34px}
.erd ul.clean {list-style:none}
.erd ul.clean li {display:flex;align-items:flex-start;gap:14px;font-size:29px;line-height:1.5;margin-bottom:20px}
.erd ul.clean li::before {content:'';display:block;width:9px;height:9px;border-radius:50%;background:#0d7a72;flex-shrink:0;margin-top:11px}
.erd .cr {position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:24px;color:#9ca3af;z-index:2}
.erd .dark .cr, .erd .navy2 .cr {color:rgba(255,255,255,.28)}
.erd .sec-num {font-size:200px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;position:absolute;right:80px;bottom:50px;z-index:0;pointer-events:none}
.erd svg text {font-family:'DM Sans',sans-serif}
.erd .shape-row {display:flex;align-items:center;gap:24px;margin-bottom:18px}
.erd .shape-label {font-size:26px;font-weight:700;min-width:200px}
.erd .shape-desc {font-size:22px;color:#374151;line-height:1.4}
.erd .pill {display:inline-block;padding:4px 16px;border-radius:100px;font-size:20px;font-weight:600}
.erd .step {display:flex;gap:20px;align-items:flex-start;margin-bottom:24px}
.erd .snum {width:48px;height:48px;border-radius:50%;background:#1a2744;color:white;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.erd .sbody {font-size:27px;line-height:1.5;padding-top:8px}`,Ns=[{classes:"dark",label:"01 Title",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.04" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>
<div style="position:absolute;bottom:60px;right:60px;font-size:260px;font-weight:700;color:rgba(255,255,255,.04);line-height:1;user-select:none">ER</div>
<div class="inner center">
  <div class="kicker" style="margin-bottom:28px">Database Management Systems</div>
  <h1 style="font-size:84px;font-weight:700;line-height:1.05;color:white;margin-bottom:28px">Entity-Relationship<br><span style="color:#5eead4">Diagrams</span></h1>
  <div style="width:80px;height:6px;border-radius:3px;background:#c47c1a;margin:0 auto 32px"></div>
  <p style="font-size:30px;color:rgba(255,255,255,.55);max-width:640px;line-height:1.6">A visual language for designing databases — from idea to blueprint</p>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"02 Agenda",html:`<div class="inner">
  <div class="kicker">Lesson Plan</div>
  <div class="stitle" style="margin-bottom:44px">What We'll Cover</div>
  <div style="display:flex;flex-direction:column;gap:18px;max-width:880px">
    <div style="display:flex;align-items:center;gap:24px"><div style="width:52px;height:52px;background:#1a2744;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:white;flex-shrink:0">1</div><div class="body">What is an ER diagram &amp; why do we use it?</div></div>
    <div style="display:flex;align-items:center;gap:24px"><div style="width:52px;height:52px;background:#1a2744;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:white;flex-shrink:0">2</div><div class="body">Two notations — Chen's vs. Crow's Foot</div></div>
    <div style="display:flex;align-items:center;gap:24px"><div style="width:52px;height:52px;background:#0d7a72;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:white;flex-shrink:0">3</div><div class="body">Chen's shapes — entity, attribute, key attribute, relationship</div></div>
    <div style="display:flex;align-items:center;gap:24px"><div style="width:52px;height:52px;background:#0d7a72;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:white;flex-shrink:0">4</div><div class="body">Cardinality — 1:1, 1:N, M:N</div></div>
    <div style="display:flex;align-items:center;gap:24px"><div style="width:52px;height:52px;background:#c47c1a;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:white;flex-shrink:0">5</div><div class="body">Drawing a complete ER diagram — step by step</div></div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"03 Sec What Why",html:`<div class="inner" style="justify-content:center">
  <div style="font-size:130px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;margin-bottom:-10px">01</div>
  <div class="bar bar-amber" style="margin-bottom:24px"></div>
  <div class="stitle" style="color:white">What &amp; Why ER Diagrams?</div>
  <p style="font-size:28px;color:rgba(255,255,255,.5);margin-top:18px;max-width:640px;line-height:1.6">Before we draw shapes — let's understand the purpose</p>
</div>
<div class="sec-num">01</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"04 What Is ER",html:`<div class="inner">
  <div class="kicker">Section 01</div>
  <div class="stitle" style="margin-bottom:40px">What Is an ER Diagram?</div>
  <div class="two" style="align-items:center">
    <div>
      <ul class="clean" style="padding:0">
        <li style="margin-bottom:20px"><span style="display:block;text-wrap:pretty">A <strong>blueprint</strong> for a database drawn <em>before</em> any code is written</span></li>
        <li style="margin-bottom:20px"><span style="display:block;text-wrap:pretty">Shows real-world <strong>things</strong>, their <strong>properties</strong>, and how they <strong>connect</strong></span></li>
        <li style="margin-bottom:20px"><span style="display:block;text-wrap:pretty">Invented by <strong>Peter Chen in 1976</strong></span></li>
        <li><span style="display:block;text-wrap:pretty">Language-neutral — any team can read it</span></li>
      </ul>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card" style="display:flex;align-items:center;gap:20px">
        <div style="font-size:48px">🏗️</div>
        <div><div style="font-size:24px;font-weight:700;margin-bottom:4px">Architect's Blueprint</div><div class="small" style="color:#6b7280">Plans rooms before building a house</div></div>
      </div>
      <div style="text-align:center;font-size:32px;color:#9ca3af">≈</div>
      <div class="card" style="display:flex;align-items:center;gap:20px;border-left:5px solid #0d7a72">
        <div style="font-size:48px">🗂️</div>
        <div><div style="font-size:24px;font-weight:700;margin-bottom:4px">ER Diagram</div><div class="small" style="color:#6b7280">Plans tables before coding a database</div></div>
      </div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"05 Why ER",html:`<div class="inner" style="padding-top:60px">
  <div class="kicker">Section 01</div>
  <div class="stitle" style="margin-bottom:36px">Why Do We Need Them?</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;flex:1">

    <!-- Card 1: Common Language -->
    <div style="background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08);display:flex;flex-direction:column">
      <div style="background:linear-gradient(135deg,#0d7a72,#14b8a6);padding:36px 32px 28px;display:flex;flex-direction:column;align-items:flex-start;gap:16px">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,.15)"/>
          <rect x="12" y="20" width="20" height="15" rx="3" fill="white" opacity=".9"/>
          <rect x="32" y="26" width="20" height="15" rx="3" fill="white" opacity=".9"/>
          <rect x="22" y="34" width="20" height="15" rx="3" fill="white" opacity=".6"/>
          <circle cx="20" cy="46" r="3" fill="white" opacity=".9"/>
          <circle cx="32" cy="46" r="3" fill="white" opacity=".9"/>
          <circle cx="44" cy="46" r="3" fill="white" opacity=".9"/>
        </svg>
        <div style="font-size:26px;font-weight:700;color:white;line-height:1.2">Common Language</div>
      </div>
      <div style="padding:28px 32px;flex:1;display:flex;flex-direction:column;gap:16px">
        <div style="font-size:25px;color:#374151;line-height:1.55">One diagram everyone understands — developers, managers, and clients — no technical jargon needed.</div>
        <div style="margin-top:auto;display:flex;gap:10px;flex-wrap:wrap">
          <span style="background:#e6f4f3;color:#0d7a72;border-radius:100px;padding:4px 14px;font-size:21px;font-weight:600">Developers</span>
          <span style="background:#e6f4f3;color:#0d7a72;border-radius:100px;padding:4px 14px;font-size:21px;font-weight:600">Managers</span>
          <span style="background:#e6f4f3;color:#0d7a72;border-radius:100px;padding:4px 14px;font-size:21px;font-weight:600">Clients</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Catch Errors Early -->
    <div style="background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08);display:flex;flex-direction:column">
      <div style="background:linear-gradient(135deg,#c47c1a,#f59e0b);padding:36px 32px 28px;display:flex;flex-direction:column;align-items:flex-start;gap:16px">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,.15)"/>
          <!-- paper/diagram -->  
          <rect x="14" y="12" width="28" height="36" rx="3" fill="white" opacity=".9"/>
          <line x1="19" y1="20" x2="36" y2="20" stroke="rgba(196,124,26,.6)" stroke-width="2"/>
          <line x1="19" y1="26" x2="36" y2="26" stroke="rgba(196,124,26,.6)" stroke-width="2"/>
          <line x1="19" y1="32" x2="30" y2="32" stroke="rgba(196,124,26,.6)" stroke-width="2"/>
          <!-- magnify -->  
          <circle cx="42" cy="42" r="10" stroke="white" stroke-width="2.5" fill="none"/>
          <line x1="49" y1="49" x2="55" y2="55" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <text x="38" y="47" font-size="10" fill="white" font-weight="700">!</text>
        </svg>
        <div style="font-size:26px;font-weight:700;color:white;line-height:1.2">Catch Errors Early</div>
      </div>
      <div style="padding:28px 32px;flex:1;display:flex;flex-direction:column;gap:16px">
        <div style="font-size:25px;color:#374151;line-height:1.55">Fixing a design mistake on paper takes minutes. Fixing the same mistake in a live database can take days.</div>
        <div style="margin-top:auto;display:flex;align-items:center;gap:16px;background:#fdf4e3;border-radius:10px;padding:14px 18px">
          <div style="text-align:center">
            <div style="font-size:26px;font-weight:700;color:#c47c1a">Paper</div>
            <div style="font-size:22px;color:#6b7280">minutes</div>
          </div>
          <div style="font-size:28px;color:#9ca3af;font-weight:300">vs</div>
          <div style="text-align:center">
            <div style="font-size:26px;font-weight:700;color:#991b1b">Live DB</div>
            <div style="font-size:22px;color:#6b7280">days</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 3: Road Map to Tables -->
    <div style="background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08);display:flex;flex-direction:column">
      <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:36px 32px 28px;display:flex;flex-direction:column;align-items:flex-start;gap:16px">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,.15)"/>
          <!-- ER box --> 
          <rect x="8" y="20" width="18" height="12" rx="2" fill="white" opacity=".9"/>
          <!-- arrow -->
          <line x1="26" y1="26" x2="36" y2="26" stroke="white" stroke-width="2" opacity=".8"/>
          <polygon points="36,22 42,26 36,30" fill="white" opacity=".8"/>
          <!-- DB table -->
          <rect x="42" y="14" width="16" height="24" rx="2" fill="white" opacity=".9"/>
          <line x1="42" y1="20" x2="58" y2="20" stroke="rgba(91,33,182,.4)" stroke-width="1.5"/>
          <line x1="42" y1="26" x2="58" y2="26" stroke="rgba(91,33,182,.4)" stroke-width="1.5"/>
          <line x1="42" y1="32" x2="58" y2="32" stroke="rgba(91,33,182,.4)" stroke-width="1.5"/>
          <!-- labels -->
          <text x="12" y="46" font-size="8" fill="white" opacity=".8">Entity</text>
          <text x="42" y="46" font-size="8" fill="white" opacity=".8">Table</text>
        </svg>
        <div style="font-size:26px;font-weight:700;color:white;line-height:1.2">Road Map to Tables</div>
      </div>
      <div style="padding:28px 32px;flex:1;display:flex;flex-direction:column;gap:14px">
        <div style="font-size:25px;color:#374151;line-height:1.55">Each shape maps directly to a database structure — no guesswork when building.</div>
        <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;align-items:center;gap:10px;font-size:22px">
            <span style="background:#ede9fe;color:#5b21b6;border-radius:6px;padding:3px 10px;font-weight:600">Entity</span>
            <span style="color:#9ca3af">→</span>
            <span style="color:#374151;font-weight:600">Table</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;font-size:22px">
            <span style="background:#ede9fe;color:#5b21b6;border-radius:6px;padding:3px 10px;font-weight:600">Attribute</span>
            <span style="color:#9ca3af">→</span>
            <span style="color:#374151;font-weight:600">Column</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;font-size:22px">
            <span style="background:#ede9fe;color:#5b21b6;border-radius:6px;padding:3px 10px;font-weight:600">Key Attr</span>
            <span style="color:#9ca3af">→</span>
            <span style="color:#374151;font-weight:600">Primary Key</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"06 Sec Notations",html:`<div class="inner" style="justify-content:center">
  <div style="font-size:130px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;margin-bottom:-10px">02</div>
  <div class="bar bar-amber" style="margin-bottom:24px"></div>
  <div class="stitle" style="color:white">Two Popular Notations</div>
  <p style="font-size:28px;color:rgba(255,255,255,.5);margin-top:18px;max-width:640px;line-height:1.6">Same concept — different visual style</p>
</div>
<div class="sec-num">02</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"07 Notations Compare",html:`<div class="inner">
  <div class="kicker">Section 02</div>
  <div class="stitle" style="margin-bottom:40px">Chen's vs. Crow's Foot Notation</div>
  <div class="two" style="gap:44px;align-items:stretch">
    <!-- CHEN -->
    <div class="card" style="border-top:6px solid #0d7a72;display:flex;flex-direction:column;align-items:center;gap:16px">
      <div style="font-size:28px;font-weight:700;color:#0d7a72">Chen's Notation (1976)</div>
      <p class="small" style="text-align:center;color:#374151">Uses <strong>geometric shapes</strong> — rectangles, diamonds &amp; ellipses</p>
      <svg width="340" height="150" viewBox="0 0 340 150">
        <rect x="10" y="55" width="110" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="65" y="84" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <line x1="120" y1="79" x2="144" y2="79" stroke="#374151" stroke-width="2"/>
        <polygon points="178,54 222,79 178,104 134,79" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="178" y="84" font-size="13" font-weight="600" fill="#92400e" text-anchor="middle">enrolls</text>
        <line x1="222" y1="79" x2="244" y2="79" stroke="#374151" stroke-width="2"/>
        <rect x="244" y="55" width="88" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="288" y="84" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
        <ellipse cx="65" cy="22" rx="40" ry="18" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="65" y="27" font-size="13" fill="#064e3b" text-anchor="middle">Name</text>
        <line x1="65" y1="40" x2="65" y2="55" stroke="#374151" stroke-width="1.5"/>
        <text x="126" y="70" font-size="17" font-weight="700" fill="#1d4ed8">M</text>
        <text x="226" y="70" font-size="17" font-weight="700" fill="#1d4ed8">N</text>
      </svg>
      <div class="small" style="text-align:center;color:#374151">Classic academic notation · Easy to learn</div>
      <div style="display:inline-block;background:#0d7a72;color:white;border-radius:100px;padding:6px 20px;font-size:19px;font-weight:600">✅ Used in this course</div>
    </div>
    <!-- CROW'S FOOT -->
    <div class="card" style="border-top:6px solid #6b7280;display:flex;flex-direction:column;align-items:center;gap:16px">
      <div style="font-size:28px;font-weight:700;color:#374151">Crow's Foot Notation</div>
      <p class="small" style="text-align:center;color:#374151">Uses <strong>line-end symbols</strong> on connecting lines to show cardinality</p>
      <svg width="340" height="150" viewBox="0 0 340 150">
        <rect x="10" y="45" width="120" height="72" rx="0" fill="white" stroke="#374151" stroke-width="2.5"/>
        <rect x="10" y="45" width="120" height="26" fill="#374151"/>
        <text x="70" y="64" font-size="14" font-weight="700" fill="white" text-anchor="middle">STUDENT</text>
        <text x="70" y="94" font-size="12" fill="#374151" text-anchor="middle">StudentID (PK)</text>
        <text x="70" y="110" font-size="12" fill="#374151" text-anchor="middle">Name</text>
        <rect x="210" y="45" width="120" height="72" rx="0" fill="white" stroke="#374151" stroke-width="2.5"/>
        <rect x="210" y="45" width="120" height="26" fill="#374151"/>
        <text x="270" y="64" font-size="14" font-weight="700" fill="white" text-anchor="middle">COURSE</text>
        <text x="270" y="94" font-size="12" fill="#374151" text-anchor="middle">CourseID (PK)</text>
        <text x="270" y="110" font-size="12" fill="#374151" text-anchor="middle">Title</text>
        <line x1="130" y1="81" x2="210" y2="81" stroke="#374151" stroke-width="2.5"/>
        <line x1="136" y1="74" x2="136" y2="88" stroke="#374151" stroke-width="2.5"/>
        <line x1="143" y1="74" x2="143" y2="88" stroke="#374151" stroke-width="2.5"/>
        <line x1="204" y1="81" x2="192" y2="71" stroke="#374151" stroke-width="2"/>
        <line x1="204" y1="81" x2="192" y2="81" stroke="#374151" stroke-width="2"/>
        <line x1="204" y1="81" x2="192" y2="91" stroke="#374151" stroke-width="2"/>
        <line x1="197" y1="74" x2="197" y2="88" stroke="#374151" stroke-width="2"/>
      </svg>
      <div class="small" style="text-align:center;color:#374151">Common in industry tools (Lucidchart, Visio, draw.io)</div>
      <div style="display:inline-block;background:#6b7280;color:white;border-radius:100px;padding:6px 20px;font-size:19px;font-weight:600">📌 For reference only</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"08 Sec Chen Shapes",html:`<div class="inner" style="justify-content:center">
  <div style="font-size:130px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;margin-bottom:-10px">03</div>
  <div class="bar bar-amber" style="margin-bottom:24px"></div>
  <div class="stitle" style="color:white">Chen's Notation — The Shapes</div>
  <p style="font-size:28px;color:rgba(255,255,255,.5);margin-top:18px;max-width:660px;line-height:1.6">Four shapes. Each shape has one specific job.</p>
</div>
<div class="sec-num">03</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"09 Entity Shape",html:`<div class="inner">
  <div class="kicker">Chen's Shapes · 1 of 4</div>
  <div class="stitle" style="margin-bottom:36px">Entity — The Rectangle</div>
  <div class="two" style="align-items:center">
    <div>
      <ul class="clean">
        <li>A real-world <strong>"thing"</strong> we want to track</li>
        <li>Always a <strong>noun</strong>: Student, Course, Teacher, Product…</li>
        <li>Each entity will become a <strong>table</strong> in the database</li>
        <li>Written in <strong>UPPERCASE</strong> inside the rectangle</li>
      </ul>
      <div class="card-t" style="margin-top:24px">
        <div class="small"><strong>Test:</strong> Can you list many of them? (Many students, many courses?) → It's an entity.</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
      <svg width="300" height="100" viewBox="0 0 300 100">
        <rect x="10" y="10" width="280" height="80" rx="6" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
        <text x="150" y="60" font-size="28" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
      </svg>
      <div class="cap">An entity named STUDENT</div>
      <div style="display:flex;gap:18px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <svg width="130" height="64" viewBox="0 0 130 64"><rect x="4" y="4" width="122" height="56" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/><text x="65" y="37" font-size="18" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text></svg>
          <div class="cap">COURSE</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <svg width="130" height="64" viewBox="0 0 130 64"><rect x="4" y="4" width="122" height="56" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/><text x="65" y="37" font-size="18" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text></svg>
          <div class="cap">TEACHER</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"10 Attribute Shape",html:`<div class="inner">
  <div class="kicker">Chen's Shapes · 2 of 4</div>
  <div class="stitle" style="margin-bottom:32px">Attribute — The Ellipse</div>
  <div class="two" style="align-items:center">
    <div>
      <ul class="clean">
        <li>A <strong>property</strong> of an entity</li>
        <li>Connected to their entity by a line</li>
        <li>STUDENT attributes: <em>Name, Email, BirthDate…</em></li>
        <li>Will become a <strong>column</strong> in the database table</li>
      </ul>
      <div class="card-t" style="margin-top:24px">
        <div class="small"><strong>Rule:</strong> Does it describe a property of an entity? → it's an attribute</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center">
      <svg width="360" height="300" viewBox="0 0 360 300">
        <rect x="110" y="130" width="140" height="54" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="180" y="163" font-size="18" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <ellipse cx="60" cy="52" rx="50" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="60" y="57" font-size="13" fill="#064e3b" text-anchor="middle">StudentID</text>
        <line x1="97" y1="66" x2="128" y2="130" stroke="#374151" stroke-width="1.5"/>
        <ellipse cx="180" cy="46" rx="40" ry="20" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="180" y="51" font-size="13" fill="#064e3b" text-anchor="middle">Name</text>
        <line x1="180" y1="66" x2="180" y2="130" stroke="#374151" stroke-width="1.5"/>
        <ellipse cx="300" cy="52" rx="48" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="300" y="57" font-size="13" fill="#064e3b" text-anchor="middle">Email</text>
        <line x1="264" y1="66" x2="232" y2="130" stroke="#374151" stroke-width="1.5"/>
        <ellipse cx="180" cy="262" rx="52" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="180" y="267" font-size="13" fill="#064e3b" text-anchor="middle">BirthDate</text>
        <line x1="180" y1="240" x2="180" y2="184" stroke="#374151" stroke-width="1.5"/>
      </svg>
      <div class="cap">STUDENT entity with 4 attributes</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"11 Key Attribute",html:`<div class="inner">
  <div class="kicker">Chen's Shapes · 2b — Special Attribute</div>
  <div class="stitle" style="margin-bottom:32px">Key Attribute — Underlined Ellipse</div>
  <div class="two" style="align-items:center">
    <div>
      <ul class="clean">
        <li>A <strong>unique identifier</strong> — no two rows can share the same value</li>
        <li>Drawn as an ellipse with the attribute name <strong>underlined</strong></li>
        <li>Becomes the <strong>Primary Key</strong> of the table</li>
        <li>Every entity must have one</li>
      </ul>
      <div class="card-a" style="margin-top:24px">
        <div class="small">🔑 Two students may share a name — but each must have a unique <strong>StudentID</strong>. Therefore StudentID is the key attribute.</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:28px">
      <div style="display:flex;gap:44px;align-items:center">
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <svg width="130" height="54" viewBox="0 0 130 54"><ellipse cx="65" cy="27" rx="58" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2"/><text x="65" y="32" font-size="15" fill="#064e3b" text-anchor="middle">Name</text></svg>
          <div class="cap">Regular attribute</div>
        </div>
        <div style="font-size:38px;color:#9ca3af">vs</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <svg width="140" height="54" viewBox="0 0 140 54"><ellipse cx="70" cy="27" rx="62" ry="22" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/><text x="70" y="30" font-size="14" font-weight="700" fill="#3b0764" text-anchor="middle">StudentID</text><line x1="28" y1="35" x2="112" y2="35" stroke="#3b0764" stroke-width="1.8"/></svg>
          <div class="cap">Key attribute (underlined)</div>
        </div>
      </div>
      <svg width="300" height="190" viewBox="0 0 300 190">
        <rect x="85" y="100" width="130" height="50" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="150" y="131" font-size="17" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <ellipse cx="68" cy="42" rx="56" ry="22" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/>
        <text x="68" y="46" font-size="13" font-weight="700" fill="#3b0764" text-anchor="middle">StudentID</text>
        <line x1="22" y1="51" x2="114" y2="51" stroke="#3b0764" stroke-width="1.5"/>
        <line x1="80" y1="64" x2="112" y2="100" stroke="#374151" stroke-width="1.5"/>
        <ellipse cx="232" cy="42" rx="50" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
        <text x="232" y="47" font-size="13" fill="#064e3b" text-anchor="middle">Name</text>
        <line x1="200" y1="62" x2="188" y2="100" stroke="#374151" stroke-width="1.5"/>
      </svg>
      <div class="cap">StudentID is the key; Name is a regular attribute</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"12 Relationship Shape",html:`<div class="inner">
  <div class="kicker">Chen's Shapes · 3 of 4</div>
  <div class="stitle" style="margin-bottom:32px">Relationship — The Diamond</div>
  <div class="two" style="align-items:center">
    <div>
      <ul class="clean">
        <li>Describes <strong>how two entities connect</strong></li>
        <li>Written as a <strong>verb</strong> inside the diamond</li>
        <li>Lines connect the diamond to both entities</li>
        <li>Examples: <em>enrolls, teaches, manages, owns</em></li>
      </ul>
      <div class="card-t" style="margin-top:24px">
        <div class="small"><strong>Memory tip:</strong> Entity = noun · Relationship = verb<br>"STUDENT <em>enrolls</em> COURSE" → diamond says <em>enrolls</em></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
      <svg width="380" height="120" viewBox="0 0 380 120">
        <rect x="8" y="36" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="62" y="65" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <line x1="116" y1="60" x2="138" y2="60" stroke="#374151" stroke-width="2"/>
        <polygon points="175,36 218,60 175,84 132,60" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="175" y="65" font-size="13" font-weight="600" fill="#92400e" text-anchor="middle">enrolls</text>
        <line x1="218" y1="60" x2="240" y2="60" stroke="#374151" stroke-width="2"/>
        <rect x="240" y="36" width="100" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="290" y="65" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
      </svg>
      <div class="cap">STUDENT enrolls COURSE</div>
      <svg width="380" height="100" viewBox="0 0 380 100">
        <rect x="8" y="26" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="62" y="55" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text>
        <line x1="116" y1="50" x2="138" y2="50" stroke="#374151" stroke-width="2"/>
        <polygon points="175,26 218,50 175,74 132,50" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="175" y="55" font-size="13" font-weight="600" fill="#92400e" text-anchor="middle">teaches</text>
        <line x1="218" y1="50" x2="240" y2="50" stroke="#374151" stroke-width="2"/>
        <rect x="240" y="26" width="100" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="290" y="55" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
      </svg>
      <div class="cap">TEACHER teaches COURSE</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"13 Shapes Summary",html:`<div class="inner">
  <div class="kicker">Chen's Shapes — Summary</div>
  <div class="stitle" style="margin-bottom:40px">Four Shapes, Four Jobs</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #1e40af">
      <svg width="96" height="56" viewBox="0 0 96 56"><rect x="3" y="4" width="90" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/><text x="48" y="33" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">ENTITY</text></svg>
      <div><div style="font-size:26px;font-weight:700;margin-bottom:4px">Rectangle</div><div class="small" style="color:#374151">A real-world thing → becomes a <strong>table</strong></div></div>
    </div>
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #065f46">
      <svg width="96" height="56" viewBox="0 0 96 56"><ellipse cx="48" cy="28" rx="43" ry="22" fill="#d1fae5" stroke="#065f46" stroke-width="2.5"/><text x="48" y="33" font-size="13" fill="#064e3b" text-anchor="middle">attribute</text></svg>
      <div><div style="font-size:26px;font-weight:700;margin-bottom:4px">Ellipse</div><div class="small" style="color:#374151">A property → becomes a <strong>column</strong></div></div>
    </div>
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #5b21b6">
      <svg width="96" height="56" viewBox="0 0 96 56"><ellipse cx="48" cy="28" rx="43" ry="22" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/><text x="48" y="31" font-size="12" font-weight="700" fill="#3b0764" text-anchor="middle">keyAttr</text><line x1="14" y1="36" x2="82" y2="36" stroke="#3b0764" stroke-width="1.5"/></svg>
      <div><div style="font-size:26px;font-weight:700;margin-bottom:4px">Underlined Ellipse</div><div class="small" style="color:#374151">Unique identifier → <strong>Primary Key</strong></div></div>
    </div>
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #d97706">
      <svg width="96" height="56" viewBox="0 0 96 56"><polygon points="48,4 90,28 48,52 6,28" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/><text x="48" y="32" font-size="11" font-weight="600" fill="#92400e" text-anchor="middle">relation</text></svg>
      <div><div style="font-size:26px;font-weight:700;margin-bottom:4px">Diamond</div><div class="small" style="color:#374151">A verb linking two entities → <strong>relationship</strong></div></div>
    </div>
  </div>
  <div class="card-t" style="margin-top:24px">
    <div class="small">Lines connect everything — attributes to entities, entities to diamonds. <strong>No floating shapes.</strong></div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"14 Sec Cardinality",html:`<div class="inner" style="justify-content:center">
  <div style="font-size:130px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;margin-bottom:-10px">04</div>
  <div class="bar bar-amber" style="margin-bottom:24px"></div>
  <div class="stitle" style="color:white">Cardinality</div>
  <p style="font-size:28px;color:rgba(255,255,255,.5);margin-top:18px;max-width:660px;line-height:1.6">The numbers on relationship lines — how many can relate to how many?</p>
</div>
<div class="sec-num">04</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"15 Cardinality 1-1",html:`<div class="inner">
  <div class="kicker">Cardinality · One-to-One</div>
  <div class="stitle" style="margin-bottom:32px">1 : 1 — Each side has exactly one match</div>
  <div class="two" style="align-items:center">
    <div>
      <div class="body" style="margin-bottom:22px">Each instance on side A relates to <strong>exactly one</strong> on side B, and vice versa.</div>
      <div class="card-t" style="margin-bottom:16px"><div class="small">🧑‍💼 One <strong>Employee</strong> holds one <strong>Passport</strong><br>One <strong>Passport</strong> belongs to one <strong>Employee</strong></div></div>
      <div class="card-a"><div class="small">🏫 One <strong>Principal</strong> leads one <strong>School</strong></div></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      <svg width="380" height="110" viewBox="0 0 380 110">
        <rect x="8" y="32" width="114" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="65" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">EMPLOYEE</text>
        <line x1="122" y1="56" x2="144" y2="56" stroke="#374151" stroke-width="2.5"/>
        <polygon points="178,33 220,56 178,79 136,56" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="178" y="61" font-size="12" font-weight="600" fill="#92400e" text-anchor="middle">holds</text>
        <line x1="220" y1="56" x2="244" y2="56" stroke="#374151" stroke-width="2.5"/>
        <rect x="244" y="32" width="126" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="307" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">PASSPORT</text>
        <text x="128" y="46" font-size="20" font-weight="700" fill="#1d4ed8">1</text>
        <text x="224" y="46" font-size="20" font-weight="700" fill="#1d4ed8">1</text>
      </svg>
      <div class="cap">The "1" and "1" labels mean one-to-one</div>
      <!-- mapping diagram -->
      <svg width="320" height="130" viewBox="0 0 320 130">
        <text x="80" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">EMPLOYEE</text>
        <text x="240" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">PASSPORT</text>
        <rect x="20" y="24" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="43" font-size="13" fill="#1e3a8a" text-anchor="middle">Alice</text>
        <rect x="20" y="60" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="79" font-size="13" fill="#1e3a8a" text-anchor="middle">Bob</text>
        <rect x="20" y="96" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="115" font-size="13" fill="#1e3a8a" text-anchor="middle">Carol</text>
        <rect x="180" y="24" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="43" font-size="13" fill="#064e3b" text-anchor="middle">P-001</text>
        <rect x="180" y="60" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="79" font-size="13" fill="#064e3b" text-anchor="middle">P-002</text>
        <rect x="180" y="96" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="115" font-size="13" fill="#064e3b" text-anchor="middle">P-003</text>
        <line x1="140" y1="38" x2="180" y2="38" stroke="#0d7a72" stroke-width="1.8"/>
        <line x1="140" y1="74" x2="180" y2="74" stroke="#0d7a72" stroke-width="1.8"/>
        <line x1="140" y1="110" x2="180" y2="110" stroke="#0d7a72" stroke-width="1.8"/>
      </svg>
      <div class="cap">Each employee ↔ exactly one passport</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"16 Cardinality 1-N",html:`<div class="inner">
  <div class="kicker">Cardinality · One-to-Many</div>
  <div class="stitle" style="margin-bottom:32px">1 : N — One side, many on the other</div>
  <div class="two" style="align-items:center">
    <div>
      <div class="body" style="margin-bottom:22px">One instance on side A relates to <strong>many</strong> on side B. But each B belongs to <strong>only one</strong> A.</div>
      <div class="card-t" style="margin-bottom:16px"><div class="small">🏫 One <strong>Teacher</strong> teaches many <strong>Courses</strong><br>Each <strong>Course</strong> has only one <strong>Teacher</strong></div></div>
      <div class="card-a"><div class="small">👩‍👧 One <strong>Mother</strong> has many <strong>Children</strong><br>Each <strong>Child</strong> has one <strong>Mother</strong></div></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      <svg width="380" height="110" viewBox="0 0 380 110">
        <rect x="8" y="32" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="62" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text>
        <line x1="116" y1="56" x2="138" y2="56" stroke="#374151" stroke-width="2.5"/>
        <polygon points="175,33 218,56 175,79 132,56" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="175" y="61" font-size="12" font-weight="600" fill="#92400e" text-anchor="middle">teaches</text>
        <line x1="218" y1="56" x2="242" y2="56" stroke="#374151" stroke-width="2.5"/>
        <rect x="242" y="32" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="296" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
        <text x="122" y="46" font-size="20" font-weight="700" fill="#1d4ed8">1</text>
        <text x="222" y="46" font-size="20" font-weight="700" fill="#1d4ed8">N</text>
      </svg>
      <div class="cap">"1" on teacher side, "N" on course side</div>
      <svg width="320" height="150" viewBox="0 0 320 150">
        <text x="80" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text>
        <text x="240" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
        <rect x="20" y="24" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="43" font-size="13" fill="#1e3a8a" text-anchor="middle">Dr. Smith</text>
        <rect x="20" y="80" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="99" font-size="13" fill="#1e3a8a" text-anchor="middle">Dr. Lee</text>
        <rect x="180" y="24" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="43" font-size="13" fill="#064e3b" text-anchor="middle">CS101</text>
        <rect x="180" y="60" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="79" font-size="13" fill="#064e3b" text-anchor="middle">CS204</text>
        <rect x="180" y="96" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="115" font-size="13" fill="#064e3b" text-anchor="middle">CS310</text>
        <rect x="180" y="118" width="120" height="28" rx="4" fill="#fef9c3" stroke="#d97706" stroke-width="1.5"/><text x="240" y="137" font-size="13" fill="#92400e" text-anchor="middle">CS420</text>
        <line x1="140" y1="38" x2="180" y2="38" stroke="#0d7a72" stroke-width="1.5"/>
        <line x1="140" y1="38" x2="180" y2="74" stroke="#0d7a72" stroke-width="1.5"/>
        <line x1="140" y1="38" x2="180" y2="110" stroke="#0d7a72" stroke-width="1.5"/>
        <line x1="140" y1="94" x2="180" y2="132" stroke="#c47c1a" stroke-width="1.5"/>
      </svg>
      <div class="cap">Dr. Smith → 3 courses; Dr. Lee → 1 course</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"17 Cardinality M-N",html:`<div class="inner">
  <div class="kicker">Cardinality · Many-to-Many</div>
  <div class="stitle" style="margin-bottom:32px">M : N — Many on both sides</div>
  <div class="two" style="align-items:center">
    <div>
      <div class="body" style="margin-bottom:22px">Many instances on side A relate to many instances on side B, and vice versa.</div>
      <div class="card-t" style="margin-bottom:16px"><div class="small">📚 One <strong>Student</strong> enrolls in many <strong>Courses</strong><br>One <strong>Course</strong> has many <strong>Students</strong></div></div>
      <div class="card-a"><div class="small">🎬 One <strong>Actor</strong> appears in many <strong>Movies</strong><br>One <strong>Movie</strong> has many <strong>Actors</strong></div></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      <svg width="380" height="110" viewBox="0 0 380 110">
        <rect x="8" y="32" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="62" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <line x1="116" y1="56" x2="138" y2="56" stroke="#374151" stroke-width="2.5"/>
        <polygon points="175,33 218,56 175,79 132,56" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
        <text x="175" y="61" font-size="12" font-weight="600" fill="#92400e" text-anchor="middle">enrolls</text>
        <line x1="218" y1="56" x2="242" y2="56" stroke="#374151" stroke-width="2.5"/>
        <rect x="242" y="32" width="108" height="48" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
        <text x="296" y="61" font-size="16" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
        <text x="122" y="46" font-size="20" font-weight="700" fill="#1d4ed8">M</text>
        <text x="222" y="46" font-size="20" font-weight="700" fill="#1d4ed8">N</text>
      </svg>
      <div class="cap">"M" and "N" both mean "many"</div>
      <svg width="320" height="150" viewBox="0 0 320 150">
        <text x="80" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>
        <text x="240" y="18" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>
        <rect x="20" y="24" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="43" font-size="13" fill="#1e3a8a" text-anchor="middle">Alice</text>
        <rect x="20" y="60" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="79" font-size="13" fill="#1e3a8a" text-anchor="middle">Bob</text>
        <rect x="20" y="96" width="120" height="28" rx="4" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/><text x="80" y="115" font-size="13" fill="#1e3a8a" text-anchor="middle">Carol</text>
        <rect x="180" y="24" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="43" font-size="13" fill="#064e3b" text-anchor="middle">CS101</text>
        <rect x="180" y="60" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="79" font-size="13" fill="#064e3b" text-anchor="middle">CS204</text>
        <rect x="180" y="96" width="120" height="28" rx="4" fill="#d1fae5" stroke="#065f46" stroke-width="1.5"/><text x="240" y="115" font-size="13" fill="#064e3b" text-anchor="middle">CS310</text>
        <!-- many-to-many lines -->
        <line x1="140" y1="38" x2="180" y2="38" stroke="#0d7a72" stroke-width="1.5"/>
        <line x1="140" y1="38" x2="180" y2="74" stroke="#0d7a72" stroke-width="1.5"/>
        <line x1="140" y1="74" x2="180" y2="38" stroke="#c47c1a" stroke-width="1.5"/>
        <line x1="140" y1="74" x2="180" y2="110" stroke="#c47c1a" stroke-width="1.5"/>
        <line x1="140" y1="110" x2="180" y2="74" stroke="#7c3aed" stroke-width="1.5"/>
        <line x1="140" y1="110" x2="180" y2="110" stroke="#7c3aed" stroke-width="1.5"/>
      </svg>
      <div class="cap">Students and courses are connected in many directions</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"18 Cardinality Summary",html:`<div class="inner">
  <div class="kicker">Cardinality — Summary</div>
  <div class="stitle" style="margin-bottom:36px">Three Types at a Glance</div>
  <div style="display:flex;flex-direction:column;gap:20px">
    <!-- 1:1 -->
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #0d7a72">
      <div style="min-width:80px;text-align:center;font-size:32px;font-weight:700;color:#0d7a72">1:1</div>
      <svg width="260" height="52" viewBox="0 0 260 52"><rect x="2" y="11" width="80" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="42" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">EMPLOYEE</text><line x1="82" y1="26" x2="98" y2="26" stroke="#374151" stroke-width="2"/><polygon points="118,12 148,26 118,40 88,26" fill="#fef9c3" stroke="#d97706" stroke-width="2"/><text x="118" y="30" font-size="10" font-weight="600" fill="#92400e" text-anchor="middle">holds</text><line x1="148" y1="26" x2="162" y2="26" stroke="#374151" stroke-width="2"/><rect x="162" y="11" width="88" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="206" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">PASSPORT</text><text x="86" y="10" font-size="14" font-weight="700" fill="#1d4ed8">1</text><text x="150" y="10" font-size="14" font-weight="700" fill="#1d4ed8">1</text></svg>
      <div class="small" style="color:#374151">Each instance matches <strong>exactly one</strong> on the other side</div>
    </div>
    <!-- 1:N -->
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #c47c1a">
      <div style="min-width:80px;text-align:center;font-size:32px;font-weight:700;color:#c47c1a">1:N</div>
      <svg width="260" height="52" viewBox="0 0 260 52"><rect x="2" y="11" width="80" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="42" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text><line x1="82" y1="26" x2="98" y2="26" stroke="#374151" stroke-width="2"/><polygon points="118,12 148,26 118,40 88,26" fill="#fef9c3" stroke="#d97706" stroke-width="2"/><text x="118" y="30" font-size="10" font-weight="600" fill="#92400e" text-anchor="middle">teaches</text><line x1="148" y1="26" x2="162" y2="26" stroke="#374151" stroke-width="2"/><rect x="162" y="11" width="88" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="206" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text><text x="86" y="10" font-size="14" font-weight="700" fill="#1d4ed8">1</text><text x="150" y="10" font-size="14" font-weight="700" fill="#1d4ed8">N</text></svg>
      <div class="small" style="color:#374151">One on side A → <strong>many</strong> on side B; each B has only one A</div>
    </div>
    <!-- M:N -->
    <div class="card" style="display:flex;align-items:center;gap:24px;border-left:5px solid #7c3aed">
      <div style="min-width:80px;text-align:center;font-size:32px;font-weight:700;color:#7c3aed">M:N</div>
      <svg width="260" height="52" viewBox="0 0 260 52"><rect x="2" y="11" width="80" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="42" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text><line x1="82" y1="26" x2="98" y2="26" stroke="#374151" stroke-width="2"/><polygon points="118,12 148,26 118,40 88,26" fill="#fef9c3" stroke="#d97706" stroke-width="2"/><text x="118" y="30" font-size="10" font-weight="600" fill="#92400e" text-anchor="middle">enrolls</text><line x1="148" y1="26" x2="162" y2="26" stroke="#374151" stroke-width="2"/><rect x="162" y="11" width="88" height="30" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/><text x="206" y="31" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text><text x="86" y="10" font-size="14" font-weight="700" fill="#1d4ed8">M</text><text x="150" y="10" font-size="14" font-weight="700" fill="#1d4ed8">N</text></svg>
      <div class="small" style="color:#374151">Many on side A ↔ <strong>many</strong> on side B simultaneously</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"19 Sec Full ER",html:`<div class="inner" style="justify-content:center">
  <div style="font-size:130px;font-weight:700;color:rgba(255,255,255,.05);line-height:1;margin-bottom:-10px">05</div>
  <div class="bar bar-amber" style="margin-bottom:24px"></div>
  <div class="stitle" style="color:white">Drawing a Complete ER Diagram</div>
  <p style="font-size:28px;color:rgba(255,255,255,.5);margin-top:18px;max-width:660px;line-height:1.6">Let's put it all together — step by step</p>
</div>
<div class="sec-num">05</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"20 How To Draw Steps",html:`<div class="inner">
  <div class="kicker">Section 05</div>
  <div class="stitle" style="margin-bottom:36px">How to Draw an ER Diagram</div>
  <div class="two" style="align-items:center">
    <div>
      <div class="step"><div class="snum">1</div><div class="sbody"><strong>Identify the entities</strong> — what real-world things do we store data about? (nouns)</div></div>
      <div class="step"><div class="snum">2</div><div class="sbody"><strong>List attributes</strong> for each entity — what properties does it have?</div></div>
      <div class="step"><div class="snum">3</div><div class="sbody"><strong>Mark the key attribute</strong> — which attribute uniquely identifies each instance?</div></div>
      <div class="step"><div class="snum">4</div><div class="sbody"><strong>Identify relationships</strong> — how do entities connect? (verbs)</div></div>
      <div class="step"><div class="snum">5</div><div class="sbody"><strong>Add cardinality</strong> — 1:1, 1:N, or M:N on each relationship line</div></div>
    </div>
    <div class="card-t">
      <div class="small" style="margin-bottom:16px"><strong>Scenario:</strong> A university has <em>students</em> and <em>courses</em>. Students can enroll in many courses. Each course is taught by one teacher. Teachers can teach many courses.</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="small">📦 <strong>Entities:</strong> STUDENT, COURSE, TEACHER</div>
        <div class="small">🔗 <strong>Relationships:</strong> enrolls (M:N), teaches (1:N)</div>
      </div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"21 Full ER Diagram",html:`<div class="inner">
  <div class="kicker">Section 05 — Complete Example</div>
  <div class="stitle" style="margin-bottom:28px">University Enrollment — Full ER Diagram</div>
  <div style="display:flex;justify-content:center">
    <svg width="1500" height="560" viewBox="0 0 1500 560" style="max-width:100%;height:auto">

      <!-- ══ TEACHER entity ══ -->
      <rect x="60" y="230" width="160" height="60" rx="5" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
      <text x="140" y="266" font-size="20" font-weight="700" fill="#1e3a8a" text-anchor="middle">TEACHER</text>

      <!-- TEACHER attrs -->
      <!-- TeacherID (key) -->
      <ellipse cx="80" cy="110" rx="68" ry="28" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/>
      <text x="80" y="114" font-size="15" font-weight="700" fill="#3b0764" text-anchor="middle">TeacherID</text>
      <line x1="80" y1="126" x2="80" y2="138" stroke="#3b0764" stroke-width="1.8"/>
      <line x1="26" y1="120" x2="134" y2="120" stroke="#3b0764" stroke-width="1.5"/>
      <line x1="80" y1="138" x2="105" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- TName -->
      <ellipse cx="210" cy="110" rx="52" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="210" y="115" font-size="15" fill="#064e3b" text-anchor="middle">T_Name</text>
      <line x1="210" y1="136" x2="185" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Department -->
      <ellipse cx="310" cy="146" rx="68" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="310" y="151" font-size="15" fill="#064e3b" text-anchor="middle">Department</text>
      <line x1="272" y1="158" x2="220" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- teaches relationship -->
      <line x1="220" y1="260" x2="290" y2="260" stroke="#374151" stroke-width="2.5"/>
      <polygon points="340,234 388,260 340,286 292,260" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
      <text x="340" y="265" font-size="15" font-weight="600" fill="#92400e" text-anchor="middle">teaches</text>
      <line x1="388" y1="260" x2="430" y2="260" stroke="#374151" stroke-width="2.5"/>
      <!-- cardinality -->
      <text x="228" y="252" font-size="22" font-weight="700" fill="#1d4ed8">1</text>
      <text x="392" y="252" font-size="22" font-weight="700" fill="#1d4ed8">N</text>

      <!-- ══ COURSE entity ══ -->
      <rect x="430" y="230" width="160" height="60" rx="5" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
      <text x="510" y="266" font-size="20" font-weight="700" fill="#1e3a8a" text-anchor="middle">COURSE</text>

      <!-- COURSE attrs -->
      <!-- CourseID (key) -->
      <ellipse cx="438" cy="110" rx="66" ry="28" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/>
      <text x="438" y="114" font-size="15" font-weight="700" fill="#3b0764" text-anchor="middle">CourseID</text>
      <line x1="372" y1="120" x2="504" y2="120" stroke="#3b0764" stroke-width="1.5"/>
      <line x1="438" y1="138" x2="460" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Title -->
      <ellipse cx="548" cy="100" rx="46" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="548" y="105" font-size="15" fill="#064e3b" text-anchor="middle">Title</text>
      <line x1="548" y1="126" x2="530" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Credits -->
      <ellipse cx="644" cy="116" rx="50" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="644" y="121" font-size="15" fill="#064e3b" text-anchor="middle">Credits</text>
      <line x1="614" y1="136" x2="590" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- enrolls relationship -->
      <line x1="590" y1="260" x2="680" y2="260" stroke="#374151" stroke-width="2.5"/>
      <polygon points="740,234 788,260 740,286 692,260" fill="#fef9c3" stroke="#d97706" stroke-width="2.5"/>
      <text x="740" y="265" font-size="15" font-weight="600" fill="#92400e" text-anchor="middle">enrolls</text>
      <line x1="788" y1="260" x2="840" y2="260" stroke="#374151" stroke-width="2.5"/>
      <!-- cardinality -->
      <text x="600" y="252" font-size="22" font-weight="700" fill="#1d4ed8">M</text>
      <text x="792" y="252" font-size="22" font-weight="700" fill="#1d4ed8">N</text>

      <!-- ══ STUDENT entity ══ -->
      <rect x="840" y="230" width="160" height="60" rx="5" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
      <text x="920" y="266" font-size="20" font-weight="700" fill="#1e3a8a" text-anchor="middle">STUDENT</text>

      <!-- STUDENT attrs -->
      <!-- StudentID (key) -->
      <ellipse cx="860" cy="110" rx="66" ry="28" fill="#ede9fe" stroke="#5b21b6" stroke-width="2.5"/>
      <text x="860" y="114" font-size="15" font-weight="700" fill="#3b0764" text-anchor="middle">StudentID</text>
      <line x1="794" y1="120" x2="926" y2="120" stroke="#3b0764" stroke-width="1.5"/>
      <line x1="860" y1="138" x2="880" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Sname -->
      <ellipse cx="970" cy="106" rx="46" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="970" y="111" font-size="15" fill="#064e3b" text-anchor="middle">S_Name</text>
      <line x1="970" y1="132" x2="950" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Email -->
      <ellipse cx="1060" cy="110" rx="44" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="1060" y="115" font-size="15" fill="#064e3b" text-anchor="middle">Email</text>
      <line x1="1030" y1="128" x2="1000" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- Major -->
      <ellipse cx="1140" cy="128" rx="46" ry="26" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="1140" y="133" font-size="15" fill="#064e3b" text-anchor="middle">Major</text>
      <line x1="1118" y1="144" x2="1000" y2="230" stroke="#374151" stroke-width="1.5"/>

      <!-- ══ LEGEND ══ -->
      <rect x="1200" y="200" width="270" height="200" rx="10" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
      <text x="1335" y="226" font-size="16" font-weight="700" fill="#1a2744" text-anchor="middle">LEGEND</text>
      <line x1="1210" y1="234" x2="1462" y2="234" stroke="#e5e7eb" stroke-width="1"/>

      <rect x="1218" y="244" width="40" height="22" rx="3" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>
      <text x="1268" y="260" font-size="14" fill="#374151">Entity</text>

      <ellipse cx="1238" cy="284" rx="20" ry="12" fill="#d1fae5" stroke="#065f46" stroke-width="2"/>
      <text x="1268" y="289" font-size="14" fill="#374151">Attribute</text>

      <ellipse cx="1238" cy="316" rx="20" ry="12" fill="#ede9fe" stroke="#5b21b6" stroke-width="2"/>
      <text x="1230" y="319" font-size="10" font-weight="700" fill="#3b0764" text-anchor="middle">key</text>
      <line x1="1218" y1="322" x2="1258" y2="322" stroke="#3b0764" stroke-width="1.3"/>
      <text x="1268" y="321" font-size="14" fill="#374151">Key Attribute</text>

      <polygon points="1238,336 1258,348 1238,360 1218,348" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
      <text x="1268" y="353" font-size="14" fill="#374151">Relationship</text>

      <text x="1218" y="388" font-size="14" fill="#374151">1 / N / M = Cardinality</text>
    </svg>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"",label:"22 Reading the Diagram",html:`<div class="inner">
  <div class="kicker">Section 05</div>
  <div class="stitle" style="margin-bottom:32px">How to Read the Diagram</div>
  <div class="two" style="align-items:start">
    <div>
      <div class="body" style="margin-bottom:24px">Reading the university ER diagram:</div>
      <div class="step"><div class="snum" style="background:#0d7a72">→</div><div class="sbody">One <strong>TEACHER</strong> teaches many <strong>COURSES</strong> (1:N)</div></div>
      <div class="step"><div class="snum" style="background:#0d7a72">→</div><div class="sbody">One <strong>COURSE</strong> is taught by one <strong>TEACHER</strong> (back-link of 1:N)</div></div>
      <div class="step"><div class="snum" style="background:#c47c1a">→</div><div class="sbody">A <strong>STUDENT</strong> can enroll in many <strong>COURSES</strong> (M:N)</div></div>
      <div class="step"><div class="snum" style="background:#c47c1a">→</div><div class="sbody">A <strong>COURSE</strong> can have many <strong>STUDENTS</strong> enrolled (M:N)</div></div>
    </div>
    <div>
      <div class="card-t" style="margin-bottom:20px">
        <div style="font-size:24px;font-weight:700;margin-bottom:10px">What becomes what in the DB?</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px">
          <div class="small">STUDENT entity</div><div class="small">→ <strong>STUDENT table</strong></div>
          <div class="small">COURSE entity</div><div class="small">→ <strong>COURSE table</strong></div>
          <div class="small">TEACHER entity</div><div class="small">→ <strong>TEACHER table</strong></div>
          <div class="small">StudentID (key)</div><div class="small">→ <strong>Primary Key</strong></div>
          <div class="small">Name, Email…</div><div class="small">→ <strong>Columns</strong></div>
          <div class="small">enrolls (M:N)</div><div class="small">→ <strong>Junction table</strong></div>
        </div>
      </div>
      <div class="card-a">
        <div class="small">💡 Every M:N relationship becomes a separate <em>junction table</em> (e.g., ENROLLMENT) in the relational database. 1:N relationships become a <em>foreign key</em>.</div>
      </div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"dark",label:"23 Key Takeaways",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.04" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="g2" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#g2)"/></svg>
<div class="inner">
  <div class="kicker">Summary</div>
  <div class="stitle" style="color:white;margin-bottom:40px">Key Takeaways</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div style="background:rgba(255,255,255,.07);border-radius:14px;padding:30px 36px;border-left:5px solid #5eead4">
      <div style="font-size:26px;font-weight:700;color:#5eead4;margin-bottom:10px">ER diagrams are design tools</div>
      <div class="small" style="color:rgba(255,255,255,.75)">Draw before you code — saves enormous time &amp; effort later</div>
    </div>
    <div style="background:rgba(255,255,255,.07);border-radius:14px;padding:30px 36px;border-left:5px solid #fbbf24">
      <div style="font-size:26px;font-weight:700;color:#fbbf24;margin-bottom:10px">Rectangle = Entity → Table</div>
      <div class="small" style="color:rgba(255,255,255,.75)">Real-world "things" we track; become database tables</div>
    </div>
    <div style="background:rgba(255,255,255,.07);border-radius:14px;padding:30px 36px;border-left:5px solid #86efac">
      <div style="font-size:26px;font-weight:700;color:#86efac;margin-bottom:10px">Ellipse = Attribute → Column</div>
      <div class="small" style="color:rgba(255,255,255,.75)">Properties of entities; underlined ellipse = primary key</div>
    </div>
    <div style="background:rgba(255,255,255,.07);border-radius:14px;padding:30px 36px;border-left:5px solid #f9a8d4">
      <div style="font-size:26px;font-weight:700;color:#f9a8d4;margin-bottom:10px">Diamond = Relationship → Link</div>
      <div class="small" style="color:rgba(255,255,255,.75)">Verbs connecting entities; labeled with 1:1, 1:N, or M:N</div>
    </div>
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`},{classes:"navy2",label:"24 End",html:`<div class="inner center">
  <div style="font-size:96px;margin-bottom:24px">🎓</div>
  <div style="font-size:64px;font-weight:700;color:white;margin-bottom:20px">Questions?</div>
  <div style="width:80px;height:5px;background:#fbbf24;border-radius:3px;margin:0 auto 28px"></div>
  <div style="font-size:28px;color:rgba(255,255,255,.55);max-width:580px;line-height:1.7">
    Database Management Systems<br>Entity-Relationship Diagrams
  </div>
</div>
<div class="cr">© Yasas Sri Wickramasinghe · All Rights Reserved</div>`}];function G5(){const[e,t]=k.useState(0),[i,n]=k.useState(!1),[s,r]=k.useState(!1),o=k.useRef(null),l=k.useRef(null),[d,c]=k.useState(.5),[f,p]=k.useState({x:0,y:0});k.useEffect(()=>{const m="er-deck-styles";if(!document.getElementById(m)){const b=document.createElement("style");b.id=m,b.textContent=Q5,document.head.appendChild(b)}return()=>{var b;(b=document.getElementById("er-deck-styles"))==null||b.remove()}},[]),k.useEffect(()=>{const m=()=>r(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",m),()=>document.removeEventListener("fullscreenchange",m)},[]),k.useEffect(()=>{const m=l.current;if(!m)return;const b=()=>{const x=m.offsetWidth,y=m.offsetHeight;if(s&&y>0){const w=Math.min(x/1920,y/1080);c(w),p({x:(x-1920*w)/2,y:(y-1080*w)/2})}else c(x/1920),p({x:0,y:0})},h=new ResizeObserver(b);return h.observe(m),b(),()=>h.disconnect()},[s]);const u=()=>{var m;document.fullscreenElement?document.exitFullscreen():(m=o.current)==null||m.requestFullscreen()};k.useEffect(()=>{const m=b=>{var x;const h=(x=b.target)==null?void 0:x.tagName;h==="INPUT"||h==="TEXTAREA"||(b.key==="ArrowRight"&&t(y=>Math.min(y+1,Ns.length-1)),b.key==="ArrowLeft"&&t(y=>Math.max(y-1,0)))};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[]);const v=Ns[e],g=Ns.length;return a.jsxs("div",{ref:o,style:{background:"#0f1117",borderRadius:s?0:16,overflow:"hidden",border:s?"none":"1.5px solid rgba(13,122,114,0.3)",boxShadow:s?"none":"0 8px 32px rgba(0,0,0,0.25)",...s?{display:"flex",flexDirection:"column",height:"100%"}:{}},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#F87171"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#FBBF24"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#34D399"}}),a.jsxs("span",{style:{marginLeft:10,fontFamily:"DM Mono, monospace",fontSize:12,color:"rgba(255,255,255,0.35)",letterSpacing:"0.06em"},children:["ER Diagrams · ",e+1," / ",g," · ← → to navigate"]})]}),a.jsxs("div",{style:{display:"flex",gap:6},children:[!s&&a.jsxs("button",{onClick:()=>n(m=>!m),style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},children:[i?a.jsx(Cn,{size:13}):a.jsx(Sn,{size:13}),i?"Collapse":"Expand"]}),a.jsxs("button",{onClick:u,style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},title:s?"Exit fullscreen":"Fullscreen",children:[s?a.jsx(Tn,{size:13}):a.jsx(En,{size:13}),s?"Exit":"Fullscreen"]})]})]}),a.jsx("div",{ref:l,style:{position:"relative",width:"100%",...s?{flex:1}:{paddingBottom:i?"75%":"56.25%",transition:"padding-bottom 0.3s ease"},overflow:"hidden",background:"#111"},children:a.jsx("div",{style:{position:"absolute",inset:0,overflow:"hidden"},children:a.jsx("div",{className:"erd",style:{width:1920,height:1080,transform:`translate(${f.x}px, ${f.y}px) scale(${d})`,transformOrigin:"top left",position:"relative"},children:a.jsx("section",{className:v.classes||void 0,style:{position:"absolute",inset:0,width:"100%",height:"100%"},dangerouslySetInnerHTML:{__html:v.html}})})})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("button",{onClick:()=>t(m=>Math.max(m-1,0)),disabled:e===0,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===0?"rgba(255,255,255,0.2)":"#fff",cursor:e===0?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:[a.jsx(wn,{size:14})," Prev"]}),a.jsx("div",{style:{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",justifyContent:"center",maxWidth:360},children:Ns.map((m,b)=>a.jsx("button",{onClick:()=>t(b),title:Ns[b].label,style:{width:b===e?20:7,height:7,borderRadius:999,background:b===e?"#0d7a72":"rgba(255,255,255,0.2)",border:"none",padding:0,cursor:"pointer",transition:"all 0.25s ease",flexShrink:0}},b))}),a.jsxs("button",{onClick:()=>t(m=>Math.min(m+1,g-1)),disabled:e===g-1,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===g-1?"rgba(255,255,255,0.2)":"#fff",cursor:e===g-1?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:["Next ",a.jsx(kn,{size:14})]})]})]})}function X5(){return a.jsx(wt,{eyebrow:"Data Modelling",titleLead:"Let's make sense of",titleAccent:"ER Diagrams.",gradient:"linear-gradient(90deg, #0d7a72, #14b8a6, #0ea5e9)",accent:"#0d7a72",orb2:"#14b8a6",orb3:"#0ea5e9",subtitle:"Before a single table exists, you sketch the world it describes. Meet entities, attributes and relationships in Chen's notation — and learn to read cardinality at a glance.",pills:[{emoji:"🔷",name:"Entities",color:"#0d7a72"},{emoji:"🟡",name:"Attributes",color:"#ca8a04"},{emoji:"◇",name:"Relationships",color:"#0ea5e9"},{emoji:"↔️",name:"1:1 · 1:N · M:N",color:"#7c3aed"}],children:a.jsx(G5,{})})}const J5=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

:root {
    --navy:   #1C1E2E;
    --navy2:  #252840;
    --white:  #F8F9FC;
    --blue:   #4A8EF5;
    --blue2:  #2563EB;
    --green:  #34D399;
    --yellow: #FBBF24;
    --red:    #F87171;
    --gray:   #6B7280;
    --gray2:  #E5E7EB;
    --code-bg:#1E1E2E;
    --sans: 'Plus Jakarta Sans', sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }
.sqld * { box-sizing: border-box; margin: 0; padding: 0; }
.sqld section {
    width: 100%; height: 100%;
    font-family: var(--sans);
    color: var(--navy);
    background: var(--white);
    display: flex; flex-direction: column;
    position: relative;
  }
.sqld section.dark {
    background: var(--navy);
    color: var(--white);
  }
.sqld section.dark .tag { background: rgba(74,142,245,.25); color: var(--blue); }
.sqld .tag {
    display: inline-block;
    background: rgba(74,142,245,.12);
    color: var(--blue2);
    font-size: 24px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    padding: 6px 18px; border-radius: 6px;
    font-family: var(--mono);
    margin-bottom: 28px;
  }
.sqld .slide-title {
    font-size: 68px; font-weight: 800; line-height: 1.1;
    letter-spacing: -.02em;
  }
.sqld .slide-subtitle {
    font-size: 36px; font-weight: 500; line-height: 1.45;
    opacity: .7; margin-top: 20px;
  }
.sqld .body-text { font-size: 34px; font-weight: 400; line-height: 1.55; }
.sqld .small-text { font-size: 28px; line-height: 1.5; }
.sqld .label { font-size: 24px; font-weight: 600; opacity: .55; text-transform: uppercase; letter-spacing: .08em; }
.sqld .pad { padding: 90px 110px 80px; }
.sqld .pad-sm { padding: 70px 110px 0; }
.sqld .col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.sqld .col3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
.sqld .gap { margin-top: 52px; }
.sqld .gap-sm { margin-top: 28px; }
.sqld .code-block {
    background: var(--code-bg);
    border-radius: 16px;
    padding: 36px 44px;
    font-family: var(--mono);
    font-size: 30px;
    line-height: 1.7;
    color: #CDD6F4;
    position: relative;
    border: 1px solid rgba(255,255,255,.06);
  }
.sqld .code-block .kw { color: #89B4FA; font-weight: 700; }
.sqld .code-block .fn { color: #94E2D5; }
.sqld .code-block .str { color: #A6E3A1; }
.sqld .code-block .num { color: #FAB387; }
.sqld .code-block .cmt { color: #585B70; font-style: italic; }
.sqld .code-block .tbl { color: #F38BA8; }
.sqld .code-block .col { color: #CBA6F7; }
.sqld .code-block .op { color: #89DCEB; }
.sqld .code-label {
    font-family: var(--mono);
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .1em;
    margin-bottom: 12px;
    opacity: .45;
  }
.sqld .result-table {
    border-radius: 12px;
    overflow: hidden;
    font-family: var(--mono);
    font-size: 26px;
    width: 100%;
    border-collapse: collapse;
  }
.sqld .result-table th {
    background: var(--blue2);
    color: #fff;
    padding: 14px 24px;
    text-align: left;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: .04em;
  }
.sqld .result-table td {
    padding: 13px 24px;
    border-bottom: 1px solid var(--gray2);
    background: #fff;
  }
.sqld .result-table tr:last-child td { border-bottom: none; }
.sqld .result-table tr:nth-child(even) td { background: #F0F4FF; }
.sqld .result-label {
    font-size: 24px; font-weight: 700; color: var(--green);
    font-family: var(--mono); text-transform: uppercase;
    letter-spacing: .08em; margin-bottom: 10px;
    display: flex; align-items: center; gap: 8px;
  }
.sqld .result-label::before { content: '▶ '; opacity: .6; }
.sqld .card {
    background: #fff;
    border-radius: 16px;
    padding: 36px;
    border: 1.5px solid var(--gray2);
  }
.sqld .card.blue-card {
    background: #EFF6FF;
    border-color: #BFDBFE;
  }
.sqld .card.green-card {
    background: #ECFDF5;
    border-color: #6EE7B7;
  }
.sqld .card.dark-card {
    background: var(--navy2);
    border-color: rgba(255,255,255,.08);
    color: var(--white);
  }
.sqld .card-title {
    font-size: 30px; font-weight: 700; margin-bottom: 12px;
  }
.sqld .card-

  
  .badge {
    display: inline-block;
    padding: 5px 16px;
    border-radius: 999px;
    font-size: 24px; font-weight: 600;
    font-family: var(--mono);
  }
.sqld .badge-blue { background: #DBEAFE; color: var(--blue2); }
.sqld .badge-green { background: #D1FAE5; color: #059669; }
.sqld .badge-red { background: #FEE2E2; color: #DC2626; }
.sqld .badge-yellow { background: #FEF3C7; color: #D97706; }
.sqld .arrow-right {
    display: flex; align-items: center;
    font-size: 32px; color: var(--blue); font-weight: 700;
    gap: 12px; margin: 16px 0;
  }
.sqld .section-num {
    font-family: var(--mono);
    font-size: 24px; font-weight: 700;
    color: var(--blue);
    letter-spacing: .15em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
.sqld .hero-num {
    font-size: 180px; font-weight: 800;
    line-height: 1; opacity: .05;
    font-family: var(--mono);
    position: absolute; right: 60px; bottom: 20px;
    color: var(--blue);
    pointer-events: none;
    z-index: 0;
  }
.sqld .db-diagram { display: flex; flex-direction: column; gap: 0; }
.sqld .db-layer {
    border-radius: 12px;
    padding: 20px 28px;
    font-family: var(--mono);
    font-size: 26px; font-weight: 600;
    text-align: center;
  }
.sqld .db-arrow {
    display: flex; justify-content: center;
    font-size: 28px; color: var(--gray); padding: 4px 0;
  }
.sqld .highlight-box {
    border-left: 5px solid var(--blue);
    padding: 20px 28px;
    background: rgba(74,142,245,.07);
    border-radius: 0 12px 12px 0;
    font-size: 30px;
    line-height: 1.5;
  }
.sqld .highlight-box.green { border-color: var(--green); background: rgba(52,211,153,.07); }
.sqld .highlight-box.yellow { border-color: var(--yellow); background: rgba(251,191,36,.07); }
.sqld .step-list { list-style: none; display: flex; flex-direction: column; gap: 24px; }
.sqld .step-list li {
    display: flex; align-items: flex-start; gap: 20px;
    font-size: 32px; line-height: 1.4;
  }
.sqld .step-num {
    min-width: 44px; height: 44px;
    background: var(--blue2); color: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 22px; font-family: var(--mono);
    margin-top: 2px; flex-shrink: 0;
  }
.sqld .dtype-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
.sqld .dtype-card {
    border-radius: 14px;
    padding: 28px 30px;
    border: 2px solid transparent;
  }
.sqld .dtype-name {
    font-family: var(--mono);
    font-size: 28px; font-weight: 700;
    margin-bottom: 8px;
  }
.sqld .dtype-desc { font-size: 25px; opacity: .75; line-height: 1.4; }
.sqld .dtype-eg { font-family: var(--mono); font-size: 24px; opacity: .55; margin-top: 6px; }
.sqld .join-circles {
    display: flex; align-items: center; justify-content: center;
    position: relative; height: 200px;
  }
.sqld .slide-footer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 0 110px;
    height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 24px;
    border-top: 1px solid rgba(0,0,0,.07);
  }
.sqld section.dark .slide-footer {
    color: var(--white);
    border-top-color: rgba(255,255,255,.08);
  }
.sqld .footer-left { display:flex; align-items:center; gap:14px; opacity:.5; white-space:nowrap; }
.sqld .footer-right { display:flex; align-items:center; gap:10px; opacity:.45; font-family:var(--mono); white-space:nowrap; }
.sqld .footer-dot { width:4px; height:4px; border-radius:50%; background:currentColor; opacity:.5; }
.sqld .code-line { display: block; }
.sqld .big-stat { font-size: 120px; font-weight: 800; line-height: 1; font-family: var(--mono); color: var(--blue); }
.sqld .where-demo { display: flex; align-items: center; gap: 32px; font-family: var(--mono); font-size: 28px; }
.sqld code {
    font-family: var(--mono);
    background: rgba(74,142,245,.12);
    color: var(--blue2);
    padding: 2px 10px;
    border-radius: 6px;
    font-size: 1em;
  }
.sqld section.dark code { background: rgba(137,180,250,.15); color: #89B4FA; }`,Ps=[{classes:"dark",label:"01 Title",html:`<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
      <!-- grid decoration -->
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="opacity:.06">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#4A8EF5" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
      <!-- glowing circle -->
      <div style="position:absolute;top:-200px;right:-100px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(74,142,245,.18) 0%,transparent 70%);"></div>
      <div style="position:absolute;bottom:-150px;left:-80px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(52,211,153,.1) 0%,transparent 70%);"></div>
    </div>

    <div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:100px 130px;">
      <div class="section-num">Database Management Systems</div>
      <div class="slide-title" style="color:#fff;font-size:90px;max-width:1100px;line-height:1.05;">
        Introduction to<br/><span style="color:var(--blue);">SQL</span> with MySQL
      </div>
      <div class="slide-subtitle" style="max-width:800px;margin-top:32px;">
        From databases to your first queries — a beginner-friendly guide to structured data.
      </div>

      <!-- terminal decoration -->
      <div style="margin-top:70px;display:flex;align-items:center;gap:16px;">
        <div style="width:14px;height:14px;border-radius:50%;background:#F87171;"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:#FBBF24;"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:#34D399;"></div>
        <div style="font-family:var(--mono);font-size:26px;color:#6B7280;margin-left:8px;">mysql&gt; <span style="color:#89B4FA;">SELECT</span> * <span style="color:#89B4FA;">FROM</span> <span style="color:#F38BA8;">knowledge</span>;<span style="animation:blink 1s step-end infinite;color:#fff;">█</span></div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"dark",label:"03 What is SQL",html:`<div class="pad" style="display:flex;flex-direction:column;height:100%;padding-bottom:88px;position:relative;">

      <div class="tag">The Language</div>
      <div class="slide-title" style="color:#fff;">What is SQL?</div>

      <div class="col2 gap" style="flex:1;">
        <div style="display:flex;flex-direction:column;gap:32px;">
          <div class="body-text" style="color:rgba(255,255,255,.85);">
            <strong style="color:#fff;">SQL</strong> (Structured Query Language) is the standard language for talking to relational databases.
          </div>

          <div style="display:flex;flex-direction:column;gap:20px;">
            <div class="card dark-card" style="border-color:rgba(74,142,245,.3);">
              <div class="card-title" style="color:var(--blue);font-family:var(--mono);">CREATE</div>
              <div class="card-body" style="color:rgba(255,255,255,.7);">Make databases and tables</div>
            </div>
            <div class="card dark-card" style="border-color:rgba(74,142,245,.3);">
              <div class="card-title" style="color:var(--green);font-family:var(--mono);">INSERT / SELECT</div>
              <div class="card-body" style="color:rgba(255,255,255,.7);">Add and read data</div>
            </div>
            <div class="card dark-card" style="border-color:rgba(74,142,245,.3);">
              <div class="card-title" style="color:var(--yellow);font-family:var(--mono);">UPDATE / DELETE</div>
              <div class="card-body" style="color:rgba(255,255,255,.7);">Modify and remove data</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;justify-content:center;gap:24px;">
          <div style="font-size:26px;color:rgba(255,255,255,.5);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">MySQL = SQL + Database Server</div>

          <!-- MySQL logo style box -->
          <div style="background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);border-radius:18px;padding:36px;display:flex;flex-direction:column;gap:20px;">
            <div style="display:flex;align-items:center;gap:20px;">
              <div style="width:60px;height:60px;background:var(--blue2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;font-family:var(--mono);">M</div>
              <div>
                <div style="font-size:32px;font-weight:700;color:#fff;">MySQL</div>
                <div style="font-size:24px;color:rgba(255,255,255,.5);">The world's most popular open-source database</div>
              </div>
            </div>
            <div style="width:100%;height:1px;background:rgba(255,255,255,.08);"></div>
            <div style="font-size:26px;color:rgba(255,255,255,.6);line-height:1.5;">
              Used by <strong style="color:#fff;">Facebook, Twitter, YouTube</strong> and thousands of other applications worldwide.
            </div>
          </div>

          <div class="highlight-box" style="border-color:var(--green);background:rgba(52,211,153,.08);">
            <span style="color:var(--green);font-weight:700;">SQL is not case-sensitive</span> — <code>SELECT</code> = <code>select</code> = <code>Select</code>. But writing keywords in UPPERCASE is standard practice.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"04 MySQL Data Types",html:`<div class="pad-sm" style="display:flex;flex-direction:column;height:100%;">
      <div class="tag">Building Blocks</div>
      <div class="slide-title">MySQL Data Types</div>
      <div class="body-text gap-sm" style="opacity:.6;">Every column in a table must have a data type — it tells MySQL <strong>what kind of value</strong> to expect.</div>

      <div class="dtype-grid gap">
        <div class="dtype-card" style="background:#EFF6FF;border-color:#BFDBFE;">
          <div class="dtype-name" style="color:var(--blue2);">INT</div>
          <div class="dtype-desc">Whole numbers</div>
          <div class="dtype-eg">e.g. 1, 25, 1000</div>
        </div>
        <div class="dtype-card" style="background:#EFF6FF;border-color:#BFDBFE;">
          <div class="dtype-name" style="color:var(--blue2);">FLOAT / DECIMAL</div>
          <div class="dtype-desc">Decimal numbers</div>
          <div class="dtype-eg">e.g. 3.14, 99.99</div>
        </div>
        <div class="dtype-card" style="background:#EFF6FF;border-color:#BFDBFE;">
          <div class="dtype-name" style="color:var(--blue2);">BIGINT</div>
          <div class="dtype-desc">Very large whole numbers</div>
          <div class="dtype-eg">e.g. 9,223,372,036…</div>
        </div>
        <div class="dtype-card" style="background:#ECFDF5;border-color:#6EE7B7;">
          <div class="dtype-name" style="color:#059669;">VARCHAR(n)</div>
          <div class="dtype-desc">Text up to <em>n</em> characters</div>
          <div class="dtype-eg">e.g. 'Alice', 'Hello'</div>
        </div>
        <div class="dtype-card" style="background:#ECFDF5;border-color:#6EE7B7;">
          <div class="dtype-name" style="color:#059669;">TEXT</div>
          <div class="dtype-desc">Long text (no length limit)</div>
          <div class="dtype-eg">e.g. blog post content</div>
        </div>
        <div class="dtype-card" style="background:#ECFDF5;border-color:#6EE7B7;">
          <div class="dtype-name" style="color:#059669;">CHAR(n)</div>
          <div class="dtype-desc">Fixed-length text</div>
          <div class="dtype-eg">e.g. country codes 'MY'</div>
        </div>
        <div class="dtype-card" style="background:#FEF3C7;border-color:#FCD34D;">
          <div class="dtype-name" style="color:#D97706;">DATE</div>
          <div class="dtype-desc">Calendar date</div>
          <div class="dtype-eg">e.g. '2024-09-01'</div>
        </div>
        <div class="dtype-card" style="background:#FEF3C7;border-color:#FCD34D;">
          <div class="dtype-name" style="color:#D97706;">DATETIME</div>
          <div class="dtype-desc">Date + time combined</div>
          <div class="dtype-eg">e.g. '2024-09-01 09:30:00'</div>
        </div>
        <div class="dtype-card" style="background:#FEE2E2;border-color:#FCA5A5;">
          <div class="dtype-name" style="color:#DC2626;">BOOLEAN</div>
          <div class="dtype-desc">True or False (1 or 0)</div>
          <div class="dtype-eg">e.g. is_active = TRUE</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"05 CREATE",html:`<div class="pad-sm" style="display:flex;flex-direction:column;height:100%;">
      <div class="tag">Command 1 of 5</div>
      <div class="slide-title">Creating Databases &amp; Tables</div>

      <div class="col2 gap" style="flex:1;align-items:start;">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="code-label">Step 1 — Create a Database</div>
          <div class="code-block">
            <span class="kw">CREATE DATABASE</span> <span class="tbl">school_db</span>;<br/>
            <span class="kw">USE</span> <span class="tbl">school_db</span>;
          </div>

          <div class="code-label" style="margin-top:12px;">Step 2 — Create a Table</div>
          <div class="code-block" style="font-size:27px;">
            <span class="kw">CREATE TABLE</span> <span class="tbl">students</span> (<br/>
            &nbsp;&nbsp;<span class="col">id</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">INT</span> <span class="kw">PRIMARY KEY</span>,<br/>
            &nbsp;&nbsp;<span class="col">name</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">VARCHAR</span>(<span class="num">100</span>),<br/>
            &nbsp;&nbsp;<span class="col">age</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">INT</span>,<br/>
            &nbsp;&nbsp;<span class="col">email</span>&nbsp;&nbsp;&nbsp;<span class="fn">VARCHAR</span>(<span class="num">150</span>),<br/>
            &nbsp;&nbsp;<span class="col">gpa</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">DECIMAL</span>(<span class="num">3</span>,<span class="num">2</span>)<br/>
            );
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="card blue-card" style="padding:28px 32px;">
            <div class="card-title" style="color:var(--blue2);font-size:26px;margin-bottom:16px;">🔑 Key Concepts</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
              <li style="display:flex;gap:14px;align-items:flex-start;font-size:26px;"><span style="color:var(--blue2);font-weight:700;font-family:var(--mono);">PRIMARY KEY</span><span style="opacity:.8;">— unique identifier for each row</span></li>
              <li style="display:flex;gap:14px;align-items:flex-start;font-size:26px;"><span style="color:var(--blue2);font-weight:700;font-family:var(--mono);">VARCHAR(n)</span><span style="opacity:.8;">— text up to <em>n</em> characters</span></li>
              <li style="display:flex;gap:14px;align-items:flex-start;font-size:26px;"><span style="color:var(--blue2);font-weight:700;font-family:var(--mono);">DECIMAL(3,2)</span><span style="opacity:.8;">— 3 digits, 2 after decimal (e.g. 3.75)</span></li>
            </ul>
          </div>

          <!-- result viz -->
          <div style="margin-top:8px;">
            <div class="result-label">Result — empty table created</div>
            <table class="result-table">
              <thead><tr><th>id</th><th>name</th><th>age</th><th>email</th><th>gpa</th></tr></thead>
              <tbody>
                <tr><td colspan="5" style="text-align:center;color:#9CA3AF;font-style:italic;padding:18px;">(no rows yet)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"06 INSERT INTO",html:`<div class="pad-sm" style="display:flex;flex-direction:column;height:100%;">
      <div class="tag">Command 2 of 5</div>
      <div class="slide-title">Inserting Data</div>

      <div class="col2 gap" style="flex:1;align-items:start;">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="code-label">Syntax</div>
          <div class="code-block" style="font-size:28px;">
            <span class="kw">INSERT INTO</span> <span class="tbl">table_name</span><br/>
            &nbsp;&nbsp;(<span class="col">column1</span>, <span class="col">column2</span>, ...)<br/>
            <span class="kw">VALUES</span><br/>
            &nbsp;&nbsp;(<span class="str">value1</span>, <span class="str">value2</span>, ...);
          </div>

          <div class="code-label" style="margin-top:12px;">Example — Insert 3 students</div>
          <div class="code-block" style="font-size:26px;">
            <span class="kw">INSERT INTO</span> <span class="tbl">students</span> (<span class="col">id</span>, <span class="col">name</span>, <span class="col">age</span>, <span class="col">email</span>, <span class="col">gpa</span>)<br/>
            <span class="kw">VALUES</span><br/>
            &nbsp;&nbsp;(<span class="num">1</span>, <span class="str">'Alice'</span>, <span class="num">20</span>, <span class="str">'alice@uni.edu'</span>, <span class="num">3.80</span>),<br/>
            &nbsp;&nbsp;(<span class="num">2</span>, <span class="str">'Bob'</span>,&nbsp;&nbsp; <span class="num">22</span>, <span class="str">'bob@uni.edu'</span>,&nbsp;&nbsp;<span class="num">3.50</span>),<br/>
            &nbsp;&nbsp;(<span class="num">3</span>, <span class="str">'Carol'</span>, <span class="num">21</span>, <span class="str">'carol@uni.edu'</span>,<span class="num">3.90</span>);
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <!-- anatomy labels -->
          <div style="background:#F8F9FC;border-radius:14px;padding:28px;border:1.5px solid var(--gray2);">
            <div style="font-size:26px;font-weight:700;margin-bottom:18px;color:var(--navy);">Anatomy of INSERT</div>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="display:flex;align-items:center;gap:14px;font-size:26px;">
                <span class="badge badge-blue">INSERT INTO</span> <span style="opacity:.7;">which table to add rows to</span>
              </div>
              <div style="display:flex;align-items:center;gap:14px;font-size:26px;">
                <span class="badge badge-blue">(columns)</span> <span style="opacity:.7;">which columns you're filling</span>
              </div>
              <div style="display:flex;align-items:center;gap:14px;font-size:26px;">
                <span class="badge badge-green">VALUES</span> <span style="opacity:.7;">the actual data — match column order!</span>
              </div>
            </div>
          </div>

          <div class="result-label">Result — students table now has rows</div>
          <table class="result-table">
            <thead><tr><th>id</th><th>name</th><th>age</th><th>gpa</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Alice</td><td>20</td><td>3.80</td></tr>
              <tr><td>2</td><td>Bob</td><td>22</td><td>3.50</td></tr>
              <tr><td>3</td><td>Carol</td><td>21</td><td>3.90</td></tr>
            </tbody>
          </table>

          <div class="highlight-box green" style="font-size:26px;">
            💡 You must supply a value for <code>id</code> — it is the PRIMARY KEY and must be unique for every row.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"dark",label:"07 SELECT",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:60px 110px 0;;padding-bottom:88px">
      <div class="tag">Command 3 of 5</div>
      <div class="slide-title" style="color:#fff;">Querying Data with SELECT</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:36px;">
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="code-label" style="color:rgba(255,255,255,.4);">Select ALL columns</div>
          <div class="code-block" style="font-size:28px;padding:24px 36px;">
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span>;
          </div>
          <div class="code-label" style="color:rgba(255,255,255,.4);">Select SPECIFIC columns</div>
          <div class="code-block" style="font-size:28px;padding:24px 36px;">
            <span class="kw">SELECT</span> <span class="col">name</span>, <span class="col">gpa</span><br/>
            <span class="kw">FROM</span> <span class="tbl">students</span>;
          </div>
          <div class="code-label" style="color:rgba(255,255,255,.4);">Select with an alias</div>
          <div class="code-block" style="font-size:28px;padding:24px 36px;">
            <span class="kw">SELECT</span> <span class="col">name</span> <span class="kw">AS</span> <span class="str">'Student Name'</span>,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="col">gpa</span>&nbsp; <span class="kw">AS</span> <span class="str">'Grade Point'</span><br/>
            <span class="kw">FROM</span> <span class="tbl">students</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);border-radius:16px;padding:22px;">
            <div style="font-size:24px;color:rgba(255,255,255,.5);font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em;">SELECT * → all columns</div>
            <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:24px;">
              <thead>
                <tr>
                  <th style="background:var(--blue2);color:#fff;padding:8px 14px;text-align:left;">id</th>
                  <th style="background:var(--blue2);color:#fff;padding:8px 14px;text-align:left;">name</th>
                  <th style="background:var(--blue2);color:#fff;padding:8px 14px;text-align:left;">age</th>
                  <th style="background:var(--blue2);color:#fff;padding:8px 14px;text-align:left;">email</th>
                  <th style="background:var(--blue2);color:#fff;padding:8px 14px;text-align:left;">gpa</th>
                </tr>
              </thead>
              <tbody>
                <tr style="color:#CDD6F4;border-bottom:1px solid rgba(255,255,255,.06);">
                  <td style="padding:7px 14px;">1</td><td style="padding:7px 14px;">Alice</td><td style="padding:7px 14px;">20</td><td style="padding:7px 14px;">alice@…</td><td style="padding:7px 14px;">3.80</td>
                </tr>
                <tr style="color:#CDD6F4;border-bottom:1px solid rgba(255,255,255,.06);">
                  <td style="padding:7px 14px;">2</td><td style="padding:7px 14px;">Bob</td><td style="padding:7px 14px;">22</td><td style="padding:7px 14px;">bob@…</td><td style="padding:7px 14px;">3.50</td>
                </tr>
                <tr style="color:#CDD6F4;">
                  <td style="padding:7px 14px;">3</td><td style="padding:7px 14px;">Carol</td><td style="padding:7px 14px;">21</td><td style="padding:7px 14px;">carol@…</td><td style="padding:7px 14px;">3.90</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);border-radius:16px;padding:22px;">
            <div style="font-size:24px;color:rgba(255,255,255,.5);font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em;">SELECT name, gpa → 2 columns only</div>
            <table style="border-collapse:collapse;font-family:var(--mono);font-size:24px;">
              <thead>
                <tr>
                  <th style="background:var(--blue2);color:#fff;padding:8px 20px;text-align:left;">name</th>
                  <th style="background:var(--blue2);color:#fff;padding:8px 20px;text-align:left;">gpa</th>
                </tr>
              </thead>
              <tbody>
                <tr style="color:#CDD6F4;border-bottom:1px solid rgba(255,255,255,.06);"><td style="padding:7px 20px;">Alice</td><td style="padding:7px 20px;">3.80</td></tr>
                <tr style="color:#CDD6F4;border-bottom:1px solid rgba(255,255,255,.06);"><td style="padding:7px 20px;">Bob</td><td style="padding:7px 20px;">3.50</td></tr>
                <tr style="color:#CDD6F4;"><td style="padding:7px 20px;">Carol</td><td style="padding:7px 20px;">3.90</td></tr>
              </tbody>
            </table>
          </div>
          <div class="highlight-box" style="border-color:var(--yellow);background:rgba(251,191,36,.08);font-size:26px;color:rgba(255,255,255,.8);">
            ⭐ Use <code>SELECT *</code> for exploration; use specific columns in real apps for speed.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"08 WHERE",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:55px 110px 0;;padding-bottom:88px">
      <div class="tag">Filtering</div>
      <div class="slide-title">Filtering with WHERE</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:28px;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="code-label">Syntax</div>
          <div class="code-block" style="font-size:27px;padding:18px 28px;line-height:1.6;">
            <span class="kw">SELECT</span> <span class="col">columns</span><br/>
            <span class="kw">FROM</span> <span class="tbl">table</span><br/>
            <span class="kw">WHERE</span> <span class="col">condition</span>;
          </div>

          <div class="code-label">Examples</div>
          <div class="code-block" style="font-size:25px;padding:18px 28px;line-height:1.6;">
            <span class="cmt">-- students older than 20</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">age</span> <span class="op">&gt;</span> <span class="num">20</span>;<br/><br/>
            <span class="cmt">-- find a specific student</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">name</span> <span class="op">=</span> <span class="str">'Alice'</span>;<br/><br/>
            <span class="cmt">-- multiple conditions</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">age</span> <span class="op">&gt;</span> <span class="num">20</span> <span class="kw">AND</span> <span class="col">gpa</span> <span class="op">&gt;=</span> <span class="num">3.70</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;">
          <div class="card" style="padding:24px 28px;">
            <div class="card-title" style="font-size:26px;margin-bottom:14px;">Comparison Operators</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-blue">=</span> equal to</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-red">!=</span> not equal</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-blue">&gt;</span> greater than</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-blue">&lt;</span> less than</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-blue">&gt;=</span> ≥</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-blue">&lt;=</span> ≤</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-green">AND</span> both true</div>
              <div style="display:flex;gap:12px;align-items:center;font-size:25px;"><span class="badge badge-yellow">OR</span> either true</div>
            </div>
          </div>

          <div>
            <div class="result-label">WHERE age &gt; 20</div>
            <table class="result-table" style="font-size:25px;">
              <thead><tr><th>id</th><th>name</th><th>age</th><th>gpa</th></tr></thead>
              <tbody>
                <tr><td>2</td><td>Bob</td><td>22</td><td>3.50</td></tr>
                <tr><td>3</td><td>Carol</td><td>21</td><td>3.90</td></tr>
              </tbody>
            </table>
          </div>

          <div class="highlight-box" style="font-size:25px;">
            💡 Use <code>LIKE '%term%'</code> to search text — e.g. <code>WHERE name LIKE 'A%'</code> finds all names starting with A.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"09 ORDER BY",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:55px 110px 0;;padding-bottom:88px">
      <div class="tag">Sorting</div>
      <div class="slide-title">Sorting with ORDER BY</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:28px;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="code-label">Syntax</div>
          <div class="code-block" style="font-size:27px;padding:18px 28px;line-height:1.6;">
            <span class="kw">SELECT</span> <span class="col">columns</span><br/>
            <span class="kw">FROM</span> <span class="tbl">table</span><br/>
            <span class="kw">ORDER BY</span> <span class="col">column</span> <span class="op">ASC</span>|<span class="op">DESC</span>;
          </div>

          <div class="code-label">Examples</div>
          <div class="code-block" style="font-size:25px;padding:18px 28px;line-height:1.6;">
            <span class="cmt">-- highest GPA first</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">ORDER BY</span> <span class="col">gpa</span> <span class="op">DESC</span>;<br/><br/>
            <span class="cmt">-- alphabetical by name</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">ORDER BY</span> <span class="col">name</span> <span class="op">ASC</span>;<br/><br/>
            <span class="cmt">-- combined with WHERE + LIMIT</span><br/>
            <span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">age</span> <span class="op">&gt;</span> <span class="num">20</span><br/>
            <span class="kw">ORDER BY</span> <span class="col">gpa</span> <span class="op">DESC</span> <span class="kw">LIMIT</span> <span class="num">10</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;">
          <div class="col2" style="gap:16px;">
            <div style="border-radius:14px;background:#EFF6FF;border:1.5px solid #BFDBFE;padding:22px 16px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:var(--blue2);margin-bottom:8px;text-align:center;">ASC</div>
              <div style="font-size:24px;color:var(--navy);opacity:.7;margin-bottom:14px;text-align:center;">Ascending (default)<br/>smallest → largest</div>
              <div style="background:#dbeafe;border-radius:8px;padding:12px 16px;font-family:var(--mono);font-size:24px;color:var(--blue2);">
                1 &nbsp;→&nbsp; 2 &nbsp;→&nbsp; 3<br/>
                A &nbsp;→&nbsp; B &nbsp;→&nbsp; C
              </div>
            </div>
            <div style="border-radius:14px;background:#ECFDF5;border:1.5px solid #6EE7B7;padding:22px 16px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#059669;margin-bottom:8px;text-align:center;">DESC</div>
              <div style="font-size:24px;color:var(--navy);opacity:.7;margin-bottom:14px;text-align:center;">Descending<br/>largest → smallest</div>
              <div style="background:#d1fae5;border-radius:8px;padding:12px 16px;font-family:var(--mono);font-size:24px;color:#059669;">
                3 &nbsp;→&nbsp; 2 &nbsp;→&nbsp; 1<br/>
                C &nbsp;→&nbsp; B &nbsp;→&nbsp; A
              </div>
            </div>
          </div>

          <div>
            <div class="result-label">ORDER BY gpa DESC</div>
            <table class="result-table" style="font-size:25px;">
              <thead><tr><th>#</th><th>name</th><th>gpa</th></tr></thead>
              <tbody>
                <tr><td>1st</td><td>Carol</td><td style="color:#059669;font-weight:700;">3.90</td></tr>
                <tr><td>2nd</td><td>Alice</td><td>3.80</td></tr>
                <tr><td>3rd</td><td>Bob</td><td style="color:#DC2626;">3.50</td></tr>
              </tbody>
            </table>
          </div>

          <div class="highlight-box green" style="font-size:25px;">
            💡 Add <code>LIMIT 10</code> at the end to get only the top N results — great for leaderboards!
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"dark",label:"10 UPDATE",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:55px 110px 0;;padding-bottom:88px">
      <div class="tag">Command 4 of 5</div>
      <div class="slide-title" style="color:#fff;">Updating Records</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:28px;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="code-label" style="color:rgba(255,255,255,.4);">Syntax</div>
          <div class="code-block" style="font-size:27px;padding:18px 28px;line-height:1.6;">
            <span class="kw">UPDATE</span> <span class="tbl">table</span><br/>
            <span class="kw">SET</span> <span class="col">column1</span> <span class="op">=</span> <span class="str">new_value</span><br/>
            <span class="kw">WHERE</span> <span class="col">condition</span>;
          </div>

          <div class="code-label" style="color:rgba(255,255,255,.4);">Examples</div>
          <div class="code-block" style="font-size:25px;padding:18px 28px;line-height:1.6;">
            <span class="cmt">-- Bob got a better grade!</span><br/>
            <span class="kw">UPDATE</span> <span class="tbl">students</span><br/>
            <span class="kw">SET</span> <span class="col">gpa</span> <span class="op">=</span> <span class="num">3.75</span><br/>
            <span class="kw">WHERE</span> <span class="col">id</span> <span class="op">=</span> <span class="num">2</span>;<br/><br/>
            <span class="cmt">-- Update multiple columns</span><br/>
            <span class="kw">UPDATE</span> <span class="tbl">students</span><br/>
            <span class="kw">SET</span> <span class="col">age</span> <span class="op">=</span> <span class="num">23</span>, <span class="col">email</span> <span class="op">=</span> <span class="str">'bob.new@uni.edu'</span><br/>
            <span class="kw">WHERE</span> <span class="col">id</span> <span class="op">=</span> <span class="num">2</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:22px;">
          <!-- before / after visual -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <div style="font-size:24px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">Before UPDATE</div>
              <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:24px;">
                <thead><tr style="background:rgba(255,255,255,.08);">
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">id</th>
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">name</th>
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">gpa</th>
                </tr></thead>
                <tbody>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:9px 16px;">1</td><td style="padding:9px 16px;">Alice</td><td style="padding:9px 16px;">3.80</td></tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#F87171;background:rgba(248,113,113,.08);"><td style="padding:9px 16px;">2</td><td style="padding:9px 16px;">Bob</td><td style="padding:9px 16px;">3.50 ←</td></tr>
                  <tr style="color:#CDD6F4;"><td style="padding:9px 16px;">3</td><td style="padding:9px 16px;">Carol</td><td style="padding:9px 16px;">3.90</td></tr>
                </tbody>
              </table>
            </div>

            <div style="display:flex;justify-content:center;font-size:36px;">↓</div>

            <div>
              <div style="font-size:24px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">After UPDATE</div>
              <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:24px;">
                <thead><tr style="background:rgba(255,255,255,.08);">
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">id</th>
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">name</th>
                  <th style="padding:10px 16px;text-align:left;color:rgba(255,255,255,.6);">gpa</th>
                </tr></thead>
                <tbody>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:9px 16px;">1</td><td style="padding:9px 16px;">Alice</td><td style="padding:9px 16px;">3.80</td></tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#34D399;background:rgba(52,211,153,.08);"><td style="padding:9px 16px;">2</td><td style="padding:9px 16px;">Bob</td><td style="padding:9px 16px;">3.75 ✓</td></tr>
                  <tr style="color:#CDD6F4;"><td style="padding:9px 16px;">3</td><td style="padding:9px 16px;">Carol</td><td style="padding:9px 16px;">3.90</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="highlight-box" style="border-color:var(--red);background:rgba(248,113,113,.1);color:rgba(255,255,255,.85);font-size:26px;">
            ⚠️ <strong style="color:var(--red);">Always use WHERE!</strong> Without it, every row gets updated — a common mistake!
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"11 DELETE",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:55px 110px 0;;padding-bottom:88px">
      <div class="tag">Command 5 of 5</div>
      <div class="slide-title">Deleting Records</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:28px;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="code-label">Syntax</div>
          <div class="code-block" style="font-size:27px;padding:18px 28px;line-height:1.6;">
            <span class="kw">DELETE FROM</span> <span class="tbl">table</span><br/>
            <span class="kw">WHERE</span> <span class="col">condition</span>;
          </div>

          <div class="code-label">Example</div>
          <div class="code-block" style="font-size:25px;padding:18px 28px;line-height:1.6;">
            <span class="cmt">-- remove one student</span><br/>
            <span class="kw">DELETE FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">id</span> <span class="op">=</span> <span class="num">2</span>;<br/><br/>
            <span class="cmt">-- remove low-GPA records</span><br/>
            <span class="kw">DELETE FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">WHERE</span> <span class="col">gpa</span> <span class="op">&lt;</span> <span class="num">3.60</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:24px;">
          <div>
            <div class="result-label">Before DELETE WHERE id = 2</div>
            <table class="result-table">
              <thead><tr><th>id</th><th>name</th><th>gpa</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Alice</td><td>3.80</td></tr>
                <tr style="background:#FEE2E2 !important;"><td><s style="color:#DC2626;">2</s></td><td><s style="color:#DC2626;">Bob</s></td><td><s style="color:#DC2626;">3.75</s></td></tr>
                <tr><td>3</td><td>Carol</td><td>3.90</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="result-label" style="color:var(--blue);">After DELETE</div>
            <table class="result-table">
              <thead><tr><th>id</th><th>name</th><th>gpa</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Alice</td><td>3.80</td></tr>
                <tr><td>3</td><td>Carol</td><td>3.90</td></tr>
              </tbody>
            </table>
          </div>

          <div style="background:#FEF3C7;border:1.5px solid #FCD34D;border-radius:14px;padding:24px 28px;">
            <div style="font-size:26px;font-weight:700;color:#D97706;margin-bottom:12px;">⚠️ DELETE vs TRUNCATE</div>
            <div style="font-size:25px;line-height:1.5;">
              <code>DELETE FROM t WHERE …</code> — removes specific rows<br/>
              <code>DELETE FROM t</code> — removes all rows (slow)<br/>
              <code>TRUNCATE TABLE t</code> — wipes all rows instantly, resets IDs
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"12 Aggregate Functions",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:45px 110px 0;padding-bottom:88px">
      <div class="tag">Going Further</div>
      <div class="slide-title">Aggregate Functions</div>
      <div class="body-text" style="opacity:.6;margin-top:12px;">Perform calculations <strong>across many rows</strong> and return a single result.</div>

      <div class="col2" style="flex:1;align-items:start;margin-top:16px;">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="code-block" style="font-size:27px;">
            <span class="cmt">-- count all students</span><br/>
            <span class="kw">SELECT</span> <span class="fn">COUNT</span>(*) <span class="kw">FROM</span> <span class="tbl">students</span>;<br/><br/>
            <span class="cmt">-- average GPA</span><br/>
            <span class="kw">SELECT</span> <span class="fn">AVG</span>(<span class="col">gpa</span>) <span class="kw">FROM</span> <span class="tbl">students</span>;<br/><br/>
            <span class="cmt">-- highest and lowest GPA</span><br/>
            <span class="kw">SELECT</span> <span class="fn">MAX</span>(<span class="col">gpa</span>), <span class="fn">MIN</span>(<span class="col">gpa</span>)<br/>
            <span class="kw">FROM</span> <span class="tbl">students</span>;<br/><br/>
            <span class="cmt">-- group by + count</span><br/>
            <span class="kw">SELECT</span> <span class="col">age</span>, <span class="fn">COUNT</span>(*) <span class="kw">AS</span> <span class="str">total</span><br/>
            <span class="kw">FROM</span> <span class="tbl">students</span><br/>
            <span class="kw">GROUP BY</span> <span class="col">age</span>;
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <!-- function cards grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div style="border-radius:14px;background:#EFF6FF;border:1.5px solid #BFDBFE;padding:24px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:var(--blue2);">COUNT()</div>
              <div style="font-size:24px;margin-top:8px;opacity:.7;">Counts number of rows</div>
              <div style="font-family:var(--mono);font-size:24px;margin-top:6px;color:var(--blue2);">→ 3</div>
            </div>
            <div style="border-radius:14px;background:#ECFDF5;border:1.5px solid #6EE7B7;padding:24px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#059669;">AVG()</div>
              <div style="font-size:24px;margin-top:8px;opacity:.7;">Average of a column</div>
              <div style="font-family:var(--mono);font-size:24px;margin-top:6px;color:#059669;">→ 3.83</div>
            </div>
            <div style="border-radius:14px;background:#FEF3C7;border:1.5px solid #FCD34D;padding:24px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#D97706;">MAX()</div>
              <div style="font-size:24px;margin-top:8px;opacity:.7;">Highest value</div>
              <div style="font-family:var(--mono);font-size:24px;margin-top:6px;color:#D97706;">→ 3.90</div>
            </div>
            <div style="border-radius:14px;background:#FEE2E2;border:1.5px solid #FCA5A5;padding:24px;">
              <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#DC2626;">MIN()</div>
              <div style="font-size:24px;margin-top:8px;opacity:.7;">Lowest value</div>
              <div style="font-family:var(--mono);font-size:24px;margin-top:6px;color:#DC2626;">→ 3.50</div>
            </div>
          </div>

          <div>
            <div class="result-label">GROUP BY age result</div>
            <table class="result-table">
              <thead><tr><th>age</th><th>total</th></tr></thead>
              <tbody>
                <tr><td>20</td><td>1</td></tr>
                <tr><td>21</td><td>1</td></tr>
                <tr><td>22</td><td>1</td></tr>
              </tbody>
            </table>
          </div>

          <div style="border-left:4px solid var(--blue);padding:12px 18px;background:rgba(74,142,245,.07);border-radius:0 8px 8px 0;font-size:25px;line-height:1.4;">
            💡 <code>GROUP BY</code> groups rows so functions run <em>per group</em>.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"dark",label:"13 Joining Tables",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:45px 110px 0;padding-bottom:88px;">
      <div class="tag">Relationships</div>
      <div class="slide-title" style="color:#fff;">Joining Tables</div>

      <div class="col2" style="flex:1;align-items:start;gap:48px;margin-top:28px;">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <!-- Two tables visual -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <div style="font-size:24px;color:rgba(255,255,255,.4);font-family:var(--mono);font-weight:600;text-transform:uppercase;margin-bottom:8px;">students</div>
              <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:24px;">
                <thead><tr style="background:var(--blue2);color:#fff;">
                  <th style="padding:8px 12px;text-align:left;">id</th>
                  <th style="padding:8px 12px;text-align:left;">name</th>
                </tr></thead>
                <tbody style="background:#0f1117;">
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:7px 12px;">1</td><td style="padding:7px 12px;">Alice</td></tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:7px 12px;">2</td><td style="padding:7px 12px;">Bob</td></tr>
                  <tr style="color:#CDD6F4;"><td style="padding:7px 12px;">3</td><td style="padding:7px 12px;">Carol</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <div style="font-size:24px;color:rgba(255,255,255,.4);font-family:var(--mono);font-weight:600;text-transform:uppercase;margin-bottom:8px;">grades</div>
              <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:24px;">
                <thead><tr style="background:#059669;color:#fff;">
                  <th style="padding:8px 12px;text-align:left;">student_id</th>
                  <th style="padding:8px 12px;text-align:left;">score</th>
                </tr></thead>
                <tbody style="background:#0f1117;">
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:7px 12px;">1</td><td style="padding:7px 12px;">88</td></tr>
                  <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:7px 12px;">2</td><td style="padding:7px 12px;">75</td></tr>
                  <tr style="color:#CDD6F4;"><td style="padding:7px 12px;">3</td><td style="padding:7px 12px;">95</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style="display:flex;justify-content:center;align-items:center;gap:16px;font-size:26px;color:rgba(255,255,255,.4);font-family:var(--mono);font-weight:600;">
            <div style="width:120px;height:120px;border-radius:50%;background:rgba(74,142,245,.25);border:2px solid var(--blue);display:flex;align-items:center;justify-content:center;font-size:24px;">students</div>
            <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.3);margin:0 -20px;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--navy2);font-weight:700;">JOIN</div>
            <div style="width:120px;height:120px;border-radius:50%;background:rgba(5,150,105,.25);border:2px solid #34D399;display:flex;align-items:center;justify-content:center;font-size:24px;">grades</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="code-label" style="color:rgba(255,255,255,.4);">INNER JOIN query</div>
          <div class="code-block" style="font-size:27px;">
            <span class="kw">SELECT</span><br/>
            &nbsp;&nbsp;<span class="tbl">s</span>.<span class="col">name</span>,<br/>
            &nbsp;&nbsp;<span class="tbl">g</span>.<span class="col">score</span><br/>
            <span class="kw">FROM</span> <span class="tbl">students</span> <span class="kw">AS</span> <span class="tbl">s</span><br/>
            <span class="kw">INNER JOIN</span> <span class="tbl">grades</span> <span class="kw">AS</span> <span class="tbl">g</span><br/>
            &nbsp;&nbsp;<span class="kw">ON</span> <span class="tbl">s</span>.<span class="col">id</span> <span class="op">=</span> <span class="tbl">g</span>.<span class="col">student_id</span>;
          </div>

          <div class="result-label">Combined result</div>
          <table style="width:100%;border-collapse:collapse;font-family:var(--mono);font-size:26px;">
            <thead><tr style="background:linear-gradient(90deg, var(--blue2) 50%, #059669 50%);color:#fff;">
              <th style="padding:10px 16px;text-align:left;background:var(--blue2);">name</th>
              <th style="padding:10px 16px;text-align:left;background:#059669;">score</th>
            </tr></thead>
            <tbody style="background:#0f1117;">
              <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:10px 16px;">Alice</td><td style="padding:10px 16px;">88</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,.06);color:#CDD6F4;"><td style="padding:10px 16px;">Bob</td><td style="padding:10px 16px;">75</td></tr>
              <tr style="color:#CDD6F4;"><td style="padding:10px 16px;">Carol</td><td style="padding:10px 16px;">95</td></tr>
            </tbody>
          </table>

          <div style="border-left:4px solid var(--blue);padding:12px 18px;background:rgba(74,142,245,.08);border-radius:0 8px 8px 0;color:rgba(255,255,255,.8);font-size:25px;line-height:1.4;">
            <strong style="color:var(--blue);">INNER JOIN</strong> returns only matching rows from <em>both</em> tables.
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`},{classes:"",label:"14 Summary",html:`<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:45px 110px 0;padding-bottom:88px;" style="display:flex;flex-direction:column;height:100%;">
      <div class="tag">Quick Reference</div>
      <div class="slide-title">Summary &amp; Quick Reference</div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;flex:1;margin-top:28px;">
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#89B4FA;">CREATE</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Make a new database or table</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">CREATE TABLE t (…);</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#A6E3A1;">INSERT</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Add rows to a table</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">INSERT INTO t (…) VALUES (…);</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#89DCEB;">SELECT</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Read / query data</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">SELECT * FROM t WHERE …;</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#FAB387;">UPDATE</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Modify existing rows</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">UPDATE t SET col=v WHERE …;</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#F38BA8;">DELETE</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Remove rows</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">DELETE FROM t WHERE …;</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#CBA6F7;">ORDER BY</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Sort results</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">ORDER BY col ASC|DESC;</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#94E2D5;">Aggregates</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Calculate across rows</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">COUNT · AVG · MAX · MIN · SUM</div>
        </div>
        <div style="border-radius:16px;background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-family:var(--mono);font-size:28px;font-weight:700;color:#F9E2AF;">JOIN</div>
          <div style="font-size:24px;opacity:.7;line-height:1.4;">Combine multiple tables</div>
          <div style="background:#0f1117;border-radius:8px;padding:12px;font-family:var(--mono);font-size:24px;color:#CDD6F4;margin-top:auto;">INNER JOIN t ON a.id=b.id;</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">
        <span style="font-weight:700;font-size:24px;">Database Management Systems</span>
      </div>
      <div class="footer-right">
        <span>© Yasas Sri Wickramasinghe</span>
        <span class="footer-dot"></span>
        <span>All Rights Reserved</span>
      </div>
    </div>`}];function Z5(){const[e,t]=k.useState(0),[i,n]=k.useState(!1),[s,r]=k.useState(!1),o=k.useRef(null),l=k.useRef(null),[d,c]=k.useState(.5),[f,p]=k.useState({x:0,y:0});k.useEffect(()=>{const m="sql-deck-styles";if(!document.getElementById(m)){const b=document.createElement("style");b.id=m,b.textContent=J5,document.head.appendChild(b)}return()=>{var b;(b=document.getElementById("sql-deck-styles"))==null||b.remove()}},[]),k.useEffect(()=>{const m=()=>r(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",m),()=>document.removeEventListener("fullscreenchange",m)},[]),k.useEffect(()=>{const m=l.current;if(!m)return;const b=()=>{const x=m.offsetWidth,y=m.offsetHeight;if(s&&y>0){const w=Math.min(x/1920,y/1080);c(w),p({x:(x-1920*w)/2,y:(y-1080*w)/2})}else c(x/1920),p({x:0,y:0})},h=new ResizeObserver(b);return h.observe(m),b(),()=>h.disconnect()},[s]);const u=()=>{var m;document.fullscreenElement?document.exitFullscreen():(m=o.current)==null||m.requestFullscreen()};k.useEffect(()=>{const m=b=>{var x;const h=(x=b.target)==null?void 0:x.tagName;h==="INPUT"||h==="TEXTAREA"||(b.key==="ArrowRight"&&t(y=>Math.min(y+1,Ps.length-1)),b.key==="ArrowLeft"&&t(y=>Math.max(y-1,0)))};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[]);const v=Ps[e],g=Ps.length;return a.jsxs("div",{ref:o,style:{background:"#0f1117",borderRadius:s?0:16,overflow:"hidden",border:s?"none":"1.5px solid rgba(74,142,245,0.2)",boxShadow:s?"none":"0 8px 32px rgba(0,0,0,0.25)",...s?{display:"flex",flexDirection:"column",height:"100%"}:{}},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#F87171"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#FBBF24"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#34D399"}}),a.jsxs("span",{style:{marginLeft:10,fontFamily:"JetBrains Mono, monospace",fontSize:12,color:"rgba(255,255,255,0.35)",letterSpacing:"0.06em"},children:["SQL Deck · ",e+1," / ",g," · ← → to navigate"]})]}),a.jsxs("div",{style:{display:"flex",gap:6},children:[!s&&a.jsxs("button",{onClick:()=>n(m=>!m),style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},children:[i?a.jsx(Cn,{size:13}):a.jsx(Sn,{size:13}),i?"Collapse":"Expand"]}),a.jsxs("button",{onClick:u,style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},title:s?"Exit fullscreen":"Fullscreen",children:[s?a.jsx(Tn,{size:13}):a.jsx(En,{size:13}),s?"Exit":"Fullscreen"]})]})]}),a.jsx("div",{ref:l,style:{position:"relative",width:"100%",...s?{flex:1}:{paddingBottom:i?"75%":"56.25%",transition:"padding-bottom 0.3s ease"},overflow:"hidden",background:"#0f1117"},children:a.jsx("div",{style:{position:"absolute",inset:0,overflow:"hidden"},children:a.jsx("div",{className:"sqld",style:{width:1920,height:1080,transform:`translate(${f.x}px, ${f.y}px) scale(${d})`,transformOrigin:"top left",position:"relative"},children:a.jsx("section",{className:v.classes||void 0,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"flex",flexDirection:"column"},dangerouslySetInnerHTML:{__html:v.html}})})})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("button",{onClick:()=>t(m=>Math.max(m-1,0)),disabled:e===0,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===0?"rgba(255,255,255,0.2)":"#fff",cursor:e===0?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:[a.jsx(wn,{size:14})," Prev"]}),a.jsx("div",{style:{display:"flex",gap:5,alignItems:"center"},children:Ps.map((m,b)=>a.jsx("button",{onClick:()=>t(b),title:Ps[b].label,style:{width:b===e?22:8,height:8,borderRadius:999,background:b===e?"#4A8EF5":"rgba(255,255,255,0.2)",border:"none",padding:0,cursor:"pointer",transition:"all 0.25s ease",flexShrink:0}},b))}),a.jsxs("button",{onClick:()=>t(m=>Math.min(m+1,g-1)),disabled:e===g-1,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===g-1?"rgba(255,255,255,0.2)":"#fff",cursor:e===g-1?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:["Next ",a.jsx(kn,{size:14})]})]})]})}function ew(){return a.jsx(wt,{eyebrow:"SQL Programming",titleLead:"Let's make sense of",titleAccent:"SQL.",gradient:"linear-gradient(90deg, #2563eb, #4a8ef5, #22d3ee)",accent:"#2563eb",orb2:"#22d3ee",orb3:"#7c3aed",subtitle:"The language databases actually speak. Create a database, build a table, drop in some rows, then ask it questions — one interactive slide at a time.",pills:[{emoji:"🗄️",name:"CREATE",color:"#2563eb"},{emoji:"➕",name:"INSERT",color:"#0891b2"},{emoji:"🔍",name:"SELECT",color:"#7c3aed"},{emoji:"⌨️",name:"Live syntax",color:"#0d9488"}],children:a.jsx(Z5,{})})}const tw=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

.era *{box-sizing:border-box;margin:0;padding:0}
.era section{width:1920px;height:1080px;position:relative;overflow:hidden;display:flex;flex-direction:column}
.era .cr{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-size:14px;letter-spacing:.04em;pointer-events:none}
.era .cr-light{color:rgba(255,255,255,.35)}
.era .cr-dark{color:#94a3b8}

.era .s-title{background:#0b1728;justify-content:center;align-items:center}
.era .s-title .inner{text-align:center}
.era .s-title .eyebrow{font-size:24px;letter-spacing:.18em;text-transform:uppercase;color:#60a5fa;margin-bottom:28px;font-weight:500}
.era .s-title h1{font-family:'Playfair Display',serif;font-size:90px;color:#f8fafc;line-height:1.05;margin-bottom:32px}
.era .s-title .sub{font-size:26px;color:#94a3b8;font-weight:300;letter-spacing:.03em}
.era .s-title .deco-line{width:120px;height:3px;background:#60a5fa;margin:36px auto}

.era .s-legend{background:#0d1f36}
.era .s-legend .leg-header{padding:52px 100px 0}
.era .s-legend .leg-header h2{font-family:'Playfair Display',serif;font-size:48px;color:#f1f5f9}

.era .s-act{background:#fdfaf5}
.era .s-act .act-top{display:flex;height:100%}
.era .s-act .act-left{width:840px;flex-shrink:0;padding:70px 80px 70px 90px;display:flex;flex-direction:column;border-right:1px solid #e8e0d4}
.era .s-act .act-right{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;position:relative}
.era .act-badge{display:inline-flex;align-items:center;gap:10px;padding:8px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px;width:fit-content}
.era .act-left h2{font-family:'Playfair Display',serif;font-size:46px;color:#0f172a;line-height:1.1;margin-bottom:32px}
.era .scenario-text{font-size:21px;color:#334155;line-height:1.7;margin-bottom:32px;flex:1}
.era .scenario-text strong{color:#0f172a;font-weight:600}
.era .entities-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px}
.era .entity-pill{padding:6px 18px;border-radius:6px;font-size:15px;font-weight:600;letter-spacing:.03em}
.era .task-card{border-radius:12px;padding:24px 30px;border-left:5px solid}
.era .task-card .task-title{font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}
.era .task-card ul{list-style:none;padding:0}
.era .task-card ul li{font-size:18px;color:#1e293b;padding:4px 0;display:flex;align-items:flex-start;gap:10px}
.era .task-card ul li::before{content:'→';font-weight:700;flex-shrink:0;margin-top:1px}

.era .s-ans{background:#f4f6fb}
.era .ans-header{padding:0 90px;height:96px;display:flex;align-items:center;gap:20px;border-bottom:2px solid #dde3f5;flex-shrink:0;background:#fff}
.era .ans-badge{padding:7px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.era .ans-header h2{font-family:'Playfair Display',serif;font-size:36px;color:#0f172a}
.era .ans-header .micro-legend{margin-left:auto;display:flex;gap:28px;align-items:center}
.era .micro-legend-item{display:flex;align-items:center;gap:10px;font-size:16px;color:#475569;font-weight:500}
.era .ml-entity{width:36px;height:20px;background:#1e40af;border-radius:2px}
.era .ml-rel{width:20px;height:20px;background:#92400e;transform:rotate(45deg);flex-shrink:0}
.era .ml-attr{width:40px;height:22px;border:2px solid #64748b;border-radius:50%}
.era .ans-diagram{flex:1;display:flex;align-items:center;justify-content:center;padding:24px 70px 56px;min-height:0}
.era .ans-diagram svg{width:100%;height:100%;display:block;overflow:visible}
.era .et{font:700 22px 'DM Sans',sans-serif;fill:white}
.era .rt{font:700 18px 'DM Sans',sans-serif;fill:white}
.era .at{font:500 17px 'DM Sans',sans-serif;fill:#1e293b}
.era .ct{font:700 28px 'DM Sans',sans-serif}
.era .ln{stroke:#94a3b8;stroke-width:2.5;fill:none}`,Ls=[{classes:"s-title",label:"01 Title",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="120" r="320" fill="rgba(96,165,250,0.05)"/>
  <circle cx="1750" cy="180" r="180" fill="rgba(96,165,250,0.07)"/>
  <circle cx="200"  cy="950" r="280" fill="rgba(96,165,250,0.04)"/>
  <pattern id="era-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
    <circle cx="30" cy="30" r="1.5" fill="rgba(148,163,184,0.2)"/>
  </pattern>
  <rect width="1920" height="1080" fill="url(#era-dots)"/>
</svg>
<div class="inner">
  <p class="eyebrow">Database Design · Activity Series</p>
  <h1>ER Diagram<br/>Activities</h1>
  <div class="deco-line"></div>
  <p class="sub">Chen's Notation · 5 Real-World Scenarios</p>
</div>
<div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-legend",label:"02 Notation Legend",html:`<div class="leg-header">
  <h2>Chen's Notation — Symbol Reference</h2>
  <p style="font-size:24px;color:#64748b;margin-top:8px">Use this guide while completing each activity</p>
</div>
<svg viewBox="0 0 1720 760" style="width:100%;flex:1;padding:0 40px">
  <g transform="translate(170,130)">
    <rect x="-85" y="-36" width="170" height="72" rx="3" fill="#1e40af"/>
    <text text-anchor="middle" dy="7" font-family="'DM Sans',sans-serif" font-size="20" fill="white" font-weight="700">ENTITY</text>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Entity</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">A real-world object or concept</text>
  </g>
  <g transform="translate(530,130)">
    <rect x="-85" y="-36" width="170" height="72" rx="3" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
    <rect x="-77" y="-28" width="154" height="56" rx="2" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
    <text text-anchor="middle" dy="7" font-family="'DM Sans',sans-serif" font-size="18" fill="#60a5fa" font-weight="700">ENTITY</text>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Weak Entity</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Depends on a strong entity</text>
  </g>
  <g transform="translate(900,130)">
    <polygon points="0,-60 110,0 0,60 -110,0" fill="#92400e"/>
    <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="18" fill="white" font-weight="700">REL</text>
    <text x="0" y="84" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Relationship</text>
    <text x="0" y="108" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Association between entities</text>
  </g>
  <g transform="translate(1320,130)">
    <polygon points="0,-60 110,0 0,60 -110,0" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
    <polygon points="0,-50 94,0 0,50 -94,0" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
    <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="14" fill="#f59e0b" font-weight="700">REL</text>
    <text x="0" y="84" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Identifying Rel.</text>
    <text x="0" y="108" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Links weak entity to strong</text>
  </g>
  <line x1="100" y1="310" x2="1620" y2="310" stroke="#1e3a5a" stroke-width="1"/>
  <g transform="translate(170,420)">
    <ellipse rx="85" ry="36" fill="white" stroke="#475569" stroke-width="2"/>
    <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="16" fill="#1e293b">attribute</text>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Attribute</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Property of an entity</text>
  </g>
  <g transform="translate(530,420)">
    <ellipse rx="85" ry="36" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
    <text text-anchor="middle" dy="2" font-family="'DM Sans',sans-serif" font-size="16" fill="#1e293b" font-weight="600">attribute</text>
    <line x1="-45" y1="10" x2="45" y2="10" stroke="#1e293b" stroke-width="2"/>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Key Attribute</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Uniquely identifies entity (PK)</text>
  </g>
  <g transform="translate(900,420)">
    <ellipse rx="85" ry="36" fill="none" stroke="#475569" stroke-width="2"/>
    <ellipse rx="73" ry="25" fill="white" stroke="#475569" stroke-width="2"/>
    <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="14" fill="#1e293b">{attribute}</text>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Multi-valued</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Can have multiple values</text>
  </g>
  <g transform="translate(1320,420)">
    <ellipse rx="85" ry="36" fill="none" stroke="#475569" stroke-width="2" stroke-dasharray="8,5"/>
    <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="16" fill="#475569" font-style="italic">attribute</text>
    <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Derived Attribute</text>
    <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Calculated from other attributes</text>
  </g>
  <g transform="translate(100,630)">
    <text font-family="'DM Sans',sans-serif" font-size="16" fill="#64748b" font-weight="500">CARDINALITY NOTATION</text>
    <line x1="0" y1="40" x2="220" y2="40" stroke="#475569" stroke-width="2"/>
    <text x="10"  y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#1e40af" font-weight="700">1</text>
    <text x="210" y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#1e40af" font-weight="700">1</text>
    <text x="110" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">One-to-One (1:1)</text>
    <line x1="340" y1="40" x2="560" y2="40" stroke="#475569" stroke-width="2"/>
    <text x="350" y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#1e40af" font-weight="700">1</text>
    <text x="550" y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#dc2626" font-weight="700">N</text>
    <text x="450" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">One-to-Many (1:N)</text>
    <line x1="680" y1="40" x2="900" y2="40" stroke="#475569" stroke-width="2"/>
    <text x="690" y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#dc2626" font-weight="700">M</text>
    <text x="890" y="68" font-family="'DM Sans',sans-serif" font-size="22" fill="#dc2626" font-weight="700">N</text>
    <text x="790" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">Many-to-Many (M:N)</text>
  </g>
</svg>
<div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"03 Activity 1 – Library",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.4" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="540" r="500" fill="none" stroke="#bfdbfe" stroke-width="1"/>
  <circle cx="1700" cy="540" r="340" fill="none" stroke="#bfdbfe" stroke-width="1"/>
  <circle cx="1700" cy="540" r="180" fill="none" stroke="#bfdbfe" stroke-width="1"/>
</svg>
<div class="act-top">
  <div class="act-left">
    <div class="act-badge" style="background:#dbeafe;color:#1d4ed8;">Activity 01</div>
    <h2>Library Management System</h2>
    <p class="scenario-text">A <strong>library</strong> lends books to its members. Each <strong>book</strong> has an ISBN, title, and genre. Each <strong>member</strong> has a member ID, name, and email address.<br><br>A member can <strong>borrow</strong> multiple books over time, and the same book may be borrowed by many different members. Each borrowing transaction records a <em>borrow date</em> and a <em>return date</em>.</p>
    <div class="entities-row">
      <span class="entity-pill" style="background:#dbeafe;color:#1e40af;">MEMBER</span>
      <span class="entity-pill" style="background:#dbeafe;color:#1e40af;">BOOK</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">BORROWS</span>
    </div>
    <div class="task-card" style="background:#eff6ff;border-color:#1d4ed8;">
      <div class="task-title" style="color:#1d4ed8;">Your Task</div>
      <ul>
        <li>Identify all entities and their attributes</li>
        <li>Mark each primary key (underline it)</li>
        <li>Draw the BORROWS relationship with correct cardinality</li>
        <li>Add relationship attributes (BorrowDate, ReturnDate)</li>
      </ul>
    </div>
  </div>
  <div class="act-right">
    <svg viewBox="0 0 420 380" style="width:380px;height:auto">
      <rect x="20" y="310" width="380" height="16" rx="4" fill="#d1c4a8"/>
      <rect x="40"  y="140" width="52" height="172" rx="4" fill="#1d4ed8"/>
      <rect x="100" y="110" width="44" height="200" rx="4" fill="#7c3aed"/>
      <rect x="152" y="150" width="38" height="160" rx="4" fill="#dc2626"/>
      <rect x="198" y="125" width="50" height="185" rx="4" fill="#059669"/>
      <rect x="256" y="155" width="42" height="155" rx="4" fill="#d97706"/>
      <rect x="306" y="130" width="46" height="180" rx="4" fill="#0891b2"/>
      <g transform="translate(90,260)">
        <path d="M0,0 Q30,-20 60,0 Q90,-20 120,0 L120,60 Q90,40 60,60 Q30,40 0,60 Z" fill="#fef9ee" stroke="#d1c4a8" stroke-width="1.5"/>
        <line x1="60" y1="0" x2="60" y2="60" stroke="#d1c4a8" stroke-width="1"/>
        <line x1="10" y1="20" x2="55" y2="22" stroke="#cbd5e1" stroke-width="1"/>
        <line x1="10" y1="30" x2="55" y2="32" stroke="#cbd5e1" stroke-width="1"/>
        <line x1="65" y1="20" x2="110" y2="22" stroke="#cbd5e1" stroke-width="1"/>
        <line x1="65" y1="30" x2="110" y2="32" stroke="#cbd5e1" stroke-width="1"/>
      </g>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"04 Answer 1 – Library",html:`<div class="ans-header">
  <span class="ans-badge" style="background:#dbeafe;color:#1d4ed8;">Answer 01</span>
  <h2>Library Management System</h2>
  <div class="micro-legend">
    <div class="micro-legend-item"><div class="ml-entity"></div> Entity</div>
    <div class="micro-legend-item"><div class="ml-rel"></div> Relationship</div>
    <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
  </div>
</div>
<div class="ans-diagram">
  <svg viewBox="0 0 1720 600" preserveAspectRatio="xMidYMid meet">
    <line x1="295" y1="300" x2="855" y2="300" class="ln"/>
    <line x1="855" y1="300" x2="1415" y2="300" class="ln"/>
    <line x1="295" y1="300" x2="100" y2="115" class="ln"/>
    <line x1="295" y1="300" x2="48"  y2="300" class="ln"/>
    <line x1="295" y1="300" x2="100" y2="485" class="ln"/>
    <line x1="855" y1="300" x2="625" y2="95"  class="ln"/>
    <line x1="855" y1="300" x2="1085" y2="95" class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="115" class="ln"/>
    <line x1="1415" y1="300" x2="1662" y2="300" class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="485" class="ln"/>
    <polygon points="855,228 970,300 855,372 740,300" fill="#92400e"/>
    <text x="855" y="306" text-anchor="middle" class="rt">BORROWS</text>
    <rect x="195" y="265" width="200" height="70" rx="3" fill="#1e40af"/>
    <text x="295" y="306" text-anchor="middle" class="et">MEMBER</text>
    <rect x="1315" y="265" width="200" height="70" rx="3" fill="#1e40af"/>
    <text x="1415" y="306" text-anchor="middle" class="et">BOOK</text>
    <ellipse cx="100" cy="100" rx="95" ry="36" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
    <text x="100" y="97" text-anchor="middle" class="at" font-weight="600">MemberID</text>
    <line x1="28" y1="108" x2="172" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="48" cy="300" rx="80" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="48" y="305" text-anchor="middle" class="at">Name</text>
    <ellipse cx="100" cy="490" rx="80" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="100" y="495" text-anchor="middle" class="at">Email</text>
    <ellipse cx="625"  cy="78" rx="105" ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="625"  y="83" text-anchor="middle" class="at">BorrowDate</text>
    <ellipse cx="1085" cy="78" rx="105" ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1085" y="83" text-anchor="middle" class="at">ReturnDate</text>
    <ellipse cx="1610" cy="100" rx="82" ry="36" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
    <text x="1610" y="97" text-anchor="middle" class="at" font-weight="600">ISBN</text>
    <line x1="1546" y1="108" x2="1674" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1662" cy="300" rx="78" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1662" y="305" text-anchor="middle" class="at">Title</text>
    <ellipse cx="1610" cy="490" rx="78" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1610" y="495" text-anchor="middle" class="at">Genre</text>
    <text x="590"  y="275" text-anchor="middle" class="ct" fill="#1d4ed8">M</text>
    <text x="1120" y="275" text-anchor="middle" class="ct" fill="#1d4ed8">N</text>
  </svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"05 Activity 2 – University",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.3" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="540" r="500" fill="none" stroke="#ddd6fe" stroke-width="1"/>
  <circle cx="1700" cy="540" r="340" fill="none" stroke="#ddd6fe" stroke-width="1"/>
  <circle cx="1700" cy="540" r="180" fill="none" stroke="#ddd6fe" stroke-width="1"/>
</svg>
<div class="act-top">
  <div class="act-left">
    <div class="act-badge" style="background:#ede9fe;color:#7c3aed;">Activity 02</div>
    <h2>University Course Enrollment</h2>
    <p class="scenario-text">A <strong>university</strong> manages student enrollments in courses. Each <strong>student</strong> has a student ID, full name, and GPA. Each <strong>course</strong> has a course code, title, and number of credits.<br><br>Students can <strong>enroll in</strong> multiple courses each semester, and each course can have many students enrolled. The enrollment records the <em>semester</em> and <em>grade</em> the student received.</p>
    <div class="entities-row">
      <span class="entity-pill" style="background:#ede9fe;color:#7c3aed;">STUDENT</span>
      <span class="entity-pill" style="background:#ede9fe;color:#7c3aed;">COURSE</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">ENROLLS_IN</span>
    </div>
    <div class="task-card" style="background:#f5f3ff;border-color:#7c3aed;">
      <div class="task-title" style="color:#7c3aed;">Your Task</div>
      <ul>
        <li>Identify all entities and their key attributes</li>
        <li>Determine the cardinality of the enrollment relationship</li>
        <li>Add Semester and Grade as relationship attributes</li>
        <li>Underline the primary key in each entity</li>
      </ul>
    </div>
  </div>
  <div class="act-right">
    <svg viewBox="0 0 400 360" style="width:360px;height:auto">
      <rect x="60" y="160" width="280" height="160" fill="#7c3aed" rx="4"/>
      <rect x="80"  y="160" width="20" height="160" fill="rgba(255,255,255,0.1)"/>
      <rect x="130" y="160" width="20" height="160" fill="rgba(255,255,255,0.1)"/>
      <rect x="250" y="160" width="20" height="160" fill="rgba(255,255,255,0.1)"/>
      <rect x="300" y="160" width="20" height="160" fill="rgba(255,255,255,0.1)"/>
      <rect x="95"  y="190" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="150" y="190" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="215" y="190" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="270" y="190" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="95"  y="240" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="150" y="240" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="215" y="240" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="270" y="240" width="35" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="175" y="280" width="50" height="40" rx="3" fill="#4c1d95"/>
      <polygon points="40,160 200,60 360,160" fill="#5b21b6"/>
      <rect x="80"  y="130" width="16" height="30" fill="#6d28d9"/>
      <rect x="180" y="100" width="16" height="60" fill="#6d28d9"/>
      <rect x="304" y="130" width="16" height="30" fill="#6d28d9"/>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"06 Answer 2 – University",html:`<div class="ans-header">
  <span class="ans-badge" style="background:#ede9fe;color:#7c3aed;">Answer 02</span>
  <h2>University Course Enrollment</h2>
  <div class="micro-legend">
    <div class="micro-legend-item"><div class="ml-entity"></div> Entity</div>
    <div class="micro-legend-item"><div class="ml-rel"></div> Relationship</div>
    <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
  </div>
</div>
<div class="ans-diagram">
  <svg viewBox="0 0 1720 600" preserveAspectRatio="xMidYMid meet">
    <line x1="295" y1="300" x2="855" y2="300" class="ln"/>
    <line x1="855" y1="300" x2="1415" y2="300" class="ln"/>
    <line x1="295" y1="300" x2="100" y2="115" class="ln"/>
    <line x1="295" y1="300" x2="48"  y2="300" class="ln"/>
    <line x1="295" y1="300" x2="100" y2="485" class="ln"/>
    <line x1="855" y1="300" x2="625" y2="95"  class="ln"/>
    <line x1="855" y1="300" x2="1085" y2="95" class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="115" class="ln"/>
    <line x1="1415" y1="300" x2="1662" y2="300" class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="485" class="ln"/>
    <polygon points="855,228 970,300 855,372 740,300" fill="#6d28d9"/>
    <text x="855" y="298" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="white" font-weight="700">ENROLLS</text>
    <text x="855" y="317" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="white" font-weight="700">_IN</text>
    <rect x="195" y="265" width="200" height="70" rx="3" fill="#6d28d9"/>
    <text x="295" y="306" text-anchor="middle" class="et">STUDENT</text>
    <rect x="1315" y="265" width="200" height="70" rx="3" fill="#6d28d9"/>
    <text x="1415" y="306" text-anchor="middle" class="et">COURSE</text>
    <ellipse cx="100" cy="100" rx="100" ry="36" fill="#ede9fe" stroke="#6d28d9" stroke-width="2.5"/>
    <text x="100" y="97" text-anchor="middle" class="at" font-weight="600">StudentID</text>
    <line x1="24"  y1="108" x2="176" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="48"  cy="300" rx="78" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="48"  y="305" text-anchor="middle" class="at">Name</text>
    <ellipse cx="100" cy="490" rx="78" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="100" y="495" text-anchor="middle" class="at">GPA</text>
    <ellipse cx="625"  cy="78" rx="105" ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="625"  y="83" text-anchor="middle" class="at">Semester</text>
    <ellipse cx="1085" cy="78" rx="90"  ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1085" y="83" text-anchor="middle" class="at">Grade</text>
    <ellipse cx="1610" cy="100" rx="105" ry="36" fill="#ede9fe" stroke="#6d28d9" stroke-width="2.5"/>
    <text x="1610" y="97" text-anchor="middle" class="at" font-weight="600">CourseCode</text>
    <line x1="1530" y1="108" x2="1690" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1662" cy="300" rx="78" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1662" y="305" text-anchor="middle" class="at">Title</text>
    <ellipse cx="1610" cy="490" rx="85" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1610" y="495" text-anchor="middle" class="at">Credits</text>
    <text x="590"  y="275" text-anchor="middle" class="ct" fill="#7c3aed">M</text>
    <text x="1120" y="275" text-anchor="middle" class="ct" fill="#7c3aed">N</text>
  </svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"07 Activity 3 – Hospital",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.3" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="540" r="500" fill="none" stroke="#fecaca" stroke-width="1"/>
  <circle cx="1700" cy="540" r="320" fill="none" stroke="#fecaca" stroke-width="1"/>
</svg>
<div class="act-top">
  <div class="act-left">
    <div class="act-badge" style="background:#fee2e2;color:#dc2626;">Activity 03</div>
    <h2>Hospital Patient Management</h2>
    <p class="scenario-text">A <strong>hospital</strong> manages doctors, patients, and departments. Each <strong>doctor</strong> has a doctor ID, name, and specialization. Each <strong>patient</strong> has a patient ID, name, and date of birth. Each <strong>department</strong> has a department ID and name.<br><br>Each doctor <strong>works in</strong> exactly one department (a department has many doctors). Doctors can <strong>treat</strong> many patients, and patients may be treated by many doctors. Each treatment records a <em>treatment date</em>.</p>
    <div class="entities-row">
      <span class="entity-pill" style="background:#fee2e2;color:#dc2626;">DOCTOR</span>
      <span class="entity-pill" style="background:#fee2e2;color:#dc2626;">PATIENT</span>
      <span class="entity-pill" style="background:#fee2e2;color:#dc2626;">DEPARTMENT</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">WORKS_IN</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">TREATS</span>
    </div>
    <div class="task-card" style="background:#fff1f2;border-color:#dc2626;">
      <div class="task-title" style="color:#dc2626;">Your Task</div>
      <ul>
        <li>Draw all three entities with their attributes and PKs</li>
        <li>Show WORKS_IN (M:1) between DOCTOR and DEPARTMENT</li>
        <li>Show TREATS (M:N) between DOCTOR and PATIENT</li>
        <li>Add TreatmentDate as a relationship attribute on TREATS</li>
      </ul>
    </div>
  </div>
  <div class="act-right">
    <svg viewBox="0 0 380 360" style="width:340px;height:auto">
      <rect x="60" y="120" width="260" height="210" fill="#dc2626" rx="4"/>
      <rect x="80"  y="145" width="45" height="40" rx="2" fill="#fca5a5"/>
      <rect x="167" y="145" width="45" height="40" rx="2" fill="#fca5a5"/>
      <rect x="255" y="145" width="45" height="40" rx="2" fill="#fca5a5"/>
      <rect x="80"  y="207" width="45" height="40" rx="2" fill="#fca5a5"/>
      <rect x="255" y="207" width="45" height="40" rx="2" fill="#fca5a5"/>
      <rect x="158" y="270" width="64" height="60" rx="3" fill="#991b1b"/>
      <rect x="40" y="108" width="300" height="20" rx="3" fill="#b91c1c"/>
      <line x1="190" y1="20" x2="190" y2="110" stroke="#b91c1c" stroke-width="3"/>
      <rect x="190" y="20" width="40" height="24" fill="#fca5a5" rx="2"/>
      <rect x="20" y="328" width="340" height="12" rx="4" fill="#d1c4a8"/>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"08 Answer 3 – Hospital",html:`<div class="ans-header">
  <span class="ans-badge" style="background:#fee2e2;color:#dc2626;">Answer 03</span>
  <h2>Hospital Patient Management</h2>
  <div class="micro-legend">
    <div class="micro-legend-item"><div class="ml-entity"></div> Entity</div>
    <div class="micro-legend-item"><div class="ml-rel"></div> Relationship</div>
    <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
  </div>
</div>
<div class="ans-diagram">
  <svg viewBox="0 0 1760 640" preserveAspectRatio="xMidYMid meet">
    <line x1="280" y1="440" x2="600" y2="270" class="ln"/>
    <line x1="600" y1="270" x2="1000" y2="170" class="ln"/>
    <line x1="280" y1="440" x2="860" y2="440" class="ln"/>
    <line x1="860" y1="440" x2="1440" y2="440" class="ln"/>
    <line x1="280" y1="440" x2="85"  y2="290" class="ln"/>
    <line x1="280" y1="440" x2="45"  y2="440" class="ln"/>
    <line x1="280" y1="440" x2="85"  y2="580" class="ln"/>
    <line x1="1000" y1="170" x2="840" y2="58"  class="ln"/>
    <line x1="1000" y1="170" x2="1200" y2="75" class="ln"/>
    <line x1="1440" y1="440" x2="1635" y2="290" class="ln"/>
    <line x1="1440" y1="440" x2="1675" y2="440" class="ln"/>
    <line x1="1440" y1="440" x2="1635" y2="580" class="ln"/>
    <line x1="860" y1="440" x2="860" y2="560" class="ln"/>
    <polygon points="600,200 690,270 600,340 510,270" fill="#b91c1c"/>
    <text x="600" y="266" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="white" font-weight="700">WORKS</text>
    <text x="600" y="283" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="white" font-weight="700">_IN</text>
    <polygon points="860,372 960,440 860,508 760,440" fill="#b91c1c"/>
    <text x="860" y="446" text-anchor="middle" class="rt">TREATS</text>
    <rect x="180" y="405" width="200" height="70" rx="3" fill="#dc2626"/>
    <text x="280" y="446" text-anchor="middle" class="et">DOCTOR</text>
    <rect x="900" y="135" width="200" height="70" rx="3" fill="#dc2626"/>
    <text x="1000" y="176" text-anchor="middle" class="et">DEPARTMENT</text>
    <rect x="1340" y="405" width="200" height="70" rx="3" fill="#dc2626"/>
    <text x="1440" y="446" text-anchor="middle" class="et">PATIENT</text>
    <ellipse cx="85"  cy="272" rx="95"  ry="34" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <text x="85"  y="269" text-anchor="middle" class="at" font-weight="600">DoctorID</text>
    <line x1="14"  y1="278" x2="156" y2="278" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="45"  cy="440" rx="72"  ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="45"  y="445" text-anchor="middle" class="at">Name</text>
    <ellipse cx="85"  cy="590" rx="108" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="85"  y="595" text-anchor="middle" class="at">Specialization</text>
    <ellipse cx="840"  cy="40" rx="88"  ry="34" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <text x="840"  y="37" text-anchor="middle" class="at" font-weight="600">DeptID</text>
    <line x1="776"  y1="46" x2="904" y2="46" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1210" cy="55" rx="100" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1210" y="60" text-anchor="middle" class="at">DeptName</text>
    <ellipse cx="1635" cy="272" rx="95"  ry="34" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <text x="1635" y="269" text-anchor="middle" class="at" font-weight="600">PatientID</text>
    <line x1="1564" y1="278" x2="1706" y2="278" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1675" cy="440" rx="72"  ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1675" y="445" text-anchor="middle" class="at">Name</text>
    <ellipse cx="1635" cy="590" rx="72"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1635" y="595" text-anchor="middle" class="at">DOB</text>
    <ellipse cx="860"  cy="578" rx="115" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="860"  y="583" text-anchor="middle" class="at">TreatmentDate</text>
    <text x="424" y="385" text-anchor="middle" class="ct" fill="#dc2626">M</text>
    <text x="808" y="218" text-anchor="middle" class="ct" fill="#dc2626">1</text>
    <text x="556" y="424" text-anchor="middle" class="ct" fill="#dc2626">M</text>
    <text x="1165" y="424" text-anchor="middle" class="ct" fill="#dc2626">N</text>
  </svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"09 Activity 4 – Online Store",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.3" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="540" r="500" fill="none" stroke="#fde68a" stroke-width="1"/>
  <circle cx="1700" cy="540" r="320" fill="none" stroke="#fde68a" stroke-width="1"/>
</svg>
<div class="act-top">
  <div class="act-left">
    <div class="act-badge" style="background:#fef3c7;color:#d97706;">Activity 04</div>
    <h2>Online Store Orders</h2>
    <p class="scenario-text">An <strong>online store</strong> tracks customers, their orders, and products. Each <strong>customer</strong> has a customer ID, name, and address. Each <strong>product</strong> has a product ID, name, and unit price. Each <strong>order</strong> has an order ID and order date.<br><br>A customer can <strong>place</strong> many orders (each order belongs to one customer). An order can <strong>contain</strong> multiple products, and a product can appear in many orders. Each order-line records the <em>quantity</em> ordered.</p>
    <div class="entities-row">
      <span class="entity-pill" style="background:#fef3c7;color:#d97706;">CUSTOMER</span>
      <span class="entity-pill" style="background:#fef3c7;color:#d97706;">ORDER</span>
      <span class="entity-pill" style="background:#fef3c7;color:#d97706;">PRODUCT</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">PLACES</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">CONTAINS</span>
    </div>
    <div class="task-card" style="background:#fffbeb;border-color:#d97706;">
      <div class="task-title" style="color:#d97706;">Your Task</div>
      <ul>
        <li>Draw all three entities with their key attributes</li>
        <li>Show PLACES (1:N) between CUSTOMER and ORDER</li>
        <li>Show CONTAINS (M:N) between ORDER and PRODUCT</li>
        <li>Add Quantity as a relationship attribute on CONTAINS</li>
      </ul>
    </div>
  </div>
  <div class="act-right">
    <svg viewBox="0 0 380 360" style="width:340px;height:auto">
      <path d="M60,120 L60,310 Q60,330 80,330 L300,330 Q320,330 320,310 L320,120 Z" fill="#d97706"/>
      <rect x="60" y="108" width="260" height="22" rx="4" fill="#b45309"/>
      <path d="M130,108 Q130,50 190,50 Q250,50 250,108" fill="none" stroke="#92400e" stroke-width="14" stroke-linecap="round"/>
      <rect x="90"  y="160" width="70" height="80" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
      <rect x="100" y="170" width="50" height="10" rx="2" fill="#d97706"/>
      <rect x="180" y="145" width="70" height="95" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
      <rect x="190" y="157" width="50" height="10" rx="2" fill="#d97706"/>
      <rect x="240" y="258" width="60" height="30" rx="4" fill="white" stroke="#d97706" stroke-width="1.5"/>
      <text x="270" y="278" text-anchor="middle" font-size="14" font-family="monospace" fill="#d97706" font-weight="700">$24</text>
      <rect x="20" y="338" width="340" height="12" rx="4" fill="#d1c4a8"/>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"10 Answer 4 – Online Store",html:`<div class="ans-header">
  <span class="ans-badge" style="background:#fef3c7;color:#d97706;">Answer 04</span>
  <h2>Online Store Orders</h2>
  <div class="micro-legend">
    <div class="micro-legend-item"><div class="ml-entity"></div> Entity</div>
    <div class="micro-legend-item"><div class="ml-rel"></div> Relationship</div>
    <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
  </div>
</div>
<div class="ans-diagram">
  <svg viewBox="0 0 1740 590" preserveAspectRatio="xMidYMid meet">
    <line x1="185" y1="310" x2="510" y2="310" class="ln"/>
    <line x1="510" y1="310" x2="845" y2="310" class="ln"/>
    <line x1="845" y1="310" x2="1180" y2="310" class="ln"/>
    <line x1="1180" y1="310" x2="1535" y2="310" class="ln"/>
    <line x1="185" y1="310" x2="65"  y2="148" class="ln"/>
    <line x1="185" y1="310" x2="0"   y2="320" class="ln"/>
    <line x1="185" y1="310" x2="65"  y2="475" class="ln"/>
    <line x1="845" y1="310" x2="845" y2="148" class="ln"/>
    <line x1="845" y1="310" x2="845" y2="475" class="ln"/>
    <line x1="1180" y1="310" x2="1180" y2="148" class="ln"/>
    <line x1="1535" y1="310" x2="1655" y2="148" class="ln"/>
    <line x1="1535" y1="310" x2="1720" y2="320" class="ln"/>
    <line x1="1535" y1="310" x2="1655" y2="475" class="ln"/>
    <polygon points="510,242 620,310 510,378 400,310" fill="#b45309"/>
    <text x="510" y="316" text-anchor="middle" class="rt">PLACES</text>
    <polygon points="1180,242 1290,310 1180,378 1070,310" fill="#b45309"/>
    <text x="1180" y="316" text-anchor="middle" class="rt">CONTAINS</text>
    <rect x="85"  y="275" width="200" height="70" rx="3" fill="#d97706"/>
    <text x="185" y="316" text-anchor="middle" class="et">CUSTOMER</text>
    <rect x="745" y="275" width="200" height="70" rx="3" fill="#d97706"/>
    <text x="845" y="316" text-anchor="middle" class="et">ORDER</text>
    <rect x="1435" y="275" width="200" height="70" rx="3" fill="#d97706"/>
    <text x="1535" y="316" text-anchor="middle" class="et">PRODUCT</text>
    <ellipse cx="65"  cy="128" rx="105" ry="36" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
    <text x="65"  y="125" text-anchor="middle" class="at" font-weight="600">CustomerID</text>
    <line x1="-20" y1="135" x2="150" y2="135" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="0"   cy="320" rx="72"  ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="0"   y="325" text-anchor="middle" class="at">Name</text>
    <ellipse cx="65"  cy="490" rx="88"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="65"  y="495" text-anchor="middle" class="at">Address</text>
    <ellipse cx="845" cy="125" rx="90"  ry="36" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
    <text x="845" y="122" text-anchor="middle" class="at" font-weight="600">OrderID</text>
    <line x1="775" y1="132" x2="915" y2="132" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="845" cy="490" rx="100" ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="845" y="495" text-anchor="middle" class="at">OrderDate</text>
    <ellipse cx="1180" cy="120" rx="96"  ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1180" y="125" text-anchor="middle" class="at">Quantity</text>
    <ellipse cx="1655" cy="128" rx="98"  ry="36" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
    <text x="1655" y="125" text-anchor="middle" class="at" font-weight="600">ProductID</text>
    <line x1="1577" y1="135" x2="1733" y2="135" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1720" cy="320" rx="74"  ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1720" y="325" text-anchor="middle" class="at">Name</text>
    <ellipse cx="1655" cy="490" rx="74"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1655" y="495" text-anchor="middle" class="at">Price</text>
    <text x="360"  y="288" text-anchor="middle" class="ct" fill="#d97706">1</text>
    <text x="660"  y="288" text-anchor="middle" class="ct" fill="#d97706">N</text>
    <text x="1035" y="288" text-anchor="middle" class="ct" fill="#d97706">M</text>
    <text x="1325" y="288" text-anchor="middle" class="ct" fill="#d97706">N</text>
  </svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"11 Activity 5 – Hotel",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.3" viewBox="0 0 1920 1080">
  <circle cx="1700" cy="540" r="500" fill="none" stroke="#a7f3d0" stroke-width="1"/>
  <circle cx="1700" cy="540" r="320" fill="none" stroke="#a7f3d0" stroke-width="1"/>
</svg>
<div class="act-top">
  <div class="act-left">
    <div class="act-badge" style="background:#d1fae5;color:#059669;">Activity 05</div>
    <h2>Hotel Room Booking</h2>
    <p class="scenario-text">A <strong>hotel</strong> manages guest reservations for its rooms. Each <strong>guest</strong> has a guest ID, full name, and phone number. Each <strong>room</strong> has a room number, room type (single/double/suite), and nightly rate.<br><br>A guest can <strong>book</strong> multiple rooms over different stays, and the same room can be booked by many guests across different periods. Each booking records a <em>check-in date</em> and a <em>check-out date</em>.</p>
    <div class="entities-row">
      <span class="entity-pill" style="background:#d1fae5;color:#059669;">GUEST</span>
      <span class="entity-pill" style="background:#d1fae5;color:#059669;">ROOM</span>
      <span class="entity-pill" style="background:#fef3c7;color:#92400e;">BOOKS</span>
    </div>
    <div class="task-card" style="background:#ecfdf5;border-color:#059669;">
      <div class="task-title" style="color:#059669;">Your Task</div>
      <ul>
        <li>Identify all entities and their primary keys</li>
        <li>Determine the correct cardinality for BOOKS</li>
        <li>Add CheckInDate and CheckOutDate as relationship attributes</li>
        <li>Ensure all attributes connect to the correct entity or relationship</li>
      </ul>
    </div>
  </div>
  <div class="act-right">
    <svg viewBox="0 0 380 360" style="width:340px;height:auto">
      <rect x="80" y="100" width="220" height="228" fill="#059669" rx="4"/>
      <rect x="30" y="160" width="60" height="168" fill="#047857" rx="4"/>
      <rect x="290" y="160" width="60" height="168" fill="#047857" rx="4"/>
      <rect x="100" y="120" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="145" y="120" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="190" y="120" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="235" y="120" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="100" y="165" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="145" y="165" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="190" y="165" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="235" y="165" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="100" y="210" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="235" y="210" width="32" height="28" rx="2" fill="#a7f3d0"/>
      <rect x="38" y="178" width="28" height="22" rx="2" fill="#a7f3d0"/>
      <rect x="314" y="178" width="28" height="22" rx="2" fill="#a7f3d0"/>
      <rect x="155" y="268" width="70" height="60" rx="3" fill="#064e3b"/>
      <rect x="135" y="78" width="110" height="28" rx="4" fill="#065f46"/>
      <text x="190" y="97" text-anchor="middle" font-size="16" font-family="'DM Sans',sans-serif" fill="#a7f3d0" font-weight="700" letter-spacing="3">HOTEL</text>
      <rect x="10" y="328" width="360" height="12" rx="4" fill="#d1c4a8"/>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"12 Answer 5 – Hotel",html:`<div class="ans-header">
  <span class="ans-badge" style="background:#d1fae5;color:#059669;">Answer 05</span>
  <h2>Hotel Room Booking</h2>
  <div class="micro-legend">
    <div class="micro-legend-item"><div class="ml-entity"></div> Entity</div>
    <div class="micro-legend-item"><div class="ml-rel"></div> Relationship</div>
    <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
  </div>
</div>
<div class="ans-diagram">
  <svg viewBox="0 0 1720 600" preserveAspectRatio="xMidYMid meet">
    <line x1="295"  y1="300" x2="855"  y2="300" class="ln"/>
    <line x1="855"  y1="300" x2="1415" y2="300" class="ln"/>
    <line x1="295"  y1="300" x2="100"  y2="115" class="ln"/>
    <line x1="295"  y1="300" x2="48"   y2="300" class="ln"/>
    <line x1="295"  y1="300" x2="100"  y2="485" class="ln"/>
    <line x1="855"  y1="300" x2="625"  y2="95"  class="ln"/>
    <line x1="855"  y1="300" x2="1085" y2="95"  class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="115" class="ln"/>
    <line x1="1415" y1="300" x2="1662" y2="300" class="ln"/>
    <line x1="1415" y1="300" x2="1610" y2="485" class="ln"/>
    <polygon points="855,228 970,300 855,372 740,300" fill="#047857"/>
    <text x="855" y="306" text-anchor="middle" class="rt">BOOKS</text>
    <rect x="195" y="265" width="200" height="70" rx="3" fill="#059669"/>
    <text x="295" y="306" text-anchor="middle" class="et">GUEST</text>
    <rect x="1315" y="265" width="200" height="70" rx="3" fill="#059669"/>
    <text x="1415" y="306" text-anchor="middle" class="et">ROOM</text>
    <ellipse cx="100"  cy="100" rx="92"  ry="36" fill="#d1fae5" stroke="#059669" stroke-width="2.5"/>
    <text x="100"  y="97"  text-anchor="middle" class="at" font-weight="600">GuestID</text>
    <line x1="30"   y1="108" x2="170" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="48"   cy="300" rx="78"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="48"   y="305" text-anchor="middle" class="at">Name</text>
    <ellipse cx="100"  cy="490" rx="80"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="100"  y="495" text-anchor="middle" class="at">Phone</text>
    <ellipse cx="625"  cy="78"  rx="112" ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="625"  y="83"  text-anchor="middle" class="at">CheckInDate</text>
    <ellipse cx="1085" cy="78"  rx="120" ry="36" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1085" y="83"  text-anchor="middle" class="at">CheckOutDate</text>
    <ellipse cx="1610" cy="100" rx="88"  ry="36" fill="#d1fae5" stroke="#059669" stroke-width="2.5"/>
    <text x="1610" y="97"  text-anchor="middle" class="at" font-weight="600">RoomNo</text>
    <line x1="1546" y1="108" x2="1674" y2="108" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="1662" cy="300" rx="78"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1662" y="305" text-anchor="middle" class="at">Type</text>
    <ellipse cx="1610" cy="490" rx="78"  ry="34" fill="white" stroke="#94a3b8" stroke-width="2"/>
    <text x="1610" y="495" text-anchor="middle" class="at">Rate</text>
    <text x="590"  y="275" text-anchor="middle" class="ct" fill="#059669">M</text>
    <text x="1120" y="275" text-anchor="middle" class="ct" fill="#059669">N</text>
  </svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`}];function iw(){const[e,t]=k.useState(0),[i,n]=k.useState(!1),[s,r]=k.useState(!1),o=k.useRef(null),l=k.useRef(null),[d,c]=k.useState(.5),[f,p]=k.useState({x:0,y:0});k.useEffect(()=>{const b="era-deck-styles";if(!document.getElementById(b)){const h=document.createElement("style");h.id=b,h.textContent=tw,document.head.appendChild(h)}return()=>{var h;(h=document.getElementById("era-deck-styles"))==null||h.remove()}},[]),k.useEffect(()=>{const b=()=>r(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",b),()=>document.removeEventListener("fullscreenchange",b)},[]),k.useEffect(()=>{const b=l.current;if(!b)return;const h=()=>{const y=b.offsetWidth,w=b.offsetHeight;if(s&&w>0){const S=Math.min(y/1920,w/1080);c(S),p({x:(y-1920*S)/2,y:(w-1080*S)/2})}else c(y/1920),p({x:0,y:0})},x=new ResizeObserver(h);return x.observe(b),h(),()=>x.disconnect()},[s]);const u=()=>{var b;document.fullscreenElement?document.exitFullscreen():(b=o.current)==null||b.requestFullscreen()};k.useEffect(()=>{const b=h=>{var y;const x=(y=h.target)==null?void 0:y.tagName;x==="INPUT"||x==="TEXTAREA"||(h.key==="ArrowRight"&&t(w=>Math.min(w+1,Ls.length-1)),h.key==="ArrowLeft"&&t(w=>Math.max(w-1,0)))};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[]);const v=Ls[e],g=Ls.length,m="#1d4ed8";return a.jsxs("div",{ref:o,style:{background:"#0f172a",borderRadius:s?0:16,overflow:"hidden",border:s?"none":"1.5px solid rgba(29,78,216,0.3)",boxShadow:s?"none":"0 8px 32px rgba(0,0,0,0.25)",...s?{display:"flex",flexDirection:"column",height:"100%"}:{}},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#F87171"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#FBBF24"}}),a.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:"#34D399"}}),a.jsxs("span",{style:{marginLeft:10,fontFamily:"DM Mono, monospace",fontSize:12,color:"rgba(255,255,255,0.35)",letterSpacing:"0.06em"},children:["ER Diagram Activities · ",e+1," / ",g," · ← → to navigate"]})]}),a.jsxs("div",{style:{display:"flex",gap:6},children:[!s&&a.jsxs("button",{onClick:()=>n(b=>!b),style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},children:[i?a.jsx(Cn,{size:13}):a.jsx(Sn,{size:13}),i?"Collapse":"Expand"]}),a.jsxs("button",{onClick:u,style:{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:6,padding:"4px 10px",color:"rgba(255,255,255,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11},title:s?"Exit fullscreen":"Fullscreen",children:[s?a.jsx(Tn,{size:13}):a.jsx(En,{size:13}),s?"Exit":"Fullscreen"]})]})]}),a.jsx("div",{ref:l,style:{position:"relative",width:"100%",...s?{flex:1}:{paddingBottom:i?"75%":"56.25%",transition:"padding-bottom 0.3s ease"},overflow:"hidden",background:"#111"},children:a.jsx("div",{style:{position:"absolute",inset:0,overflow:"hidden"},children:a.jsx("div",{className:"era",style:{width:1920,height:1080,transform:`translate(${f.x}px, ${f.y}px) scale(${d})`,transformOrigin:"top left",position:"relative"},children:a.jsx("section",{className:v.classes||void 0,style:{position:"absolute",inset:0,width:"100%",height:"100%"},dangerouslySetInnerHTML:{__html:v.html}})})})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0},children:[a.jsxs("button",{onClick:()=>t(b=>Math.max(b-1,0)),disabled:e===0,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===0?"rgba(255,255,255,0.2)":"#fff",cursor:e===0?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:[a.jsx(wn,{size:14})," Prev"]}),a.jsx("div",{style:{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",justifyContent:"center",maxWidth:400},children:Ls.map((b,h)=>a.jsx("button",{onClick:()=>t(h),title:Ls[h].label,style:{width:h===e?20:7,height:7,borderRadius:999,background:h===e?m:"rgba(255,255,255,0.2)",border:"none",padding:0,cursor:"pointer",transition:"all 0.25s ease",flexShrink:0}},h))}),a.jsxs("button",{onClick:()=>t(b=>Math.min(b+1,g-1)),disabled:e===g-1,style:{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 14px",color:e===g-1?"rgba(255,255,255,0.2)":"#fff",cursor:e===g-1?"default":"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13},children:["Next ",a.jsx(kn,{size:14})]})]})]})}function nw(){return a.jsx(wt,{eyebrow:"Data Modelling",titleLead:"Let's make sense of",titleAccent:"ER Diagrams in practice.",gradient:"linear-gradient(90deg, #1d4ed8, #3b82f6, #06b6d4)",accent:"#1d4ed8",orb2:"#3b82f6",orb3:"#06b6d4",subtitle:"Theory only sticks when you build something. Model five real systems — a library, a university, a hospital, an online store and a hotel — and check your diagram against a worked answer.",pills:[{emoji:"📚",name:"Library",color:"#1d4ed8"},{emoji:"🎓",name:"University",color:"#7c3aed"},{emoji:"🏥",name:"Hospital",color:"#dc2626"},{emoji:"🛒",name:"Online Store",color:"#059669"},{emoji:"🏨",name:"Hotel",color:"#d97706"}],children:a.jsx(iw,{})})}const sw=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

.erc *{box-sizing:border-box;margin:0;padding:0}
.erc{font-family:'DM Sans',sans-serif}
.erc section{width:1920px;height:1080px;position:relative;overflow:hidden;display:flex;flex-direction:column}
.erc .cr{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-size:14px;letter-spacing:.04em;pointer-events:none}
.erc .cr-light{color:rgba(255,255,255,.35)}
.erc .cr-dark{color:#94a3b8}

.erc .s-title{background:#0b1728;justify-content:center;align-items:center}
.erc .s-title .inner{text-align:center}
.erc .s-title .eyebrow{font-size:22px;letter-spacing:.18em;text-transform:uppercase;color:#60a5fa;margin-bottom:24px;font-weight:500}
.erc .s-title h1{font-family:'Playfair Display',serif;font-size:88px;color:#f8fafc;line-height:1.05;margin-bottom:32px}
.erc .s-title .sub{font-size:26px;color:#94a3b8;font-weight:300;letter-spacing:.03em}
.erc .s-title .sub2{font-size:18px;color:#475569;margin-top:18px;letter-spacing:.05em}
.erc .s-title .deco-line{width:120px;height:3px;background:#60a5fa;margin:36px auto}

.erc .s-overview{background:#0b1728}
.erc .overview-header{padding:58px 100px 28px;text-align:center;flex-shrink:0}
.erc .overview-header .eyebrow{font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:#60a5fa;margin-bottom:14px;font-weight:600}
.erc .overview-header h2{font-family:'Playfair Display',serif;font-size:50px;color:#f1f5f9}
.erc .overview-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding:0 80px 68px;flex:1}
.erc .overview-card{border-radius:16px;padding:34px 30px 30px;display:flex;flex-direction:column;background:#0d1f36;border:1px solid}
.erc .overview-card-num{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px}
.erc .overview-card h3{font-size:27px;font-weight:700;color:#f1f5f9;margin-bottom:10px;line-height:1.2}
.erc .overview-card p{font-size:18px;color:#64748b;line-height:1.65;flex:1}
.erc .overview-card .ov-symbol{margin-bottom:18px}

.erc .s-concept{background:#0d1f36}
.erc .concept-body{display:flex;flex:1;min-height:0}
.erc .concept-left{width:790px;flex-shrink:0;padding:72px 68px 72px 96px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid #1e3a5a}
.erc .concept-right{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 48px;background:#091525}
.erc .concept-badge{display:inline-flex;align-items:center;padding:8px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px;width:fit-content}
.erc .concept-left h2{font-family:'Playfair Display',serif;font-size:54px;color:#f1f5f9;line-height:1.05;margin-bottom:20px}
.erc .concept-desc{font-size:20px;color:#94a3b8;line-height:1.75;margin-bottom:26px}
.erc .concept-desc strong{color:#e2e8f0;font-weight:600}
.erc .concept-rule{border-radius:12px;padding:20px 24px;background:#0f2744;border-left:5px solid;margin-bottom:20px}
.erc .concept-rule .rule-title{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
.erc .concept-rule p{font-size:18px;color:#cbd5e1;line-height:1.65}
.erc .concept-rule strong{font-weight:700}
.erc .concept-chips{display:flex;flex-wrap:wrap;gap:10px}
.erc .concept-chip{padding:7px 16px;border-radius:8px;font-size:15px;font-weight:500;background:#0b1e35;border:1px solid}
.erc .concept-note{border-radius:10px;padding:18px 22px;margin-top:18px}
.erc .concept-note .note-label{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px}
.erc .concept-note p{font-size:18px;line-height:1.6}
.erc .derived-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.erc .derived-item{background:#0c3b4f;border-radius:8px;padding:12px 14px}
.erc .derived-item .di-key{font-size:15px;color:#67e8f9;font-weight:600;margin-bottom:3px}
.erc .derived-item .di-val{font-size:13px;color:#475569}

.erc .s-legend{background:#0d1f36}
.erc .s-legend .leg-header{padding:46px 96px 0;flex-shrink:0}
.erc .s-legend .leg-header h2{font-family:'Playfair Display',serif;font-size:44px;color:#f1f5f9}
.erc .s-legend .leg-header p{font-size:21px;color:#64748b;margin-top:8px}

.erc .s-act{background:#fdfaf5}
.erc .s-act .act-top{display:flex;height:100%}
.erc .s-act .act-left{width:840px;flex-shrink:0;padding:66px 74px 66px 90px;display:flex;flex-direction:column;border-right:1px solid #e8e0d4}
.erc .s-act .act-right{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:58px;position:relative}
.erc .act-badge{display:inline-flex;align-items:center;padding:8px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:24px;width:fit-content}
.erc .act-left h2{font-family:'Playfair Display',serif;font-size:44px;color:#0f172a;line-height:1.1;margin-bottom:26px}
.erc .scenario-text{font-size:20px;color:#334155;line-height:1.72;margin-bottom:26px;flex:1}
.erc .scenario-text strong{color:#0f172a;font-weight:600}
.erc .entities-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:26px}
.erc .entity-pill{padding:6px 18px;border-radius:6px;font-size:15px;font-weight:600;letter-spacing:.03em}
.erc .task-card{border-radius:12px;padding:20px 26px;border-left:5px solid}
.erc .task-card .task-title{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}
.erc .task-card ul{list-style:none;padding:0}
.erc .task-card ul li{font-size:17px;color:#1e293b;padding:4px 0;display:flex;align-items:flex-start;gap:10px}
.erc .task-card ul li::before{content:'→';font-weight:700;flex-shrink:0;margin-top:1px}

.erc .s-ans{background:#f4f6fb}
.erc .ans-header{padding:0 90px;height:96px;display:flex;align-items:center;gap:20px;border-bottom:2px solid #dde3f5;flex-shrink:0;background:#fff}
.erc .ans-badge{padding:7px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.erc .ans-header h2{font-family:'Playfair Display',serif;font-size:36px;color:#0f172a}
.erc .ans-header .micro-legend{margin-left:auto;display:flex;gap:22px;align-items:center}
.erc .micro-legend-item{display:flex;align-items:center;gap:8px;font-size:15px;color:#475569;font-weight:500}
.erc .ml-entity{width:34px;height:19px;background:#1e40af;border-radius:2px}
.erc .ml-weak{width:34px;height:19px;border:3px solid #1e40af;border-radius:2px;background:#1e3a8a}
.erc .ml-rel{width:19px;height:19px;background:#92400e;transform:rotate(45deg);flex-shrink:0}
.erc .ml-attr{width:38px;height:20px;border:2px solid #64748b;border-radius:50%}
.erc .ans-diagram{flex:1;display:flex;align-items:center;justify-content:center;padding:20px 60px 52px;min-height:0}
.erc .ans-diagram svg{width:100%;height:100%;display:block;overflow:visible}

.erc .et{font:700 22px 'DM Sans',sans-serif;fill:white}
.erc .rt{font:700 17px 'DM Sans',sans-serif;fill:white}
.erc .at{font:500 16px 'DM Sans',sans-serif;fill:#1e293b}
.erc .ct{font:700 26px 'DM Sans',sans-serif}
.erc .ln{stroke:#94a3b8;stroke-width:2.5;fill:none}`,rc=[{classes:"s-title",label:"01 Title",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
    <pattern id="erc-dots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
      <circle cx="32" cy="32" r="1.5" fill="rgba(148,163,184,0.14)"/>
    </pattern>
    <rect width="1920" height="1080" fill="url(#erc-dots)"/>
    <circle cx="1760" cy="120" r="340" fill="rgba(96,165,250,0.04)"/>
    <circle cx="1800" cy="160" r="180" fill="rgba(96,165,250,0.06)"/>
    <rect x="1530" y="200" width="280" height="88" rx="5" fill="none" stroke="rgba(59,130,246,0.10)" stroke-width="3"/>
    <rect x="1544" y="214" width="252" height="60" rx="4" fill="none" stroke="rgba(59,130,246,0.07)" stroke-width="2"/>
    <polygon points="1660,520 1790,600 1660,680 1530,600" fill="none" stroke="rgba(180,83,9,0.12)" stroke-width="2.5"/>
    <polygon points="1660,538 1770,600 1660,662 1550,600" fill="none" stroke="rgba(180,83,9,0.08)" stroke-width="2"/>
    <ellipse cx="200" cy="820" rx="150" ry="58" fill="none" stroke="rgba(6,182,212,0.12)" stroke-width="2" stroke-dasharray="12,7"/>
    <ellipse cx="160" cy="220" rx="130" ry="50" fill="none" stroke="rgba(168,85,247,0.10)" stroke-width="2"/>
    <ellipse cx="160" cy="220" rx="110" ry="33" fill="none" stroke="rgba(168,85,247,0.07)" stroke-width="2"/>
    <circle cx="300" cy="960" r="260" fill="rgba(96,165,250,0.03)"/>
  </svg>
  <div class="inner">
    <p class="eyebrow">Database Management Systems</p>
    <h1>Advanced ER<br/>Concepts</h1>
    <div class="deco-line"></div>
    <p class="sub">Chen's Notation · Weak Entities · Special Attributes</p>
    <p class="sub2">Prerequisite: Basic ER Diagram knowledge</p>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-overview",label:"02 What You Will Learn",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
    <circle cx="1820" cy="80" r="320" fill="rgba(96,165,250,0.04)"/>
    <circle cx="80" cy="1000" r="240" fill="rgba(96,165,250,0.03)"/>
  </svg>
  <div class="overview-header">
    <p class="eyebrow">This lesson covers</p>
    <h2>Four New Concepts to Master</h2>
  </div>
  <div class="overview-grid">
    <div class="overview-card" style="border-color:#1e3a8a;">
      <div class="ov-symbol">
        <svg viewBox="0 0 150 74" style="width:150px;height:74px">
          <rect x="3" y="3" width="144" height="68" rx="4" fill="none" stroke="#3b82f6" stroke-width="3"/>
          <rect x="14" y="14" width="122" height="46" rx="3" fill="#1e3a8a"/>
          <text x="75" y="42" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#93c5fd" font-weight="700">ENTITY</text>
        </svg>
      </div>
      <div class="overview-card-num" style="color:#3b82f6;">01 — Concept</div>
      <h3>Weak Entity</h3>
      <p>An entity that cannot be uniquely identified on its own — it depends on a stronger entity for its very existence.</p>
    </div>
    <div class="overview-card" style="border-color:#78350f;">
      <div class="ov-symbol">
        <svg viewBox="0 0 150 90" style="width:150px;height:90px">
          <polygon points="75,8 142,45 75,82 8,45" fill="none" stroke="#f59e0b" stroke-width="3"/>
          <polygon points="75,20 128,45 75,70 22,45" fill="#92400e"/>
          <text x="75" y="50" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="white" font-weight="700">REL</text>
        </svg>
      </div>
      <div class="overview-card-num" style="color:#f59e0b;">02 — Concept</div>
      <h3>Identifying Relationship</h3>
      <p>The special double-diamond that links a weak entity to its owner, providing the missing identity context.</p>
    </div>
    <div class="overview-card" style="border-color:#4c1d95;">
      <div class="ov-symbol">
        <svg viewBox="0 0 180 72" style="width:180px;height:72px">
          <ellipse cx="90" cy="36" rx="86" ry="32" fill="none" stroke="#a855f7" stroke-width="2.5"/>
          <ellipse cx="90" cy="36" rx="70" ry="20" fill="#2e1065" stroke="#a855f7" stroke-width="2"/>
          <text x="90" y="41" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#d8b4fe" font-weight="600">{attribute}</text>
        </svg>
      </div>
      <div class="overview-card-num" style="color:#a855f7;">03 — Concept</div>
      <h3>Multivalued Attribute</h3>
      <p>An attribute that holds multiple values for one entity — like a list of phone numbers or email addresses.</p>
    </div>
    <div class="overview-card" style="border-color:#164e63;">
      <div class="ov-symbol">
        <svg viewBox="0 0 180 72" style="width:180px;height:72px">
          <ellipse cx="90" cy="36" rx="82" ry="30" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="9,5"/>
          <text x="90" y="41" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#67e8f9" font-style="italic">(attribute)</text>
        </svg>
      </div>
      <div class="overview-card-num" style="color:#06b6d4;">04 — Concept</div>
      <h3>Derived Attribute</h3>
      <p>An attribute computed from other data — like calculating Age from DateOfBirth. Never stored directly.</p>
    </div>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"03 Weak Entity",html:`<div class="concept-body">
    <div class="concept-left">
      <div class="concept-badge" style="background:#1e3a5a;color:#60a5fa;">Concept 01</div>
      <h2>Weak Entity</h2>
      <p class="concept-desc">
        A <strong>weak entity</strong> cannot be uniquely identified by its own attributes alone. It <strong>depends entirely on another entity</strong> — called the <em>strong entity</em> or <em>owner</em> — for both existence and identity.
      </p>
      <div class="concept-rule" style="border-color:#3b82f6;">
        <div class="rule-title" style="color:#3b82f6;">Chen's Notation Symbol</div>
        <p>Drawn as a <strong>double rectangle</strong> — two concentric boxes. The outer border signals "this entity cannot stand alone."</p>
      </div>
      <div class="concept-chips">
        <span class="concept-chip" style="color:#93c5fd;border-color:#1e3a5a;">ROOM depends on BUILDING</span>
        <span class="concept-chip" style="color:#93c5fd;border-color:#1e3a5a;">ORDER_ITEM depends on ORDER</span>
        <span class="concept-chip" style="color:#93c5fd;border-color:#1e3a5a;">DEPENDENT depends on EMPLOYEE</span>
      </div>
    </div>
    <div class="concept-right">
      <svg viewBox="0 0 1010 730" style="width:100%;height:100%">
        <rect x="28" y="18" width="954" height="298" rx="12" fill="#0a1929"/>
        <text x="505" y="58" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#3b82f6" letter-spacing="3" font-weight="700">SYMBOL COMPARISON</text>
        <text x="210" y="96" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#64748b" font-weight="600">Strong Entity</text>
        <rect x="88" y="110" width="244" height="78" rx="4" fill="#1e40af"/>
        <text x="210" y="156" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="23" fill="white" font-weight="700">BUILDING</text>
        <text x="210" y="224" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#64748b">Single border</text>
        <text x="210" y="247" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Has its own primary key (PK)</text>
        <text x="210" y="268" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Can exist independently</text>
        <text x="505" y="162" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="20" fill="#1e293b" font-weight="700">vs</text>
        <text x="800" y="96" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#64748b" font-weight="600">Weak Entity</text>
        <rect x="678" y="108" width="244" height="84" rx="4" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
        <rect x="691" y="121" width="218" height="58" rx="3" fill="#1e3a8a"/>
        <text x="800" y="157" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="23" fill="#93c5fd" font-weight="700">ROOM</text>
        <text x="800" y="224" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#64748b">Double border</text>
        <text x="800" y="247" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Needs BUILDING to be identified</text>
        <text x="800" y="268" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Cannot exist without its owner</text>
        <rect x="28" y="336" width="954" height="376" rx="12" fill="#0a1929"/>
        <text x="505" y="376" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#3b82f6" letter-spacing="3" font-weight="700">PARTIAL KEY (DISCRIMINATOR)</text>
        <text x="505" y="408" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#64748b">Weak entities have a partial key — unique only within their owner entity</text>
        <text x="215" y="450" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Primary Key — solid underline</text>
        <ellipse cx="215" cy="525" rx="108" ry="40" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="215" y="522" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#93c5fd" font-weight="600">BuildingID</text>
        <line x1="120" y1="532" x2="310" y2="532" stroke="#93c5fd" stroke-width="2.5"/>
        <text x="215" y="600" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Uniquely identifies BUILDING</text>
        <text x="215" y="622" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">anywhere in the database</text>
        <text x="215" y="646" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">e.g. BuildingID = "B01"</text>
        <text x="505" y="533" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#1e293b" font-weight="700">vs</text>
        <text x="795" y="450" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Partial Key — dashed underline</text>
        <ellipse cx="795" cy="525" rx="96" ry="40" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="795" y="522" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#93c5fd" font-weight="600">RoomNo</text>
        <line x1="710" y1="532" x2="880" y2="532" stroke="#93c5fd" stroke-width="2.5" stroke-dasharray="6,3"/>
        <text x="795" y="600" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Unique only within one BUILDING</text>
        <text x="795" y="622" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Room 101 could be in ANY building!</text>
        <text x="795" y="646" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Combined key: (BuildingID + RoomNo)</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"04 Identifying Relationship",html:`<div class="concept-body">
    <div class="concept-left">
      <div class="concept-badge" style="background:#431407;color:#fbbf24;">Concept 02</div>
      <h2>Identifying Relationship</h2>
      <p class="concept-desc">
        The <strong>special relationship</strong> connecting a weak entity to its owner. It provides the ownership context needed to uniquely identify each weak entity instance.
      </p>
      <div class="concept-rule" style="border-color:#f59e0b;">
        <div class="rule-title" style="color:#f59e0b;">Chen's Notation Symbol</div>
        <p>Drawn as a <strong>double diamond</strong> — two concentric diamonds. It <strong>always</strong> connects a weak entity to its strong entity.</p>
      </div>
      <div class="concept-note" style="background:#1a0d00;">
        <div class="note-label" style="color:#fbbf24;">Remember</div>
        <p style="color:#d97706;font-size:18px;line-height:1.6;">If you draw a double diamond, one side <em>must</em> be a weak entity (double rectangle). They always appear together.</p>
      </div>
      <div class="concept-chips" style="margin-top:18px;">
        <span class="concept-chip" style="color:#fbbf24;border-color:#431407;">Cardinality: 1 (strong) to N (weak)</span>
        <span class="concept-chip" style="color:#fbbf24;border-color:#431407;">Weak side: total participation</span>
      </div>
    </div>
    <div class="concept-right">
      <svg viewBox="0 0 1100 590" style="width:100%;height:100%">
        <line x1="380" y1="282" x2="449" y2="282" stroke="#334155" stroke-width="2.5"/>
        <line x1="693" y1="282" x2="754" y2="282" stroke="#334155" stroke-width="2.5"/>
        <line x1="283" y1="247" x2="156" y2="120" stroke="#334155" stroke-width="2.5"/>
        <line x1="182" y1="282" x2="84" y2="282" stroke="#334155" stroke-width="2.5"/>
        <line x1="872" y1="247" x2="998" y2="120" stroke="#334155" stroke-width="2.5"/>
        <line x1="954" y1="282" x2="1050" y2="282" stroke="#334155" stroke-width="2.5"/>
        <rect x="182" y="247" width="198" height="70" rx="4" fill="#1e40af"/>
        <text x="281" y="288" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="22" fill="white" font-weight="700">BUILDING</text>
        <polygon points="571,210 693,282 571,354 449,282" fill="none" stroke="#b45309" stroke-width="3.5"/>
        <polygon points="571,222 678,282 571,342 464,282" fill="#92400e"/>
        <text x="571" y="288" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="white" font-weight="700">has</text>
        <rect x="754" y="244" width="198" height="76" rx="4" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
        <rect x="767" y="257" width="172" height="50" rx="3" fill="#1e3a8a"/>
        <text x="853" y="288" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="22" fill="#93c5fd" font-weight="700">ROOM</text>
        <ellipse cx="143" cy="100" rx="100" ry="36" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="143" y="97" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#93c5fd" font-weight="600">BuildingID</text>
        <line x1="57" y1="107" x2="229" y2="107" stroke="#93c5fd" stroke-width="2"/>
        <ellipse cx="64" cy="282" rx="68" ry="30" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="64" y="287" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Name</text>
        <ellipse cx="1006" cy="100" rx="88" ry="36" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="1006" y="97" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#93c5fd" font-weight="600">RoomNo</text>
        <line x1="930" y1="107" x2="1082" y2="107" stroke="#93c5fd" stroke-width="2" stroke-dasharray="6,3"/>
        <ellipse cx="1072" cy="282" rx="74" ry="30" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="1072" y="287" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">RoomType</text>
        <text x="427" y="260" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="26" fill="#f59e0b" font-weight="700">1</text>
        <text x="717" y="260" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="26" fill="#f59e0b" font-weight="700">N</text>
        <text x="281" y="358" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Strong Entity</text>
        <text x="571" y="402" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#f59e0b">Identifying</text>
        <text x="571" y="420" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#f59e0b">Relationship</text>
        <text x="853" y="374" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#60a5fa">Weak Entity</text>
        <line x1="900" y1="120" x2="970" y2="145" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/>
        <rect x="965" y="138" width="128" height="38" rx="6" fill="#0f2744" stroke="#1e3a5a" stroke-width="1.5"/>
        <text x="1029" y="155" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#60a5fa">Dashed underline</text>
        <text x="1029" y="170" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">= Partial key</text>
        <rect x="60" y="470" width="980" height="96" rx="8" fill="#1a0d00"/>
        <text x="550" y="507" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#f59e0b" font-weight="700">KEY INSIGHT</text>
        <text x="550" y="531" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#92400e">One BUILDING "owns" many ROOMs. RoomNo 101 only makes sense per building.</text>
        <text x="550" y="553" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#78350f">The combined (composite) key is:  BuildingID + RoomNo</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"05 Multivalued Attribute",html:`<div class="concept-body">
    <div class="concept-left">
      <div class="concept-badge" style="background:#2e1065;color:#d8b4fe;">Concept 03</div>
      <h2>Multivalued Attribute</h2>
      <p class="concept-desc">
        A <strong>multivalued attribute</strong> can hold <strong>more than one value</strong> for a single entity instance. Rather than one phone number per employee, you can store many.
      </p>
      <div class="concept-rule" style="border-color:#a855f7;">
        <div class="rule-title" style="color:#a855f7;">Chen's Notation Symbol</div>
        <p>Drawn as a <strong>double ellipse</strong> — two concentric ovals. In text notation, written with curly braces: <strong>{PhoneNumbers}</strong>.</p>
      </div>
      <div class="concept-chips">
        <span class="concept-chip" style="color:#d8b4fe;border-color:#3b1469;">{PhoneNumbers}</span>
        <span class="concept-chip" style="color:#d8b4fe;border-color:#3b1469;">{EmailAddresses}</span>
        <span class="concept-chip" style="color:#d8b4fe;border-color:#3b1469;">{Skills}</span>
        <span class="concept-chip" style="color:#d8b4fe;border-color:#3b1469;">{Languages}</span>
      </div>
      <div class="concept-note" style="background:#1a0533;margin-top:18px;">
        <div class="note-label" style="color:#a855f7;">Why not just add 3 phone attributes?</div>
        <p style="color:#7e22ce;font-size:17px;line-height:1.6;">Because we don't know in advance how many values a given instance will have. Double ellipse = flexible, open-ended list.</p>
      </div>
    </div>
    <div class="concept-right">
      <svg viewBox="0 0 940 640" style="width:100%;height:100%">
        <line x1="443" y1="270" x2="268" y2="137" stroke="#334155" stroke-width="2.5"/>
        <line x1="355" y1="308" x2="104" y2="308" stroke="#334155" stroke-width="2.5"/>
        <line x1="443" y1="346" x2="268" y2="479" stroke="#334155" stroke-width="2.5"/>
        <line x1="531" y1="270" x2="690" y2="137" stroke="#a855f7" stroke-width="2.5"/>
        <rect x="355" y="273" width="176" height="70" rx="3" fill="#1e40af"/>
        <text x="443" y="314" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="20" fill="white" font-weight="700">EMPLOYEE</text>
        <ellipse cx="228" cy="110" rx="90" ry="36" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="228" y="107" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#93c5fd" font-weight="600">EmpID</text>
        <line x1="152" y1="116" x2="304" y2="116" stroke="#93c5fd" stroke-width="2"/>
        <ellipse cx="58" cy="308" rx="62" ry="30" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="58" y="313" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Name</text>
        <ellipse cx="228" cy="490" rx="92" ry="34" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="228" y="495" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Department</text>
        <ellipse cx="690" cy="110" rx="136" ry="50" fill="rgba(168,85,247,0.07)"/>
        <ellipse cx="690" cy="110" rx="122" ry="42" fill="none" stroke="#a855f7" stroke-width="2.5"/>
        <ellipse cx="690" cy="110" rx="105" ry="28" fill="#2e1065" stroke="#a855f7" stroke-width="2"/>
        <text x="690" y="115" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#d8b4fe" font-weight="600">PhoneNumbers</text>
        <line x1="812" y1="100" x2="858" y2="88" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4,3"/>
        <rect x="854" y="64" width="78" height="48" rx="6" fill="#1a0533" stroke="#7e22ce" stroke-width="1.5"/>
        <text x="893" y="85" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#c4b5fd">Double</text>
        <text x="893" y="102" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#c4b5fd">ellipse</text>
        <rect x="540" y="190" width="370" height="130" rx="10" fill="#1a0533"/>
        <text x="725" y="218" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#a855f7" font-weight="700" letter-spacing="1">EXAMPLE: ONE EMPLOYEE'S PHONES</text>
        <rect x="558" y="228" width="334" height="24" rx="4" fill="#2e1065"/>
        <text x="725" y="244" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#e9d5ff">021 123 4567</text>
        <rect x="558" y="258" width="334" height="24" rx="4" fill="#2e1065"/>
        <text x="725" y="274" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#e9d5ff">09 876 5432</text>
        <rect x="558" y="288" width="334" height="24" rx="4" fill="#2e1065"/>
        <text x="725" y="304" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#e9d5ff">027 111 2233</text>
        <rect x="30" y="548" width="880" height="68" rx="8" fill="#0a1929"/>
        <text x="470" y="578" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#a855f7" font-weight="700">In a relational database, multivalued attrs become their own table</text>
        <text x="470" y="600" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">e.g.  EMPLOYEE_PHONE (EmpID, PhoneNumber)</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"06 Derived Attribute",html:`<div class="concept-body">
    <div class="concept-left">
      <div class="concept-badge" style="background:#083344;color:#67e8f9;">Concept 04</div>
      <h2>Derived Attribute</h2>
      <p class="concept-desc">
        A <strong>derived attribute</strong> is <strong>calculated from other stored data</strong> — it doesn't need to be saved in the database because you can always compute it on demand.
      </p>
      <div class="concept-rule" style="border-color:#06b6d4;">
        <div class="rule-title" style="color:#06b6d4;">Chen's Notation Symbol</div>
        <p>Drawn as a <strong>dashed ellipse</strong> — the broken border signals "this value isn't stored directly." In text: written as <strong>(Age)</strong> with parentheses.</p>
      </div>
      <div class="concept-chips">
        <span class="concept-chip" style="color:#67e8f9;border-color:#083344;">(Age) from DateOfBirth</span>
        <span class="concept-chip" style="color:#67e8f9;border-color:#083344;">(TotalPrice) from UnitPrice × Qty</span>
        <span class="concept-chip" style="color:#67e8f9;border-color:#083344;">(YearsOfService) from HireDate</span>
      </div>
      <div class="concept-note" style="background:#041b24;margin-top:18px;">
        <div class="note-label" style="color:#06b6d4;">Why not just store it?</div>
        <p style="color:#0e7490;font-size:17px;line-height:1.6;">Storing derived data risks <strong style="color:#67e8f9;">inconsistency</strong>. If DateOfBirth changes, a stored Age becomes wrong. Compute it instead — always accurate.</p>
      </div>
    </div>
    <div class="concept-right">
      <svg viewBox="0 0 940 640" style="width:100%;height:100%">
        <line x1="400" y1="275" x2="215" y2="128" stroke="#334155" stroke-width="2.5"/>
        <line x1="325" y1="310" x2="84" y2="310" stroke="#334155" stroke-width="2.5"/>
        <line x1="400" y1="345" x2="215" y2="490" stroke="#334155" stroke-width="2.5"/>
        <line x1="475" y1="275" x2="650" y2="128" stroke="#06b6d4" stroke-width="2.5"/>
        <line x1="540" y1="310" x2="720" y2="310" stroke="#334155" stroke-width="2.5"/>
        <rect x="325" y="275" width="215" height="70" rx="3" fill="#1e40af"/>
        <text x="432" y="316" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="21" fill="white" font-weight="700">PERSON</text>
        <ellipse cx="175" cy="106" rx="98" ry="36" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="175" y="103" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#93c5fd" font-weight="600">PersonID</text>
        <line x1="90" y1="113" x2="260" y2="113" stroke="#93c5fd" stroke-width="2"/>
        <ellipse cx="55" cy="310" rx="56" ry="28" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="55" y="315" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">Name</text>
        <ellipse cx="180" cy="492" rx="102" ry="36" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="180" y="497" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#475569">DateOfBirth</text>
        <ellipse cx="660" cy="108" rx="110" ry="44" fill="rgba(6,182,212,0.05)"/>
        <ellipse cx="660" cy="108" rx="96" ry="38" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="9,5"/>
        <text x="660" y="113" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="17" fill="#67e8f9" font-style="italic">Age</text>
        <line x1="756" y1="94" x2="800" y2="78" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,3"/>
        <rect x="796" y="54" width="100" height="52" rx="6" fill="#041b24" stroke="#0e7490" stroke-width="1.5"/>
        <text x="846" y="76" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#67e8f9">Dashed ellipse</text>
        <text x="846" y="93" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#475569">= Not stored</text>
        <ellipse cx="752" cy="310" rx="72" ry="28" fill="none" stroke="#334155" stroke-width="2"/>
        <text x="752" y="315" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">Email</text>
        <rect x="180" y="390" width="590" height="130" rx="10" fill="#041b24"/>
        <text x="475" y="419" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#06b6d4" font-weight="700" letter-spacing="1">HOW AGE IS DERIVED</text>
        <rect x="200" y="428" width="160" height="46" rx="6" fill="#0e7490"/>
        <text x="280" y="447" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#e0f2fe">DateOfBirth</text>
        <text x="280" y="464" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#7dd3fc">1990-05-14 ✓ stored</text>
        <text x="400" y="456" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="22" fill="#334155">→</text>
        <rect x="420" y="428" width="150" height="46" rx="6" fill="#0c4a6e"/>
        <text x="495" y="447" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#e0f2fe">Today − DOB</text>
        <text x="495" y="464" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#7dd3fc">SQL: DATEDIFF()</text>
        <text x="610" y="456" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="22" fill="#334155">→</text>
        <rect x="630" y="428" width="120" height="46" rx="6" fill="#083344" stroke="#06b6d4" stroke-width="2" stroke-dasharray="6,3"/>
        <text x="690" y="447" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#67e8f9">Age</text>
        <text x="690" y="465" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#0e7490">34 ✗ not stored</text>
        <rect x="30" y="556" width="880" height="58" rx="8" fill="#0a1929"/>
        <text x="470" y="580" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="15" fill="#06b6d4" font-weight="700">Dashed ellipse = "I can compute this — no need to store it"</text>
        <text x="470" y="602" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#475569">Always stays accurate — automatically reflects the latest data</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-legend",label:"07 Symbol Reference",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
    <circle cx="1800" cy="900" r="400" fill="rgba(96,165,250,0.03)"/>
  </svg>
  <div class="leg-header">
    <h2>Advanced Symbol Reference — Quick Guide</h2>
    <p>All four new symbols at a glance. Use this slide as your reference.</p>
  </div>
  <svg viewBox="0 0 1720 820" style="width:100%;flex:1;padding:0 40px">
    <g transform="translate(200,160)">
      <rect x="-105" y="-40" width="210" height="80" rx="4" fill="#1e40af"/>
      <text text-anchor="middle" dy="7" font-family="'DM Sans',sans-serif" font-size="21" fill="white" font-weight="700">ENTITY</text>
      <text x="0" y="72" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Strong Entity</text>
      <text x="0" y="96" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Single rectangle</text>
      <text x="0" y="116" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Has its own primary key</text>
    </g>
    <g transform="translate(640,160)">
      <rect x="-105" y="-46" width="210" height="92" rx="5" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
      <rect x="-90" y="-32" width="180" height="64" rx="3" fill="#1e3a8a"/>
      <text text-anchor="middle" dy="7" font-family="'DM Sans',sans-serif" font-size="21" fill="#93c5fd" font-weight="700">ENTITY</text>
      <text x="0" y="78" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Weak Entity</text>
      <text x="0" y="102" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Double rectangle</text>
      <text x="0" y="122" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Depends on strong entity</text>
    </g>
    <g transform="translate(1080,160)">
      <polygon points="0,-60 120,0 0,60 -120,0" fill="#92400e"/>
      <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="18" fill="white" font-weight="700">REL</text>
      <text x="0" y="84" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Relationship</text>
      <text x="0" y="108" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Single diamond</text>
      <text x="0" y="128" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Between regular entities</text>
    </g>
    <g transform="translate(1530,160)">
      <polygon points="0,-66 128,0 0,66 -128,0" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
      <polygon points="0,-50 106,0 0,50 -106,0" fill="#92400e"/>
      <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="15" fill="white" font-weight="700">REL</text>
      <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Identifying Rel.</text>
      <text x="0" y="114" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Double diamond</text>
      <text x="0" y="134" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Links weak entity to owner</text>
    </g>
    <line x1="80" y1="360" x2="1640" y2="360" stroke="#1e3a5a" stroke-width="1.5"/>
    <g transform="translate(200,520)">
      <ellipse rx="105" ry="44" fill="none" stroke="#475569" stroke-width="2.5"/>
      <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="17" fill="#94a3b8">attribute</text>
      <text x="0" y="70" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Attribute</text>
      <text x="0" y="94" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Single ellipse</text>
      <text x="0" y="114" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">One value per entity</text>
    </g>
    <g transform="translate(640,520)">
      <ellipse rx="105" ry="44" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
      <text text-anchor="middle" dy="2" font-family="'DM Sans',sans-serif" font-size="17" fill="#93c5fd" font-weight="600">attribute</text>
      <line x1="-54" y1="10" x2="54" y2="10" stroke="#93c5fd" stroke-width="2"/>
      <text x="0" y="70" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Key Attribute</text>
      <text x="0" y="94" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Solid underline = Primary Key</text>
      <text x="0" y="114" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Uniquely identifies entity</text>
    </g>
    <g transform="translate(1080,520)">
      <ellipse rx="108" ry="50" fill="rgba(168,85,247,0.05)"/>
      <ellipse rx="94" ry="42" fill="none" stroke="#a855f7" stroke-width="2.5"/>
      <ellipse rx="78" ry="28" fill="#2e1065" stroke="#a855f7" stroke-width="2"/>
      <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="14" fill="#d8b4fe">{attribute}</text>
      <text x="0" y="74" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Multivalued</text>
      <text x="0" y="98" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Double ellipse — {curly braces}</text>
      <text x="0" y="118" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Multiple values per entity</text>
    </g>
    <g transform="translate(1530,520)">
      <ellipse rx="108" ry="44" fill="rgba(6,182,212,0.04)"/>
      <ellipse rx="94" ry="38" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="9,5"/>
      <text text-anchor="middle" dy="6" font-family="'DM Sans',sans-serif" font-size="17" fill="#67e8f9" font-style="italic">(attribute)</text>
      <text x="0" y="66" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="18" fill="#e2e8f0" font-weight="600">Derived Attribute</text>
      <text x="0" y="90" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Dashed ellipse — (parentheses)</text>
      <text x="0" y="110" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#64748b">Calculated, never stored</text>
    </g>
    <g transform="translate(640,720)">
      <ellipse rx="105" ry="40" fill="#1e3a5a" stroke="#3b82f6" stroke-width="2.5"/>
      <text text-anchor="middle" dy="2" font-family="'DM Sans',sans-serif" font-size="17" fill="#93c5fd" font-weight="600">partialKey</text>
      <line x1="-54" y1="10" x2="54" y2="10" stroke="#93c5fd" stroke-width="2" stroke-dasharray="6,3"/>
      <text x="0" y="60" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="16" fill="#e2e8f0" font-weight="600">Partial Key</text>
      <text x="0" y="80" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">Dashed underline — belongs to weak entity</text>
    </g>
  </svg>
  <div class="cr cr-light">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"08 Exercise 1 Scenario",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.35" viewBox="0 0 1920 1080">
    <circle cx="1700" cy="540" r="500" fill="none" stroke="#fde68a" stroke-width="1"/>
    <circle cx="1700" cy="540" r="330" fill="none" stroke="#fde68a" stroke-width="1"/>
    <circle cx="1700" cy="540" r="160" fill="none" stroke="#fde68a" stroke-width="1"/>
  </svg>
  <div class="act-top">
    <div class="act-left">
      <div class="act-badge" style="background:#fef3c7;color:#92400e;">Exercise 01</div>
      <h2>University Building &amp; Rooms</h2>
      <p class="scenario-text">
        A <strong>university</strong> manages its campus facilities. Each <strong>building</strong> has a building ID, name, and location. Each building has many <strong>rooms</strong>, but a room number (like "101") only makes sense within a specific building — Room 101 could exist in <em>every</em> building.<br/><br/>
        Each room has a room number and a room type (lecture hall, lab, office). A room <strong>cannot exist</strong> without its building. Additionally, each room has a <strong>seating capacity</strong> and a <em>utilisation rate</em> which is <strong>automatically calculated</strong> from bookings data. Buildings can have <strong>multiple contact phone numbers</strong> on record.
      </p>
      <div class="entities-row">
        <span class="entity-pill" style="background:#dbeafe;color:#1e40af;">BUILDING (strong)</span>
        <span class="entity-pill" style="background:#1e3a8a;color:#93c5fd;">ROOM (weak)</span>
        <span class="entity-pill" style="background:#fef3c7;color:#92400e;">HAS (identifying)</span>
      </div>
      <div class="task-card" style="background:#fffbeb;border-color:#d97706;">
        <div class="task-title" style="color:#d97706;">Your Task</div>
        <ul>
          <li>Draw BUILDING as a strong entity with its key attribute</li>
          <li>Draw ROOM as a weak entity with its partial key (RoomNo)</li>
          <li>Connect them with an identifying relationship (double diamond)</li>
          <li>Show PhoneNumbers as a multivalued attribute on BUILDING</li>
          <li>Show UtilisationRate as a derived attribute on ROOM</li>
        </ul>
      </div>
    </div>
    <div class="act-right">
      <svg viewBox="0 0 400 380" style="width:360px;height:auto;">
        <rect x="10" y="330" width="380" height="16" rx="4" fill="#d1c4a8"/>
        <rect x="60" y="120" width="280" height="210" rx="4" fill="#1e40af"/>
        <polygon points="40,120 200,40 360,120" fill="#1e3a8a"/>
        <rect x="88"  y="148" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="148" y="148" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="208" y="148" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="268" y="148" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="88"  y="204" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="148" y="204" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="208" y="204" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="268" y="204" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="88"  y="260" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="268" y="260" width="44" height="36" rx="2" fill="#bfdbfe"/>
        <rect x="168" y="268" width="64" height="62" rx="4" fill="#0b1728"/>
        <circle cx="224" cy="300" r="4" fill="#fbbf24"/>
        <rect x="110" y="68" width="180" height="28" rx="4" fill="#0b1728"/>
        <text x="200" y="87" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#60a5fa" font-weight="700" letter-spacing="2">BUILDING A</text>
        <text x="110" y="170" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="9" fill="#1e3a8a" font-weight="700">101</text>
        <text x="170" y="170" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="9" fill="#1e3a8a" font-weight="700">102</text>
        <text x="230" y="170" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="9" fill="#1e3a8a" font-weight="700">103</text>
        <text x="290" y="170" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="9" fill="#1e3a8a" font-weight="700">104</text>
        <text x="200" y="360" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#94a3b8">Room 101 exists in EVERY building!</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"09 Answer 1 Building Rooms",html:`<div class="ans-header">
    <span class="ans-badge" style="background:#fef3c7;color:#92400e;">Answer 01</span>
    <h2>University Building &amp; Rooms</h2>
    <div class="micro-legend">
      <div class="micro-legend-item"><div class="ml-entity"></div> Strong Entity</div>
      <div class="micro-legend-item"><div class="ml-weak"></div> Weak Entity</div>
      <div class="micro-legend-item"><div class="ml-rel"></div> Identifying Rel.</div>
      <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
    </div>
  </div>
  <div class="ans-diagram">
    <svg viewBox="0 0 1720 640" preserveAspectRatio="xMidYMid meet">
      <line x1="390" y1="310" x2="522" y2="310" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="698" y1="310" x2="810" y2="310" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="290" y1="275" x2="170" y2="130" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="190" y1="310" x2="52" y2="310" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="290" y1="345" x2="170" y2="490" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="210" y1="322" x2="90" y2="420" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="910" y1="275" x2="1030" y2="130" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="1010" y1="310" x2="1148" y2="310" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="910" y1="345" x2="1030" y2="490" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="1010" y1="270" x2="1160" y2="168" stroke="#94a3b8" stroke-width="2.5"/>
      <rect x="190" y="275" width="200" height="70" rx="3" fill="#1e40af"/>
      <text x="290" y="316" text-anchor="middle" class="et">BUILDING</text>
      <polygon points="610,238 698,310 610,382 522,310" fill="none" stroke="#b45309" stroke-width="3.5"/>
      <polygon points="610,250 686,310 610,370 534,310" fill="#92400e"/>
      <text x="610" y="316" text-anchor="middle" class="rt">has</text>
      <rect x="808" y="271" width="204" height="78" rx="4" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
      <rect x="821" y="283" width="178" height="54" rx="3" fill="#1e3a8a"/>
      <text x="910" y="316" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="21" fill="#93c5fd" font-weight="700">ROOM</text>
      <ellipse cx="148" cy="110" rx="104" ry="36" fill="#dbeafe" stroke="#1e40af" stroke-width="2.5"/>
      <text x="148" y="107" text-anchor="middle" class="at" font-weight="600">BuildingID</text>
      <line x1="56" y1="117" x2="240" y2="117" stroke="#1e293b" stroke-width="2"/>
      <ellipse cx="42" cy="310" rx="62" ry="44" fill="none" stroke="#a855f7" stroke-width="2.5"/>
      <ellipse cx="42" cy="310" rx="48" ry="31" fill="#2e1065" stroke="#a855f7" stroke-width="1.8"/>
      <text x="42" y="306" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#d8b4fe" font-weight="600">{Phone</text>
      <text x="42" y="320" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#d8b4fe" font-weight="600">Numbers}</text>
      <ellipse cx="148" cy="490" rx="84" ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="148" y="495" text-anchor="middle" class="at">Name</text>
      <ellipse cx="78" cy="420" rx="76" ry="30" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="78" y="425" text-anchor="middle" class="at">Location</text>
      <ellipse cx="1060" cy="110" rx="98" ry="36" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="1060" y="107" text-anchor="middle" class="at" font-weight="600">RoomNo</text>
      <line x1="972" y1="117" x2="1148" y2="117" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,3"/>
      <ellipse cx="1196" cy="310" rx="108" ry="38" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="9,5"/>
      <text x="1196" y="306" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#67e8f9" font-style="italic">(Utilisation</text>
      <text x="1196" y="322" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#67e8f9" font-style="italic">Rate)</text>
      <ellipse cx="1060" cy="490" rx="86" ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="1060" y="495" text-anchor="middle" class="at">Capacity</text>
      <ellipse cx="1178" cy="168" rx="84" ry="30" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="1178" y="173" text-anchor="middle" class="at">RoomType</text>
      <text x="496" y="288" text-anchor="middle" class="ct" fill="#d97706">1</text>
      <text x="724" y="288" text-anchor="middle" class="ct" fill="#d97706">N</text>
      <rect x="1360" y="90" width="330" height="68" rx="8" fill="#1a0533"/>
      <text x="1525" y="116" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#a855f7" font-weight="700">Double ellipse = Multivalued</text>
      <text x="1525" y="138" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">{PhoneNumbers} → multiple values</text>
      <rect x="1360" y="185" width="330" height="68" rx="8" fill="#041b24"/>
      <text x="1525" y="211" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#06b6d4" font-weight="700">Dashed ellipse = Derived</text>
      <text x="1525" y="233" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">(UtilisationRate) → computed</text>
      <rect x="1360" y="280" width="330" height="68" rx="8" fill="#0a1929"/>
      <text x="1525" y="306" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#3b82f6" font-weight="700">Dashed underline = Partial Key</text>
      <text x="1525" y="328" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">RoomNo unique only per building</text>
      <rect x="1360" y="375" width="330" height="68" rx="8" fill="#1a0d00"/>
      <text x="1525" y="401" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#f59e0b" font-weight="700">Double diamond = Identifying Rel.</text>
      <text x="1525" y="423" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#64748b">HAS links weak ROOM to BUILDING</text>
    </svg>
  </div>
  <div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"10 Exercise 2 Scenario",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.3" viewBox="0 0 1920 1080">
    <circle cx="1700" cy="540" r="480" fill="none" stroke="#a7f3d0" stroke-width="1"/>
    <circle cx="1700" cy="540" r="300" fill="none" stroke="#a7f3d0" stroke-width="1"/>
  </svg>
  <div class="act-top">
    <div class="act-left">
      <div class="act-badge" style="background:#d1fae5;color:#065f46;">Exercise 02</div>
      <h2>Employee &amp; Dependants</h2>
      <p class="scenario-text">
        A company tracks its <strong>employees</strong> and their <strong>dependants</strong> (family members covered by insurance). Each employee has an employee ID, name, hire date, and date of birth. A <strong>dependant</strong> has only a name and relationship (e.g. "spouse", "child") — and <strong>cannot exist in the system without their employee</strong>. A dependant named "Emma" only makes sense in the context of a specific employee.<br/><br/>
        Employees may speak <strong>multiple languages</strong>. The company also needs to display each employee's <em>years of service</em> on their profile — but this should <strong>never be stored</strong> directly in the database.
      </p>
      <div class="entities-row">
        <span class="entity-pill" style="background:#d1fae5;color:#065f46;">EMPLOYEE (strong)</span>
        <span class="entity-pill" style="background:#064e3b;color:#6ee7b7;">DEPENDANT (weak)</span>
        <span class="entity-pill" style="background:#fef3c7;color:#92400e;">HAS_DEPENDANT (identifying)</span>
      </div>
      <div class="task-card" style="background:#ecfdf5;border-color:#059669;">
        <div class="task-title" style="color:#059669;">Your Task</div>
        <ul>
          <li>Identify and draw EMPLOYEE as a strong entity with EmpID as key</li>
          <li>Draw DEPENDANT as a weak entity; DepName is the partial key</li>
          <li>Connect them with HAS_DEPENDANT as an identifying relationship</li>
          <li>Add Languages as a multivalued attribute on EMPLOYEE</li>
          <li>Add YearsOfService as a derived attribute on EMPLOYEE</li>
        </ul>
      </div>
    </div>
    <div class="act-right">
      <svg viewBox="0 0 400 380" style="width:340px;height:auto;">
        <rect x="10" y="340" width="380" height="14" rx="4" fill="#d1c4a8"/>
        <circle cx="180" cy="80" r="38" fill="#059669"/>
        <text x="180" y="87" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="white" font-weight="700">EMP</text>
        <rect x="148" y="124" width="64" height="88" rx="8" fill="#065f46"/>
        <rect x="96" y="132" width="52" height="14" rx="6" fill="#065f46"/>
        <rect x="212" y="132" width="52" height="14" rx="6" fill="#065f46"/>
        <rect x="155" y="212" width="22" height="64" rx="6" fill="#064e3b"/>
        <rect x="183" y="212" width="22" height="64" rx="6" fill="#064e3b"/>
        <rect x="160" y="138" width="40" height="28" rx="3" fill="#a7f3d0"/>
        <text x="180" y="158" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="9" fill="#065f46" font-weight="700">ID CARD</text>
        <circle cx="72" cy="200" r="26" fill="#34d399"/>
        <text x="72" y="207" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="10" fill="white" font-weight="700">DEP</text>
        <rect x="56" y="230" width="32" height="50" rx="6" fill="#6ee7b7"/>
        <line x1="144" y1="175" x2="96" y2="205" stroke="#6ee7b7" stroke-width="3"/>
        <circle cx="290" cy="200" r="26" fill="#34d399"/>
        <text x="290" y="207" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="10" fill="white" font-weight="700">DEP</text>
        <rect x="274" y="230" width="32" height="50" rx="6" fill="#6ee7b7"/>
        <line x1="218" y1="175" x2="268" y2="205" stroke="#6ee7b7" stroke-width="3"/>
        <text x="72" y="296" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">Emma (child)</text>
        <text x="290" y="296" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">James (spouse)</text>
        <text x="180" y="310" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#059669" font-weight="600">Sarah Chen — Emp #E042</text>
        <text x="180" y="362" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#94a3b8">"Emma" is meaningless without Sarah!</text>
      </svg>
    </div>
  </div>
  <div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"11 Answer 2 Employee Dependants",html:`<div class="ans-header">
    <span class="ans-badge" style="background:#d1fae5;color:#065f46;">Answer 02</span>
    <h2>Employee &amp; Dependants</h2>
    <div class="micro-legend">
      <div class="micro-legend-item"><div class="ml-entity"></div> Strong Entity</div>
      <div class="micro-legend-item"><div class="ml-weak"></div> Weak Entity</div>
      <div class="micro-legend-item"><div class="ml-rel"></div> Identifying Rel.</div>
      <div class="micro-legend-item"><div class="ml-attr"></div> Attribute</div>
    </div>
  </div>
  <div class="ans-diagram">
    <svg viewBox="0 0 1720 640" preserveAspectRatio="xMidYMid meet">
      <line x1="410" y1="300" x2="520" y2="300" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="700" y1="300" x2="810" y2="300" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="310" y1="265" x2="158" y2="108" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="210" y1="300" x2="52" y2="300" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="310" y1="335" x2="182" y2="492" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="310" y1="260" x2="78" y2="168" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="410" y1="270" x2="488" y2="120" stroke="#06b6d4" stroke-width="2.5"/>
      <line x1="910" y1="268" x2="1050" y2="108" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="1010" y1="300" x2="1158" y2="300" stroke="#94a3b8" stroke-width="2.5"/>
      <rect x="210" y="265" width="200" height="70" rx="3" fill="#059669"/>
      <text x="310" y="306" text-anchor="middle" class="et">EMPLOYEE</text>
      <polygon points="610,232 700,300 610,368 520,300" fill="none" stroke="#b45309" stroke-width="3.5"/>
      <polygon points="610,244 688,300 610,356 532,300" fill="#92400e"/>
      <text x="610" y="295" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="white" font-weight="700">has_</text>
      <text x="610" y="312" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="white" font-weight="700">dept</text>
      <rect x="808" y="261" width="204" height="78" rx="4" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
      <rect x="820" y="272" width="180" height="56" rx="3" fill="#064e3b"/>
      <text x="910" y="306" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="19" fill="#6ee7b7" font-weight="700">DEPENDANT</text>
      <ellipse cx="133" cy="86" rx="100" ry="36" fill="#d1fae5" stroke="#059669" stroke-width="2.5"/>
      <text x="133" y="83" text-anchor="middle" class="at" font-weight="600">EmpID</text>
      <line x1="46" y1="92" x2="220" y2="92" stroke="#1e293b" stroke-width="2"/>
      <ellipse cx="38" cy="300" rx="52" ry="42" fill="none" stroke="#a855f7" stroke-width="2.5"/>
      <ellipse cx="38" cy="300" rx="40" ry="28" fill="#2e1065" stroke="#a855f7" stroke-width="1.8"/>
      <text x="38" y="296" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11" fill="#d8b4fe" font-weight="600">{Lang-</text>
      <text x="38" y="310" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11" fill="#d8b4fe" font-weight="600">uages}</text>
      <ellipse cx="153" cy="492" rx="96" ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="153" y="497" text-anchor="middle" class="at">HireDate</text>
      <ellipse cx="56" cy="168" rx="66" ry="28" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="56" y="173" text-anchor="middle" class="at">Name</text>
      <ellipse cx="500" cy="100" rx="108" ry="38" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="9,5"/>
      <text x="500" y="96" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#67e8f9" font-style="italic">(YearsOf</text>
      <text x="500" y="112" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#67e8f9" font-style="italic">Service)</text>
      <ellipse cx="1066" cy="86" rx="100" ry="36" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="1066" y="83" text-anchor="middle" class="at" font-weight="600">DepName</text>
      <line x1="978" y1="92" x2="1154" y2="92" stroke="#1e293b" stroke-width="2" stroke-dasharray="6,3"/>
      <ellipse cx="1196" cy="300" rx="100" ry="32" fill="white" stroke="#94a3b8" stroke-width="2"/>
      <text x="1196" y="305" text-anchor="middle" class="at">Relationship</text>
      <text x="496" y="278" text-anchor="middle" class="ct" fill="#059669">1</text>
      <text x="726" y="278" text-anchor="middle" class="ct" fill="#059669">N</text>
      <rect x="1350" y="60" width="340" height="66" rx="8" fill="#2e1065"/>
      <text x="1520" y="85" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#d8b4fe" font-weight="700">{Languages} — Multivalued</text>
      <text x="1520" y="108" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#7e22ce">Many languages per employee</text>
      <rect x="1350" y="148" width="340" height="66" rx="8" fill="#041b24"/>
      <text x="1520" y="173" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#67e8f9" font-weight="700">(YearsOfService) — Derived</text>
      <text x="1520" y="196" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#0e7490">Computed from HireDate</text>
      <rect x="1350" y="236" width="340" height="66" rx="8" fill="#0a1929"/>
      <text x="1520" y="261" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#60a5fa" font-weight="700">DepName — Partial Key</text>
      <text x="1520" y="284" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">Unique only per employee</text>
      <rect x="1350" y="324" width="340" height="66" rx="8" fill="#1a0d00"/>
      <text x="1520" y="349" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#f59e0b" font-weight="700">HAS_DEPT — Identifying Rel.</text>
      <text x="1520" y="372" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#78350f">DEPENDANT cannot exist alone</text>
      <rect x="1350" y="412" width="340" height="66" rx="8" fill="#0d1f36"/>
      <text x="1520" y="437" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" fill="#3b82f6" font-weight="700">DEPENDANT — Weak Entity</text>
      <text x="1520" y="460" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#475569">Double rectangle — depends on EMPLOYEE</text>
    </svg>
  </div>
  <div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`}];function rw(){const[e,t]=k.useState(0),[i,n]=k.useState(!1),[s,r]=k.useState(!1),o=k.useRef(null),l=k.useRef(null),d=rc.length;k.useEffect(()=>{const u="erc-deck-styles";if(!document.getElementById(u)){const v=document.createElement("style");v.id=u,v.textContent=sw,document.head.appendChild(v)}return()=>{const v=document.getElementById(u);v&&v.remove()}},[]),k.useEffect(()=>{const u=o.current,v=l.current;if(!u||!v)return;const g=new ResizeObserver(()=>{const{width:m,height:b}=u.getBoundingClientRect(),h=Math.min(m/1920,b/1080);v.style.transform=`scale(${h})`,v.style.transformOrigin="top left",u.style.height=`${1080*h}px`});return g.observe(u),()=>g.disconnect()},[]),k.useEffect(()=>{const u=v=>{(v.key==="ArrowRight"||v.key==="ArrowDown")&&t(g=>Math.min(g+1,d-1)),(v.key==="ArrowLeft"||v.key==="ArrowUp")&&t(g=>Math.max(g-1,0)),v.key==="Escape"&&s&&f()};return window.addEventListener("keydown",u),()=>window.removeEventListener("keydown",u)},[s,d]),k.useEffect(()=>{const u=()=>r(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",u),()=>document.removeEventListener("fullscreenchange",u)},[]);function c(){var u,v;(v=(u=o.current)==null?void 0:u.requestFullscreen)==null||v.call(u)}function f(){var u;(u=document.exitFullscreen)==null||u.call(document)}const p=rc[e];return a.jsxs("div",{className:"flex flex-col gap-3",children:[a.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>t(u=>Math.max(u-1,0)),disabled:e===0,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:"rgba(96,165,250,0.3)"},children:a.jsx(wn,{size:18})}),a.jsxs("span",{className:"text-sm font-medium text-gray-600 min-w-[80px] text-center",children:[e+1," / ",d]}),a.jsx("button",{onClick:()=>t(u=>Math.min(u+1,d-1)),disabled:e===d-1,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:"rgba(96,165,250,0.3)"},children:a.jsx(kn,{size:18})})]}),a.jsx("span",{className:"text-xs font-medium text-gray-400 hidden sm:block",children:p.label}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>n(u=>!u),className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:"rgba(96,165,250,0.3)"},title:i?"Collapse":"Expand",children:i?a.jsx(Cn,{size:16}):a.jsx(Sn,{size:16})}),a.jsx("button",{onClick:s?f:c,className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:"rgba(96,165,250,0.3)"},title:s?"Exit fullscreen":"Fullscreen",children:s?a.jsx(Tn,{size:16}):a.jsx(En,{size:16})})]})]}),a.jsx("div",{ref:o,className:"erc relative w-full overflow-hidden rounded-xl",style:{border:"1px solid rgba(96,165,250,0.3)"},children:a.jsx("div",{ref:l,style:{width:1920,height:1080},children:a.jsx("section",{className:p.classes,dangerouslySetInnerHTML:{__html:p.html}})})}),a.jsx("div",{className:`flex flex-wrap justify-center gap-1.5 ${i?"mt-2":""}`,children:rc.map((u,v)=>a.jsx("button",{onClick:()=>t(v),title:u.label,className:"rounded-full transition-all",style:{width:v===e?24:8,height:8,background:v===e?"#60a5fa":"rgba(96,165,250,0.25)"}},v))})]})}function ow(){return a.jsx(wt,{eyebrow:"Data Modelling",titleLead:"Let's make sense of",titleAccent:"Advanced ER Concepts.",gradient:"linear-gradient(90deg, #3b82f6, #6366f1, #a855f7)",accent:"#3b82f6",orb2:"#6366f1",orb3:"#a855f7",subtitle:"Real data is messier than the textbook. Tackle the entities that can't stand on their own, the relationships that identify them, and attributes that are multivalued or derived — with two exercises to test yourself.",pills:[{emoji:"🪶",name:"Weak entities",color:"#3b82f6"},{emoji:"🔗",name:"Identifying rels",color:"#6366f1"},{emoji:"📦",name:"Multivalued",color:"#a855f7"},{emoji:"🧮",name:"Derived",color:"#0d9488"}],children:a.jsx(rw,{})})}const aw=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');

@keyframes ecpFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes ecpFadeIn { from { opacity:0; } to { opacity:1; } }
.ecp .a1 { animation: ecpFadeUp 0.5s ease forwards; }
.ecp .a2 { animation: ecpFadeUp 0.5s 0.15s ease forwards; opacity:0; }
.ecp .a3 { animation: ecpFadeUp 0.5s 0.30s ease forwards; opacity:0; }
.ecp .a4 { animation: ecpFadeUp 0.5s 0.45s ease forwards; opacity:0; }
.ecp .a5 { animation: ecpFadeUp 0.5s 0.60s ease forwards; opacity:0; }

.ecp *{box-sizing:border-box;margin:0;padding:0}
.ecp{font-family:'DM Sans',sans-serif}
.ecp section{width:1920px;height:1080px;position:relative;overflow:hidden;display:flex;flex-direction:column}
.ecp .cr{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-size:14px;letter-spacing:.04em;pointer-events:none;color:rgba(255,255,255,.32)}
.ecp .cr-dark{color:#94a3b8}

.ecp .s-title{background:#042f2e;justify-content:center;align-items:center}
.ecp .s-title .inner{text-align:center;z-index:1}
.ecp .s-title .eyebrow{font-size:15px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;margin-bottom:28px;font-weight:600}
.ecp .s-title h1{font-size:90px;color:#f8fafc;line-height:1.0;margin-bottom:28px;font-weight:700}
.ecp .s-title h1 span{color:#2dd4bf}
.ecp .s-title .amber-bar{width:100px;height:4px;background:#b45309;margin:0 auto 28px;border-radius:2px}
.ecp .s-title .sub{font-size:24px;color:#5eead4;font-weight:300;letter-spacing:.02em}

.ecp .s-agenda{background:#042f2e}
.ecp .agenda-inner{padding:80px 100px;display:flex;flex-direction:column;justify-content:center;height:100%}
.ecp .agenda-inner .eyebrow{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;margin-bottom:20px;font-weight:700}
.ecp .agenda-inner h2{font-size:56px;color:#f8fafc;font-weight:700;margin-bottom:48px}
.ecp .agenda-cols{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.ecp .agenda-group h3{font-size:20px;font-weight:700;color:#5eead4;letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid rgba(94,234,212,.2)}
.ecp .agenda-item{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.ecp .agenda-dot{width:10px;height:10px;border-radius:50%;background:#0f766e;flex-shrink:0}
.ecp .agenda-item p{font-size:19px;color:#94a3b8;line-height:1.4}

.ecp .s-sectionbreak{background:#0d3d3a;justify-content:center;align-items:center}
.ecp .sb-watermark{position:absolute;font-size:320px;font-weight:800;color:rgba(94,234,212,.05);line-height:1;pointer-events:none;user-select:none;bottom:-40px;right:80px}
.ecp .sb-inner{text-align:center;z-index:1}
.ecp .sb-eyebrow{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;margin-bottom:18px;font-weight:700}
.ecp .sb-inner h2{font-size:66px;font-weight:700;color:#f8fafc;margin-bottom:20px;line-height:1.1}
.ecp .sb-inner p{font-size:22px;color:#5eead4;font-weight:300;opacity:.7}

.ecp .s-concept{background:#0d3d3a}
.ecp .concept-body{display:flex;flex:1;min-height:0}
.ecp .concept-left{width:790px;flex-shrink:0;padding:72px 68px 72px 96px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid rgba(255,255,255,.07)}
.ecp .concept-right{flex:1;display:flex;align-items:center;justify-content:center;padding:48px;background:#051f1e}
.ecp .concept-badge{display:inline-flex;align-items:center;padding:8px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px;width:fit-content;background:#134e4a;color:#5eead4}
.ecp .concept-left h2{font-size:50px;color:#f1f5f9;line-height:1.05;margin-bottom:18px;font-weight:700}
.ecp .concept-desc{font-size:19px;color:#94a3b8;line-height:1.75;margin-bottom:22px}
.ecp .concept-desc strong{color:#f1f5f9;font-weight:700}
.ecp .rule-card{border-radius:10px;padding:18px 22px;background:rgba(255,255,255,.04);border-left:4px solid #0f766e;font-size:17px;color:#ccfbf1;line-height:1.55;margin-bottom:14px}
.ecp .rule-card strong{color:#5eead4}
.ecp .warn-card{border-radius:10px;padding:16px 20px;background:#422006;border-left:4px solid #b45309;font-size:16px;color:#fde68a;line-height:1.55;margin-bottom:14px}
.ecp .tip-card{border-radius:10px;padding:16px 20px;background:#052e16;border-left:4px solid #16a34a;font-size:17px;color:#bbf7d0;line-height:1.55;margin-bottom:14px}
.ecp .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.ecp .chip{padding:7px 16px;border-radius:8px;font-size:14px;font-weight:500;background:rgba(255,255,255,.05);border:1px solid rgba(94,234,212,.25);color:#ccfbf1}

.ecp .s-light{background:#f0fdfa}
.ecp .s-light .concept-body{background:#f0fdfa}
.ecp .s-light .concept-left{border-right:1px solid #99f6e4;background:#f0fdfa}
.ecp .s-light .concept-right{background:#ccfbf1}
.ecp .s-light .concept-left h2{color:#042f2e}
.ecp .s-light .concept-desc{color:#134e4a}
.ecp .s-light .concept-desc strong{color:#042f2e}
.ecp .s-light .concept-badge{background:#ccfbf1;color:#0f766e}
.ecp .s-light .rule-card{background:white;border-left-color:#0f766e;color:#134e4a}
.ecp .s-light .rule-card strong{color:#0f766e}
.ecp .s-light .tip-card{background:#dcfce7;border-left-color:#16a34a;color:#14532d}

.ecp .s-compare{background:#f8fafc}
.ecp .compare-inner{padding:60px 80px;display:flex;flex-direction:column;height:100%}
.ecp .compare-inner h2{font-size:52px;font-weight:700;color:#1e1b4b;margin-bottom:36px}
.ecp .compare-cols{display:grid;grid-template-columns:1fr 1fr;gap:32px;flex:1}
.ecp .compare-card{border-radius:20px;padding:36px 40px;display:flex;flex-direction:column;gap:18px}
.ecp .compare-card.green{background:#f0fdf4;border:2px solid #86efac}
.ecp .compare-card.slate{background:#f8fafc;border:2px solid #cbd5e1}
.ecp .compare-title{font-size:28px;font-weight:700;margin-bottom:4px}
.ecp .compare-tag{font-size:16px;font-weight:500;margin-bottom:8px}
.ecp .compare-rule{font-size:15px;font-weight:600;padding:10px 16px;border-radius:8px;text-align:center}
.ecp .compare-item{font-size:17px;line-height:1.55;padding:10px 0;border-bottom:1px solid rgba(0,0,0,.06)}

.ecp .s-act{background:#fdfaf5}
.ecp .act-body{display:flex;height:100%}
.ecp .act-left{width:840px;flex-shrink:0;padding:66px 74px 66px 90px;display:flex;flex-direction:column;border-right:1px solid #e8e0d4}
.ecp .act-right{flex:1;display:flex;align-items:center;justify-content:center;padding:52px}
.ecp .act-badge{display:inline-flex;align-items:center;padding:8px 22px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:24px;width:fit-content}
.ecp .act-left h2{font-size:40px;color:#1e1b4b;font-weight:700;line-height:1.1;margin-bottom:22px}
.ecp .scenario-text{font-size:18px;color:#334155;line-height:1.72;margin-bottom:20px;flex:1}
.ecp .scenario-text strong{color:#0f172a;font-weight:700}
.ecp .task-box{border-radius:12px;padding:20px 24px;background:#f0fdfa;border-left:5px solid #0f766e}
.ecp .task-box .task-title{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0f766e;margin-bottom:10px}
.ecp .task-box p{font-size:17px;color:#134e4a;line-height:1.6}
.ecp .hint-card{border-radius:10px;padding:14px 20px;background:#fef9c3;border-left:4px solid #ca8a04;font-size:15px;color:#713f12;margin-top:14px;line-height:1.55}

.ecp .s-ans{background:#f0fdf4}
.ecp .ans-header{padding:0 90px;height:88px;display:flex;align-items:center;gap:20px;border-bottom:2px solid #bbf7d0;flex-shrink:0;background:#fff}
.ecp .ans-header h2{font-size:34px;font-weight:700;color:#14532d}

.ecp .s-ref{background:#042f2e}
.ecp .ref-inner{padding:50px 80px;display:flex;flex-direction:column;height:100%}
.ecp .ref-inner h2{font-size:48px;font-weight:700;color:#f8fafc;margin-bottom:32px}
.ecp .ref-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;flex:1}
.ecp .ref-card{background:rgba(255,255,255,.04);border:1px solid rgba(94,234,212,.12);border-radius:14px;padding:20px 18px;display:flex;flex-direction:column;gap:10px}
.ecp .ref-card .ref-name{font-size:14px;font-weight:700;color:#5eead4;letter-spacing:.06em}
.ecp .ref-card .ref-desc{font-size:13px;color:#64748b;line-height:1.5}

.ecp .s-takeaways{background:#042f2e}
.ecp .takeaways-inner{padding:72px 100px;display:flex;flex-direction:column;justify-content:center;height:100%}
.ecp .takeaways-inner h2{font-size:52px;font-weight:700;color:#f1f5f9;margin-bottom:40px}
.ecp .takeaway-list{display:flex;flex-direction:column;gap:18px}
.ecp .takeaway-item{display:flex;align-items:flex-start;gap:20px;padding:22px 28px;border-radius:14px;background:rgba(15,118,110,.1);border:1px solid rgba(94,234,212,.12)}
.ecp .takeaway-num{width:38px;height:38px;border-radius:50%;background:#0f766e;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:white;flex-shrink:0;margin-top:1px}
.ecp .takeaway-item p{font-size:19px;color:#ccfbf1;line-height:1.6}
.ecp .takeaway-item strong{color:#f8fafc}

.ecp .s-end{background:#042f2e;justify-content:center;align-items:center}
.ecp .end-inner{text-align:center;z-index:1}
.ecp .end-inner h1{font-size:78px;font-weight:700;color:#f8fafc;margin-bottom:24px;line-height:1.1}
.ecp .end-inner p{font-size:24px;color:#5eead4;margin-bottom:14px;font-weight:300}
.ecp .end-note{font-size:16px;color:#134e4a;margin-top:8px}
`,oc=[{classes:"s-title",label:"01 Title",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="ecp-rg1" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="rgba(15,118,110,0.2)"/>
      <stop offset="100%" stop-color="rgba(4,47,46,0)"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#ecp-rg1)"/>
  <circle cx="1720" cy="160" r="320" fill="rgba(45,212,191,0.06)"/>
  <circle cx="200" cy="900" r="280" fill="rgba(15,118,110,0.05)"/>
  <text x="1560" y="980" font-size="200" font-weight="800" fill="rgba(45,212,191,0.04)" font-family="'DM Sans',sans-serif" text-anchor="middle">CP</text>
</svg>
<div class="inner a1">
  <p class="eyebrow">DATABASE MANAGEMENT SYSTEMS</p>
  <h1>Composite Attributes<br/><span>&amp; Participation Constraints</span></h1>
  <div class="amber-bar"></div>
  <p class="sub">ER Chen's Notation — Lesson 4 of 5</p>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-agenda",label:"02 What You Will Learn",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
  <circle cx="1820" cy="100" r="380" fill="rgba(15,118,110,0.05)"/>
</svg>
<div class="agenda-inner">
  <p class="eyebrow a1">Lesson Roadmap</p>
  <h2 class="a1">What You'll Learn</h2>
  <div class="agenda-cols">
    <div class="agenda-group a2">
      <h3>Part A — Composite Attributes</h3>
      <div class="agenda-item"><div class="agenda-dot"></div><p>What composite attributes are and why they matter</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Sub-attribute branching notation in Chen's diagrams</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Real-world examples — Name, Address</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Composite vs. simple vs. multivalued</p></div>
    </div>
    <div class="agenda-group a3">
      <h3>Part B — Participation Constraints</h3>
      <div class="agenda-item"><div class="agenda-dot"></div><p>What participation constraints are and why they matter</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Total participation — double line (══) notation</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Partial participation — single line (──) notation</p></div>
      <div class="agenda-item"><div class="agenda-dot"></div><p>Applying constraints to real business rules</p></div>
    </div>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-sectionbreak",label:"03 Section — Composite Attributes",html:`<div class="sb-watermark">01</div>
<div class="sb-inner">
  <p class="sb-eyebrow a1">PART ONE</p>
  <h2 class="a2">Composite Attributes</h2>
  <p class="a3">An attribute composed of smaller, meaningful sub-attributes</p>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"04 What Is a Composite Attribute",html:`<div style="padding:38px 96px 18px;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;font-weight:700">Composite Attributes</div>
</div>
<div class="concept-body">
  <div class="concept-left">
    <div class="concept-badge a1">Definition</div>
    <h2 class="a1">A Whole Made of Parts</h2>
    <p class="concept-desc a2">A <strong>composite attribute</strong> is an attribute that can be broken down into smaller sub-attributes, each representing a distinct, meaningful piece of information. Unlike a simple attribute, it has <strong>internal structure</strong>.</p>
    <div class="rule-card a3">Key Insight — When you need to <strong>query or process individual parts</strong> of an attribute (e.g., search by City, sort by LastName, extract PostCode for a report), model it as composite.</div>
    <div class="chips a4">
      <span class="chip">Has sub-attributes</span>
      <span class="chip">Branching notation</span>
      <span class="chip">Individually queryable</span>
    </div>
  </div>
  <div class="concept-right">
    <svg viewBox="0 0 820 580" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- CUSTOMER entity -->
      <rect x="60" y="258" width="200" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="160" y="300" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">CUSTOMER</text>

      <!-- CustomerId (key) -->
      <line x1="120" y1="258" x2="90" y2="185" stroke="#64748b" stroke-width="1.5"/>
      <ellipse cx="70" cy="165" rx="74" ry="27" fill="white" stroke="#64748b" stroke-width="2"/>
      <text x="70" y="162" text-anchor="middle" font-size="14" fill="#042f2e" font-weight="600" text-decoration="underline">CustomerId</text>

      <!-- Line entity to Address -->
      <line x1="230" y1="294" x2="340" y2="248" stroke="#0f766e" stroke-width="2"/>

      <!-- Address composite ellipse -->
      <ellipse cx="420" cy="228" rx="96" ry="36" fill="#f0fdfa" stroke="#0f766e" stroke-width="3"/>
      <text x="420" y="234" text-anchor="middle" font-size="17" font-weight="700" fill="#0f766e">Address</text>

      <!-- Lines from Address to sub-attrs -->
      <line x1="366" y1="200" x2="288" y2="130" stroke="#0f766e" stroke-width="1.5"/>
      <line x1="405" y1="193" x2="390" y2="120" stroke="#0f766e" stroke-width="1.5"/>
      <line x1="464" y1="198" x2="540" y2="128" stroke="#0f766e" stroke-width="1.5"/>
      <line x1="504" y1="222" x2="618" y2="210" stroke="#0f766e" stroke-width="1.5"/>

      <!-- Sub-attribute ellipses -->
      <ellipse cx="250" cy="108" rx="78" ry="27" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="250" y="113" text-anchor="middle" font-size="13" fill="#134e4a">StreetNumber</text>

      <ellipse cx="398" cy="98" rx="70" ry="27" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="398" y="103" text-anchor="middle" font-size="13" fill="#134e4a">StreetName</text>

      <ellipse cx="564" cy="106" rx="52" ry="27" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="564" y="111" text-anchor="middle" font-size="13" fill="#134e4a">City</text>

      <ellipse cx="656" cy="222" rx="66" ry="27" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="656" y="227" text-anchor="middle" font-size="13" fill="#134e4a">PostCode</text>

      <!-- Annotation -->
      <rect x="50" y="390" width="720" height="72" rx="10" fill="rgba(15,118,110,0.12)" stroke="rgba(45,212,191,0.3)" stroke-width="1"/>
      <text x="410" y="420" text-anchor="middle" font-size="15" fill="#5eead4" font-weight="700">← Outer ellipse = composite attribute (thicker teal border)</text>
      <text x="410" y="446" text-anchor="middle" font-size="14" fill="#94a3b8">Small ellipses connected by lines = sub-attributes (each queryable separately)</text>
    </svg>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"05 Chen's Notation — How to Draw",html:`<div style="padding:38px 96px 18px;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;font-weight:700">Chen's Notation Rule</div>
</div>
<div class="concept-body">
  <div class="concept-left">
    <div class="concept-badge a1">The Rule</div>
    <h2 class="a1">Parent → Children Branching</h2>
    <div class="rule-card a2">① Draw an ellipse for the <strong>composite attribute</strong> — use a thicker border to distinguish it</div>
    <div class="rule-card a3">② Draw smaller ellipses for each <strong>sub-attribute</strong>, connected to the parent by lines</div>
    <div class="rule-card a4">③ Sub-attributes can themselves be <strong>composite</strong> — nested branching is allowed</div>
    <div class="tip-card a5">In SQL mapping, the composite parent is <strong>never a column</strong>. Only the leaf sub-attributes become columns in the table.</div>
  </div>
  <div class="concept-right">
    <svg viewBox="0 0 740 500" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- Parent composite ellipse (large, centre) -->
      <ellipse cx="370" cy="240" rx="110" ry="42" fill="#f0fdfa" stroke="#0f766e" stroke-width="3.5"/>
      <text x="370" y="246" text-anchor="middle" font-size="18" font-weight="700" fill="#0f766e">CompositeAttr</text>

      <!-- Sub-attribute 1 (top-left) -->
      <line x1="298" y1="204" x2="190" y2="130" stroke="#0f766e" stroke-width="1.5"/>
      <ellipse cx="142" cy="108" rx="86" ry="30" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="142" y="113" text-anchor="middle" font-size="14" fill="#134e4a">SubAttribute1</text>

      <!-- Sub-attribute 2 (top-centre) -->
      <line x1="370" y1="198" x2="370" y2="128" stroke="#0f766e" stroke-width="1.5"/>
      <ellipse cx="370" cy="102" rx="86" ry="30" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="370" y="107" text-anchor="middle" font-size="14" fill="#134e4a">SubAttribute2</text>

      <!-- Sub-attribute 3 (top-right) -->
      <line x1="442" y1="204" x2="548" y2="130" stroke="#0f766e" stroke-width="1.5"/>
      <ellipse cx="596" cy="108" rx="86" ry="30" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="596" y="113" text-anchor="middle" font-size="14" fill="#134e4a">SubAttribute3</text>

      <!-- Labels -->
      <text x="40" y="74" font-size="13" fill="#5eead4" font-weight="700">Sub-attributes (leaves)</text>
      <line x1="40" y1="80" x2="56" y2="96" stroke="#5eead4" stroke-width="1" stroke-dasharray="3,2"/>

      <text x="460" y="270" font-size="13" fill="#5eead4" font-weight="700">Parent composite</text>
      <text x="460" y="290" font-size="13" fill="#5eead4">(thicker border)</text>

      <!-- Bottom note box -->
      <rect x="60" y="370" width="620" height="62" rx="10" fill="rgba(15,118,110,0.15)" stroke="rgba(45,212,191,0.25)"/>
      <text x="370" y="396" text-anchor="middle" font-size="14" fill="#5eead4" font-weight="700">Example: Name → (FirstName, MiddleName, LastName)</text>
      <text x="370" y="418" text-anchor="middle" font-size="13" fill="#64748b">Each sub-attribute becomes its own column in SQL: first_name, middle_name, last_name</text>
    </svg>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-light",label:"06 Real Example — PERSON Entity",html:`<div style="padding:38px 96px 18px;background:#f0fdfa;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#0f766e;font-weight:700">Real-World Example</div>
</div>
<div class="concept-body">
  <div class="concept-left" style="background:#f0fdfa">
    <div class="concept-badge a1">PERSON Entity</div>
    <h2 class="a1" style="color:#042f2e">Name &amp; Address as Composites</h2>
    <p class="concept-desc a2" style="color:#134e4a">A PERSON entity commonly has two composite attributes: <strong>Name</strong> (FirstName, MiddleName, LastName) and <strong>Address</strong> (StreetName, City, PostCode). Simple attributes like DateOfBirth and PersonId remain flat ellipses.</p>
    <div class="rule-card a3" style="background:white;border-left-color:#0f766e;color:#134e4a"><strong>SQL Impact:</strong> The PERSON table will NOT have "name" or "address" columns. Instead: first_name, middle_name, last_name, street_name, city, post_code.</div>
    <div class="hint-card a4">Always ask: "Will I ever need to search, sort, or filter by a <em>part</em> of this attribute?" If yes → make it composite.</div>
  </div>
  <div class="concept-right" style="background:#ccfbf1">
    <svg viewBox="0 0 960 700" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- PERSON entity -->
      <rect x="380" y="300" width="200" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="480" y="342" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">PERSON</text>

      <!-- PersonId (key) -->
      <line x1="430" y1="300" x2="365" y2="228" stroke="#64748b" stroke-width="1.5"/>
      <ellipse cx="328" cy="208" rx="72" ry="27" fill="white" stroke="#64748b" stroke-width="2"/>
      <text x="328" y="205" text-anchor="middle" font-size="14" fill="#042f2e" font-weight="600" text-decoration="underline">PersonId</text>

      <!-- DateOfBirth (simple) -->
      <line x1="530" y1="300" x2="592" y2="228" stroke="#64748b" stroke-width="1.5"/>
      <ellipse cx="628" cy="208" rx="80" ry="27" fill="white" stroke="#64748b" stroke-width="2"/>
      <text x="628" y="213" text-anchor="middle" font-size="14" fill="#374151">DateOfBirth</text>

      <!-- Name composite -->
      <line x1="400" y1="300" x2="240" y2="372" stroke="#0f766e" stroke-width="2"/>
      <ellipse cx="175" cy="388" rx="88" ry="32" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
      <text x="175" y="394" text-anchor="middle" font-size="16" font-weight="700" fill="#0f766e">Name</text>

      <!-- Name sub-attrs -->
      <line x1="120" y1="365" x2="68" y2="294" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="46" cy="270" rx="70" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="46" y="275" text-anchor="middle" font-size="12" fill="#134e4a">FirstName</text>

      <line x1="168" y1="356" x2="142" y2="282" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="136" cy="256" rx="74" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="136" y="261" text-anchor="middle" font-size="12" fill="#134e4a">MiddleName</text>

      <line x1="230" y1="360" x2="260" y2="290" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="274" cy="266" rx="66" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="274" y="271" text-anchor="middle" font-size="12" fill="#134e4a">LastName</text>

      <!-- Address composite -->
      <line x1="560" y1="300" x2="720" y2="372" stroke="#0f766e" stroke-width="2"/>
      <ellipse cx="782" cy="388" rx="88" ry="32" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
      <text x="782" y="394" text-anchor="middle" font-size="16" font-weight="700" fill="#0f766e">Address</text>

      <!-- Address sub-attrs -->
      <line x1="726" y1="362" x2="660" y2="290" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="638" cy="266" rx="72" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="638" y="271" text-anchor="middle" font-size="12" fill="#134e4a">StreetName</text>

      <line x1="782" y1="356" x2="800" y2="280" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="810" cy="256" rx="50" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="810" y="261" text-anchor="middle" font-size="12" fill="#134e4a">City</text>

      <line x1="840" y1="362" x2="900" y2="290" stroke="#0f766e" stroke-width="1"/>
      <ellipse cx="920" cy="266" rx="62" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      <text x="920" y="271" text-anchor="middle" font-size="12" fill="#134e4a">PostCode</text>

      <!-- Legend labels -->
      <text x="100" y="490" text-anchor="middle" font-size="13" fill="#0f766e" font-weight="700">Composite (teal)</text>
      <text x="490" y="490" text-anchor="middle" font-size="13" fill="#64748b" font-weight="700">Key attribute (underlined)</text>
      <text x="820" y="490" text-anchor="middle" font-size="13" fill="#94a3b8" font-weight="700">Simple attribute (gray)</text>
    </svg>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-compare",label:"07 Composite vs Simple vs Multivalued",html:`<div class="compare-inner">
  <h2 class="a1">Three Types of Attributes at a Glance</h2>
  <div class="compare-cols">
    <div class="compare-card a2" style="background:#f0fdfa;border:2px solid #5eead4">
      <div>
        <div class="compare-title" style="color:#0f766e">Composite Attribute</div>
        <div class="compare-tag" style="color:#134e4a">One value — broken into parts</div>
      </div>
      <svg viewBox="0 0 340 130" style="height:100px;width:auto" font-family="'DM Sans',sans-serif">
        <ellipse cx="170" cy="68" rx="80" ry="28" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
        <text x="170" y="73" text-anchor="middle" font-size="14" font-weight="700" fill="#0f766e">Address</text>
        <line x1="120" y1="44" x2="66" y2="18" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="46" cy="12" rx="52" ry="16" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
        <text x="46" y="17" text-anchor="middle" font-size="11" fill="#134e4a">City</text>
        <line x1="170" y1="40" x2="170" y2="16" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="170" cy="10" rx="62" ry="14" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
        <text x="170" y="15" text-anchor="middle" font-size="11" fill="#134e4a">StreetName</text>
        <line x1="220" y1="44" x2="274" y2="18" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="296" cy="12" rx="56" ry="16" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
        <text x="296" y="17" text-anchor="middle" font-size="11" fill="#134e4a">PostCode</text>
      </svg>
      <div class="compare-item" style="color:#134e4a;border-bottom-color:#99f6e4">Example: <strong>Address</strong> = StreetName + City + PostCode</div>
      <div class="compare-item" style="color:#134e4a;border-bottom:0">SQL: <strong>street_name, city, post_code</strong> columns (no "address" column)</div>
    </div>

    <div class="compare-card a3" style="background:#f8fafc;border:2px solid #cbd5e1">
      <div>
        <div class="compare-title" style="color:#475569">Simple Attribute</div>
        <div class="compare-tag" style="color:#64748b">One value — no internal parts</div>
      </div>
      <svg viewBox="0 0 340 130" style="height:100px;width:auto" font-family="'DM Sans',sans-serif">
        <ellipse cx="170" cy="68" rx="80" ry="28" fill="white" stroke="#64748b" stroke-width="2"/>
        <text x="170" y="73" text-anchor="middle" font-size="14" fill="#374151">DateOfBirth</text>
      </svg>
      <div class="compare-item" style="color:#475569;border-bottom-color:#e2e8f0">Example: <strong>DateOfBirth</strong> is always one date value</div>
      <div class="compare-item" style="color:#475569;border-bottom:0">SQL: <strong>date_of_birth</strong> column — stored directly as-is</div>
    </div>

    <div class="compare-card a4" style="background:#fef9c3;border:2px solid #fde68a;grid-column:1/-1">
      <div>
        <div class="compare-title" style="color:#92400e">Multivalued Attribute</div>
        <div class="compare-tag" style="color:#78350f">MULTIPLE values — no internal structure (double ellipse)</div>
      </div>
      <div style="display:flex;align-items:center;gap:48px">
        <svg viewBox="0 0 340 100" style="height:80px;width:auto" font-family="'DM Sans',sans-serif">
          <ellipse cx="170" cy="55" rx="84" ry="30" fill="white" stroke="#b45309" stroke-width="2"/>
          <ellipse cx="170" cy="55" rx="74" ry="22" fill="#fef9c3" stroke="#b45309" stroke-width="2"/>
          <text x="170" y="60" text-anchor="middle" font-size="14" fill="#92400e" font-weight="600">PhoneNumber</text>
        </svg>
        <div style="flex:1">
          <div class="compare-item" style="color:#78350f;border-bottom-color:#fde68a">Example: <strong>{PhoneNumber}</strong> holds 021-555-1234 AND 09-888-9999 simultaneously</div>
          <div class="compare-item" style="color:#78350f;border-bottom:0">SQL: creates a <strong>separate table</strong> — e.g. CUSTOMER_PHONE(customer_id FK, phone_number PK)</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-sectionbreak",label:"08 Section — Participation Constraints",html:`<div class="sb-watermark">02</div>
<div class="sb-inner">
  <p class="sb-eyebrow a1">PART TWO</p>
  <h2 class="a2">Participation Constraints</h2>
  <p class="a3">Do ALL entities have to join the relationship — or just SOME?</p>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"09 What Are Participation Constraints",html:`<div style="padding:38px 96px 18px;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;font-weight:700">Participation Constraints</div>
</div>
<div class="concept-body">
  <div class="concept-left">
    <div class="concept-badge a1">Definition</div>
    <h2 class="a1">Mandatory vs. Optional</h2>
    <p class="concept-desc a2">A <strong>participation constraint</strong> specifies whether ALL or only SOME entities in an entity set must participate in a relationship. It captures a <strong>business rule</strong> about obligation.</p>
    <div class="rule-card a3">Think of it as a contract: "<em>Every X must be linked to a Y</em>" (total) vs. "<em>Some X may be linked to a Y, but not required</em>" (partial).</div>
    <div class="chips a4">
      <span class="chip">Total = mandatory</span>
      <span class="chip">Partial = optional</span>
      <span class="chip">Enforced by DB constraints</span>
    </div>
  </div>
  <div class="concept-right">
    <svg viewBox="0 0 820 520" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- Total card -->
      <rect x="40" y="40" width="340" height="200" rx="14" fill="rgba(22,163,74,0.08)" stroke="#16a34a" stroke-width="2"/>
      <text x="210" y="80" text-anchor="middle" font-size="16" font-weight="700" fill="#16a34a" letter-spacing="0.08em">TOTAL PARTICIPATION</text>
      <text x="210" y="108" text-anchor="middle" font-size="14" fill="#166534">Double line (══)</text>
      <line x1="100" y1="145" x2="180" y2="145" stroke="#16a34a" stroke-width="2.5"/>
      <line x1="100" y1="151" x2="180" y2="151" stroke="#16a34a" stroke-width="2.5"/>
      <text x="210" y="186" text-anchor="middle" font-size="14" fill="#166534" font-style="italic">"Every EMPLOYEE must</text>
      <text x="210" y="208" text-anchor="middle" font-size="14" fill="#166534" font-style="italic">work in a DEPARTMENT"</text>
      <text x="210" y="228" text-anchor="middle" font-size="13" fill="#4ade80">Key word: must / every / all / required</text>

      <!-- Partial card -->
      <rect x="440" y="40" width="340" height="200" rx="14" fill="rgba(100,116,139,0.08)" stroke="#94a3b8" stroke-width="2"/>
      <text x="610" y="80" text-anchor="middle" font-size="16" font-weight="700" fill="#475569" letter-spacing="0.08em">PARTIAL PARTICIPATION</text>
      <text x="610" y="108" text-anchor="middle" font-size="14" fill="#475569">Single line (──)</text>
      <line x1="500" y1="148" x2="580" y2="148" stroke="#94a3b8" stroke-width="2"/>
      <text x="610" y="186" text-anchor="middle" font-size="14" fill="#475569" font-style="italic">"Some EMPLOYEE may</text>
      <text x="610" y="208" text-anchor="middle" font-size="14" fill="#475569" font-style="italic">manage a DEPARTMENT"</text>
      <text x="610" y="228" text-anchor="middle" font-size="13" fill="#94a3b8">Key word: may / can / optional / might</text>

      <!-- Bottom diagram -->
      <rect x="40" y="320" width="740" height="140" rx="14" fill="rgba(15,118,110,0.08)" stroke="rgba(45,212,191,0.2)"/>
      <text x="420" y="355" text-anchor="middle" font-size="14" fill="#5eead4" font-weight="700">Why does it matter?</text>
      <text x="420" y="380" text-anchor="middle" font-size="14" fill="#94a3b8">Total participation maps to a NOT NULL FK constraint in SQL.</text>
      <text x="420" y="404" text-anchor="middle" font-size="14" fill="#94a3b8">Partial participation means the FK column allows NULL values.</text>
      <text x="420" y="428" text-anchor="middle" font-size="13" fill="#64748b">Getting this right prevents data integrity issues at the database level.</text>
    </svg>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"10 Total Participation — Double Line",html:`<div style="padding:38px 96px 18px;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;font-weight:700">Participation Constraints</div>
</div>
<div class="concept-body">
  <div class="concept-left">
    <div class="concept-badge a1" style="background:#14532d;color:#86efac">Total Participation</div>
    <h2 class="a1">Double Line Notation ══</h2>
    <p class="concept-desc a2">When <strong>every entity</strong> in the set must participate in at least one relationship instance, we draw a <strong>double line</strong> between the entity and the relationship diamond.</p>
    <div class="rule-card a3">Also called <strong>mandatory</strong> or <strong>existence-dependent</strong> participation. Business rule language: <em>"Every X must…"</em>, <em>"All X are…"</em>, <em>"X is required to…"</em></div>
    <div class="tip-card a4">Business rule: "Every EMPLOYEE must belong to exactly one DEPARTMENT." → EMPLOYEE side gets a <strong>double line</strong> to the works_in relationship.</div>
  </div>
  <div class="concept-right">
    <svg viewBox="0 0 960 500" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- EMPLOYEE entity -->
      <rect x="40" y="194" width="220" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="150" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#042f2e">EMPLOYEE</text>

      <!-- DOUBLE LINE from EMPLOYEE to diamond (total) -->
      <line x1="260" y1="226" x2="388" y2="226" stroke="#16a34a" stroke-width="2.5"/>
      <line x1="260" y1="233" x2="388" y2="233" stroke="#16a34a" stroke-width="2.5"/>
      <text x="324" y="214" text-anchor="middle" font-size="20" font-weight="700" fill="#16a34a">N</text>

      <!-- works_in diamond -->
      <polygon points="488,190 600,229 488,268 376,229" fill="#0d3d3a" stroke="#2dd4bf" stroke-width="3"/>
      <text x="488" y="235" text-anchor="middle" font-size="17" font-weight="700" fill="#5eead4">works_in</text>

      <!-- SINGLE LINE from diamond to DEPARTMENT (partial) -->
      <line x1="600" y1="229" x2="700" y2="229" stroke="#94a3b8" stroke-width="2"/>
      <text x="650" y="214" text-anchor="middle" font-size="20" font-weight="700" fill="#374151">1</text>

      <!-- DEPARTMENT entity -->
      <rect x="700" y="194" width="240" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="820" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#042f2e">DEPARTMENT</text>

      <!-- Annotation: EMPLOYEE side -->
      <rect x="20" y="315" width="260" height="72" rx="10" fill="rgba(22,163,74,0.12)" stroke="#16a34a" stroke-width="1.5"/>
      <text x="150" y="344" text-anchor="middle" font-size="14" font-weight="700" fill="#16a34a">Total participation</text>
      <text x="150" y="366" text-anchor="middle" font-size="13" fill="#166534">Every employee MUST</text>
      <text x="150" y="384" text-anchor="middle" font-size="13" fill="#166534">work in a department</text>

      <!-- Annotation: DEPARTMENT side -->
      <rect x="680" y="315" width="260" height="72" rx="10" fill="rgba(100,116,139,0.1)" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="810" y="344" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Partial participation</text>
      <text x="810" y="366" text-anchor="middle" font-size="13" fill="#64748b">A department CAN exist</text>
      <text x="810" y="384" text-anchor="middle" font-size="13" fill="#64748b">with no employees yet</text>

      <!-- Double line label -->
      <text x="324" y="264" text-anchor="middle" font-size="12" fill="#4ade80">Double line ══</text>
    </svg>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-concept",label:"11 Partial Participation — Single Line",html:`<div style="padding:38px 96px 18px;flex-shrink:0">
  <div style="font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#2dd4bf;font-weight:700">Participation Constraints</div>
</div>
<div class="concept-body">
  <div class="concept-left">
    <div class="concept-badge a1" style="background:#1e293b;color:#94a3b8">Partial Participation</div>
    <h2 class="a1">Single Line Notation ──</h2>
    <p class="concept-desc a2">When only <strong>some entities</strong> need to participate in a relationship, we use the default <strong>single line</strong>. This is the optional constraint — entities may or may not be linked.</p>
    <div class="rule-card a3">Also called <strong>optional</strong> participation. Business rule language: <em>"Some X may…"</em>, <em>"An X can but doesn't have to…"</em>, <em>"X is not required to…"</em></div>
    <div class="tip-card a4">Business rule: "Some EMPLOYEE may manage a DEPARTMENT (but most employees don't manage anything)." → single line from EMPLOYEE to manages.</div>
  </div>
  <div class="concept-right">
    <svg viewBox="0 0 960 500" style="width:100%;height:100%" font-family="'DM Sans',sans-serif">
      <!-- EMPLOYEE entity -->
      <rect x="40" y="194" width="220" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="150" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#042f2e">EMPLOYEE</text>

      <!-- SINGLE LINE both sides (partial) -->
      <line x1="260" y1="229" x2="376" y2="229" stroke="#94a3b8" stroke-width="2"/>
      <text x="318" y="214" text-anchor="middle" font-size="20" font-weight="700" fill="#374151">1</text>

      <!-- manages diamond -->
      <polygon points="488,190 600,229 488,268 376,229" fill="#0d3d3a" stroke="#94a3b8" stroke-width="2.5"/>
      <text x="488" y="235" text-anchor="middle" font-size="17" font-weight="700" fill="#94a3b8">manages</text>

      <line x1="600" y1="229" x2="700" y2="229" stroke="#94a3b8" stroke-width="2"/>
      <text x="650" y="214" text-anchor="middle" font-size="20" font-weight="700" fill="#374151">1</text>

      <!-- DEPARTMENT entity -->
      <rect x="700" y="194" width="240" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
      <text x="820" y="236" text-anchor="middle" font-size="20" font-weight="700" fill="#042f2e">DEPARTMENT</text>

      <!-- Annotation EMPLOYEE -->
      <rect x="20" y="315" width="270" height="72" rx="10" fill="rgba(100,116,139,0.1)" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="155" y="344" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Partial participation</text>
      <text x="155" y="366" text-anchor="middle" font-size="13" fill="#64748b">Only SOME employees</text>
      <text x="155" y="384" text-anchor="middle" font-size="13" fill="#64748b">manage a department</text>

      <!-- Annotation DEPARTMENT -->
      <rect x="680" y="315" width="270" height="72" rx="10" fill="rgba(100,116,139,0.1)" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="815" y="344" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Partial participation</text>
      <text x="815" y="366" text-anchor="middle" font-size="13" fill="#64748b">Some departments may</text>
      <text x="815" y="384" text-anchor="middle" font-size="13" fill="#64748b">have no manager yet</text>

      <!-- Single line label -->
      <text x="318" y="258" text-anchor="middle" font-size="12" fill="#94a3b8">Single line ──</text>
    </svg>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-compare",label:"12 Total vs Partial — Side by Side",html:`<div class="compare-inner">
  <h2 class="a1">Total vs. Partial at a Glance</h2>
  <div class="compare-cols">
    <div class="compare-card green a2">
      <div>
        <div class="compare-title" style="color:#15803d">Total Participation (══)</div>
        <div class="compare-tag" style="color:#166534">EVERY entity must participate</div>
      </div>
      <div class="compare-rule" style="background:#dcfce7;color:#14532d">Entity ══ Relationship</div>
      <div class="compare-item" style="color:#166534">Every ORDER must belong to a CUSTOMER</div>
      <div class="compare-item" style="color:#166534">Every ORDER_ITEM must be part of an ORDER</div>
      <div class="compare-item" style="color:#166534;border-bottom:0">Every EMPLOYEE must work in a DEPARTMENT</div>
      <div class="compare-rule" style="background:#bbf7d0;color:#14532d;font-size:14px;margin-top:8px">Key words: <em>must · every · all · required · always</em></div>
    </div>

    <div class="compare-card slate a3">
      <div>
        <div class="compare-title" style="color:#475569">Partial Participation (──)</div>
        <div class="compare-tag" style="color:#64748b">SOME entities may not participate</div>
      </div>
      <div class="compare-rule" style="background:#f1f5f9;color:#475569">Entity ── Relationship</div>
      <div class="compare-item" style="color:#475569">Some CUSTOMER may not have placed any ORDER</div>
      <div class="compare-item" style="color:#475569">Some EMPLOYEE may not manage any DEPARTMENT</div>
      <div class="compare-item" style="color:#475569;border-bottom:0">Some LECTURER may not supervise any STUDENT</div>
      <div class="compare-rule" style="background:#e2e8f0;color:#475569;font-size:14px;margin-top:8px">Key words: <em>may · can · optional · might · not required</em></div>
    </div>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-sectionbreak",label:"13 Section — Activities",html:`<div class="sb-watermark">03</div>
<div class="sb-inner">
  <p class="sb-eyebrow a1">ACTIVITIES</p>
  <h2 class="a2">Apply What You've Learned</h2>
  <p class="a3">2 activities · Composite attributes + Participation constraints</p>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"14 Activity 1 — Bookstore",html:`<div class="act-body">
  <div class="act-left">
    <div class="act-badge a1" style="background:#fef3c7;color:#92400e">Activity 1</div>
    <h2 class="a2">An Online Bookstore</h2>
    <p class="scenario-text a3">A bookstore system stores details about <strong>BOOK</strong> and <strong>AUTHOR</strong> entities.<br/><br/>
      Each <strong>BOOK</strong> has a BookId (key), a Title, a Price, and a full publication address comprising <strong>Building</strong>, <strong>StreetName</strong>, <strong>City</strong>, and <strong>Country</strong>.<br/><br/>
      Each <strong>AUTHOR</strong> has an AuthorId (key) and a full name with <strong>FirstName</strong> and <strong>LastName</strong>.
    </p>
    <div class="task-box a4">
      <div class="task-title">Your Task</div>
      <p>1. Identify the composite attributes in both entities.<br/>2. Draw the ER diagram showing both entities with all their attributes using Chen's notation. Show composite sub-attributes branching correctly.</p>
    </div>
    <div class="hint-card a5">Look for attributes described with "comprising", "consisting of", or that have multiple parts. Each part that could be queried independently is a sub-attribute.</div>
  </div>
  <div class="act-right">
    <div style="width:100%;height:100%;border:2px dashed #a7f3d0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:#f0fdfa">
      <p style="font-size:20px;color:#5eead4;font-weight:500">Your diagram here</p>
    </div>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"15 Answer 1 — Bookstore",html:`<div class="ans-header">
  <span style="background:#dcfce7;color:#14532d;padding:6px 18px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Answer</span>
  <h2>Activity 1 — Bookstore ER Diagram</h2>
</div>
<div style="flex:1;position:relative;overflow:hidden">
<svg style="width:100%;height:100%" viewBox="0 0 1920 870" font-family="'DM Sans',sans-serif">

  <!-- BOOK entity -->
  <rect x="200" y="360" width="200" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
  <text x="300" y="402" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">BOOK</text>

  <!-- BookId (key) -->
  <line x1="250" y1="360" x2="200" y2="278" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="178" cy="258" rx="68" ry="26" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="178" y="255" text-anchor="middle" font-size="14" fill="#042f2e" font-weight="600" text-decoration="underline">BookId</text>

  <!-- Title (simple) -->
  <line x1="310" y1="360" x2="340" y2="278" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="356" cy="258" rx="52" ry="26" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="356" y="263" text-anchor="middle" font-size="14" fill="#374151">Title</text>

  <!-- Price (simple) -->
  <line x1="375" y1="375" x2="440" y2="318" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="468" cy="302" rx="52" ry="26" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="468" y="307" text-anchor="middle" font-size="14" fill="#374151">Price</text>

  <!-- PublicationAddress (composite) -->
  <line x1="265" y1="432" x2="240" y2="510" stroke="#0f766e" stroke-width="2"/>
  <ellipse cx="235" cy="542" rx="122" ry="34" fill="#f0fdfa" stroke="#0f766e" stroke-width="3"/>
  <text x="235" y="549" text-anchor="middle" font-size="15" font-weight="700" fill="#0f766e">PublicationAddress</text>

  <!-- PublicationAddress sub-attrs -->
  <line x1="156" y1="568" x2="88" y2="638" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="66" cy="658" rx="66" ry="24" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="66" y="663" text-anchor="middle" font-size="12" fill="#134e4a">Building</text>

  <line x1="196" y1="575" x2="170" y2="650" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="166" cy="672" rx="72" ry="24" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="166" y="677" text-anchor="middle" font-size="12" fill="#134e4a">StreetName</text>

  <line x1="270" y1="576" x2="295" y2="650" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="300" cy="672" rx="50" ry="24" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="300" y="677" text-anchor="middle" font-size="12" fill="#134e4a">City</text>

  <line x1="340" y1="564" x2="405" y2="638" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="426" cy="658" rx="66" ry="24" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="426" y="663" text-anchor="middle" font-size="12" fill="#134e4a">Country</text>

  <!-- Composite label annotation -->
  <text x="235" y="730" text-anchor="middle" font-size="13" fill="#0f766e" font-weight="600">↑ Composite attribute (4 sub-attrs)</text>

  <!-- AUTHOR entity -->
  <rect x="1450" y="360" width="220" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
  <text x="1560" y="402" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">AUTHOR</text>

  <!-- AuthorId (key) -->
  <line x1="1500" y1="360" x2="1440" y2="278" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="1414" cy="258" rx="72" ry="26" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="1414" y="255" text-anchor="middle" font-size="14" fill="#042f2e" font-weight="600" text-decoration="underline">AuthorId</text>

  <!-- Name (composite) -->
  <line x1="1620" y1="360" x2="1690" y2="282" stroke="#0f766e" stroke-width="2"/>
  <ellipse cx="1720" cy="258" rx="72" ry="30" fill="#f0fdfa" stroke="#0f766e" stroke-width="3"/>
  <text x="1720" y="264" text-anchor="middle" font-size="16" font-weight="700" fill="#0f766e">Name</text>

  <!-- Name sub-attrs -->
  <line x1="1666" y1="234" x2="1600" y2="174" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="1570" cy="154" rx="72" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="1570" y="159" text-anchor="middle" font-size="13" fill="#134e4a">FirstName</text>

  <line x1="1774" y1="234" x2="1836" y2="174" stroke="#0f766e" stroke-width="1"/>
  <ellipse cx="1862" cy="154" rx="68" ry="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
  <text x="1862" y="159" text-anchor="middle" font-size="13" fill="#134e4a">LastName</text>

  <text x="1720" y="320" text-anchor="middle" font-size="13" fill="#0f766e" font-weight="600">↑ Composite attribute (2 sub-attrs)</text>

  <!-- Middle separator + labels -->
  <line x1="700" y1="100" x2="700" y2="750" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="8,6"/>
  <text x="960" y="130" text-anchor="middle" font-size="20" font-weight="700" fill="#0f766e" letter-spacing="0.08em">KEY: Composite attributes highlighted in teal</text>
  <rect x="720" y="152" width="480" height="44" rx="8" fill="rgba(15,118,110,0.08)" stroke="rgba(45,212,191,0.3)"/>
  <text x="960" y="180" text-anchor="middle" font-size="14" fill="#5eead4">Teal ellipse (thick border) = composite parent · Small teal ellipses = sub-attributes</text>
</svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-act",label:"16 Activity 2 — University Participation",html:`<div class="act-body">
  <div class="act-left">
    <div class="act-badge a1" style="background:#fef3c7;color:#92400e">Activity 2</div>
    <h2 class="a2">A University System</h2>
    <p class="scenario-text a3">A university database tracks <strong>LECTURER</strong> and <strong>MODULE</strong> entities. The following business rules apply:<br/><br/>
      <strong>(1)</strong> Every LECTURER must teach at least one MODULE.<br/>
      <strong>(2)</strong> A MODULE may or may not currently be taught (some modules are inactive).<br/>
      <strong>(3)</strong> Every MODULE must be assigned to exactly one DEPARTMENT.<br/>
      <strong>(4)</strong> A DEPARTMENT can exist even if it currently has no MODULEs assigned.
    </p>
    <div class="task-box a4">
      <div class="task-title">Your Task</div>
      <p>Draw the ER diagram segment showing LECTURER, MODULE, and DEPARTMENT with their <strong>teaches</strong> and <strong>assigned_to</strong> relationships. Apply the correct participation constraints (double or single lines) based on the 4 business rules above.</p>
    </div>
  </div>
  <div class="act-right">
    <div style="width:100%;height:100%;border:2px dashed #a7f3d0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:#f0fdfa">
      <p style="font-size:20px;color:#5eead4;font-weight:500">Your diagram here</p>
    </div>
  </div>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ans",label:"17 Answer 2 — University Participation",html:`<div class="ans-header">
  <span style="background:#dcfce7;color:#14532d;padding:6px 18px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Answer</span>
  <h2>Activity 2 — University Participation Constraints</h2>
</div>
<div style="flex:1;position:relative;overflow:hidden">
<svg style="width:100%;height:100%" viewBox="0 0 1920 790" font-family="'DM Sans',sans-serif">

  <!-- LECTURER entity -->
  <rect x="80" y="330" width="240" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
  <text x="200" y="372" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">LECTURER</text>

  <!-- teaches diamond -->
  <polygon points="620,296 760,368 620,440 480,368" fill="#0d3d3a" stroke="#2dd4bf" stroke-width="3"/>
  <text x="620" y="374" text-anchor="middle" font-size="18" font-weight="700" fill="#5eead4">teaches</text>

  <!-- MODULE entity -->
  <rect x="850" y="330" width="220" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
  <text x="960" y="372" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">MODULE</text>

  <!-- assigned_to diamond -->
  <polygon points="1360,296 1500,368 1360,440 1220,368" fill="#0d3d3a" stroke="#2dd4bf" stroke-width="3"/>
  <text x="1360" y="374" text-anchor="middle" font-size="17" font-weight="700" fill="#5eead4">assigned_to</text>

  <!-- DEPARTMENT entity -->
  <rect x="1590" y="330" width="250" height="72" rx="4" fill="white" stroke="#134e4a" stroke-width="3"/>
  <text x="1715" y="372" text-anchor="middle" font-size="22" font-weight="700" fill="#042f2e">DEPARTMENT</text>

  <!-- LECTURER ══ teaches (Rule 1: every lecturer MUST teach) -->
  <line x1="320" y1="362" x2="480" y2="362" stroke="#16a34a" stroke-width="2.5"/>
  <line x1="320" y1="369" x2="480" y2="369" stroke="#16a34a" stroke-width="2.5"/>
  <text x="400" y="348" text-anchor="middle" font-size="20" font-weight="700" fill="#16a34a">N</text>

  <!-- teaches ── MODULE (Rule 2: module MAY not be taught) -->
  <line x1="760" y1="366" x2="850" y2="366" stroke="#94a3b8" stroke-width="2"/>
  <text x="805" y="348" text-anchor="middle" font-size="20" font-weight="700" fill="#374151">M</text>

  <!-- MODULE ══ assigned_to (Rule 3: every module MUST be in a dept) -->
  <line x1="1070" y1="362" x2="1220" y2="362" stroke="#16a34a" stroke-width="2.5"/>
  <line x1="1070" y1="369" x2="1220" y2="369" stroke="#16a34a" stroke-width="2.5"/>
  <text x="1145" y="348" text-anchor="middle" font-size="20" font-weight="700" fill="#16a34a">N</text>

  <!-- assigned_to ── DEPARTMENT (Rule 4: dept CAN have no modules) -->
  <line x1="1500" y1="366" x2="1590" y2="366" stroke="#94a3b8" stroke-width="2"/>
  <text x="1545" y="348" text-anchor="middle" font-size="20" font-weight="700" fill="#374151">1</text>

  <!-- Annotation boxes -->
  <rect x="60" y="460" width="270" height="72" rx="10" fill="rgba(22,163,74,0.1)" stroke="#16a34a" stroke-width="1.5"/>
  <text x="195" y="487" text-anchor="middle" font-size="14" font-weight="700" fill="#16a34a">Total (Rule 1)</text>
  <text x="195" y="508" text-anchor="middle" font-size="13" fill="#166534">Every lecturer MUST</text>
  <text x="195" y="526" text-anchor="middle" font-size="13" fill="#166534">teach at least one module</text>

  <rect x="840" y="460" width="250" height="72" rx="10" fill="rgba(100,116,139,0.08)" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="965" y="487" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Partial (Rule 2)</text>
  <text x="965" y="508" text-anchor="middle" font-size="13" fill="#64748b">Some modules MAY</text>
  <text x="965" y="526" text-anchor="middle" font-size="13" fill="#64748b">be inactive (untaught)</text>

  <rect x="840" y="545" width="250" height="72" rx="10" fill="rgba(22,163,74,0.1)" stroke="#16a34a" stroke-width="1.5"/>
  <text x="965" y="572" text-anchor="middle" font-size="14" font-weight="700" fill="#16a34a">Total (Rule 3)</text>
  <text x="965" y="592" text-anchor="middle" font-size="13" fill="#166534">Every module MUST</text>
  <text x="965" y="610" text-anchor="middle" font-size="13" fill="#166534">be in a department</text>

  <rect x="1570" y="460" width="270" height="72" rx="10" fill="rgba(100,116,139,0.08)" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="1705" y="487" text-anchor="middle" font-size="14" font-weight="700" fill="#475569">Partial (Rule 4)</text>
  <text x="1705" y="508" text-anchor="middle" font-size="13" fill="#64748b">Departments CAN exist</text>
  <text x="1705" y="526" text-anchor="middle" font-size="13" fill="#64748b">with no modules yet</text>

  <!-- Legend -->
  <rect x="660" y="680" width="600" height="72" rx="10" fill="rgba(15,118,110,0.08)" stroke="rgba(45,212,191,0.2)"/>
  <line x1="700" y1="715" x2="750" y2="715" stroke="#16a34a" stroke-width="2.5"/>
  <line x1="700" y1="721" x2="750" y2="721" stroke="#16a34a" stroke-width="2.5"/>
  <text x="766" y="720" font-size="14" fill="#5eead4">Double line = Total (mandatory)</text>
  <line x1="950" y1="718" x2="1000" y2="718" stroke="#94a3b8" stroke-width="2"/>
  <text x="1016" y="720" font-size="14" fill="#94a3b8">Single line = Partial (optional)</text>
</svg>
</div>
<div class="cr cr-dark">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-ref",label:"18 Symbol Reference",html:`<div class="ref-inner">
  <h2 class="a1">Chen's Notation — Complete Symbol Reference</h2>
  <div class="ref-grid">
    <div class="ref-card a2">
      <div class="ref-name">Entity</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><rect x="10" y="8" width="140" height="44" rx="4" fill="white" stroke="#134e4a" stroke-width="2.5"/><text x="80" y="35" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="14" font-weight="700" fill="#042f2e">ENTITY</text></svg>
      <div class="ref-desc">Rectangle. Represents a real-world object or concept.</div>
    </div>
    <div class="ref-card a2">
      <div class="ref-name">Key Attribute</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><ellipse cx="80" cy="32" rx="68" ry="24" fill="white" stroke="#64748b" stroke-width="2"/><text x="80" y="29" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" font-weight="600" fill="#042f2e" text-decoration="underline">KeyAttr</text></svg>
      <div class="ref-desc">Ellipse with underlined text. Uniquely identifies each entity instance.</div>
    </div>
    <div class="ref-card a2">
      <div class="ref-name">Simple Attribute</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><ellipse cx="80" cy="32" rx="68" ry="24" fill="white" stroke="#64748b" stroke-width="2"/><text x="80" y="37" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" fill="#374151">Attribute</text></svg>
      <div class="ref-desc">Plain ellipse. Holds a single, indivisible value.</div>
    </div>
    <div class="ref-card a3">
      <div class="ref-name">Composite Attribute</div>
      <svg viewBox="0 0 160 80" style="height:60px;width:auto">
        <ellipse cx="80" cy="52" rx="68" ry="24" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
        <text x="80" y="57" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" font-weight="700" fill="#0f766e">Composite</text>
        <line x1="44" y1="30" x2="26" y2="12" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="20" cy="8" rx="24" ry="10" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
        <line x1="80" y1="28" x2="80" y2="12" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="80" cy="8" rx="24" ry="10" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
        <line x1="116" y1="30" x2="134" y2="12" stroke="#0f766e" stroke-width="1.5"/>
        <ellipse cx="140" cy="8" rx="24" ry="10" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.5"/>
      </svg>
      <div class="ref-desc">Outer teal ellipse with branching smaller ellipses for sub-attributes.</div>
    </div>
    <div class="ref-card a3">
      <div class="ref-name">Multivalued Attribute</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><ellipse cx="80" cy="32" rx="68" ry="24" fill="white" stroke="#b45309" stroke-width="2"/><ellipse cx="80" cy="32" rx="58" ry="16" fill="#fef9c3" stroke="#b45309" stroke-width="2"/><text x="80" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#92400e">{MultiValue}</text></svg>
      <div class="ref-desc">Double ellipse. Holds multiple values simultaneously.</div>
    </div>
    <div class="ref-card a3">
      <div class="ref-name">Derived Attribute</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><ellipse cx="80" cy="32" rx="68" ry="24" fill="white" stroke="#64748b" stroke-width="2" stroke-dasharray="7,4"/><text x="80" y="37" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#64748b">(Derived)</text></svg>
      <div class="ref-desc">Dashed ellipse. Computed from other data — never stored.</div>
    </div>
    <div class="ref-card a4">
      <div class="ref-name">Relationship</div>
      <svg viewBox="0 0 160 70" style="height:52px;width:auto"><polygon points="80,6 150,36 80,66 10,36" fill="white" stroke="#b45309" stroke-width="2.5"/><text x="80" y="40" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#7c2d12">rel_name</text></svg>
      <div class="ref-desc">Diamond. Links two or more entity types.</div>
    </div>
    <div class="ref-card a4">
      <div class="ref-name">Weak Entity</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><rect x="6" y="4" width="148" height="52" rx="4" fill="none" stroke="#4c1d95" stroke-width="2"/><rect x="14" y="10" width="132" height="40" rx="2" fill="white" stroke="#4c1d95" stroke-width="2"/><text x="80" y="35" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="13" font-weight="700" fill="#3b0764">WEAK</text></svg>
      <div class="ref-desc">Double rectangle. Cannot exist without its identifying entity.</div>
    </div>
    <div class="ref-card a4">
      <div class="ref-name">Total Participation</div>
      <svg viewBox="0 0 160 40" style="height:32px;width:auto">
        <line x1="10" y1="14" x2="150" y2="14" stroke="#16a34a" stroke-width="2.5"/>
        <line x1="10" y1="22" x2="150" y2="22" stroke="#16a34a" stroke-width="2.5"/>
        <text x="80" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11" fill="#16a34a">══ double line</text>
      </svg>
      <div class="ref-desc">Double line. Every entity must participate (mandatory).</div>
    </div>
    <div class="ref-card a5">
      <div class="ref-name">Partial Participation</div>
      <svg viewBox="0 0 160 40" style="height:32px;width:auto">
        <line x1="10" y1="18" x2="150" y2="18" stroke="#94a3b8" stroke-width="2"/>
        <text x="80" y="36" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11" fill="#94a3b8">── single line</text>
      </svg>
      <div class="ref-desc">Single line (default). Some entities may not participate (optional).</div>
    </div>
    <div class="ref-card a5">
      <div class="ref-name">Identifying Relationship</div>
      <svg viewBox="0 0 160 70" style="height:52px;width:auto"><polygon points="80,6 148,36 80,66 12,36" fill="none" stroke="#4c1d95" stroke-width="2.5"/><polygon points="80,16 136,36 80,56 24,36" fill="white" stroke="#4c1d95" stroke-width="2"/><text x="80" y="40" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11" fill="#3b0764">id-rel</text></svg>
      <div class="ref-desc">Double diamond. Links weak entity to its identifying entity.</div>
    </div>
    <div class="ref-card a5">
      <div class="ref-name">Relationship Attribute</div>
      <svg viewBox="0 0 160 60" style="height:46px;width:auto"><line x1="80" y1="0" x2="80" y2="14" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,3"/><ellipse cx="80" cy="40" rx="68" ry="22" fill="white" stroke="#64748b" stroke-width="2"/><text x="80" y="44" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="12" fill="#374151">Grade</text></svg>
      <div class="ref-desc">Ellipse connected to diamond (dashed line). Attribute of the relationship.</div>
    </div>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-takeaways",label:"19 Key Takeaways",html:`<div class="takeaways-inner">
  <h2 class="a1">Key Takeaways</h2>
  <div class="takeaway-list">
    <div class="takeaway-item a2"><div class="takeaway-num">1</div><p>A <strong>composite attribute</strong> has sub-attributes — draw as an outer teal ellipse with smaller ellipses branching off it via lines.</p></div>
    <div class="takeaway-item a3"><div class="takeaway-num">2</div><p>Sub-attributes represent <strong>individually meaningful parts</strong> — e.g., City and PostCode from Address. You can query each part independently in SQL.</p></div>
    <div class="takeaway-item a4"><div class="takeaway-num">3</div><p>In SQL mapping, <strong>only the leaf sub-attributes become columns</strong>. The composite parent is never a column — it only exists in the ER diagram.</p></div>
    <div class="takeaway-item a5"><div class="takeaway-num">4</div><p><strong>Total participation (══)</strong> = every entity MUST participate. The business rule says "must", "every", or "all". Maps to NOT NULL FK in SQL.</p></div>
    <div class="takeaway-item a5" style="animation-delay:.75s"><div class="takeaway-num">5</div><p><strong>Partial participation (──)</strong> = some entities are optional. The rule says "may", "can", or "optional". The FK column allows NULL in SQL.</p></div>
  </div>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`},{classes:"s-end",label:"20 End",html:`<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 1920 1080">
  <circle cx="1800" cy="200" r="380" fill="rgba(15,118,110,0.06)"/>
  <circle cx="120" cy="880" r="300" fill="rgba(45,212,191,0.04)"/>
</svg>
<div class="end-inner a1">
  <p style="font-size:14px;letter-spacing:.22em;text-transform:uppercase;color:#134e4a;margin-bottom:28px;font-weight:700">ER DIAGRAMS SERIES</p>
  <h1>End of Lesson 4</h1>
  <p>Next up: ER to Relational Schema Mapping</p>
  <p class="end-note">Use the flashcards below to review key terms.</p>
</div>
<div class="cr">© All Rights Reserved by Yasas Sri Wickramasinghe</div>`}],lw=[{front:"What is a composite attribute?",back:"An attribute made up of multiple sub-attributes, each holding a distinct piece of information. Example: Address = StreetNumber + StreetName + City + PostCode."},{front:"How is a composite attribute drawn in Chen's notation?",back:"An outer ellipse (the composite parent, drawn with a thicker teal border) with smaller sub-attribute ellipses connected to it by lines — like branches."},{front:"Give an example of a composite attribute in a booking system.",back:"GuestName (FirstName, LastName), CheckInAddress (StreetName, Suburb, City, PostCode), or ContactDetails (PhoneNumber, Email)."},{front:"Why break an attribute into composite sub-attributes?",back:"To allow querying or processing individual parts — e.g., sorting by LastName, filtering by City, or extracting PostCode for delivery routing."},{front:"What is the difference between composite and multivalued?",back:"Composite: ONE value split into parts (Name = First + Last). Multivalued: MULTIPLE separate values ({PhoneNumber} = 021…, 09…). Different notations and SQL mappings."},{front:"How does a composite attribute map to SQL?",back:"Each sub-attribute becomes its own column. The composite parent itself does NOT become a column. E.g., Address → street_name, city, post_code columns."},{front:"What is a participation constraint?",back:"A rule specifying whether ALL entities in an entity set (total participation) or just SOME (partial participation) must participate in at least one instance of a relationship."},{front:"What does total participation mean and how is it drawn?",back:"Every entity instance MUST participate in at least one relationship instance. Drawn as a DOUBLE LINE (══) between the entity and the relationship diamond."},{front:"What does partial participation mean and how is it drawn?",back:"Some entity instances do NOT have to participate in any relationship instance. Drawn as a SINGLE LINE (──) — the default notation."},{front:'A business rule says "Every ORDER must belong to a CUSTOMER". What participation does ORDER have?',back:"Total participation — drawn as a double line from ORDER to the places/belongs_to relationship diamond. Maps to NOT NULL FK in SQL."},{front:'A business rule says "A CUSTOMER may or may not have placed an ORDER". What participation does CUSTOMER have?',back:"Partial participation — drawn as a single line (default) from CUSTOMER to the relationship diamond. The FK column in ORDER allows NULL."},{front:"How do you identify total vs. partial participation from a business rule?",back:'Total: key words are "must", "every", "all", "required", "always". Partial: key words are "may", "can", "optional", "might", "not necessarily".'}];function dw(){const[e,t]=k.useState(0),[i,n]=k.useState(!1),[s,r]=k.useState(!1),[o,l]=k.useState({}),d=k.useRef(null),c=k.useRef(null),f=oc.length;k.useEffect(()=>{const g="ecp-deck-styles";if(!document.getElementById(g)){const m=document.createElement("style");m.id=g,m.textContent=aw,document.head.appendChild(m)}return()=>{const m=document.getElementById(g);m&&m.remove()}},[]),k.useEffect(()=>{const g=d.current,m=c.current;if(!g||!m)return;const b=new ResizeObserver(()=>{const{width:h,height:x}=g.getBoundingClientRect(),y=Math.min(h/1920,x/1080);m.style.transform=`scale(${y})`,m.style.transformOrigin="top left",g.style.height=`${1080*y}px`});return b.observe(g),()=>b.disconnect()},[]),k.useEffect(()=>{const g=m=>{(m.key==="ArrowRight"||m.key==="ArrowDown")&&t(b=>Math.min(b+1,f-1)),(m.key==="ArrowLeft"||m.key==="ArrowUp")&&t(b=>Math.max(b-1,0)),m.key==="Escape"&&s&&u()};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[s,f]),k.useEffect(()=>{const g=()=>r(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",g),()=>document.removeEventListener("fullscreenchange",g)},[]);function p(){var g,m;(m=(g=d.current)==null?void 0:g.requestFullscreen)==null||m.call(g)}function u(){var g;(g=document.exitFullscreen)==null||g.call(document)}const v=oc[e];return a.jsxs("div",{className:"flex flex-col gap-3",children:[a.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>t(g=>Math.max(g-1,0)),disabled:e===0,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:"rgba(45,212,191,0.3)"},children:a.jsx(wn,{size:18})}),a.jsxs("span",{className:"text-sm font-medium text-gray-600 min-w-[80px] text-center",children:[e+1," / ",f]}),a.jsx("button",{onClick:()=>t(g=>Math.min(g+1,f-1)),disabled:e===f-1,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:"rgba(45,212,191,0.3)"},children:a.jsx(kn,{size:18})})]}),a.jsx("span",{className:"text-xs font-medium text-gray-400 hidden sm:block",children:v.label}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>n(g=>!g),className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:"rgba(45,212,191,0.3)"},title:i?"Collapse":"Expand",children:i?a.jsx(Cn,{size:16}):a.jsx(Sn,{size:16})}),a.jsx("button",{onClick:s?u:p,className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:"rgba(45,212,191,0.3)"},title:s?"Exit fullscreen":"Fullscreen",children:s?a.jsx(Tn,{size:16}):a.jsx(En,{size:16})})]})]}),a.jsx("div",{ref:d,className:"ecp relative w-full overflow-hidden rounded-xl",style:{border:"1px solid rgba(45,212,191,0.3)"},children:a.jsx("div",{ref:c,style:{width:1920,height:1080},children:a.jsx("section",{className:v.classes,dangerouslySetInnerHTML:{__html:v.html}})})}),a.jsx("div",{className:"flex flex-wrap justify-center gap-1.5",children:oc.map((g,m)=>a.jsx("button",{onClick:()=>t(m),title:g.label,className:"rounded-full transition-all",style:{width:m===e?24:8,height:8,background:m===e?"#0f766e":"rgba(15,118,110,0.25)"}},m))}),a.jsxs("div",{className:"mt-6",children:[a.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[a.jsx("div",{style:{width:4,height:24,borderRadius:2,background:"#0f766e",flexShrink:0}}),a.jsx("h3",{className:"text-lg font-bold text-gray-800",children:"Flashcards"}),a.jsx("span",{className:"text-sm text-gray-400",children:"· Click a card to flip"}),a.jsx("button",{onClick:()=>l({}),className:"ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{color:"#0f766e",borderColor:"rgba(15,118,110,0.3)"},children:"Reset all"})]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16},children:lw.map((g,m)=>a.jsx("div",{onClick:()=>l(b=>({...b,[m]:!b[m]})),style:{cursor:"pointer",perspective:1e3,height:170},children:a.jsxs("div",{style:{position:"relative",height:"100%",transformStyle:"preserve-3d",transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)",transform:o[m]?"rotateY(180deg)":"rotateY(0deg)"},children:[a.jsxs("div",{style:{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"white",borderRadius:12,padding:"18px 22px",border:"1.5px solid rgba(15,118,110,0.2)",display:"flex",flexDirection:"column",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"},children:[a.jsx("div",{style:{fontSize:11,color:"#0f766e",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10},children:"Question"}),a.jsx("p",{style:{fontSize:14,color:"#1e293b",lineHeight:1.55,flex:1},children:g.front}),a.jsx("div",{style:{fontSize:11,color:"#5eead4",marginTop:8,textAlign:"right"},children:"Tap to reveal ›"})]}),a.jsxs("div",{style:{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#f0fdfa",borderRadius:12,padding:"18px 22px",border:"1.5px solid rgba(15,118,110,0.35)",display:"flex",flexDirection:"column",transform:"rotateY(180deg)",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"},children:[a.jsx("div",{style:{fontSize:11,color:"#0f766e",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10},children:"Answer"}),a.jsx("p",{style:{fontSize:14,color:"#134e4a",lineHeight:1.55,flex:1},children:g.back})]})]})},m))})]})]})}function cw(){return a.jsx(wt,{eyebrow:"Data Modelling",titleLead:"Let's make sense of",titleAccent:"Attributes & Participation.",gradient:"linear-gradient(90deg, #0f766e, #14b8a6, #6366f1)",accent:"#0f766e",orb2:"#14b8a6",orb3:"#6366f1",subtitle:"The details that decide whether a model is right or wrong. Break attributes into their parts, then read participation constraints — when every row must join in, and when it's optional — through two guided activities.",pills:[{emoji:"🧩",name:"Composite attrs",color:"#0f766e"},{emoji:"➖",name:"Partial",color:"#d97706"},{emoji:"➕",name:"Total",color:"#dc2626"},{emoji:"✅",name:"Activities + answers",color:"#6366f1"}],children:a.jsx(dw,{})})}const Bx="apa-v7-unlocked",fw=`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

.apa *{box-sizing:border-box;margin:0;padding:0}
.apa{font-family:'Inter',sans-serif;
  --title:64px;--h2:48px;--body:32px;--small:26px;--tiny:22px;--micro:19px;
  --px:88px;--pt:68px;--pb:52px;--title-gap:30px;--item-gap:18px;
  --navy:#0f172a;--navy2:#1e1b4b;
  --indigo:#3730a3;--indigo2:#4338ca;--indigo3:#6366f1;--indigo-light:#e0e7ff;
  --purple:#7c3aed;--purple-light:#ede9fe;
  --amber:#b45309;--amber2:#d97706;--gold:#f59e0b;--gold-light:#fef3c7;
  --teal:#0d9488;--teal2:#14b8a6;--teal-light:#ccfbf1;
  --rose:#e11d48;--rose-light:#ffe4e6;
  --green:#059669;--green-light:#d1fae5;
  --slate:#475569;--white:#f8fafc;--off-white:#eef2ff
}
.apa section{width:1920px;height:1080px;position:relative;overflow:hidden;display:flex;flex-direction:column;padding:var(--pt) var(--px) var(--pb);background:var(--white);color:#1e293b}
.apa section.dark{background:var(--navy);color:#f1f5f9}
.apa section.dark-indigo{background:var(--navy2);color:#f1f5f9}
.apa section.warm{background:#fffbeb;color:#1e293b}
.apa section.slate-bg{background:#f1f5f9;color:#1e293b}

.apa .slide-title{font-size:var(--title);font-weight:800;line-height:1.08;letter-spacing:-0.025em;margin-bottom:var(--title-gap)}
.apa .slide-title .accent{color:var(--indigo2)}
.apa section.dark .slide-title .accent,.apa section.dark-indigo .slide-title .accent{color:#a5b4fc}
.apa .section-label{font-size:var(--small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--indigo2);margin-bottom:16px}
.apa section.dark .section-label,.apa section.dark-indigo .section-label{color:#a5b4fc}
.apa section.warm .section-label{color:var(--amber2)}

.apa .body{font-size:var(--body);line-height:1.55}
.apa .small{font-size:var(--small);line-height:1.5}
.apa .tiny{font-size:var(--tiny);line-height:1.5}
.apa .micro{font-size:var(--micro);line-height:1.5}

.apa .two-col{display:grid;grid-template-columns:1fr 1fr;gap:48px;flex:1;align-items:start}
.apa .two-col.eq{align-items:stretch}
.apa .three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;flex:1;align-items:stretch}
.apa .four-col{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:24px;flex:1;align-items:stretch}
.apa .five-col{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:20px;flex:1;align-items:stretch}
.apa .two-row{display:grid;grid-template-rows:1fr 1fr;gap:24px;flex:1}

.apa .callout{border-radius:18px;padding:22px 30px;font-size:var(--body);line-height:1.55}
.apa .callout-indigo{background:var(--indigo-light);border-left:7px solid var(--indigo2)}
.apa .callout-amber{background:var(--gold-light);border-left:7px solid var(--gold)}
.apa .callout-teal{background:var(--teal-light);border-left:7px solid var(--teal)}
.apa .callout-rose{background:var(--rose-light);border-left:7px solid var(--rose)}
.apa .callout-green{background:var(--green-light);border-left:7px solid var(--green)}
.apa .callout-purple{background:var(--purple-light);border-left:7px solid var(--purple)}
.apa section.dark .callout-indigo{background:rgba(67,56,202,0.22);border-left-color:#818cf8;color:#c7d2fe}

.apa .badge{display:inline-block;font-size:var(--tiny);font-weight:700;padding:7px 22px;border-radius:999px;letter-spacing:0.04em}
.apa .badge-indigo{background:var(--indigo2);color:#fff}
.apa .badge-amber{background:var(--gold);color:#fff}
.apa .badge-teal{background:var(--teal);color:#fff}
.apa .badge-rose{background:var(--rose);color:#fff}
.apa .badge-green{background:var(--green);color:#fff}
.apa .badge-purple{background:var(--purple);color:#fff}
.apa .badge-ghost{background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.2)}

.apa table{border-collapse:collapse;font-size:var(--small);width:100%}
.apa th{background:var(--navy2);color:#fff;padding:14px 22px;text-align:left;font-weight:600;font-size:var(--tiny)}
.apa td{padding:12px 22px;border-bottom:1.5px solid #e2e8f0;vertical-align:middle;font-size:var(--tiny)}
.apa tr:nth-child(even) td{background:#f8fafc}
.apa tr:hover td{background:var(--indigo-light);transition:background 0.18s}
.apa .tbl-indigo th{background:var(--indigo2)}
.apa .tbl-dark th{background:#0f172a}
.apa .highlight-row td{background:#fef3c7 !important;font-weight:700}

.apa ul.check{list-style:none;display:flex;flex-direction:column;gap:10px}
.apa ul.check li{font-size:var(--small);line-height:1.5;padding-left:36px;position:relative}
.apa ul.check li::before{content:'✓';position:absolute;left:0;font-weight:800;color:var(--teal);font-size:var(--small)}
.apa section.dark ul.check li::before{color:#5eead4}
.apa ul.cross{list-style:none;display:flex;flex-direction:column;gap:10px}
.apa ul.cross li{font-size:var(--small);line-height:1.5;padding-left:36px;position:relative}
.apa ul.cross li::before{content:'✗';position:absolute;left:0;font-weight:800;color:var(--rose);font-size:var(--small)}

.apa .main-title{font-size:92px;font-weight:900;line-height:1.0;letter-spacing:-0.03em;color:#fff;margin-bottom:24px}
.apa .main-title .accent{color:#a5b4fc}
.apa .title-slide-inner{display:flex;flex-direction:column;justify-content:center;height:100%;max-width:1100px}
.apa .copyright{position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:18px;color:rgba(0,0,0,0.16);letter-spacing:0.04em}
.apa section.dark .copyright,.apa section.dark-indigo .copyright{color:rgba(255,255,255,0.16)}
.apa .deco-circle{position:absolute;border-radius:50%;pointer-events:none}

/* Interactive cite cards */
.apa .cite-card{border-radius:20px;padding:28px 26px;cursor:pointer;transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1);border:2px solid rgba(99,102,241,0.15);background:rgba(255,255,255,0.85);user-select:none}
.apa .cite-card:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 16px 40px rgba(67,56,202,0.15);border-color:var(--indigo2)}
.apa .cite-card[data-revealed='true']{background:var(--indigo-light);border-color:var(--indigo2);transform:translateY(-4px);box-shadow:0 12px 32px rgba(67,56,202,0.2)}
.apa .cite-card .hint-text{font-size:var(--micro);color:var(--slate);margin-top:8px;opacity:0.7}
.apa .cite-card .reveal-content{display:none;margin-top:12px;padding-top:12px;border-top:1.5px dashed rgba(67,56,202,0.3);font-size:var(--micro);color:var(--indigo);font-weight:600;line-height:1.5}
.apa .cite-card[data-revealed='true'] .reveal-content{display:block}
.apa .cite-card[data-revealed='true'] .hint-text{display:none}

/* Mistake cards */
.apa .mistake-card{border-radius:18px;padding:22px 20px;cursor:pointer;transition:all 0.25s;background:rgba(255,255,255,0.9);border:2px solid rgba(225,29,72,0.15);user-select:none}
.apa .mistake-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(225,29,72,0.12);border-color:var(--rose)}
.apa .mistake-card[data-open='true']{background:var(--rose-light);border-color:var(--rose);transform:translateY(-4px);box-shadow:0 12px 28px rgba(225,29,72,0.18)}
.apa .mistake-card .fix{display:none;margin-top:10px;padding-top:10px;border-top:1.5px dashed rgba(225,29,72,0.3);font-size:var(--micro);color:#9f1239;line-height:1.5}
.apa .mistake-card[data-open='true'] .fix{display:block}
.apa .mistake-title{font-size:var(--tiny);font-weight:700;color:#1e293b;line-height:1.3}
.apa .mistake-card[data-open='true'] .mistake-title{color:#9f1239}

/* Code/citation blocks */
.apa .code-block{background:#1e293b;border-radius:16px;padding:26px 34px;font-family:'Courier New',monospace;font-size:var(--small);color:#e2e8f0;line-height:1.7;position:relative}
.apa .code-label{position:absolute;top:-14px;left:20px;background:var(--indigo2);color:white;font-family:'Inter',sans-serif;font-size:var(--micro);font-weight:700;padding:4px 18px;border-radius:999px;letter-spacing:0.06em}
.apa .ca{color:#a5b4fc}
.apa .cy{color:#fbbf24}
.apa .cp{color:#5eead4}
.apa .ct{color:#f9a8d4;font-style:italic}
.apa .cj{color:#86efac;font-style:italic}
.apa .cd{color:#fb923c}

/* Annotation labels */
.apa .ann{position:absolute;font-size:18px;font-weight:700;font-family:'Inter',sans-serif;white-space:nowrap;pointer-events:none}
.apa .ann-line{position:absolute;border:2px dashed;pointer-events:none}

/* Reference anatomy */
.apa .ref-part{display:inline;border-radius:6px;padding:2px 8px;cursor:pointer;transition:all 0.2s;position:relative}
.apa .ref-part:hover{filter:brightness(0.92);transform:scale(1.02)}
.apa .who-part{background:#ddd6fe;color:#4c1d95}
.apa .when-part{background:#fef3c7;color:#92400e}
.apa .what-part{background:#ccfbf1;color:#134e4a}
.apa .where-part{background:#ffe4e6;color:#9f1239}

/* Flow diagram */
.apa .flow-box{border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;position:relative}
.apa .flow-box.in-text{background:linear-gradient(135deg,rgba(67,56,202,0.15),rgba(99,102,241,0.08));border:2.5px solid rgba(67,56,202,0.4)}
.apa .flow-box.ref-list{background:linear-gradient(135deg,rgba(13,148,136,0.15),rgba(20,184,166,0.08));border:2.5px solid rgba(13,148,136,0.4)}
.apa .flow-icon{font-size:52px;line-height:1}
.apa .flow-title{font-size:var(--body);font-weight:800;color:#fff}
.apa .flow-desc{font-size:var(--small);color:rgba(255,255,255,0.6);line-height:1.5}

/* Scenario compare */
.apa .scenario{border-radius:22px;padding:30px 34px;flex:1;display:flex;flex-direction:column;gap:14px}
.apa .scenario.bad{background:linear-gradient(135deg,rgba(254,226,226,0.95),rgba(252,165,165,0.45));border:2px solid rgba(239,68,68,0.3)}
.apa .scenario.good{background:linear-gradient(135deg,rgba(209,250,229,0.95),rgba(167,243,208,0.45));border:2px solid rgba(5,150,105,0.3)}
.apa .scenario-tag{font-size:var(--tiny);font-weight:800;letter-spacing:0.08em;text-transform:uppercase}
.apa .bad .scenario-tag{color:#dc2626}
.apa .good .scenario-tag{color:#059669}
.apa .scenario-quote{font-family:'Lora',serif;font-size:var(--small);font-style:italic;line-height:1.65;color:#334155}
.apa .scenario-note{font-size:var(--micro);font-weight:500;color:#64748b;margin-top:8px}
.apa .bad .scenario-note{color:#991b1b}
.apa .good .scenario-note{color:#065f46}

/* Pillar cards */
.apa .pillar{border-radius:24px;padding:34px 28px;display:flex;flex-direction:column;gap:14px;flex:1}
.apa .pillar-icon{font-size:54px;line-height:1}
.apa .pillar-title{font-size:var(--body);font-weight:800}
.apa .pillar-body{font-size:var(--small);line-height:1.55;opacity:0.85}

/* Animations */
@keyframes apa-fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes apa-pulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.5)}70%{box-shadow:0 0 0 22px rgba(99,102,241,0)}}
@keyframes apa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes apa-glow{0%,100%{opacity:0.5}50%{opacity:1}}
@keyframes apa-bounce{0%,100%{transform:translateX(0)}25%{transform:translateX(8px)}75%{transform:translateX(-8px)}}

.apa .fu{animation:apa-fadeUp 0.55s ease-out both}
.apa .fu1{animation:apa-fadeUp 0.55s 0.1s ease-out both}
.apa .fu2{animation:apa-fadeUp 0.55s 0.22s ease-out both}
.apa .fu3{animation:apa-fadeUp 0.55s 0.36s ease-out both}
.apa .fu4{animation:apa-fadeUp 0.55s 0.5s ease-out both}
.apa .fu5{animation:apa-fadeUp 0.55s 0.64s ease-out both}
.apa .fu6{animation:apa-fadeUp 0.55s 0.78s ease-out both}
.apa .pulse-ring{animation:apa-pulse 2.2s ease-out infinite}
.apa .float{animation:apa-float 3s ease-in-out infinite}
.apa .glow{animation:apa-glow 2s ease-in-out infinite}

/* Step list */
.apa .step-list{display:flex;flex-direction:column;gap:16px}
.apa .step{display:flex;gap:18px;align-items:flex-start}
.apa .step-num{width:44px;height:44px;border-radius:50%;background:var(--indigo2);color:white;display:flex;align-items:center;justify-content:center;font-size:var(--small);font-weight:700;flex-shrink:0;margin-top:2px}
.apa .step-text{font-size:var(--small);line-height:1.5;flex:1}
`,ac=[{classes:"dark-indigo",label:"1 APA 7 – Introduction",html:`
    <div class="deco-circle" style="width:820px;height:820px;background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%);right:-180px;top:-220px;"></div>
    <div class="deco-circle" style="width:560px;height:560px;background:radial-gradient(circle,rgba(245,158,11,0.14) 0%,transparent 70%);left:-100px;bottom:-120px;"></div>
    <div class="deco-circle float" style="width:200px;height:200px;background:radial-gradient(circle,rgba(165,180,252,0.18) 0%,transparent 70%);left:40%;top:10%;"></div>
    <div class="title-slide-inner fu">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:38px;">
        <div style="display:flex;gap:8px;align-items:center;">
          <div style="width:56px;height:7px;background:#818cf8;border-radius:4px;"></div>
          <div style="width:28px;height:7px;background:#f59e0b;border-radius:4px;"></div>
          <div style="width:14px;height:7px;background:#5eead4;border-radius:4px;"></div>
        </div>
        <span style="font-size:var(--small);font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a5b4fc;">General Resources · Academic Writing Skills</span>
      </div>
      <div class="main-title">APA <span class="accent">7</span><br/>Citations</div>
      <p style="font-size:44px;color:rgba(255,255,255,0.55);margin-bottom:44px;font-weight:300;font-family:'Lora',serif;font-style:italic;">The Crash Course</p>
      <p style="font-size:var(--body);color:rgba(255,255,255,0.48);max-width:920px;line-height:1.65;margin-bottom:50px;">Everything you need to cite correctly — from the first in-text citation to the last reference entry. Built for your assignments. No textbooks required.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <span class="badge badge-ghost">14 Slides</span>
        <span class="badge badge-amber">Interactive Examples</span>
        <span class="badge badge-teal">Reference Templates</span>
        <span class="badge badge-purple">Practice Quiz Included</span>
      </div>
    </div>
    <div style="position:absolute;right:var(--px);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:24px;opacity:0.18;">
      <div style="width:140px;height:140px;border-radius:28px;border:3px solid #a5b4fc;display:flex;align-items:center;justify-content:center;font-size:72px;">📖</div>
      <div style="width:140px;height:140px;border-radius:28px;border:3px solid #f59e0b;display:flex;align-items:center;justify-content:center;font-size:72px;">✍️</div>
      <div style="width:140px;height:140px;border-radius:28px;border:3px solid #5eead4;display:flex;align-items:center;justify-content:center;font-size:72px;">🎓</div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"2 Why Even Cite?",html:`
    <div class="section-label">The Foundation</div>
    <div class="slide-title">Why Even <span class="accent">Bother</span> Citing?</div>
    <div class="three-col">
      <div class="pillar fu1" style="background:linear-gradient(135deg,rgba(224,231,255,0.9),rgba(199,210,254,0.5));border:2px solid rgba(99,102,241,0.25);">
        <div class="pillar-icon">🛡️</div>
        <div class="pillar-title" style="color:var(--indigo2);">They Protect You</div>
        <div class="pillar-body" style="color:#334155;">Using someone's idea without credit is <strong>plagiarism</strong> — even accidentally. A citation is your proof you know the difference between your thinking and someone else's. No citation = no defence.</div>
        <div style="margin-top:auto;padding:12px 18px;background:rgba(67,56,202,0.1);border-radius:12px;font-size:var(--micro);color:var(--indigo2);font-weight:600;">Academic integrity shield</div>
      </div>
      <div class="pillar fu2" style="background:linear-gradient(135deg,rgba(204,251,241,0.9),rgba(153,246,228,0.5));border:2px solid rgba(13,148,136,0.25);">
        <div class="pillar-icon">💪</div>
        <div class="pillar-title" style="color:var(--teal);">They Strengthen You</div>
        <div class="pillar-body" style="color:#334155;"><em>"Immersion increases presence"</em> — opinion.<br/><br/><em>"Immersion increases presence (Slater, 2009)"</em> — claim backed by a decade of VR research.<br/><br/>Same sentence. <strong>Completely different weight.</strong></div>
        <div style="margin-top:auto;padding:12px 18px;background:rgba(13,148,136,0.1);border-radius:12px;font-size:var(--micro);color:var(--teal);font-weight:600;">Evidence = credibility</div>
      </div>
      <div class="pillar fu3" style="background:linear-gradient(135deg,rgba(254,243,199,0.9),rgba(253,230,138,0.5));border:2px solid rgba(245,158,11,0.3);">
        <div class="pillar-icon">💬</div>
        <div class="pillar-title" style="color:var(--amber2);">They Invite Conversation</div>
        <div class="pillar-body" style="color:#334155;">Academic writing isn't a monologue — it's you <strong>positioning your ideas</strong> within an ongoing scholarly debate. Citations show you've been listening, and you know who said what first.</div>
        <div style="margin-top:auto;padding:12px 18px;background:rgba(217,119,6,0.1);border-radius:12px;font-size:var(--micro);color:var(--amber2);font-weight:600;">Join the scholarly conversation</div>
      </div>
    </div>
    <div class="callout callout-indigo fu4" style="margin-top:24px;">
      <strong>The "says who?" test:</strong> Imagine your examiner asking <em>"says who?"</em> after every claim you make. Citations are your answer. Without them, you're just asserting things into the void.
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"slate-bg",label:"3 Citation vs No Citation",html:`
    <div class="section-label">Real Impact</div>
    <div class="slide-title">Same Sentence. <span class="accent">Different Weight.</span></div>
    <div class="two-col eq" style="gap:40px;flex:1;">
      <div class="scenario bad fu1">
        <div class="scenario-tag">❌ Without citation</div>
        <div class="scenario-quote">"Scientists say coffee makes you smarter."</div>
        <div style="margin-top:16px;padding:16px 20px;background:rgba(239,68,68,0.1);border-radius:14px;">
          <p style="font-size:var(--tiny);color:#7f1d1d;font-weight:600;margin-bottom:8px;">What happens:</p>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
            <li style="font-size:var(--micro);color:#991b1b;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">⚠️</span> Examiner asks: <em>"Which scientists? Where? When?"</em></li>
            <li style="font-size:var(--micro);color:#991b1b;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">⚠️</span> Sounds like an unverified social media claim</li>
            <li style="font-size:var(--micro);color:#991b1b;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">⚠️</span> Could be penalised for unsupported assertion</li>
            <li style="font-size:var(--micro);color:#991b1b;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">⚠️</span> If it's someone else's idea — this is plagiarism</li>
          </ul>
        </div>
        <div class="scenario-note">Your friend (the examiner) is far less forgiving.</div>
      </div>
      <div class="scenario good fu2">
        <div class="scenario-tag">✅ With citation</div>
        <div class="scenario-quote">"Caffeine consumption has been associated with enhanced cognitive performance in controlled studies (Smith et al., 2021, p. 14)."</div>
        <div style="margin-top:16px;padding:16px 20px;background:rgba(5,150,105,0.1);border-radius:14px;">
          <p style="font-size:var(--tiny);color:#064e3b;font-weight:600;margin-bottom:8px;">What happens:</p>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
            <li style="font-size:var(--micro);color:#065f46;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">✅</span> Reader can verify the source independently</li>
            <li style="font-size:var(--micro);color:#065f46;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">✅</span> Shows engagement with academic literature</li>
            <li style="font-size:var(--micro);color:#065f46;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">✅</span> Demonstrates scholarly credibility</li>
            <li style="font-size:var(--micro);color:#065f46;padding-left:24px;position:relative;"><span style="position:absolute;left:0;">✅</span> You are protected against plagiarism accusation</li>
          </ul>
        </div>
        <div class="scenario-note">Same idea. Now it's a <strong>verifiable academic claim.</strong></div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"4 When TO Cite (Interactive)",html:`
    <div class="section-label">Rule 1 of 2</div>
    <div class="slide-title">When <span class="accent">TO</span> Cite <span style="font-size:var(--small);font-weight:500;color:var(--slate);"> — click each card to reveal why</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;flex:1;">
      <div class="cite-card fu1" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">📊</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Facts, statistics &amp; findings</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Any fact that came from a specific study, dataset, or report. Even if widely known <em>within your field</em>, if it has a source — cite it. E.g. "87% of Agile teams use Scrum" needs the State of Agile report.</div>
      </div>
      <div class="cite-card fu2" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">💡</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Arguments &amp; theories</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Someone else's argument, model, or framework. Even if you're paraphrasing it — you're using their intellectual work. Presence theory (Witmer &amp; Singer), Agile Manifesto, TAM model — all need citations.</div>
      </div>
      <div class="cite-card fu3" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">📖</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Definitions</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Especially contested or field-specific definitions. "Presence is defined as..." is someone's definition — whose? Even for widely agreed terms, citing the first/key theorist shows depth and awareness.</div>
      </div>
      <div class="cite-card fu4" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">💬</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Direct quotes</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Obviously. Any word-for-word text from a source requires quote marks + author + year + page number. Even a single distinctive phrase taken verbatim needs a page-level citation.</div>
      </div>
      <div class="cite-card fu5" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">📏</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Scales &amp; instruments</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Surveys, questionnaires, measurement scales, or research instruments designed by others. The Presence Questionnaire, SUS, TAM scales — all have original authors who must be credited.</div>
      </div>
      <div class="cite-card fu6" onclick="this.setAttribute('data-revealed','true')">
        <div style="font-size:44px;margin-bottom:10px;">✍️</div>
        <div style="font-size:var(--small);font-weight:700;color:#1e293b;">Your own prior work</div>
        <div class="hint-text">Click to reveal →</div>
        <div class="reveal-content">Yes — even your own previously published work. Reusing your own ideas without citing yourself is called <strong>self-plagiarism</strong>. If you published it elsewhere, treat it like any other source.</div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"warm",label:"5 When NOT to Cite",html:`
    <div class="section-label">Rule 2 of 2</div>
    <div class="slide-title">When <span class="accent" style="color:var(--amber2);">NOT</span> to Cite</div>
    <div class="two-col">
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div class="callout callout-amber fu1">
          <strong>Over-citing</strong> clutters your writing and actually signals <em>low confidence</em> — it looks like you can't tell what's common knowledge and what isn't.
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;" class="fu2">
          <div style="display:flex;gap:16px;align-items:flex-start;padding:18px 22px;background:rgba(255,255,255,0.8);border-radius:16px;border:2px solid rgba(245,158,11,0.25);">
            <span style="font-size:36px;flex-shrink:0;">🌐</span>
            <div>
              <div style="font-size:var(--small);font-weight:700;color:#92400e;">Common knowledge</div>
              <div style="font-size:var(--micro);color:#78350f;margin-top:4px;">"The internet is widely used" — no citation needed. Any reasonably educated person already knows this.</div>
            </div>
          </div>
          <div style="display:flex;gap:16px;align-items:flex-start;padding:18px 22px;background:rgba(255,255,255,0.8);border-radius:16px;border:2px solid rgba(245,158,11,0.25);">
            <span style="font-size:36px;flex-shrink:0;">🔢</span>
            <div>
              <div style="font-size:var(--small);font-weight:700;color:#92400e;">Mathematical or logical facts</div>
              <div style="font-size:var(--micro);color:#78350f;margin-top:4px;">"The sample had 24 participants split into 4 groups of 6" — this is your own arithmetic. No source needed.</div>
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px;" class="fu3">
        <div style="display:flex;gap:16px;align-items:flex-start;padding:18px 22px;background:rgba(255,255,255,0.8);border-radius:16px;border:2px solid rgba(245,158,11,0.25);">
          <span style="font-size:36px;flex-shrink:0;">🧠</span>
          <div>
            <div style="font-size:var(--small);font-weight:700;color:#92400e;">Your own original analysis</div>
            <div style="font-size:var(--micro);color:#78350f;margin-top:4px;">Your interpretation, argument, and conclusions are <em>your contribution</em>. Don't undercut it by citing someone else — own it.</div>
          </div>
        </div>
        <div style="display:flex;gap:16px;align-items:flex-start;padding:18px 22px;background:rgba(255,255,255,0.8);border-radius:16px;border:2px solid rgba(245,158,11,0.25);">
          <span style="font-size:36px;flex-shrink:0;">🔬</span>
          <div>
            <div style="font-size:var(--small);font-weight:700;color:#92400e;">Your own firsthand observations</div>
            <div style="font-size:var(--micro);color:#78350f;margin-top:4px;">Things you observed, measured, or found in your own study. "Participants reported feeling dizzy" — this is your data.</div>
          </div>
        </div>
        <div style="padding:22px 26px;background:linear-gradient(135deg,rgba(180,83,9,0.12),rgba(217,119,6,0.08));border-radius:18px;border:2px solid rgba(217,119,6,0.3);">
          <div style="font-size:var(--small);font-weight:800;color:#92400e;margin-bottom:10px;">🎯 The Test</div>
          <div style="font-size:var(--tiny);color:#78350f;line-height:1.6;">Would a <strong>reasonable person in your field</strong> consider this general knowledge? If yes → no citation. If there's any doubt → cite it. When in doubt, cite.</div>
        </div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"dark",label:"6 The Core Rule",html:`
    <div class="deco-circle" style="width:700px;height:700px;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);right:-120px;top:-160px;"></div>
    <div class="section-label">The Golden Rule</div>
    <div class="slide-title">One In-Text → <span class="accent">One Entry.</span> Always.</div>
    <div style="display:flex;gap:48px;flex:1;align-items:center;">
      <div style="flex:1;display:flex;flex-direction:column;gap:20px;" class="fu1">
        <div style="padding:28px 32px;background:rgba(255,255,255,0.05);border-radius:24px;border:2px solid rgba(165,180,252,0.25);">
          <div style="font-size:var(--h2);font-weight:900;color:#e2e8f0;line-height:1.2;margin-bottom:16px;">Every in-text citation has exactly <span style="color:#a5b4fc;">one</span> matching entry in the reference list.</div>
          <div style="font-size:var(--body);color:rgba(255,255,255,0.5);line-height:1.6;">Every reference list entry is cited <span style="color:#5eead4;">somewhere</span> in the text. No orphans. No extras.</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="padding:18px 22px;background:rgba(225,29,72,0.1);border-radius:16px;border:1.5px solid rgba(225,29,72,0.3);">
            <div style="font-size:var(--tiny);font-weight:800;color:#fb7185;margin-bottom:8px;">❌ ORPHAN</div>
            <div style="font-size:var(--micro);color:rgba(255,255,255,0.5);line-height:1.5;">A reference list entry with no matching in-text citation. You read it, but never cited it. Remove it — APA is not a bibliography.</div>
          </div>
          <div style="padding:18px 22px;background:rgba(225,29,72,0.1);border-radius:16px;border:1.5px solid rgba(225,29,72,0.3);">
            <div style="font-size:var(--tiny);font-weight:800;color:#fb7185;margin-bottom:8px;">❌ GHOST</div>
            <div style="font-size:var(--micro);color:rgba(255,255,255,0.5);line-height:1.5;">An in-text citation (Brown, 2021) with no matching reference list entry. Always fatal — the reader can't find the source.</div>
          </div>
        </div>
      </div>
      <div style="flex:0 0 520px;display:flex;flex-direction:column;align-items:center;gap:20px;" class="fu2">
        <div class="flow-box in-text pulse-ring" style="width:100%;padding:36px 32px;">
          <div class="flow-icon">📝</div>
          <div class="flow-title">In-Text Citation</div>
          <div class="flow-desc">(Slater, 2009, p. 12)<br/>Smith and Jones (2021)</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;opacity:0.6;">
          <div style="width:4px;height:28px;background:rgba(255,255,255,0.3);border-radius:2px;"></div>
          <div style="font-size:36px;color:rgba(255,255,255,0.4);">↕</div>
          <div style="font-size:var(--micro);color:rgba(255,255,255,0.35);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">One-to-one match</div>
          <div style="width:4px;height:28px;background:rgba(255,255,255,0.3);border-radius:2px;"></div>
        </div>
        <div class="flow-box ref-list" style="width:100%;padding:36px 32px;">
          <div class="flow-icon">📚</div>
          <div class="flow-title">Reference List Entry</div>
          <div class="flow-desc">Slater, M. (2009). Place illusion...<br/><em>Phil. Trans. R. Soc. B</em>, 364...</div>
        </div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"7 In-Text: Two Flavours",html:`
    <div class="section-label">In-Text Citations</div>
    <div class="slide-title">Two <span class="accent">Flavours</span> of In-Text Citation</div>
    <div class="two-col eq" style="gap:44px;flex:1;">
      <div style="display:flex;flex-direction:column;gap:20px;" class="fu1">
        <div style="padding:22px 28px;background:linear-gradient(135deg,rgba(224,231,255,0.9),rgba(199,210,254,0.5));border-radius:20px;border:2px solid rgba(99,102,241,0.3);">
          <div style="font-size:var(--small);font-weight:800;color:var(--indigo2);margin-bottom:4px;">1 — Parenthetical</div>
          <div style="font-size:var(--micro);color:var(--slate);">Citation lives in brackets at the end</div>
        </div>
        <div class="code-block">
          <div class="code-label">EXAMPLE</div>
          Virtual environments have been shown to enhance spatial memory <span class="ca">(Bowman &amp; McMahan, 2007)</span>.
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="padding:16px 20px;background:rgba(99,102,241,0.06);border-radius:14px;border:1.5px solid rgba(99,102,241,0.15);">
            <div style="font-size:var(--tiny);font-weight:700;color:var(--indigo2);margin-bottom:6px;">📌 Use this when:</div>
            <div style="font-size:var(--micro);color:var(--slate);line-height:1.5;">The <strong>idea</strong> matters more than the person who said it. You're reporting a finding, not engaging with a specific author's argument.</div>
          </div>
          <div style="padding:16px 20px;background:rgba(99,102,241,0.06);border-radius:14px;border:1.5px solid rgba(99,102,241,0.15);">
            <div style="font-size:var(--tiny);font-weight:700;color:var(--indigo2);margin-bottom:6px;">📐 Format:</div>
            <div style="font-size:var(--micro);color:var(--slate);font-family:'Courier New',monospace;">(Author, Year) or (Author, Year, p. N)</div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px;" class="fu2">
        <div style="padding:22px 28px;background:linear-gradient(135deg,rgba(204,251,241,0.9),rgba(153,246,228,0.5));border-radius:20px;border:2px solid rgba(13,148,136,0.3);">
          <div style="font-size:var(--small);font-weight:800;color:var(--teal);margin-bottom:4px;">2 — Narrative</div>
          <div style="font-size:var(--micro);color:var(--slate);">Author is part of your sentence, year follows in brackets</div>
        </div>
        <div class="code-block">
          <div class="code-label">EXAMPLE</div>
          <span class="ca">Bowman and McMahan</span> <span class="cy">(2007)</span> demonstrated that virtual environments enhance spatial memory.
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="padding:16px 20px;background:rgba(13,148,136,0.06);border-radius:14px;border:1.5px solid rgba(13,148,136,0.2);">
            <div style="font-size:var(--tiny);font-weight:700;color:var(--teal);margin-bottom:6px;">📌 Use this when:</div>
            <div style="font-size:var(--micro);color:var(--slate);line-height:1.5;">You're specifically engaging with <strong>who</strong> said something. You're introducing their argument, critiquing it, or contrasting it with another author's view.</div>
          </div>
          <div style="padding:16px 20px;background:rgba(13,148,136,0.06);border-radius:14px;border:1.5px solid rgba(13,148,136,0.2);">
            <div style="font-size:var(--tiny);font-weight:700;color:var(--teal);margin-bottom:6px;">📐 Format:</div>
            <div style="font-size:var(--micro);color:var(--slate);font-family:'Courier New',monospace;">Author (Year) verb... or Author and Author (Year)...</div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"slate-bg",label:"8 Author–Year Cheat Sheet",html:`
    <div class="section-label">Quick Reference</div>
    <div class="slide-title">The Author–Year <span class="accent">Cheat Sheet</span></div>
    <table class="tbl-indigo fu1" style="flex:1;">
      <thead>
        <tr>
          <th style="width:34%;">Situation</th>
          <th style="width:40%;">Format</th>
          <th style="width:26%;">Example</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1 author</td><td>(Author, Year)</td><td>(Slater, 2009)</td></tr>
        <tr><td>2 authors</td><td>(Author &amp; Author, Year)</td><td>(Slater &amp; Sanchez-Vives, 2016)</td></tr>
        <tr class="highlight-row"><td>⭐ 3+ authors <span style="font-size:15px;font-weight:800;color:#92400e;"> APA 7 change!</span></td><td>First author + et al., from first use</td><td>(Cummings et al., 2020)</td></tr>
        <tr><td>Organisation (first mention)</td><td>(Full Name [ABBR], Year)</td><td>(World Health Organization [WHO], 2022)</td></tr>
        <tr><td>Organisation (subsequent)</td><td>(Abbreviation, Year)</td><td>(WHO, 2022)</td></tr>
        <tr><td>No date available</td><td>(Author, n.d.)</td><td>(Smith, n.d.)</td></tr>
        <tr><td>Same author, same year</td><td>(Author, Yeara, Yearb)</td><td>(Brown, 2021a, 2021b)</td></tr>
        <tr><td>Multiple sources together</td><td>(Auth1 &amp; Auth2, Year; Auth3, Year)</td><td>(Milgram &amp; Kishino, 1994; Witmer &amp; Singer, 1998)</td></tr>
        <tr><td>Direct quote</td><td>(Author, Year, p. N)</td><td>(Witmer &amp; Singer, 1998, p. 225)</td></tr>
      </tbody>
    </table>
    <div style="margin-top:18px;padding:14px 22px;background:linear-gradient(135deg,rgba(254,243,199,0.95),rgba(253,230,138,0.6));border-radius:14px;border:2px solid rgba(245,158,11,0.4);" class="fu2">
      <span style="font-size:var(--tiny);font-weight:800;color:#92400e;">⭐ APA 7 key change:</span><span style="font-size:var(--tiny);color:#78350f;"> Three or more authors → use <strong>et al.</strong> from the very FIRST citation. APA 6 made you write all names up to 5 authors first. That rule is gone.</span>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"9 Short Quotes (Under 40 Words)",html:`
    <div class="section-label">Direct Quotation · Part 1</div>
    <div class="slide-title">Short Quotes: <span class="accent">Under 40 Words</span></div>
    <div style="display:flex;flex-direction:column;gap:28px;flex:1;">
      <div style="display:flex;gap:32px;align-items:stretch;" class="fu1">
        <div style="flex:1;padding:32px 36px;background:linear-gradient(135deg,rgba(224,231,255,0.7),rgba(199,210,254,0.35));border-radius:22px;border:2.5px solid rgba(99,102,241,0.25);font-family:'Lora',serif;font-size:var(--small);font-style:italic;line-height:1.75;color:#1e293b;position:relative;">
          <span style="color:var(--indigo2);font-size:60px;line-height:0;vertical-align:-20px;font-weight:900;">"</span>Presence is defined as
          <span style="background:#ddd6fe;border-radius:4px;padding:1px 6px;font-style:normal;font-size:var(--tiny);font-weight:600;color:#4c1d95;">the subjective experience of being in one place or environment, even when one is physically situated in another</span>
          <span style="color:var(--indigo2);font-size:60px;line-height:0;vertical-align:-20px;font-weight:900;">"</span>
          <span style="font-style:normal;font-size:var(--tiny);color:var(--slate);"> (<span style="color:var(--indigo2);font-weight:700;">Witmer &amp; Singer</span>, <span style="color:var(--amber2);font-weight:700;">1998</span>, p. <span style="color:var(--teal);font-weight:700;">225</span>).</span>
        </div>
      </div>
      <div class="two-col fu2" style="gap:24px;flex:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="font-size:var(--small);font-weight:800;color:var(--indigo2);margin-bottom:4px;">✅ Format Rules</div>
          <ul class="check">
            <li>Quotation marks around the exact words</li>
            <li>Inline — <em>do not</em> break to a new paragraph</li>
            <li>Page number is required (<span style="font-family:'Courier New';font-size:22px;">p. 225</span>)</li>
            <li>Citation at end, before the full stop</li>
          </ul>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="font-size:var(--small);font-weight:800;color:var(--rose);margin-bottom:4px;">❌ Common Errors</div>
          <ul class="cross">
            <li>Missing page number on a direct quote</li>
            <li>Using a block quote format for under 40 words</li>
            <li>Altering words inside the quote without [brackets]</li>
            <li>Overusing quotes — paraphrase instead</li>
          </ul>
        </div>
      </div>
      <div class="callout callout-amber fu3">
        <strong>Honest advice:</strong> Your examiner wants to see you <em>synthesise</em> ideas, not collect them. Use direct quotes only when the exact wording matters — definitions, key terms, pivotal statements. A paraphrase that cites correctly shows more skill.
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"dark",label:"10 Block Quotes (40+ Words)",html:`
    <div class="deco-circle" style="width:500px;height:500px;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);right:-80px;bottom:-80px;"></div>
    <div class="section-label">Direct Quotation · Part 2</div>
    <div class="slide-title">Block Quotes: <span class="accent">40+ Words</span></div>
    <div style="display:flex;gap:40px;flex:1;" class="fu1">
      <div style="flex:1.1;display:flex;flex-direction:column;gap:20px;">
        <div style="padding:28px 36px;background:rgba(255,255,255,0.05);border:2px solid rgba(165,180,252,0.25);border-radius:20px;">
          <div style="font-size:var(--tiny);font-weight:700;color:#a5b4fc;margin-bottom:14px;">Slater (2018) argued:</div>
          <div style="padding-left:48px;border-left:4px solid rgba(165,180,252,0.4);">
            <p style="font-family:'Lora',serif;font-size:var(--small);font-style:italic;color:rgba(255,255,255,0.8);line-height:1.75;">The concept of presence is not simply about visual fidelity but rather about the degree to which the virtual environment responds to the actions of the participant. A high-fidelity environment that does not react to user input will produce lower presence than a lower-fidelity, richly interactive one. <span style="font-style:normal;font-size:var(--micro);color:rgba(165,180,252,0.8);">(p. 431)</span></p>
          </div>
        </div>
        <div style="padding:18px 22px;background:rgba(245,158,11,0.12);border-radius:14px;border:1.5px solid rgba(245,158,11,0.3);">
          <div style="font-size:var(--tiny);font-weight:700;color:#fbbf24;margin-bottom:6px;">📌 Format note</div>
          <div style="font-size:var(--micro);color:rgba(255,255,255,0.6);line-height:1.5;">The author + year introduce the quote (narrative style), then the page number appears in brackets <em>after</em> the final full stop — not before it. This is reversed from short quotes.</div>
        </div>
      </div>
      <div style="flex:0.9;display:flex;flex-direction:column;gap:18px;" class="fu2">
        <div style="font-size:var(--small);font-weight:800;color:#a5b4fc;margin-bottom:4px;">Block Quote Rules</div>
        <ul class="check">
          <li>New paragraph for the quote</li>
          <li>Indent the entire block (0.5 inch / ~1.27 cm)</li>
          <li>No quotation marks</li>
          <li>Page number in brackets after the final stop</li>
          <li>Introduce with a colon or "X argued:" or "According to X (Year):"</li>
        </ul>
        <div style="margin-top:8px;padding:20px 24px;background:rgba(99,102,241,0.15);border-radius:16px;border:1.5px solid rgba(165,180,252,0.25);">
          <div style="font-size:var(--tiny);font-weight:800;color:#a5b4fc;margin-bottom:8px;">Short vs Block at a glance</div>
          <table style="font-size:var(--micro);color:rgba(255,255,255,0.7);border:none;">
            <tr><td style="border:none;padding:5px 12px 5px 0;font-weight:600;color:#a5b4fc;">Under 40 words</td><td style="border:none;padding:5px 0;">Inline, quotation marks, citation before the stop</td></tr>
            <tr><td style="border:none;padding:5px 12px 5px 0;font-weight:600;color:#fbbf24;">40+ words</td><td style="border:none;padding:5px 0;">Indented block, no quotes, citation <em>after</em> the stop</td></tr>
          </table>
        </div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"11 Building a Reference Entry",html:`
    <div class="section-label">Reference Construction</div>
    <div class="slide-title">Every Reference Has <span class="accent">Four Parts</span></div>
    <div style="display:flex;flex-direction:column;gap:28px;flex:1;">
      <div class="four-col fu1" style="gap:20px;flex:none;">
        <div style="border-radius:22px;padding:26px 22px;background:linear-gradient(135deg,rgba(221,214,254,0.9),rgba(196,181,253,0.5));border:2px solid rgba(124,58,237,0.3);display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;">
          <div style="font-size:52px;">👤</div>
          <div style="font-size:var(--body);font-weight:900;color:#4c1d95;">WHO</div>
          <div style="font-size:var(--micro);color:#5b21b6;line-height:1.5;">Last name, Initials.<br/>For multiple: Last, I., &amp; Last, I.</div>
          <div style="background:rgba(124,58,237,0.15);border-radius:10px;padding:8px 14px;font-size:19px;font-family:'Courier New';color:#4c1d95;font-weight:600;">Slater, M.</div>
        </div>
        <div style="border-radius:22px;padding:26px 22px;background:linear-gradient(135deg,rgba(254,243,199,0.95),rgba(253,230,138,0.55));border:2px solid rgba(245,158,11,0.35);display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;">
          <div style="font-size:52px;">📅</div>
          <div style="font-size:var(--body);font-weight:900;color:#92400e;">WHEN</div>
          <div style="font-size:var(--micro);color:#78350f;line-height:1.5;">Publication year in brackets.<br/>Use n.d. if no date.</div>
          <div style="background:rgba(245,158,11,0.15);border-radius:10px;padding:8px 14px;font-size:19px;font-family:'Courier New';color:#92400e;font-weight:600;">(2009).</div>
        </div>
        <div style="border-radius:22px;padding:26px 22px;background:linear-gradient(135deg,rgba(204,251,241,0.95),rgba(153,246,228,0.55));border:2px solid rgba(13,148,136,0.35);display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;">
          <div style="font-size:52px;">📄</div>
          <div style="font-size:var(--body);font-weight:900;color:#134e4a;">WHAT</div>
          <div style="font-size:var(--micro);color:#0f766e;line-height:1.5;">Title in sentence case.<br/>Book/journal titles in italics.</div>
          <div style="background:rgba(13,148,136,0.15);border-radius:10px;padding:8px 14px;font-size:19px;font-family:'Courier New';color:#134e4a;font-weight:600;font-style:italic;">Place illusion...</div>
        </div>
        <div style="border-radius:22px;padding:26px 22px;background:linear-gradient(135deg,rgba(255,228,230,0.95),rgba(254,205,211,0.55));border:2px solid rgba(225,29,72,0.3);display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;">
          <div style="font-size:52px;">🌐</div>
          <div style="font-size:var(--body);font-weight:900;color:#9f1239;">WHERE</div>
          <div style="font-size:var(--micro);color:#be123c;line-height:1.5;">Publisher, journal, DOI, or URL. Always prefer DOI.</div>
          <div style="background:rgba(225,29,72,0.12);border-radius:10px;padding:8px 14px;font-size:19px;font-family:'Courier New';color:#9f1239;font-weight:600;">https://doi.org/...</div>
        </div>
      </div>
      <div style="padding:28px 36px;background:linear-gradient(135deg,#1e293b,#334155);border-radius:20px;font-family:'Courier New',monospace;font-size:var(--small);line-height:1.85;color:#e2e8f0;" class="fu2">
        <span style="color:#ddd6fe;">Slater, M.</span> <span style="color:#fbbf24;">(2009).</span> <span style="color:#5eead4;">Place illusion and plausibility can lead to realistic behaviour in immersive virtual environments.</span> <span style="color:#f9a8d4;font-style:italic;">Philosophical Transactions of the Royal Society B, 364</span><span style="color:#f9a8d4;">(1535), 3549–3557.</span> <span style="color:#fb923c;">https://doi.org/10.1098/rstb.2009.0138</span>
      </div>
      <div style="display:flex;gap:14px;" class="fu3">
        <div style="flex:1;padding:10px 16px;background:#ddd6fe;border-radius:10px;text-align:center;font-size:var(--micro);font-weight:700;color:#4c1d95;">👤 WHO</div>
        <div style="flex:0.6;padding:10px 16px;background:#fef3c7;border-radius:10px;text-align:center;font-size:var(--micro);font-weight:700;color:#92400e;">📅 WHEN</div>
        <div style="flex:2.2;padding:10px 16px;background:#ccfbf1;border-radius:10px;text-align:center;font-size:var(--micro);font-weight:700;color:#134e4a;">📄 WHAT (title + journal)</div>
        <div style="flex:1.5;padding:10px 16px;background:#ffe4e6;border-radius:10px;text-align:center;font-size:var(--micro);font-weight:700;color:#9f1239;">🌐 WHERE (DOI)</div>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"slate-bg",label:"12 Reference Examples: Journal, Book, Webpage",html:`
    <div class="section-label">Reference Templates · Part 1</div>
    <div class="slide-title">Reference <span class="accent">Examples</span></div>
    <div class="three-col fu1" style="gap:26px;flex:1;">
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(224,231,255,0.85),rgba(199,210,254,0.4));border:2px solid rgba(99,102,241,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">📰</span>
          <div style="font-size:var(--tiny);font-weight:800;color:var(--indigo2);letter-spacing:0.06em;text-transform:uppercase;">Journal Article</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:var(--micro);color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">Slater, M.</span> <span style="color:#92400e;">(2009).</span> Place illusion and plausibility can lead to realistic behaviour in immersive virtual environments. <span style="font-style:italic;color:#0f766e;">Philosophical Transactions of the Royal Society B, 364</span>(1535), 3549–3557. <span style="color:#9f1239;">https://doi.org/10.1098/rstb.2009.0138</span>
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Article title: sentence case, no italics</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Journal name: Title Case, italicised</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Always use https://doi.org/ prefix</li>
        </ul>
      </div>
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(209,250,229,0.85),rgba(167,243,208,0.4));border:2px solid rgba(5,150,105,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">📚</span>
          <div style="font-size:var(--tiny);font-weight:800;color:var(--green);letter-spacing:0.06em;text-transform:uppercase;">Book</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:var(--micro);color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">Sherman, W. R., &amp; Craig, A. B.</span> <span style="color:#92400e;">(2018).</span> <span style="font-style:italic;color:#0f766e;">Understanding virtual reality: Interface, application, and design</span> (2nd ed.). Morgan Kaufmann.
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Book title: italicised, sentence case</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Edition in brackets if not first ed.</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Publisher name only (no location in APA 7)</li>
        </ul>
      </div>
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(254,243,199,0.85),rgba(253,230,138,0.4));border:2px solid rgba(245,158,11,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">🌐</span>
          <div style="font-size:var(--tiny);font-weight:800;color:var(--amber2);letter-spacing:0.06em;text-transform:uppercase;">Webpage</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:var(--micro);color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">University of Canterbury.</span> <span style="color:#92400e;">(2023, August 1).</span> <span style="font-style:italic;color:#0f766e;">HIT Lab NZ research overview.</span> https://www.hitlabnz.org
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Include the specific date if shown on page</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Page title in italics, sentence case</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> No "Retrieved from" in APA 7</li>
        </ul>
      </div>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"",label:"13 Reference Examples: Chapter, Conference, Software",html:`
    <div class="section-label">Reference Templates · Part 2</div>
    <div class="slide-title">More <span class="accent">Reference Types</span></div>
    <div class="three-col fu1" style="gap:26px;flex:1;">
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(237,233,254,0.85),rgba(221,214,254,0.4));border:2px solid rgba(124,58,237,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">📑</span>
          <div style="font-size:var(--tiny);font-weight:800;color:var(--purple);letter-spacing:0.06em;text-transform:uppercase;">Book Chapter (Edited)</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:19px;color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">McMahan, R. P.</span> <span style="color:#92400e;">(2017).</span> Exploring the effects of higher-fidelity display and interaction. In F. R. Nack &amp; A. S. Gordon (Eds.), <span style="font-style:italic;color:#7c3aed;">Interactive storytelling</span> (pp. 59–68). Springer.
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--purple);">→</span> Chapter author is first; editors after "In"</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--purple);">→</span> Only the <em>book title</em> is italicised</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--purple);">→</span> Page range in (pp. x–x) format</li>
        </ul>
      </div>
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(204,251,241,0.85),rgba(153,246,228,0.4));border:2px solid rgba(13,148,136,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">🎤</span>
          <div style="font-size:var(--tiny);font-weight:800;color:var(--teal);letter-spacing:0.06em;text-transform:uppercase;">Conference Paper</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:19px;color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">Bowman, D. A., &amp; McMahan, R. P.</span> <span style="color:#92400e;">(2007).</span> Virtual reality: How much immersion is enough? In <span style="font-style:italic;color:#0f766e;">Proceedings of the ACM CHI Conference</span> (pp. 36–43). ACM. https://doi.org/10.1145/xxxxxxx
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Proceedings title italicised (like a book)</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> Include publisher (ACM, IEEE, Springer…)</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:var(--teal);">→</span> DOI strongly preferred over URL</li>
        </ul>
      </div>
      <div style="border-radius:20px;padding:26px 24px;background:linear-gradient(135deg,rgba(224,242,254,0.85),rgba(186,230,253,0.4));border:2px solid rgba(14,165,233,0.3);display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">💻</span>
          <div style="font-size:var(--tiny);font-weight:800;color:#0284c7;letter-spacing:0.06em;text-transform:uppercase;">Software / App</div>
        </div>
        <div style="font-family:'Courier New',monospace;font-size:19px;color:#334155;line-height:1.8;background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:12px;">
          <span style="color:#4c1d95;">Unity Technologies.</span> <span style="color:#92400e;">(2023).</span> <span style="font-style:italic;color:#0369a1;">Unity</span> (Version 2022.3 LTS) [Computer software]. https://unity.com
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:#0284c7;">→</span> Software name italicised</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:#0284c7;">→</span> Version number in regular brackets</li>
          <li style="font-size:var(--micro);color:var(--slate);padding-left:18px;position:relative;"><span style="position:absolute;left:0;color:#0284c7;">→</span> [Computer software] descriptor after title</li>
        </ul>
      </div>
    </div>
    <div class="callout callout-indigo fu2" style="margin-top:20px;">
      <strong>Based on:</strong> American Psychological Association. (2020). <em>Publication manual of the American Psychological Association</em> (7th ed.). https://doi.org/10.1037/0000165-000
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`},{classes:"dark-indigo",label:"14 Five Mistakes to Avoid",html:`
    <div class="deco-circle" style="width:600px;height:600px;background:radial-gradient(circle,rgba(225,29,72,0.12) 0%,transparent 70%);right:-80px;top:-100px;"></div>
    <div class="section-label">Common Errors · Click each card to reveal the fix</div>
    <div class="slide-title">Five <span class="accent">Mistakes</span> to Avoid</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:18px;flex:1;">
      <div class="mistake-card fu1" onclick="var o=this.getAttribute('data-open');this.setAttribute('data-open',o?'':'true')">
        <div style="font-size:38px;margin-bottom:10px;">🔀</div>
        <div class="mistake-title">Confusing et al. when names clash</div>
        <div class="fix">Two papers share first authors + year. APA says write enough names to distinguish them — then et al. Don't assume the first name is enough.</div>
      </div>
      <div class="mistake-card fu2" onclick="var o=this.getAttribute('data-open');this.setAttribute('data-open',o?'':'true')">
        <div style="font-size:38px;margin-bottom:10px;">👻</div>
        <div class="mistake-title">Using ibid. or op. cit.</div>
        <div class="fix">These footnote shorthand terms belong to Chicago/Oxford style. APA never uses them. Ever. Just repeat the full author–year citation each time.</div>
      </div>
      <div class="mistake-card fu3" onclick="var o=this.getAttribute('data-open');this.setAttribute('data-open',o?'':'true')">
        <div style="font-size:38px;margin-bottom:10px;">👁️</div>
        <div class="mistake-title">Citing only the abstract</div>
        <div class="fix">If you only read the abstract, you only read part of the paper. Don't cite findings from sections you haven't read. Read the paper. Then cite it.</div>
      </div>
      <div class="mistake-card fu4" onclick="var o=this.getAttribute('data-open');this.setAttribute('data-open',o?'':'true')">
        <div style="font-size:38px;margin-bottom:10px;">📋</div>
        <div class="mistake-title">Padding the reference list</div>
        <div class="fix">APA reference list = only sources cited in the text. Nothing extra. A bibliography includes background reading — APA doesn't. Remove anything you didn't cite.</div>
      </div>
      <div class="mistake-card fu5" onclick="var o=this.getAttribute('data-open');this.setAttribute('data-open',o?'':'true')">
        <div style="font-size:38px;margin-bottom:10px;">🔗</div>
        <div class="mistake-title">Missing DOIs / using raw URLs</div>
        <div class="fix">Always search for a DOI before using a plain URL. DOIs are permanent — URLs rot. Always prefix: https://doi.org/ not dx.doi.org or just the number.</div>
      </div>
    </div>
    <div style="margin-top:20px;padding:16px 24px;background:rgba(165,180,252,0.12);border-radius:14px;border:1.5px solid rgba(165,180,252,0.25);" class="fu6">
      <p style="font-size:var(--tiny);color:rgba(255,255,255,0.55);text-align:center;">📚 Reference: American Psychological Association. (2020). <em>Publication manual of the APA</em> (7th ed.) · Scroll to the quiz below to test your knowledge</p>
    </div>
    <div class="copyright">© All rights reserved · Yasas Sri Wickramasinghe</div>`}],Ze=[{q:"In APA 7, how do you cite a source with 3 or more authors for the very first time?",options:["Write all author names in full","First author + et al., from the first citation","Write first 3 names, then et al.","Write only the first author's last name"],correct:1,explain:"APA 7 changed this from APA 6: use et al. from the very first citation for 3+ authors. APA 6 required all names up to 5 authors on first mention."},{q:'What does "n.d." stand for in a citation like (Smith, n.d.)?',options:["Not documented","No date","Not determined","No digital copy"],correct:1,explain:'n.d. stands for "no date" — used when a source has no identifiable publication date. Common for some websites and unpublished works.'},{q:"What is the minimum word count that triggers a block quote in APA 7?",options:["25 words","30 words","40 words","50 words"],correct:2,explain:"40 or more words = block quote. Format: new paragraph, indented, no quotation marks, citation after the full stop."},{q:"Which is the correct APA 7 in-text format for two authors?",options:["(Brown and Jones, 2021)","(Brown & Jones, 2021)","(Brown, Jones, 2021)","(Brown-Jones, 2021)"],correct:1,explain:'Two authors use an ampersand (&) inside brackets. When authors are part of the narrative sentence, use "and" — e.g., Brown and Jones (2021).'},{q:"In what order do you arrange the APA 7 reference list?",options:["By year (newest first)","Alphabetically by first author's surname","Order of first appearance in text","By type (books before articles)"],correct:1,explain:"APA reference lists are always alphabetical by the first author's surname. Same-author entries are then sorted by year, oldest first."},{q:"Which DOI format is correct in APA 7?",options:["doi:10.1234/example","dx.doi.org/10.1234/example","https://doi.org/10.1234/example","10.1234/example"],correct:2,explain:"Always use https://doi.org/ as the prefix. The older dx.doi.org format is no longer recommended, and a bare number is incomplete."},{q:"Which title capitalisation is correct for a journal ARTICLE in APA 7?",options:['"The Role of Presence in Virtual Reality" (Title Case)','"The role of presence in virtual reality" (Sentence case)','"THE ROLE OF PRESENCE IN VIRTUAL REALITY" (ALL CAPS)','"the role of presence in virtual reality" (all lowercase)'],correct:1,explain:"Article titles use sentence case: only the first word, proper nouns, and the first word after a colon are capitalised. Journal names stay in Title Case and are italicised."},{q:"A paper has 5 reference list entries that are never cited in the text. What is the issue?",options:["Nothing — APA uses bibliographies this way","APA reference lists must only contain sources actually cited in the text","The paper needs more in-text citations for each entry","The reference list is too long; remove all 5"],correct:1,explain:`An APA reference list ≠ bibliography. Only sources you actually cited go in the reference list. Remove anything uncited — it's not a "further reading" list.`}];function pw(){const[e,t]=k.useState(Array(Ze.length).fill(null)),[i,n]=k.useState(!1),[s,r]=k.useState(0),o=i?e.filter((g,m)=>g===Ze[m].correct).length:0,l=Math.round(o/Ze.length*100);function d(){t(Array(Ze.length).fill(null)),n(!1),r(0)}const c=Ze[s],f=e[s]!==null,p=f&&e[s]===c.correct,u=e.every(g=>g!==null);function v(g){if(i)return;const m=[...e];m[s]=g,t(m)}return a.jsxs("div",{className:"rounded-2xl overflow-hidden",style:{border:"2px solid rgba(67,56,202,0.2)",background:"rgba(255,255,255,0.9)"},children:[a.jsxs("div",{className:"px-6 py-4 flex items-center justify-between",style:{background:"linear-gradient(135deg, #1e1b4b, #3730a3)"},children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest",style:{color:"#a5b4fc"},children:"Knowledge Check"}),a.jsx("h3",{className:"text-base font-bold text-white mt-0.5",children:"APA 7 Citation Quiz"})]}),a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsxs("span",{className:"text-xs font-semibold px-3 py-1 rounded-full",style:{background:"rgba(165,180,252,0.2)",color:"#a5b4fc"},children:[s+1," / ",Ze.length]}),i&&a.jsxs("button",{onClick:d,className:"flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80",style:{background:"rgba(165,180,252,0.2)",color:"#a5b4fc"},children:[a.jsx(q5,{size:12})," Retry"]})]})]}),a.jsx("div",{style:{height:4,background:"rgba(67,56,202,0.1)"},children:a.jsx("div",{style:{width:`${(s+1)/Ze.length*100}%`,height:"100%",background:"linear-gradient(90deg, #4338ca, #6366f1)",transition:"width 0.3s ease",borderRadius:"0 2px 2px 0"}})}),i?a.jsxs("div",{className:"p-6",children:[a.jsxs("div",{className:"text-center mb-6",children:[a.jsx("div",{className:"text-5xl mb-3",children:l>=90?"🏆":l>=70?"🎉":l>=50?"📚":"💪"}),a.jsxs("div",{className:"text-3xl font-black mb-1",style:{color:"#1e1b4b"},children:[o,"/",Ze.length]}),a.jsxs("div",{className:"text-sm font-semibold",style:{color:l>=70?"#059669":"#d97706"},children:[l,"% correct"]}),a.jsx("p",{className:"text-xs mt-2",style:{color:"#6b7280"},children:l===100?"Perfect! You have mastered APA 7 citations.":l>=70?"Great work — a couple of areas to review.":"Go back through the slides and try again."})]}),a.jsx("div",{className:"flex flex-col gap-3",children:Ze.map((g,m)=>{const b=e[m],h=b===g.correct;return a.jsx("div",{className:"rounded-xl p-4",style:{background:h?"rgba(5,150,105,0.07)":"rgba(225,29,72,0.07)",border:`1.5px solid ${h?"rgba(5,150,105,0.2)":"rgba(225,29,72,0.2)"}`},children:a.jsxs("div",{className:"flex items-start gap-3",children:[a.jsx("div",{className:"flex-shrink-0 mt-0.5",children:h?a.jsx(B5,{size:16,style:{color:"#059669"}}):a.jsx(K5,{size:16,style:{color:"#e11d48"}})}),a.jsxs("div",{children:[a.jsxs("p",{className:"text-xs font-semibold mb-1",style:{color:"#1e293b"},children:["Q",m+1,": ",g.q]}),!h&&a.jsxs("p",{className:"text-xs mb-1",style:{color:"#e11d48"},children:["Your answer: ",g.options[b]]}),a.jsxs("p",{className:"text-xs font-semibold mb-1",style:{color:"#059669"},children:["✓ ",g.options[g.correct]]}),a.jsx("p",{className:"text-xs",style:{color:"#6b7280"},children:g.explain})]})]})},m)})})]}):a.jsxs("div",{className:"p-6",children:[a.jsx("p",{className:"text-sm font-semibold mb-4 leading-relaxed",style:{color:"#1e1b4b"},children:c.q}),a.jsx("div",{className:"flex flex-col gap-2 mb-5",children:c.options.map((g,m)=>{const b=e[s]===m,h=i&&m===c.correct,x=i&&b&&!h;return a.jsxs("button",{onClick:()=>v(m),disabled:i,className:"text-left px-4 py-3 rounded-xl text-xs font-medium transition-all",style:{background:h?"rgba(5,150,105,0.12)":x?"rgba(225,29,72,0.1)":b?"rgba(67,56,202,0.1)":"rgba(248,250,252,0.9)",border:`1.5px solid ${h?"rgba(5,150,105,0.4)":x?"rgba(225,29,72,0.35)":b?"rgba(67,56,202,0.35)":"rgba(226,232,240,0.8)"}`,color:h?"#065f46":x?"#9f1239":b?"#1e1b4b":"#374151",cursor:i?"default":"pointer"},children:[a.jsxs("span",{className:"font-bold mr-2",style:{color:h?"#059669":x?"#e11d48":b?"#4338ca":"#9ca3af"},children:[String.fromCharCode(65+m),"."]}),g]},m)})}),f&&!i&&a.jsxs("div",{className:"rounded-xl px-4 py-3 mb-4",style:{background:p?"rgba(5,150,105,0.08)":"rgba(225,29,72,0.08)",border:`1.5px solid ${p?"rgba(5,150,105,0.25)":"rgba(225,29,72,0.25)"}`},children:[a.jsx("p",{className:"text-xs font-bold mb-1",style:{color:p?"#059669":"#e11d48"},children:p?"✓ Correct!":"✗ Not quite."}),a.jsx("p",{className:"text-xs",style:{color:"#6b7280"},children:c.explain})]}),a.jsxs("div",{className:"flex items-center justify-between",children:[a.jsx("button",{onClick:()=>r(g=>Math.max(0,g-1)),disabled:s===0,className:"text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-30",style:{background:"rgba(67,56,202,0.08)",color:"#4338ca"},children:"← Previous"}),a.jsx("div",{className:"flex gap-1.5",children:Ze.map((g,m)=>a.jsx("button",{onClick:()=>r(m),className:"rounded-full transition-all",style:{width:m===s?20:8,height:8,background:e[m]!==null?i&&e[m]===Ze[m].correct?"#059669":i?"#e11d48":"#4338ca":m===s?"#4338ca":"rgba(67,56,202,0.2)"}},m))}),s<Ze.length-1?a.jsx("button",{onClick:()=>r(g=>g+1),className:"text-xs font-semibold px-4 py-2 rounded-xl transition-all",style:{background:"rgba(67,56,202,0.08)",color:"#4338ca"},children:"Next →"}):a.jsx("button",{onClick:()=>n(!0),disabled:!u,className:"text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-40",style:{background:u?"#4338ca":"rgba(67,56,202,0.15)",color:u?"#fff":"#4338ca"},children:"Submit Quiz"})]})]})]})}function uw(){const[e,t]=k.useState(!1),[i,n]=k.useState(""),[s,r]=k.useState(!1),[o,l]=k.useState(!1);k.useEffect(()=>{sessionStorage.getItem(Bx)==="true"&&t(!0)},[]);function d(E){E.preventDefault(),i.trim().toUpperCase()==="APAV7"?(sessionStorage.setItem(Bx,"true"),t(!0),r(!1)):(r(!0),n(""))}const[c,f]=k.useState(0),[p,u]=k.useState(!1),[v,g]=k.useState(!1),m=k.useRef(null),b=k.useRef(null),h=ac.length;k.useEffect(()=>{const E="apa-deck-styles";if(!document.getElementById(E)){const C=document.createElement("style");C.id=E,C.textContent=fw,document.head.appendChild(C)}return()=>{const C=document.getElementById(E);C&&C.remove()}},[]),k.useEffect(()=>{const E=m.current,C=b.current;if(!E||!C)return;const T=new ResizeObserver(()=>{const{width:P}=E.getBoundingClientRect(),z=P/1920;C.style.transform=`scale(${z})`,C.style.transformOrigin="top left",E.style.height=`${1080*z}px`});return T.observe(E),()=>T.disconnect()},[]),k.useEffect(()=>{const E=C=>{(C.key==="ArrowRight"||C.key==="ArrowDown")&&f(T=>Math.min(T+1,h-1)),(C.key==="ArrowLeft"||C.key==="ArrowUp")&&f(T=>Math.max(T-1,0)),C.key==="Escape"&&v&&y()};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[v,h]),k.useEffect(()=>{const E=()=>g(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",E),()=>document.removeEventListener("fullscreenchange",E)},[]);function x(){var E,C;(C=(E=m.current)==null?void 0:E.requestFullscreen)==null||C.call(E)}function y(){var E;(E=document.exitFullscreen)==null||E.call(document)}const w=ac[c],S="#4338ca";return e?a.jsxs("div",{className:"flex flex-col gap-3",children:[a.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>f(E=>Math.max(E-1,0)),disabled:c===0,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:`${S}40`},children:a.jsx(wn,{size:18})}),a.jsxs("span",{className:"text-sm font-medium text-gray-600 min-w-[80px] text-center",children:[c+1," / ",h]}),a.jsx("button",{onClick:()=>f(E=>Math.min(E+1,h-1)),disabled:c===h-1,className:"p-1.5 rounded-lg border disabled:opacity-30 transition-colors hover:bg-gray-50",style:{borderColor:`${S}40`},children:a.jsx(kn,{size:18})})]}),a.jsx("span",{className:"text-xs font-medium text-gray-400 hidden sm:block",children:w.label}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>u(E=>!E),className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:`${S}40`},title:p?"Collapse":"Expand",children:p?a.jsx(Cn,{size:16}):a.jsx(Sn,{size:16})}),a.jsx("button",{onClick:v?y:x,className:"p-1.5 rounded-lg border transition-colors hover:bg-gray-50",style:{borderColor:`${S}40`},title:v?"Exit fullscreen":"Fullscreen",children:v?a.jsx(Tn,{size:16}):a.jsx(En,{size:16})})]})]}),a.jsx("div",{ref:m,className:"apa relative w-full overflow-hidden rounded-xl",style:{border:`1px solid ${S}30`},children:a.jsx("div",{ref:b,style:{width:1920,height:1080},children:a.jsx("section",{className:w.classes,dangerouslySetInnerHTML:{__html:w.html}})})}),a.jsx("div",{className:`flex flex-wrap justify-center gap-1.5 ${p?"mt-2":""}`,children:ac.map((E,C)=>a.jsx("button",{onClick:()=>f(C),title:E.label,className:"rounded-full transition-all",style:{width:C===c?24:8,height:8,background:C===c?S:`${S}30`}},C))}),a.jsxs("div",{className:"mt-4",children:[a.jsxs("div",{className:"mb-3 px-1",children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest",style:{color:"#9ca3af"},children:"After the Slides"}),a.jsx("h3",{className:"text-base font-bold mt-1",style:{color:"#1e1b4b"},children:"Test Your APA 7 Knowledge"}),a.jsx("p",{className:"text-xs mt-0.5",style:{color:"#6b7280"},children:"8 questions · Click through each question · Instant feedback · No data stored"})]}),a.jsx(pw,{})]})]}):a.jsx("div",{className:"flex flex-col items-center justify-center py-12 px-6",children:a.jsxs("div",{className:"w-full max-w-sm rounded-2xl overflow-hidden",style:{border:"2px solid rgba(67,56,202,0.2)",background:"rgba(255,255,255,0.95)"},children:[a.jsxs("div",{className:"px-6 py-5 text-center",style:{background:"linear-gradient(135deg, #1e1b4b, #3730a3)"},children:[a.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3",style:{background:"rgba(165,180,252,0.15)",border:"2px solid rgba(165,180,252,0.3)"},children:a.jsx(Y5,{size:26,style:{color:"#a5b4fc"}})}),a.jsx("h3",{className:"text-base font-bold text-white",children:"Password Required"}),a.jsx("p",{className:"text-xs mt-1",style:{color:"rgba(255,255,255,0.55)"},children:"APA v7 Citations: The Crash Course"})]}),a.jsxs("form",{onSubmit:d,className:"p-6 flex flex-col gap-4",children:[a.jsx("p",{className:"text-xs text-center",style:{color:"#6b7280"},children:"This resource is password-protected. Enter the access password provided by your lecturer."}),a.jsxs("div",{className:"relative",children:[a.jsx("input",{type:o?"text":"password",value:i,onChange:E=>{n(E.target.value),r(!1)},placeholder:"Enter password",autoFocus:!0,className:"w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-widest outline-none transition-all",style:{border:`2px solid ${s?"rgba(225,29,72,0.5)":"rgba(67,56,202,0.2)"}`,background:s?"rgba(255,228,230,0.5)":"rgba(238,242,255,0.6)",color:"#1e1b4b",paddingRight:"44px"}}),a.jsx("button",{type:"button",onClick:()=>l(E=>!E),className:"absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-opacity hover:opacity-70",style:{color:"#9ca3af"},children:o?a.jsx(U5,{size:16}):a.jsx(V5,{size:16})})]}),s&&a.jsx("p",{className:"text-xs text-center font-semibold",style:{color:"#e11d48"},children:"Incorrect password — please try again."}),a.jsx("button",{type:"submit",className:"w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95",style:{background:"linear-gradient(135deg, #4338ca, #6366f1)",color:"#fff"},children:"Unlock Lesson"})]})]})})}function hw(){return a.jsx(wt,{eyebrow:"General Resources · Academic Writing Skills",titleLead:"Let's make sense of",titleAccent:"APA 7 Citations.",gradient:"linear-gradient(90deg, #4338ca, #6366f1, #f59e0b)",accent:"#4338ca",orb2:"#f59e0b",orb3:"#0d9488",subtitle:"Everything you need to cite correctly — from the first in-text citation to the last reference entry. A 14-slide interactive crash course with a practice quiz included.",pills:[{emoji:"📝",name:"In-text citations",color:"#4338ca"},{emoji:"📚",name:"Reference list",color:"#0d9488"},{emoji:"⚠️",name:"Common mistakes",color:"#e11d48"},{emoji:"✅",name:"Practice quiz",color:"#059669"}],children:a.jsx(uw,{})})}const xw=[{badge:"Atlassian Official",badgeBg:"rgba(0,82,204,0.10)",badgeColor:"#0747a6",title:"Atlassian Community — Get the Most Out of Jira",tag:"LEARNING PATH · BEGINNER · SELF-PACED",tagColor:"#0052CC",description:"The most credible free Jira training available — published directly by Atlassian, the company that builds Jira. A guided learning path that walks you from your first project through boards, backlogs, sprints, workflows, and reporting. Bite-sized lessons you can finish in a sitting, with a completion record on your Atlassian Community profile. Free Atlassian account only; no credit card.",linkLabel:"community.atlassian.com",href:"https://community.atlassian.com/learning/path/get-the-most-out-of-jira",cardBg:"linear-gradient(135deg, rgba(219,234,254,0.85), rgba(191,219,254,0.42))",borderColor:"rgba(0,82,204,0.20)",accentColor:"#0052CC"},{badge:"Professional Certificate",badgeBg:"rgba(10,102,194,0.10)",badgeColor:"#0a4f8a",title:"LinkedIn Learning — Atlassian Agile Project Management Professional Certificate",tag:"CERTIFICATE PATH · INTERMEDIATE · MULTI-COURSE",tagColor:"#0A66C2",description:"A structured, multi-course path that earns a Professional Certificate displayed directly on your LinkedIn profile — no copy-pasting required. Covers Agile foundations, Scrum, Kanban, and hands-on Jira project management, built in partnership with Atlassian. LinkedIn Learning is often free through your university library or a one-month free trial — check your student access before subscribing.",linkLabel:"linkedin.com/learning",href:"https://www.linkedin.com/learning/paths/atlassian-agile-project-management-professional-certificate",cardBg:"linear-gradient(135deg, rgba(224,242,254,0.85), rgba(186,230,253,0.45))",borderColor:"rgba(10,102,194,0.20)",accentColor:"#0A66C2"},{badge:"Free Certificate",badgeBg:"rgba(5,150,105,0.10)",badgeColor:"#064e3b",title:"Great Learning Academy — Jira Project Management",tag:"COMPLETION CERT · BEGINNER · ≈1–2 hrs",tagColor:"#059669",description:"A short, practical, completely free course that gets you hands-on with Jira fast — creating projects, issues, boards, and tracking work through to delivery. A free downloadable certificate of completion is issued automatically when you finish, ready to add to your CV and LinkedIn profile the same day. Free Great Learning account; no credit card required.",linkLabel:"mygreatlearning.com",href:"https://www.mygreatlearning.com/academy/learn-for-free/courses/jira-project-management",cardBg:"linear-gradient(135deg, rgba(209,250,229,0.85), rgba(187,247,208,0.42))",borderColor:"rgba(5,150,105,0.20)",accentColor:"#059669"}],gw=[{icon:"👁️",title:"Recruiter Visibility",desc:"Agile and Jira skills are in high demand — hiring managers actively search LinkedIn for certified candidates every single day."},{icon:"🤝",title:"Grow Your Network",desc:"Your post reaches your connections, their connections, and beyond — compounding your professional presence."},{icon:"💼",title:"Instant Credibility",desc:"A vendor-backed or verifiable certificate signals initiative and drive — the exact qualities employers look for in graduates."},{icon:"🚀",title:"Career Momentum",desc:"Every credential you post builds a public track record that speaks for you before any interview begins."}],mw=[{label:"Atlassian University",href:"https://university.atlassian.com/",note:"Free Jira & Confluence courses + paid certifications"},{label:"Jira Software Documentation",href:"https://support.atlassian.com/jira-software-cloud/",note:"Free official vendor reference"},{label:"Atlassian Agile Coach",href:"https://www.atlassian.com/agile",note:"Free guides on Scrum, Kanban & Agile delivery"},{label:"Scrum.org — What is Scrum?",href:"https://www.scrum.org/learning-series/what-is-scrum",note:"Free Scrum foundations from the source"},{label:"Free Jira Cloud Site",href:"https://www.atlassian.com/software/jira/free",note:"Free for up to 10 users — practice for real"},{label:"Atlassian Community",href:"https://community.atlassian.com/",note:"Free Q&A, events & more learning paths"}];function yw(){return a.jsxs("div",{className:"space-y-6",children:[a.jsx("style",{children:`
        @keyframes fmc-float  { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        @keyframes fmc-float2 { 0%,100%{transform:translateY(0) rotate(5deg)} 50%{transform:translateY(-10px) rotate(-5deg)} }
        @keyframes fmc-float3 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.15)} }
        @keyframes fmc-glow   { 0%,100%{box-shadow:0 0 24px rgba(0,119,181,.35),0 8px 32px rgba(0,119,181,.2)} 50%{box-shadow:0 0 48px rgba(0,119,181,.65),0 12px 48px rgba(0,119,181,.35)} }
        @keyframes fmc-badge-glow { 0%,100%{box-shadow:0 0 0 0 rgba(0,82,204,0)} 50%{box-shadow:0 0 16px 4px rgba(0,82,204,.25)} }
        @keyframes fmc-shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes fmc-pop    { 0%{transform:scale(.85);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes fmc-twinkle{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(.6)} }
        @keyframes fmc-ping-slow { 0%{transform:scale(1);opacity:.7} 70%,100%{transform:scale(1.6);opacity:0} }
        @keyframes fmc-slide-up  { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fmc-rank-reveal { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
        .fmc-float-1{animation:fmc-float  2.8s ease-in-out infinite}
        .fmc-float-2{animation:fmc-float2 3.2s ease-in-out infinite .4s}
        .fmc-float-3{animation:fmc-float3 2.4s ease-in-out infinite .8s}
        .fmc-float-4{animation:fmc-float  3.6s ease-in-out infinite 1.2s}
        .fmc-float-5{animation:fmc-float2 2.6s ease-in-out infinite .2s}
        .fmc-glow-card{animation:fmc-glow 3s ease-in-out infinite}
        .fmc-shimmer-text{background:linear-gradient(90deg,#fff 0%,#bfdbfe 40%,#fff 60%,#93c5fd 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fmc-shimmer 4s linear infinite}
        .fmc-btn-shimmer{background:linear-gradient(90deg,#fff 0%,#dbeafe 40%,#fff 60%,#e0f2fe 100%);background-size:300% auto;animation:fmc-shimmer 2.5s linear infinite}
        .fmc-pop-in{animation:fmc-pop .5s cubic-bezier(.175,.885,.32,1.275) both}
        .fmc-twinkle-1{animation:fmc-twinkle 1.8s ease-in-out infinite}
        .fmc-twinkle-2{animation:fmc-twinkle 2.4s ease-in-out infinite .6s}
        .fmc-twinkle-3{animation:fmc-twinkle 1.5s ease-in-out infinite 1.1s}
        .fmc-cert-card{transition:transform .22s ease,box-shadow .22s ease}
        .fmc-cert-card:hover{transform:translateY(-4px) scale(1.015);box-shadow:0 10px 28px rgba(0,0,0,.10)}
        .fmc-slide-up{animation:fmc-slide-up .55s ease both}
        .fmc-rank-pill{animation:fmc-rank-reveal .4s ease both}
        .fmc-badge-pulse{animation:fmc-badge-glow 2.5s ease-in-out infinite}
      `}),a.jsxs("p",{className:"text-xs inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",style:{color:"#0747a6",background:"rgba(191,219,254,0.55)"},children:[a.jsx(Ao,{size:12})," Career development · Project Management"]}),a.jsxs("div",{className:"rounded-2xl p-4 border fmc-slide-up",style:{background:"linear-gradient(135deg,rgba(219,234,254,.8),rgba(224,242,254,.5))",borderColor:"rgba(0,82,204,.18)"},children:[a.jsx("p",{className:"text-xs font-bold mb-2",style:{color:"#0747a6"},children:"📖 Quick Terminology"}),a.jsxs("div",{className:"space-y-1 text-xs",style:{color:"#0a4f8a"},children:[a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Jira"})," — Atlassian's industry-standard tool for planning, tracking, and managing software and project work."]}),a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Agile"})," — A way of delivering work in small, iterative cycles; Scrum and Kanban are its two most common frameworks."]}),a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Professional Certificate"})," — A multi-course credential that appears directly on your LinkedIn profile once earned."]})]})]}),a.jsx("p",{className:"text-sm leading-6",style:{color:"#374151"},children:"Three genuinely useful, free (or free-to-access) Jira and Agile credentials — from Atlassian's own learning path to a LinkedIn Professional Certificate and a quick certificate of completion. Each one is recommended to complement your studies, sharpen a skill employers actively hire for, and give your CV and LinkedIn profile something concrete to show. Work through them in order, or pick the one that fits your time."}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",children:xw.map((e,t)=>a.jsxs("div",{className:"fmc-cert-card rounded-2xl p-4 border flex flex-col gap-3",style:{background:e.cardBg,borderColor:e.borderColor},children:[a.jsxs("div",{className:"flex items-start justify-between gap-2",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"fmc-rank-pill text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full shrink-0",style:{background:e.accentColor,color:"#fff",animationDelay:`${t*.08}s`,fontSize:11},children:t+1}),a.jsx("p",{className:"text-xs font-bold uppercase tracking-wider",style:{color:e.tagColor},children:e.tag})]}),a.jsx("span",{className:"fmc-badge-pulse text-xs font-bold px-2 py-0.5 rounded-full shrink-0",style:{background:e.badgeBg,color:e.badgeColor},children:e.badge})]}),a.jsx("p",{className:"text-sm font-semibold",style:{color:"#0b1f44"},children:e.title}),a.jsx("p",{className:"text-xs leading-5 flex-1",style:{color:"#374151"},children:e.description}),a.jsxs("a",{href:e.href,target:"_blank",rel:"noreferrer",className:"mt-auto inline-flex items-center gap-1.5 text-xs font-semibold hover:underline",style:{color:e.accentColor},children:[a.jsx(Di,{size:13}),e.linkLabel]})]},e.badge+t))}),a.jsxs("div",{className:"rounded-2xl p-4 border",style:{background:"linear-gradient(135deg,rgba(219,234,254,.7),rgba(236,254,255,.6))",borderColor:"rgba(0,82,204,.16)"},children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-wider mb-2",style:{color:"#0052CC"},children:"🧭 A suggested path"}),a.jsxs("p",{className:"text-xs leading-5",style:{color:"#1e3a5f"},children:["Start with ",a.jsx("span",{className:"font-semibold",children:"Atlassian's own learning path"})," to get comfortable inside Jira, take the quick",a.jsx("span",{className:"font-semibold",children:" Great Learning"})," course to lock in the certificate, then invest in the",a.jsx("span",{className:"font-semibold",children:" LinkedIn Learning Professional Certificate"})," when you have a longer block of time — it's the one that lands as a badge on your profile."]})]}),a.jsxs("div",{className:"rounded-2xl p-4 border",style:{background:"linear-gradient(135deg,rgba(243,244,246,.9),rgba(249,250,251,.7))",borderColor:"rgba(0,82,204,.14)"},children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-wider mb-3",style:{color:"#0052CC"},children:"🔗 More Free Resources — Keep Practising"}),a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:mw.map(e=>a.jsxs("a",{href:e.href,target:"_blank",rel:"noreferrer",className:"flex flex-col gap-0.5 p-2.5 rounded-xl border hover:border-blue-300 transition-all",style:{background:"rgba(255,255,255,.8)",borderColor:"rgba(0,82,204,.12)",textDecoration:"none"},children:[a.jsxs("span",{className:"text-xs font-semibold inline-flex items-center gap-1",style:{color:"#0a4f8a"},children:[a.jsx(Di,{size:11}),e.label]}),a.jsx("span",{className:"text-xs",style:{color:"#6b7280"},children:e.note})]},e.label))})]}),a.jsxs("div",{className:"fmc-glow-card rounded-3xl overflow-hidden",style:{background:"linear-gradient(135deg,#004f80 0%,#0077B5 45%,#00a0dc 100%)",position:"relative"},children:[a.jsx("div",{style:{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",bottom:-30,left:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.05)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",top:14,right:18,fontSize:28,zIndex:1,pointerEvents:"none"},className:"fmc-float-1",children:"🎉"}),a.jsx("div",{style:{position:"absolute",top:52,right:56,fontSize:20,zIndex:1,pointerEvents:"none"},className:"fmc-float-2",children:"⭐"}),a.jsx("div",{style:{position:"absolute",bottom:18,right:22,fontSize:26,zIndex:1,pointerEvents:"none"},className:"fmc-float-3",children:"🏆"}),a.jsx("div",{style:{position:"absolute",bottom:56,right:70,fontSize:18,zIndex:1,pointerEvents:"none"},className:"fmc-float-4",children:"✨"}),a.jsx("div",{style:{position:"absolute",top:90,right:16,fontSize:16,zIndex:1,pointerEvents:"none"},className:"fmc-float-5",children:"🚀"}),a.jsx("div",{style:{position:"absolute",top:22,left:130,fontSize:10,color:"rgba(255,255,255,.7)",pointerEvents:"none"},className:"fmc-twinkle-1",children:"★"}),a.jsx("div",{style:{position:"absolute",top:60,left:80,fontSize:8,color:"rgba(255,255,255,.6)",pointerEvents:"none"},className:"fmc-twinkle-2",children:"★"}),a.jsx("div",{style:{position:"absolute",bottom:40,left:160,fontSize:12,color:"rgba(255,255,255,.5)",pointerEvents:"none"},className:"fmc-twinkle-3",children:"★"}),a.jsxs("div",{className:"p-6",style:{position:"relative",zIndex:2},children:[a.jsxs("div",{className:"flex items-center gap-3 mb-5",children:[a.jsx("div",{style:{background:"white",borderRadius:12,padding:"8px 8px 6px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,.18)"},children:a.jsx("svg",{width:"26",height:"26",viewBox:"0 0 24 24",fill:"#0077B5",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})}),a.jsxs("div",{children:[a.jsx("p",{className:"fmc-shimmer-text font-extrabold text-xl leading-tight",children:"Share Your Achievement!"}),a.jsx("p",{className:"text-xs mt-0.5",style:{color:"rgba(186,230,253,.9)"},children:"Let the world know you levelled up 🌍"})]})]}),a.jsx("div",{className:"fmc-pop-in rounded-2xl p-4 mb-5",style:{background:"rgba(255,255,255,.13)",border:"1px solid rgba(255,255,255,.2)",backdropFilter:"blur(6px)"},children:a.jsxs("div",{className:"flex items-start gap-3",children:[a.jsx("span",{style:{fontSize:36,lineHeight:1,color:"rgba(255,255,255,.35)",fontFamily:"Georgia,serif",flexShrink:0},children:'"'}),a.jsxs("div",{children:[a.jsx("p",{className:"text-white text-sm leading-relaxed",children:"I'd genuinely love to see what you accomplish here. Agile and Jira skills are among the most in-demand competencies in industry right now, and earning a credential on your own initiative says a lot about your drive and growth mindset — exactly what employers notice. If you post your achievement on LinkedIn, feel free to tag me so I can cheer you on and help amplify it — I genuinely enjoy celebrating every student who levels up. 🎓"}),a.jsxs("div",{className:"flex items-center gap-2 mt-3",children:[a.jsxs("div",{style:{position:"relative",width:10,height:10,flexShrink:0},children:[a.jsx("div",{style:{position:"absolute",inset:0,borderRadius:"50%",background:"#4ade80",animation:"fmc-ping-slow 1.5s ease-out infinite"}}),a.jsx("div",{style:{position:"absolute",inset:"2px",borderRadius:"50%",background:"#22c55e"}})]}),a.jsx("a",{href:"https://www.linkedin.com/in/yasassri/",target:"_blank",rel:"noreferrer",className:"text-xs font-bold hover:underline",style:{color:"#bfdbfe"},children:"Yasas Sri Wickramasinghe"}),a.jsx("span",{className:"text-xs",style:{color:"rgba(186,230,253,.7)"},children:"· Lecturer"})]})]})]})}),a.jsxs("div",{className:"mb-5",children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest mb-3",style:{color:"rgba(186,230,253,.85)"},children:"Why your LinkedIn post matters"}),a.jsx("div",{className:"grid grid-cols-2 gap-2",children:gw.map((e,t)=>a.jsxs("div",{className:"rounded-xl p-3",style:{background:"rgba(255,255,255,.10)",border:"1px solid rgba(255,255,255,.15)",animationDelay:`${t*.1}s`},children:[a.jsx("div",{style:{fontSize:20,marginBottom:4},children:e.icon}),a.jsx("p",{className:"text-white text-xs font-bold",children:e.title}),a.jsx("p",{className:"text-xs leading-4 mt-0.5",style:{color:"rgba(186,230,253,.8)"},children:e.desc})]},e.title))})]}),a.jsxs("div",{className:"rounded-xl p-3 mb-5 text-xs leading-5",style:{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)"},children:[a.jsx("p",{className:"font-bold text-white mb-1",children:"💡 What to write in your post"}),a.jsx("p",{style:{color:"rgba(219,234,254,.9)"},children:"Share which credential you earned, one thing that genuinely clicked for you, and how Agile or Jira skills connect to where you want your career to go. A screenshot of your certificate makes it land even better — posts with images get noticeably more engagement."})]}),a.jsxs("a",{href:"https://www.linkedin.com/in/yasassri/",target:"_blank",rel:"noreferrer",className:"fmc-btn-shimmer flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-extrabold transition-transform hover:scale-105 active:scale-95",style:{color:"#004f80",boxShadow:"0 4px 20px rgba(0,0,0,.25)",textDecoration:"none"},children:[a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"#0077B5",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),"Connect with Yasas Sri Wickramasinghe on LinkedIn",a.jsx(Di,{size:14})]})]})]}),a.jsxs("div",{className:"rounded-xl p-3 border text-xs leading-5",style:{background:"rgba(249,250,251,.8)",borderColor:"rgba(209,213,219,.6)",color:"#6b7280"},children:[a.jsx("span",{className:"font-semibold",style:{color:"#374151"},children:"A note before you enrol: "}),"These platforms may update their pricing, enrolment processes, or certificate availability at any time — always read the course page carefully before signing up to confirm it is still free. These are independent suggestions only. This course has no affiliation with, sponsorship from, or endorsement by Atlassian, LinkedIn, Great Learning, or any platform listed above. All trademarks and certifications belong to their respective owners."]})]})}function vw(){return a.jsx(wt,{eyebrow:"Career development · Project Management",titleLead:"Let's make sense of",titleAccent:"free Jira & Agile certifications.",gradient:"linear-gradient(90deg, #0052CC, #0A66C2, #059669)",accent:"#0052CC",orb2:"#0A66C2",orb3:"#059669",subtitle:"Three hand-picked Jira and Agile credentials — Atlassian's own learning path, a LinkedIn Professional Certificate, and a quick free certificate. Earn one, put it on LinkedIn, and let your skills speak for themselves.",pills:[{emoji:"🔷",name:"Atlassian path",color:"#0052CC"},{emoji:"🎓",name:"LinkedIn certificate",color:"#0A66C2"},{emoji:"🏆",name:"Free completion cert",color:"#059669"},{emoji:"🆓",name:"Free to access",color:"#7c3aed"}],children:a.jsx(yw,{})})}const bw=[{badge:"MySQL Badge",badgeBg:"rgba(204,7,30,0.10)",badgeColor:"#991b1b",title:"Oracle MyLearn — MySQL Explorer",tag:"VENDOR BADGE · BEGINNER · ≈5–7 hrs",tagColor:"#b91c1c",description:'The most credible free MySQL credential available — issued directly by Oracle, the company that owns MySQL. Complete the self-paced learning path covering the client/server model, MySQL Workbench, basic and complex queries, and troubleshooting. Earn an official "MySQL Explorer" digital badge from Oracle after passing a free online assessment. Free Oracle account only; no credit card.',linkLabel:"mylearn.oracle.com",href:"https://mylearn.oracle.com/ou/learning-path/mysql-explorer/79674",cardBg:"linear-gradient(135deg, rgba(254,226,226,0.80), rgba(252,165,165,0.38))",borderColor:"rgba(239,68,68,0.20)",accentColor:"#dc2626"},{badge:"Verified Cert",badgeBg:"rgba(5,150,105,0.10)",badgeColor:"#064e3b",title:"HackerRank — SQL (Basic) Skills Certification",tag:"SKILL EXAM · BEGINNER · 30 min",tagColor:"#059669",description:"A 30-minute online assessment — no course required, just study and sit it. Tests simple queries, relationships, and aggregators on relational databases including MySQL. You earn a verified Skills Certificate with a unique public URL, widely recognised by technical recruiters. Scores are private if you fail; retake after a waiting period. Intermediate (35 min) and Advanced (60 min) exams also free.",linkLabel:"hackerrank.com",href:"https://www.hackerrank.com/skills-verification/sql_basic",cardBg:"linear-gradient(135deg, rgba(209,250,229,0.75), rgba(167,243,208,0.38))",borderColor:"rgba(5,150,105,0.20)",accentColor:"#059669"},{badge:"Credly Badge",badgeBg:"rgba(37,99,235,0.10)",badgeColor:"#1e3a8a",title:"Cisco NetAcad — Data Analytics Essentials",tag:"DIGITAL BADGE + CERT · BEGINNER · ≈30 hrs",tagColor:"#1d4ed8",description:"One of the most generous truly-free programs online — 660,000+ learners enrolled. Covers Excel, an introduction to relational databases and SQL (Modules 6 & 7), Tableau, data visualisation, and data ethics across 10 modules and 29 hands-on labs. Earns a free Credly-verified digital badge and certificate of completion from Cisco. Free NetAcad account; no credit card.",linkLabel:"netacad.com",href:"https://www.netacad.com/catalogs/learn",cardBg:"linear-gradient(135deg, rgba(219,234,254,0.80), rgba(186,230,253,0.42))",borderColor:"rgba(37,99,235,0.18)",accentColor:"#1d4ed8"},{badge:"ACE Cert",badgeBg:"rgba(109,40,217,0.10)",badgeColor:"#4c1d95",title:"Saylor Academy — CS403: Intro to Modern Database Systems",tag:"COMPLETION CERT · BEGINNER · ≈42 hrs",tagColor:"#7c3aed",description:"The best single free option for database theory — one of the very few truly-free courses that covers both ER diagrams AND SQL in depth. Topics include database architecture, the Entity-Relationship model, relational algebra, data normalisation, SQL SELECT and JOINs, and database design. A free proctored final exam (≥70% to pass) earns an ACE-recommended completion certificate.",linkLabel:"learn.saylor.org",href:"https://learn.saylor.org/course/view.php?id=93",cardBg:"linear-gradient(135deg, rgba(237,233,254,0.85), rgba(221,214,254,0.45))",borderColor:"rgba(109,40,217,0.18)",accentColor:"#7c3aed"},{badge:"Kaggle PDF",badgeBg:"rgba(6,182,212,0.10)",badgeColor:"#164e63",title:"Kaggle Learn — Intro to SQL (Google)",tag:"PDF CERTIFICATE · BEGINNER · ≈3 hrs",tagColor:"#0891b2",description:'A practical browser-based course by Kaggle (a Google company) using BigQuery — covering SELECT, FROM, WHERE, GROUP BY, ORDER BY, AS, and WITH. A free downloadable PDF certificate is issued automatically when all module exercises are complete. Kaggle also offers a free "Advanced SQL" certificate (≈4 hrs) covering JOINs, analytic functions, nested data, and query efficiency.',linkLabel:"kaggle.com/learn/intro-to-sql",href:"https://www.kaggle.com/learn/intro-to-sql",cardBg:"linear-gradient(135deg, rgba(207,250,254,0.80), rgba(165,243,252,0.42))",borderColor:"rgba(6,182,212,0.20)",accentColor:"#0891b2"},{badge:"Completion Cert",badgeBg:"rgba(79,70,229,0.10)",badgeColor:"#312e81",title:"SoloLearn — Introduction to SQL",tag:"CERTIFICATE · BEGINNER · MOBILE-FRIENDLY",tagColor:"#4338ca",description:"A mobile-friendly ≈5–10-hour course covering SQL CRUD operations, filtering, sorting, joins, and basic relational concepts that apply directly to MySQL. A free completion certificate is issued after finishing all lessons and Code Coach problems. A free SQL Intermediate course is also available. Free SoloLearn account on web or mobile app; no credit card.",linkLabel:"sololearn.com",href:"https://www.sololearn.com/en/learn/courses/sql-introduction",cardBg:"linear-gradient(135deg, rgba(224,231,255,0.85), rgba(199,210,254,0.45))",borderColor:"rgba(79,70,229,0.18)",accentColor:"#4338ca"},{badge:"IBM Badge",badgeBg:"rgba(29,78,216,0.10)",badgeColor:"#1e3a8a",title:"IBM / Cognitive Class — SQL and Relational Databases 101",tag:"IBM DIGITAL BADGE · BEGINNER · ≈5–6 hrs",tagColor:"#1d4ed8",description:"An IBM-backed course covering relational model concepts, the five basic SQL statements, advanced SQL syntax, and JOIN statements — with hands-on exercises and a final exam. Passing the exam earns both a free completion certificate and an IBM digital badge issued via Credly. Free Cognitive Class / IBM ID account; no credit card required.",linkLabel:"cognitiveclass.ai",href:"https://cognitiveclass.ai/courses/learn-sql-relational-databases",cardBg:"linear-gradient(135deg, rgba(219,234,254,0.85), rgba(191,219,254,0.42))",borderColor:"rgba(29,78,216,0.18)",accentColor:"#1d4ed8"},{badge:"FCC Cert",badgeBg:"rgba(5,150,105,0.10)",badgeColor:"#064e3b",title:"freeCodeCamp — Relational Database Certification",tag:"PUBLIC CERT · PROJECT-BASED · ≈300 hrs",tagColor:"#047857",description:"One of the most respected truly-free programming certifications. Project-based work covering Bash, PostgreSQL/relational databases, Git, and building relational databases from scratch — with SQL skills that transfer directly to MySQL. Complete five required projects to earn a publicly verifiable certification on your freeCodeCamp profile. 100% open-source and free.",linkLabel:"freecodecamp.org",href:"https://www.freecodecamp.org/learn/relational-database/",cardBg:"linear-gradient(135deg, rgba(209,250,229,0.85), rgba(187,247,208,0.42))",borderColor:"rgba(5,150,105,0.20)",accentColor:"#047857"},{badge:"SkillUp",badgeBg:"rgba(217,119,6,0.10)",badgeColor:"#78350f",title:"Simplilearn SkillUp — SQL & Database Course Bundle",tag:"FREE CERT BUNDLE · BEGINNER · 1–9 hrs each",tagColor:"#b45309",description:"Multiple free SQL/database tracks on Simplilearn's SkillUp platform — covering Introduction to Databases, SQL Fundamentals, SQL for Data Analysis, SQL for Data Science, and SQL Projects. Each course issues a free downloadable PDF completion certificate automatically. All self-paced; free SkillUp account; no credit card required.",linkLabel:"simplilearn.com/skillup",href:"https://www.simplilearn.com/learn-basics-of-databases-free-course-skillup",cardBg:"linear-gradient(135deg, rgba(254,243,199,0.90), rgba(253,230,138,0.42))",borderColor:"rgba(217,119,6,0.20)",accentColor:"#b45309"}],ww=[{icon:"👁️",title:"Recruiter Visibility",desc:"Database and SQL skills are in high demand — hiring managers actively search LinkedIn for certified candidates every single day."},{icon:"🤝",title:"Grow Your Network",desc:"Your post reaches your connections, their connections, and beyond — compounding your professional presence."},{icon:"💼",title:"Instant Credibility",desc:"A vendor-issued or verifiable certificate signals initiative and drive — the exact qualities employers look for in graduates."},{icon:"🚀",title:"Career Momentum",desc:"Every credential you post builds a public track record that speaks for you before any interview begins."}],kw=[{label:"W3Schools MySQL Tutorial",href:"https://www.w3schools.com/mysql/",note:"Free study material (cert exam is paid)"},{label:"MySQL Official Documentation",href:"https://dev.mysql.com/doc/",note:"Free vendor reference"},{label:"Kaggle — Advanced SQL",href:"https://www.kaggle.com/learn/advanced-sql",note:"Free cert · JOINs, analytic functions, nested data"},{label:"HackerRank — SQL Intermediate",href:"https://www.hackerrank.com/skills-verification/sql_intermediate",note:"Free 35-min skill cert"},{label:"HackerRank — SQL Advanced",href:"https://www.hackerrank.com/skills-verification/sql_advanced",note:"Free 60-min skill cert"},{label:"Oracle SQL Explorer Path",href:"https://mylearn.oracle.com",note:'Free vendor-neutral SQL badge (search "Oracle SQL Explorer")'},{label:"IBM SkillsBuild — Data Catalog",href:"https://skillsbuild.org/",note:"Free DB learning paths with completion certs"},{label:"SoloLearn — SQL Intermediate",href:"https://www.sololearn.com/en/learn/courses/sql-intermediate",note:"Free completion cert"},{label:"SQLZoo / SQLBolt / Mode SQL",href:"https://sqlzoo.net/",note:"Free interactive practice (no certificate)"}];function Sw(){return a.jsxs("div",{className:"space-y-6",children:[a.jsx("style",{children:`
        @keyframes fmc-float  { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        @keyframes fmc-float2 { 0%,100%{transform:translateY(0) rotate(5deg)} 50%{transform:translateY(-10px) rotate(-5deg)} }
        @keyframes fmc-float3 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.15)} }
        @keyframes fmc-glow   { 0%,100%{box-shadow:0 0 24px rgba(0,119,181,.35),0 8px 32px rgba(0,119,181,.2)} 50%{box-shadow:0 0 48px rgba(0,119,181,.65),0 12px 48px rgba(0,119,181,.35)} }
        @keyframes fmc-badge-glow { 0%,100%{box-shadow:0 0 0 0 rgba(109,40,217,0)} 50%{box-shadow:0 0 16px 4px rgba(109,40,217,.25)} }
        @keyframes fmc-shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes fmc-pop    { 0%{transform:scale(.85);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes fmc-twinkle{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(.6)} }
        @keyframes fmc-ping-slow { 0%{transform:scale(1);opacity:.7} 70%,100%{transform:scale(1.6);opacity:0} }
        @keyframes fmc-slide-up  { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fmc-rank-reveal { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
        .fmc-float-1{animation:fmc-float  2.8s ease-in-out infinite}
        .fmc-float-2{animation:fmc-float2 3.2s ease-in-out infinite .4s}
        .fmc-float-3{animation:fmc-float3 2.4s ease-in-out infinite .8s}
        .fmc-float-4{animation:fmc-float  3.6s ease-in-out infinite 1.2s}
        .fmc-float-5{animation:fmc-float2 2.6s ease-in-out infinite .2s}
        .fmc-glow-card{animation:fmc-glow 3s ease-in-out infinite}
        .fmc-shimmer-text{background:linear-gradient(90deg,#fff 0%,#bfdbfe 40%,#fff 60%,#93c5fd 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fmc-shimmer 4s linear infinite}
        .fmc-btn-shimmer{background:linear-gradient(90deg,#fff 0%,#dbeafe 40%,#fff 60%,#e0f2fe 100%);background-size:300% auto;animation:fmc-shimmer 2.5s linear infinite}
        .fmc-pop-in{animation:fmc-pop .5s cubic-bezier(.175,.885,.32,1.275) both}
        .fmc-twinkle-1{animation:fmc-twinkle 1.8s ease-in-out infinite}
        .fmc-twinkle-2{animation:fmc-twinkle 2.4s ease-in-out infinite .6s}
        .fmc-twinkle-3{animation:fmc-twinkle 1.5s ease-in-out infinite 1.1s}
        .fmc-cert-card{transition:transform .22s ease,box-shadow .22s ease}
        .fmc-cert-card:hover{transform:translateY(-4px) scale(1.015);box-shadow:0 10px 28px rgba(0,0,0,.10)}
        .fmc-slide-up{animation:fmc-slide-up .55s ease both}
        .fmc-rank-pill{animation:fmc-rank-reveal .4s ease both}
        .fmc-badge-pulse{animation:fmc-badge-glow 2.5s ease-in-out infinite}
      `}),a.jsxs("p",{className:"text-xs inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",style:{color:"#4c1d95",background:"rgba(221,214,254,0.55)"},children:[a.jsx(Ao,{size:12})," Database Management Systems"]}),a.jsxs("div",{className:"rounded-2xl p-4 border fmc-slide-up",style:{background:"linear-gradient(135deg,rgba(237,233,254,.8),rgba(224,231,255,.5))",borderColor:"rgba(109,40,217,.18)"},children:[a.jsx("p",{className:"text-xs font-bold mb-2",style:{color:"#5b21b6"},children:"📖 Quick Terminology"}),a.jsxs("div",{className:"space-y-1 text-xs",style:{color:"#4c1d95"},children:[a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Badge / digital credential"})," — Shareable, verifiable credential you can post directly to LinkedIn."]}),a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Certificate of completion"})," — Downloadable PDF awarded after finishing course materials."]}),a.jsxs("p",{children:[a.jsx("span",{className:"font-semibold",children:"Skill certification exam"})," — Assessment-based credential you can claim by passing a test, even without a course."]})]})]}),a.jsx("p",{className:"text-sm leading-6",style:{color:"#374151"},children:"Nine genuinely free MySQL, SQL, and database-design credentials — from vendor badges to skill exams and project-based certifications. Every option below is completely free to earn (no credit card required). Recommended to complement your coursework and strengthen your CV and LinkedIn profile."}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",children:bw.map((e,t)=>a.jsxs("div",{className:"fmc-cert-card rounded-2xl p-4 border flex flex-col gap-3",style:{background:e.cardBg,borderColor:e.borderColor},children:[a.jsxs("div",{className:"flex items-start justify-between gap-2",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"fmc-rank-pill text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full shrink-0",style:{background:e.accentColor,color:"#fff",animationDelay:`${t*.08}s`,fontSize:11},children:t+1}),a.jsx("p",{className:"text-xs font-bold uppercase tracking-wider",style:{color:e.tagColor},children:e.tag})]}),a.jsx("span",{className:"fmc-badge-pulse text-xs font-bold px-2 py-0.5 rounded-full shrink-0",style:{background:e.badgeBg,color:e.badgeColor},children:e.badge})]}),a.jsx("p",{className:"text-sm font-semibold",style:{color:"#1e1b4b"},children:e.title}),a.jsx("p",{className:"text-xs leading-5 flex-1",style:{color:"#374151"},children:e.description}),a.jsxs("a",{href:e.href,target:"_blank",rel:"noreferrer",className:"mt-auto inline-flex items-center gap-1.5 text-xs font-semibold hover:underline",style:{color:e.accentColor},children:[a.jsx(Di,{size:13}),e.linkLabel]})]},e.badge+t))}),a.jsxs("div",{className:"rounded-2xl p-4 border",style:{background:"linear-gradient(135deg,rgba(243,244,246,.9),rgba(249,250,251,.7))",borderColor:"rgba(139,92,246,.14)"},children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-wider mb-3",style:{color:"#6d28d9"},children:"🔗 Useful Free Learning Resources — No Certificate, But Great for Practice"}),a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:kw.map(e=>a.jsxs("a",{href:e.href,target:"_blank",rel:"noreferrer",className:"flex flex-col gap-0.5 p-2.5 rounded-xl border hover:border-violet-300 transition-all",style:{background:"rgba(255,255,255,.8)",borderColor:"rgba(139,92,246,.12)",textDecoration:"none"},children:[a.jsxs("span",{className:"text-xs font-semibold inline-flex items-center gap-1",style:{color:"#5b21b6"},children:[a.jsx(Di,{size:11}),e.label]}),a.jsx("span",{className:"text-xs",style:{color:"#6b7280"},children:e.note})]},e.label))})]}),a.jsxs("div",{className:"fmc-glow-card rounded-3xl overflow-hidden",style:{background:"linear-gradient(135deg,#004f80 0%,#0077B5 45%,#00a0dc 100%)",position:"relative"},children:[a.jsx("div",{style:{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",bottom:-30,left:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.05)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",top:14,right:18,fontSize:28,zIndex:1,pointerEvents:"none"},className:"fmc-float-1",children:"🎉"}),a.jsx("div",{style:{position:"absolute",top:52,right:56,fontSize:20,zIndex:1,pointerEvents:"none"},className:"fmc-float-2",children:"⭐"}),a.jsx("div",{style:{position:"absolute",bottom:18,right:22,fontSize:26,zIndex:1,pointerEvents:"none"},className:"fmc-float-3",children:"🏆"}),a.jsx("div",{style:{position:"absolute",bottom:56,right:70,fontSize:18,zIndex:1,pointerEvents:"none"},className:"fmc-float-4",children:"✨"}),a.jsx("div",{style:{position:"absolute",top:90,right:16,fontSize:16,zIndex:1,pointerEvents:"none"},className:"fmc-float-5",children:"🚀"}),a.jsx("div",{style:{position:"absolute",top:22,left:130,fontSize:10,color:"rgba(255,255,255,.7)",pointerEvents:"none"},className:"fmc-twinkle-1",children:"★"}),a.jsx("div",{style:{position:"absolute",top:60,left:80,fontSize:8,color:"rgba(255,255,255,.6)",pointerEvents:"none"},className:"fmc-twinkle-2",children:"★"}),a.jsx("div",{style:{position:"absolute",bottom:40,left:160,fontSize:12,color:"rgba(255,255,255,.5)",pointerEvents:"none"},className:"fmc-twinkle-3",children:"★"}),a.jsxs("div",{className:"p-6",style:{position:"relative",zIndex:2},children:[a.jsxs("div",{className:"flex items-center gap-3 mb-5",children:[a.jsx("div",{style:{background:"white",borderRadius:12,padding:"8px 8px 6px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,.18)"},children:a.jsx("svg",{width:"26",height:"26",viewBox:"0 0 24 24",fill:"#0077B5",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})}),a.jsxs("div",{children:[a.jsx("p",{className:"fmc-shimmer-text font-extrabold text-xl leading-tight",children:"Share Your Achievement!"}),a.jsx("p",{className:"text-xs mt-0.5",style:{color:"rgba(186,230,253,.9)"},children:"Let the world know you levelled up 🌍"})]})]}),a.jsx("div",{className:"fmc-pop-in rounded-2xl p-4 mb-5",style:{background:"rgba(255,255,255,.13)",border:"1px solid rgba(255,255,255,.2)",backdropFilter:"blur(6px)"},children:a.jsxs("div",{className:"flex items-start gap-3",children:[a.jsx("span",{style:{fontSize:36,lineHeight:1,color:"rgba(255,255,255,.35)",fontFamily:"Georgia,serif",flexShrink:0},children:'"'}),a.jsxs("div",{children:[a.jsxs("p",{className:"text-white text-sm leading-relaxed",children:["I am ",a.jsx("span",{className:"font-bold",style:{color:"#bfdbfe"},children:"genuinely excited"})," to see your certification! Database skills are among the most in-demand competencies in the industry right now. Earning a free credential shows initiative, dedication, and a growth mindset — exactly the qualities that stand out to employers. Please post your achievement on LinkedIn and ",a.jsx("span",{className:"font-bold text-white",children:"tag me"})," — I personally celebrate every single one of my students who levels up! 🎓"]}),a.jsxs("div",{className:"flex items-center gap-2 mt-3",children:[a.jsxs("div",{style:{position:"relative",width:10,height:10,flexShrink:0},children:[a.jsx("div",{style:{position:"absolute",inset:0,borderRadius:"50%",background:"#4ade80",animation:"fmc-ping-slow 1.5s ease-out infinite"}}),a.jsx("div",{style:{position:"absolute",inset:"2px",borderRadius:"50%",background:"#22c55e"}})]}),a.jsx("a",{href:"https://www.linkedin.com/in/yasassri/",target:"_blank",rel:"noreferrer",className:"text-xs font-bold hover:underline",style:{color:"#bfdbfe"},children:"Yasas Sri Wickramasinghe"}),a.jsx("span",{className:"text-xs",style:{color:"rgba(186,230,253,.7)"},children:"· Lecturer"})]})]})]})}),a.jsxs("div",{className:"mb-5",children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest mb-3",style:{color:"rgba(186,230,253,.85)"},children:"Why your LinkedIn post matters"}),a.jsx("div",{className:"grid grid-cols-2 gap-2",children:ww.map((e,t)=>a.jsxs("div",{className:"rounded-xl p-3",style:{background:"rgba(255,255,255,.10)",border:"1px solid rgba(255,255,255,.15)",animationDelay:`${t*.1}s`},children:[a.jsx("div",{style:{fontSize:20,marginBottom:4},children:e.icon}),a.jsx("p",{className:"text-white text-xs font-bold",children:e.title}),a.jsx("p",{className:"text-xs leading-4 mt-0.5",style:{color:"rgba(186,230,253,.8)"},children:e.desc})]},e.title))})]}),a.jsxs("div",{className:"rounded-xl p-3 mb-5 text-xs leading-5",style:{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)"},children:[a.jsx("p",{className:"font-bold text-white mb-1",children:"💡 What to write in your post"}),a.jsxs("p",{style:{color:"rgba(219,234,254,.9)"},children:["Share what you learned, which certification you earned, and how database skills connect to your career goals. Tag ",a.jsx("span",{className:"font-semibold text-white",children:"@YasasSriWickramasinghe"})," so I can celebrate with you!"]})]}),a.jsxs("a",{href:"https://www.linkedin.com/in/yasassri/",target:"_blank",rel:"noreferrer",className:"fmc-btn-shimmer flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-extrabold transition-transform hover:scale-105 active:scale-95",style:{color:"#004f80",boxShadow:"0 4px 20px rgba(0,0,0,.25)",textDecoration:"none"},children:[a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"#0077B5",children:a.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),"Tag Yasas Sri Wickramasinghe on LinkedIn",a.jsx(Di,{size:14})]})]})]}),a.jsxs("div",{className:"rounded-xl p-3 border text-xs leading-5",style:{background:"rgba(249,250,251,.8)",borderColor:"rgba(209,213,219,.6)",color:"#6b7280"},children:[a.jsx("span",{className:"font-semibold",style:{color:"#374151"},children:"A note before you enrol: "}),"These platforms may update their pricing, enrolment processes, or certificate availability at any time — always read the course page carefully before signing up to confirm it is still free. These are independent suggestions only. This course has no affiliation with, sponsorship from, or endorsement by any of the platforms listed above. All trademarks and certifications belong to their respective owners."]})]})}function Ew(){return a.jsx(wt,{eyebrow:"Database Management",titleLead:"Let's make sense of",titleAccent:"free SQL certifications.",gradient:"linear-gradient(90deg, #7c3aed, #6d28d9, #dc2626)",accent:"#7c3aed",orb2:"#6d28d9",orb3:"#dc2626",subtitle:"Nine genuinely free credentials — from Oracle vendor badges to IBM digital badges to project-based certs. Earn one, put it on LinkedIn, and let your skills speak for themselves.",pills:[{emoji:"🏅",name:"Oracle badge",color:"#dc2626"},{emoji:"✅",name:"HackerRank cert",color:"#059669"},{emoji:"🎓",name:"IBM badge",color:"#1d4ed8"},{emoji:"🆓",name:"All 100% free",color:"#7c3aed"}],children:a.jsx(Sw,{})})}const Fx=[{id:"stitch",number:"01",tool:"GOOGLE STITCH 2.0",icon:_5,color:"#7c3aed",colorBg:"rgba(124,58,237,0.07)",colorBorder:"rgba(124,58,237,0.22)",title:"Design the layout.",body:'Describe the site you want in plain language — the audience, the sections, the mood. Stitch turns that into real screens: hero, nav, content blocks. Then you refine in rounds — "make the hero calmer," "give the projects section more air" — until it looks right.',notes:["One instruction at a time. Don't describe the whole site in one prompt.","Export the HTML/CSS once you're happy — that's your starting repo.","This stage is sketching, not shipping. It doesn't need to be production-ready."]},{id:"claude",number:"02",tool:"CLAUDE CODE ON THE WEB",icon:$5,color:"#4f46e5",colorBg:"rgba(79,70,229,0.07)",colorBorder:"rgba(79,70,229,0.22)",title:"Turn it into real code.",body:"Bring the Stitch export into Claude Code, running in your browser — no local setup needed. Ask it to add the contact form, wire up the project grid, make the nav responsive, write tests. It reads the repo, makes the changes, runs checks, and shows you the diff before anything ships.",notes:['Describe outcomes, not implementations: "let visitors book a call from the hero" beats "add a button."',"Ask for a review pass — accessibility, broken links, mobile layout.","This is where the site stops being a mockup and becomes software."]},{id:"pages",number:"03",tool:"GITHUB PAGES",icon:H5,color:"#059669",colorBg:"rgba(5,150,105,0.07)",colorBorder:"rgba(5,150,105,0.22)",title:"Ship it.",body:"Push the repo to GitHub and turn on Pages in the repository settings. Your site is live at yourname.github.io within minutes. Every future push republishes it. No hosting bill, no server to manage — just a URL you can put on a resume or a business card.",notes:["Point a custom domain at it later with a CNAME file.","Commit often — your git history is a record of the site improving.","This is the step most courses skip, and the one that makes the other two matter."]}],lc=[{key:"academic",label:"The Minimalist Academic",for:"For research & long-form credibility",color:"#059669",colorBg:"rgba(5,150,105,0.09)",file:"academic_portfolio.prompt.md",prompt:`# SYSTEM PROMPT — Stitch + Claude Code

ROLE
You are designing a personal academic portfolio for [YOUR NAME], a
[FIELD] researcher. Optimize for a reader who has 20 seconds and a lot
of judgment.

VISUAL DIRECTION
- Palette: warm paper white (#FAFAF7) background, near-black ink, one
  restrained accent (deep forest or oxblood) used only for links and
  a single hero rule.
- Typography: a serif built for long-form reading, paired with a quiet
  sans for labels and metadata. Line-height 1.6+, body measure capped
  at ~68 characters.
- Layout: single column, generous white space, no cards, no shadows.
  Let whitespace and thin rules do the separating, not boxes.

STRUCTURE
1. Hero — name, title, one-line research thesis. No photo required.
2. Selected Publications — a list, not cards: title, venue, year,
   PDF/DOI link.
3. Research Interests — 3-4 short paragraphs, not a bullet dump.
4. CV download, plus contact: email, Google Scholar, ORCID.
5. Optional: Teaching, Talks & Media.

BUILD NOTES FOR CLAUDE CODE
- Static HTML/CSS, no build step — deploy straight to GitHub Pages.
- Semantic HTML (article, section, nav) for accessibility and
  citation crawlers.
- Add a print stylesheet so the page exports cleanly to PDF for
  tenure or grant packets.
- No animation beyond a 150ms link-underline transition.

# Ship something a hiring committee can read in 20 seconds
# and trust in 20 more.`},{key:"innovator",label:"The Creative Tech Innovator",for:"For builders, devs & makers",color:"#7c3aed",colorBg:"rgba(124,58,237,0.09)",file:"tech_innovator_portfolio.prompt.md",prompt:`# SYSTEM PROMPT — Stitch + Claude Code

ROLE
You are designing a personal portfolio for [YOUR NAME], a builder who
ships things — part developer, part designer, part indie hacker.

VISUAL DIRECTION
- Palette: near-black (#0B0E14) base, exactly one neon accent (electric
  violet or emerald) used for glow, hover states, and a single hero
  gradient. Never stack more than one accent hue at a time.
- Typography: a bold geometric display face for the hero headline,
  monospace for meta text — dates, stack tags, terminal captions.
- Motion: subtle. A glow that breathes, a card that lifts 4px on
  hover, a terminal cursor that blinks. Nothing that fights the reader.

STRUCTURE
1. Hero — one punchy line about what you build, animated gradient
   mesh behind it, a live status pill ("Currently building X").
2. Project Grid — 3-6 cards: live demo link, GitHub link, stack
   chips, one line on why it matters.
3. Now — a dated "what I'm building this month" block.
4. Contact as a terminal prompt: "> email me" / "> book a call".

BUILD NOTES FOR CLAUDE CODE
- Vanilla or React + utility CSS, componentized project cards, dark
  mode as the only mode unless asked otherwise.
- Pull pinned repos from the GitHub REST API into the project grid so
  it never goes stale.
- CSS-only or canvas background accent — keep it under 5% CPU and
  respect prefers-reduced-motion.
- Deploy via a GitHub Actions workflow to Pages so every push to main
  re-publishes automatically.

# Make it feel like a live workshop, not a brochure.`},{key:"executive",label:"The Executive Consultant",for:"For enterprise & consulting",color:"#4f46e5",colorBg:"rgba(79,70,229,0.09)",file:"executive_consultant_portfolio.prompt.md",prompt:`# SYSTEM PROMPT — Stitch + Claude Code

ROLE
You are designing a personal site for [YOUR NAME], an independent
consultant or fractional executive who needs credibility to convert
into booked calls.

VISUAL DIRECTION
- Palette: deep navy or charcoal (#111827) with warm off-white, one
  confident accent (muted gold or steel blue) reserved for CTAs only.
- Typography: a refined serif or high-contrast sans for headlines, a
  neutral grotesk for body copy — measured, never playful.
- Layout: wide hero with a one-sentence value proposition, generous
  section padding, thin 1px borders instead of heavy shadows.

STRUCTURE
1. Hero — who you help and the outcome you deliver, one sentence.
   Primary CTA: "Book a call."
2. Case Studies — 2-4 entries framed Challenge → Approach → Result,
   one hard number per case.
3. Credentials strip — past clients or employers, in grayscale.
4. Services — three clear offers, scoped or priced. No "let's chat
   about everything."
5. Contact — a real calendar embed or booking link, plus email.

BUILD NOTES FOR CLAUDE CODE
- Server-light static build, optimized for fast first paint — this
  audience will not wait.
- Add schema.org Person / ProfessionalService markup for SEO and rich
  results.
- Wire a real booking link (Calendly or Cal.com) into the primary
  CTA — no dead buttons.
- Deploy to GitHub Pages with a custom domain via CNAME so it reads
  as a firm, not a student project.

# A stranger lands, understands the offer, and books —
# in under 30 seconds.`}];function Cw({text:e,color:t}){const[i,n]=k.useState(!1),s=async()=>{try{await navigator.clipboard.writeText(e)}catch{const r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.opacity="0",document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}document.body.removeChild(r)}n(!0),setTimeout(()=>n(!1),1800)};return a.jsxs("button",{onClick:s,className:"inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors",style:{color:i?"#059669":"#e5e7eb",background:i?"rgba(5,150,105,0.15)":"rgba(255,255,255,0.08)",border:`1px solid ${i?"rgba(5,150,105,0.4)":"rgba(255,255,255,0.14)"}`},children:[i?a.jsx(F5,{size:13}):a.jsx(W5,{size:13}),i?"Copied":"Copy prompt",!i&&a.jsx("span",{style:{color:t},className:"sr-only"})]})}function Tw(){const[e,t]=k.useState("academic"),i=lc.find(n=>n.key===e)??lc[0];return a.jsxs("div",{className:"space-y-10",children:[a.jsx("style",{children:`
        @keyframes mbc-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .mbc-rise { animation: mbc-rise 0.5s ease both; }
        @keyframes mbc-glow-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(67,56,202,0); } 50% { box-shadow: 0 10px 40px -8px rgba(67,56,202,0.45); } }
        .mbc-glow { animation: mbc-glow-pulse 4s ease-in-out infinite; }
      `}),a.jsxs("p",{className:"text-xs inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",style:{color:"#3730a3",background:"rgba(199,210,254,0.5)"},children:[a.jsx(Ao,{size:12})," Capstone Bonus Lecture"]}),a.jsx("p",{className:"text-sm leading-6",style:{color:"#374151"},children:"Three tools, one afternoon: describe what you want, one AI designs it, another AI builds it, and GitHub Pages puts it online for free. Here's each stage, in order."}),a.jsx("div",{children:Fx.map((n,s)=>{const r=n.icon;return a.jsxs("div",{children:[a.jsx("div",{className:"rounded-2xl p-5 sm:p-6 border",style:{background:n.colorBg,borderColor:n.colorBorder},children:a.jsxs("div",{className:"flex items-start gap-4",children:[a.jsx("span",{className:"flex-none w-11 h-11 rounded-xl flex items-center justify-center",style:{background:n.color,color:"#fff"},children:a.jsx(r,{size:20})}),a.jsxs("div",{className:"min-w-0",children:[a.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[a.jsxs("span",{className:"text-[11px] font-mono font-semibold tracking-widest",style:{color:n.color},children:["STAGE ",n.number]}),a.jsx("span",{className:"text-[11px] font-mono font-semibold tracking-wide px-2 py-0.5 rounded-full",style:{background:n.color,color:"#fff"},children:n.tool})]}),a.jsx("h3",{className:"mt-1.5 text-lg sm:text-xl font-semibold",style:{color:"#111827"},children:n.title}),a.jsx("p",{className:"mt-2 text-sm leading-relaxed",style:{color:"#374151"},children:n.body}),a.jsx("ul",{className:"mt-3 space-y-1.5",children:n.notes.map(o=>a.jsxs("li",{className:"flex gap-2 text-[13px] leading-relaxed",style:{color:"#4b5563"},children:[a.jsx("span",{className:"mt-1.5 flex-none w-1 h-1 rounded-full",style:{background:n.color}}),o]},o))})]})]})}),s<Fx.length-1&&a.jsx("div",{className:"flex justify-center py-1.5",children:a.jsx(O5,{size:16,style:{color:"#c4b5fd"}})})]},n.id)})}),a.jsxs("div",{children:[a.jsxs("p",{className:"text-xs inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",style:{color:"#3730a3",background:"rgba(199,210,254,0.5)"},children:[a.jsx(Ao,{size:12})," The Interactive Prompt Foundry"]}),a.jsx("h3",{className:"mt-3 text-xl sm:text-2xl font-semibold",style:{color:"#111827"},children:"Pick a style for your site."}),a.jsx("p",{className:"mt-2 text-sm leading-relaxed max-w-2xl",style:{color:"#374151"},children:"Choose the one closest to what you want, then copy the prompt into Stitch and Claude Code."}),a.jsx("div",{className:"mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3",children:lc.map(n=>a.jsxs("button",{onClick:()=>t(n.key),className:"text-left rounded-2xl p-4 border transition-all",style:{background:e===n.key?n.colorBg:"#fff",borderColor:e===n.key?n.color:"rgba(0,0,0,0.08)"},children:[a.jsx("span",{className:"text-sm font-semibold block",style:{color:"#111827"},children:n.label}),a.jsx("span",{className:"text-xs mt-1 block",style:{color:e===n.key?n.color:"#9ca3af"},children:n.for})]},n.key))}),a.jsxs("div",{className:"mt-4 rounded-2xl overflow-hidden border",style:{background:"#111827",borderColor:"rgba(255,255,255,0.08)"},children:[a.jsxs("div",{className:"flex items-center justify-between px-4 sm:px-5 py-3",style:{background:"#0b0f19",borderBottom:"1px solid rgba(255,255,255,0.08)"},children:[a.jsxs("span",{className:"inline-flex items-center gap-2 text-xs font-mono",style:{color:"#9ca3af"},children:[a.jsx("span",{className:"w-2 h-2 rounded-full",style:{background:i.color}}),i.file]}),a.jsx(Cw,{text:i.prompt,color:i.color})]}),a.jsx("pre",{className:"px-4 sm:px-5 py-4 text-xs sm:text-[13px] leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto",style:{color:"#d1d5db",margin:0,maxHeight:440,overflowY:"auto"},children:i.prompt})]})]}),a.jsxs("div",{className:"rounded-2xl p-6 sm:p-8 border text-center",style:{background:"rgba(249,250,251,0.8)",borderColor:"rgba(0,0,0,0.06)"},children:[a.jsx("h3",{className:"text-xl sm:text-2xl font-semibold max-w-xl mx-auto",style:{color:"#111827"},children:"That's the pipeline."}),a.jsx("p",{className:"mt-3 text-sm leading-relaxed max-w-xl mx-auto",style:{color:"#4b5563"},children:"It doesn't end here. Keep the repo, keep pushing commits, and let an agent take the first pass so you can spend your time on the parts only you can judge."}),a.jsxs("p",{className:"mt-5 text-xs font-medium inline-flex items-center gap-1.5",style:{color:"#6b7280"},children:["— Yasas Sri Wickramasinghe",a.jsxs("a",{href:"https://www.linkedin.com/in/yasassri/",target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-1 hover:underline",style:{color:"#4338ca"},children:["LinkedIn ",a.jsx(Di,{size:11})]})]})]})]})}function Aw(){return a.jsx(wt,{eyebrow:"Capstone Bonus Lecture",titleLead:"Let's make sense of",titleAccent:"shipping your own site.",gradient:"linear-gradient(90deg, #7c3aed, #4f46e5, #059669)",accent:"#7c3aed",orb2:"#4f46e5",orb3:"#059669",subtitle:"How to go from an idea to a live website in one sitting, using Google Stitch, Claude Code, and GitHub Pages.",pills:[{emoji:"🎨",name:"Google Stitch 2.0",color:"#7c3aed"},{emoji:"⌘",name:"Claude Code (Web)",color:"#4f46e5"},{emoji:"🚀",name:"GitHub Pages",color:"#059669"}],children:a.jsx(Tw,{})})}const Wx={"database-concepts":P5,"er-diagrams":X5,"sql-programming":ew,"er-activities":nw,"er-advanced":ow,"er-attributes":cw,"apa-referencing":hw,"jira-certifications":vw,"sql-certifications":Ew,"vibe-to-production":Aw},Ux=new WeakMap;function zw(e,t){const i=Wx[t];if(!i)return null;const n=ju(e);return Ux.set(e,n),n.render(a.jsx(i,{})),()=>{n.unmount(),Ux.delete(e)}}window.mountLesson=zw,window.LESSON_DECK_SLUGS=Object.keys(Wx)})();
