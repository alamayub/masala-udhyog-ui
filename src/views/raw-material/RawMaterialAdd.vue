<template>
  <v-container fluid class="pa-0">
    <v-card-title class="px-0 py-2"> Raw Material Creation </v-card-title>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field @change="isNameExists" v-model="material.name" :rules="[ v => !!v || 'Required' ]" label="Name*" outlined dense hide-details />
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
    async isNameExists() {
      await api.get('/rawMaterial/validate/name?name='+this.material.name)
      .then( res => {
        console.log(res)
        if(res.data.success == true) {
          this.material.name = ''
          alert(res.data.message)
        }
      }).catch( e => console.log(e))
    },
    async save() {
      if(this.$refs.form.validate()) {
        console.log(this.material)
        this.$store.dispatch({
          type: 'save',
          url: 'rawMaterial',
          para: this.material
        }).then( () => {
          console.log('data added successfully.')
          this.reset()
        }).catch( e => console.log(e))
        // if(confirm('Are you sure want to perferm the action?')) {
        //   this.overlay = true
        //   await api.post('/rawMaterial/save', this.material)
        //   .then( (res) => {
        //     console.log(res, 'success')
        //     if(res.data.message) alert(res.data.message)
        //     this.reset()
        //   }).catch( (e) => console.log(e))
        //   this.overlay = false
        // }
      }
    }
  },
};
</script>
