// 默认暴露 可以暴露任意数据类型，暴露什么数据接受到的是什么数据(只能默认暴露一个)
// 语法：export default value
export default {
    msg: 'module3',
    foo() {
        console.log('foo() module3')
    }
};
