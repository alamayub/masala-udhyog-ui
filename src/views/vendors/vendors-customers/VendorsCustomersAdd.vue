<template>
  <v-container fluid class="fill-height">
    <v-card elevation='0'>
      <v-card-title class="px-0 pt-0">Add User</v-card-title>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row align="center">
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="name" label="Full Name" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="code" label="Code" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="address" label="Address" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="email" label="E-mail" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="phone" label="Mobile Number" type="number" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="panvat" label="Pan / VAT" type="number" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-select v-model="type" :items="types" :rules="[v => !!v || 'Type is required']" label="Type" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="creadit_limit" label="Creadit Limit" type="number" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-select v-model="enable" :items="enabled" :rules="[v => !!v || 'Enable is required']" label="Enable" hide-details outlined dense required />
        </v-col>
        <v-col cols='12' sm='6' md='4' lg='3'>
          <v-text-field v-model="info" label="Additional Information" hide-details outlined dense required />
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
            <v-btn color="success" @click="addUser" :disabled="!valid">
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
export default {
  data: () => ({
    valid: true,
    name: '',
    code: '',
    address: '',
    email: '',
    phone: 0,
    panvat: 0,
    type: null,
    types: [ 'Customer', 'Vendor', 'Both' ],
    creadit_limit: 0,
    enable: null,
    enabled: [ true, false ],
    info: ''
  }),

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    addUser () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>