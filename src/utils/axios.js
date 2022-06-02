import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_PATH}`;

axios.defaults.baseURL = BASE_URL;
export default axios;