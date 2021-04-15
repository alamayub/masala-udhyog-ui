<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr><td>Name: </td><td><b>{{ data.name }}</b></td></tr>
              <tr><td>Code: </td><td><b>{{ data.id }}</b></td></tr>
              <tr><td>Address: </td><td><b>{{ data.address }}</b></td></tr>
              <tr><td>Phone: </td><td><b>{{ data.phone }}</b></td></tr>
              <tr><td>Mobile: </td><td><b>{{ data.mobile }}</b></td></tr>
              <tr><td>E-mail: </td><td><b>{{ data.email }}</b></td></tr>
              <tr><td>PAN/VAT</td><td>1685965</td></tr>
              <tr><td>Credit Limit In Rs.</td><td>10,00,000</td></tr>
              <tr><td>Type</td><td>customer</td></tr>
              <tr><td>Status</td><td>Active</td></tr>
              <tr><td>Remarks: </td><td><b></b></td></tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" sm="6" class="py-0 py-sm-3">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr><td>Created Date: </td><td><b>2077-12-12 12:00:00 </b></td></tr>
            <tr><td>Created By: </td><td><b>Nabin giri</b></td></tr>
            <tr><td>Modified Date: </td><td><b></b></td></tr>
            <tr><td>Modified By: </td><td><b></b></td></tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col class="py-0" cols='12'>
        <v-btn color='primary' @click="goBack">
          <v-icon left size='20'>mdi-chevron-left</v-icon>
          <span>back</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    data() {
      return this.$store.state.item
    }
  },
  created() {
    this.$store.dispatch({
      type: 'findById', 
      url: 'vendorAndCustomer',
      id: this.$route.params.id
    })
  }
}
</script>
