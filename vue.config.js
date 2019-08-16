const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    // baseUrl: "/",
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target:
          isDev || isTest
            ? "http://115.29.202.161:8090/appadmin/"
            : "http://admin.dailyyoga.com.cn/appadmin/",
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
