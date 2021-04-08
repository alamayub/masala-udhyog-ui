<template>
  <v-container fluid>
    <v-row>
      <v-col cols='12' sm='6' md='3' class="pb-0 pb-sm-3">
        <v-text-field label='Search By Name' outlined dense hide-details />
      </v-col>
      <v-col cols='12' sm='6' md='3' class="pb-0 pb-sm-3">
        <v-text-field label='Search By Phone' outlined dense hide-details />
      </v-col>
      <v-col cols='12' sm='6' md='3' class="pb-0 pb-sm-3">
        <v-text-field label='Search By Address' outlined dense hide-details />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols='12' sm='6' md='3'>
        <v-card class="pa-0 elevation-0">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn color='primary' to='/vendors-customers/add'>
              <v-icon left size='20'>mdi-plus</v-icon>
              <span>create new</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols='12' class="pt-0">
        <v-divider></v-divider>
        <DataTable :theader="headers" :tbody="users" :actions="actions" />
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import DataTable from '../../../components/DataTable'
export default {
  components: {
    DataTable
  },
  data: () => ({
    headers: [
      { text: 'S. No', align: 'start', sortable: false, value: 'sno', class: 'primary white--text' },
      { text: 'Name', value: 'name', class: 'primary white--text' },
      { text: 'Type', value: 'type', class: 'primary white--text' },
      { text: 'Phone', value: 'phone', class: 'primary white--text' },
      { text: 'Address', value: 'address', class: 'primary white--text' },
      { text: 'Status', value: 'status', class: 'primary white--text' },
      { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text' },
    ],
    users: [
      { name: 'Vhanu Enterprises', type: 'Vendor', phone: '051-6235295', address: 'DC Universe', status: 'Active' },
      { name: 'Vhanu Palace', type: 'Customer', phone: '051-523625', address: 'DC Universe', status: 'Active' },
      { name: 'Wonder Woman', type: 'Vendor', phone: 2454564, address: 'DC Universe', status: 'In-Active' },
      { name: 'Dark Sheider', type: 'Customer', phone: 8677687, address: 'DC Universe', status: 'In-Active' },
      { name: 'Bat Man', type: 'Customer', phone: 2453456, address: 'DC Universe', status: 'Active' },
      { name: 'Wonder Woman', type: 'Vendor', phone: 2454564, address: 'DC Universe', status: 'In-Active' },
      { name: 'Dark Sheider', type: 'Customer', phone: 8677687, address: 'DC Universe', status: 'In-Active' },
      { name: 'Bat Man', type: 'Customer', phone: 2453456, address: 'DC Universe', status: 'Active' }
    ],
    actions: [
      { name: 'View', icon: 'mdi-eye', color: 'primary' },
      { name: 'Edit', icon: 'mdi-pencil', color: 'success' },
      { name: 'Delete', icon: 'mdi-delete', color: 'red' }
    ]
  }),
  methods: {
    view(item) {
      console.log(item)
    }
  }
}
</script>