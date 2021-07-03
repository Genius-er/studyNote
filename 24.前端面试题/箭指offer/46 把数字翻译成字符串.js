/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(nums) {
  nums = '3'+ nums;
  console.log(typeof nums)
  let arr = [];
  arr[0] = 1
  arr[1] = 1
  for (var i = 2; i < nums.length+1; i++) {
    if((nums[i-1]+nums[i])<=25 && (nums[i-1]+nums[i])>=10){
      arr[i] = arr[i-2] + arr[i-1]
    }else {
      arr[i] = arr[i-1]
    }
  }
  return arr[nums.length]
};
console.log(translateNum(12258))
