/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  /*状态转移矩阵的横纵长度*/
  let [m, n] = [s.length + 1, p.length + 1]
  /*定义状态转移矩阵*/
  let dp = Array.from({length: m}, () => {
    return Array.from({length: n}).fill(false)
  });
  /*初始化矩阵第一行，防止遍历越界*/
  dp[0][0] = true
  for (var i = 2; i < n; i += 2) {
    dp[0][i] = dp[0][i - 2] && p[i - 1] === '*'
  }
  /*进行状态转移*/
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      if(p[j-1] === '*'){
        if(dp[i][j-2]){
          dp[i][j] = true
        }else if (dp[i - 1][j] && s[i - 1] === p[j - 2]) {
          dp[i][j] = true
        }else if (dp[i - 1][j] && p[j - 2] === '.') {
          dp[i][j] = true
        }
      }
      else {
        if(dp[i - 1][j - 1] && s[i - 1] === p[j - 1]){
          dp[i][j] = true
        }else if (dp[i - 1][j - 1] && p[j - 1] === '.') {
          dp[i][j] = true
        }
      }
    }
  }
  return dp[m-1][n-1]
};

console.log(isMatch('aaa','ab*.*'))
