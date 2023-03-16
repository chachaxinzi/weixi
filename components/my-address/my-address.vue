<template>
	<view>
		<!-- v-if="JSON.stringify(address)==='{}'" -->
		<view class="address-btn" v-if="JSON.stringify(address)==='{}'">
			<!-- 添加地址按钮 -->
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<!-- 渲染收货地址 -->
		<view class="address-box" v-else @click="chooseAddress">
			<!-- 第一行 -->
			<view class="row1">
				<view class="username">收件人：{{address.userName}}</view>
				<view class="iphone">
					<view class="mobile">电话:{{address.telNumber}}</view>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
			<!-- 第二行 -->
			<view class="row2">
				<view class="address-title">收件地址：</view>
				<view class="address-text">{{addstr}}</view>
			</view>

		</view>


		<!-- 底部边框 -->
		<image src="../../static/cart_border@2x.png" class="boder-bottom"></image>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapGetters
	} from "vuex"
	export default {
		name: "my-address",
		data() {
			return {
				//address: {}
			};
		},
		computed: {
			...mapState('address', ['address']),
			...mapGetters('address', ['addstr'])
		},
		methods: {
			...mapMutations('address', ['updateAddress']),
			async chooseAddress() {
				try {
					const res = await uni.chooseAddress()
					if (res.errMsg === "chooseAddress:ok") {
						//表明获取用户地址成功，把数据存在vuex的地址
						this.updateAddress(res)
					}
				} catch (err) {
					console.log(err)
				}
			}

		}
	}
</script>

<style lang="scss">
	.address-btn {
		height: 70px;
		display: flex;
		// flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.boder-bottom {
		width: 100%;
		height: 3px;
	}

	.address-box {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		height: 70px;
		justify-content: center;

		.row1 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			.iphone {
				display: flex;
			}
		}

		.row2 {
			display: flex;
			align-items: center;

			.address-title {
				white-space: nowrap;
			}
		}
	}
</style>
