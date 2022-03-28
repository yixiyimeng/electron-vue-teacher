<template>
	<div class="main-page" id="main-page">首页</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			transitionName: 'slide-right',
			isCloseUpload: false
		};
	},
	components: {},
	computed: {
			
	},
	
	methods: {
		exitApp: function() {}
	},
	watch: {
	},
	created() {
	
	}
};
</script>

<style lang="less">
.theme1 {
	.main-page {
		background: #f00;
	}
}
.theme2 {
	.main-page {
		background: #ff0;
	}
}
</style>
