<template>
	<view>
		<!-- 结算盒子 -->
		<view class="settle-box">
			<!-- 全选按钮 -->
			<label class="radio">
				<radio :checked="isCheck" color="#C00000"  @click="SelectAllBtn"/><text>全选</text>
			</label>
			<!-- 总价 -->
			<view class="total">总价：¥{{PriceSum}}</view>
			<!-- 结算按钮 -->
			<view class="settle-btn">结算（{{settleCount}}）</view>
			
		</view>
	</view>
</template>

<script>
	import { mapGetters} from "vuex"
	import { mapMutations} from "vuex"
	export default {
		name:"settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('cart',['settleCount','total','PriceSum']),
			//当total的值和结算的值全等，就表示全选按钮应该被选中
			isCheck(){
				return this.total===this.settleCount
			}
		},
		methods:{
			...mapMutations('cart',['updateGoodsState']),
			//点击全选按钮
			SelectAllBtn(){
				this.updateGoodsState(!this.isCheck)
			}
		}
		
	}
</script>

<style lang="scss">
	.settle-box{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 10px;
		background-color: #fff;
		.radio{}
		.total{}
		.settle-btn{
			width: 120px;
			background-color: #C00000;
			line-height: 50px;
			color: #fff;
			text-align: center;
			
		}
	}

</style>