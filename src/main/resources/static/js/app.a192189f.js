(function(t){function e(e){for(var r,o,i=e[0],c=e[1],l=e[2],p=0,d=[];p<i.length;p++)o=i[p],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&d.push(n[o][0]),n[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(r=!1)}r&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},n={app:0},s=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"53b7":function(t,e,a){t.exports=a.p+"img/action2.fdccd4b5.png"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"inspire"}},[r("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("nav-content")],1),r("v-app-bar",{attrs:{app:""}},[r("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),r("v-toolbar-title",[t._v("Text summarization")])],1),r("v-main",[r("v-container",{attrs:{fluid:""}},[r("div",{staticClass:"des"},[r("h3",[t._v("Что это?")]),r("p",[t._v("Инструмент поможет вам обработать большой объём текстовой информации различной специфики и выделить ключевую информацию.")]),r("v-row",{attrs:{justify:"center"}},[r("v-img",{staticClass:"img",attrs:{"max-height":"250","max-width":"700",src:a("53b7")}})],1),r("v-row",{attrs:{justify:"center"}},[r("v-col",{staticClass:"comment"},[r("h4",{staticClass:"undertext"},[t._v("Большой текст ")]),r("h4",{staticClass:"undertext"},[t._v(" => ")]),r("h4",{staticClass:"undertext"},[t._v(" Краткое резюме ")])])],1),r("h3",[t._v("Как это работает?")]),r("p",[t._v("Наши модели машинного обучения основаны на экстрактивном подходе, который подразумевает под собой извлечение ключевых предложений из документа. Данный подход включает техники ранжирования ключевых предложений по важности (которая оценивается через различные метрики), после чего выбирается N наиболее релевантных предложений.")]),r("v-row",{attrs:{justify:"center"}},[r("v-img",{staticClass:"img",attrs:{"max-height":"250","max-width":"900",src:a("f795")}})],1),r("h4",{staticClass:"comment"},[t._v("Экстрактивная суммаризация")]),r("h3",[t._v("Как этим пользоваться?")]),r("p",[t._v(" 1. Вставьте необходимый текст в поле ниже.")]),r("p",[t._v("2. Выберете % текста, который вы хотите прочитать (по умолчанию = 10%)")]),r("p",[t._v("3. Выберете ML-модель (по умолчанию = LDA)")])],1),r("v-row",{staticClass:"row"},[r("v-col",[r("h3",[t._v("Количество выделяемых предложений(%):")])]),r("v-col",[r("h3",[t._v("Выбор нужной модели:")])])],1),r("v-row",{staticClass:"row"},[r("v-col",[r("v-slider",{attrs:{hint:"Количество выделяемых предложений",max:"100",min:"0","thumb-label":""},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),r("v-col",[r("v-select",{attrs:{items:t.items,label:"Model"},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)],1),r("v-row",{attrs:{justify:"end"}},[r("country-flag",{staticClass:"flag",attrs:{country:"ru"}}),r("country-flag",{staticClass:"flag",attrs:{country:"gb"}})],1),r("v-card",{staticClass:"card",attrs:{elevation:"7"}},[r("v-textarea",{attrs:{placeholder:"Введите текст",clearable:"","clear-icon":"mdi-close-circle"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),""!=t.resp&&null!=t.resp?r("span",[t._v("Результат:")]):t._e(),r("br"),r("v-card-text",{domProps:{innerHTML:t._s(t.resp)}})],1),r("v-row",{attrs:{align:"center",justify:"space-around"}},[r("p",{staticClass:"counter"},[t._v("Ограничение по предложениям: "+t._s(t.countSent)+"/30000")])]),r("v-row",{attrs:{align:"center",justify:"space-around"}},[r("v-btn",{staticClass:"btn",attrs:{color:"primary",elevation:"7",large:""},on:{click:function(e){return t.sendText()}}},[t._v(" Action ")])],1)],1)],1)],1)},s=[],o=a("1da1"),i=(a("96cf"),a("1276"),a("ac1f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",{staticClass:"model"},[t._v("ML Models:")]),a("v-divider",{staticClass:"splitter"}),a("span",{staticClass:"model"},[t._v("TF")]),a("v-icon",{staticClass:"arrow",attrs:{large:""}},[t._v(" mdi-chevron-right ")]),a("v-divider",{staticClass:"splitter"}),a("span",{staticClass:"model"},[t._v("TF-IDF")]),a("v-icon",{staticClass:"arrow",attrs:{large:""}},[t._v(" mdi-chevron-right ")]),a("v-divider",{staticClass:"splitter"}),a("span",{staticClass:"model"},[t._v("LDA")]),a("v-icon",{staticClass:"arrow",attrs:{large:""}},[t._v(" mdi-chevron-right ")])],1)}),c=[],l={},u=l,p=(a("f91e"),a("2877")),d=a("6544"),v=a.n(d),f=a("ce7e"),m=a("132d"),h=Object(p["a"])(u,i,c,!1,null,null,null),b=h.exports;v()(h,{VDivider:f["a"],VIcon:m["a"]});var g=a("eea2"),x=a("bc3a"),w=a.n(x),_={components:{"nav-content":b,CountryFlag:g["a"]},data:function(){return{drawer:null,text:"",resp:"",items:["TF","TF-DF","LDA"],amount:10,model:"LDA",type:null}},computed:{countSent:function(){return""==this.text||null==this.text?0:this.text.split(".").length-1},alarm:function(){return this.countSent>=3e4}},methods:{sendText:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.alarm){e.next=4;break}alert("Введено слишком много предложений!"),e.next=9;break;case 4:return"TF"==t.model&&(t.type="Tf"),"TF-DF"==t.model&&(t.type="Tfidf"),"LDA"==t.model&&(t.type="Lda"),e.next=9,w()({method:"post",url:"http://localhost:8081/message",data:{id:1,input_text:t.text,sentence_count:t.amount,type:t.type}}).then((function(e){t.resp=e.data.output_text}));case 9:case"end":return e.stop()}}),e)})))()}}},y=_,C=(a("ae0f"),a("7496")),T=a("40dc"),j=a("5bc1"),V=a("8336"),O=a("b0af"),k=a("99d9"),S=a("62ad"),D=a("a523"),F=a("adda"),M=a("f6c4"),A=a("f774"),L=a("0fd9"),P=a("b974"),I=a("ba0d"),B=a("a844"),N=a("2a7f"),R=Object(p["a"])(y,n,s,!1,null,"47c78786",null),$=R.exports;v()(R,{VApp:C["a"],VAppBar:T["a"],VAppBarNavIcon:j["a"],VBtn:V["a"],VCard:O["a"],VCardText:k["a"],VCol:S["a"],VContainer:D["a"],VImg:F["a"],VMain:M["a"],VNavigationDrawer:A["a"],VRow:L["a"],VSelect:P["a"],VSlider:I["a"],VTextarea:B["a"],VToolbarTitle:N["a"]});var E=a("8c4f");r["a"].use(E["a"]);var J=[],z=new E["a"]({routes:J}),H=z,q=a("2f62");r["a"].use(q["a"]);var G=new q["a"].Store({state:{},mutations:{},actions:{},modules:{}}),K=a("f309");r["a"].use(K["a"]);var Q=new K["a"]({});r["a"].component("vue-country-flag",g["a"]),r["a"].config.productionTip=!1,new r["a"]({router:H,store:G,vuetify:Q,render:function(t){return t($)}}).$mount("#app")},"68a0":function(t,e,a){},ae0f:function(t,e,a){"use strict";a("f613")},f613:function(t,e,a){},f795:function(t,e,a){t.exports=a.p+"img/action.2d97fd43.png"},f91e:function(t,e,a){"use strict";a("68a0")}});
//# sourceMappingURL=app.a192189f.js.map