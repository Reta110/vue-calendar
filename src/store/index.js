import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {
      title: 'Un momento por favor',
      state: false,
    },
  },
  mutations: {
    showLoading(state, payload) {
      state.loading.title = payload.title
      state.loading.state = true
    },
    hideLoading(state) {
      state.loading.state = false
    },
  },
  actions: {},
  modules: {},
})
