import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL
});

export default httpClient;
