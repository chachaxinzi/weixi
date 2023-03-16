import { mapGetters } from 'vuex'
const mymixins= {
	computed: {
		...mapGetters('cart', ['total'])
	},
	onshow() {
		// this.setbage()
		uni.setTabBarBadge({
			index: 2,
			text: this.total + ''
		})
	},
	methods: {
		
	}
}
export default mymixins