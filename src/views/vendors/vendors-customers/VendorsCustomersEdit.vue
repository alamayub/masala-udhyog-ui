<template>
  <v-container fluid>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.id" dense outlined hide-details label="ID" readonly />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.name" dense outlined hide-details label="Full Name*" :rules="[ v => !!v || 'Full name is required' ]" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.address" dense outlined hide-details label="Address" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.email" :rules="emailRules" dense outlined hide-details label="Email" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.mobile" type="number" dense outlined hide-details label="Mobile" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.remarks" dense outlined hide-details label="Remarks" />
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols='12'>
        <v-card elevation='0' class="px-0">
          <v-card-actions class="px-0 pt-3">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goBack">
              <v-icon left size="20">mdi-chevron-left</v-icon>
              <span>back</span>
            </v-btn>
            <v-btn color="success" @click="updateVendorAndCustomer" :disabled="!valid">
              <v-icon left size="20">mdi-update</v-icon>
              <span>update</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
import api from '../../../helper/api'
export default {
  data: () => ({
    overlay: false,
    data: {},
    valid: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
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
    },
    async updateVendorAndCustomer() {
      console.log(this.data)
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getVendorOrCustomer()
  }
}
</script>
