// 使用export.xxx = value 暴露模块
exports.foo = function () {
    console.log('foo() module3')
}

exports.bar = function () {
    console.log('bar() module3')
}

exports.arr = [2, 5, 6, 6, 5, 4, 8, 9];

// 不能再使用module.exports = {}进行暴露，会覆盖之前的
