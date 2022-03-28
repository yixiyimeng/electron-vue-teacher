import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import {
	ipcRenderer
} from 'electron'
import BasicLayout from '@/layouts/BasicLayout'
import Toast from './../components/Toast/toast'
Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: BasicLayout,
			redirect: '/login',
			children: [{
				path: '/login',
				name: 'login',
				component: function(resolve) {
					require(['@/views/login/index.vue'], resolve)
				}
			}, {
				path: '/classroom',
				name: 'classroom',
				component: function(resolve) {
					require(['@/views/classroom/index.vue'], resolve)
				}
			}, {
				path: '/teacherroom',
				name: 'teacherroom',
				component: function(resolve) {
					require(['@/views/teacherroom/index.vue'], resolve)
				}
			}, {
				path: '/home',
				name: 'home',
				component: function(resolve) {
					require(['@/views/index/index.vue'], resolve)
				}
			}]
			// children: [
			//   ...recommendRoutes,
			//   ...rankRoutes,
			//   ...myMusicRoutes,
			//   ...playlistRoutes,
			//   ...artistRoutes,
			//   ...albumRoutes,
			//   ...searchRoutes,
			//   ...videoRoutes,
			//   ...userRoutes,
			//   ...settingRoutes,
			//   ...djRoutes,
			//   {
			//     path: '/offline',
			//     name: 'offline',
			//     component: function (resolve) {
			//       require(['@/views/Offline/index.vue'], resolve)
			//     }
			//   }
			// ]
		},
		{
			path: '/mini',
			name: 'mini',
			component: function(resolve) {
				require(['@/views/Mini/index.vue'], resolve)
			}
		},
		{
			name: 'tray',
			path: '/tray',
			component: function(resolve) {
				require(['@/views/Tray.vue'], resolve)
			}
		},
		{
			path: '/menubar',
			name: 'menubar',
			component: function(resolve) {
				require(['@/views/menubar/index.vue'], resolve)
			}
		},
	]
})

router.beforeEach((to, from, next) => {
	next()
})

router.afterEach((to, from) => {
	// if (to.meta && to.meta.title) {
	// 	ipcRenderer.send('set-tray-title', to.meta.title)
	// }
})
export default router
