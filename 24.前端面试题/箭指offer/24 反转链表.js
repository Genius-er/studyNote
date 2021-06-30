/*
*输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
* */

 function ListNode(val) {
   this.val = val;
   this.next = null;
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/*用双指针的解决方式*/
var reverseList = function(head) {
  let pre = null // 前一个节点
  let cur = head // 遍历的当前节点
  while(cur) {
    let tmp = cur.next // 暂存下一个节点
    cur.next = pre   // 将当前节点的next指针反向指
    pre = cur // 将cur置为前节点
    cur = tmp // 更新为下一个节点
  }
  /*遍历完后pre为反转链表的head*/
  return pre
};

/*使用递归的方式*/
/*var reverseList = function(head) {
  /!*递归函数*!/
  function recur(cur, pre) {
    if(!cur) return pre
    let res = recur(cur.next, cur)
    cur.next = pre
    return res
  }
  return recur(head, null)
};*/
