<template>
	<view>
		my
		
	</view>
</template>

<script>
import {mapGetters} from "vuex"
	export default {
	
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters('cart',['total'])
		},
		onShow() {
			this.setBage()
		},
		watch: {
			total() {
				this.setBage()
			}
		},
		methods: {
			setBage(){
				uni.setTabBarBadge({
					index:2,
					text:this.total+''
				})
			}
		}
	}
</script>

<style>

</style>
