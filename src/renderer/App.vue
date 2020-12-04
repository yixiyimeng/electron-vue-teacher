<template>
	<div ref="app" id="app">
		<keep-alive><router-view /></keep-alive>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'app',
	components: {},
	methods: {},
	created() {
		
	},
	mounted() {
		this.$electron.ipcRenderer.on('will-close', () => {
			this.handleAppWillClose();
			this.$electron.ipcRenderer.send('app-exit');
		});

		window.onunload = () => {
			this.handleAppWillClose();
		};

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
