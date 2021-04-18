<template>
  <v-container class="pa-2"  fluid>
    <v-tabs>
      <v-tab>Basic Info</v-tab>
      <v-tab>Items</v-tab>
      <v-tab-item>
        <v-row>
          <v-col cols="12" sm="6">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                <tr><td>Customer: </td><td><b>{{ item.customerName }}</b></td></tr>
                <tr><td>Bill Date: </td><td><b>{{ item.createdDate }}</b></td></tr>
                <tr><td>Sales Bill No.: </td><td><b>{{ item.billNumber }}</b></td></tr>
                <tr><td>Rate: </td><td><b>{{ item.rate }}</b></td></tr>
                <tr><td>Quantity: </td><td><b>{{ item.quantity }}</b></td></tr>
                <tr><td>Amount(Rs.)</td><td>{{ item.rate * item.quantity }}</td></tr>
                <tr><td>Remarks: </td><td><b>{{ item.remarks }}</b></td></tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" sm="6">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                <tr><td>Created Date: </td><td><b>1/1/2021 12:00:00</b></td></tr>
                <tr><td>Created By: </td><td><b>Frank Doe</b></td></tr>
                <tr><td>Modified Date: </td><td><b></b></td></tr>
                <tr><td>Modified By: </td><td><b></b></td></tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <DataTable :theader="header" :tbody="body"></DataTable>
      </v-tab-item>
    </v-tabs>
    <v-row>
      <v-col cols='12'>
        <v-btn color="primary" to="/sales">
          <v-icon left size='20'>mdi-chevron-left</v-icon>
          <span>back</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  components: {
    DataTable
  },
  data:() => ({
    header: [
      { text: 'S.N.', align: 'start', sortable: true, value: 'sno', class: 'primary white--text' },
      { text: 'Item', value: 'item', class: 'primary white--text' },
      { text: 'Qty.', value: 'quantity', class: 'primary white--text'},
      { text: 'Unit.', value: 'unit', class: 'primary white--text'},
      { text: 'Rate', value: 'rate', class: 'primary white--text' },
      { text: 'Amount (Rs.)', value: 'amount', class: 'primary white--text' }
    ],
    body: [
      {
        sno: 1,
        item: 'Pen',
        quantity: '1',
        unit: 'Box',
        rate: '1,000',
        amount: '1,000'
      },
      {
        sno: 2,
        item: 'Copy',
        quantity: '25',
        unit: 'Dozen',
        rate: '200',
        amount: '5,000'

      },
      {
        sno: 3,
        item: 'Pencil',
        quantity: '1',
        unit:'Box',
        rate: '2,500',
        amount: '2,500'
      },
      {
        sno: 4,
        item: 'Book',
        quantity: '5',
        unit: 'Pcs',
        rate: '500',
        amount: '2,500'
      },
      {

        sno: 5,
        item: 'Instrument Box',
        quantity: '5',
        unit: 'Pcs',
        rate: '500',
        amount: '2,500'

      }
    ]
  }),
  computed: {
    item() {
      return this.$store.state.item
    }
  },
  created() {
    this.$store.dispatch({
      type: 'findById', 
      url: 'sales',
      id: this.$route.params.id
    })
  }
}
</script>
