// 主模块
(function () {
    requirejs.config({
        baseUrl: 'js/', // 基本路径
        paths: { // 配置模块依赖链所有模块的路径（默认后面会隐藏加.js）
            dataService: './modules/dataService',
            alerter: './modules/alerter',
            jquery: './libs/jquery-1.10.1', // 在jQuery文件最后会【判断是否为amd规范，是则暴露的是小写】
            // 并不是所有第三方库都支持amd规范
            angular: './libs/angular'
        },

        // 像 angular 这种不支持amd规范的要进行单独配置
        shim: {
            angular: {
                exports: 'angular'
            }
        }

    });

    requirejs(['alerter','angular'],function (alerter,angular) {
        alerter.showMsg();
        console.log(angular); // 未单独配置时：undefined   单独配置shim后：{$interpolateMinErr: ƒ, element: ƒ, bootstrap: ƒ, copy: ƒ, extend: ƒ, …}
    })
})()
