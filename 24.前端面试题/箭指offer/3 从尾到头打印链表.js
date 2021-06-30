/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    /*栈*/
    const stack = []
    let node = head
    while (node) {
        stack.push(node.val)
        node = node.next
    }
    const result = []
    while (stack.length){
        result.push(stack.pop())
    }
    return result
}
module.exports = {
    printListFromTailToHead : printListFromTailToHead
};
