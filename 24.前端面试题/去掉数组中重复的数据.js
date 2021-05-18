/*
* 1、创建一个新数组，把原数组中的第一个元素插入到新数组中
* 2、遍历原数组中的每一个元素，分贝和新数组中的每个元素进行比较
* */
// 原数组
var arr = [8,11,20,5,20,8,0,2,4,0,8]
// 新数组
var t = []
t[0] = arr[0]

for (var i = 0; i < arr.length; i++) {
  for (var k = 0; k < t.length; k++) {
    if (t[k] === arr[i]) {
      break
    }

    if(k === t.length-1){
      t.push(arr[i])
    }

  }
}

console.log(t)
