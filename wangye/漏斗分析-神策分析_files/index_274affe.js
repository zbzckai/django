window.sensorsdata=window.sensorsdata||{},function(){var e={getXPathFromElement:function(t){if(t.id)return'id("'+t.id+'")';if(t===document.body)return t.tagName;var n=t.parentNode&&t.parentNode.childNodes;if(!n)return"DETACHED";for(var r=1,o=0,a=n.length;a>o;o++){var i=n[o];if(i===t){var s=t.getAttribute("class");return e.getXPathFromElement(t.parentNode)+"/"+t.tagName+"["+r+"]"+(s?'[@class="'+s+'"]':"")}1===i.nodeType&&i.tagName===t.tagName&&r++}},cloneDeep:function(t,n){if(t===n||typeof t!=typeof n||t instanceof Array&&!(n instanceof Array)||!(t instanceof Array)&&n instanceof Array)return t;var r,o,a,i;for(var s in n)r=t[s],a=n[s],r!==a&&((i=a instanceof Array)||"object"==typeof a?(o=i?r&&r instanceof Array?r:[]:r&&"object"==typeof r?r:{},t[s]=e.cloneDeep(o,a)):t[s]=a);return t}},t={},n={deviceInfo:[{key:"userAgent",value:navigator.userAgent},{key:"platform",value:navigator.platform}],localStrong:[],cookie:[],urls:[],http:[],xpaths:[],errors:[],customs:[],htmls:[],environment:null},r={lastURL:"",lastClickURLPath:"",lastHTTPFormURL:{},lastHTTPReferrer:""},o={saveLocalStrong:function(){var e=[];for(var r in localStorage)localStorage.hasOwnProperty(r)&&e.push({key:r,value:localStorage[r]});n.localStrong=this.filter(e,t.localStrong)},saveCookie:function(){var e=[],r=document.cookie.split("; ");r.forEach(function(t){var n=t.split("=");e.push({key:n[0],value:n[1]})}),n.cookie=this.filter(e,t.cookie)},filter:function(e,t){if(t)if(t.include){var n=t.include;if("function"==typeof n)return e.filter(function(e){return n(e.key)});if(n instanceof Array)return e.filter(function(e){return n.indexOf(e.key)>-1})}else if(t.except){var r=t.except;if("function"==typeof r)return e.filter(function(e){return!r(e.key)});if(r instanceof Array)return e.filter(function(e){return-1===r.indexOf(e.key)})}return e},saveCurrentURL:function(){location.href!==r.lastURL&&(r.lastURL=location.href,n.urls.push({time:Date.now(),url:location.pathname+location.search+location.hash}))},saveHTTP:function(e,o){if((e.request&&e.request.url&&e.response||e&&o&&o.url)&&this.validateHTTP(e.request&&e.request.url||o.url)){t.http.cross||location.pathname===r.lastHTTPReferrer||(n.http.length=0,r.lastHTTPReferrer=location.pathname),n.http.length===t.http.max&&n.http.shift();var a=this.buildHTTP(e,o),i=a.request.url;r.lastHTTPFormURL[i]&&a.response.responseText&&(r.lastHTTPFormURL[i].response.responseText="profiling-delete"),r.lastHTTPFormURL[i]=a,n.http.push(a)}},validateHTTP:function(e){var n=t.http.include,r=t.http.except;if(n){if("function"==typeof n&&!n(e)||n instanceof Array&&-1===n.indexOf(e))return!1}else if("function"==typeof r&&r(e)||r instanceof Array&&r.indexOf(e)>-1)return!1;return!0},buildHTTP:function(t,n){var r=t.request||n,o=t.response||t;return{time:Date.now(),request:{url:r.url,type:r.type||r.method||"get",headers:e.cloneDeep({},r.headers),data:r.data},response:{status:o.status,statusText:o.statusText,responseText:o.responseText}}},saveClickNode:function(e){location.pathname!==r.lastClickURLPath&&(n.xpaths.length=0,r.lastClickURLPath=location.pathname),t.xpath.max===n.xpaths.length&&n.xpaths.shift(),n.xpaths.push({time:Date.now(),node:e})},buildClickNodeXPath:function(){n.xpaths.length&&n.xpaths.forEach(function(t){1===t.node.nodeType&&(t.node=e.getXPathFromElement(t.node))})},saveError:function(e){e&&e.filename&&e.message&&n.errors.push({time:Date.now(),filename:e.filename,message:e.message,lineno:e.lineno,colno:e.colno})},saveCustomData:function(e){e&&"string"==typeof e.key&&void 0!==e.value&&n.customs.push({time:Date.now(),key:e.key,value:e.value})},saveHTML:function(){if(t.htmls){var e=n.htmls;t.htmls.forEach(function(t){var n=$(t);n.length&&e.push({selector:t,html:n.html()})})}},saveEnvironment:function(){if("function"==typeof t.getEnvironment){var e=t.getEnvironment();void 0!==e&&(n.environment=e)}},clean:function(){var e="";for(e in n)n.hasOwnProperty(e)&&(n[e]instanceof Array?n[e].length=0:n[e]=n[e]instanceof Object?{}:null);for(e in r)n.hasOwnProperty(e)&&(status[e]=status[e]instanceof Object?{}:"")},buildLog:function(){this.saveLocalStrong(),this.saveCookie(),this.buildClickNodeXPath(),this.saveHTML(),this.saveEnvironment()},garbage:function(){n.localStrong.length=n.cookie.length=n.htmls.length=0,n.environment=null},getLog:function(){this.buildLog();var e=JSON.stringify(n);return this.garbage(),e}},a=null,i=function(e){o.saveClickNode(e.target)},s=function(e){o.saveError(e)},c=!1,l={config:function(n){t=e.cloneDeep({http:{max:15,cross:!1},xpath:{max:10}},n)},run:function(){c||(c=!0,a=setInterval(function(){o.saveCurrentURL()},1e3),document.body.addEventListener&&(document.body.addEventListener("click",i,!1),window.addEventListener("error",s,!1)))},stop:function(){c&&(c=!1,clearInterval(a),document.body.removeEventListener&&(document.body.removeEventListener("click",i),window.removeEventListener("error",s)),o.clean())},reset:function(){this.stop(),this.run()},pushHTTP:function(e,t){c&&o.saveHTTP(e,t)},pushData:function(e){c&&o.saveCustomData(e)},get:function(){return o.getLog()}};sensorsdata.profiling=l}(),function(){sensorsdata.profiling.config({cookie:{except:function(e){return/token|^_ga|^_gid|^Hm_/.test(e)}},htmls:["#report-ops",".sa-report .segmentation-chart > header",".sa-report .funnel-ops",".sa-report .funnel-container > header","#retention-report-ops",".sa-report .retention-chart > header"],getEnvironment:function(){if(sensorsdata.cache){var e=sensorsdata.cache,t={};return["config","project","events","userPropertiesMap","eventPropertiesMap","sessions","partitions","licenseItems"].forEach(function(n){void 0!==e[n]&&(t[n]=e[n])}),t}}}),sensorsdata.profiling.run()}();