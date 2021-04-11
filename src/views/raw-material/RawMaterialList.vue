<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols='12' sm='5' md='3' class="pb-0 pb-sm-3">
        <v-text-field label='Search By Name' outlined dense hide-details />
      </v-col>
      <v-col cols='12' sm='4' md='2' class="pb-0 pb-sm-3">
        <v-text-field label='Search By Code' outlined dense hide-details />
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols='12' sm='3' md='2' class="text-sm-right">
        <v-btn color='primary' to='/raw-material/add'>
          <v-icon left size='20'>mdi-plus</v-icon>
          <span>add item</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' class="pt-0">
        <v-divider></v-divider>
        <DataTable :theader="headers" :tbody="lists" :actions="actions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import api from '../../helper/api';
  export default {
    components: {
      DataTable,
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
          { text: 'S.No', value: 'sno', class: 'primary white--text' },
          { text: 'Name', value: 'name', align: 'start', sortable: false, class: 'primary white--text' },
          { text: 'Code', value: 'code', class: 'primary white--text' },
          { text: 'Brand', value: 'brand', class: 'primary white--text' },
          { text: 'Description', value: 'description', class: 'primary white--text' },
          { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text' },
        ],
        lists: [],
        actions: [
          { name: 'Edit', icon: 'mdi-pencil', color: 'success' },
          { name: 'Delete', icon: 'mdi-delete', url: 'rawMaterial', color: 'red' }
        ]
      }
    },
    methods: {
      async getLists() {
        await api.get('/rawMaterial/findAll')
        .then( res => {
          console.log(res)
          this.lists = res.data.body
        }).catch( e => console.log(e))
      }
    },
    mounted() {
      this.getLists()
      console.log(localStorage.getItem('token'))
    }
  }
</script>
