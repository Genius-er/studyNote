define(function (require, exports, module) {
    let msg = 'module2';
    console.log('module2的输出')
    function bar() {
        console.log(msg);
    }

    module.exports = bar;
})
