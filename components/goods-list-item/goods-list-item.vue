<template>
	<view>
		<view class="goods-item" v-for="  (item, i) in goodslist2" :key="i" @click="witchFn(item)">
			<!-- 左侧图片 -->
			<view class="goods-img">
				<image :src="item.goods_small_logo"></image>
			</view>
			<!-- 右侧商品信息 -->
			<view class="goods-info">
				<!-- 商品标题描述 -->
				<view class="goods-title">
					<text>{{item.goods_name}}</text>
				</view>
				<!-- 商品价格 -->
				<view class="goods-price">¥{{item.goods_price | money}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"goods-list-item",
		props:{
			goodslist2:{
				type:Array,
				default:[]
			}
		},filters:{
			money:function(str){
			return	Number(str).toFixed(2)
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			witchFn(item){
				this.$emit('click',item.goods_id)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	border-bottom: 1px solid #efefef;
	padding: 10px 0;
	.goods-img{
		width:100px;
		height: 100px;
		padding-left: 10px;
		image{
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.goods-info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10px;
		.goods-price{
			color: #C00000;
		}
	}
}
</style>