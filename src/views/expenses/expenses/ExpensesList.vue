<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
         <v-menu v-model="fromMenu" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="fromDate" label="From Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker @change="dateValidate" v-model="fromDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0">
        <v-menu v-model="toMenu" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field hide-details v-model="toDate" label="From Date" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
          </template>
          <v-date-picker @change="dateValidate" v-model="toDate" color="primary" :max="maxDate" scrollable />
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3" lg="2" class="pb-0 text-sm-right">
        <v-btn color="primary" dark to="/expenses/add">
          <v-icon left size="20">mdi-plus</v-icon> 
          <span>Create New</span>
        </v-btn>
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
export default {
  components: {
    DataTable,
  },
  data : () => ({
    fromMenu: false,
    toMenu: false,
    fromDate: new Date().toISOString().substr(0, 10),
    toDate: new Date().toISOString().substr(0, 10),
    maxDate: new Date().toISOString().substr(0, 10),
    header: [
      { text: 'S.No', value: 'sno', class: 'primary white--text' },
      { text: 'Name', value: 'particular', class: 'primary white--text' },
      { text: 'Rate', value: 'rate', class: 'primary white--text' },
      { text: 'Quantity', value: 'quantity', class: 'primary white--text' },
      { text: 'Amount', value: 'amount', class: 'primary white--text' },
      { text: 'Actions', value: 'actions', class: 'primary white--text' }
    ],
    actions: [
      { name: 'View', icon: 'mdi-eye', color: 'primary' },
      { name: 'Delete', icon: 'mdi-delete', color: 'red', url: 'expenses' },
    ]
  }),
  computed: {
    body() {
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
        url: 'expenses',
        para: { fromDate: this.fromDate, toDate: this.toDate }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>