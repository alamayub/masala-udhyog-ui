<template>
  <v-container class="px-0 mt-3" fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="From Date"/>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="To Date" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-btn color="primary" dark to="return/add">
          <v-icon left size='20'>mdi-plus</v-icon> 
          <span>Create New</span>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
        <DataTable :theader="header" :tbody="lists" :actions="actions"></DataTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from "@/components/DataTable";
import DatePicker from "@/components/DatePicker";

export default {
  components: {
    DataTable,DatePicker
  },
  data:() => ({
    header: [
      { text: 'S.N.', align: 'start', sortable: true, value: 'sno', class: 'primary white--text' },
      { text: 'Return Bill No.', value: 'purchaseBillNo', class: 'primary white--text' },
      { text: 'Return Date', value: 'returnDate' , class: 'primary white--text'},
      { text: 'Vendor', value: 'vendor', class: 'primary white--text' },
      { text: 'Sub Total (Rs.)', value: 'subTotal', class: 'primary white--text' },
      { text: 'Discount (Rs.)', value: 'discount', class: 'primary white--text'},
      { text: 'Total (Rs.)', value: 'total', class: 'primary white--text'},
      { text: 'Vat (Rs.)', value: 'vat', class: 'primary white--text'},
      { text: 'Grand Total (Rs.)', value: 'grandTotal', class: 'primary white--text'},
      { text: 'Actions', value: 'actions', sortable: false , class: 'primary white--text'},
    ],
    actions: [
      { name: 'View', icon: 'mdi-eye', color: 'primary' },
      { name: 'Canceled', icon: 'mdi-close', color: 'red'},
      { name: 'Print', icon: 'mdi-printer', color: 'secondary'}
    ]
  }),
  computed: {
    lists() {
      return this.$store.state.lists
    },
  },
  created() {
    this.$store.dispatch({
      type: 'findAll',
      url: 'purchase/return'
    })
  }
}
</script>