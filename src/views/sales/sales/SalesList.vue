<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="From"/>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <DatePicker labelName="To" />
      </v-col>
      <v-spacer />
      <v-col cols='12' sm='3' class="text-right">
        <v-btn  color="primary" to="/sales/add">
          <v-icon left size='20'> mdi-plus</v-icon>
          <span>Create New</span>
        </v-btn>
      </v-col>
    <v-col cols="12">
    <v-divider></v-divider>
    <DataTable :theader="headers" :tbody="salesList" :actions="actions" />
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from "../../../components/DataTable";
import DatePicker from "@/components/DatePicker";
export default {
  components: {
    DataTable,DatePicker,
  },
  data () {
    return{
      headers: [
        { text: 'S.No',   value: 'sno', class: 'primary white--text' },
        { text: 'Sales Bill No',  value: 'billNo', class: 'primary white--text' },
        { text: 'Bill Date', value: 'salesDate', class: 'primary white--text' },
        { text: 'Customer', value: 'customer', class: 'primary white--text' },
        { text: 'Amount(Rs)', value: 'subTotal', class: 'primary white--text'},
        { text: 'Discount(Rs)', value: 'discount', class: 'primary white--text' } ,
        { text: 'Sub Total(Rs)', value: 'total', class: 'primary white--text'},
        { text: 'VAT(Rs)', value: 'vat', class: 'primary white--text' },
        { text: 'Grand Total(Rs)',  value: 'grandTotal', class: 'primary white--text' },
        { text: 'Status',   value: 'status', class: 'primary white--text' },
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text' },
      ],
      actions: [
        { name: "View" , icon: "mdi-eye", color: 'primary'},
      ],
    }

  },
  computed: {
    salesList() {
      return this.$store.state.lists
    }
  },
  created() {
    this.$store.dispatch({
      type: 'findAll',
      url: 'sales'
    })
  }
}

</script>