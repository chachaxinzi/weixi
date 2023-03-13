<template>
	<view>

		<!-- 搜索框 -->
		<view class="searchPage">
			<uni-search-bar @input="input" :radius="25" cancelButton="none" ref="search"></uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="suggest" v-for="(item,index) in suggestList" @click="()=>goGoodsDetail(item)"
			v-if="suggestList.length !== 0" :key="index">
			<text> {{item.goods_name}}</text>
			<uni-icons type="forward" size="17"></uni-icons>
		</view>
		<!-- 搜索历史 -->
		<view class="history" >
			<view class="history-title" >
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="18" @click="delHistory"></uni-icons>
			</view>
			<view class="history-list" >
				<view class="history-item" v-for="(item,idx) in historys" :key="idx">
					<uni-tag :text="item" type="default" @click="goGoodslist(item)"></uni-tag>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//搜索的关键词
				keyWords: '',
				//定时器
				timer: null,
				//搜索建议列表
				suggestList: [],
				//搜索历史列表
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("keywords")||"[]")
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		},
		methods: {
			//触发搜索事件
			input(value) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyWords = value
					//利用定时器做了防抖处理。在这里面判断输入框的内容是否为空
					this.getSearchList()

					//console.log(value)
				}, 500)
			},
			//获取搜索建议列表
			async getSearchList() {
				if (this.keyWords.trim().length === 0) {
					this.suggestList = []
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyWords
				})
				this.suggestList = res.message
				this.getHistoryList()
			},
			//点击搜索建议跳转商品详情页。
			goGoodsDetail(item) {
				uni.navigateTo({
					url: "/pak/goods-detail/goods-detail?goods_id=" + item.goods_id
				})
			},
			//搜索关键词存入搜索历史
			getHistoryList() {
				//if(this.keyWords.trim().length===0) return
				//this.historyList.push(this.keyWords)
				//处理历史记录列表的唯一化。
				let set = new Set(this.historyList)
				set.delete(this.keyWords)
				set.add(this.keyWords)
				this.historyList = Array.from(set)
				//将历史记录存入本地存储
				uni.setStorageSync("keywords", JSON.stringify(this.historyList))
			},
			//清空搜索记录
			delHistory(){
				//本地清空
				uni.setStorageSync("keywords",[])
				//页面存储清空
				this.historyList=[]
			},
			//点击历史标签跳转至商品列表页面
			goGoodslist(keywords){
				uni.navigateTo({
					url:'/pak/goods-list/goods-list?query='+keywords
				})
			}



		}
	}
</script>

<style lang="scss">
	.searchPage {
		position: sticky;
		top: 0;
		.uni-searchbar {
			background-color: #C00000;
		}
	}

	.suggest {
		padding: 10px 6px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;

		text {
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			font-size: 13px;
		}
	}

	.history {
		padding: 10px 10px 0;

		.history-title {
			display: flex;
			justify-content: space-between;

			text {
				font-size: 13px;
			}
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.history-item {
				margin-top: 10px;
				margin-right: 6px;

			}
		}


	}
</style>
