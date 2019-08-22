const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        _: "lodash"
      }
    ]);
  },
  devServer: {
    // baseUrl: "/",
    port: 8081,
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
