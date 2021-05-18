1、动画效果
    在一定时间内改变元素的样式
    slideDown（）/slideUp（）/slideToggle（）
    fadeOut（）/fadeIn（）/dadeToggle（）
    show（）/hide（）/toggle（）
    animate（{结束时的样式}，time，fun）
    stop（）停止当前正在进行的动画
    
2、插件机制
    扩展jQuery函数对象$的方法
        $.extend({
            xxx:function(){}  //this是$
        })
        调用：$.xxx()
    扩展jQuery对象的方法
        $.fn.extend({
                    xxx:function(){}  //this是jQuery对象
                })
        调用$obj.xxx()
        
3、jQuery文档结构