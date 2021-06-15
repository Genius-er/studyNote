// 第一个参数是调用对象，第二个参数是函数参数
Function.prototype.myCall = function(thisArg, ...args) {
    // call默认是window调用，如果有对象则是该对象进行调用
    thisArg = thisArg ? Object(thisArg):window;
    // 使用Symbol方法来作为唯一属性,还可以用其他实现唯一key吗？
    const id = Symbol('id');
    thisArg[id] = this;
    const res = thisArg[id](...args);
    delete thisArg[id];
    return res;
}
