/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
  let res = str.match(/^\s*[+-]?\d+/);
  if(!res) return 0;

  res = res[0].trim();
  console.log(typeof res)
  /* - 对于非数值进行比较，会将其转换为数字然后再比较
     - 如果两边都是字符串，不会将其转换为数字进行比较，会直接比较字符编码
          是一位一位进行比较的，如果一样比较下一位*/
  if(res >= Math.pow(2,31)) {
    return Math.pow(2,31) - 1;
  } else if (res <= Math.pow(-2,31)) {
    return  Math.pow(-2,31)
  } else {
    return res*1;
  }
};

console.log('450' > 460)
