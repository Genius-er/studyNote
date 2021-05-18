/*
包含n个用于【间接更新状态的方法】的对象模块
 */
import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODOS, DELETE_COMPLETE_TODOS} from './mutation-types'

export default {

  /**
   * 处理添加todo的action
   * @param commit 固定写法（应该是组件dispatch时自动传递的第一个参数是一个对象，里面有个commit方法）
   * @param todo 组件传过来的数据
   */
  addTodo ({commit}, todo) {
    // 提交一个comutation请求
    commit(ADD_TODO, {todo}) // 传递给mutation的是一个【包含数据的对象】
  },



  deleteTodo ({commit}, index) {
    commit(DELETE_TODO, {index})
  },

  selectAll ({commit}, isCheck) {
    commit(SELECT_ALL_TODOS, {isCheck})
  },

  deleteCompleteTodos ({commit}) {
    commit(DELETE_COMPLETE_TODOS)
  }
}
