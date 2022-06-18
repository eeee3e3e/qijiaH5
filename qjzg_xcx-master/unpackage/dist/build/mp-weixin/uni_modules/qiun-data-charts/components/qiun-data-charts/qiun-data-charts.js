(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts"],{"0139":function(t,e,a){"use strict";var i=a("892c"),o=a.n(i);o.a},"23d2":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var i={qiunLoading:function(){return a.e("uni_modules/qiun-data-charts/components/qiun-loading/qiun-loading").then(a.bind(null,"948b"))},qiunError:function(){return a.e("uni_modules/qiun-data-charts/components/qiun-error/qiun-error").then(a.bind(null,"8934"))}},o=function(){var t=this,e=t.$createElement;t._self._c},n=[]},"3d03":function(t,e,a){"use strict";a.r(e);var i=a("23d2"),o=a("d7e7");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("0139");var r,s=a("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"401fc840",null,!1,i["a"],r);e["default"]=c.exports},4818:function(t,e,a){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(a("b8fe")),n=r(a("8fb0"));function r(t){return t&&t.__esModule?t:{default:t}}function s(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length,a=new Array(e>1?e-1:0),i=1;i<e;i++)a[i-1]=arguments[i];for(var o in a)for(var n in a[o])a[o].hasOwnProperty(n)&&(t[n]=a[o][n]&&"object"===typeof a[o][n]?s(Array.isArray(a[o][n])?[]:{},t[n],a[o][n]):a[o][n]);return t}function c(t,e){for(var a in t)null!==t[a]&&"object"===typeof t[a]?c(t[a],e):"format"===a&&"string"===typeof t[a]&&(t["formatter"]=e[t[a]]?e[t[a]]:void 0);return t}function l(t){var e="-",a=t.getFullYear(),i=t.getMonth()+1,o=t.getDate();i>=1&&i<=9&&(i="0"+i),o>=0&&o<=9&&(o="0"+o);var n=a+e+i+e+o;return n}var h=null;function u(t,e){var a=!1;return function(){var i=arguments,o=this;clearTimeout(a),a&&clearTimeout(a),a=setTimeout((function(){a=!1,t.apply(o,i)}),e)}}var d={name:"qiun-data-charts",mixins:[t.mixinDatacom],props:{type:{type:String,default:null},canvasId:{type:String,default:"uchartsid"},canvas2d:{type:Boolean,default:!1},background:{type:String,default:"none"},animation:{type:Boolean,default:!0},chartData:{type:Object,default:function(){return{categories:[],series:[]}}},opts:{type:Object,default:function(){return{}}},eopts:{type:Object,default:function(){return{}}},loadingType:{type:Number,default:2},errorShow:{type:Boolean,default:!0},errorReload:{type:Boolean,default:!0},errorMessage:{type:String,default:null},inScrollView:{type:Boolean,default:!1},reshow:{type:Boolean,default:!1},reload:{type:Boolean,default:!1},disableScroll:{type:Boolean,default:!1},ontap:{type:Boolean,default:!0},ontouch:{type:Boolean,default:!1},onmouse:{type:Boolean,default:!0},onmovetip:{type:Boolean,default:!1},echartsH5:{type:Boolean,default:!1},echartsApp:{type:Boolean,default:!1},tooltipShow:{type:Boolean,default:!0},tooltipFormat:{type:String,default:void 0},tooltipCustom:{type:Object,default:void 0},startDate:{type:String,default:void 0},endDate:{type:String,default:void 0},textEnum:{type:Array,default:function(){return[]}},groupEnum:{type:Array,default:function(){return[]}},pageScrollTop:{type:Number,default:0},directory:{type:String,default:"/"},tapLegend:{type:Boolean,default:!0}},data:function(){return{cid:"uchartsid",inWx:!1,inAli:!1,inTt:!1,inBd:!1,inH5:!1,inApp:!1,inWin:!1,type2d:!0,disScroll:!1,openmouse:!1,pixel:1,cWidth:375,cHeight:250,showchart:!1,echarts:!1,echartsResize:!1,uchartsOpts:{},echartsOpts:{},drawData:{},lastDrawTime:null}},created:function(){if(this.cid=this.canvasId,"uchartsid"==this.canvasId||""==this.canvasId){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",e=t.length,a="",o=0;o<32;o++)a+=t.charAt(Math.floor(Math.random()*e));this.cid=a}var n=i.getSystemInfoSync();"windows"!==n.platform&&"mac"!==n.platform||(this.inWin=!0),this.inWx=!0,!1===this.canvas2d||"windows"===n.platform||"mac"===n.platform?this.type2d=!1:(this.pixel=n.pixelRatio,"uchartsid"!==this.canvasId&&""!=this.canvasId||console.log("[uCharts]:开启canvas2d模式，必须指定canvasId，否则会出现偶尔获取不到dom节点的问题！")),this.disScroll=this.disableScroll},mounted:function(){var t=this;this.$nextTick((function(){t.beforeInit()}));var e=this.inH5?500:200,a=this;i.onWindowResize(u((function(t){if(1!=a.mixinDatacomLoading){var e=a.mixinDatacomErrorMessage;null!==e&&"null"!==e&&""!==e||(a.echarts?a.echartsResize=!a.echartsResize:a.resizeHandler())}}),e))},destroyed:function(){!0===this.echarts?(delete cfe.option[this.cid],delete cfe.instance[this.cid]):(delete n.default.option[this.cid],delete n.default.instance[this.cid]),i.offWindowResize((function(){}))},watch:{chartDataProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&(t.series&&t.series.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage=null)):(this.mixinDatacomLoading=!1,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：chartData数据类型错误")},immediate:!1,deep:!0},localdata:{handler:function(t,e){JSON.stringify(t)!==JSON.stringify(e)&&(t.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage=null))},immediate:!1,deep:!0},optsProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&!1===this.echarts&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this._clearChart(),this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：opts数据类型错误")},immediate:!1,deep:!0},eoptsProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&!0===this.echarts&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：eopts数据类型错误")},immediate:!1,deep:!0},reshow:function(t,e){var a=this;!0===t&&!1===this.mixinDatacomLoading&&setTimeout((function(){a.mixinDatacomErrorMessage=null,a.echartsResize=!a.echartsResize,a.checkData(a.drawData)}),200)},reload:function(t,e){!0===t&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())},mixinDatacomErrorMessage:function(t,e){t&&(this.emitMsg({name:"error",params:{type:"error",errorShow:this.errorShow,msg:t,id:this.cid}}),this.errorShow&&console.log("[秋云图表组件]"+t))},errorMessage:function(t,e){t&&this.errorShow&&null!==t&&"null"!==t&&""!==t?(this.showchart=!1,this.mixinDatacomLoading=!1,this.mixinDatacomErrorMessage=t):(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())}},computed:{optsProps:function(){return JSON.parse(JSON.stringify(this.opts))},eoptsProps:function(){return JSON.parse(JSON.stringify(this.eopts))},chartDataProps:function(){return JSON.parse(JSON.stringify(this.chartData))}},methods:{beforeInit:function(){this.mixinDatacomErrorMessage=null,"object"===typeof this.chartData&&null!=this.chartData&&void 0!==this.chartData.series&&this.chartData.series.length>0?(this.drawData=s({},this.chartData),this.mixinDatacomLoading=!1,this.showchart=!0,this.checkData(this.chartData)):this.localdata.length>0?(this.mixinDatacomLoading=!1,this.showchart=!0,this.localdataInit(this.localdata)):""!==this.collection?(this.mixinDatacomLoading=!1,this.getCloudData()):this.mixinDatacomLoading=!0},localdataInit:function(t){if(this.groupEnum.length>0)for(var e=0;e<t.length;e++)for(var a=0;a<this.groupEnum.length;a++)t[e].group===this.groupEnum[a].value&&(t[e].group=this.groupEnum[a].text);if(this.textEnum.length>0)for(var i=0;i<t.length;i++)for(var o=0;o<this.textEnum.length;o++)t[i].text===this.textEnum[o].value&&(t[i].text=this.textEnum[o].text);var r=!1,c={categories:[],series:[]},h=[],u=[];if(r=!0===this.echarts?cfe.categories.includes(this.type):n.default.categories.includes(this.type),!0===r){if(this.chartData&&this.chartData.categories&&this.chartData.categories.length>0)h=this.chartData.categories;else if(this.startDate&&this.endDate){var d=new Date(this.startDate),f=new Date(this.endDate);while(d<=f)h.push(l(d)),d=d.setDate(d.getDate()+1),d=new Date(d)}else{var p={};t.map((function(t,e){void 0==t.text||p[t.text]||(h.push(t.text),p[t.text]=!0)}))}c.categories=h}var m={};if(t.map((function(t,e){void 0==t.group||m[t.group]||(u.push({name:t.group,data:[]}),m[t.group]=!0)})),0==u.length)if(u=[{name:"默认分组",data:[]}],!0===r)for(var g=0;g<h.length;g++){for(var x=0,v=0;v<t.length;v++)t[v].text==h[g]&&(x=t[v].value);u[0].data.push(x)}else for(var D=0;D<t.length;D++)u[0].data.push({name:t[D].text,value:t[D].value});else for(var y=0;y<u.length;y++)if(h.length>0)for(var w=0;w<h.length;w++){for(var S=0,T=0;T<t.length;T++)u[y].name==t[T].group&&t[T].text==h[w]&&(S=t[T].value);u[y].data.push(S)}else for(var b=0;b<t.length;b++)u[y].name==t[b].group&&u[y].data.push(t[b].value);c.series=u,this.drawData=s({},c),this.checkData(c)},reloading:function(){!1!==this.errorReload&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,""!==this.collection?(this.mixinDatacomLoading=!1,this.onMixinDatacomPropsChange(!0)):this.beforeInit())},checkData:function(t){var e=this,a=this.cid;!0===this.echarts?(cfe.option[a]=s({},this.eopts),cfe.option[a].id=a,cfe.option[a].type=this.type):this.type&&n.default.type.includes(this.type)?(n.default.option[a]=s({},n.default[this.type],this.opts),n.default.option[a].canvasId=a):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：props参数中type类型不正确");var i=s({},t);void 0!==i.series&&i.series.length>0&&(this.mixinDatacomErrorMessage=null,!0===this.echarts?(cfe.option[a].chartData=i,this.$nextTick((function(){e.init()}))):(n.default.option[a].categories=i.categories,n.default.option[a].series=i.series,this.$nextTick((function(){e.init()}))))},resizeHandler:function(){var t=this,e=Date.now(),a=this.lastDrawTime?this.lastDrawTime:e-3e3,o=e-a;if(!(o<1e3))i.createSelectorQuery().in(this).select("#ChartBoxId"+this.cid).boundingClientRect((function(e){t.showchart=!0,e.width>0&&e.height>0&&(e.width===t.cWidth&&e.height===t.cHeight||t.checkData(t.drawData))})).exec()},getCloudData:function(){var t=this;1!=this.mixinDatacomLoading&&(this.mixinDatacomLoading=!0,this.mixinDatacomGet().then((function(e){t.mixinDatacomResData=e.result.data,t.localdataInit(t.mixinDatacomResData)})).catch((function(e){t.mixinDatacomLoading=!1,t.showchart=!1,t.mixinDatacomErrorMessage="请求错误："+e})))},onMixinDatacomPropsChange:function(t,e){1==t&&""!==this.collection&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this._clearChart(),this.getCloudData())},_clearChart:function(){var t=this.cid;if(!0!==this.echrts){var e=i.createCanvasContext(t,this);e.clearRect(0,0,this.cWidth,this.cHeight),e.draw()}},init:function(){var t=this,e=this.cid;i.createSelectorQuery().in(this).select("#ChartBoxId"+e).boundingClientRect((function(a){a.width>0&&a.height>0?(t.mixinDatacomLoading=!1,t.showchart=!0,t.lastDrawTime=Date.now(),t.cWidth=a.width,t.cHeight=a.height,!0!==t.echarts&&(n.default.option[e].background="none"==t.background?"#FFFFFF":t.background,n.default.option[e].canvas2d=t.type2d,n.default.option[e].pixelRatio=t.pixel,n.default.option[e].animation=t.animation,n.default.option[e].width=a.width*t.pixel,n.default.option[e].height=a.height*t.pixel,n.default.option[e].ontap=t.ontap,n.default.option[e].ontouch=t.ontouch,n.default.option[e].onmouse=t.openmouse,n.default.option[e].onmovetip=t.onmovetip,n.default.option[e].tooltipShow=t.tooltipShow,n.default.option[e].tooltipFormat=t.tooltipFormat,n.default.option[e].tooltipCustom=t.tooltipCustom,n.default.option[e].inScrollView=t.inScrollView,n.default.option[e].lastDrawTime=t.lastDrawTime,n.default.option[e].tapLegend=t.tapLegend),t.inH5||t.inApp?1==t.echarts?(cfe.option[e].ontap=t.ontap,cfe.option[e].onmouse=t.openmouse,cfe.option[e].tooltipShow=t.tooltipShow,cfe.option[e].tooltipFormat=t.tooltipFormat,cfe.option[e].tooltipCustom=t.tooltipCustom,cfe.option[e].lastDrawTime=t.lastDrawTime,t.echartsOpts=s({},cfe.option[e])):(n.default.option[e].rotateLock=n.default.option[e].rotate,t.uchartsOpts=s({},n.default.option[e])):(n.default.option[e]=c(n.default.option[e],n.default.formatter),t.mixinDatacomErrorMessage=null,t.mixinDatacomLoading=!1,t.showchart=!0,t.$nextTick((function(){if(!0===t.type2d){var o=i.createSelectorQuery().in(t);o.select("#"+e).fields({node:!0,size:!0}).exec((function(i){if(i[0]){var o=i[0].node,r=o.getContext("2d");n.default.option[e].context=r,o.width=a.width*t.pixel,o.height=a.height*t.pixel,o._width=a.width*t.pixel,o._height=a.height*t.pixel,n.default.option[e].rotateLock=n.default.option[e].rotate,n.default.instance[e]&&n.default.option[e]&&!0===n.default.option[e].update?t._updataUChart(e):setTimeout((function(){n.default.option[e].context.restore(),n.default.option[e].context.save(),t._newChart(e)}),100)}else t.showchart=!1,t.mixinDatacomErrorMessage="参数错误：开启2d模式后，未获取到dom节点，canvas-id:"+e}))}else t.inAli&&(n.default.option[e].rotateLock=n.default.option[e].rotate),n.default.option[e].context=i.createCanvasContext(e,t),n.default.instance[e]&&n.default.option[e]&&!0===n.default.option[e].update?t._updataUChart(e):setTimeout((function(){n.default.option[e].context.restore(),n.default.option[e].context.save(),t._newChart(e)}),100)})))):(t.mixinDatacomLoading=!1,t.showchart=!1,1==t.reshow&&(t.mixinDatacomErrorMessage="布局错误：未获取到父元素宽高尺寸！canvas-id:"+e))})).exec()},saveImage:function(){i.canvasToTempFilePath({canvasId:this.cid,success:function(t){i.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){i.showToast({title:"保存成功",duration:2e3})}})}},this)},_newChart:function(t){var e=this;1!=this.mixinDatacomLoading&&(this.showchart=!0,n.default.instance[t]=new o.default(n.default.option[t]),n.default.instance[t].addEventListener("renderComplete",(function(){e.emitMsg({name:"complete",params:{type:"complete",complete:!0,id:t}}),n.default.instance[t].delEventListener("renderComplete")})),n.default.instance[t].addEventListener("scrollLeft",(function(){e.emitMsg({name:"scrollLeft",params:{type:"scrollLeft",scrollLeft:!0,id:t}})})),n.default.instance[t].addEventListener("scrollRight",(function(){e.emitMsg({name:"scrollRight",params:{type:"scrollRight",scrollRight:!0,id:t}})})))},_updataUChart:function(t){n.default.instance[t].updateData(n.default.option[t])},_tooltipDefault:function(t,e,a,i){if(e){var o=t.data;return"object"===typeof t.data&&(o=t.data.value),e+" "+t.name+":"+o}return t.properties&&t.properties.name?t.properties.name:t.name+":"+t.data},_showTooltip:function(t){var e=this,a=this.cid,i=n.default.option[a].tooltipCustom;if(i&&void 0!==i&&null!==i){var o=void 0;i.x>=0&&i.y>=0&&(o={x:i.x,y:i.y+10}),n.default.instance[a].showToolTip(t,{index:i.index,offset:o,textList:i.textList,formatter:function(t,i,o,r){return"string"===typeof n.default.option[a].tooltipFormat&&n.default.formatter[n.default.option[a].tooltipFormat]?n.default.formatter[n.default.option[a].tooltipFormat](t,i,o,r):e._tooltipDefault(t,i,o,r)}})}else n.default.instance[a].showToolTip(t,{formatter:function(t,i,o,r){return"string"===typeof n.default.option[a].tooltipFormat&&n.default.formatter[n.default.option[a].tooltipFormat]?n.default.formatter[n.default.option[a].tooltipFormat](t,i,o,r):e._tooltipDefault(t,i,o,r)}})},_tap:function(t,e){var a=this,o=this.cid,r=null,s=null;if(!0===this.inScrollView||this.inAli)i.createSelectorQuery().in(this).select("#ChartBoxId"+o).boundingClientRect((function(i){t.changedTouches=[],a.inAli?t.changedTouches.unshift({x:t.detail.clientX-i.left,y:t.detail.clientY-i.top}):t.changedTouches.unshift({x:t.detail.x-i.left,y:t.detail.y-i.top-a.pageScrollTop}),e?!0===a.tooltipShow&&a._showTooltip(t):(r=n.default.instance[o].getCurrentDataIndex(t),s=n.default.instance[o].getLegendDataIndex(t),!0===a.tapLegend&&n.default.instance[o].touchLegend(t),!0===a.tooltipShow&&a._showTooltip(t),a.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x-i.left,y:t.detail.y-i.top},currentIndex:r,legendIndex:s,id:o,opts:n.default.instance[o].opts}}))})).exec();else e?!0===this.tooltipShow&&this._showTooltip(t):(t.changedTouches=[],t.changedTouches.unshift({x:t.detail.x-t.currentTarget.offsetLeft,y:t.detail.y-t.currentTarget.offsetTop}),r=n.default.instance[o].getCurrentDataIndex(t),s=n.default.instance[o].getLegendDataIndex(t),!0===this.tapLegend&&n.default.instance[o].touchLegend(t),!0===this.tooltipShow&&this._showTooltip(t),this.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x,y:t.detail.y-t.currentTarget.offsetTop},currentIndex:r,legendIndex:s,id:o,opts:n.default.instance[o].opts}}))},_touchStart:function(t){var e=this.cid;h=Date.now(),!0===n.default.option[e].enableScroll&&n.default.instance[e].scrollStart(t),this.emitMsg({name:"getTouchStart",params:{type:"touchStart",event:t.changedTouches[0],id:e}})},_touchMove:function(t){var e=this.cid,a=Date.now(),i=a-h;i<Math.floor(1e3/60)||(h=a,!0===n.default.option[e].enableScroll&&n.default.instance[e].scroll(t),this.emitMsg({name:"getTouchMove",params:{type:"touchMove",event:t.changedTouches[0],id:e}}),!0===this.ontap&&!1===n.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0))},_touchEnd:function(t){var e=this.cid;!0===n.default.option[e].enableScroll&&n.default.instance[e].scrollEnd(t),this.emitMsg({name:"getTouchEnd",params:{type:"touchEnd",event:t.changedTouches[0],id:e}}),!0===this.ontap&&!1===n.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0)},_error:function(t){this.mixinDatacomErrorMessage=t.detail.errMsg},emitMsg:function(t){this.$emit(t.name,t.params)},getRenderType:function(){!0===this.echarts&&!1===this.mixinDatacomLoading&&this.beforeInit()},toJSON:function(){return this}}};e.default=d}).call(this,a("a9ff")["default"],a("543d")["default"])},"892c":function(t,e,a){},d7e7:function(t,e,a){"use strict";a.r(e);var i=a("4818"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component',
    {
        'uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3d03"))
        })
    },
    [['uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts-create-component']]
]);
