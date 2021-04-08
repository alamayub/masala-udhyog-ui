<template>
  <v-menu open-on-hover offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
        <v-icon size="20"> mdi-dots-horizontal </v-icon>    
      </v-btn>
    </template>

    <v-list dense class="py-0">
      <v-list-item v-for="(option, index) in options" :key="index" @click="option.action(item)">
        <v-list-item-icon class="mr-2">
          <v-icon v-text="option.icon" size="20"></v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ option.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>  
</template>

<script>
export default {
  props: {
    options: {
      type: Array,  
    },
    item: { 
      type: Object  
    }
  }  
}
</script>