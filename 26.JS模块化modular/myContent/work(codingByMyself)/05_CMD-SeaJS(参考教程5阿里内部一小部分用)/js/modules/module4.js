// 定义有依赖的模块
define(function (require, exports, module) {
    let msg = 'module4';
    // 同步引入
    let module2 = require('./module2');
    console.log('下面是module4里运用module2的输出')
    module2();
    // 异步引入
    require.async('./module3',function (module3) { // 引入成功的回调函数
        console.log('下面是module4里异步运用module3的输出')
        module3.module3.fun();
    });

    function fun2() {
        console.log(msg);
    }

    exports.fun2 = fun2;
})
