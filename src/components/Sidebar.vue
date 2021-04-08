<template>
  <v-navigation-drawer color='primary' dark stateless v-model="drawer" :mini-variant="deviceType" width="230" app mobile-breakpoint="960">

    <v-card :height="deviceType ? '100' : '150'" tile elevation='0' class='logo primary d-flex justify-center align-center'>
      <!-- <img src="../../public/agram.png" alt="Agram Infotech" height="60" class="d-none d-sm-block">
      <img src="../../public/agram-icon.png" alt="Agram Infotech" height="30" width="30" class="d-sm-none"> -->
    </v-card>

    <v-divider></v-divider>

    <v-list expand dense nav tile>
      <v-list-item-group v-model="selectedItem">
        <v-list-item v-for="(item, i) in items" :key="i" :to="`${item.to}`" class="mb-2">
          <v-list-item-icon :class="deviceType ? '' : 'mx-2'" :style="{ margin: deviceType ? 'auto 3px' : '' }">
            <v-icon size='20' v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" class="text-uppercase" style="font-weight: 300 !important;; letter-spacing: .75px;" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn :block="!deviceType" :icon="deviceType" color='white primary--text'>
          <v-icon size='20' :left="!deviceType">mdi-logout</v-icon>
          <span class="d-none d-sm-block">logout</span>
        </v-btn>
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'purchase', icon: 'mdi-cart', to: '/purchase' },
      { title: 'stocks', icon: 'mdi-package', to: '/stocks' },
      { title: 'sales', icon: 'mdi-handshake', to: '/sales' },
      { title: 'expenses', icon: 'mdi-currency-usd', to: '/expenses' },
      { title: 'customers / vendors', icon: 'mdi-card-account-details', to: '/vendors-customers' },
      { title: 'raw material', icon: 'mdi-tag', to: '/raw-material' },
    ],
  }),

  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
    deviceType() {
      if(this.$vuetify.breakpoint.name == 'xs') return true
      else return false
    },      
  },
}
</script>

<style scoped>
.logo {
  box-shadow: 0 5px 10px 0 rgba(0 , 0, 0, .25);
}
</style>
