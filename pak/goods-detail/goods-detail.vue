<template>
	<view class="big-box">
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true">
			<swiper-item class="swiper-item" v-for="(item,i) in goodsDetailList.pics" :key="i" @click="bigImg(i)">
				<image :src="item.pics_mid"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goodsBox">

			<!-- 商品价格 -->
			<view class="goodsPrice">¥{{goodsDetailList.goods_price || ''}}</view>
			<!-- 商品信息 -->
			<view class="goodsInfo">
				<!-- 商品名称信息 -->
				<view class="goodsTitle">{{goodsDetailList.goods_name}}</view>
				<!-- 收藏 -->
				<view class="faiv">
					<!-- 图标 -->
					<uni-icons type="star" size="18"></uni-icons>
					<!-- 收藏 -->
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="money">
				<text>运费：免运费</text>
			</view>
		</view>

		<!-- 商品图片区域 -->
		<view class="goodsImgBox">
			<rich-text :nodes='goodsDetailList.goods_introduce' style="font-size: 0;"></rich-text>
		</view>
		<!-- 商品导航栏 -->
		<view class="footer">
			<uni-goods-nav :options="options" :fill="true" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				//商品的id
				goodsInfo: {
					goods_id: ''
				},
				//商品详情列表
				goodsDetailList: {},
				options: [{
					icon: 'shop',
					text: '店铺',

					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},

		computed: {
			...mapGetters('cart', ['total'])
		},
		onLoad(options) {
			this.goodsInfo.goods_id = options.goods_id
			//console.log(options)

			this.getGoodsDetailList()
		},
		watch: {
			total: {
				handler(newValue) {
					//如果total的值发生变化，这个值赋值给info属性
					const current = this.options.find(item => item.text === '购物车')
					if(current){
						current.info = newValue
					}
					
				},
				immediate:true
			}
		},
		methods: {
			...mapMutations("cart", ['addCart']),
			//获取商品详情的列表
			async getGoodsDetailList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', this.goodsInfo)
				//获取到数据信息，做一下处理。
				//处理底部空白不起效果
				res.message.goods_introduce = res.message.goods_introduce.replace(/webp/g, 'jpg')
				this.goodsDetailList = res.message
			},
			//点击预览轮播图大图
			bigImg(index) {
				let prices = []
				this.goodsDetailList.pics.forEach(img => prices.push(img.pics_big))
				//console.log(prices)
				uni.previewImage({
					current: index,
					urls: prices
				})
			},
			//点击店铺或者购物车按钮
			onClick(e) {
				if (e.content.text === "购物车") {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			//点击加入购物车或者立即购买按钮
			buttonClick(e) {
				const goods = {
					goods_id: this.goodsDetailList.goods_id,
					goods_name: this.goodsDetailList.goods_name,
					goods_count: 1,
					goods_state: true,
					goods_small_logo: this.goodsDetailList.goods_small_logo,
					goods_price: this.goodsDetailList.goods_price
				}
				if (e.content.text === "加入购物车") {
					this.addCart(goods)

					//this.options[1].info=this.total
					//this.saveStorage()
				}

			}
		}
	}
</script>

<style lang="scss">
	.big-box {
		padding-bottom: 50px;
	}

	.swiper {
		height: 750rpx;
		width: 100%;

		.swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.goodsBox {
		padding: 10px;
		padding-right: 10px;
		margin-bottom: 10px;

		.goodsPrice {
			color: #C00000;
			font-weight: 700;
			margin-bottom: 10px;
		}

		.goodsInfo {
			display: flex;
			margin-bottom: 10px;

			.faiv {
				width: 300rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;

				text {
					color: gray;
					font-size: 13px;
				}
			}

		}

		.money {
			font-size: 13px;
			color: gray;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
