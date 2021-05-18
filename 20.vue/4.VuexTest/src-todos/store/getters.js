/*
包含n个基于state的【getter计算属性方法】的对象模块
 */
export default {

  // 总数量
  totalSize (state) {
    return state.todos.length
  },
  // 完成的数量
  completeSize (state) {
    return state.todos.reduce((preTotal, todo) => preTotal + (todo.complete?1:0) ,0)
  },

  // 判断是否需要全选
  /**
   *
   * @param state
   * @param getters 默认传了的参数，用来获取当前getters
   * @returns {boolean}
   */
  isAllSelect (state, getters) {
    return getters.completeSize===getters.totalSize && getters.completeSize>0
  }
}
