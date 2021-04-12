<template>
  <v-container fluid class="fill-height">
    <v-card elevation='0'>
      <v-card-title class="px-0 pt-0">Add Vendor or Supplier</v-card-title>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row align="center">
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.name" label="Full Name*" :rules="[v => !!v || 'Name is required']" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.code" label="Code" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.address" label="Address" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.phone" label="Mobile Number" type="number" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.panvat" label="Pan / VAT" type="number" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-select v-model="user.type" :items="types" :rules="[v => !!v || 'Type is required']" label="Account Type*" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-select v-model="user.enable" :items="enabled" :rules="[v => !!v || 'Status is required']" label="Status*" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="user.info" label="Additional Information" hide-details outlined dense required />
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
            <v-btn color="error" @click="reset">
              <v-icon left size="20">mdi-cached</v-icon>
              <span>reset</span>
            </v-btn>
            <v-btn color="success" @click="addVendorAndCustomer" :disabled="!valid">
              <v-icon left size="20">mdi-content-save-move-outline</v-icon>
              <span>save</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import api from  '../../../helper/api'
export default {
  data: () => ({
    valid: true,
    user: {
      name: '',
      code: '',
      address: '',
      email: '',
      phone: null,
      panvat: null,
      type: 'Customer',
      enable: true,
      remarks: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    types: [ 'Customer', 'Vendor', 'Both' ],
    enabled: [ true, false ],
  }),

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async addVendorAndCustomer () {
      if(this.$refs.form.validate()) {
        if(confirm('Are you sure want to perform the action?')) {
          await api.post('/vendorAndCustomer/save', this.user)
          .then( res => {
            if(res.data.message) alert(res.data.message)
            this.reset()
          }).catch( e => console.log(e))
        }
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>