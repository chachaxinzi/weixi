<template>
	<view>
		<!-- 滚动页面容器 -->
		<view class="scroll-box">
			<!-- 左侧滚动盒子 -->
			<scroll-view :scroll-y='true' :style="{height:wh+'px'}" class="scroll-left-box">
				<view :class="['scroll-left-item',i==active ? 'active' : '']" v-for="(item,i) in scrollList" :key="i"
					@click="activeChange(i)">
					<view class="left-container">{{item.cat_name}}</view>
				</view>
			</scroll-view>

			<!-- 右侧滚动盒子 -->
			<scroll-view :scroll-y='true' :style="{height:wh+'px'}" :scroll-top="screenTop">

				<view class="right-item" v-for="(item2, i2) in scroll_lv2" :key="i">
					<view class="lv2-title">/ {{item2.cat_name}} /</view>
					<view class="lv3-list">
						<view class="lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="()=>goGoodsList(item3)">
							<image class="lv3-item-img" src="/static/wjk.jpeg"></image>
							<text> {{item3.cat_name}}</text>
						</view>
					</view>
				</view>


			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//窗口的可使用高度
				wh: 0,
				//分类的数组列表,
				scrollList: [],
				//二级滚动列表
				scroll_lv2: [],
				//控制左侧滚动区域高亮的显示
				active: 0,
				//滚动位置
				screenTop:0

			}
		},
		onLoad() {
			this.getHeigth()
			this.getScrollList()
		},
		methods: {
			//获取页面可使用的高度
			getHeigth() {
				uni.getSystemInfo({
					success: (res) => {
						this.wh = res.windowHeight
						return

					}
				})
			},
			//获取页面滚动数据
			async getScrollList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				this.scrollList = res.message
				this.scroll_lv2 = res.message[0].children
				//console.log(res.message[0].children)
			},
			//控制左侧滚动栏的高亮显示
			activeChange(index) {
				this.active = index
				this.scroll_lv2 = this.scrollList[index].children
				//当我点击左侧菜单选项时，要将右侧的滚动位置重置为初始值
			this.screenTop=	this.screenTop==0 ? 1 :0
			},
			//点击三级列表跳转至商品列表页面
			goGoodsList(item3){
				uni.navigateTo({
					url:'/pak/goods-list/goods-list?cid='+item3.cat_id
				})
			}

		}
	}
</script>

<style lang="scss">
	.scroll-box {
		display: flex;

		.scroll-left-box {
			width: 120px;
			text-align: center;

			.scroll-left-item {
				// height: 30px;

				line-height: 40px;
				background-color: #efefef;

				&.active {
					position: relative;
					background-color: #fff;

					&::before {
						content: '';
						display: inline-block;
						width: 3px;
						height: 20px;
						position: absolute;
						top: 50%;
						left: 0;
						background-color: #C00000;
						transform: translateY(-50%);

					}
				}
			}

			.left-container {
				font-size: 13px;
				// padding: 15px 0;
			}

		}

	}

	.right-item {
		
		.lv2-title {
			text-align: center;
			margin: 10px 0;
		}

		.lv3-list {
			display: flex;
			flex-wrap: wrap;
		

			.lv3-item {
				width: 33.33%;
				display: flex;
				margin-bottom: 10rpx;
				flex-direction: column;
				align-items: center;
			}

			.lv3-item-img {
				width: 120rpx;
				height: 120rpx;
				margin-bottom: 10rpx;
			}
			text{
				font-size: 13px;
			
			}
		}
	}
</style>
