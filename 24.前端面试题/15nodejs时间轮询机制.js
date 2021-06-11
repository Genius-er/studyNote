setTimeout(function () {
  console.log('setTimeout()')
},0)

setImmediate(function () {
  console.log('setImmediate()')
})

// process.nextTick能在任意阶段优先执行
process.nextTick(function () {
  console.log('process.nextTick()')
})
//执行顺序
/*process.nextTick()
setTimeout()
setImmediate()*/

