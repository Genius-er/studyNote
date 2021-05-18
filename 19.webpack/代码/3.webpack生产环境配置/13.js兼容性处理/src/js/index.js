/*2. 全部js兼容性处理 --> @babel/polyfill  (这个包要下载)，使用这个只需要在要进行语法兼容的js源文件中import这个包
问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，【体积太大】了~*/
// import '@babel/polyfill';

const add = (x, y) => {
  return x + y;
};
console.log(add(2, 5));

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});

console.log(promise);
