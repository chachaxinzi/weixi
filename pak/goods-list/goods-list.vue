<template>
	<view>

		<!-- 商品数据列表 -->
		<view class="goods-list">
			<view v-for="(item,i) in goodslist2" :key="i" @click="goGoodsDetail(item.goods_id)">
				<goods-list-item :goods="item" ></goods-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求商品列表传递的参数对象
				query: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10,
				},
				//返回数据的总条数
				total: 0,
				//返回数据列表-商品列表
				goodsList: [],
				//自定义商品列表
				goodslist2: [{
					goods_id: 395,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 394,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 393,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 392,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 391,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 390,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 389,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 388,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}, {
					goods_id: 387,
					goods_small_logo: 'http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg',
					goods_name: '400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）',
					goods_price: '14'
				}],
				//节流阀
				isload: false, //为true时表示正在请求中，为false表示请求完成可继续请求
			}
		},

		onLoad(options) {
			this.query.query = options.query || ''
			this.query.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isload = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.query)
				if (res.meta.status !== 200) return uni.showToast({
					title: "数据响应失败！",
					icon: 'none'
				})
				//数据请求成功或者失败关闭下拉窗口
				cb && cb()
				//请求完成
				this.isload = false
				this.goodsList = [...this.goodsList, ...res.message.goods]
				//console.log(res)
				this.total = res.message.total

			},

			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pak/goods-detail/goods-detail?goods_id=' + id
				})
			}

		},
		//监听用户下拉事件
		onPullDownRefresh() {
			this.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.isload = false
			this.getGoodsList(() => uni.stopPullDownRefresh())
			//应该关闭下拉窗口
		},
		//用户触底事件
		onReachBottom() {
			//当有请求时，退出，没有请求时可继续加页请求
			if (this.isload) return
			//当y页码值*每页数值大于等于总返回数据那么应该停止请求
			if (this.query.pagenum * this.query.pagesize >= this.total) return uni.showToast({
				title: '没有更多数据了！'

			})
			this.query.pagenum++
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">


</style>
