<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="grey lighten-2">
        <v-btn v-for="(link, l) in links" :key="l" class="mr-3" :to="`${link.to}`" exact text color='primary'>
          <v-icon left size="20">{{link.icon}}</v-icon>
          <span class="d-none d-sm-block">{{link.name}}</span>
        </v-btn>
      </v-col>
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Purchase', icon: 'mdi-application-import', to: '/purchase' },
      { name: 'Return', icon: 'mdi-export', to: '/purchase/return'}
    ]
  })
}
</script>