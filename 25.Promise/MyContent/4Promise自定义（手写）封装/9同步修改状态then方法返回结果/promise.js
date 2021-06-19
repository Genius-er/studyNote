
function Promise(executor){
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null

    // 声明属性
    this.callbacks = []

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
        self.callbacks.forEach(item => {
            item.onResolved(data)
        });
    }

    // reject 函数
    function reject(data) {
        // 判断是否已经修改过状态
        if(self.PromiseState !== 'pending') return
        // 1修改对象的状态（promiseState）
        self.PromiseState = "rejected";
        // 2设置对象结果值（promiseResult）
        self.PromiseResult = data
        // 调用失败的回调
        self.callbacks.forEach(item => {
            item.onRejected(data)
        });
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
    return new Promise((resolve, reject) => {
        // 调用回调函数
        // 这里的this是调用then的promise，不是then返回新new的promise
        if (this.PromiseState === "fulfilled"){
            try { // 【这一层try。。。catch好像可以不用，new的时候已经有】
                // 获取回调函数的执行结果
                let result = onResolved(this.PromiseResult)
                if(result instanceof Promise){
                    // 如果是Promise对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    });
                }else {
                    // 结果的对象状态为【成功】
                    resolve(result)
                }
            }catch (e) {
                reject(e)
            }
        }
        if(this.PromiseState === "rejected"){
            try { // 【这一层try。。。catch好像可以不用，new的时候已经有】
                // 获取回调函数的执行结果
                let result = onRejected(this.PromiseResult)
                if(result instanceof Promise){
                    // 如果是Promise对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    });
                }else {
                    // 结果的对象状态为【成功】
                    resolve(result)
                }
            }catch (e) {
                reject(e)
            }
        }
        // 判断pending状态
        if(this.PromiseState === "pending"){
            // 保存回调函数
            this.callbacks.push({
                onResolved,
                onRejected
            });
        }
    });
}
