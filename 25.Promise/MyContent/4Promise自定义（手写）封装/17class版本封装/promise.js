class Promise{
    // 构造方法
    constructor(executor) {
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
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data)
                });
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
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                });
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

    // then 方法封装
    then(onResolved, onRejected) {
        const self = this

        // 判断回调函数，用来解决不传第二个参数时实现【异常穿透】
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason
            };
        }

        // 判断回调函数，用来解决不传第一个参数时实现【值传递】
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
        }


        return new Promise((resolve, reject) => {
            // 封装函数
            function callback(type) {
                try { // 【这一层try。。。catch好像可以不用，new的时候已经有】// 获取回调函数的执行结果
                    let result = type(self.PromiseResult)
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

            // 调用回调函数
            if (this.PromiseState === "fulfilled"){
                setTimeout(() => {
                    // 让then的回调异步
                    callback(onResolved);
                });

            }
            if(this.PromiseState === "rejected"){
                setTimeout(() => {
                    // 让then的回调异步
                    callback(onRejected);
                });
            }
            // 判断pending状态
            if(this.PromiseState === "pending"){
                // 保存回调函数
                this.callbacks.push({
                    onResolved:function () {
                        callback(onResolved);
                    },
                    onRejected:function () {
                        callback(onRejected);
                    }
                });
            }
        });
    }

    // catch 方法封装
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    // 静态方法 resolve
    static resolve(value) {
        // 返回promise实例对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                });
            }else { // 状态设置为成功
                resolve(value)
            }
        });
    }

    // 静态方法 reject
    static reject(value) {
        // 返回promise实例对象
        return new Promise((resolve, reject) => {
            reject(value)
        });
    }

    // 静态方法 all
    static all(promises) {
        // 返回promise实例对象
        return new Promise((resolve, reject) => {
            // 声明变量
            let count = 0;
            // 存放成功结果的数组
            let arr = []
            // 遍历
            for (let i = 0; i < promises.length; i++) {
                //
                promises[i].then(v => {
                    // 得知对象的状态是成功的
                    // 每个promise对象都成功
                    count++;
                    console.log(count)
                    // 将当前promise成功的结果存入到数组中
                    // 用这种赋值让promise异步改变状态不改变数组顺序
                    arr[i] = v;
                    if(count === promises.length){
                        resolve(arr);
                    }
                }, r => {
                    reject(r);
                });

            }
        });
    }

    // 静态方法 race
    static race(promises) {
        // 返回promise实例对象
        return new Promise((resolve, reject) => {
            // 遍历
            for (let i = 0; i < promises.length; i++) {
                //
                promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r);
                });

            }
        });
    }
}

