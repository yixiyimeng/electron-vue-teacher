<template>
	<div class="main-page" id="main-page" style="overflow: hidden;">
		首页
		<transition :name="transitionName">
			<router-view class="Router"></router-view>
		</transition>
		<div class="exitappWin animated fadeIn" v-if="isexit">
			<div class="confirm">
				<div>
					<div class="title">是否关闭程序？</div>
					<div class="buttonGroup">
						<a href="javascript:;" @click="isexit = !isexit">暂不</a>
						<a href="javascript:;" class="comfirmBtn" @click="exitApp">关闭</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import drag from 'electron-drag';
function makeDraggable(el) {
	if (typeof el === 'string') {
		el = document.querySelector(el);
	}
	console.log('el', el);
	try {
		if (drag.supported) {
			drag(el);
		} else {
			makeDraggableFallback(el);
		}
	} catch (ex) {
		makeDraggableFallback(el);
	}
}

function makeDraggableFallback(el) {
	// 方案一
	// el.style['-webkit-app-region'] = 'drag';

	// 方案二
	let dragging = false;
	let mouseX = 0;
	let mouseY = 0;
	el.addEventListener('mousedown', e => {
		dragging = true;
		const { pageX, pageY } = e;
		mouseX = pageX;
		mouseY = pageY;
	});
	window.addEventListener('mouseup', () => {
		dragging = false;
	});
	window.addEventListener('mousemove', e => {
		if (dragging) {
			const { pageX, pageY } = e;
			const win = require('electron').remote.getCurrentWindow();
			const pos = win.getPosition();
			pos[0] = pos[0] + pageX - mouseX;
			pos[1] = pos[1] + pageY - mouseY;
			win.setPosition(pos[0], pos[1], true);
		}
	});
}
function touchEvent() {
	let dragging = false;
	let mouseX = 0;
	let mouseY = 0;
	function load() {
		var oInp = document.getElementById('main-page');
		oInp.addEventListener('touchstart', touch, false);
		oInp.addEventListener('touchmove', touch, false);
		oInp.addEventListener('touchend', touch, false);

		function touch(event) {
			event.stopPropagation();
			var event = event || window.event;
			switch (event.type) {
				case 'touchstart':
				dragging = true;
				mouseX = event.touches[0].pageX;
				mouseY = event.touches[0].pageY;
					// oInp.innerHTML = 'Touch started (' + event.touches[0].pageX + ',' + event.touches[0].pageY + ')';
					console.log('Touch started (' + event.touches[0].pageX + ',' + event.touches[0].pageY + ')')
					break;
				case 'touchend':
				dragging = false;
					// oInp.innerHTML = '<br>Touch end (' + event.changedTouches[0].pageX + ',' + event.changedTouches[0].pageY + ')';
					break;
				case 'touchmove':
					// event.preventDefault();
					// oInp.innerHTML = '<br>Touch moved (' + event.touches[0].pageX + ',' + event.touches[0].pageY + ')';
					if (dragging) {
						const { pageX, pageY } = event.touches[0];
						const win = require('electron').remote.getCurrentWindow();
						const pos = win.getPosition();
						pos[0] = pos[0] + pageX - mouseX;
						pos[1] = pos[1] + pageY - mouseY;
						win.setPosition(pos[0], pos[1], true);
					}
					console.log('<br>Touch moved (' + event.touches[0].pageX + ',' + event.touches[0].pageY + ')')
					break;
			}
		}
	}
	window.addEventListener('load', load, false);
}
export default {
	data() {
		return {
			transitionName: 'slide-right',
			isexit: false,
			isCloseUpload: false
		};
	},
	components: {},
	computed: {
		...mapState(['isShowbg', 'isminimizeAppState', 'directBroadcastCode']),
		alertCont() {
			return this.$websocket.getters.onEvent();
		}
	},
	mounted() {
		// makeDraggable('.main-page');
		touchEvent()
	},
	methods: {
		exitApp: function() {},
	},
	watch: {
		//使用watch 监听$router的变化
		$route(to, from) {
			//如果to索引大于from索引,判断为前进状态,反之则为后退状态
			if (to.meta.index > from.meta.index) {
				//设置动画名称
				this.transitionName = 'slide-left';
			} else {
				this.transitionName = 'slide-right';
			}
		},

		alertCont: {
			handler(newName, oldName) {
				if (newName && newName != oldName) console.log('123343newName:' + JSON.stringify(newName));
			},
			immediate: true
		}
	},
	created() {
		const _this = this;
		/* 主进程 通知是否关闭软件 */
		_this.$electron.ipcRenderer.on('isexitApp', event => {
			_this.isexit = true;
		});
		//在页面加载时读取localStorage里的状态信息
		localStorage.getItem('messageStore') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('messageStore'))));
	/* 联系websocket */
	// this.$websocket.dispatch('WEBSOCKET_INIT',"ws://192.168.0.89:10101/ws")
	}
};
</script>

<style></style>
