<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :circular="true" class="swiper" >
			<swiper-item v-for="(item ,i) in swiperList" :key="i" class="swiper-item">
				<navigator :url="'../../pak/goods-detail/goods-detail?goods_id='+ item.goods_id">
					<image :src="item.image_src" class="swiper-item-img"> </image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类区域 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="gotoCate(item.name)">
				<image :src="item.image_src">
				</image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor">
			<!-- 每一层 -->
			<view class="floor-item" v-for="(item,i) in floorList
			 ":key="i">
			 <!-- 楼层标题 -->
				<view class="floor-item-title">
					<image :src="item.floor_title.image_src" mode=""></image>
				</view>
				<!-- 楼层图片 -->
				<view class="floor-item-img">
					<!-- 左侧大图片 -->
					<navigator class="floor-left-box" :url="item.product_list[0].url" >
						<image mode="widthFix" :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx' }"></image>
					</navigator>
					<!-- 右侧小图片 -->
					<view class="floor-right-box">
						<navigator  v-for="(item,i ) in item.product_list" :key="i" v-if="i!==0" :url="item.url">
		                 <image mode="widthFix" :src="item.image_src"  :style="{width:item.image_width +'rpx'}"></image>
					    </navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据列表
				swiperList:[],
				//导航数据列表
				navList:[],
				//楼层数据列表
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
		async	getSwiperList(){
		const {data:res}=	 await	uni.$http.get('/api/public/v1/home/swiperdata')
		//处理返回的数据
		
		this.swiperList=res.message
			},
		async	getNavList(){
			const {data:res}=	await uni.$http.get('/api/public/v1/home/catitems')
			this.navList=res.message
			},
			//点击第一个导航图标跳转到分类页面
			gotoCate(name){
				if(name==="分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
				
			},
			//获取楼层数据
		async getFloorList(){
			const {data:res}=	await uni.$http.get('/api/public/v1/home/floordata')
			//处理楼层数据，新加跳转的url
			res.message.forEach(item=>{
				item.product_list.forEach(item1=>{
					item1.url='/pak/goods-list/goods-list?'+item1.navigator_url.split('?')[1]
				})
			})
			this.floorList=res.message
			}
		}
	}
</script>

<style lang="scss">
	.swiper{
		height: 330rpx;
		.swiper-item,{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				he: 100%;
			}
		}
	}
	.nav{
		display: flex;
		margin: 15px 0;
		justify-content: space-around;
		.nav-item image{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor{
		padding-left: 10rpx;
	}
	.floor-item-title image{
		height: 60rpx;
		width:  100%;
	}
	.floor-item-img{
		display: flex;
	}
	.floor-right-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

</style>
