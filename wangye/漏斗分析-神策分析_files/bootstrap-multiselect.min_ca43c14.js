!function(b){if(typeof ko!=="undefined"&&ko.bindingHandlers&&!ko.bindingHandlers.multiselect){ko.bindingHandlers.multiselect={after:["options","value","selectedOptions"],init:function(f,i,h,k,g){var l=b(f);var d=ko.toJS(i());l.multiselect(d);if(h.has("options")){var m=h.get("options");if(ko.isObservable(m)){ko.computed({read:function(){m();setTimeout(function(){var n=l.data("multiselect");if(n){n.updateOriginalOptions()}l.multiselect("rebuild")},1)},disposeWhenNodeIsRemoved:f})}}if(h.has("value")){var j=h.get("value");if(ko.isObservable(j)){ko.computed({read:function(){j();setTimeout(function(){l.multiselect("refresh")},1)},disposeWhenNodeIsRemoved:f}).extend({rateLimit:100,notifyWhenChangesStop:true})}}if(h.has("selectedOptions")){var e=h.get("selectedOptions");if(ko.isObservable(e)){ko.computed({read:function(){e();setTimeout(function(){l.multiselect("refresh")},1)},disposeWhenNodeIsRemoved:f}).extend({rateLimit:100,notifyWhenChangesStop:true})}}ko.utils.domNodeDisposal.addDisposeCallback(f,function(){l.multiselect("destroy")})},update:function(h,i,j,g,e){var d=b(h);var f=ko.toJS(i());d.multiselect("setOptions",f);d.multiselect("rebuild")}}}function c(f,e){for(var d=0;d<f.length;++d){e(f[d],d)}}function a(d,e){this.$select=b(d);if(this.$select.attr("data-placeholder")){e.nonSelectedText=this.$select.data("placeholder")}this.options=this.mergeOptions(b.extend({},e,this.$select.data()));this.originalOptions=this.$select.clone()[0].options;this.query=this.options.query||"";this.searchTimeout=null;this.lastToggledInput=null;this.options.multiple=this.$select.attr("multiple")==="multiple";this.options.onChange=b.proxy(this.options.onChange,this);this.options.onDropdownShow=b.proxy(this.options.onDropdownShow,this);this.options.onDropdownHide=b.proxy(this.options.onDropdownHide,this);this.options.onDropdownShown=b.proxy(this.options.onDropdownShown,this);this.options.onDropdownHidden=b.proxy(this.options.onDropdownHidden,this);this.buildContainer();this.buildButton();this.buildDropdown();this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll();if(this.options.disableIfEmpty&&b("option",this.$select).length<=0){this.disable()}this.$select.hide().after(this.$container)}a.prototype={defaults:{buttonText:function(f,d){if(f.length===0){return this.nonSelectedText}else{if(this.allSelectedText&&f.length===b("option",b(d)).length&&b("option",b(d)).length!==1&&this.multiple){if(this.selectAllNumber){return this.allSelectedText+" ("+f.length+")"}else{return this.allSelectedText}}else{if(f.length>this.numberDisplayed){return f.length+" "+this.nSelectedText}else{var g="";var e=this.delimiterText;f.each(function(){var h=(b(this).attr("label")!==undefined)?b(this).attr("label"):b(this).text();g+=h+e});return g.substr(0,g.length-2)}}}},buttonTitle:function(f,d){if(f.length===0){return this.nonSelectedText}else{var g="";var e=this.delimiterText;f.each(function(){var h=(b(this).attr("label")!==undefined)?b(this).attr("label"):b(this).text();g+=h+e});return g.substr(0,g.length-2)}},optionLabel:function(d){return b(d).attr("label")||b(d).text()},onChange:function(d,e){},onDropdownShow:function(d){},onDropdownHide:function(d){},onDropdownShown:function(d){},onDropdownHidden:function(d){},onSelectAll:function(){},enableHTML:false,buttonClass:"",inheritClass:false,buttonWidth:"auto",buttonContainer:"<div />",dropRight:false,selectedClass:"active",maxHeight:false,checkboxName:false,includeSelectAllOption:false,includeSelectAllIfMoreThan:0,selectAllText:"选择全部",selectAllValue:"multiselect-all",selectAllName:false,selectAllNumber:true,enableFiltering:false,enableCaseInsensitiveFiltering:true,enableClickableOptGroups:false,filterPlaceholder:"Search",filterBehavior:"text",includeFilterClearBtn:true,preventInputChangeEvent:false,nonSelectedText:"None selected",nSelectedText:"selected",allSelectedText:"All selected",numberDisplayed:3,disableIfEmpty:false,delimiterText:", ",toggleClose:true,syncButtonAndGroup:false,templates:{button:'<button class="btn-selector multiselect" data-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',ul:'<ul class="multiselect-container dropdown-menu"></ul>',filter:'<li class="multiselect-item filter"><input class="multiselect-search" type="text"></li>',filterClearBtn:'<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',li:'<li class="multiselect-item"><a tabindex="0"><label></label></a></li>',divider:'<li class="multiselect-item divider"></li>',liGroup:'<li class="multiselect-item multiselect-group"><label></label></li>'}},constructor:a,buildContainer:function(){this.$container=b(this.options.buttonContainer);this.$container.on("show.bs.dropdown",this.options.onDropdownShow);this.$container.on("hide.bs.dropdown",this.options.onDropdownHide);this.$container.on("shown.bs.dropdown",this.options.onDropdownShown);this.$container.on("hidden.bs.dropdown",this.options.onDropdownHidden)},buildButton:function(){this.$button=b(this.options.templates.button).addClass(this.options.buttonClass);if(this.$select.attr("class")&&this.options.inheritClass){this.$button.addClass(this.$select.attr("class"))}if(this.$select.prop("disabled")){this.disable()}else{this.enable()}if(this.options.buttonWidth&&this.options.buttonWidth!=="auto"){this.$button.css({width:this.options.buttonWidth,overflow:"hidden","text-overflow":"ellipsis"});this.$container.css({width:this.options.buttonWidth})}var d=this.$select.attr("tabindex");if(d){this.$button.attr("tabindex",d)}this.$container.prepend(this.$button)},buildDropdown:function(){this.$ul=b(this.options.templates.ul);if(this.options.dropRight){this.$ul.addClass("pull-right")}if(this.options.maxHeight){this.$ul.css({"max-height":this.options.maxHeight+"px","overflow-y":"auto","overflow-x":"hidden"})}this.$container.append(this.$ul)},buildDropdownOptions:function(){this.$select.children().each(b.proxy(function(f,g){var e=b(g);var d=e.prop("tagName").toLowerCase();if(e.prop("value")===this.options.selectAllValue){return}if(d==="optgroup"){this.createOptgroup(g)}else{if(d==="option"){if(e.data("role")==="divider"){this.createDivider()}else{this.createOptionValue(g)}}}},this));b("li input",this.$ul).on("change",b.proxy(function(h){var d=b(h.target);var g=d.prop("checked")||false;var e=d.val()===this.options.selectAllValue;if(this.options.selectedClass){if(g){d.closest("li").addClass(this.options.selectedClass)}else{d.closest("li").removeClass(this.options.selectedClass)}}var i=d.val();var j=this.getOptionByValue(i);var k=b("option",this.$select).not(j);var f=b("input",this.$container).not(d);if(e){if(g){this.selectAll()}else{this.deselectAll()}}if(!e){if(g){j.prop("selected",true);if(this.options.multiple){j.prop("selected",true)}else{if(this.options.selectedClass){b(f).closest("li").removeClass(this.options.selectedClass)}b(f).prop("checked",false);k.prop("selected",false);this.$button.click()}if(this.options.selectedClass==="active"){k.closest("a").css("outline","")}}else{j&&j.prop("selected",false)}}this.$select.change();this.updateButtonText();this.updateSelectAll();this.options.onChange(j,g);if(this.options.preventInputChangeEvent){return false}},this));b("li a",this.$ul).on("mousedown",function(d){if(d.shiftKey){return false}});b("li a",this.$ul).on("click",b.proxy(function(e){e.stopPropagation();var g=b(e.target);if(e.shiftKey&&this.options.multiple){if(g.is("label")){e.preventDefault();g=g.find("input");g.prop("checked",!g.prop("checked"))}var p=g.prop("checked")||false;if(this.lastToggledInput!==null&&this.lastToggledInput!==g){var n=g.closest("li").index();var o=this.lastToggledInput.closest("li").index();if(n>o){var k=o;o=n;n=k}++o;var m=this.$ul.find("li").slice(n,o).find("input");m.prop("checked",p);if(this.options.selectedClass){m.closest("li").toggleClass(this.options.selectedClass,p)}for(var l=0,h=m.length;l<h;l++){var f=b(m[l]);var d=this.getOptionByValue(f.val());d.prop("selected",p)}}g.trigger("change")}if(g.is("input")&&!g.closest("li").is(".multiselect-item")){this.lastToggledInput=g}if(this.options.toggleClose){if(g.is("label")&&this.options.multiple){this.$button.click()}}g.blur();if(!this.options.multiple&&g.closest("li").hasClass("active")&&this.$ul.is(":visible")){this.$button.click()}},this));this.$container.off("keydown.multiselect").on("keydown.multiselect",b.proxy(function(g){if(b('input[type="text"]',this.$container).is(":focus")){return}if(g.keyCode===9&&this.$container.hasClass("open")){this.$button.click()}else{var h=b(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");if(!h.length){return}var d=h.index(h.filter(":focus"));if(g.keyCode===38&&d>0){d--}else{if(g.keyCode===40&&d<h.length-1){d++}else{if(!~d){d=0}}}var f=h.eq(d);f.focus();if(g.keyCode===32||g.keyCode===13){var e=f.find("input");e.prop("checked",!e.prop("checked"));e.change()}g.stopPropagation();g.preventDefault()}},this));if(this.options.enableClickableOptGroups&&this.options.multiple){b("li.multiselect-group",this.$ul).on("click",b.proxy(function(g){g.stopPropagation();var h=b(g.target).parent();var e=h.nextUntil("li.multiselect-group");var f=e.filter(":visible:not(.disabled)");var d=true;var i=f.find("input");i.each(function(){d=d&&b(this).prop("checked")});i.prop("checked",!d).trigger("change")},this))}},createOptionValue:function(h){var p=b(h);if(p.is(":selected")){p.prop("selected",true)}var n=this.options.optionLabel(h);var o=p.val();var e=this.options.multiple?"checkbox":"radio";var l=b(this.options.templates.li);var m=b("label",l);m.addClass(e);if(this.options.enableHTML){m.html(" "+n)}else{m.text(" "+n)}var d=b("<input/>").attr("type",e);if(e==="radio"){d.hide()}if(this.options.checkboxName){d.attr("name",this.options.checkboxName)}m.prepend(d);var f=p.prop("selected")||false;d.val(o);var q=p.data();var j=Object.keys(q);for(var g=0,k=j.length;g<k;g++){d.attr("data-"+j[g],q[j[g]])}if(o===this.options.selectAllValue){l.addClass("multiselect-item multiselect-all");d.parent().parent().addClass("multiselect-all")}m.attr("title",p.attr("title"));this.$ul.append(l);if(p.is(":disabled")){d.attr("disabled","disabled").prop("disabled",true).closest("a").attr("tabindex","-1").closest("li").addClass("disabled")}d.prop("checked",f);if(f&&this.options.selectedClass){d.closest("li").addClass(this.options.selectedClass)}},createDivider:function(e){var d=b(this.options.templates.divider);this.$ul.append(d)},createOptgroup:function(g){var f=b(g);var j=f.prop("label");var h=b(this.options.templates.liGroup);if(this.options.enableHTML){b("label",h).html(j)}else{b("label",h).text(j)}if(!j){b("label",h).remove()}if(this.options.enableClickableOptGroups){h.addClass("multiselect-group-clickable")}if(f.data("icon")){var e=f.data("icon").split(",");for(var d=e.length-1;d>=0;d--){h.prepend('<span class="'+e[d]+'"></span>')}}if(f.data("icon-value")){h.find("span:first").text(f.data("icon-value"))}this.$ul.append(h);if(b(g).is(":disabled")){h.addClass("disabled")}b("option",g).each(b.proxy(function(i,k){this.createOptionValue(k)},this))},buildSelectAll:function(){if(typeof this.options.selectAllValue==="number"){this.options.selectAllValue=this.options.selectAllValue.toString()}var d=this.hasSelectAll();if(!d&&this.options.includeSelectAllOption&&this.options.multiple&&b("option",this.$select).length>this.options.includeSelectAllIfMoreThan){if(this.options.includeSelectAllDivider){this.$ul.prepend(b(this.options.templates.divider))}var f=b(this.options.templates.li);b("label",f).addClass("checkbox");if(this.options.enableHTML){b("label",f).html(" "+this.options.selectAllText)}else{b("label",f).text(" "+this.options.selectAllText)}if(this.options.selectAllName){b("label",f).prepend('<input type="checkbox" name="'+this.options.selectAllName+'" />')}else{b("label",f).prepend('<input type="checkbox" />')}var e=b("input",f);e.val(this.options.selectAllValue);f.addClass("multiselect-item multiselect-all");e.parent().parent().addClass("multiselect-all");this.$ul.prepend(f);e.prop("checked",false)}},buildFilter:function(){if(this.options.enableFiltering||this.options.enableCaseInsensitiveFiltering){var e=Math.max(this.options.enableFiltering,this.options.enableCaseInsensitiveFiltering);if(this.$select.find("option").length>=e){this.$filter=b(this.options.templates.filter);b("input",this.$filter).attr("placeholder",this.options.filterPlaceholder).val(this.query);if(this.options.includeFilterClearBtn){var d=b(this.options.templates.filterClearBtn);d.on("click",b.proxy(function(f){clearTimeout(this.searchTimeout);this.$filter.find(".multiselect-search").val("");b("li",this.$ul).show().removeClass("filter-hidden");this.updateSelectAll()},this));this.$filter.find(".input-group").append(d)}this.$ul.prepend(this.$filter);this.$filter.val(this.query).on("click",function(f){f.stopPropagation()}).on("input keydown",b.proxy(function(f){if(f.which===13){f.preventDefault()}clearTimeout(this.searchTimeout);this.searchTimeout=this.asyncFunction(b.proxy(function(){if(this.query!==f.target.value){this.query=f.target.value;if(typeof this.options.dynamicFilter==="function"){this.options.dynamicFilter(this.query,sensorsdata.bind(function(i){this.$select.html(i);this.$ul.children().not(".filter","multiselect-all").remove();this.buildDropdownOptions()},this));return}var g,h;b.each(b("li",this.$ul),b.proxy(function(k,l){var j=b(l);if(j.hasClass("multiselect-item-event-tag-title")||j.hasClass("multiselect-item-event-tag")||j.hasClass("event-tag-hidden")||j.hasClass("multiselect-item-event-tag-split")){return}var n=b("input",l).length>0?b("input",l).val():"";var o=b("label",l).text();var i="";if((this.options.filterBehavior==="text")){i=o}else{if((this.options.filterBehavior==="value")){i=n}else{if(this.options.filterBehavior==="both"){i=o+"\n"+n}}}if(n!==this.options.selectAllValue&&o){var m=false;if(this.options.enableCaseInsensitiveFiltering&&i.toLowerCase().indexOf(this.query.toLowerCase())>-1){m=true}else{if(i.indexOf(this.query)>-1){m=true}}b(l).toggle(m).toggleClass("filter-hidden",!m);if(b(l).hasClass("multiselect-group")){g=l;h=m}else{if(m){b(g).show().removeClass("filter-hidden")}if(!m&&h){b(l).show().removeClass("filter-hidden")}}}},this))}this.updateSelectAll()},this),300,this)},this))}}},destroy:function(){this.$container.remove();this.$select.show();this.$select.data("multiselect",null)},refresh:function(){b("option",this.$select).each(b.proxy(function(d,e){var f=b("li input",this.$ul).filter(function(){return b(this).val()===b(e).val()});if(b(e).is(":selected")){f.prop("checked",true);if(this.options.selectedClass){f.closest("li").addClass(this.options.selectedClass)}}else{f.prop("checked",false);if(this.options.selectedClass){f.closest("li").removeClass(this.options.selectedClass)}}if(b(e).is(":disabled")){f.attr("disabled","disabled").prop("disabled",true).closest("li").addClass("disabled")}else{f.prop("disabled",false).closest("li").removeClass("disabled")}},this));this.updateButtonText();this.updateSelectAll()},select:function(h,j){if(!b.isArray(h)){h=[h]}b("li input:checked",this.$ul).prop("checked",false);for(var d=0;d<h.length;d++){var f=h[d];if(f===null||f===undefined){continue}var g=this.getOptionByValue(f);var e=this.getInputByValue(f);if(g===undefined||e===undefined){continue}if(!this.options.multiple){this.deselectAll(false)}if(this.options.selectedClass){e.closest("li").addClass(this.options.selectedClass)}e.prop("checked",true);g.prop("selected",true);if(j){this.options.onChange(g,true)}}this.updateButtonText();this.updateSelectAll()},clearSelection:function(){this.deselectAll(false);this.updateButtonText();this.updateSelectAll()},deselect:function(d,j){if(!b.isArray(d)){d=[d]}for(var e=0;e<d.length;e++){var g=d[e];if(g===null||g===undefined){continue}var h=this.getOptionByValue(g);var f=this.getInputByValue(g);if(h===undefined||f===undefined){continue}if(this.options.selectedClass){f.closest("li").removeClass(this.options.selectedClass)}f.prop("checked",false);h.prop("selected",false);if(j){this.options.onChange(h,false)}}this.updateButtonText();this.updateSelectAll()},selectAll:function(e,g){var e=typeof e==="undefined"?true:e;var j=b("li input[type='checkbox']:enabled",this.$ul);var h=j.filter(":visible");var i=j.length;var d=h.length;if(e){h.prop("checked",true);b("li:not(.divider):not(.disabled)",this.$ul).filter(":visible").addClass(this.options.selectedClass)}else{j.prop("checked",true);b("li:not(.divider):not(.disabled)",this.$ul).addClass(this.options.selectedClass)}if(i===d||e===false){b("option:enabled",this.$select).prop("selected",true)}else{var f=h.map(function(){return b(this).val()}).get();b("option:enabled",this.$select).filter(function(k){return b.inArray(b(this).val(),f)!==-1}).prop("selected",true)}if(g){this.options.onSelectAll()}},deselectAll:function(d){var d=typeof d==="undefined"?true:d;if(d){var f=b("li input[type='checkbox']:not(:disabled)",this.$ul).filter(":visible");f.prop("checked",false);var e=f.map(function(){return b(this).val()}).get();b("option:enabled",this.$select).filter(function(g){return b.inArray(b(this).val(),e)!==-1}).prop("selected",false);if(this.options.selectedClass){b("li:not(.divider):not(.disabled)",this.$ul).filter(":visible").removeClass(this.options.selectedClass)}}else{b("li input[type='checkbox']:enabled",this.$ul).prop("checked",false);b("option:enabled",this.$select).prop("selected",false);if(this.options.selectedClass){b("li:not(.divider):not(.disabled)",this.$ul).removeClass(this.options.selectedClass)}}},rebuild:function(){this.$ul.html("");this.options.multiple=this.$select.attr("multiple")==="multiple";this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll();if(this.options.disableIfEmpty&&b("option",this.$select).length<=0){this.disable()}else{this.enable()}if(this.options.dropRight){this.$ul.addClass("pull-right")}},dataprovider:function(f){var d=0;var e=this.$select.empty();b.each(f,function(h,i){var g;if(b.isArray(i.children)){d++;g=b("<optgroup/>").attr({label:i.label||"Group "+d,disabled:!!i.disabled});c(i.children,function(j){g.append(b("<option/>").attr({value:j.value,label:j.label||j.value,title:j.title,selected:!!j.selected,disabled:!!j.disabled}))})}else{g=b("<option/>").attr({value:i.value,label:i.label||i.value,title:i.title,selected:!!i.selected,disabled:!!i.disabled})}e.append(g)});this.rebuild()},enable:function(){this.$select.prop("disabled",false);this.$button.prop("disabled",false).removeClass("disabled")},disable:function(){this.$select.prop("disabled",true);this.$button.prop("disabled",true).addClass("disabled")},setOptions:function(d){this.options=this.mergeOptions(d)},mergeOptions:function(d){var e={nSelectedText:"个",allSelectedText:"全选",nonSelectedText:"请选择",filterPlaceholder:"搜索"};return b.extend(true,{},this.defaults,e,this.options,d)},hasSelectAll:function(){return b("li.multiselect-all",this.$ul).length>0},updateSelectAll:function(){if(this.hasSelectAll()){var h=b('li:not(.multiselect-all):not(.filter-hidden) input:enabled[type="checkbox"]',this.$ul);var g=h.length;var e=h.filter(":checked").length;var d=b("li.multiselect-all",this.$ul);var f=d.find("input");if(e>0&&e===g){f.prop("checked",true);d.addClass(this.options.selectedClass);this.options.onSelectAll()}else{f.prop("checked",false);d.removeClass(this.options.selectedClass)}}},updateButtonText:function(){var d=this.getSelected();var e=b(".multiselect .multiselect-selected-text",this.$container);if(this.options.enableHTML){e.html(this.options.buttonText(d,this.$select))}else{e.text(this.options.buttonText(d,this.$select))}if(this.options.syncButtonAndGroup){e.prevAll().remove();var f=this.$ul.find("li.active").prevAll("li.multiselect-group:first").find(">span");if(f.length>0){b("button.multiselect",this.$container).prepend(f.clone())}}},getSelected:function(){return b("option",this.$select).filter(":selected")},getOptionByValue:function(g){var d=b("option",this.$select);var h=g.toString();for(var e=0;e<d.length;e=e+1){var f=d[e];if(f.value===h){return b(f)}}},getInputByValue:function(g){var f=b("li input",this.$ul);var h=g.toString();for(var d=0;d<f.length;d=d+1){var e=f[d];if(e.value===h){return b(e)}}},updateOriginalOptions:function(){this.originalOptions=this.$select.clone()[0].options},asyncFunction:function(g,f,d){var e=Array.prototype.slice.call(arguments,3);return setTimeout(function(){g.apply(d||window,e)},f)},setAllSelectedText:function(d){this.options.allSelectedText=d;this.updateButtonText()}};b.fn.multiselect=function(e,f,d){return this.each(function(){var h=b(this).data("multiselect");var g=typeof e==="object"&&e;if(!h){h=new a(this,g);b(this).data("multiselect",h)}if(typeof e==="string"){h[e](f,d);if(e==="destroy"){b(this).data("multiselect",false)}}})};b.fn.multiselect.Constructor=a;b(function(){b("select[data-role=multiselect]").multiselect()})}(window.jQuery);