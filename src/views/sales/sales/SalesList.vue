<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-menu v-model="menuFromDate" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="fromDate" label="From Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker @change="dateValidate" v-model="fromDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-menu v-model="menuToDate" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="toDate" label="To Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker @change="dateValidate" v-model="toDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
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
export default {
  components: {
    DataTable,
  },
  data () {
    return {
      menuFromDate: false,
      maxDate: new Date().toISOString().substr(0, 10),
      fromDate: new Date().toISOString().substr(0, 10),
      menuToDate: false,
      toDate: new Date().toISOString().substr(0, 10),
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
        { name: "View" , icon: "mdi-eye", color: 'primary' },
        // { name: "Delete" , icon: "mdi-delete", color: 'red', url: 'sales' },
      ],
    }

  },
  computed: {
    salesList() {
      return this.$store.state.lists
    }
  },
  methods: {
    dateValidate() {
      if(this.fromDate == null || this.toDate == null) alert('Dates can not be null.')
      else {
        if(this.fromDate > this.toDate) {
          this.fromDate = null
          alert('From date can not be greater than to date.')
        }
        else if(this.toDate < this.fromDate) {
          this.toDate = null
          alert('To date can not be smaller than from date.')
        }
        else this.getData()
      }
    },
    getData() {
      this.$store.dispatch({
        type: 'findAll',
        url: 'sales',
        para: { fromDate: this.fromDate, toDate: this.toDate }
      })
    }
  },
  created() {
    this.getData()
  }
}

</script>