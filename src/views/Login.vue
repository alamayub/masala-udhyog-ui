<template>
  <v-container fluid class="fill-height back">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <div class="text display-3 primary--text">welcome to masala udhyog</div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card dark class="pa-0 d-flex flex-column justify-center mx-auto card" height="310" width="400">
          <v-card-title>Login</v-card-title>
          <v-card-text class="py-0 px-3 px-sm-4 px-md-5">

            <!-- FORM   -->
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field prepend-inner-icon="mdi-account" name="username" v-model="username" :rules="usernameRules" label="Username" required />
              <v-text-field prepend-inner-icon="mdi-lock" name="password" v-model="password" :rules="passRules" :type="showPass ? 'text' : 'password'" 
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" label="Password" required />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!valid" width="150" rounded large color="primary" @click.prevent="loginUser"> Login </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar color="error lighten-2" v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
// import api from '../helper/api';
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  data: () => ({
    overlay: false,
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
    ],
    passRules: [
      v => !!v || 'Password is required',
    ],
    password: '',
    showPass: false,
    snackbar: false,
    text: null,
    timeout: 3000,
  }),
  methods: {
    async loginUser(){
      if(this.$refs.form.validate()) {
        this.overlay = true
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8081'
        }
        await axios.post('http://localhost:8080/api/login', { username: this.username, password: this.password }, { headers })
          .then(response => {
              console.log("token::", jwtDecode(response.data.token));
              console.log("token::", response.data);
              console.log('exp ', jwtDecode(response.data.token).exp)
              localStorage.setItem("exp", jwtDecode(response.data.token).exp)
              localStorage.setItem("token", 'Bearer '+response.data.token)
              this.$router.push({ name: 'Dashboard' })
            }
          ).catch( e => {
            console.log(e)
            this.snackbar = true
            this.text = 'Bad credentials.'
          })
        this.overlay = false
      }
    }
  },
}

</script>
<style scoped>
.back {
  background-image: url('../assets/back1.jpg');
  background-position: center center;
  background-size: cover;
}
.text {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  margin-top: 10vh;
  text-transform: capitalize;
  opacity: .5;
  font-weight: 800 !important;
}
.card {
  background-color: rgba(0, 0, 0, .5)  !important;
}
</style>