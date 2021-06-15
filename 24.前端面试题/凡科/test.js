// 下面代码分别输出是什么， 为什么
setTimeout(() => console.log('1'))
const p = new Promise((resolve, reject) => {
    console.log('2------------')
    for(let i = 0; i< 1000; i++) {
        console.log('3');
        if(i === 9) resolve('4')
    } })
p.then(e => {  console.log(e) })
console.log('5');



