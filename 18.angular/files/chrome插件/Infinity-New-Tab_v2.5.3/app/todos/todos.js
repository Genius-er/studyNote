$(document).ready(function(){window.$Todos={ini:function(){$Todos.menuIni();$Todos.loadTodos();$Todos.addTodos();$Todos.todockeck()},menuIni:function(){$("#notdone").click(function(){$(".todotype").css("color","");$(this).css("color","#2ECC71");$(".todosContent,#cleardone").hide();$("#todoContent").show();$("#todosOut").css("padding-top","115px")});$("#havedone").click(function(){$(".todotype").css("color","");$(this).css("color","#2ECC71");$(".todosContent").hide();$("#doneContent,#cleardone").show();$("#todosOut").css("padding-top","145px")});$("div .labelOut").live("mouseover",function(a){if($(this).index()!=0){$(this).children(".toTop").show()}$(this).children(".todoDelete").show()});$("div .labelOut").live("mouseleave",function(a){$(this).children(".toTop,.todoDelete").hide()})},loadTodos:function(){var g="";var f="";var e=$setting.get("todostrue");var b=$setting.get("todosfalse");var a=e.length;var c=b.length;for(var d=0;d<a;d++){g+=('<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">'+e[d]+'</label><div class="toTop"></div></div>')}for(var d=0;d<c;d++){f+=('<div class="labelOut"><label class="checkLabel todoLabel checkdone"><input type="checkbox" checked="checked" class="checkbox">'+b[d]+'</label><div class="todoDelete"></div></div>')}$("#todoContent").html(stripscript(g));$("#doneContent").html(stripscript(f))},addTodos:function(){$("#addTodos").live("keydown",function(c){if(c.which==13){var a=$(this).val();if(a==""){return false}var b=$setting.get("todostrue");b.unshift(a);$setting.set("todostrue",b);$("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo todoFadeIn"><input type="checkbox" class="checkbox">'+a+'</label><div class="toTop"></div></div>'));$(this).val("");$(".todotype").css("color","");$("#notdone").css("color","#2ECC71");$(".todosContent,#cleardone").hide();$("#todoContent").show();$("#todosOut").css("padding-top","115px")}})},todockeck:function(){$(".checktodo").live("click",function(){var b=$(this).parent().index();var c=$setting.get("todostrue");var a=$setting.get("todosfalse");var d;var e=$(this).parent();d=c[b];c.splice(b,1);a.unshift(d);$setting.set("todostrue",c);$setting.set("todosfalse",a);$(this).css("text-decoration","line-through");e.fadeOut(150,function(){e.remove()});$("#doneContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checkdone"><input type="checkbox" checked="checked" class="checkbox">'+d+'</label><div class="todoDelete"></div></div>'));return false});$(".toTop").live("click",function(d){var a=$(this).parent().index();var b=$setting.get("todostrue");var c;var e=$(this).parent();c=b[a];b.splice(a,1);b.unshift(c);$setting.set("todostrue",b);e.remove();$("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">'+c+'</label><div class="toTop"></div></div>'));return false});$(".checkdone").live("click",function(){var b=$(this).parent().index();var c=$setting.get("todostrue");var a=$setting.get("todosfalse");var d;var e=$(this).parent();d=a[b];a.splice(b,1);c.unshift(d);$setting.set("todostrue",c);$setting.set("todosfalse",a);e.fadeOut(150,function(){e.remove()});$("#todoContent").prepend(stripscript('<div class="labelOut"><label class="checkLabel todoLabel checktodo"><input type="checkbox" class="checkbox">'+d+'</label><div class="toTop"></div></div>'));return false});$("#cleardone").live("click",function(a){$setting.set("todosfalse",[]);$("#doneContent").children().remove()});$(".todoDelete").live("click",function(c){var b=$(this).parent().index();var a=$setting.get("todosfalse");var d=$(this).parent();a.splice(b,1);$setting.set("todosfalse",a);d.fadeOut(150,function(){d.remove()});return false})}};$Todos.ini()});