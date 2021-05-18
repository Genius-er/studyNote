var arr = [5,4,3,2,1]

//轮数
for (var i = 0; i < arr.length; i++) {
  //每轮比较次数
  for (var j = 0; j < arr.length-1-i; j++) {
    //判断前一个大于后一个数时进行比较
    if(arr[j]>arr[j+1]){
      //借助第三个变量交换两个变量的值
      var temp = arr[j]
      arr[j] = arr[j+1]
      arr[j+1] = temp
    }

  }
}
console.log(arr)
