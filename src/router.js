
var {connect} = require('dva');

exports.routes = [
  {
    // "path": "/",
    "component": '../layouts/index.js' ,
    "routes": [
      {
        "path": "/",
        // "exact": true,
        "component": './index.js' 
      },
      {
        "path": "/home",
        // "exact": true,
        "component": './index.js' 
      },
    ]
  }
]