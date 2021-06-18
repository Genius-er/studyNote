// 引入其他的模块
// 语法： import xxx from '路径'

// 引入第三方模块
import $ from 'jquery';

// 暴露的时候用常规暴露（分别暴露或统一暴露），引入的时候都要用【对象解构赋值】的方式
import {foo, bar} from './module1';
import {fun, fun2} from './module2';

// 引入使用默认暴露模块
import module3 from "./module3";



foo();
bar();
fun();
fun2();

module3.foo();
console.log(module3.msg);

$('body').css('background', 'red');
