<template>
	<!-- 这是有商品的情况所需渲染的结构 -->
	<view class="cart-container" v-if="total!==0">

		<!-- 地址栏 -->
		<view class="address-box">
			<my-address></my-address>
		</view>

		<!-- 购物车标题 -->
		<view class="cart-title">
			<!-- 图标 -->
			<uni-icons type="shop-filled" size="18"></uni-icons>
			<!-- 购物车文本 -->
			<text>购物车</text>
		</view>

		<!-- 购物车商品项 -->
		<uni-swipe-action>
			<view class="goods-list" v-for="(item,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="delGoods(item)">
					<goods-list-item :goods="item" :show-radio="true" :show-number="true" @radio-change="updateState"
						@number-change="updateCount">
					</goods-list-item>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>

		<!-- 购物车结算 -->
		<settle></settle>
	</view>
	<!-- 这是购物车没有商品所需要渲染的结构 -->
	<view class="null-box" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text>空空如也~</text>
	</view>
</template>

<script>
	//import mymixin from '../../mixins/mixins.js'
	import {
		mapGetters,
		mapState,
		mapMutations
	} from "vuex"
	export default {
		//mixins:[mymixin],
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#C00000"
					}
				}]
			}
		},
		computed: {
			...mapGetters('cart', ['total']),
			...mapState('cart', ['cart'])
		},
		watch: {
			total() {
				this.setBage()
			}
		},
		onShow() {
			this.setBage()
		},
		methods: {
			...mapMutations('cart', ['updateGoods_State', 'updateGoods_Count', 'delGoodsItem']),

			setBage() {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			},
			//更改商品选中状态
			updateState(goods) {
				//console.log(goods)
				this.updateGoods_State(goods)
			},
			//更改商品的数量
			updateCount(goods) {
				//console.log(goods)
				this.updateGoods_Count(goods)

			},
			//删除该商品
			delGoods(item) {
				this.delGoodsItem(item.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		//padding-left: 5px;
		padding: 10px 0 10px 5px;
		border-bottom: 1px solid #efefef;

		text {
			margin-left: 5px;
		}
	}
	.null-box{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		//justify-content: center;
		padding-top:50%;
		align-items: center;
		.empty-img{
			width: 100px;
			height: 100px;
		}
		text{
			font-size: 13px;
			color: gray;
			margin-top: 10px;
		}
	}

	// .address-box{
	// 	height: 70px;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;

	// }
</style>
