var MaxQueue = function() {
  this.que = []
  this.maxQue = []
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  if(!this.que.length){
    return -1
  }
  return Math.max(...this.que)
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  this.que.push(value)
  /*弹出比较小的数*/
  while (!this.maxQue.length && this.maxQue[this.maxQue.length-1]<value){
    this.maxQue.pop()
  }
  this.maxQue.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if(!this.que.length){
    return -1
  }
  let tmp = this.que.shift()
  if(tmp === this.maxQue[0]){
    this.maxQue.shift()
  }
  return tmp
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
