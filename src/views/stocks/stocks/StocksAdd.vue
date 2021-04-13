<template>
  <v-container fluid>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-form ref='form' lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete v-model="stock.name" label="Name" :items="lists" :rules="[ v => !!v || 'Required' ]" />  
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="stock.brand" label="Brand" />  
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="stock.quantity" type="number" label="Quantity" :rules="[ v => !!v || 'Required' ]" />  
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="stock.unit" label="Unit" />  
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field v-model="stock.packet" type="number" label="Packet" :rules="[ v => !!v || 'Required' ]" />  
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="9">
          <v-text-field v-model="stock.description" label="Description" />  
        </v-col>
        <v-col cols="12">
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="goBack">
              <v-icon left size="20">mdi-chevron-left</v-icon>
              <span>back</span>  
            </v-btn>
            <v-btn color="error" @click="reset">
              <v-icon left size="20">mdi-delete</v-icon>
              <span>reset</span>  
            </v-btn>
            <v-btn color="success" @click="save" :disabled='!valid'>
              <v-icon left size="20">mdi-plus</v-icon>
              <span>save</span>  
            </v-btn>
          </v-card-actions>  
        </v-col>
      </v-row>  
    </v-form>
  </v-container>  
</template>

<script>
import api from '../../../helper/api'
export default {
  data: () => ({
    valid: true,  
    stock: {
      name: '',
      brand: '',
      quantity: null,
      unit: '',
      packet: null,
      description: ''  
    },
    lists: []
  }),  
  methods: {
    goBack() {
      this.$router.go(-1)  
    },
    reset() {
      this.$refs.form.reset()  
    },
    async save() {
      if(this.$refs.form.validate()) {
        this.$store.commit('SET_IS_LOADING', true)
        await api.post('finished/product/stock/save', this.stock).then( res => {
          if(res.data.message) alert(res.data.message)
          console.log(res)
          this.reset()
        }).catch( e => console.log(e))
        this.$store.commit('SET_IS_LOADING', false)
      }  
    },
    getLists() {
      this.$store.state.lists.forEach(li => {
        this.lists.push(li.name)
      });
    }
  },
  computed: {
    overlay() {
      return this.$store.state.isLoading
    },
  },
  created() {
    this.$store.dispatch({
      type: 'findAll',
      url: 'rawMaterial'
    }).then( () => {
      this.getLists()
    }).catch( e => console.log(e))
  } 
}
</script>