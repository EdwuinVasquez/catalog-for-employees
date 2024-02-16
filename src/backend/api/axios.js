import axios from "axios";

export const conex = axios.create({
  baseURL: 'http://192.168.1.2/catalog-for-employees-api/flight-master/'
})