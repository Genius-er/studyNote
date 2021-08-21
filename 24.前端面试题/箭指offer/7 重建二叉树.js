 function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function reConstructBinaryTree(pre, vin)
{
    if (!pre.length || !vin.length) {
        return null;
    }

    const rootVal = pre[0];
    const node = new TreeNode(rootVal);

    let i = vin.indexOf(rootVal); // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数

    node.left = reConstructBinaryTree(pre.slice(1, i + 1), vin.slice(0, i));
    node.right = reConstructBinaryTree(pre.slice(i + 1), vin.slice(i + 1));
    return node;
}
module.exports = {
    reConstructBinaryTree : reConstructBinaryTree
};
