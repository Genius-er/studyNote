// import * as m1 from "./hello.js";
//获取元素
const btn = document.getElementById('btn');

btn.onclick = function(){
    // 动态引入
    /*import()返回的是Promise对象*/
    import('./hello.js').then(module => {
        module.hello();
    });
}