
function Promise(executor){
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null

    // 保存实例对象的 this 值
    const self = this;

    // resolve 函数
    function resolve(data) {
        // 判断是否已经修改过状态
        if(self.PromiseState !== 'pending') return
        // 1修改对象的状态（promiseState）
        self.PromiseState = "fulfilled";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
    }

    // reject 函数
    function reject(data) {
        // 判断是否已经修改过状态
        if(self.PromiseState !== 'pending') return
        // 1修改对象的状态（promiseState）
        self.PromiseState = "rejected";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
    }

    //同步调用【执行器函数】
    try {
        //同步调用【执行器函数】
        executor(resolve,reject)
    }catch (e) {
        // 修改 promise 实例对象的状态为失败
        reject(e)
    }

}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){

}
