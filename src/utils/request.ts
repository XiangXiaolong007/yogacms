import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";

const service = axios.create({
  baseURL:
    isDev || isTest
      ? "http://115.29.202.161:8090/appadmin/"
      : "http://admin.dailyyoga.com.cn/appadmin/",
  timeout: 30000
});

console.dir(service);

export default service;
