import axios from "axios";

export const conex = axios.create({
  baseURL: 'http://10.10.10.9/catalogo-api/flight-master/'
})