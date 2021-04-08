<template>
  <v-app-bar id="app-bar" color='orange lighten-4' class="px-0" app>

    <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>

    <div class="d-flex menu-items">
      <v-list-item v-for="(item, i) in items" :key="i" :to="`${item.to}`" dense class="px-3 py-1 mr-sm-1 mr-md-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on" class="pa-0 mx-0">
              <v-icon v-text="item.icon" color='primary'></v-icon>
            </v-list-item-icon>
          </template>
          <span class="text-capitalize">{{ item.title }}</span>
        </v-tooltip>
      </v-list-item>
    </div>

    <v-spacer />

    <v-btn icon class="mr-0">
      <v-icon size='20'>mdi-account</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DashboardCoreAppBar',
  data:() => ({
    items: [
      { title: 'purchase', icon: 'mdi-cart', to: '/purchase' },
      { title: 'sales', icon: 'mdi-handshake', to: '/sales' },
      { title: 'customers / vendors', icon: 'mdi-card-account-details', to: '/vendors-customers' },
      { title: 'item info', icon: 'mdi-tag', to: '/inventory/item' },
      { title: 'stocks', icon: 'mdi-package', to: '/stocks' },
      { title: 'expenses', icon: 'mdi-currency-usd', to: '/expenses' },
    ],
  }),
  computed: {
    ...mapState(['drawer']),
  },
  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
  },
}
</script>

<style scoped>
.menu-items {
  white-space: nowrap;
  overflow: scroll;
}
</style>