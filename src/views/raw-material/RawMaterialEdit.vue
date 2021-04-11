<template>
  <v-container fluid class="pa-0">
    <v-card-title class="px-0 py-2"> Raw Material Updation </v-card-title>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="material.name" :rules="[ v => !!v || 'Required' ]" label="Name*" outlined dense hide-details />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="material.code" label="Code" outlined dense hide-details />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="material.brand" label="Brand" outlined dense hide-details />
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="material.description" label="Description" outlined dense hide-details />
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="px-0 pt-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="goBack">
        <v-icon left size="20">mdi-chevron-left</v-icon>
        <span>back</span>
      </v-btn>
      <v-btn color="success" @click="update" :disabled="!valid">
        <v-icon left size="20">mdi-update</v-icon>
        <span>update</span>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import api from '../../helper/api'
export default {
  data() {
    return {
      valid: true,  
      material: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async update() {
      if(this.$refs.form.validate()) {
        if(confirm('Are you sure want to perform the action?')) {
          await api.put('/rawMaterial/update', this.material)
          .then( (res) => {
            console.log(res)
            console.log(res.data.message)
            if(res.data.message) alert(res.data.message)
            this.goBack()
          }).catch( (e) => console.log(e))
        }
      }
    },
    async getItem() {
      await api.get('/rawMaterial/findById?id='+this.$route.params.id)
      .then( (res) => {
        console.log(res)
        this.material = res.data.body
      }).catch( (e) => console.log(e))  
    }
  },
  created() {
    this.getItem()
  }
};
</script>
