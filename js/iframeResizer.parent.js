/**
 *  iframe-resizer (parent) v5.0.0-alpha.1
 *
 *  License:    GPL-3.0
 *  Copyright:  (c) 2013 - 2024, David J. Bradshaw. All rights reserved.
 * 
 *  Desciption: Keep same and cross domain iFrames sized to their content with
 *              support for window/content resizing, and multiple iFrames.
 *
 *  @preserve
 *  @module @iframe-resizer/parent
 *  @version 5.0.0-alpha.1
 *  @license GPL-3.0
 *  @author David J. Bradshaw <dave@bradshaw.net>
 *  @fileoverview Parent window script for iframe-resizer.
 *  @copyright (c) 2013 - 2024, David J. Bradshaw. All rights reserved.
 *  @see {@link https://github.com/davidjbradshaw/iframe-resizer}
 */


!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).iframeResize=n()}(this,(function(){"use strict";const e="[iframeResizer]";const n=n=>`${e}[${function(e){return window.top===window.self?`Host page: ${e}`:window?.parentIFrame?.getId?`${window.parentIFrame.getId()}: ${e}`:`Nested host page: ${e}`}(n)}]`,t=(e,t,...i)=>window?.console[e](n(t),...i),i=(e,...n)=>t("info",e,...n),o=(e,...n)=>t("warn",e,...n),r=(n,t)=>window?.console.warn(((n,...t)=>[`${e}[${n}]`,...t].join(" "))(n,window.chrome?t:t.replaceAll(/\u001B\[[\d;]*m/gi,""))),a="5.0.0-alpha.1",s=(e,n,t,i)=>e.addEventListener(n,t,i||!1),c=(e,n,t)=>e.removeEventListener(n,t,!1),d=7,l="[iFrameSizer]",u=l.length,f=Object.freeze({max:1,scroll:1,bodyScroll:1,documentElementScroll:1}),m={},h=Object.freeze({autoResize:!0,bodyBackground:null,bodyMargin:null,bodyPadding:null,checkOrigin:!0,direction:"vertical",inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"auto",id:"iFrameResizer",log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,mouseEvents:!0,offsetHeight:0,offsetWidth:0,postMessageTarget:null,sameDomain:!1,scrolling:!1,sizeHeight:!0,sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"auto",onClose:()=>!0,onClosed(){},onInit:!1,onMessage:null,onMouseEnter(){},onMouseLeave(){},onReady(e){"function"==typeof m[e.id].onInit&&(r(e.id,"\n[31;1mDeprecated Option[m\n\nThe [1monInit()[m function is deprecated and has been replaced with [1monReady()[m. It will be removed in a future version of iFrame Resizer.\n        "),m[e.id].onInit(e))},onResized(){},onScroll:()=>!0});let g=0,p=null;function w(e){function n(){a("Height"),a("Width"),I(B),T(),L("onResized",B)}function t(e){if("border-box"!==e.boxSizing)return 0;return(e.paddingTop?parseInt(e.paddingTop,10):0)+(e.paddingBottom?parseInt(e.paddingBottom,10):0)}function r(e){if("border-box"!==e.boxSizing)return 0;return(e.borderTopWidth?parseInt(e.borderTopWidth,10):0)+(e.borderBottomWidth?parseInt(e.borderBottomWidth,10):0)}function a(e){const n=Number(m[D][`max${e}`]),t=Number(m[D][`min${e}`]),i=e.toLowerCase();let o=Number(B[i]);o<t&&(o=t),o>n&&(o=n),B[i]=`${o}`}function f(e){return j.slice(j.indexOf(":")+d+e)}const h=(e,n)=>(t,i)=>{const o={};var r,a;r=function(){R(`Send ${e} (${t})`,`${e}:${n()}`,i)},o[a=i]||(r(),o[a]=requestAnimationFrame((()=>{o[a]=null})))},g=(e,n)=>()=>{const t=n=>()=>{m[r]?e(n,r):o()};function i(e,n){n(window,"scroll",t("scroll")),n(window,"resize",t("resize window"))}function o(){i(0,c),a.disconnect()}const r=D,a=new ResizeObserver(t("iframe observed"));i(0,s),a.observe(document.body,{attributes:!0,childList:!0,subtree:!0}),m[r]&&(m[r][`stop${n}`]=o)},w=e=>()=>{e in m[D]&&(m[D][e](),delete m[D][e])},y=h("pageInfo",(function(){const e=document.body.getBoundingClientRect(),n=B.iframe.getBoundingClientRect(),{scrollY:t,scrollX:i,innerHeight:o,innerWidth:r}=window,{clientHeight:a,clientWidth:s}=document.documentElement;return JSON.stringify({iframeHeight:n.height,iframeWidth:n.width,clientHeight:Math.max(a,o||0),clientWidth:Math.max(s,r||0),offsetTop:parseInt(n.top-e.top,10),offsetLeft:parseInt(n.left-e.left,10),scrollTop:t,scrollLeft:i,documentHeight:a,documentWidth:s,windowHeight:o,windowWidth:r})})),M=h("parentInfo",(function(){const{iframe:e}=B,{scrollWidth:n,scrollHeight:t}=document.documentElement,{width:i,height:o,offsetLeft:r,offsetTop:a,pageLeft:s,pageTop:c,scale:d}=window.visualViewport;return JSON.stringify({iframe:e.getBoundingClientRect(),document:{scrollWidth:n,scrollHeight:t},viewport:{width:i,height:o,offsetLeft:r,offsetTop:a,pageLeft:s,pageTop:c,scale:d}})})),W=g(y,"PageInfo"),E=g(M,"ParentInfo"),N=w("stopPageInfo"),F=w("stopParentInfo");function H(e){const n=e.getBoundingClientRect();return v(),{x:Math.floor(Number(n.left)+Number(p.x)),y:Math.floor(Number(n.top)+Number(p.y))}}function O(e){const n=e?H(B.iframe):{x:0,y:0};let t=((e,n)=>({x:Number(e.width)+n.x,y:Number(e.height)+n.y}))(B,n);window.top===window.self?(p=t,S()):window.parentIFrame?window.parentIFrame["scrollTo"+(e?"Offset":"")](t.x,t.y):o(D,"Unable to scroll to requested position, window.parentIFrame not found")}function S(){!1!==L("onScroll",p)?T():$()}function C(e){let n={};if(0===Number(B.width)&&0===Number(B.height)){const e=f(9).split(":");n={x:e[1],y:e[0]}}else n={x:B.width,y:B.height};L(e,{iframe:B.iframe,screenX:Number(n.x),screenY:Number(n.y),type:B.type})}const L=(e,n)=>b(D,e,n);let j=e.data,B={},D=null;"[iFrameResizerChild]Ready"!==j?l===`${j}`.slice(0,u)&&j.slice(u).split(":")[0]in m?(B=function(){const e=j.slice(u).split(":"),n=e[1]?Number(e[1]):0,i=m[e[0]]?.iframe,o=getComputedStyle(i);return{iframe:i,id:e[0],height:n+t(o)+r(o),width:Number(e[2]),type:e[3]}}(),D=B.id,D?(function(e){if(!m[e])throw new Error(`${B.type} No settings for ${e}. Message was: ${j}`)}(D),B.type in{true:1,false:1,undefined:1}||(m[D].loaded=!0,function(){let e=!0;return null===B.iframe&&(o(D,`The iframe (${B.id}) was not found.`),e=!1),e}()&&function(){const{origin:n,sameDomain:t}=e;if(t)return!0;let i=m[D]?.checkOrigin;if(i&&"null"!=`${n}`&&!(i.constructor===Array?function(){let e=0,t=!1;for(;e<i.length;e++)if(i[e]===n){t=!0;break}return t}():function(){const e=m[D]?.remoteHost;return n===e}()))throw new Error(`Unexpected message received from: ${n} for ${B.iframe.id}. Message was: ${e.data}. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.`);return!0}()&&function(){switch(m[D]?.firstRun&&m[D]&&(m[D].firstRun=!1),B.type){case"close":z(B.iframe);break;case"message":e=f(6),L("onMessage",{iframe:B.iframe,message:JSON.parse(e)});break;case"mouseenter":C("onMouseEnter");break;case"mouseleave":C("onMouseLeave");break;case"autoResize":m[D].autoResize=JSON.parse(f(9));break;case"scrollTo":O(!1);break;case"scrollToOffset":O(!0);break;case"pageInfo":y("start",D),W();break;case"parentInfo":M("start",D),E();break;case"pageInfoStop":N();break;case"parentInfoStop":F();break;case"inPageLink":!function(e){const n=e.split("#")[1]||"",t=decodeURIComponent(n);let i=document.getElementById(t)||document.getElementsByName(t)[0];i?function(){const e=H(i);p={x:e.x,y:e.y},S()}():window.top!==window.self&&window.parentIFrame&&window.parentIFrame.moveToAnchor(n)}(f(9));break;case"reset":x(B);break;case"init":n(),function(e){try{m[e].sameDomain=!!m[e]?.iframe?.contentWindow?.iFrameListener}catch(n){m[e].sameDomain=!1}}(D),L("onReady",B.iframe);break;default:if(0===B.width&&0===B.height)return void o(`Unsupported message received (${B.type}), this is likely due to the iframe containing a later version of iframe-resizer than the parent page`);if(0===B.width||0===B.height)return;if(document.hidden)return;n()}var e}())):o("iframeResizer received messageData without id, message was: ",j)):i(D,`Ignored: ${j}`):Object.keys(m).forEach((e=>R("iFrame requested init",k(e),e)))}function b(e,n,t){let i=null,o=null;if(m[e]){if(i=m[e][n],"function"!=typeof i)throw new TypeError(`${n} on iFrame[${e}] is not a function`);o=i(t)}return o}function y(e){const n=e.id;delete m[n]}function z(e){const n=e.id;if(!1!==b(n,"onClose",n)){try{e.parentNode&&e.remove()}catch(e){o(e)}b(n,"onClosed",n),y(e)}}function v(e){null===p&&(p={x:window.scrollX,y:window.scrollY})}function $(){p=null}function T(e){null!==p&&(window.scrollTo(p.x,p.y),$())}function x(e){v(e.id),I(e),R("reset","reset",e.id)}function I(e){const n=e.id;function t(n){const t=`${e[n]}px`;e.iframe.style[n]=t}m[n].sizeHeight&&t("height"),m[n].sizeWidth&&t("width")}function R(e,n,t,i){m[t]&&(m[t]?.postMessageTarget?function(){const{postMessageTarget:e,targetOrigin:i}=m[t];if(m[t].sameDomain)try{return void m[t].iframe.contentWindow.iFrameListener(l+n)}catch(e){o(t,"Same domain connection failed. Trying cross domain"),m[t].sameDomain=!1}e.postMessage(l+n,i)}():o(t,`[${e}] IFrame(${t}) not found`),i&&m[t]?.warningTimeout&&(m[t].msgTimeout=setTimeout((function(){void 0!==m[t]&&(m[t].loaded||m[t].loadErrorShown||(m[t].loadErrorShown=!0,r(t,`\n[31;1mNo response from iFrame[m\n            \nThe iframe ([3m${t}[m) has not responded within ${m[t].warningTimeout/1e3} seconds. Check [1miFrameResizer.contentWindow.js[m has been loaded in the iframe.\n\nThis message can be ignored if everything is working, or you can set the [1mwarningTimeout[m option to a higher value or zero to suppress this warning.\n`)))}),m[t].warningTimeout)))}function k(e){const n=m[e];return[e,"8",n.sizeWidth,n.log,"32",n.enablePublicMethods,n.autoResize,n.bodyMargin,n.heightCalculationMethod,n.bodyBackground,n.bodyPadding,n.tolerance,n.inPageLinks,"child",n.widthCalculationMethod,n.mouseEvents,n.offsetHeight,n.offsetWidth,n.sizeHeight,a].join(":")}const M=e=>!Number.isNaN(e);function W(e,n){function t(e){if(!e)return{};if("object"!=typeof e)throw new TypeError("Options is not an object");return("sizeWidth"in e||"sizeHeight"in e||"autoResize"in e)&&r(i,'\n[31;1mDeprecated Optionm\n\nThe [1msizeWidth[m, [1msizeHeight[m and [1mautoResize[m options have been replaced with new [1mdirection[m option which expects values of [3m"vertical"[m, [3m"horizontal"[m or [3m"horizontal"[m.\n'),e}const i=function(t){if("string"!=typeof t)throw new TypeError("Invaild id for iFrame. Expected String");return""===t&&(e.id=t=function(){let e=n?.id||h.id+g++;return null!==document.getElementById(e)&&(e+=g++),e}(),(n||{}).log),t}(e.id);i in m&&"iFrameResizer"in e?o(i,"Ignored iFrame, already setup."):(!function(n){var o;m[i]={iframe:e,firstRun:!0,remoteHost:e?.src.split("/").slice(0,3).join("/"),...h,...t(n)},function(){if("horizontal"===m[i].direction)return m[i].sizeWidth=!0,void(m[i].sizeHeight=!1);if("none"===m[i].direction)return m[i].sizeWidth=!1,m[i].sizeHeight=!1,void(m[i].autoResize=!1);if("vertical"!==m[i].direction)throw new TypeError(i,`Direction value of "${m[i].direction}" is not valid`)}(),null===m[i].postMessageTarget&&(m[i].postMessageTarget=e.contentWindow),m[i].targetOrigin=!0===m[i].checkOrigin?""===(o=m[i].remoteHost)||null!==o.match(/^(about:blank|javascript:|file:\/\/)/)?"*":o:"*"}(n),function(){switch(e.style.overflow=!1===m[i]?.scrolling?"hidden":"auto",m[i]?.scrolling){case"omit":break;case!0:e.scrolling="yes";break;case!1:e.scrolling="no";break;default:e.scrolling=m[i]?m[i].scrolling:"no"}}(),function(){function n(n){const t=m[i][n];1/0!==t&&0!==t&&(e.style[n]=M(t)?`${t}px`:t)}function t(e){if(M(`min${e}`)&&M(`max${e}`)&&m[i][`min${e}`]>m[i][`max${e}`])throw new Error(`Value for min${e} can not be greater than max${e}`)}t("Height"),t("Width"),n("maxHeight"),n("minHeight"),n("maxWidth"),n("minWidth")}(),function(){const{bodyMargin:e}=m[i];"number"!=typeof e&&"0"!==e||(m[i].bodyMargin=`${e}px`)}(),function(n){const{id:t}=e;s(e,"load",(function(){R("iFrame.onload",n,t,!0),function(){const n=m[i]?.firstRun,t=m[i]?.heightCalculationMethod in f;!n&&t&&x({iframe:e,height:0,width:0,type:"init"})}()})),R("init",n,t,!0)}(k(i)),m[i]&&(m[i].iframe.iFrameResizer={close:z.bind(null,m[i].iframe),removeListeners:y.bind(null,m[i].iframe),resize:R.bind(null,"Window resize","resize",i),moveToAnchor(e){R("Move to anchor",`moveToAnchor:${e}`,i)},sendMessage(e){R("Send Message",`message:${e=JSON.stringify(e)}`,i)}}))}function E(){!1===document.hidden&&function(e,n){const t=e=>m[e]?.autoResize&&!m[e]?.firstRun;Object.keys(m).forEach((function(i){t(i)&&R(e,n,i)}))}("Tab Visible","resize")}let N=!1;const F=function(){function e(e,t){t&&(!function(){if(!t.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==t.tagName.toUpperCase())throw new TypeError(`Expected <IFRAME> tag, found <${t.tagName}>`)}(),W(t,e),n.push(t))}let n;return N||(s(window,"message",w),s(document,"visibilitychange",E),window.iFrameListener=e=>w({data:e,sameDomain:!0}),N=!0),function(t,i){if("undefined"==typeof window)return[];switch(n=[],typeof i){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(i||"iframe"),e.bind(void 0,t));break;case"object":e(t,i);break;default:throw new TypeError(`Unexpected data type (${typeof i})`)}return n}}();return"undefined"!=typeof window&&(window.iFrameResize=function(...e){r("","Deprecated: iFrameResize(), please use iframeResize()"),F(...e)}),F}));
