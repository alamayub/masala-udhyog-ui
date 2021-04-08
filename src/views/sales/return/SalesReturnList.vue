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
      salesList: [
        {
          billNo: 1558,
          productId: '123',
          productName: 'Jeera',
          qty: '5',
          unit: 'Kg',
          returnedBy: 'Shyam',
          purchaseDate:'3/31/2021',
          status: 'Approved'
        },
        {
          billNo: 2998,
          productId: '55',
          productName: 'Dhaniya',
          qty: '2.5',
          unit: 'Kg',
          returnedBy: 'Krishna',
          purchaseDate:'3/25/2021',
          status: 'Cancelled'
        },
        {
          billNo:221,
          productId: '109',
          productName: 'Mirchi',
          qty: '9',
          unit: 'Kg',
          returnedBy: 'Mohan',
          purchaseDate:'2/15/2021',
          status: 'Approved'
        },
        {
          billNo: 225,
          productId: '661',
          productName: 'Mustard Oil',
          qty: '20',
          unit: 'Ltr',
          returnedBy: 'James',
          purchaseDate:'3/8/2021',
          status: 'Approved'
        },
        {
          billNo: 335,
          productId: '339',
          productName: 'Milk',
          qty: '10',
          unit: 'Ltr',
          returnedBy: 'Sam',
          purchaseDate:'1/1/2021',
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