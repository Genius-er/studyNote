import Vue from 'vue'
/*使用 moment 插件方式*/
import moment from 'moment'
// import format from 'date-fns/format'

// 自定义过滤器
Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatStr)
  // return format(value, formatStr)
})
