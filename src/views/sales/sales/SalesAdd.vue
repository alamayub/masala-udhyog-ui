<template>
  <v-container class="mt-3" fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-select v-model="customerName" :items="customers" label="Customer" outlined dense hide-details></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="3" md="2">
        <v-menu v-model="menu" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="createdDate" label="From Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker v-model="createdDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table fixed-header height="200" class="mt-3" style="border: 1px solid grey">
          <template v-slot:default>
            <thead>
              <tr>
                <th id="item" class="primary white--text text-center" style="width: 200px">Item</th>
                <th id="stock" class="primary white--text text-center" style="width: 200px">Available Stock</th>
                <th id="rate" class="primary white--text text-center" style="width: 200px">Rate (Rs.)</th>
                <th id="unit" class="primary white--text text-center" style="width: 100px;">Unit</th>
                <th id="quantity" class="primary white--text text-center" style="width: 200px">Quantity</th>
                <th id="amount" class="primary white--text text-center" style="width: 200px">Amount (Rs.)</th>
                <th id="action" class="primary" style="width: 10px">
                  <v-btn icon text color='white' @click="cloneLastTr">
                    <v-icon size='20'>mdi-plus</v-icon>
                  </v-btn>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows" :key="index">
                <td><v-autocomplete v-model="row.particular" outlined hide-details dense :items="items" @change="isItemAlreadySelected(row,index)" /></td>
                <td><v-text-field v-model="row.stock" type="number" class="text-right" dense outlined hide-details readonly /></td>
                <td><v-text-field v-model="row.rate" type="number" class="text-right" dense outlined hide-details @input="getAmount(row)" /></td>
                <td><v-text-field v-model="row.unit" label="Unit" class="text-right" dense outlined hide-details /></td>
                <td><v-text-field v-model="row.quantity" type="number" class="text-right" dense outlined hide-details @input="getAmount(row)" /></td>
                <td><v-text-field v-model="row.amount" type="number" class="text-right" dense outlined hide-details readonly /></td>
                <td>
                  <v-btn class='red' dark icon @click="removeCurrentRow" v-show="rows.length > 1">
                    <v-icon size='20'>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table style="border-bottom: 1px solid grey; border-right: 1px solid grey; border-left: 1px solid grey;">
          <template v-slot:default>
            <tfoot class="text-right grey lighten-4">
            <tr>
              <td></td>
              <td><v-text-field v-model="total" type="number" class="text-right" label="Total (Rs.)" readonly hide-details outlined dense /></td>
              <td><v-text-field v-model="discount" type="number" class="text-right" label="Discount (Rs.)" hide-details outlined dense @input="getGranTotal" /></td>
              <td><v-text-field v-model="tax" type="number" class="text-right" label="TAX (Rs.)" hide-details outlined dense @input="getGranTotal" /></td>
              <td><v-text-field v-model="grandTotal" type="number" class="text-right" label="Grand total (Rs.)" readonly hide-details outlined dense /></td>
              <td></td>
            </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="remarks" outlined label="Remarks (If any)" hide-details></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' class="pt-0">
        <v-card elevation='0' class="px-0">
          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/sales">
              <v-icon left size='20'>mdi-chevron-left</v-icon>
              <span>back</span>
            </v-btn>
            <v-btn color="error" @click="reset">
              <v-icon left size='20'>mdi-cached</v-icon>
              <span>reset</span>
            </v-btn>
            <v-btn  color="success" @click="save">
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
import api from '../../../helper/api'
export default {
  data: () => ({
    customers: [],
    customerName: null,
    menu: false,
    maxDate: new Date().toISOString().substr(0, 10),
    createdDate: new Date().toISOString().substr(0, 10),
    rows: [
      { particular: null, stock: null, rate: null, quantity: null, unit: null, amount: null }
    ],
    remarks: null,
    total: null,
    discount: null,
    tax: null,
    grandTotal: null
  }),
  methods:{
    cloneLastTr() {
      this.rows.push({ particular: null, stock: null, rate: null, quantity: null, unit: null, amount: null })
    },
    removeCurrentRow(index) {
      this.rows.splice(index, 1)
      this.getAmount()
    },
    isItemAlreadySelected(row, index) {
      let x = this.rows.some(a => a.particular === row.particular && index !== this.rows.indexOf(a))
      if(x === true) {
        row.particular = ''
        alert('This item is already selected. Please choose another item.')
      }
    },
    getAmount(row) {
      row.amount = parseFloat( row.rate) * parseFloat(row.quantity)
      this.getTotal()
    },
    getTotal() {
      this.total = 0
      this.rows.forEach(row => {
        this.total += parseFloat(row.amount)
      });
      this.getGranTotal()
    },
    getGranTotal() {
      this.grandTotal = parseFloat(this.total) - parseFloat(this.discount ? this.discount: 0) + parseFloat(this.tax ? this.discount : 0)
    },
    reset () {
      this.$refs.form.reset()
    },
    save() {
      console.log(this.rows)
      this.rows.forEach( row => {
        this.$store.dispatch({
          type: 'save',
          url: 'sales',
          para: { 
            billNumber: Math.floor(Math.random() * 100000),
            particular: row.particular, 
            rate: row.rate, 
            quantity: row.quantity, 
            unit: row.unit,
            customerName: this.customerName, 
            createdDate: this.createdDate, 
            remarks: this.remarks 
          }
        }).then( () => {
          console.log('data added successfully.')
          this.rows =[
            { particular: null, stock: null, rate: null, quantity: null, unit: null, amount: null }
          ]
          this.customerName = null
          this.createdDate =  new Date().toISOString().substr(0, 10)
        }).catch( e => console.log(e))
      });
    },
    async getData() {
      await api.post('vendorAndCustomer/findAll').then( docs => {
        docs.data.body.forEach(doc => this.customers.push(doc.name));
      }).catch( e => console.log(e))
      this.$store.dispatch({ type: 'findAll', url: 'rawMaterial' })
    }
  },
  computed: {
    items() {
      let lists = []
      this.$store.state.lists.forEach( l => lists.push(l.name));
      return lists
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  height: auto !important;
  padding: 6px 16px;
}
</style>