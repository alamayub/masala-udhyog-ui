<template>
  <v-container fluid>
    <v-tabs right>
      <v-tab>List</v-tab>
      <v-tab>New</v-tab>

      <v-tab-item>
        <datatable :theader="theader" :tbody="tbody" :actions="actions" />
      </v-tab-item>

      <v-tab-item class="mt-3">
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="name" :rules="nameRules" label="Full Name" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="email" :rules="emailRules" label="Email" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="username" :rules="usernameRules" label="Username" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="address" :rules="addressRules" label="Address" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="mobile" :rules="mobileRules" label="Mobile Number" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="password" :rules="passwordRules" label="Password" :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" outlined dense />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field v-model="confirm_password" :rules="confirmPasswordRules" label="Confirm Password" :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" outlined dense />
            </v-col>
          </v-row>
          <!-- <v-btn :disabled="$v.user.$invalid" color="success" class="mr-4" @click="addUser"> Add User </v-btn> -->
          <v-btn color="success" class="mr-4" @click="addUser"> Add User </v-btn>
        </v-form>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import datatable from "../../components/DataTable";
import api from '../../helper/api';
export default {
  components: {
    datatable,
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    menuDateFrom: false,
    dateFrom: new Date().toISOString().substr(0, 10),
    menuDateTo: false,
    dateTo: new Date().toISOString().substr(0, 10),
    search: "",
    theader: [
      { text: "Name", align: "start", sortable: false, value: "name", class: "primary white--text" },
      { text: "Username", value: "username", class: "primary white--text" },
      { text: "Phone", value: "phone", class: "primary white--text" },
      { text: "Mobile ", value: "mobile", class: "primary white--text" },
      { text: "Email", value: "email", class: "primary white--text" },
      { text: "Assigned Date", value: "createdDate", class: "primary white--text" },
      { text: "Action (s)", value: "actions", sortable: false, class: "primary white--text" },
    ],
    tbody: [],
    actions: [
      { name: "Profile", icon: "mdi-account", action: () => console.log("visit") },
      { name: "Edit", icon: "mdi-pencil", action: () => console.log("edit") },
      { name: "Delete", icon: "mdi-delete", action: () => console.log("delete") },
    ],
    name: '',
    nameRules: [
      v => !!v || 'Name is required.',
      v => !(/\d/.test(v)) || 'Name can\'n contain digits.',
      v => (v && v.length >= 6) || 'Name must be greater than 6 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length >= 6) || 'Username must be greater than 6 characters',
    ],
    address: '',
    addressRules: [
      v => !!v || 'Address is required',
      v => (v && v.length >= 6) || 'Address must be greater than 6 characters',
    ],
    mobile: '',
    mobileRules: [
      v => !!v || 'Mobile Number is required',
      v => /\d/.test(v) || 'Phone number must be digits',
      v => (v && v.length == 10) || 'Mobile number must be valid and 10 digit',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 8 character long',
      v => /\d/.test(v) || 'Password must contain at least 1 number',
      v => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase',
      v => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase',
      v => /[!@#$%^&*)(+=._-]/.test(v) || 'Password must contain at least 1 special character',
    ],
    confirm_password: '',
    showPass: false,
  }),
  computed: {
    confirmPasswordRules() {
      let error = []
      if(this.confirm_password.length <= 0) error.push('Confirm passowrd is required')
      else {
        if(this.confirm_password != this.password) error.push('Confirm password must be same as above password')
      }
      return error
    }
  },
  created() {
    this.getTeamList()
  },
  methods: {
    async getTeamList() {
      await api.post('api/super/admin/team/findAll')
        .then(response =>{
          console.log("response::",response)
          this.tbody = response.data
        });
    },
    addUser() {
      if(this.$refs.form.validate()) {
        api.post('api/super/admin/team/add')
        .then(response => {
          console.log("data", response)
        })
        this.$refs.form.reset()
      } else console.log('not validated')
    },
  },
};
</script>