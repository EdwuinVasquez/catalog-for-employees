import axios from "axios";

export const conex = axios.create({
  baseURL: 'http://localhost/catalogo-api/flight-master/'
})