<template>
  <v-container class="mt-3" fluid>
    <v-row>
      <v-col class="pb-0" cols="12" sm="4" md="3">
        <v-text-field label="Enter bill Number" dense outlined hide-details />
      </v-col>
        <v-col class="pb-0" cols="12" sm="4" md="3">
          <v-select :items="vendor" label="Vendor" outlined dense hide-details></v-select>
        </v-col>
        <v-col class="pb-0" cols="12" sm="3" md="2">
          <v-select :items="billType" label="Bill Type" outlined dense hide-details></v-select>
        </v-col>
        <v-col class="pb-0" cols="12" sm="3" md="2">
          <v-select :items="taxInclusiveExclusive" label="Tax Inclusive/Exclusive" hide-details outlined dense></v-select>
        </v-col>
        <v-col class="pb-0" cols="12" sm="3" md="2">
          <DatePicker labelName="Return Date"/>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-simple-table fixed-header height="205" class="mt-3" style="border: 1px solid grey">
          <template v-slot:default>
            <thead>
            <tr>
              <th id="item" class="primary white--text text-center">Item</th>
              <th id="stock" class="primary white--text text-center" style="width: 200px">Purchased Rate (Rs.)</th>
              <th id="rate" class="primary white--text text-center" style="width: 200px">Return Rate (Rs.)</th>
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
              <td>
                <v-autocomplete v-model="row.item" outlined hide-details dense :items="items" @change="isItemAlreadySelected(row,index)" />
              </td>
              <td>
                <v-text-field type="number" class="text-right" dense outlined hide-details readonly v-model="row.purchaseRate"   />
              </td>
              <td><v-text-field type="number" class="text-right" v-model="row.quantity" dense outlined hide-details @input="getAmount(row)" /></td>
              <td><v-text-field type="number" class="text-right" v-model="row.returnRate" dense outlined hide-details @input="getAmount(row)" /></td>
              <td><v-text-field type="number" class="text-right" v-model="row.amount" dense outlined hide-details readonly /></td>
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
        <v-textarea outlined label="Remarks (If any)" rows="2" hide-details></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' class="py-0">
        <v-card elevation='0' class="pa-0">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goBack">
              <v-icon left size='20'>mdi-chevron-left</v-icon>
              <span>back</span>
            </v-btn>
            <v-btn color="error">
              <v-icon left size='20'>mdi-cached</v-icon>
              <span>reset</span>
            </v-btn>
            <v-btn  color="success">
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

import DatePicker from "@/components/DatePicker";

export default {
  components: {
    DatePicker
  },
  data: () => ({
    vendor: ['Medilanee Pvt. Ltd', 'Natural Pvt. Ltd', 'Clark Pvt.Ltd', 'Himalayan Nepal pvt. Ltd'],
    billType: ['VAT', 'PAN'],
    taxInclusiveExclusive: ['Inclusive', 'Exclusive'],
    items: ['Pen', 'Copy', 'Pencil', 'Book'],
    rows: [
      { particular: '',purchaseRate: null, returnRate: null,quantity: null, amount: null, returnDate: new Date().toISOString().substr(0, 10)}
    ],
    total: null,
    discount: null,
    tax: null,
    grandTotal: null
  }),
  methods:{
    cloneLastTr() {
      this.rows.push({ item: '', purchaseRate: null, returnRate: null , quantity: null, amount: null})
    },
    removeCurrentRow(index) {
      this.rows.splice(index, 1)
    },
    isItemAlreadySelected(row, index) {
      let x = this.rows.some(a => a.item === row.item && index !== this.rows.indexOf(a))
      if(x === true) {
        row.item = ''
        alert('This item is already selected. Please choose another item.')
      }
    }
    ,
    getAmount(row) {
      row.amount = row.returnRate * row.quantity
      this.getTotal()
    },
    getTotal() {
      this.total = 0
      this.rows.forEach(row => {
        this.total += row.amount
      });
      this.getGranTotal()
    },
    getGranTotal() {
      this.grandTotal = parseFloat(this.total ? this.total: 0) - parseFloat(this.discount ? this.discount: 0) + parseFloat(this.tax ? this.tax: 0)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>