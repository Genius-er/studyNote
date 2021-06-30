/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */


function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
};


/*哈希表的方式*/
/**
 * @param {Node} head
 * @return {Node}
 */
/*var copyRandomList = function(head) {
  if(!head) return null
  let dic = new Map() // 初始化哈希表
  // 3. 复制各节点，并建立 “原节点 -> 新节点” 的 Map 映射
  let cur = head
  // 遍历生成hash表（第一次遍历）
  while (cur){
    dic.set(cur,new Node(cur.val))
    cur = cur.next
  }

  cur = head
  // 遍历生成next，random（第二次遍历）
  while (cur){
    dic.get(cur).next = cur.next?dic.get(cur.next):null
    dic.get(cur).random = cur.random?dic.get(cur.random):null
    cur = cur.next
  }
  // 5. 返回新链表的头节点
  return dic.get(head)
};*/

/*拼接 + 拆分*/
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if(!head) return null
  let cur = head
  // 1. 复制各节点，并构建拼接链表
  while (cur) {
    let tmp = new Node(cur.val)
    tmp.next = cur.next
    cur.next = tmp
    cur = tmp.next
  }

  //2. 构建各新节点的 random 指向
  cur = head
  while (cur) {
    if(cur.random){
      cur.next.random = cur.random.next
    }
    cur = cur.next.next
  }

  let res = head.next
  cur = res
  let pre = head
  while (cur.next) {
    pre.next = pre.next.next
    cur.next = cur.next.next
    pre = pre.next
    cur = cur.next
  }
  pre.next = null
  return res
};

