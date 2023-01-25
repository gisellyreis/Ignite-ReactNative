import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.32:3333'
})

api.interceptors.request.use((config) => {
  console.log(config);
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  console.log("INTERCEPTOR =>", response)
  return response
}, (error) => {
  console.log('INTERCEPTOR RESPONSE ERROR =>', error)
  return Promise.reject(error);
})

export { api }