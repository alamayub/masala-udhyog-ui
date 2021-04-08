<template>
  <div class="Dashboard">
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="6" sm="3" v-for="(data, d) in datas" :key="d">
          <v-card :class="data.color" class="d-flex align-center pa-3" dark>
            <div class="icon rounded d-flex justify-center align-center">
              <v-icon>{{ data.icon }}</v-icon>
            </div>
            <div class="ml-2">
              <div class="title"> {{ data.name }} </div>
              <div class="caption"> {{ data.value }} </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-card-title>Latest Orders</v-card-title>
            <v-data-table :headers="headers_latest" :items="orders_latest" :items-per-page="5">
              <template v-slot:item.order_no="{ item }">
                <span class="font-weight-bold">#{{ item.order_no }}</span>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip dark small :color="item.status == 'Delivered' ? 'primary' : 'accent'"> {{ item.status }} </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-card-title>Orders History</v-card-title>
            <v-data-table :headers="headers_history" :items="orders_history" :items-per-page="5" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data () {
      return {
        datas: [
          { name: 'Purchase', icon: 'mdi-cart', color: 'purple', value: 2135 },
          { name: 'Stocks', icon: 'mdi-package', color: 'green', value: 2135 },
          { name: 'Sales', icon: 'mdi-handshake', color: 'pink', value: 2135 },
          { name: 'Members', icon: 'mdi-account-multiple', color: 'blue', value: 2135 }
        ],
        headers_latest: [
          { text: 'Order No.', align: 'start', value: 'order_no' },
          { text: 'Delivered To', value: 'delivered_to' },
          { text: 'Delivery Address', value: 'delivery_address' },
          { text: 'Delivery Date', value: 'delivery_date' },
          { text: 'Status', value: 'status' }
        ],
        orders_latest: [
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Kaleen Vaiya',
            delivery_address: 'Mirzapur, UP',
            delivery_date: '12/02/2021',
            status: 'Delivered'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Dadda Tyagi',
            delivery_address: 'Morta , Bihar',
            delivery_date: '12/10/2020',
            status: 'On Way'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'JP Singh',
            delivery_address: 'Lukhnow, UP',
            delivery_date: '12/12/2020',
            status: 'Delivered'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Guddu pandit',
            delivery_address: 'Mirzapur, UP',
            delivery_date: '05/01/2021',
            status: 'On Way'
          }
        ],

        headers_history: [
          { text: 'Order No.', align: 'start', value: 'order_no' },
          { text: 'Delivered To', value: 'delivered_to' },
          { text: 'Delivery Address', value: 'delivery_address' },
          { text: 'Delivery Date', value: 'delivery_date' },
          { text: 'Status', value: 'status' }
        ],
        orders_history: [
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Niklaus Mikaelson',
            delivery_address: 'Mirzapur, UP',
            delivery_date: '12/02/2021',
            status: 'Delivered'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Elijah Mikaelson',
            delivery_address: 'Canadian, New Zealander',
            delivery_date: '12/10/2020',
            status: 'Delivered'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'JP Singh',
            delivery_address: 'Lukhnow, UP',
            delivery_date: '12/12/2020',
            status: 'Delivered'
          },
          { 
            order_no: Math.floor(Math.random() * 10000), 
            delivered_to: 'Guddu pandit',
            delivery_address: 'Mirzapur, UP',
            delivery_date: '05/01/2021',
            status: 'Delivered'
          }
        ],
      }
    },
  }
</script>

<style scoped>
.icon {
  height: 60px; 
  width: 60px; 
  background-color: rgba(255, 255, 255, .5);
}
</style>

<!--
<v-container fluid>
      <v-row class="mt-5">
        <v-col cols="6" sm="4" md="3" v-for="a in 4" :key="a">
          <v-card height="25vh" style="position: relative;">
            <v-card elevation="6" style="left: 12px; top: -16px; height: 15vh; width: 15vh;">
              <v-card-text style="height: 100%; width: 100%;" class="green d-flex justify-center align-center">
                <v-icon color="red">mdi-alert-circle</v-icon>
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col cols="6" v-for="a in 2" :key="a">
          <v-card height="25vh" style="position: relative;">
            <v-card elevation="6" class="mx-3" style="top: -16px;">
              <v-card-text style="height: 100%; width: 100%;" class="py-8 px-6 green white--text">
                <div class="headline font-weight-light"> Employees Stats </div>
                <div class="body-2 font-weight-light">New employees on 15th September, 2016</div>
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
-->