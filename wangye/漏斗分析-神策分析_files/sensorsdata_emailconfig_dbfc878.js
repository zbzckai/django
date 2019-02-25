sensorsdata.emailConfig=$.extend({},sensorsdata.EventsModule,{tplID:"#tpl-email-config-panel",init:function(){if(!this.isInit){this.isInit=!0;var s=this,e=this.form={},t=Mustache.render($(this.tplID).html(),this.currentConfig),n=this.$container=$(t).appendTo($("body")).delegate("[data-method]","click",function(e){e.preventDefault(),s.clickHandle($(this).attr("data-method"))});n.find("input").each(function(s,t){e[t.getAttribute("name")]=$(t)}),this.$ssl=n.find(".param-ssl")}},clickHandle:function(s){switch(s){case"ssl":this.sslToggle();break;case"guess":this.guess();break;case"save":this.save();break;case"close":this.hide()}},show:function(){if(this.isConfigLoaded)this.showPanel();else{var s=this;this.getConfig(function(){s.showPanel()})}},showPanel:function(){this.init(),this.$container.show()},hide:function(){this.$container.hide()},getConfig:function(s){function e(e){t.isLoading=!1,e&&e.length&&(t.isConfigLoaded=!0,t.currentConfig=e[0]),"function"==typeof s&&s(t.currentConfig)}if(!this.isLoading){this.isLoading=!0;var t=this;sensorsdata.ajax({url:sensorsdata.api.get("emailConfig"),isCommonError:!1,success:e,error:e})}},guess:function(){var s=this.form.from,e=s.val();return e?/^(\w-*\.*)+@(\w-?)+(\.\w+)+$/.test(e)?void sensorsdata.ajax({url:sensorsdata.api.get("guessSMTP",{email:e}),success:sensorsdata.bind(this.setSMTP,this)}):(s.addClass("error"),void sensorsdata.error.show(sensorsdata.languages.get("请填写正确的邮箱地址<!--{en}Please fill in the correct E-mail address-->"))):void s.addClass("error")},setSMTP:function(s){return s&&s.hostname?(this.form.hostname.val(s.hostname),this.form.port.val(s.port),void this.sslToggle(s.ssl)):void sensorsdata.error.show(sensorsdata.languages.get("探测失败，请自行输入<!--{en}Detection failed, please input-->"))},sslToggle:function(s){var e=this.$ssl;"undefined"==typeof s&&(s="true"===e.attr("data-state")?!1:!0),e.attr("data-state",s).find(".sa-switch")[s?"addClass":"removeClass"]("on"),this.form.ssl.val(s)},save:function(){var s=this,e=this.buildOptions(),t=this.validateOptions(e).error;return t?void sensorsdata.error.show(t):void sensorsdata.ajax({method:"POST",url:sensorsdata.api.get("emailConfig",this.currentConfig?{id:this.currentConfig.id}:{}),data:JSON.stringify(e),isCommonError:!1,isEncrypt:!0,success:function(){s.hide(),s.getConfig(function(){s.trigger("update",s.currentConfig)}),sensorsdata.success.show(sensorsdata.languages.get("邮箱设置成功<!--{en}E-mail setting success-->"))},error:sensorsdata.bind(this.errorHandle,this)})},buildOptions:function(){var s={},e=this.form;for(var t in e)e.hasOwnProperty(t)&&(s[t]=e[t].val());return s.username=s.from,s.port=Number(s.port),s.ssl="true"===s.ssl?!0:!1,s},validateOptions:function(s){for(var e=[{check:function(){return!!s.from},msg:sensorsdata.languages.get("请填写邮箱地址<!--{en}Please fill in the E-mail address-->")},{check:function(){return/^(\w-*\.*)+@(\w-?)+(\.\w+)+$/.test(s.from)},msg:sensorsdata.languages.get("请填写正确的邮箱地址<!--{en}Please fill in the correct E-mail address-->")},{check:function(){return!!s.password},msg:sensorsdata.languages.get("请填写邮箱密码<!--{en}Please input the E-mail password-->")},{check:function(){return!!s.hostname},msg:sensorsdata.languages.get("请填写邮箱SMTP地址<!--{en}Please input the mailbox SMTP address-->")},{check:function(){return!!s.port},msg:sensorsdata.languages.get("请填写邮箱SMTP端口<!--{en}Please input the mailbox port-->")},{check:function(){return/^\d{1,4}$/.test(s.port)},msg:sensorsdata.languages.get("请填写正确的SMTP端口<!--{en}Please input the correct SMTP port-->")}],t={},n=0,a=e.length;a>n;n++){var r=e[n];if(!r.check()){t.error=r.msg;break}}return t},errorHandle:function(s){s&&s.responseJSON&&s.responseJSON.error&&sensorsdata.error.show(s.responseJSON.error)}});