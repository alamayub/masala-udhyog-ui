<template>
  <v-container fluid>
    <v-form ref='form' lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete v-model="stock.name" label="Name" :items="['Item1', 'Item2', 'Item3']" :rules="[ v => !!v || 'Required' ]" />  
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
    }
  }),  
  methods: {
    goBack() {
      this.$router.go(-1)  
    },
    reset() {
      this.$refs.form.reset()  
    },
    save() {
      this.$refs.form.validate()  
    }
  }  
}
</script>