<template>
  <v-card class="elevation-0">
    <v-card-title class="pa-0 my-3">
      <v-text-field v-model="search" outlined dense append-icon="mdi-magnify" label="Search" hide-details />
    </v-card-title>
    <v-data-table height="288" :headers="theader" :items="tbody == null ? [] : tbody" :search="search" :loading="isLoading" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer @page-count="pageCount = $event">
      <template v-slot:item.sno="{ item }">
        <v-chip small outlined class="font-weight-bold" style="font-size: 12px;">{{ getSNO(item)+1 }}</v-chip>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip small :color="
          item.enable === true ? 'success'
          : item.enable === false ? 'error'
          : item.status === 'Approved' ? 'success'
          : item.status === 'Canceled' ? 'error'
          : item.status === 'Pending' ? 'warning' : 'secondary' "
          dark>
          {{ item.status }} 
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div style="min-width: 5px;">
          <v-tooltip bottom v-for="(a, index) in actions" :key="index">
            <template v-slot:activator="{ on, attrs }">
            <v-btn small v-bind="attrs" v-on="on" :color="a.color" icon @click="a.name === 'View' ? gotoDetailPage(item) :a.name === 'Edit' ? gotoEditPage(item) : deleteItem(item, a) ">
              <v-icon x-small>{{ a.icon }}</v-icon>
            </v-btn>
            </template>
            <span>{{ a.name }}</span>
          </v-tooltip>
        </div>
      </template>

      <!-- Purchase -->
      <template v-slot:item.purchaseDate="{ item }">
        <span class="caption ml-1">{{ billDate(item.purchaseDate) }}</span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span class="caption font-weight-bold">{{ item.finalRate }}</span>
      </template>
      <template v-slot:item.discountAmount="{ item }">
        <span class="ml-1 caption font-weight-bold">{{ item.discountAmount }}</span>
      </template>
      <template v-slot:item.subTotal="{ item }">
        <span class="caption font-weight-bold">{{ subTotal(item) }}</span>
      </template>
      <template v-slot:item.grandTotal="{ item }">
        <span class="caption font-weight-bold">{{ grandTotal(item) }}</span>
      </template>
    </v-data-table>
    <div class="text-center pt-1">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-card>  
</template>

<script>
import api from '../helper/api'
export default {
  props: {
    theader: Array,
    tbody: Array,
    actions: Array
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    search: '',
  }),
  methods: {
    getSNO(item) {
      return this.tbody.indexOf(item)
    },
    gotoDetailPage(item) {
      console.log(item)
      this.$router.push(`${this.$route.path}/detail/${item.id}`)
    },
    gotoEditPage(item) {
      console.log(item)
      this.$router.push(`${this.$route.path}/edit/${item.id}`)
    },
    async deleteItem(item, a) {
      console.log(item)
      if(confirm('Are you sure, you want to delete this item?')) {
        await api.delete(`${a.url}/delete?id=${item.id}`)
        .then( res => {
          this.tbody.splice(this.tbody.indexOf(item), 1)
          if(res.data.message) alert(res.data.message)
        })
      }
    },
    //purchase
    billDate(date) {
      return date.slice(0, 10)
    },
    subTotal(item) {
      return (item.finalRate - item.discountAmount)
    },
    grandTotal(item) {
      return (item.finalRate - (item.discountAmount ? item.discountAmount : 0) + (item.tax ? item.tax : 0))
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>


<!--
<div style="min-width: 85px;">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn small v-bind="attrs" v-on="on" color="primary" icon @click="gotoDetailPage(item)">
                <v-icon x-small>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>View</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn small v-bind="attrs" v-on="on" color="success" icon @click="print(item)">
              <v-icon x-small>mdi-pencil</v-icon>
            </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn small v-bind="attrs" v-on="on"  color="red" icon @click="print(item)">
              <v-icon x-small>mdi-delete</v-icon>
            </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
-->