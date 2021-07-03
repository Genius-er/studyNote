/**
 * @param {number} n
 * @return {number}
 */
/*
* f(n) = f(n-1) + f(n-2) ：最后一步分为一步和两步
* 斐波那契数列
* */
var numWays = function(n) {
    let f0 = 1
    let f1 = 1

    for (var i = 0; i < n; i++) {
        [f0, f1] = [f1, (f0 + f1)%1000000007];
    }
    return f0
};

console.log(numWays(2))
console.log(numWays(7))
console.log(numWays(0))
