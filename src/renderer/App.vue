<template>
	<div ref="app" id="app" :class="theme">
		<div class="changeTheme" @click="changeTheme">换肤</div>
		<keep-alive><router-view /></keep-alive>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'app',
	data() {
		return {
			theme: 'theme1'
		};
	},
	components: {},
	methods: {
		changeTheme() {
			this.theme = this.theme == 'theme1' ? 'theme2' : 'theme1';
		}
	},
	created() {},
	mounted() {
		this.$electron.ipcRenderer.on('will-close', () => {
			this.$electron.ipcRenderer.send('app-exit');
		});

		window.onunload = () => {};

		window.onoffline = () => {
			this.handleNetworkChange(
				{
					name: '网易云音乐',
					title: '网易云音乐',
					message: '请检查您的网络连接'
				},
				false
			);
		};
		window.ononline = () => {
			this.handleNetworkChange({
				name: '网易云音乐',
				title: '网易云音乐',
				message: '网络连接成功'
			});
		};
	}
};
</script>
<style lang="less">
	

</style>