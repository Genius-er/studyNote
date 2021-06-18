'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.foo = foo;
exports.bar = bar;
// 暴露模块  常规暴露（分别暴露）
function foo() {
    console.log('foo() module1');
}

function bar() {
    console.log('bar() module1');
}

var arr = exports.arr = [1, 54, 5, 2, 47, 5];