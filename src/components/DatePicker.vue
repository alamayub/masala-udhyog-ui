<template>
  <v-menu ref="menuDateFrom" v-model="menuDate" transition="scale-transition" offset-y max-width="290px" min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field hide-details v-model="date" :label="labelName" color="primary" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on" />
    </template>
    <v-date-picker v-model="date" color="primary" :max="maxDate" scrollable />
  </v-menu>
</template>
<script>
  export default {
    props: {
      date: String,
      labelName: String
    },
    data: ()=> ({
      menuDate: false,
      maxDate: new Date().toISOString().substr(0, 10)
    }),
    methods: {
      dateChange() {
        this.$emit('dateChange', this.date)
      }
    }
  }
</script>