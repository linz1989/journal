webpackJsonp([1,0],[function(t,i,s){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}var n=s(16),a=e(n),o=s(15),r=e(o),l=s(9),c=e(l),d=s(1);d.Global.init(),a.default.use(r.default),a.default.http.options.emulateJSON=!0,window._g=d.Global,a.default.http.interceptors.push(function(t,i){"get"===t.method.toLowerCase()&&(t.params._=+new Date),i(function(t){return t})}),new a.default({el:"#app",render:function(t){return t(c.default)}})},function(t,i){"use strict";i.Global={pageHeader:null,slideArrow:null,swiperArr:[],aniEles:[],app:null,swiper:null,baseWidth:null,winWidth:null,winHeight:null,winScale:1,userAgent:{isWX:!1,isiPhone:!1},init:function(){var t=navigator.userAgent.toLowerCase(),i=this,s=i.userAgent;s.isWX=/micromessenger/.test(t),s.isiPhone=/iPhone/i.test(t)},setDocumentTitle:function(t){var i=this,s=document,e=null,n=i.userAgent;document.title=t,(n.isWX||n.isiPhone)&&(e=s.createElement("iframe"),e.style.display="none",e.onload=function(){e.onload=null,setTimeout(function(){s.body.removeChild(e)},0)},e.src="",s.body.appendChild(e))},resizeWin:function(){var t=this,i=window,s=document,e=s.documentElement;t.baseWidth||(t.baseWidth=s.body.clientWidth||320),t.winWidth=e.clientWidth||i.innerWidth||s.body.clientWidth,t.winHeight=e.clientHeight||i.innerHeight,t.winWidth=t.winWidth>600?600:t.winWidth<320?320:t.winWidth,t.winScale=t.winWidth/t.baseWidth,e.style.fontSize=16*t.winScale+"px"}}},,function(t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"swiper-slide",ready:function(){this.update()},mounted:function(){this.update()},updated:function(){this.update()},attached:function(){this.update()},methods:{update:function(){this.$parent&&this.$parent.swiper&&this.$parent.swiper.update(!0)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s(2);s(6),i.default={name:"swiper",props:{options:{type:Object,default:function(){return{autoplay:3500}}}},ready:function(){this.swiper||(this.swiper=new e(this.$el,this.options))},mounted:function(){this.swiper||(this.swiper=new e(this.$el,this.options))},updated:function(){this.swiper.update()},beforeDestroy:function(){this.swiper&&(this.swiper=null,delete this.swiper)}}},function(t,i,s){"use strict";var e=s(8),n=s(1);t.exports={components:{swiper:e.swiper,"swiper-slide":e.swiperSlide},data:function(){return{techPics:[1,2,3,4],loading:!0,swiperOption:{direction:"vertical",observeParents:!0,onInit:function(t){var i=n.Global;if(i.app&&!i.app.loading)i.swiper=t,i.app.init();else var s=setInterval(function(){i.app&&!i.app.loading&&(clearInterval(s),i.swiper=t,i.app.init())},100)},onSlideChangeEnd:function(t){console.log("swiper change end..."+t.activeIndex+"---"+t.previousIndex);var i,s,e=n.Global,a=t.activeIndex,o=t.previousIndex,r=e.pageHeader.classList,l=e.slideArrow.classList,c=e.swiperArr,d=e.aniEles,h=0,u=document.body;0===a?(r.remove("common"),u.style.backgroundPositionY="0%"):(r.add("common"),u.style.backgroundPositionY="100%"),0===c.length&&(c=document.querySelectorAll("div.page-content>div.swiper-wrapper>div.swiper-slide")),i=c[a],d[a]||(d[a]=i.querySelectorAll(".ani"));var p=d[a];if(c[o]&&(d[o]||(d[o]=c[o].querySelectorAll(".ani")),s=d[o]),s&&s.length>0)for(h=0;h<s.length;h++)s[h].classList.add("endAni"),s[h].classList.remove("act");if(p&&p.length>0&&!p[0].classList.contains("act")){for(h=0;h<p.length;h++)p[h].classList.add("act");i.classList.contains("one-yuan")&&(console.log("one-yuan-count width"),document.querySelector("#one-yuan-count").style.width="60%")}t.isEnd?l.remove("act"):l.add("act")}},picSwiperOption:{effect:"coverflow",slidesPerView:2,centeredSlides:!0,observeParents:!0,loop:!0,coverflow:{rotate:30,stretch:15,depth:60,modifier:2,slideShadows:!0},onInit:function(t){setTimeout(function(){t.reLoop(),t.slideNext(null,0)},500)}}}},created:function(){window.addEventListener("resize",function(){n.Global.resizeWin()}),n.Global.resizeWin()},mounted:function(){var t=this,i=n.Global;t.$nextTick(function(){var s=0,e=new Image;e.onload=function(){s++,2===s&&(console.log(s),t.loading=!1)},e.src="./images/01.jpg",setTimeout(function(){t.loading=!1},2e3),i.app=t,i.pageHeader=t.$refs.pageHeader,i.slideArrow=t.$refs.slideArrow,t.drawCanvas()})},methods:{init:function(){document.body.style.backgroundImage="url(./images/01.jpg)";var t=n.Global;t.swiperArr=document.querySelectorAll("div.page-content>div.swiper-wrapper>div.swiper-slide");var i=t.swiperArr[0].querySelectorAll(".ani");t.aniEles[0]=i;for(var s=0;s<i.length;s++)i[s].classList.add("act");t.pageHeader.classList.add("act"),setTimeout(function(){t.slideArrow.classList.add("act"),document.querySelector("#bg").classList.add("act")},4500);var e=t.winHeight/(16*t.winScale);if(e>28.889){var a=e-28.889;a>.9&&(a=.9),document.querySelector("div.common-slide.service-item>div.wrap>div.info-wrap").style.marginTop=a+"rem"}},drawCanvas:function(){var t=this,i=t.$refs.bigCircle.getContext("2d"),s=Math.PI/180,e=232,n=232,a=224;i.strokeStyle="#00f1cf",i.lineCap="round",i.lineWidth=6,i.arc(e,n,a,138*s,278*s),i.moveTo(e+Math.cos(286*s)*a,n+Math.sin(286*s)*a),i.arc(e,n,a,286*s,290*s),i.moveTo(e+Math.cos(293*s)*a,n+Math.sin(293*s)*a),i.arc(e,n,a,293*s,120*s),i.moveTo(e+Math.cos(126*s)*a,n+Math.sin(126*s)*a),i.arc(e,n,a,126*s,134*s),i.stroke();var o=t.$refs.lineTop.getContext("2d");o.strokeStyle="#00f1cf",o.lineCap="round",o.lineWidth=6,o.moveTo(9,66),o.lineTo(62,20),o.moveTo(6,100),o.lineTo(57,54),o.moveTo(68,45),o.lineTo(74,40),o.moveTo(68,81),o.lineTo(153,5),o.stroke();var r=t.$refs.lineBottom.getContext("2d");r.strokeStyle="#00f1cf",r.lineCap="round",r.lineWidth=6,r.moveTo(4,67),r.lineTo(75,4),r.moveTo(52,68),r.lineTo(56,64),r.moveTo(62,56),r.lineTo(108,13),r.stroke();var l=t.$refs.titleText.getContext("2d"),c="限时优惠大抢购";l.fillStyle="#ffe90a",l.textAlign="center",l.textBaseline="middle",l.strokeStyle="#5616a3",l.lineWidth=18,l.lineCap="round",l.lineJoin="round",l.font="normal 80px 微软雅黑",l.strokeText(c,293,100),l.fillText(c,293,100)},doHandlerTransitionEnd:function(t){var i=t.target,s=i.classList;s.contains("endAni")&&s.remove("endAni")}}}},function(t,i){},function(t,i){},,function(t,i,s){var e,n;s(7),e=s(5);var a=s(13);n=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(n=e=e.default),"function"==typeof n&&(n=n.options),n.render=a.render,n.staticRenderFns=a.staticRenderFns,t.exports=e},function(t,i,s){var e,n;e=s(3);var a=s(14);n=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(n=e=e.default),"function"==typeof n&&(n=n.options),n.render=a.render,n.staticRenderFns=a.staticRenderFns,t.exports=e},function(t,i,s){var e,n;e=s(4);var a=s(12);n=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(n=e=e.default),"function"==typeof n&&(n=n.options),n.render=a.render,n.staticRenderFns=a.staticRenderFns,t.exports=e},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"swiper-container"},[_t("parallax-bg")," ",_h("div",{staticClass:"swiper-wrapper"},[_t("default")])," ",_t("pagination")," ",_t("button-prev")," ",_t("button-next")," ",_t("scrollbar")])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"journal-page",on:{transitionend:function(t){doHandlerTransitionEnd(t)}}},[_h("div",{directives:[{name:"show",rawName:"v-show",value:loading,expression:"loading"}],staticClass:"spinner"},[_m(0)," ",_m(1)," ",_m(2)])," ",_h("header",{directives:[{name:"show",rawName:"v-show",value:!loading,expression:"!loading"}],ref:"pageHeader",staticClass:"page-header"},[_m(3)," ",_m(4)," ",_m(5)])," ",_h("swiper",{directives:[{name:"show",rawName:"v-show",value:!loading,expression:"!loading"}],staticClass:"page-content",attrs:{options:swiperOption}},[_h("swiper-slide",{staticClass:"index-slide"},[_h("div",{staticClass:"center-circle ani"},[_h("canvas",{ref:"bigCircle",attrs:{width:"464",height:"464"}})," ",_h("canvas",{ref:"lineTop",staticClass:"line-top ani",attrs:{width:"162",height:"107"}})," ",_h("canvas",{ref:"lineBottom",staticClass:"line-bottom ani",attrs:{width:"114",height:"74"}})," ",_m(6)," ",_m(7)," ",_m(8)])," ",_h("div",{staticClass:"text"},[_h("canvas",{ref:"titleText",staticClass:"ani",attrs:{width:"586",height:"200"}})," ",_m(9)])])," ",_h("swiper-slide",{staticClass:"new-tech-slide common-slide"},[_m(10)," ",_m(11)])," ",_h("swiper-slide",{staticClass:"service-item-slide common-slide"},[_m(12)," ",_m(13)])," ",_h("swiper-slide",{staticClass:"tech-list-slide common-slide"},[_m(14)," ",_m(15)])," ",_h("swiper-slide",{staticClass:"common-slide tech-pics-slide"},[_h("div",{staticClass:"wrap"},[_m(16)," ",_h("swiper",{staticClass:"pic-wrap scale-ani ani",attrs:{options:picSwiperOption}},[_l(techPics,function(t){return _h("swiper-slide",[_h("div",{class:"pic-item-"+t})])})])])," ",_m(17)])," ",_h("swiper-slide",{staticClass:"common-slide video-slide"},[_m(18)," ",_m(19)])," ",_h("swiper-slide",{staticClass:"act-slide common-slide service-item"},[_m(20)," ",_m(21)])," ",_h("swiper-slide",{staticClass:"act-slide common-slide one-yuan"},[_m(22)," ",_m(23)])," ",_h("swiper-slide",{staticClass:"act-slide common-slide coupon"},[_m(24)," ",_m(25)])," ",_h("swiper-slide",{staticClass:"health-slide common-slide"},[_m(26)," ",_m(27)," ",_m(28)," ",_m(29)])])," ",_h("div",{directives:[{name:"show",rawName:"v-show",value:!loading,expression:"!loading"}],ref:"slideArrow",staticClass:"slide-arrow"})])},staticRenderFns:[function(){with(this)return _h("div",{staticClass:"spinner-container container1"},[_h("div",{staticClass:"circle1"})," ",_h("div",{staticClass:"circle2"})," ",_h("div",{staticClass:"circle3"})," ",_h("div",{staticClass:"circle4"})])},function(){with(this)return _h("div",{staticClass:"spinner-container container2"},[_h("div",{staticClass:"circle1"})," ",_h("div",{staticClass:"circle2"})," ",_h("div",{staticClass:"circle3"})," ",_h("div",{staticClass:"circle4"})])},function(){with(this)return _h("div",{staticClass:"spinner-container container3"},[_h("div",{staticClass:"circle1"})," ",_h("div",{staticClass:"circle2"})," ",_h("div",{staticClass:"circle3"})," ",_h("div",{staticClass:"circle4"})])},function(){with(this)return _h("div",{staticClass:"logo"})},function(){with(this)return _h("div",{staticClass:"info"},[_h("div",{staticClass:"title"},["皇朝休闲会所"])," ",_h("div",{staticClass:"static"},[_h("div",{staticClass:"view"},["2201"])," ",_h("div",{staticClass:"like"},["4545"])])])},function(){with(this)return _h("div",{staticClass:"right-arrow"})},function(){with(this)return _h("div",{staticClass:"circle small ani"})},function(){with(this)return _h("div",{staticClass:"circle mid ani"})},function(){with(this)return _h("div",{staticClass:"circle big ani"})},function(){with(this)return _h("div",{staticClass:"ani"},["这是活动标题，活动标题一"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap tech-info opacity-ani ani"},[_h("div",{staticClass:"tech-header ani"},[_h("div")])," ",_h("div",{staticClass:"shadow-btn chat-btn ani"})," ",_h("div",{staticClass:"name-wrap ani"},[_h("div",{staticClass:"tech-name"},["黄晶晶 [ 6号 ]"])," ",_h("div",{staticClass:"tip"},["最好的服务都在我这里啦！"])," ",_h("div",{staticClass:"service-list"},[_h("div",{staticClass:"item-btn left"},["足浴项目"]),_h("div",{staticClass:"item-btn left"},["中医推拿"]),_h("div",{staticClass:"item-btn left"},["美容理疗"])])])])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap service left ani"},[_h("div",{staticClass:"service-img ani"})," ",_h("div",{staticClass:"text-wrap ani"},[_h("div",["面部SPA"])," ",_h("div",[_h("strong",["98元"]),"/60分钟"])," ",_h("div",["最好的服务都在我这里啦最好的服务都在我这里啦"])])])," ",_h("div",{staticClass:"info-wrap service right ani"},[_h("div",{staticClass:"service-img ani"})," ",_h("div",{staticClass:"text-wrap ani"},[_h("div",["面部SPA2"])," ",_h("div",[_h("strong",["98元"]),"/60分钟"])," ",_h("div",["最好的服务都在我这里啦最好的服务都在我这里啦"])])])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap tech t1 ani"},[_h("div",{staticClass:"ani"})," ",_h("div",["张得好[66号]"])," ",_h("div",["擅长最专业的泰式按摩"])," ",_h("div",["客人印象:",_h("span",["#美白"]),_h("span",["#美白"]),_h("span",["#美白"])])," ",_h("div",{staticClass:"item-btn right ani"},["足浴项目"])])," ",_h("div",{staticClass:"info-wrap tech t2 ani"},[_h("div",{staticClass:"ani"})," ",_h("div",["张得好[66号]"])," ",_h("div",["擅长最专业的泰式按摩"])," ",_h("div",["客人印象:",_h("span",["#美白"]),_h("span",["#美白"]),_h("span",["#美白"])])," ",_h("div",{staticClass:"item-btn right ani"},["足浴项目"])])," ",_h("div",{staticClass:"info-wrap tech t3 ani"},[_h("div",{staticClass:"ani"})," ",_h("div",["张得好[66号]"])," ",_h("div",["擅长最专业的泰式按摩"])," ",_h("div",["客人印象:",_h("span",["#美白"]),_h("span",["#美白"]),_h("span",["#美白"])])," ",_h("div",{staticClass:"item-btn right ani"},["足浴项目"])])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"page-title ani"})},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap scale-ani ani"},[_h("video",{staticClass:"video-js vjs-default-skin",attrs:{controls:"",preload:"meta",width:"100%",height:"100%","data-setup":"{}"}},[_h("source",{attrs:{src:"http://vjs.zencdn.net/v/oceans.mp4",type:"video/mp4"}})," ",_h("source",{attrs:{src:"http://vjs.zencdn.net/v/oceans.webm",type:"video/webm"}})," ",_h("source",{attrs:{src:"http://vjs.zencdn.net/v/oceans.ogv",type:"video/ogg"}})])])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap opacity-ani ani"},[_h("div",{staticClass:"ani"})," ",_h("div",{staticClass:"text-wrap ani"},[_h("div",["花样泰式按摩"])," ",_h("div",[_h("strong",["155"]),_h("span",["元"]),"（或",_h("b",["1000"]),"积分）"])," ",_h("div",["原价：300元"])," ",_h("div",["距结束：",_h("b",["11"]),"时",_h("b",["05"]),"分",_h("b",["21"]),"秒",_h("span",["剩余22份"])])])," ",_h("div",{staticClass:"shadow-btn grab-btn ani"})])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap opacity-ani ani"},[_h("div",{staticClass:"ani"})," ",_h("div",{staticClass:"text-wrap ani"},[_h("div",[_h("b",["泰式按摩"]),"(第二期)"])," ",_h("div",[_h("div",{staticClass:"ani",attrs:{id:"one-yuan-count"}})])," ",_h("div",["已抢：",_h("span",["247/500"])])])," ",_h("div",{staticClass:"shadow-btn grab-btn ani"})])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap scale-ani ani"},[_h("div",{staticClass:"coupon ani"},[_h("div",["泰式按摩券",_h("span",["现金券"])])," ",_h("div",[_h("b",["￥"]),_h("strong",["500"]),"满500元可用"])," ",_h("div",["有效时间：客人购买后60天有效"])])," ",_h("div",{staticClass:"shadow-btn grab-btn ani"})])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"wrap"},[_h("div",{staticClass:"page-title ani"})," ",_h("div",{staticClass:"info-wrap ani"},[_h("h3",["标题一"])," ",_h("p",["本活动需要支付，最低元起，每支付块钱获得需要支付。"])," ",_h("h3",["标题二"])," ",_h("p",["本活动需要支付，最低元起，每支付块钱获得需要支付。"])])])},function(){with(this)return _h("div",{staticClass:"bottom-btn like-btn ani"},["很赞"])},function(){with(this)return _h("div",{staticClass:"bottom-btn share-btn ani"},["分享"])},function(){with(this)return _h("div",{staticClass:"over-tip"},["—更多精彩去网上会所看看—"])}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"swiper-slide"},[_t("default")])},staticRenderFns:[]}}]);