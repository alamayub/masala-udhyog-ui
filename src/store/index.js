import Vue from 'vue'
import Vuex from 'vuex'
import api from '../helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    table_load: false,
    overlay: false,
    lists: [],
    item: {}
  },
  mutations: {
    SET_DRAWER: (state, payload) => state.drawer = payload,
    SET_TABLE_LOAD: (state, payload) => state.table_load = payload,
    SET_OVERLAY: (state, payload) => state.overlay = payload,
    SET_LISTS: (state, payload) => state.lists = payload,
    SET_ITEM: (state, payload) => state.item = payload
  },
  actions: {
    async findAll({ commit },{ url , para }) {
      commit('SET_TABLE_LOAD', true)
      await api.post(`${url}/findAll`, para).then( res => {
        console.log(res)
        commit('SET_LISTS', res.data.body)
      }).catch( e => console.log(e))
      commit('SET_TABLE_LOAD', false)
    },
    async save({ commit }, { url, para }) {
      if(confirm('Are you sure want to perferm the action?')) {
        commit('SET_OVERLAY', true)
        await api.post(`/${ url }/save`, para)
        .then( (res) => {
          console.log(res, 'success')
          if(res.data.message) alert(res.data.message)
        }).catch( (e) => console.log(e))
        commit('SET_OVERLAY', false)
      }
    },
    async findById({ commit }, { url, id }) {
      commit('SET_OVERLAY', true)
      await api.get(`${url}/findById?id=${id}`)
      .then( res => {
        console.log(res)
        commit('SET_ITEM', res.data.body)
      }).catch( e => console.log(e))
      commit('SET_OVERLAY', false)
    },
    async update({ commit }, { url, para }) {
      if(confirm('Are you sure want to perform the action?')) {
        commit('SET_OVERLAY', true)
        await api.put(`${url}/update`, para)
        .then( (res) => {
          console.log(res)
          console.log(res.data.message)
          if(res.data.message) alert(res.data.message)
        }).catch( (e) => console.log(e))
        commit('SET_OVERLAY',false)
      }
    }
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