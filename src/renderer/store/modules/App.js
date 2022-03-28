import ls from 'store'
const state = {
	primaryColor: '',
	stuNameState: false, //显示或者隐藏签到学生名单
	rollCallState: false, //显示或者隐藏点名学生名单
}

const getters = {

}

const mutations = {
	CHANGE_COLOR(state, color) {
		state.primaryColor = color
		ls.set('DEFAULT_COLOR', color)
	},
	SET_STUNAME_STATE(state, flag) {
		state.stuNameState = flag
	},
	TOGGLE_STUNAME_STATE(state) {
		state.stuNameState = !state.stuNameState
	},
	SET_ROLLCALL_STATE(state, flag) {
		state.rollCallState = flag
	},
}

const actions = {
	toggleStuNameState({
		commit
	}) {
		commit('TOGGLE_STUNAME_STATE')
	},
	setStuNameState({
		commit
	}, flag) {
		commit('SET_STUNAME_STATE', flag)
	},
	setRollCallState({
		commit
	}, flag) {
		commit('SET_ROLLCALL_STATE', flag)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
