/*!
 * 
 *   Name: dvsa-front-end/dvsa
 *   Version: 1.3.2
 *   Contributors: Martin D Marriott <martind@kainos.com>, James Nelson <j.nelson@kainos.com>, Tameem Safi <https://github.com/tameemsafi>
 *   Timestamp: January 30th 2019, 12:19:13 pm
 *   Source: https://github.com/dvsa/front-end
 * 
 */
webpackJsonp([4],{204:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ACCORDION_CONSTANTS={closeAllText:"Close All",openAllText:"Open All",attributeNames:{sectionContentId:"data-section-content-id",stateIndexId:"data-section-state-index-id",sectionCategory:"data-section-category",preventDefault:"data-section-prevent-default",disableStateRestore:"data-section-disable-restore-state"},classNames:{accordion:"js-accordion",section:"js-accordion__section",sectionOpen:"js-accordion__section--open",header:"js-accordion__header",headerHover:"js-accordion__header--hover",title:"js-accordion__title-button",content:"js-accordion__content",expandButton:"js-accordion__expand-button",jsEnabled:"js-accordion--js-enabled"},ariaAttributes:{controls:"aria-controls",expanded:"aria-expanded",hidden:"aria-hidden"},dataLayer:{open:"open",close:"close",closedStatus:"closed",linkClickEvent:"link-click",linkType:"accordion",sectionMemoryEvent:"subsection-memory",sectionAll:"subsection-all"},eventNames:{expandAllOpen:"js-accordion:expand-all-open"}},t.RECALLS_ACCORDION_CONSTANTS={selectors:{section:"[data-recalls-accordion]",header:"[data-recalls-accordion-header]"},attributeNames:{ajaxEndpoint:"data-recalls-ajax-endpoint",ajaxData:"data-recalls-ajax-data"},classNames:{content:"recalls-accordion",contentNoJs:"recalls-accordion--no-js",contentLoading:"recalls-accordion--loading",contentShowOutput:"recalls-accordion--show-output",errorMessage:"recalls-accordion__error-message",errorMessageVisible:"recalls-accordion--error-message-visible",noJSAlternative:"recalls-accordion__no-js-alternative",loading:"recalls-accordion__loading",output:"recalls-accordion__output"},dataLayer:{submitEvent:"recall-cta-submit",submitElementName:"Recall",submitRecallUi:"cta-submitted",submitRecallOutcome:"Requested",submitTimestamp:"timestamp",responseTimestamp:"response-timestamp",error:{event:"api-response",elementName:"Recall",recallUI:"api-error",detail:"Sorry, something went wrong with the search. Please try again later.",lambdaReturnCode:"",outcome:"Error",outcomeDetail:"Connection error",smmtCall:0}}}},217:function(e,t,n){"use strict";n(47),n(50),n(51),n(53),n(54),n(55),n(56),n(57),n(58),n(59),n(60),n(61),n(64),n(65),n(67),n(68),n(69),n(70),n(71),n(72),n(73),n(74),n(75),n(76),n(77),n(78),n(79),n(80),n(81),n(83),n(84),n(85),n(86),n(87),n(88),n(89),n(90),n(91),n(92),n(93),n(94),n(95),n(96),n(97),n(98),n(99),n(100),n(101),n(102),n(103),n(104),n(105),n(106),n(108),n(109),n(110),n(111),n(112),n(113),n(114),n(115),n(116),n(37),n(117),n(118),n(119),n(120),n(121),n(122),n(123),n(124),n(125),n(126),n(127),n(128),n(129),n(130),n(131),n(132),n(133),n(134),n(135),n(136),n(137),n(138),n(139),n(140),n(141),n(142),n(143),n(144),n(145),n(146),n(147),n(148),n(149),n(150),n(151);var a=n(4),o=n(261);(0,a.domReady)(function(){(0,a.initGDS)(),(0,o.initModules)()})},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initModules=void 0;var a=n(262);t.initModules=function(){(0,a.initAccordions)()}},262:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initAccordions=void 0;var a=n(263),o=n(266);t.initAccordions=function(){var e=document.querySelectorAll(".js-accordion");e=Array.from(e),e.length&&e.forEach(function(e){new a.Accordion(e)}),new o.RecallsAccordion}},263:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Accordion=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(201),i=a(r),c=n(46),l=a(c),d=n(265),u=a(d),C=n(204),O=n(15);t.Accordion=function(){function e(t){var n=this;return o(this,e),this.headerClickHandler=function(e){if(e.target&&n.state.sections.length){var t=(0,O.closestParentOfEl)(e.target,"."+C.ACCORDION_CONSTANTS.classNames.section);if(!t.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.preventDefault)){var a=(t.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.sectionCategory),Number(t.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.stateIndexId))),o=n.state.sections[a];if(o){var s=!o.sectionOpen;n.state.sections[a].sectionOpen=s,n.refreshState(),n.smoothScroll.animateScroll(t,!0,n.smoothScrollOptions),n.pushDataLayerForAccordion(a)}}}},this.headerMouseEnterHandler=function(e){if(e.target){var t=(0,O.closestParentOfEl)(e.target,"."+C.ACCORDION_CONSTANTS.classNames.header);t&&(0,O.toggleClass)(t,C.ACCORDION_CONSTANTS.classNames.headerHover,!0)}},this.headerMouseLeaveHandler=function(e){if(e.target){var t=(0,O.closestParentOfEl)(e.target,"."+C.ACCORDION_CONSTANTS.classNames.header);t&&(0,O.toggleClass)(t,C.ACCORDION_CONSTANTS.classNames.headerHover,!1)}},this.expandButtonClickHandler=function(e){n.state.expanding=!0,n.state.expandAll=!n.state.expandAll,n.state.expandAll&&(0,O.triggerCustomEvent)(document,C.ACCORDION_CONSTANTS.eventNames.expandAllOpen),n.refreshState(),n.state.expanding=!1,n.smoothScroll.animateScroll(e.target,!0,n.smoothScrollOptions),n.pushDataLayerForAllAccordions()},this.pushDataLayerForAllAccordions=function(){if(window.dataLayer){var e=n.state.expandAll?C.ACCORDION_CONSTANTS.dataLayer.open:C.ACCORDION_CONSTANTS.dataLayer.close,t={event:C.ACCORDION_CONSTANTS.dataLayer.linkClickEvent,link:C.ACCORDION_CONSTANTS.dataLayer.sectionAll,"link-text":n.state.expandAll?C.ACCORDION_CONSTANTS.openAllText:C.ACCORDION_CONSTANTS.closeAllText,"link-action":e,"link-type":C.ACCORDION_CONSTANTS.dataLayer.linkType};n.state.sections.forEach(function(a){var o=n.getSectionDataLayerInfo(a),s=e===C.ACCORDION_CONSTANTS.dataLayer.close?C.ACCORDION_CONSTANTS.dataLayer.closedStatus:e;t["subsection-"+o.category+"-status"]=s}),window.dataLayer.push(t)}},this.pushDataLayerForAccordion=function(e){if(window.dataLayer&&void 0!=e){var t=n.state.sections[e];if(t&&t.sectionElement){var a=n.getSectionDataLayerInfo(t),o={event:C.ACCORDION_CONSTANTS.dataLayer.linkClickEvent,link:"subsection-"+a.category,"link-text":a.heading,"link-action":a.openState,"link-type":C.ACCORDION_CONSTANTS.dataLayer.linkType},s=a.openState===C.ACCORDION_CONSTANTS.dataLayer.close?C.ACCORDION_CONSTANTS.dataLayer.closedStatus:a.openState;o["subsection-"+a.category+"-status"]=s,window.dataLayer.push(o)}}},this.pushDataLayerForSavedState=function(e){window.dataLayer&&e&&e.forEach(function(e){var t=n.getSectionDataLayerInfo(e);if(t.openState!=C.ACCORDION_CONSTANTS.dataLayer.close){var a={event:C.ACCORDION_CONSTANTS.dataLayer.sectionMemoryEvent,link:"subsection-"+t.category,"link-text":t.heading,"link-action":t.openState,"link-type":C.ACCORDION_CONSTANTS.dataLayer.linkType};a["subsection-"+t.category+"-status"]=t.openState,window.dataLayer.push(a)}})},this.getSectionDataLayerInfo=function(e){if(e&&e.sectionElement)return{category:e.sectionElement.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.sectionCategory),indexId:Number(e.sectionElement.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.stateIndexId)),heading:e.sectionElement.querySelector("."+C.ACCORDION_CONSTANTS.classNames.title).textContent,openState:e.sectionOpen?C.ACCORDION_CONSTANTS.dataLayer.open:C.ACCORDION_CONSTANTS.dataLayer.close}},this.accordionElement=t,this.accordionElement?(this.accordionElement.setAttribute("role","presentation"),this.smoothScroll=new u.default,this.uniqueIdentifier="js-accordion-"+(0,l.default)(this.accordionElement.innerHTML),this.sections=Array.from(this.accordionElement.querySelectorAll("."+C.ACCORDION_CONSTANTS.classNames.section)),this.headings=Array.from(this.accordionElement.querySelectorAll("."+C.ACCORDION_CONSTANTS.classNames.header)),this.expandButton=this.accordionElement.querySelector("."+C.ACCORDION_CONSTANTS.classNames.expandButton),this.sections&&this.headings&&this.expandButton?((0,O.toggleClass)(this.accordionElement,C.ACCORDION_CONSTANTS.classNames.jsEnabled,!0),this.state={expandAll:!1,expanding:!1,sections:[]},this.smoothScrollOptions={offset:30,speed:300,easing:"easeOutCubic"},this.setup(),void this.refreshState()):console.warn("No sections found","No headings found","No expand button found")):console.warn("Accordion element not found")}return s(e,[{key:"setup",value:function(){var e=this;this.sections.length&&(this.sections.forEach(function(t){if(!t)return console.log("Section element not found");var n=t.querySelector("."+C.ACCORDION_CONSTANTS.classNames.header);if(!n)return console.log("Section header element not found");n.setAttribute("role","heading"),(0,O.addEventListenerToEl)(n,"mouseenter",e.headerMouseEnterHandler),(0,O.addEventListenerToEl)(n,"mouseleave",e.headerMouseLeaveHandler),(0,O.addEventListenerToEl)(n,"click",e.headerClickHandler);var a=t.querySelector("."+C.ACCORDION_CONSTANTS.classNames.content);if(!a)return console.log("Section content element not found");n.setAttribute("role","region");var o=(0,l.default)(t.innerHTML),s=n.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.sectionContentId);e.state.sections.push({sectionUniqueIdentifier:o,sectionElement:t,sectionHeaderElement:n,sectionContentElement:a,sectionContentId:s,sectionOpen:e.isSectionOpen(t)});var r=e.state.sections.length-1;t.setAttribute(C.ACCORDION_CONSTANTS.attributeNames.stateIndexId,r),a.getAttribute("id")||a.setAttribute("id",s||o)}),(0,O.addEventListenerToEl)(this.expandButton,"click",this.expandButtonClickHandler))}},{key:"restoreSavedStateData",value:function(){var e=this,t=i.default.get(this.uniqueIdentifier);if(t&&t.sections){var n=[];t.sections.forEach(function(a){if(a&&a.uniqueIdentifier&&e.state.sections){var o=!1;if(e.state.sections.forEach(function(e,t){e.sectionUniqueIdentifier===a.uniqueIdentifier&&(o=t)}),void 0!=o){var s=e.state.sections[o];if(s){var r=!1;s.sectionElement&&s.sectionElement.getAttribute(C.ACCORDION_CONSTANTS.attributeNames.disableStateRestore)&&(r=!0),e.state.sections[o].sectionOpen=!r&&(!!t.expandAll||a.open),n.push(e.state.sections[o])}}}}),this.pushDataLayerForSavedState(n)}}},{key:"saveCurrentStateData",value:function(){var e={};e.expandAll=this.state.expandAll,e.sections=[],this.state&&this.state.sections&&(this.state.sections.forEach(function(t){e.sections.push({uniqueIdentifier:t.sectionUniqueIdentifier,open:t.sectionOpen})}),i.default.set(this.uniqueIdentifier,e))}},{key:"refreshState",value:function(){var e=this;if(this.state){if(this.state.sections){var t=0,n=0;this.state.sections.forEach(function(a){e.state.expanding&&(a.sectionOpen=e.state.expandAll);a.sectionOpen;(0,O.toggleClass)(a.sectionElement,C.ACCORDION_CONSTANTS.classNames.sectionOpen,a.sectionOpen),a.sectionHeaderElement&&a.sectionContentElement&&(a.sectionContentId||a.sectionUniqueIdentifier)&&(a.sectionHeaderElement.setAttribute(C.ACCORDION_CONSTANTS.ariaAttributes.controls,a.sectionContentId?a.sectionContentId:a.sectionUniqueIdentifier),a.sectionHeaderElement.setAttribute(C.ACCORDION_CONSTANTS.ariaAttributes.expanded,a.sectionOpen?"true":"false"),a.sectionContentElement.setAttribute(C.ACCORDION_CONSTANTS.ariaAttributes.hidden,a.sectionOpen?"false":"true")),a.sectionOpen&&t++,n++,t>=1&&!e.state.expanding&&(e.state.expandAll=!1),t>=e.state.sections.length&&!e.state.expanding&&(e.state.expandAll=!0)})}this.expandButton.textContent=this.getExpandButtonText()}}},{key:"isSectionOpen",value:function(e){return!!(0,O.elHasClass)(e,C.ACCORDION_CONSTANTS.classNames.sectionOpen)}},{key:"getExpandButtonText",value:function(){return this.state.expandAll?C.ACCORDION_CONSTANTS.closeAllText:C.ACCORDION_CONSTANTS.openAllText}}]),e}()},265:function(e,t,n){(function(n){var a,o;/*! smooth-scroll v12.1.5 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!function(n,s){a=[],void 0!==(o=function(){return s(n)}.apply(t,a))&&(e.exports=o)}(void 0!==n?n:"undefined"!=typeof window?window:this,function(e){"use strict";var t="querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype,n={ignore:"[data-scroll-ignore]",header:null,speed:500,offset:0,easing:"easeInOutCubic",customEasing:null,before:function(){},after:function(){}},a=function(){for(var e={},t=0,n=arguments.length;t<n;t++){var a=arguments[t];!function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}(a)}return e},o=function(t){return parseInt(e.getComputedStyle(t).height,10)},s=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),a=n.length,o=-1,s="",r=n.charCodeAt(0);++o<a;){if(0===(t=n.charCodeAt(o)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");s+=t>=1&&t<=31||127==t||0===o&&t>=48&&t<=57||1===o&&t>=48&&t<=57&&45===r?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(o):"\\"+n.charAt(o)}return"#"+s},r=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},i=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},c=function(e,t,n){var a=0;if(e.offsetParent)do{a+=e.offsetTop,e=e.offsetParent}while(e);return a=Math.max(a-t-n,0)},l=function(e){return e?o(e)+e.offsetTop:0},d=function(t,n,a){a||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},u=function(t){return!!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)};return function(o,C){var O,N,A,S,f,m,h,p={};p.cancelScroll=function(){cancelAnimationFrame(h)},p.animateScroll=function(t,o,s){var u=a(O||n,s||{}),C="[object Number]"===Object.prototype.toString.call(t),N=C||!t.tagName?null:t;if(C||N){var A=e.pageYOffset;u.header&&!S&&(S=document.querySelector(u.header)),f||(f=l(S));var m,h,T,y=C?t:c(N,f,parseInt("function"==typeof u.offset?u.offset():u.offset,10)),g=y-A,L=i(),_=0,v=function(n,a){var s=e.pageYOffset;if(n==a||s==a||(A<a&&e.innerHeight+s)>=L)return p.cancelScroll(),d(t,a,C),u.after(t,o),m=null,!0},R=function(t){m||(m=t),_+=t-m,h=_/parseInt(u.speed,10),h=h>1?1:h,T=A+g*r(u,h),e.scrollTo(0,Math.floor(T)),v(T,y)||(e.requestAnimationFrame(R),m=t)};0===e.pageYOffset&&e.scrollTo(0,0),u.before(t,o),p.cancelScroll(),e.requestAnimationFrame(R)}};var T=function(e){N&&(N.id=N.getAttribute("data-scroll-id"),p.animateScroll(N,A),N=null,A=null)},y=function(t){if(!u()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&(A=t.target.closest(o))&&"a"===A.tagName.toLowerCase()&&!t.target.closest(O.ignore)&&A.hostname===e.location.hostname&&A.pathname===e.location.pathname&&/#/.test(A.href)){var n;try{n=s(decodeURIComponent(A.hash))}catch(e){n=s(A.hash)}if("#"===n){t.preventDefault(),N=document.body;var a=N.id?N.id:"smooth-scroll-top";return N.setAttribute("data-scroll-id",a),N.id="",void(e.location.hash.substring(1)===a?T():e.location.hash=a)}(N=document.querySelector(n))&&(N.setAttribute("data-scroll-id",N.id),N.id="",A.hash===e.location.hash&&(t.preventDefault(),T()))}},g=function(e){m||(m=setTimeout(function(){m=null,f=l(S)},66))};return p.destroy=function(){O&&(document.removeEventListener("click",y,!1),e.removeEventListener("resize",g,!1),p.cancelScroll(),O=null,N=null,A=null,S=null,f=null,m=null,h=null)},p.init=function(o){t&&(p.destroy(),O=a(n,o||{}),S=O.header?document.querySelector(O.header):null,f=l(S),document.addEventListener("click",y,!1),e.addEventListener("hashchange",T,!1),S&&e.addEventListener("resize",g,!1))},p.init(C),p}})}).call(t,n(152))},266:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.RecallsAccordion=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(205),c=function(e){return e&&e.__esModule?e:{default:e}}(i),l=n(204),d=n(15);t.RecallsAccordion=function(){function e(){var t=this;if(a(this,e),this.recallsHeadingClickHandler=function(e){t.state.ajaxEndpoint&&(t.state.loading||t.state.ajaxContentAddedToDOM||(t.dataLayerPushBeforeAjax(),t.callAjaxWithJSONResponse()))},this.callAjaxWithJSONResponse=function(){t.startLoading(),c.default.post(t.state.ajaxEndpoint,s({},t.state.ajaxRequestBody)).then(function(e){var n=e.data;if(null===n||null===n.result)return t.stopLoading(),console.warn("No HTML result key found in response");if(t.elements.output.innerHTML=n.result,(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput,!0),t.state.ajaxContentAddedToDOM=!0,null!==n&&n.smartSurveyLink){var a=document.querySelector(".phase-banner a");a?a.href=n.smartSurveyLink:console.warn("Found smart survey link in response, but could no detect phase banner link in the DOM")}null!==n&&n.dataLayer&&(Array.isArray(n.dataLayer)?n.dataLayer.forEach(function(e,n){0===n&&(e[l.RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp]=Date.now()),t.dataLayerPush(e)}):null!==n.dataLayer&&"object"===o(n.dataLayer)&&(n.dataLayer[l.RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp]=Date.now(),t.dataLayerPush(n.dataLayer))),t.stopLoading()}).catch(t.handleError)},this.callAjaxWithHTMLResponse=function(){t.startLoading(),c.default.post(t.state.ajaxEndpoint,s({},t.state.ajaxRequestBody)).then(function(e){if(!e||!e.data)return t.stopLoading(),console.warn("Response has no data");t.elements.output.innerHTML=e.data,t.state.ajaxContentAddedToDOM=!0,(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput,!0),t.stopLoading()}).catch(t.handleError)},this.handleError=function(e){t.stopLoading(),t.elements.error&&(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessageVisible,!0);var n={event:l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.event,"element-name":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.elementName,"recall-ui":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.recallUI,"recall-ui-detail":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.detail,"lambda-return-code":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.lambdaReturnCode,"recall-outcome":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcome,"recall-outcome-detail":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcomeDetail,"smmt-call":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.error.smmtCall};t.dataLayerPush(n)},this.dataLayerPushBeforeAjax=function(){if(window.dataLayer){var e={event:l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitEvent,"element-name":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitElementName,"recall-ui":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallUi,"recall-outcome":l.RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallOutcome,timestamp:(new Date).getTime()};window.dataLayer.push(e)}},this.startLoading=function(){t.state.loading=!0,(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessageVisible,!1),(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading,!0)},this.stopLoading=function(){(0,d.toggleClass)(t.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading,!1),t.state.loading=!1},this.dataLayerPush=function(e){if(!window.dataLayer||null===e||"object"!==(void 0===e?"undefined":o(e)))return console.warn("Could not push dataLayer as it was not found");window.dataLayer.push(e)},this.recallsAccordionSectionElement=document.querySelector(l.RECALLS_ACCORDION_CONSTANTS.selectors.section),this.recallsAccordionSectionElement){this.elements={parent:(0,d.closestParentOfEl)(this.recallsAccordionSectionElement,"."+l.ACCORDION_CONSTANTS.classNames.accordion),header:document.querySelector(l.RECALLS_ACCORDION_CONSTANTS.selectors.header),content:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.content),noJSAlternative:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.noJSAlternative),loading:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.loading),output:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.output),error:document.querySelector("."+l.RECALLS_ACCORDION_CONSTANTS.classNames.errorMessage)};for(var n in this.elements)if(!this.elements[n])return console.warn(n+" - Element was not found, aborting.");this.state={ajaxRequestBody:!1,ajaxEndpoint:!1,ajaxContentAddedToDOM:!1,loading:!1},this.setup()}}return r(e,[{key:"setup",value:function(){(0,d.toggleClass)(this.elements.content,l.RECALLS_ACCORDION_CONSTANTS.classNames.contentNoJs,!1),this.state.ajaxEndpoint=this.recallsAccordionSectionElement.getAttribute(l.RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxEndpoint),this.state.ajaxRequestBody=JSON.parse(this.recallsAccordionSectionElement.getAttribute(l.RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxData)),(0,d.addEventListenerToEl)(this.elements.header,"click",this.recallsHeadingClickHandler),document.addEventListener(l.ACCORDION_CONSTANTS.eventNames.expandAllOpen,this.recallsHeadingClickHandler)}}]),e}()}},[217]);