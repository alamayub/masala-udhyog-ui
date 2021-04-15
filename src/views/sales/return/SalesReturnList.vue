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
    </v-row>
    <DataTable :theader="headers" :tbody="salesList" :actions="actions" />
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
        { text: 'S.No', value: 'sno', class: 'primary white--text' },
        { text: 'Sales Bill No',   value: 'billNo', class: 'primary white--text' },
        { text: 'Product ID',  value: 'productId', class: 'primary white--text' },
        { text: 'Product Name', value: 'productName', class: 'primary white--text' },
        { text: 'Qty', value: 'qty', class: 'primary white--text' },
        { text: 'Unit', value: 'unit', class: 'primary white--text'},
        { text: 'Returned By', value: 'returnedBy', class: 'primary white--text' } ,
        { text: 'Purchased Date', value: 'purchaseDate', class: 'primary white--text' } ,
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
      url: 'sales/return'
    })
  }
}

</script>