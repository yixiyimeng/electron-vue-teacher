import Vue from 'vue'
// 是否在特殊限定范围内
function ifInExact(exactElms, target1) {
	for (let i = 0; i < exactElms.length; i++) {
		let elm = exactElms[i]
		if (elm.contains(target1) || elm === target1) return true
	}
	return false
}

// 是否有特殊限定范围
function ifHasExact(el, exactArea) {
	if (!exactArea) return false
	return document.getElementsByClassName(exactArea)
}
// 点击元素之外隐藏该元素
Vue.directive('clickOutside', {
	bind(el, binding) {
		el.__vueClickOutside__ = function documentHandle(e) {
			let exactArea = binding.arg;
			let exactElms = ifHasExact(el, exactArea)
			// 如果是有特殊限定范围的，则进行判断当前点击是否在 限定范围内
			// if (exactElms) {
			// 	if (ifInExact(exactElms, e.target)) {
			// 		return false
			// 	}
			// 	// 无特殊限定范围，则判断点击是否在默认的指令所在范围内
			// }
			if (el.contains(e.target) || el == e.target||(exactElms&&ifInExact(exactElms, e.target))) {
				return false
			}
			// if (el.contains(e.target)) {
			// 	return false
			// }
			if (binding.expression) {
				binding.value(e)
			}

		}
		document.addEventListener('click', el.__vueClickOutside__, true)
	},
	unbind(el) {
		document.removeEventListener('click', el.__vueClickOutside__, true)
		delete el.__vueClickOutside__
	}
})
