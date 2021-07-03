/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function(root) {
  function digui(pRoot){
    if(!pRoot) return
    [pRoot.left,pRoot.right] = [pRoot.right,pRoot.left]
    if(!!pRoot.left) digui(pRoot.left)
    if(!!pRoot.right) digui(pRoot.right)
  }
  digui(root)
  return root
};
