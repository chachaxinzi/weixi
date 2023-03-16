export default {
	namespaced: true,
	state() {
		return {
			//这里存储的数据需要有goods_id,goods_count,goods_price,goods_state,goods_name,goods_goods_small_logo
			cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
			//这个是购物车总数量

		}
	},
	mutations: {
		//添加商品到购物车
		addCart(state, goods) {
			//goods是调用这个方法要传递的参数，就是商品的信息，goods_id,goods_count,goods_price,goods_state,goods_name,goods_small_logo
			const ishave = state.cart.find(item => item.goods_id === goods.goods_id)
			if (ishave) {
				//表明购物车里面有此商品，
				ishave.goods_count++
			} else {
				//表明购物车里面没有这个商品
				state.cart.push(goods)
			}
			this.commit('cart/saveStorage')

		},
		//将购物车数据存储到本地
		saveStorage(state) {
			uni.setStorageSync("cart", JSON.stringify(state.cart))
		},
		//更改商品的选中状态
		updateGoods_State(state, goods) {
			const findReust = state.cart.find(item => item.goods_id === goods.goods_id)
			if (findReust) {
				findReust.goods_state = goods.goods_state
				this.commit('cart/saveStorage')
			}

		},
		//更改商品的数量
		updateGoods_Count(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count

				this.commit('cart/saveStorage')
			}
		},
		//删除该商品
		delGoodsItem(state, goods_id) {
			state.cart = state.cart.filter(item => item.goods_id !== goods_id)
			this.commit('cart/saveStorage')
		},
		//更改商品的选中状态
		updateGoodsState(state, newState) { //newstate是一个布尔值
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('cart/saveStorage')
		}
	},
	getters: {
		//购物车数字徽标数量
		total(state) {
			//只要加入购物车就要循环遍历里面的数量给总数量total
			// let total = 0
			// state.cart.forEach(item => total += item.goods_count)
			// return total
			// 第二种方式更加简洁
			return state.cart.reduce(((total, item) => total += item.goods_count), 0)
		},
		//购物车结算数量
		settleCount(state) {
			return state.cart.filter(item => item.goods_state).reduce(((total, item) => total += item.goods_count), 0)
		},
		//购物车结算总价
		PriceSum(state) {
			return state.cart.filter(item => item.goods_state).reduce(((total,item) => total += (item.goods_count * item.goods_price)), 0)
		}
	}
}
