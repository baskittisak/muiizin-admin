import axios from "axios";
const localhost = "http://localhost:5000";
const BASE_URL = `${process.env.REACT_APP_API_PATH || localhost}`;

const muiizin = localStorage.getItem("muiizin");
const token = JSON.parse(muiizin)?.token;

axios.defaults.headers.common["Authorization"] = token;
axios.defaults.baseURL = BASE_URL;
export default axios;
