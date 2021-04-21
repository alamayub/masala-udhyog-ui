<template>
  <div>
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
              <v-btn small v-bind="attrs" v-on="on" :color="a.color" icon 
                @click="a.name === 'View' ? gotoDetailPage(item) :a.name === 'Edit' 
                ? gotoEditPage(item) : a.name == 'Delete' ? deleteItem(item, a)
                : a.name == 'Print' ? print(item) : () => console.log(item) ">
                <v-icon x-small>{{ a.icon }}</v-icon>
              </v-btn>
              </template>
              <span>{{ a.name }}</span>
            </v-tooltip>
          </div>
        </template>

        <!-- Purchase -->
        <template v-slot:item.purchaseDate="{ item }">
          <span class="caption ml-1">{{ item.purchaseDate }}</span>
        </template>
        <template v-slot:item.billDate="{ item }">
          <span class="caption font-weight-bold">{{ item.createdDate }}</span>
        </template>
        <template v-slot:item.salesAmount="{ item }">
          <span class="caption font-weight-bold">{{ item.rate * item.quantity }}</span>
        </template>
        <template v-slot:item.expensesAmount="{ item }">
          <span class="caption font-weight-bold">{{ item.rate * item.quantity }}</span>
        </template>
        
        <template v-slot:item.amount="{ item }">
          <span class="caption font-weight-bold">{{ (item.finalRate * item.quantity) - item.discountAmount }}</span>
        </template>
        <template v-slot:item.discountAmount="{ item }">
          <span class="ml-1 caption font-weight-bold">{{ item.discountAmount }}</span>
        </template>
      
      </v-data-table>
      <div class="text-center pt-1">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card> 
  </div> 
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
        this.$store.commit('SET_OVERLAY', true)
        await api.delete(`${a.url}/delete?id=${item.id}`)
        .then( res => {
          this.tbody.splice(this.tbody.indexOf(item), 1)
          if(res.data.message) alert(res.data.message)
        }).catch( e => console.log(e))
        this.$store.commit('SET_OVERLAY', false)
      }
    },
    print(item) {
      console.log(item)
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.table_load
    }
  }
}
</script>
