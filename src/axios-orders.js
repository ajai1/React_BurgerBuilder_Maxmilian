import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactburgerbuilder-aeeb3.firebaseio.com/",
});

export default instance;
