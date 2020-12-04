<template>
	<div class="menu" id="menu"><div>菜单</div></div>
</template>

<script>
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
			const win = this.$electron.remote.getCurrentWindow();
			const pos = win.getPosition();
			pos[0] = pos[0] + pageX - mouseX;
			pos[1] = pos[1] + pageY - mouseY;
			win.setPosition(pos[0], pos[1], true);
		}
	});
}

export default {
	data() {
		return {};
	},
	components: {},
	computed: {},
	mounted() {
		makeDraggable('menu');
	},
	methods: {},

	created() {}
};
</script>

<style lang="less">
.menu {
	background: #f00;
	// -webkit-app-region: drag;
	& > div {
		-webkit-app-region: no-drag;
		width: 100%;
		height: 100%;
	}
}
</style>
