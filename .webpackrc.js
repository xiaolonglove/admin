var path = require('path');

export default {
  // "entry": "src/pages/index.js",
  "disableCSSModules": true, // 禁用cssModules
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }, // 代理转发
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  "alias": {
    "@": path.resolve("./src"),
  }
}