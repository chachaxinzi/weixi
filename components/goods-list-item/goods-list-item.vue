<template>
	<view>
		<!-- <view class="goods-item" v-for="  (item, i) in goodslist2" :key="i" @click="witchFn(item)"> -->
		<view class="goods-item">
			<!-- 复选框 -->

			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="changeRadio"></radio>

			<!-- 左侧图片 -->
			<view class="goods-img">
				<image :src="goods.goods_small_logo"></image>
			</view>

			<!-- 右侧商品信息 -->
			<view class="goods-info">
				<!-- 商品标题描述 -->
				<view class="goods-title">
					<text>{{goods.goods_name}}</text>
				</view>
				<view class="price-count">
					<!-- 商品价格 -->
					<view class="goods-price">¥{{goods.goods_price | money}}</view>
					<!-- 数字选择器 -->
					<uni-number-box v-if="showNumber" @change="changeNumber" :value="goods.goods_count" min="1">
					</uni-number-box>
				</view>
			</view>

			
		</view>
		<!-- </view> -->

	</view>
</template>

<script>
	export default {
		name: "goods-list-item",

		props: {
			goods: {
				type: Object,
				default: {},
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumber: {
				type: Boolean,
				default: false
			},

		},
		filters: {
			money: function(str) {
				return Number(str).toFixed(2)
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// witchFn(item) {
			// 	this.$emit('click', item.goods_id)
			// },
			//监听商品状态的事件
			changeRadio() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			//监听商品数量的事件
			changeNumber(value) {
				this.$emit('number-change', {
					goods_id: this.goods.goods_id,
					goods_count: value + 0
				})
			},
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		border-bottom: 1px solid #efefef;
		align-items: center;
		padding: 10px 10px;

		.goods-img {
			// width: 150px;
			// height: 100px;
			padding-left: 10px;

			image {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-info {
			display: flex;
			//flex: 1;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10px;

			.goods-price {
				color: #C00000;
			}

			.price-count {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 5px;
			}
		}
	}
</style>
