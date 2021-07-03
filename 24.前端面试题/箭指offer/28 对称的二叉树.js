/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  function digui(L,R){
    if(!L && !R) return true
    if(!L || !R || L.val !== R.val) return false
    return digui(L.left,R.right) && digui(L.right,R.left)
  }
  return !root || digui(root.left,root.right)
};
