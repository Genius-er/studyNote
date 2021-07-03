/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  let dp = new Array(n).fill(1)
  /*abc用以记录最后一个乘相应数字大于n-1个数的下标*/
  let [a, b, c] = [0, 0, 0]
  debugger
  for (let i = 1; i < n; i++) {
    /*计算当前abc所指的数乘以相应值*/
    let [n2, n3, n5] = [dp[a] * 2, dp[b] * 3, dp[c] * 5]
    dp[i] = Math.min(n2, n3, n5)
    if (dp[i] === n2) a += 1
    if (dp[i] === n3) b += 1
    if (dp[i] === n5) c += 1
  }
  return dp[n-1]
};

console.log(nthUglyNumber(10))
