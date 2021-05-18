//这样包装把插件内部隐藏起来
(function () {
    /*
        * 需求
        * 1、给$添加4个工具方法：
        *   使用$.extend()
        *   min(a,b)：返回较小的值
        *   max(a,b)：返回较大的值
        *   leftTrim()：去掉字符串左边的空格
        *   rightTrim()：去掉字符串右边的空格
        * 2、给jQuery对象添加3个功能方法：
        *   使用$.fn.extend()
        *   checkAll()：全选
        *   uncheckAll()：全部选
        *   reverseCheck()：全反选
        * */

    $.extend({
        min:function (a,b) {
            return a < b ? a : b
        },
        max:function (a,b) {
            return a > b ? a : b
        },
        leftTrim:function (str) {
            return str.replace(/^\s+/,'')
        },
        rightTrim:function (str) {
            return str.replace(/\s+$/,'')
        }
    })

    $.fn.extend({
        checkAll:function () {
            this.prop('checked',true)
        },
        uncheckAll:function () {
            this.prop('checked',false)
        },
        reverseCheck:function () {
            //这个this是jQuery对象
            this.each(function () {
                //这个this是dom元素
                this.checked = !this.checked
            })
        }
    })
})()