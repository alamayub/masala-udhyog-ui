<template>
  <v-container class="mt-3 pa-0" fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-menu v-model="menuDate" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="purchase.purchaseDate" label="Purchase Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker v-model="purchase.purchaseDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
      </v-col>
    </v-row>

    <v-form ref="form" lazy-validation v-model="valid">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" class="pb-0">
          <v-autocomplete v-model="purchase.particular" label="Item Name" outlined :items="items" :rules="[ v => !!v || 'Please select an item.' ]" />
        </v-col>
        <v-col cols="12" sm="3" lg="2" class="pb-0">
          <v-text-field v-model="purchase.finalRate" type="number" label="Rate" outlined :rules="[ v => !!v || 'Please enter rate of item.' ]" />
        </v-col>
        <v-col cols="12" sm="3" lg="2" class="pb-0">
          <v-text-field v-model="purchase.quantity" type="number" label="Quantity" outlined :rules="[ v => !!v || 'Please enter quantity of item.' ]" />
        </v-col>
        <v-col cols="12" sm="3" lg="2" class="pb-0">
          <v-text-field v-model="purchase.discountAmount" type="number" label="Discount amount" outlined :rules="[ v => !!v || 'Please enter discount amount.' ]" />
        </v-col>
        <v-col cols="12" sm="3" lg="2">
          <v-text-field v-model="purchase.unitOfMeasurement" label="Unit of Measurment" outlined :rules="[ v => !!v || 'Please enter unit.' ]" />
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-textarea v-model="purchase.remarks" outlined label="Remarks (If any)"></v-textarea>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols='12' class="py-0">
        <v-card elevation='0' class="pa-0">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goBack">
              <v-icon left size='20'>mdi-chevron-left</v-icon>
              <span>back</span>
            </v-btn>
            <v-btn color="error" @click="reset">
              <v-icon left size='20'>mdi-cached</v-icon>
              <span>reset</span>
            </v-btn>
            <v-btn  color="success" @click="save" :disabled='!valid'>
              <v-icon left size='20'>mdi-content-save-move-outline</v-icon>
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
    purchase: { particular: '', finalRate: null, quantity: null, unit: null, discountAmount: null, unitOfMeasurement: null, purchaseDate: new Date().toISOString().substr(0, 10), remarks: null },

    // Date
    menuDate: false,
    maxDate: new Date().toISOString().substr(0, 10),
  }),
  methods:{
    goBack() {
      this.$router.go(-1)
    },
    reset() {
      this.$refs.form.reset()
    },
    async save() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch({
          type: 'save',
          url: 'purchase',
          para: this.purchase
        }).then(() => {
          console.log('added successfully!')
          this.reset()
        }).catch(() => {
          console.log('Opps! something went wrong.')
        });
      }
    }
  },
  computed: {
    items() {
      let lists = []
      this.$store.state.lists.forEach( l => {
        lists.push(l.name)
      });
      return lists
    },
  },
  created() {
    this.$store.dispatch({ 
      type: 'findAll', 
      url: 'rawMaterial'
    })
  }
}
</script>
