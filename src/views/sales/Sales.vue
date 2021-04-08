<template>
  <v-container fluid class="pa-0">
    <v-col class="grey lighten-2" cols="12" >
      <v-row no-gutters>
        <v-btn class="mr-2" v-for="(s, i) in sales" :key="i"  :to="`${s.to}`" exact text color='primary' >
          <v-icon left size='20'>{{ s.icon }}</v-icon>
          <span>{{ s.name }}</span>
        </v-btn>
      </v-row>
    </v-col>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    sales: [
      { name: 'Sales', icon: 'mdi-application-import', to: '/sales' },
      { name: 'Return', icon: 'mdi-export', to: '/sales/return' }
    ]
  })
}
</script>