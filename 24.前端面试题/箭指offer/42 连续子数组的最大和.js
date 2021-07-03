/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  for (var i = 1; i < nums.length; i++) {
    nums[i] += Math.max(nums[i-1],0)
  }
  return Math.max(...nums)
};
