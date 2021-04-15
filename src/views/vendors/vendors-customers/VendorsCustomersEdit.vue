<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.id" dense outlined hide-details label="ID" readonly />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="data.name" dense outlined hide-details label="Full Name*" :rules="[ v => !!v || 'Full Name is required' ]" />
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
export default {
  data: () => ({
    valid: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    data() {
      return this.$store.state.item
    }
  },
  methods: {
    async updateVendorAndCustomer() {
      console.log(this.data)
      if(this.$refs.form.validate()) {
        this.$store.dispatch({
          type: 'update',
          url: 'vendorAndCustomer',
          para: this.data
        }).then( () => {
          console.log('vendor and customer updated successfully.')
          this.goBack()
        }).catch( e => console.log(e))
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.$store.dispatch({
      type: 'findById', 
      url: 'vendorAndCustomer',
      id: this.$route.params.id
    })
  }
}
</script>
