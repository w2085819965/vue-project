import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import "./assets/css/Reset.css"
import "./components/common"
import ToastPlugin from './plugins/toast'
Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/css/swiper.css'

import xxx from "assets/img/common/placeholder.png"

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // loading:require('assets/img/common/placeholder.png') ,//配置占位图片
    loading:xxx
})

//把Vue实例放在Vue的实例上
Vue.prototype.$bus = new Vue()







Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(ToastPlugin)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

/*
*   components
*     common 放置适用性很高的组件 不局限当前的项目
*     content 放置适用当前项目的组件
*
*
*   如果NavBar组件是全局组件    可以少做两件事
*     1.不在Home组件中导入
*     2.不在Home组件中注册
*     如何把common文件夹中的所有组件都注册成全局组件？
*
*
*
*   为什么要做图片懒加载？
*     一次性加载所有图片没必要  因为一屏能够显示图片有限
*     一次性加载所有图片会对首屏的压力比较大
*/