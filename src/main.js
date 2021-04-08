import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import cors from 'core-js'
Vue.use(cors);

import api from "./helper/api";
Vue.config.productionTip = false;
Vue.prototype.$http = api; 
api.defaults.timeout = 10000;
api.interceptors.request.use(
  config => {
    // const token = localStorage.getItem("access_token");
    const token = 'token'
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
  console.log(error  )
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
         
         //do something
          break;
      
        case 401:
          alert("session expired");
          break;
        case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
           break;
        case 404:
          alert('page not exist');
          break;
        case 502:
         setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);

router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token')
  let token = 'token'
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (token) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
