/*
包含n个由action触发去【直接更新状态的方法】的对象
 */
import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODOS, DELETE_COMPLETE_TODOS} from './mutation-types'

export default {
  /**
   * 添加todo的mutation
   * @param state 状态对象，用于更新状态对象
   * @param todo 传过来是包含todo的对象，要用{todo}解构出来
   */
  [ADD_TODO] (state, {todo}) {  // 方法名不是ADD_TODO, 而是add_todo，用中括号标识变量作为函数名
    state.todos.unshift(todo)
  },


  [DELETE_TODO] (state, {index}) {
    state.todos.splice(index, 1)
  },
  [SELECT_ALL_TODOS] (state, {isCheck}) {
    state.todos.forEach(todo => todo.complete = isCheck)
  },

  [DELETE_COMPLETE_TODOS] (state) {
    state.todos = state.todos.filter(todo => !todo.complete)
  }
}
