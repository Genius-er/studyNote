define(function (require) {
    let module1 = require('./module1');
    console.log(module1.foo(),'主模块运用module1的输出');


    let module4 = require('./module4');
    console.log('下面是主模块运用module4里的输出')
    module4.fun2();

});
