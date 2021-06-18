define(function (require,exports,module) {
    let data = 'module3';
    console.log('module3里的输出')
    function fun() {
        console.log(data);
    }

    exports.module3 = {fun}

})
