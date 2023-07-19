import axios from "axios";

export const api = axios.create({
  baseURL: "https://lexart-labs-chalenge-server.onrender.com"
})