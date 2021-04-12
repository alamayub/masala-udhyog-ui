import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    isLoading: false,
    lists: []
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_LISTS(state, payload) {
      state.lists = payload
    }
  }
})
