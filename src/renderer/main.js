import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import './plugins/andt-design-vue'
import './plugins/vue-lazyload'
import './plugins/infinite-loading'
import './filters'
import './directives'
import createdInit from './core/createdInit'
import './styles/index.less'
import {
	errorCaptured
} from './utils/assist'

Vue.prototype.$db = db
Vue.prototype.$errorCaptured = errorCaptured
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
import websocket from './store/websocketStore'
Vue.prototype.$websocket = websocket;

// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: {
		App
	},
	router,
	store,
	created() {
		createdInit()
	},
	template: '<App/>'
}).$mount('#app')
