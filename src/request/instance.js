import axios from "axios";
import { REACT_APP_HOST } from "../config/env";

const instance = axios.create({
  baseURL: REACT_APP_HOST,
});

export default instance;
