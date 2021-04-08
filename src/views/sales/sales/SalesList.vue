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
      salesList: [
        {
          sno: 1,
          billNo: '123',
          salesDate: '3/26/2021',
          customer: 'James Frank',
          subTotal: '10,000',
          discount: '1,000',
          total: '9,000',
          vat: '500',
          grandTotal: '9,500',
          status: 'Approved'
        },
        {
          sno: 2,
          billNo: '124',
          salesDate: '3/25/2021',
          customer: 'Sam Doe',
          subTotal: '9,000',
          discount: '500',
          total: '8,500',
          vat: '0',
          grandTotal: '8,500',
          status: 'Approved'
        },
        {
          sno: 3,
          billNo: '125',
          salesDate: '3/24/2021',
          customer: 'Tao Li',
          subTotal: '10,000',
          discount: '1,000',
          total: '9,000',
          vat: '500',
          grandTotal: '9,500',
          status: 'Cancelled'
        },
        {
          sno: 4,
          billNo: '126',
          salesDate: '3/23/2021',
          customer: 'John Doe',
          subTotal: '5000',
          discount: '0',
          total: '5000',
          vat: '500',
          grandTotal: '5,500',
          status: 'Approved'
        },
        {
          sno: 5,
          billNo: '127',
          salesDate: '3/22/2021',
          customer: 'Myra Si',
          subTotal: '10,000',
          discount: '1,000',
          total: '9,000',
          vat: '500',
          grandTotal: '9,500',
          status: 'Cancelled'
        },
      ],
      actions: [
        { name: "View" , icon: "mdi-eye", color: 'primary'},
      ],
    }

  }
}

</script>