var path = require('path');
// var route = require("./src/router.js");

export default {
  plugins: ['umi-plugin-dva'],
  "disableCSSModules": true, // 禁用cssModules
  // "proxy": {
  //   "/api": {
  //     "target": "http://jsonplaceholder.typicode.com/",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "" }
  //   }
  // }, // 代理转发
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  "alias": {
    "@": path.resolve("./src"),
  },
  // routes: route.routes,
}
