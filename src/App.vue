<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    overlay() {
      return this.$store.state.overlay
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
  width: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>