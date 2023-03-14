import App from './App'
//第三方网络请求包
 import {$http} from "@escook/request-miniprogram"
 uni.$http = $http
 $http.baseUrl = 'https://www.uinav.com'
 $http.beforeRequest = function (options) {
   // do somethimg...
   wx.showLoading({
	   "title":'数据加载中...'
   })
 }
 $http.afterRequest = function () {
   wx.hideLoading()
 }
//注册组件
import search from './components/search/search'
import icon from './uni_modules/uni-icons/components/uni-icons/uni-icons'
import searchpage from './uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar'
import tag from "./uni_modules/uni-tag/components/uni-tag/uni-tag"
import goodsItem from './components/goods-list-item/goods-list-item'
Vue.component('search',search)
Vue.component('uni-icons',icon)
Vue.component('uni-search-bar',searchpage)
Vue.component('uni-tag',tag)
Vue.component('goods-list-item',goodsItem)
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif