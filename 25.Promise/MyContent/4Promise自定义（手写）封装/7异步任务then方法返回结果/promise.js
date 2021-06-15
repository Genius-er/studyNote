
function Promise(executor){
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null

    // 声明属性
    this.callback = {}

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
        // 调用成功的回调
        if (self.callback.onResolved){
            self.callback.onResolved(data)
        }
    }

    // reject 函数
    function reject(data) {
        console.log(this)
        // 判断是否已经修改过状态
        if(self.PromiseState !== 'pending') return
        // 1修改对象的状态（promiseState）
        self.PromiseState = "rejected";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
        // 调用失败的回调
        if (self.callback.onRejected){
            self.callback.onRejected(data)
        }
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
    // 调用回调函数
    if (this.PromiseState === "fulfilled"){
        newPromise.PromiseResult = onResolved(this.PromiseResult)
    }
    if(this.PromiseState === "rejected"){
        newPromise.PromiseResult = onRejected(this.PromiseResult)
    }
    // 判断pending状态
    if(this.PromiseState === "pending"){
        // 保存回调函数
        this.callback = {
            onResolved,
            onRejected
        }
    }
}
