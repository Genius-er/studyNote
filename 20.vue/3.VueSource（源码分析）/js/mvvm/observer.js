function Observer(data) {
    // 保存data对象
    this.data = data;
    // 走起,开始对data的监视
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        // 保存observer对象
        var me = this;
        // 遍历data中所有属性
        Object.keys(data).forEach(function(key) {
            // 针对指定属性进行处理
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // 对指定属性实现【响应式数据绑定】
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        // 创建与当前属性对应的dep对象（dependency）
        var dep = new Dep();
        // 【间接递归调用】实现对data中【所有层次】属性的劫持
        var childObj = observe(val);
        // 给data【重新】定义属性(添加set/get)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                // 建立dep与watcher的关系
                if (Dep.target) {
                    dep.depend();
                }
                // 返回属性值
                return val;
            },
            set: function(newVal) {// 监视key属性的变化，更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通过dep通知所有watcher
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // value必须是对象, 因为监视的是对象内部的属性
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建一个对应的观察都对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    // 标识属性
    this.id = uid++;
    // 相关的所有watcher的数组（subscribe）多个订阅者的数组，有点类似于监听
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        // target就是watcher
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 通知所有相关的watcher(一个订阅者)（subs是watcher列表）
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;
