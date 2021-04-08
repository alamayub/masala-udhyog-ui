// import axios from 'axios'
// export default axios.create({
//   baseURL: 'http://localhost:8082',
//   // headers: {
//   //   'Accept': 'application/json',
//   //   'Content-Type': 'application/json'
//   // }
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type':  'application/json',
//     // 'Access-Control-Allow-Credentials' : 'true',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
//   }
// })

import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})