/**
 * nodejs内置的util里的的promisify方法，参数为回调函数为错误优先的方法，例如fs.readFile(path,(err,data)=>{})
 * util.promisify 方法
 */
//引入 util 模块
const util = require('util');
//引入 fs 模块
const fs = require('fs');
//返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/content.txt').then(value=>{
    console.log(value.toString());
});
