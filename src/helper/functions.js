import api from './api'
export default {
  async findAll(para) {
    await api.get(`${para}/findAll`).then( res => {
      console.log(res)
      console.log('body',res.data.body)
      // this.$store.commit('SET_LISTS_ACTION', res.data.body)
    }).catch( e => console.log(e))
  }
}