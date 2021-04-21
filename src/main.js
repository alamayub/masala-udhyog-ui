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
// api.defaults.timeout = 10000;
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.common["Authorization"] = token
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
          alert('Bad request');
          break;
        case 401:
          alert('Unauthorized');
          localStorage.removeItem('token')
          router.replace({ path: "/login",  query: { redirect: router.currentRoute.fullPath } });
          break;
        case 403:
          alert('Access Forbidden.')
          break;
        case 404:
          router.replace({ path: "*" });
          break;
        case 500: 
          alert('Interal server error');
          break; 
        case 502:
          alert('Bad gateway')
          break;
        case 503:
          alert('Service unavailable')
          break;
        case 504:
          alert('Gateway timeout')
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

router.beforeEach((to, from, next) => {
  let exp = localStorage.getItem('exp')
  let date = new Date().getTime()
  console.log(exp)
  console.log(date)
  let token = localStorage.getItem('token')
  if(exp >= Math.floor(date / 1000)) next({ name: 'Login' }) 
  else {
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
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


/*
if(exp >= date) {
    localStorage.removeItem('exp')
    localStorage.removeItem('token')
    next({ name: 'Login' })
  } else {
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
  }*/