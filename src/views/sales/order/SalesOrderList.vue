<template>
  <v-container fluid>
    <v-card class="mb-3" elevation="0">
      <v-card-actions>
        <div style="max-width: 200px;" class="mr-2">
          <v-menu ref="menuDateFrom" v-model="menuDateFrom" transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field hide-details v-model="dateFrom" label="From" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
            </template>
            <v-date-picker v-model="dateFrom" color="primary" :max="maxDate" scrollable />
          </v-menu>
        </div>

        <div style="max-width: 200px;" class="mr-2">
          <v-menu ref="menuDateTo" v-model="menuDateTo" transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field hide-details v-model="dateTo" label="To" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
            </template>
            <v-date-picker v-model="dateTo" color="primary" scrollable :max="maxDate" />
          </v-menu>
        </div>

        <v-btn icon color="primary">
          <v-icon size="20">mdi-filter</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <datatable :theader="headers" :tbody="desserts" :actions="actions" />
    
  </v-container>
</template>

<script>
import datatable from "../../../components/DataTable";
  export default {
    components: {
      datatable,
    },
    data () {
      return {
        maxDate: new Date().toISOString().substr(0, 10),
        menuDateFrom: false,
        dateFrom: new Date().toISOString().substr(0, 10),
        menuDateTo: false,
        dateTo: new Date().toISOString().substr(0, 10),
        search: '',
        headers: [
          { text: 'Order Received Date', align: 'start', sortable: false, value: 'orderReceivedDate', class: 'primary white--text' },
          { text: 'Customer', value: 'customer', class: 'primary white--text' },
          { text: 'Grand Total', value: 'grandTotal', class: 'primary white--text' },
          { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text' },
        ],
        desserts: [
          {
            orderReceivedDate: '2021/3/23',
            customer: 'Shyam',
            grandTotal: '100',
          },
          {
            orderReceivedDate: '2021/3/22',
            customer: 'Hari',
            grandTotal: '49',
          },
          {
            orderReceivedDate: '2021/3/20',
            customer: 'Seema',
            grandTotal: '500',
          },
          {
            orderReceivedDate: '2021/3/18',
            customer: 'James',
            grandTotal: '123',
          },
          {
            orderReceivedDate: '2021/3/17',
            customer: 'Sam',
            grandTotal: '75',
          },
          {
            orderReceivedDate: '2021/3/16',
            customer: 'Mira',
            grandTotal: '50',
          },
          {
            orderReceivedDate: '2021/3/15',
            customer: 'Ima',
            grandTotal: '25',
          },
          {
            orderReceivedDate: '2021/3/14',
            customer: 'Maya',
            grandTotal: '87',
          },
          {
            orderReceivedDate: '2021/3/10',
            customer: 'Isha',
            grandTotal: '41',
          }
        ],
        actions: [
          { name: "View" , icon: "mdi-eye", color: 'primary'},
        ],
      }
    }
  }
</script>
