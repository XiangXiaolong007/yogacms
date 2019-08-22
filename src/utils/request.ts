import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";

axios.create({
  baseURL:
    isDev || isTest
      ? "http://115.29.202.161:8090/appadmin/"
      : "http://admin.dailyyoga.com.cn/appadmin/",
  timeout: 30000
});

// console.dir(service);
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log(response);
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
