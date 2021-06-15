
function Promise(executor){
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null

    // 非箭头函数方式
   /* // 保存实例对象的 this 值
    const self = this;

    // resolve 函数
    function resolve(data) {
        // 1修改对象的状态（promiseState）
        self.PromiseState = "fulfilled";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
    }

    // reject 函数
    function reject(data) {
        // 1修改对象的状态（promiseState）
        self.PromiseState = "rejected";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
    }
    //同步调用【执行器函数】
    executor(resolve,reject)
    */

    //同步调用【执行器函数】
    executor((data) => {
        // 1修改对象的状态（promiseState）
        this.PromiseState = "fulfilled";
        // 2设置对象结果值（promiseResult）
        this.PromiseResult = data
    }, (data) => {
        // 1修改对象的状态（promiseState）
        this.PromiseState = "rejected";
        // 2设置对象结果值（promiseResult）
        this.PromiseResult = data
    });
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){

}
