<template>
  <v-container fluid class="px-0 mt-3">
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="From Date"/>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="To Date" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-btn color="primary" dark to="purchase/add">
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
      { text: 'Purchase Bill No.', value: 'id', class: 'primary white--text' },
      { text: 'Bill Date', value: 'purchaseDate' , class: 'primary white--text'},
      { text: 'Vendor', value: 'vendor', class: 'primary white--text' },
      { text: 'Amount (Rs.)', value: 'finalRate', class: 'primary white--text' },
      { text: 'Discount (Rs.)', value: 'discountAmount', class: 'primary white--text'},
      { text: 'Sub Total (Rs.)', value: 'finalRate', class: 'primary white--text'},
      { text: 'Grand Total (Rs.)', value: 'finalRate', class: 'primary white--text'},
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
    }
  },
  mounted() {
    this.$store.dispatch('findAll', 'purchase')
  }
}
</script>