import axios from "axios";
const localhost = "http://localhost:5000";
const BASE_URL = `${process.env.REACT_APP_API_PATH || localhost}`;

axios.defaults.baseURL = BASE_URL;
export default axios;
