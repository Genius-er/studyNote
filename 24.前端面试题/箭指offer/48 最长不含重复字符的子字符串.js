/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  /*哈希表用于最后一次出现对应字母的下标*/
  const dic = new Map()
  /*res遍历过程最大值，tmp每次遍历的前一次的最大值*/
  let [res, tmp] = [0, 0]
  debugger
  for (let j = 0; j < s.length; j++) {
    let i = dic.get(s[j]) !== undefined ? dic.get(s[j]) : -1
    dic.set(s[j], j)
    tmp = tmp < j - i ? tmp + 1 : j - i
    res = Math.max(res,tmp)
    // console.log(i,dic,tmp,res)
  }
  return res
};

console.log(lengthOfLongestSubstring('abcabcbb'))
