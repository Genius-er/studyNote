// 定义没有依赖的模块
define(function (require, exports, module) {
    let msg = 'module1';
    console.log('module1里的输出')
    function foo() {
        return msg;
    }

    // 暴露模块
    module.exports = {foo}

})
