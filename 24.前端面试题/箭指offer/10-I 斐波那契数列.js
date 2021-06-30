/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    function fibIml(n,a,b){
        if(n===0)return a;
        return fibIml(n-1,b,(a+b)%1000000007);
    }
    return fibIml(n,0,1);
};
