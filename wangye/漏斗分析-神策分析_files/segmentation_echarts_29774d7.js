sensorsdata.SegmentationChart=function(e){!$.isEmptyObject(e.segObj)&&$.isArray(e.segObj.rows)&&$.isArray(e.segObj.series)||e.container.html(sensorsdata.languages.get("无效的图形数据<!--{en}Invalid graphic data-->")),this.option_={container:null,queryData:{},segObj:{},compareSegObj:{},measureNames:[],measureUnits:[],widgetModel:!1},$.extend(!0,this.option_,e),this.isBy_=(this.option_.queryData.by_fields||[]).length>0,this.charts_=[],this.names_=[];var t=this.option_;this.segObj_=this.option_.segObj,this.compareSegObj_=this.option_.compareSegObj,this.isCompare_=!$.isEmptyObject(t.compareSegObj)&&$.isArray(t.compareSegObj.series)&&t.compareSegObj.series.length>0&&$.isArray(t.compareSegObj.rows)&&t.compareSegObj.rows.length>0;var a=sensorsdata.CONSTSET.shortDateFormat,s=sensorsdata.checkCrossTime(t.queryData.from_date,t.queryData.to_date).yearCross;this.isCompare_&&!s&&(s=sensorsdata.checkCrossTime(t.queryData.from_date,t.queryData.to_date,t.queryData.compare_from_date,t.queryData.to_date).yearCross),s===!0&&(a=sensorsdata.CONSTSET.dateFormat),this.rangeText_=this.buildRangeText_(t.queryData.from_date,t.queryData.to_date,a),this.isCompare_&&(this.compareRangeText_=this.buildRangeText_(t.queryData.compare_from_date,t.queryData.compare_to_date,a)),this.usedColor_={}},sensorsdata.SegmentationChart.prototype.normalize_=function(e,t){return t[0]>0?Math.round(e/t[1]*1e4)/100:e>=0?Math.round(e/t[1]*1e4)/100:-Math.round(e/t[0]*1e4)/100},sensorsdata.SegmentationChart.prototype.findColor_=function(e,t){var a=sensorsdata.CONSTSET.chartsColors;if(e[t])return e[t];for(var s=Object.keys(e),n=s.map(function(t){return e[t]}),r=0,i=a.length;i>r;r++)if(-1===n.indexOf(a[r]))return e[t]=a[r],a[r];return e[t]=a[(n.length+1)%a.length],a[(n.length+1)%a.length]},sensorsdata.SegmentationChart.prototype.buildRangeText_=function(e,t,a){var s=sensorsdata.CONSTSET,n=moment(e,s.dateFormat).format(a||s.shortDateFormat);return n+=s.dateRangeSplit,n+=moment(t,s.dateFormat).format(a||s.shortDateFormat)},sensorsdata.SegmentationChart.prototype.buildYAxis_=function(e,t){var a=this.option_,s=$.extend(!0,{},sensorsdata.echarts.option.yAxis,{scale:!!e,splitNumber:a.widgetModel?3:5,axisLabel:{formatter:function(e){return a.widgetModel===!0?sensorsdata.formatNumber(e,!0):sensorsdata.formatNumber(e,!0)+(t?"%":"")}}});return t&&(s.mix=0,s.max=100,s.interval=20,s.scale=!1,delete s.splitNumber),s},sensorsdata.SegmentationChart.prototype.filterRows_=function(e,t){var a={};t.filter(function(t,s){-1!==e.indexOf(t.name)&&(a[t.name]=s)});var s=[];return e.map(function(e){a[e]>=0&&s.push(t[a[e]])}),s},sensorsdata.SegmentationChart.prototype.resize=function(){$.isArray(this.charts_)&&this.charts_.map(function(e){$.isFunction(e.resize)&&e.resize()})},sensorsdata.SegmentationChart.prototype.destroyAll=function(){$.isArray(this.charts_)&&this.charts_.map(function(e){$.isFunction(e.dispose)&&e.dispose()}),this.charts_=[],this.option_.container.html(""),this.names_=[],this.measureIndexs_=[]},sensorsdata.SegmentationLineChart=function(e){sensorsdata.SegmentationChart.call(this,e),this.measureIndexs_=[],this.axisConfig={type:"single",left:[],right:[]}},sensorsdata.inherits(sensorsdata.SegmentationLineChart,sensorsdata.SegmentationChart),sensorsdata.SegmentationLineChart.prototype.show=function(e,t,a){if(this.destroyAll(),this.names_=$.isArray(e)?$.extend(!0,[],e):[],this.measureIndexs_=$.isArray(t)?$.extend(!0,[],t):[],0!==this.names_.length&&0!==this.measureIndexs_.length){a&&(this.axisConfig.isNormalize=a.isNormalize,this.axisConfig.left=$.isArray(a.left)?$.extend(!0,[],a.left):[],this.axisConfig.right=$.isArray(a.right)?$.extend(!0,[],a.right):[]),this.axisConfig.type="single";var s=this,n=this.option_,r=sensorsdata.echarts,i=echarts.init(n.container[0]);this.charts_.push(i);var o=this.axisConfig.isNormalize,m=sensorsdata.CONSTSET,d=this.segObj_.series,u=this.compareSegObj_.series,l=this.filterRows_(this.names_,this.segObj_.rows),h=function(e,t){var a=[e[0].data[0][t],e[0].data[0][t]];return e.map(function(e){e.data.map(function(e){e[t]>a[1]&&(a[1]=e[t]),e[t]<a[0]&&(a[0]=e[t])})}),a},f=[],c=n.queryData.unit;if(this.isCompare_)for(var p=null,g=null,x=0;x<d.length||x<u.length;x++){var _=moment(d[x],m.timeFormat),y=moment(u[x],m.timeFormat);_.isValid()||(_=p.add(1,c)),y.isValid()||(y=g.add(1,c)),f.push(sensorsdata.formatTime([_,y],c,!1,!1)),p=_,g=y}else f=d.map(function(e){return sensorsdata.formatTime(moment(e,m.timeFormat),c,!1,!1)});var C={show:!n.widgetModel,data:[]},v=[],b=n.widgetModel&&f.length<=10||!n.widgetModel&&f.length<=30,S=["solid","dashed","dotted"],w=[],I=n.widgetModel?6:9,O=n.widgetModel?1.4:1.6,A=n.queryData.measures.length>1;if(s.isCompare_){var N=this.filterRows_(this.names_,this.compareSegObj_.rows);n.queryData.measures.map(function(e,t){var a=0;if(-1!==s.measureIndexs_.indexOf(t)){-1!==s.axisConfig.right.indexOf(t)&&(a=1,s.axisConfig.type="double");var i=S[s.measureIndexs_.indexOf(t)],m=n.measureNames[t],f=n.measureUnits[t];v.push(s.buildYAxis_(!0,o));var p=o?h(l,t):[],g=o?h(N,t):[],x=function(e,t){var a=e.toLowerCase(),s=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;if(a&&s.test(a)){if(4===a.length){for(var n="#",r=1;4>r;r+=1)n+=a.slice(r,r+1).concat(a.slice(r,r+1));a=n}for(var i=[],o=1;7>o;o+=2)i.push(parseInt("0x"+a.slice(o,o+2)));return"RGBA("+i.join(",")+","+t+")"}return a};l.map(function(e,n){var l=s.findColor_(s.usedColor_,e.name),h=x(l,.4),_="";_=s.isBy_?A?sensorsdata.trimConstHtml(e.name)+"-"+m:sensorsdata.trimConstHtml(e.name):m,C.data.push({name:_,icon:r.createLineLegendIcon(i,l)}),w.push({name:_,type:"line",yAxisIndex:o?0:a,showAllSymbol:b,symbol:"circle",symbolSize:I,itemStyle:{normal:{color:l}},lineStyle:{normal:{type:i,color:l,width:O}},data:e.data.map(function(e,a){var n=o?s.normalize_(e[t],p):e[t];return{value:n,rawValue:e[t],itemStyle:{normal:{color:l}},measureName:m,measureUnit:f,xLabel:sensorsdata.formatTime(d[a],c,!0)}})}),w.push({name:_,type:"line",yAxisIndex:o?0:a,showAllSymbol:b,symbol:"circle",symbolSize:I,itemStyle:{normal:{color:h}},lineStyle:{normal:{type:i,color:h,width:O}},data:N[n].data.map(function(e,a){var n=o?s.normalize_(e[t],g):e[t];return{value:n,rawValue:e[t],itemStyle:{normal:{color:h}},measureName:m,measureUnit:f,xLabel:sensorsdata.formatTime(u[a],c,!0)}})})})}})}else n.queryData.measures.map(function(e,t){var a=0;if(-1!==s.measureIndexs_.indexOf(t)){-1!==s.axisConfig.right.indexOf(t)&&(a=1,s.axisConfig.type="double");var i=S[s.measureIndexs_.indexOf(t)],m=n.measureNames[t],u=n.measureUnits[t];v.push(s.buildYAxis_(!0,o));var f=o?h(l,t):[];l.map(function(e){var n=s.findColor_(s.usedColor_,e.name),l="";l=s.isBy_?A?sensorsdata.trimConstHtml(e.name)+"-"+m:sensorsdata.trimConstHtml(e.name):m,C.data.push({name:l,icon:r.createLineLegendIcon(i,n)}),w.push({name:l,type:"line",yAxisIndex:o?0:a,showAllSymbol:b,symbol:"circle",symbolSize:I,itemStyle:{normal:{color:n}},lineStyle:{normal:{type:i,color:n,width:O}},data:e.data.map(function(e,a){var r=o?s.normalize_(e[t],f):e[t];return{value:r,itemStyle:{normal:{color:n}},rawValue:e[t],measureName:m,measureUnit:u,xLabel:sensorsdata.formatTime(d[a],c,!0)}})})})}});var M={show:!1};if(!n.widgetModel){var T=d.length;this.isCompare_&&u.length>T&&(T=u.length);var j=r.sets.dataZoomNum;T>j&&(M.show=!0,M.start=0,M.end=100)}var D={trigger:"axis"};if(!(n.queryData.by_fields&&n.queryData.by_fields.length>=1&&n.queryData.measures&&1===n.queryData.measures.length)){var L=function(e){return e.data.xLabel+"</br>"+Mustache.escape(r.truncateLabel(e.seriesName,50))+"："+sensorsdata.formatNumber(e.data.rawValue)+" "+e.data.measureUnit};D.axisPointer={lineStyle:{width:0}},D.formatter=function(e){if($.isArray(e))for(var t=0,a=e.length;a>t;t++)if(e[t]&&e[t].data){e=e[t];break}return sensorsdata.echarts.wrapTriangleTooltip(L(e))},D.position=function(e,t,a){return r.lineTooltipPosition(i,e,t,a,L)}}n.widgetModel&&(D.axisPointer={lineStyle:{width:1,color:"#aaa"}},D.formatter=function(){return""},D.backgroundColor="rgba(50,50,50,0)",D.borderWidth=0,delete D.position);var q={tooltip:D,legend:C,dataZoom:M,xAxis:{data:f},series:w};if(n.widgetModel===!0&&(q.grid={bottom:0,left:10}),i.on("mouseover",function(e){i.dispatchAction({type:"highlight",seriesIndex:e.seriesIndex})}),i.on("mouseout",function(e){i.dispatchAction({type:"downplay",seriesIndex:e.seriesIndex})}),i.on("showtip",function(e){if($.isFunction(n.onPointChanged)){var t=i.getModel().getSeriesByIndex(e.seriesIndex).getData(),a=t.indexOfRawIndex(e.dataIndex);n.onPointChanged(a)}}),q=$.extend(!0,{},r.option,q),o)v=v.slice(0,1);else{var P=!1,z=!1;s.measureIndexs_.forEach(function(e){-1!==s.axisConfig.left.indexOf(e)&&(P=!0),-1!==s.axisConfig.right.indexOf(e)&&(z=!0)}),P&&z?(v=v.slice(0,2),v[1].splitLine.show=!1):!P&&z?(v=v.slice(-1),v[0].position="right",q.series.forEach(function(e){e.yAxisIndex=0})):v=v.slice(0,1)}q.yAxis=v,q.dataZoom.show&&(q.legend.bottom=40,q.grid.bottom=90),i.setOption(q)}},sensorsdata.SegmentationLineChart.prototype.add=function(e){return this.names_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.names_)},sensorsdata.SegmentationLineChart.prototype.remove=function(e){var t=this.names_.indexOf(e);return t>=0?(this.names_.splice(t,1),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.names_)):void 0},sensorsdata.SegmentationLineChart.prototype.addMeasure=function(e){return this.measureIndexs_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationLineChart.prototype.removeMeasure=function(e){var t=this.measureIndexs_.indexOf(e);return t>=0&&(this.measureIndexs_.splice(t,1),this.show(this.names_,this.measureIndexs_)),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationColumnChart=function(e){sensorsdata.SegmentationChart.call(this,e),this.axisConfig={type:"single",left:[],right:[]}},sensorsdata.inherits(sensorsdata.SegmentationColumnChart,sensorsdata.SegmentationChart),sensorsdata.SegmentationColumnChart.prototype.show=function(e,t,a){if(this.destroyAll(),this.names_=$.isArray(e)?$.extend(!0,[],e):[],this.measureIndexs_=$.isArray(t)?$.extend(!0,[],t):[],0!==this.names_.length&&0!==this.measureIndexs_.length){a&&(this.axisConfig.isNormalize=a.isNormalize,this.axisConfig.left=$.isArray(a.left)?$.extend(!0,[],a.left):[],this.axisConfig.right=$.isArray(a.right)?$.extend(!0,[],a.right):[],this.axisConfig.type=a.type?a.type:"single");var s=this,n=this.option_,r=sensorsdata.echarts,i=this.axisConfig.isNormalize,o=sensorsdata.CONSTSET,m=this.segObj_.series,d=this.compareSegObj_.series,u=function(e,t){for(var a=[],s=0,n=e[0].data.length;n>s;s++){var r=0;e.map(function(e){r+=e.data[s][t]}),(void 0===a[0]||r<a[0])&&(a[0]=r),(void 0===a[1]||r>a[1])&&(a[1]=r)}return a},l=this.filterRows_(this.names_,this.segObj_.rows),h={show:!n.widgetModel,data:l.map(function(e){return{name:sensorsdata.trimConstHtml(e.name)}})};if(!s.isBy_&&1!==s.measureIndexs_.length){var f=n.measureNames.filter(function(e,t){return s.measureIndexs_.indexOf(t)>=0});h.formatter=function(){return sensorsdata.languages.get("从左至右依次是<!--{en}From left to right-->")+f.join("、")},h.itemWidth=0}var c=[],p=n.queryData.unit;if(this.isCompare_)for(var g=null,x=null,_=0;_<m.length||_<d.length;_++){var y=moment(m[_],o.timeFormat),C=moment(d[_],o.timeFormat);y.isValid()||(y=g.add(1,p)),C.isValid()||(C=x.add(1,p)),c.push(sensorsdata.formatTime([y,C],p,!1,!1)),g=y,x=C}else c=m.map(function(e){return sensorsdata.formatTime(moment(e,o.timeFormat),p,!1,!1)});var v=[],b=[];if(s.isCompare_){var S=this.filterRows_(this.names_,this.compareSegObj_.rows);n.queryData.measures.map(function(e,t){var a=0;if(-1!==s.measureIndexs_.indexOf(t)){-1!==s.axisConfig.right.indexOf(t)&&(a=1,s.axisConfig.type="double");var r=n.measureNames[t],o=n.measureUnits[t];v.push(s.buildYAxis_(!1,i));var h=m.map(function(e,a){var s=0;return l.map(function(e){s+=e.data[a][t]}),s}),f=d.map(function(e,a){var s=0;return S.map(function(e){s+=e.data[a][t]}),s}),c=i?u(l,t):[],g=i?u(S,t):[];l.map(function(e,n){var u=sensorsdata.trimConstHtml(e.name),l=s.findColor_(s.usedColor_,e.name);b.push({name:u,type:"bar",barGap:"10%",barMaxWidth:"40%",yAxisIndex:i?0:a,itemStyle:{normal:{color:l}},stack:r,data:e.data.map(function(e,a){var n=e[t];if(i){var d=s.normalize_(h[a],c);n=Math.round(d*n/h[a]*100)/100}return{value:n,rawValue:e[t],itemStyle:{normal:{color:l}},measureName:r,measureUnit:o,xLabel:sensorsdata.formatTime(m[a],p,!1),totalValue:h[a]}})}),b.push({name:u,type:"bar",barGap:"10%",barMaxWidth:"40%",yAxisIndex:i?0:a,stack:r+"-compare",itemStyle:{normal:{opacity:.6,color:l}},data:S[n].data.map(function(e,a){var n=e[t];if(i){var m=s.normalize_(f[a],g);n=Math.round(m*n/f[a]*100)/100}return{value:n,rawValue:e[t],itemStyle:{normal:{color:l}},measureName:r,measureUnit:o,xLabel:sensorsdata.formatTime(d[a],p,!1),totalValue:f[a]}})})})}})}else n.queryData.measures.map(function(e,t){var a=0;if(-1!==s.measureIndexs_.indexOf(t)){-1!==s.axisConfig.right.indexOf(t)&&(a=1,s.axisConfig.type="double");var r=n.measureNames[t],o=n.measureUnits[t];v.push(s.buildYAxis_(!1,i));var d=m.map(function(e,a){var s=0;return l.map(function(e){s+=e.data[a][t]}),s}),h=i?u(l,t):[];l.map(function(e){var n=sensorsdata.trimConstHtml(e.name),u=s.findColor_(s.usedColor_,e.name);b.push({name:n,type:"bar",yAxisIndex:i?0:a,barGap:"10%",barMaxWidth:"40%",itemStyle:{normal:{color:u}},stack:r,data:e.data.map(function(e,a){var n=e[t];if(i){var l=s.normalize_(d[a],h);n=Math.round(l*n/d[a]*100)/100}return{value:n,rawValue:e[t],itemStyle:{normal:{color:u}},measureName:r,measureUnit:o,rawMeasureUnit:o,xLabel:sensorsdata.formatTime(m[a],p,!0),totalValue:d[a]}})})})}});var w={show:!1};if(!n.widgetModel){var I=c.length*n.queryData.measures.length*(this.isCompare_?2:1),O=r.sets.dataZoomNum;I>O&&(w.show=!0,w.start=0,w.end=100)}var A={formatter:function(e){$.isArray(e)&&(e=e[0]);var t=e.data.xLabel;return s.isBy_&&(t+="："+e.seriesName),t+="</br>"+e.data.measureName+"："+sensorsdata.formatNumber(e.data.rawValue)+e.data.measureUnit,s.isBy_&&(t+="</br>总数："+sensorsdata.formatNumber(e.data.totalValue)+e.data.measureUnit),t}};n.widgetModel&&(A.trigger="axis",A.axisPointer={lineStyle:{width:1,color:"#aaa"}},A.formatter=function(){return""},A.backgroundColor="rgba(50,50,50,0)",A.borderWidth=0);var N={tooltip:A,legend:h,dataZoom:w,xAxis:{data:c},series:b};n.widgetModel===!0&&(N.grid={bottom:0,left:10});var M=echarts.init(n.container[0]);if(M.on("showtip",function(e){if($.isFunction(n.onPointChanged)){var t=M.getModel().getSeriesByIndex(e.seriesIndex).getData(),a=t.indexOfRawIndex(e.dataIndex);n.onPointChanged(a)}}),N=$.extend(!0,{},r.option,N),i)v=v.slice(0,1);else{var T=!1,j=!1;s.measureIndexs_.forEach(function(e){-1!==s.axisConfig.left.indexOf(e)&&(T=!0),-1!==s.axisConfig.right.indexOf(e)&&(j=!0)}),T&&j?(v=v.slice(0,2),v[1].splitLine.show=!1):!T&&j?(v=v.slice(1,2),v[0].position="right",N.series.forEach(function(e){e.yAxisIndex=0})):v=v.slice(0,1)}N.yAxis=v,N.dataZoom.show&&(N.legend.bottom=40,N.grid.bottom=90),M.setOption(N),this.charts_.push(M)}},sensorsdata.SegmentationColumnChart.prototype.add=function(e){return this.names_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.names_)},sensorsdata.SegmentationColumnChart.prototype.remove=function(e){var t=this.names_.indexOf(e);return t>=0?(this.names_.splice(t,1),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.names_)):void 0},sensorsdata.SegmentationColumnChart.prototype.addMeasure=function(e){return this.measureIndexs_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationColumnChart.prototype.removeMeasure=function(e){return this.measureIndexs_.indexOf(e)>=0&&(this.measureIndexs_=this.measureIndexs_.filter(function(t){return t!==e}),this.show(this.names_,this.measureIndexs_)),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationPieChart=function(e){sensorsdata.SegmentationChart.call(this,e),this.tplPieContainer_=$("#tpl-segmentation-index-pie-container").html()},sensorsdata.inherits(sensorsdata.SegmentationPieChart,sensorsdata.SegmentationChart),sensorsdata.SegmentationPieChart.prototype.show=function(e,t){if(this.destroyAll(),this.names_=$.isArray(e)?$.extend(!0,[],e):[],this.measureIndexs_=$.isArray(t)?$.extend(!0,[],t):[],0!==this.names_.length&&0!==this.measureIndexs_.length){var a=this.option_,s=this,n=sensorsdata.languages.get("其它...<!--{en}Others...-->"),r=function(e,t,a){var r=e.map(function(e){return{name:sensorsdata.trimConstHtml(e.name),value:e.data[0][a],itemStyle:{normal:{color:s.findColor_(s.usedColor_,e.name)}}}});if(e.length<t.length){var i=0;t.map(function(e){i+=-1===s.names_.indexOf(e.name)&&$.isNumeric(e.data[0][a])?e.data[0][a]:0}),r.push({name:n,value:Math.round(100*i)/100,itemStyle:{normal:{color:s.findColor_(s.usedColor_,n)}}})}return r.sort(function(e,t){return t.value-e.value}),r},i=function(e,t){var a=[];return t.map(function(t){a[e.indexOf(t.name)]=t}),a},o=s.segObj_.rows.filter(function(e){return-1!==s.names_.indexOf(e.name)}),m=[];if(this.isCompare_){var d=s.compareSegObj_.rows.filter(function(e){return-1!==s.names_.indexOf(e.name)});a.queryData.measures.map(function(e,t){if(-1!==s.measureIndexs_.indexOf(t)){var n=s.rangeText_+sensorsdata.languages.get("的<!--{en} . -->")+a.measureNames[t],u=$(Mustache.render(s.tplPieContainer_,{label:n}));a.container.append(u);var l=r(o,s.segObj_.rows,t);0===m.length?m=l.map(function(e){return e.name}):l=i(m,l),s.renderChart_(u.find(".pie-content"),l,a.measureNames[t]),n=s.compareRangeText_+sensorsdata.languages.get("的<!--{en} . -->")+a.measureNames[t],u=$(Mustache.render(s.tplPieContainer_,{label:n})),a.container.append(u),l=r(d,s.compareSegObj_.rows,t),l=i(m,l),s.renderChart_(u.find(".pie-content"),l,a.measureNames[t])}})}else if(1===a.queryData.measures.length){var u=r(o,s.segObj_.rows,0);this.renderChart_(a.container,u,a.measureNames[0])}else a.queryData.measures.map(function(e,t){if(-1!==s.measureIndexs_.indexOf(t)){var n=$(Mustache.render(s.tplPieContainer_,{label:a.measureNames[t]}));a.container.append(n);var d=r(o,s.segObj_.rows,t);0===m.length?m=d.map(function(e){return e.name}):d=i(m,d),s.renderChart_(n.find(".pie-content"),d,a.measureNames[t])}})}},sensorsdata.SegmentationPieChart.prototype.add=function(e){return this.names_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.names_)},sensorsdata.SegmentationPieChart.prototype.remove=function(e){var t=this.names_.indexOf(e);return t>=0&&(this.names_.splice(t,1),this.show(this.names_,this.measureIndexs_)),$.extend(!0,[],this.names_)},sensorsdata.SegmentationPieChart.prototype.addMeasure=function(e){return this.measureIndexs_.push(e),this.show(this.names_,this.measureIndexs_),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationPieChart.prototype.removeMeasure=function(e){return this.measureIndexs_.indexOf(e)>=0&&(this.measureIndexs_=this.measureIndexs_.filter(function(t){return t!==e}),this.show(this.names_,this.measureIndexs_)),$.extend(!0,[],this.measureIndexs_)},sensorsdata.SegmentationPieChart.prototype.renderChart_=function(e,t,a){var s=this.option_,n=!0,r=sensorsdata.echarts;if(t.map(function(e){n=n&&0===e.value}),e.toggleClass("pie-zero-data",n),n===!0)return e;var i={tooltip:$.extend(!0,{},r.option.tooltip),series:[{name:a,type:"pie",selectedOffset:0,label:$.extend(!0,{},r.legendLabel),itemStyle:{emphasis:{shadowBlur:10,shadowColor:"rgba(0, 0, 0, 0.5)"}},radius:["31%","55%"],data:t}]};i.tooltip.show=!s.widgetModel,i.tooltip.formatter=function(e){return e.seriesName+"</br>"+r.truncateLabel(e.data.name,50)+"："+e.value+sensorsdata.languages.get("占<!--{en}take-->")+e.percent+"%"},i.series[0].label.normal.formatter=function(e){return r.truncateLabel(e.name,s.widgetModel?10:20)+"\n"+e.percent+"%"},s.widgetModel===!0&&(i.series[0].radius=["35%","60%"]);var o=echarts.init(e[0]);o.setOption(i),this.charts_.push(o)},sensorsdata.SegmentationStackChart=function(e){sensorsdata.SegmentationChart.call(this,e),this.measureIndexs_=[]},sensorsdata.inherits(sensorsdata.SegmentationStackChart,sensorsdata.SegmentationChart),sensorsdata.SegmentationStackChart.prototype.show=function(e,t){this.destroyAll(),this.measureIndexs_=$.isArray(t)?$.extend(!0,[],t):[];var a=this.option_;if(this.names_=$.isArray(e)?$.extend(!0,[],e):[],0!==this.names_.length){var s=this,n=sensorsdata.echarts,r=echarts.init(a.container[0]);this.charts_.push(r);var i=sensorsdata.CONSTSET,o=this.segObj_.series,m=this.filterRows_(this.names_,this.segObj_.rows),d=a.queryData.unit,u=o.map(function(e){return sensorsdata.formatTime(moment(e,i.timeFormat),d,!1,!1)}),l={show:!a.widgetModel,data:[]},h=[],f=a.widgetModel&&u.length<=10||!a.widgetModel&&u.length<=30,c=[],p=a.widgetModel?6:8;a.queryData.measures.map(function(e,t){var r=a.measureNames[t],i=a.measureUnits[t];h.push(s.buildYAxis_(!0,!1)),m.map(function(e){var a="";a=s.isBy_?sensorsdata.trimConstHtml(e.name):r;var m=s.findColor_(s.usedColor_,e.name);l.data.push({name:a,icon:n.createLineLegendIcon("solid",m)});var u=0;c.push({name:a,type:"line",showAllSymbol:f,symbol:"circle",symbolSize:p,stack:r,areaStyle:{normal:{opacity:.4}},itemStyle:{normal:{color:m}},lineStyle:{normal:{type:"solid",color:m}},data:e.data.map(function(e,a){var s=e[t]+u;return sensorsdata.isFloat(s)&&(s=sensorsdata.addNumber(e[t]+"",u+"")),u=s,{value:s,rawValue:e[t],measureName:r,measureUnit:i,xLabel:sensorsdata.formatTime(o[a],d,!0)}})})})});var g={show:!1},x={legend:l,dataZoom:g,xAxis:{boundaryGap:!0,data:u},series:c,tooltip:{textStyle:{fontWeight:"normal",fontSize:13},trigger:"axis",axisPointer:{type:"line",label:{show:!1}}}};a.widgetModel&&(x.tooltip.axisPointer={lineStyle:{width:1,color:"#aaa"}},x.tooltip.formatter=function(){return""},x.tooltip.backgroundColor="rgba(50,50,50,0)",x.tooltip.borderWidth=0,delete x.tooltip.position,x.grid={bottom:0,left:10}),r.on("mouseover",function(e){r.dispatchAction({type:"highlight",seriesIndex:e.seriesIndex})}),r.on("mouseout",function(e){r.dispatchAction({type:"downplay",seriesIndex:e.seriesIndex})}),r.on("showtip",function(e){if($.isFunction(a.onPointChanged)){var t=r.getModel().getSeriesByIndex(e.seriesIndex).getData(),s=t.indexOfRawIndex(e.dataIndex);a.onPointChanged(s)}}),x=$.extend(!0,{},n.option,x),r.setOption(x)}},sensorsdata.SegmentationStackChart.prototype.removeMeasure=function(e){var t=this.measureIndexs_.indexOf(e);return t>=0&&(this.measureIndexs_.splice(t,1),this.show(this.names_,this.measureIndexs_)),$.extend(!0,[],this.measureIndexs_)};