import '../css/a.css';
import '../css/b.css';
import '../less/a.less';

// 处理其他文件测试
import '../css/iconfont.css';

// js语法格式测试
function add(a,b) {
  return a + b;
}

console.log(add(1, 2));

// js兼容性测试，用ie和谷歌
const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('延迟成功');
    resolve();
  }, 1000);
});

console.log(promise);


