"use strict";var searchSuggesutAjaxZh=null;var searchSuggesutAjaxEn=null;window.$search={ini:function(){$search.searchSetting();if(isZh()){$search.suggestZh()}else{$search.suggestEn()}$search.selectSuggest.ini();$search.searchChange();$search.searchType.ini();$search.searchStart();$("#infinitySearch").live("focus",function(event){$("#searchButton").show().css("opacity","1")});$("#infinitySearch").live("blur",function(){$("#searchButton").css("opacity","0")})},searchStart:function(){$("#infinitySearch").live("keydown",function(e){if(e.which==13){var searchIn=$setting.get("searchInNewtab")?"_blank":"_self";var type=$(this).attr("stype");var v=encodeURIComponent($(this).val());var url=$(this).attr("url")+v;if((url.indexOf("google.com")>=0)&&v==""){var url="https://www.google.com/"}if(type=="url"){var url=$(this).attr("surl")}if(type=="search"){var url=$(this).attr("start")+v+$(this).attr("end")}window.open(url,searchIn);if(searchIn=="_self"){$("#bigBox").fadeIn(300)}}});$("#searchButton").live("click",function(event){var searchIn=$setting.get("searchInNewtab")?"_blank":"_self";var type=$(this).attr("stype");var v=encodeURIComponent($("#infinitySearch").val());var url=$("#infinitySearch").attr("url")+v;if((url.indexOf("google.com")>=0)&&v==""){var url="https://www.google.com/"}if(type=="url"){var url=$("#infinitySearch").attr("surl")}if(type=="search"){var url=$("#infinitySearch").attr("start")+v+$("#infinitySearch").attr("end")}window.open(url,searchIn);if(searchIn=="_self"){$("#bigBox").fadeIn(300)}});$(".sg").live("mousedown",function(event){var searchIn=$setting.get("searchInNewtab")?"_blank":"_self";var url=$("#infinitySearch").attr("url");var type=$(this).attr("type");if(type=="word"){var kw=$(this).text();window.open(url+kw,searchIn)}if(type=="search"){var kw=$("#infinitySearch").val();var start=$(this).attr("start");var end=$(this).attr("end");window.open(start+kw+end,searchIn)}if(type=="url"){var url=$(this).attr("url");window.open(url,searchIn)}if(searchIn=="_self"){$("#bigBox").fadeIn(300)}return false})},searchSetting:function(){var showSearchBox=$setting.get("searchBox");var showSearchOption=$setting.get("searchType");if(!showSearchOption){$("#searchOption").hide()}if(!showSearchBox){$("#searchOut").hide()}else{$("#searchOut").show()}$("#searchBoxCheck").live("change",function(event){if($(this).is(":checked")){$("#searchOut").fadeIn(100)}else{$("#searchOut").fadeOut(100)}});$("#searchTypeCheck").live("change",function(event){if($(this).is(":checked")){$("#searchOption").fadeIn(100)}else{$("#searchOption").fadeOut(100)}})},searchType:{ini:function(){$search.searchType.set();$search.searchType.select()},set:function(){var s=$setting.get("searchEngine");var st=$search.engine[s];var sl=st.length;var so="";var color=$setting.get("fontColor");for(var i=0;i<sl;i++){if(i==0){so+='<span class="searchOptions globalColor" style="border-bottom: 2px solid #2ECC71;color:'+color+'" url="'+st[i].url+'">'+st[i].type+"</span>";$("#infinitySearch").attr("url",st[i].url)}else{so+='<span class="searchOptions globalColor" style="color:'+color+'" url="'+st[i].url+'">'+st[i].type+"</span>"}}$("#searchOption").html(so)},select:function(){$(".searchOptions").live("click",function(event){var color=$setting.get("fontColor");$(".searchOptions").css({"border-bottom":"","color":color,});$(this).css({"border-bottom":"2px solid #2ECC71",});$("#infinitySearch").attr("url",$(this).attr("url"));$("#infinitySearch")[0].focus()})}},SearchEngineItemShow:false,searchChange:function(){var nowSearch=$setting.get("searchEngine");var Searchname=(nowSearch=="百度")?i18n("Baidu"):nowSearch;Searchname=(nowSearch=="Sogou")?i18n("Sogou"):nowSearch;$("#searchChange").attr("now",nowSearch).html(Searchname);var se=[{"value":"Sogou","name":i18n("Sogou")},{"value":"Yahoo","name":"Yahoo"},{"value":"Google","name":"Google"},{"value":"Bing","name":"Bing"},{"value":"百度","name":i18n("Baidu")}];$("#searchChange").live("click",function(event){if($search.SearchEngineItemShow){$search.SearchEngineItemShow=false;$("#allSearchEngine").fadeOut(100)}else{$search.SearchEngineItemShow=true;var nowSearch=$setting.get("searchEngine");var Sdiv="";for(var i=0;i<se.length;i++){if(se[i].value!=nowSearch){Sdiv+='<div class="SearchEngineItem" Svalue="'+se[i].value+'">'+se[i].name+"</div>"}}$("#allSearchEngine").html(Sdiv);$("#allSearchEngine").fadeIn(100)}});$("body").live("click",function(e){if(e.target.className=="SearchEngineItem"||e.target.id=="searchChange"){}else{$search.SearchEngineItemShow=false;$("#allSearchEngine").fadeOut(100)}});$(".SearchEngineItem").live("click",function(event){$search.SearchEngineItemShow=false;var Svalue=$(this).attr("Svalue");var nowSearch=$(this).text();$setting.set("searchEngine",Svalue);$search.searchType.set();$("#searchChange").attr("now",Svalue).html(nowSearch);$("#allSearchEngine").fadeOut(100)})},engine:{"百度":[{"type":i18n("Web"),"url":"https://www.baidu.com/s?ie=UTF-8&tn=95386311_hao_pg&wd="},{"type":i18n("Images"),"url":"http://image.baidu.com/i?&ie=utf-8&tn=95386311_hao_pg&word="},{"type":i18n("News"),"url":"http://news.baidu.com/ns?tn=news&tn=95386311_hao_pg&ie=utf-8&word="},{"type":i18n("Musics"),"url":"http://music.baidu.com/search?ie=utf-8&tn=95386311_hao_pg&key="},{"type":i18n("Videos"),"url":"http://video.baidu.com/v?ie=utf-8&tn=95386311_hao_pg&word="},{"type":i18n("Maps"),"url":"http://map.baidu.com/?newmap=1&ie=utf-8&tn=95386311_hao_pg&s=s%26wd%3D"}],"Google":[{"type":i18n("Web"),"url":"https://www.google.com/search?q="},{"type":i18n("Images"),"url":"https://www.google.com/search?tbm=isch&q="},{"type":i18n("News"),"url":"https://www.google.com/search?tbm=nws&q="},{"type":i18n("Videos"),"url":"https://www.google.com/search?tbm=vid&q="},{"type":i18n("Maps"),"url":"https://www.google.com/maps/preview?q="}],"Yahoo":[{"type":i18n("Web"),"url":"http://search.findwide.com/srd3/?id=246870ZXRiJnR5cGU9aW5maW50&p="},{"type":i18n("Images"),"url":"https://images.search.yahoo.com/search/images?p="},{"type":i18n("News"),"url":"https://news.search.yahoo.com/search?p="},{"type":i18n("Videos"),"url":"https://video.search.yahoo.com/search/video?p=shanghai"},{"type":i18n("Sports"),"url":"https://sports.search.yahoo.com/search?p="}],"Bing":[{"type":i18n("Web"),"url":"http://www.trovi.com/Results.aspx?GD=SY1000020&SearchSource=55&UM=8&q="},{"type":i18n("Images"),"url":"http://www.trovi.com/Results.aspx?SearchType=SearchImages&GD=SY1000020&SearchSource=55&UM=8&q="},{"type":i18n("News"),"url":"http://www.trovi.com/Results.aspx?SearchType=SearchNews&GD=SY1000020&SearchSource=55&UM=8&q="},{"type":i18n("Videos"),"url":"http://www.trovi.com/Results.aspx?SearchType=SearchVideos&GD=SY1000020&SearchSource=55&UM=8&q="},{"type":i18n("Maps"),"url":"http://www.bing.com/maps/default.aspx?q="}],"Sogou":[{"type":i18n("Web"),"url":"http://www.sogou.com/sogou?pid=sogou-site-3b24156ad560a696&query="},{"type":i18n("Images"),"url":"http://pic.sogou.com/pics?pid=sogou-site-3b24156ad560a696&query="},{"type":i18n("News"),"url":"http://news.sogou.com/news?pid=sogou-site-3b24156ad560a696&query="},{"type":i18n("Videos"),"url":"http://v.sogou.com/v?pid=sogou-site-3b24156ad560a696&query="},{"type":i18n("Musics"),"url":"http://mp3.sogou.com/music.so?pid=sogou-site-3b24156ad560a696&query="},{"type":i18n("WeChat"),"url":"http://weixin.sogou.com/weixin?type=2&pid=sogou-site-3b24156ad560a696&query="}]},suggestZh:function(){$("#infinitySearch").live("input",function(e){$search.selectSuggest.m=0;
var searchObj=[];var v=encodeURIComponent($(this).val());if(v==""){$("#sg").hide().html("");return false}$("#infinitySearch").attr({"v":$(this).val(),"stype":"word"});$("#sg").fadeIn(200);var additionalSearch=$setting.get("searchBottom");for(var i=0;i<additionalSearch.length;i++){searchObj.push({"type":"search","name":additionalSearch[i].name,"url":"","start":additionalSearch[i].searchStart,"end":additionalSearch[i].searchEnd})}var json;var obj;var sugg;if(searchSuggesutAjaxZh){searchSuggesutAjaxZh.abort()}searchSuggesutAjaxZh=$.ajax({url:"http://suggestion.baidu.com/su?wd="+v+"&p=3&t="+new Date().getTime()+"&cb=cbackc",dataType:"text",}).done(function(data){try{json=data.match(/cbackc\((.*)\);/)[1];try{obj=window.eval("("+json+")")}catch(err1){obj=JSON.parse(json)}sugg=obj.s;$.ajax({url:"http://nssug.baidu.com/su?wd="+v+"&prod=superpage&t="+new Date().getTime()+"&cb=window.cbs.namesugcb_2&callback=",dataType:"text",}).done(function(data){$search.getBaiduUrlSuggest(data,function(surl){var len=sugg.length>=6?6:sugg.length;searchObj.push({"type":"url","name":surl[4],"url":surl[1],"start":"","end":""});for(var i=0;i<len;i++){var searchItem={"type":"word","name":sugg[i],"url":"","start":"","end":""};searchObj.push(searchItem)}$search.showSuggesst(searchObj)},function(){var len=sugg.length>=6?6:sugg.length;for(var i=0;i<len;i++){var searchItem={"type":"word","name":sugg[i],"url":"","start":"","end":""};searchObj.push(searchItem)}$search.showSuggesst(searchObj)})})}catch(e){}})})},getBaiduUrlSuggest:function(data,callback,callback2){try{var reg=/s:.*\}\)/gi;var su=data.match(reg)[0];var l=su.length;var sg=JSON.parse(su.substring(2,l-2));var reg2=/0\{\#\S\+\_\}.*/gi;var sg_list=sg[0].match(reg2)[0];sg_list=sg_list.substring(7);var sg_l=JSON.parse(sg_list);callback(sg_l)}catch(e){callback2()}},suggestEn:function(){$("#infinitySearch").live("input",function(e){$search.selectSuggest.m=0;var gsuggestItem=[];var v=encodeURIComponent($(this).val());if(v==""){$("#sg").hide().html("");return false}$("#infinitySearch").attr({"v":$(this).val(),"stype":"word"});$("#sg").fadeIn(200);var additionalSearch=$setting.get("searchBottom");for(var i=0;i<additionalSearch.length;i++){gsuggestItem.push({"type":"search","name":additionalSearch[i].name,"url":"","start":additionalSearch[i].searchStart,"end":additionalSearch[i].searchEnd})}if(searchSuggesutAjaxEn){searchSuggesutAjaxEn.abort()}searchSuggesutAjaxEn=$.ajax({url:"http://google.com/complete/search?client=chrome&q="+v+"&infinityTime="+new Date().getTime(),dataType:"json",}).done(function(data){if(data[0]==v){try{var sutype=data[4]["google:suggesttype"];var dl=sutype.length;var ui=null;var gsu=data[1];for(var i=0;i<dl;i++){if(sutype[i]=="NAVIGATION"){ui=i;break}}if(ui){var gurl=gsu.splice(ui,1);var sname=data[2][ui];var gobj={"type":"url","name":sname,"url":gurl[0],"start":"","end":""};gsuggestItem.push(gobj);var glen=gsu.length>=6?6:gsu.length;for(var i=0;i<glen;i++){gsuggestItem.push({"type":"word","name":gsu[i],"url":"","start":"","end":""})}}else{var glen=gsu.length>=6?6:gsu.length;for(var i=0;i<glen;i++){gsuggestItem.push({"type":"word","name":gsu[i],"url":"","start":"","end":""})}}$search.showSuggesst(gsuggestItem)}catch(e){}}})})},showSuggesst:function(obj){try{var l=obj.length;var addlen=$setting.get("searchBottom").length;if((l-addlen)==0){return false}var div="";var searchBy="<span>"+i18n("searchBy")+"</span>";var website="<span>"+i18n("Website")+"</span>";for(var i=0;i<l;i++){if(obj[i].type=="search"){div+='<div class="sg sg'+obj[i].type+'" url="'+obj[i].url+'" start="'+obj[i].start+'" end="'+obj[i].end+'" type="'+obj[i].type+'">'+searchBy+obj[i].name+"</div>"}if(obj[i].type=="url"){div+='<div class="sg sg'+obj[i].type+'" url="'+obj[i].url+'" start="'+obj[i].start+'" end="'+obj[i].end+'" type="'+obj[i].type+'">'+website+obj[i].name+"</div>"}if(obj[i].type=="word"){div+='<div class="sg sg'+obj[i].type+'" url="'+obj[i].url+'" start="'+obj[i].start+'" end="'+obj[i].end+'" type="'+obj[i].type+'">'+obj[i].name+"</div>"}}$("#sg").html(div)}catch(e){}},selectSuggest:{m:0,ini:function(){$("#infinitySearch").live("keydown",function(e){if(e.which==40){var l=$("#sg").children().length;if($search.selectSuggest.m==l+2){$search.selectSuggest.m=1}$search.selectSuggest.m+=1;var m=$search.selectSuggest.m;if(m==(l+1)){$search.selectSuggest.m=0;m=0}$search.selectSuggest.setSelect(m);return false}if(e.which==38){var l=$("#sg").children().length;if($search.selectSuggest.m==0){$search.selectSuggest.m=l+1}$search.selectSuggest.m-=1;var m=$search.selectSuggest.m;if(m==1){$search.selectSuggest.m=l+2}$search.selectSuggest.setSelect(m);if(m==9){m=0;$search.selectSuggest.m=0;$("#infinitySearch").attr("stype","word")}return false}});$("#infinitySearch").live("blur",function(e){$("#sg").fadeOut(100);$search.selectSuggest.m=0;$(".sg").css({"background-color":"","color":""});$("#infinitySearch").attr("stype","word")})},setSelect:function(m){var l=$("#sg").children().length;$(".sg").css({"background-color":"","color":""});
var type=$(".sg:nth-child("+m+")").attr("type");var text=$(".sg:nth-child("+m+")").text();var bgcolor="#2ECC71";$("#infinitySearch").attr("stype",type);if(type=="url"){var bgcolor="#3498DB";var url=$(".sg:nth-child("+m+")").attr("url");$("#infinitySearch").attr("surl",url)}if(type=="search"){var bgcolor="#F1C40F";var start=$(".sg:nth-child("+m+")").attr("start");var end=$(".sg:nth-child("+m+")").attr("end");$("#infinitySearch").attr({"start":start,"end":end})}if(type=="word"){$("#infinitySearch").val(text)}else{$("#infinitySearch").val($("#infinitySearch").attr("v"))}$(".sg:nth-child("+m+")").css({"background-color":bgcolor,"color":"#fdfdfd"});if(m==0||m==l+1){$("#infinitySearch").val($("#infinitySearch").attr("v"))}}}};