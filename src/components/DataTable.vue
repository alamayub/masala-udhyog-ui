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
    <v-btn @click="print('print page')">print</v-btn>
    <div class='print' id='printMe'>
      <div class="watermark">watermark</div>
      <div class="logo">
        <img height="100" src="data:image/png;base64,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" alt="" srcset="">
        <div class="company">
          <div class="company-name">Company Name</div>
          <div class="caption">Panitanki-10 Birgunj, Nepal</div>
        </div>
      </div>
      <div class="head">
        <div class="caption">Bill No. : #<strong>354465</strong></div>
        <div class="caption">Date. : <strong>21/04/2021</strong></div>
      </div>
      <div class="head">
        <div class="caption">Code : <strong>C-001</strong></div>
        <div class="caption">Name : <strong>Alex Martin</strong></div>
        <div class="caption">Contact : <strong>9876543210</strong></div>
      </div>
      <table>
        <thead>
          <tr style="text-align: end;">
            <th style="text-align: start; width: 50px;">S. No</th>
            <th style="text-align: center;">Item Name</th>
            <th style="width: 120px;">Rate(Rs.)</th>
            <th style="width: 120px;">Quantity</th>
            <th style="width: 120px;">Amount(Rs.)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="text-align: end;" v-for="a in 5" :key="a">
            <td style="text-align: start;">1.</td>
            <td style="text-align: center;">Jeera</td>
            <td>20</td>
            <td>10</td>
            <td>{{ 20 *10 }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">Total Amount</td>
            <td>3500</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div> 
</template>

<script>
import api from '../helper/api'
import print from 'print-js'
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
      const p1 = '.print { display: block; font-family: sans-serif; }'
      const logo = '.logo { padding: 20px 0; display: flex; justify-content: center; align-items: center;} .company { margin-left: 10px;} .company-name { font-size: 25px; margin-bottom: 5px; } '
      const head = '.head { padding: 15px 0; display: flex; justify-content: space-between; }'
      const table = 'table { width: 100%; border-collapse: collapse; border: 1px solid black; } thead tr { border-bottom: 1px solid black; }' + 
        'th, td { border-right: 1px solid black; border-left: 1px solid black; }'+ 
        'tfoot { font-weight: bold; text-align: end; } tfoot tr { border-top: 1px solid black; }'
      const td = 'table td, table th { padding: 7px 15px; }'
      const style = `${p1} ${logo} ${head} ${table} ${td}`
      print({
        printable: "printMe",
        type: "html",
        style: style,
        scanStyles: false,
        onPrintDialogClose: () => console.log("The print dialog was closed"),
        onError: e => console.log(e)
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.table_load
    }
  }
}
</script>

<style scoped>
.watermark {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: chartreuse;
  color: black;
  opacity: .25;
}
</style>