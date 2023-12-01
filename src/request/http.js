import axios from "axios"; // used to make HTTP requests.

// Creating a new instance of axios with custom config.
const http = axios.create({
  // Setting default headers for all HTTP requests made using this instance.
  headers: {
    "x-rapidapi-key": "6ed022de98msh585d1a9e763dde8p12da4fjsnf8aed4a41b25", //API auth
  },
});

export default http;
