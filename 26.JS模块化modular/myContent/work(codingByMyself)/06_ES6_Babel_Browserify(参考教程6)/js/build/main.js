'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 引入其他的模块
// 语法： import xxx from '路径'

// 引入第三方模块
(0, _module.foo)();

// 引入使用默认暴露模块


// 暴露的时候用常规暴露（分别暴露或统一暴露），引入的时候都要用【对象解构赋值】的方式

(0, _module.bar)();
(0, _module2.fun)();
(0, _module2.fun2)();

_module4.default.foo();
console.log(_module4.default.msg);

(0, _jquery2.default)('body').css('background', 'red');