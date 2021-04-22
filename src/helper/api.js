import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT",
    'Access-Control-Max-Age': '1000',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
})