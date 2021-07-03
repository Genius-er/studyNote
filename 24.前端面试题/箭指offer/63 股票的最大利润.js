/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  /*初始化第i天卖出最大利润情况*/
  const dp = new Array(prices.length).fill(0)
  let tmp = 0
  debugger
  for (let i = 1; i < prices.length; i++) {
    console.log(dp[i-1],'::')
    dp[i] = prices[i] - prices[i - 1] + (dp[i-1] > 0 ? dp[i-1] : 0)
    if(dp[i]>tmp){
      tmp = dp[i]
    }
  }
  return tmp
};

// console.log(maxProfit([7,1,5,3,6,4]))


function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
};

let a = new Node(1)
let b = new Node(2)
let c = {}
c[a] = new Node(3)
c[b] = new Node(4)
console.log(c[a])
console.log(c[b])
console.log(typeof c)
for (const key in c) {
  console.log(typeof key)
}

