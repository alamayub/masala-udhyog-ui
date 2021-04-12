<template>
  <v-container fluid>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    this is vendor customer edit page  
  </v-container>  
</template>

<script>
import api from '../../../helper/api'
export default {
  data: () => ({
    overlay: false,
    data: {}
  }),
  methods: {
    async getVendorOrCustomer() {
      this.overlay = true
      await api.get('vendorAndCustomer/findById?id='+this.$route.params.id)
      .then( res => {
        console.log(res)
        this.data = res.data.body
      }).catch( e => console.log(e))
      this.overlay = false
    }
  },
  created() {
    this.getVendorOrCustomer()
  }
}
</script>
