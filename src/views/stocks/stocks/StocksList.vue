<template>
  <v-container fluid>
    <v-tabs v-model="tab">
      <v-tab> Raw Material Stocks </v-tab>
      <v-tab> Finished Product Stock </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <DataTable :theader="header_raw" :tbody="stocks" :actions="[]" />
      </v-tab-item>
      <v-tab-item>
        <v-card-actions class="pa-0 pt-3">
          <v-spacer />
          <v-btn color="primary" to="/stocks/add">
            <v-icon left size="20">mdi-plus</v-icon>
            <span>add</span>
          </v-btn>
        </v-card-actions>
        <DataTable :theader="header_finish" :tbody="stocks" :actions="[]" />
      </v-tab-item>
    </v-tabs-items>
  </v-container> 
</template>

<script>
import DataTable from '../../../components/DataTable'
export default {
  components: {
    DataTable
  },
  data : () => ({
    tab: null,
    header_raw: [
      { text: 'S.No', value: 'sno', class: 'primary white--text'},
      { text: 'Name', value: 'name',class: 'primary white--text' },
      { text: 'Stock', value: 'stock',class: 'primary white--text' }
    ],
    header_finish: [
      { text: 'S.No', value: 'sno', class: 'primary white--text'},
      { text: 'Name', value: 'name',class: 'primary white--text' },
      { text: 'Brand', value: 'brand', class: 'primary white--text'},
      { text: 'Unit', value: 'unit', class: 'primary white--text'},
      { text: 'Quantity', value: 'quantity', class: 'primary white--text'},
      { text: 'Stock', value: 'stock',class: 'primary white--text' }
    ],
  }),
  computed: {
    stocks() {
      return this.$store.state.lists
    }
  },
  created() {
    this.$store.dispatch({
      type: 'findAll', 
      url: 'finished/product/stock'
    })
  }
}
</script>