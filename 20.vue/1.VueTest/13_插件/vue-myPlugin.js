(function (window) {
  // 向外暴露的插件对象
  const MyPlugin = {}
  // 插件对象必须又一个install()，声明使用时由vue调用
  MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      console.log('Vue函数对象的myGlobalMethod()')
    }

    // 2. 添加全局资源
    Vue.directive('my-directive',function (el, binding) {
      el.textContent = 'my-directive----'+binding.value
    })

    // 4. 添加实例方法(放原型中)
    Vue.prototype.$myMethod = function () {
      console.log('vm $myMethod()')
    }
  }
  // 向全局暴露
  window.MyPlugin = MyPlugin
})(window)
