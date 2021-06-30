/*
* 入口JS
* */
import Vue from 'vue'
import App from './App.vue'
/*引入mint-ui标签属性*/
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'


/*引入路由器*/
import router from './router'

/*引入 vuex 的核心管理对象 store*/
import store from './store/index'

/*引入mockjs服务代码*/
import './mock/mockServer'

/*引入过滤器*/
import './filters'

/*注册为全局标签Button ,使用时：<mt-button>*/
Vue.component(Button.name, Button)
/*声明使用VueLazyload图片懒加载*/
// import loading from './common/imgs/loading.gif'
const loading = require('./common/imgs/loading.gif')

Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})




new Vue({
  el:'#app',
  /*注册路由*/
  router,
  /*注册 vuex*/
  store,
  render: h => h(App),
});
