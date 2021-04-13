import Vue from 'vue'
import Vuex from 'vuex'
import api from '../helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    isLoading: false,
    lists: [],
    item: {}
  },
  mutations: {
    SET_DRAWER: (state, payload) => state.drawer = payload,
    SET_IS_LOADING: (state, payload) => state.isLoading = payload,
    SET_LISTS: (state, payload) => state.lists = payload,
    SET_ITEM: (state, payload) => state.item = payload
  },
  actions: {
    async findAll({ commit },{ url , para }) {
      commit('SET_IS_LOADING', true)
      if(para != null) {
        await api.get(`${url}/findAll?fromDateStr=${para.fromDate}&toDateStr=${para.toDate}`,).then( res => {
          console.log(res)
          commit('SET_LISTS', res.data.body)
        }).catch( e => console.log(e))
      } else {
        await api.get(`${url}/findAll`).then( res => {
          console.log(res)
          commit('SET_LISTS', res.data.body)
        }).catch( e => console.log(e))
      }
      commit('SET_IS_LOADING', false)
    },
  }
})






/*
console.log(para)
      commit('SET_IS_LOADING', true)
      await api.get(`${url}/findAll`, para).then( res => {
        console.log(res)
        commit('SET_LISTS', res.data.body)
      }).catch( e => console.log(e))
      commit('SET_IS_LOADING', false)*/




/*
async findAll({ commit },{ url , para }) {
      console.log(para)
      commit('SET_IS_LOADING', true)
      if(para != null) {
        await api.get(`${url}/findAll?fromDateStr=${para.fromDate}&toDateStr=${para.toDate}`,).then( res => {
          console.log(res)
          commit('SET_LISTS', res.data.body)
        }).catch( e => console.log(e))
      } else {
        await api.get(`${url}/findAll`).then( res => {
          console.log(res)
          commit('SET_LISTS', res.data.body)
        }).catch( e => console.log(e))
      }
      commit('SET_IS_LOADING', false)
    },*/