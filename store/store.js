//定义vuex
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './module/cart'
import address from './module/address'
//注册vuex
Vue.use(Vuex)
const store=new Vuex.Store({
	
	modules:{
		cart:cart,
		address:address,
	}
})
export default store