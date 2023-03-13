<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box" :style="{'background-color':bgc}" @click="goSearch">
			<view class="search-input" :style="{'border-radius':radius+'px'}">
				<uni-icons type="search" size="18"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		props: {
			bgc: {
				type: String,
				default: '#C00000'
			},
            radius:{
				type:Number,
				default:50
			}
		},
		data() {
			return {

			};

		},
		methods:{
			goSearch(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		// background-color: #C00000;

		.search-input {
			height: 36px;
			width: 100%;
			background-color: #fff;
			// border-radius: 25px;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				margin-left: 3px;
			}
		}
	}
</style>
