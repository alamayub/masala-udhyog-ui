<template>
  <v-container fluid class="pa-0">
    <v-card-title class="px-0 py-2"> Raw Material Creation </v-card-title>
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
      <v-btn color="error" @click="reset">
        <v-icon left size="20">mdi-cached</v-icon>
        <span>reset</span>
      </v-btn>
      <v-btn color="success" @click="save" :disabled="!valid">
        <v-icon left size="20">mdi-content-save-move-outline</v-icon>
        <span>save</span>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import api from '../../helper/api';
export default {
  data() {
    return {
      valid: true,  
      material: {
        name: '',
        code: '',
        brand: '',
        description: ''
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    reset() {
      this.$refs.form.reset()
    },
    save() {
      if(this.$refs.form.validate()) {
        console.log(this.material)
        // const headers = {
        //   'Cache-Control': null,
        //   'X-Requested-With': null,
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // }
        // const headers = {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*',
        // }
        // axios.use(cors())
        // axios.options('http://localhost:8082/',cors())
        api.post('/rawMaterial', this.material)
        .then( () => console.log('success')).catch( (e) => console.log(e))
      }
    }
  },
};
</script>
