<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="From Date"/>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="To Date" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-btn color="primary" dark to="/expenses/add"><v-icon>mdi-plus</v-icon> Create New </v-btn>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
        <DataTable :theader="header" :tbody="body" :actions="actions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from '../../../components/DataTable'
import DatePicker from "@/components/DatePicker";
export default {
  components: {
    DataTable,DatePicker
  },
  data : () => ({
    header: [
      { text: 'S.No', value: 'sno', class: 'primary white--text' },
      { text: 'Name', value: 'name', class: 'primary white--text' },
      { text: 'Rate', value: 'rate', class: 'primary white--text' },
      { text: 'Quantity', value: 'quantity', class: 'primary white--text' },
      { text: 'Amount', value: 'amount', class: 'primary white--text' },
      { text: 'Actions', value: 'actions', class: 'primary white--text' }
    ],
    body: [
      { name: 'Electricity Bill', rate: '13', quantity: '250 unit',amount: '3,250' },
      { name: 'Petrol', rate: '100', quantity: '250 L',amount: '25,000' },
      { name: 'Miscellaneous', rate: '', quantity: '',amount: '25,000' },
      { name: 'Food', rate: '', quantity: '',amount: '50,000' },
    ],
    actions: [
      { name: 'View', icon: 'mdi-eye', color: 'primary' },
    ]
  })
}
</script>