import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/computadoras",
  headers: {
    "Content-type": "application/json"
  }
});