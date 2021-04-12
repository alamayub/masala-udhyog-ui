import Vue from 'vue'
import Vuex from 'vuex'
import api from '../helper/api'

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
  },
  actions: {
    async findAll({ commit }, para) {
      await api.get(`${para}/findAll`).then( res => {
        console.log(res)
        commit('SET_LISTS', res.data.body)
      }).catch( e => console.log(e))
    }
  }
})
