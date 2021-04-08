<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Order Placement
        <v-spacer />
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.main_category" label="Main Category" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.sub_category" label="Sub Category" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.brand" label="Brand" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.name" label="Name" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.size" label="Size" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.color" label="Color" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.description" label="Description" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.default_unit" label="Default Unit" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select outlined dense :items="['Enabled', 'Disabled']" label="Standard"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.purchase_unit" label="Purchase Unit" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.purchase_vat_type" label="Purchase Vat Type" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.sales_rate" label="Sales Rate" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.sales_unit" label="Sales Unit" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field outlined dense v-model="editedItem.sales_vat_type" label="Sales Vat Type" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-file-input outlined dense  v-model="editedItem.image" truncate-length="15"></v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="yellow darken-1" to="/sales-order">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" dark @click="save">
          Save
        </v-btn>
      </v-card-actions>

    </v-card>
      </v-container>
</template>

<script>
  export default {
    data () {
      return {
        editedItem: {
          main_category: '',
          sub_category: '',
          brand: '',
          name: '',
          size: 0,
          color: '',
          description: '',
          default_unit: '',
          enable: true,
          image: null,
          purchase_unit: '',
          purchase_vat_type: '',
          sales_rate: 0,
          sales_unit: '',
          sales_vat_type: ''
        }
      }
    },
    methods: {
      print(item) {
        console.log(item)
      }
    }
  }
</script>
