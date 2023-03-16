export default{
	namespaced:true,
	state(){
		return{
			//存储的用户收货地址
			address:JSON.parse(uni.getStorageSync('address') || "{}")
		}
	},
	mutations:{
		//更新收货地址
		updateAddress(state,address){
			state.address=address
			this.commit('address/saveAddress')
		},
		//将地址持久化处理到本地。
		saveAddress(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		addstr(state){
			if (!state.address.provinceName) return
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}