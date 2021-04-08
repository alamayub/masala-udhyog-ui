<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="3" md="2" class="pb-0">
        <DatePicker labelName="Order Date"/>
      </v-col>

      <v-col cols='12' class="pb-0">
        <v-simple-table height="300" fixed-header style="border: 1px solid grey; border-top-right-radius: 4px !important; border-top-left-radius: 4px !important;">
          <template v-slot:default>
            <thead>
            <tr>
              <th id="name" class="primary white--text text-center">Name Of Expenses</th>
              <th id="rate" class="primary white--text text-center">Rate</th>
              <th id="qnt" class="primary white--text text-center">Quantity</th>
              <th id="amount" class="primary white--text text-center">Amount</th>
              <th id="act" class="primary white--text">
                <v-btn icon text color="white" @click="cloneLastTr">
                  <v-icon size="20">mdi-plus</v-icon>
                </v-btn>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td class="my-1"><v-text-field v-model="row.item" dense outlined hide-details /></td>
              <td><v-text-field v-model="row.rate" type="number" dense outlined hide-details /></td>
              <td><v-text-field v-model="row.quantity" type="number" dense outlined hide-details @input="getAmount(row)" /></td>
              <td><v-text-field v-model="row.amount" type="number" readonly dense outlined hide-details /></td>
              <td>
                <v-btn class='red' dark icon @click="removeCurrentRow(i)" v-show="rows.length > 1">
                  <v-icon size='20'>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-simple-table class="footer-table">
          <template v-slot:default>
            <tfoot class="grey lighten-4">
              <tr>
                <td class="title">Total</td>
                <v-spacer />
                <td class="d-flex justify-end align-center my-1"><v-text-field style="max-width: 250px;" v-model="total" label="Total" readonly hide-details outlined dense /></td>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols='12' class="pb-0">
        <v-textarea outlined rows="3" label="Remarks" hide-details></v-textarea>
      </v-col>

      <v-col cols='12'>
        <v-card elevation='0' class="pa-0">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn color="primary">
              <v-icon left size='20'>mdi-chevron-left</v-icon>
              <span>back</span>
            </v-btn>
            <v-btn color="error">
              <v-icon left size='20'>mdi-cached</v-icon>
              <span>reset</span>
            </v-btn>
            <v-btn color="success">
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
    rows: [
      { item: '', rate: null, quantity: null, amount: null }
    ],
    total: 0
  }),
  methods:{
    cloneLastTr() {
      this.rows.push({ item: '', rate: null, quantity: null, amount: null })
    },
    removeCurrentRow(index) {
      this.rows.splice(index, 1)
      this.getTotal()
    },
    isItemAlreadySelected(data, i) {
      let x = this.rows.some(a => a.item === data.item && i !== this.rows.indexOf(a))
      console.log(x)
      if(x == true) {
        data.item = ''
        alert('This item is already selected. Please choose another item.')
      }
    },
    getAmount(d) {
      d.amount = parseFloat(d.rate ? d.rate : 0) * parseFloat(d.quantity ? d.quantity : 0)
      this.getTotal()
    },
    getTotal() {
      this.total = 0
      this.rows.forEach(d => {
        this.total += parseFloat(d.amount)
      });
      console.log(this.total)
    },
  }
}
</script>

<style>
.v-input__slot { min-height: 36px !important; }
.v-input { font-size: 13px !important; }
.v-data-table { border-radius: 0 !important; }
.footer-table {
  border-bottom: 1px solid grey; 
  border-right: 1px solid grey;
  border-left: 1px solid grey;
  border-bottom-left-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}
</style>