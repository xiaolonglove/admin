
exports.routes = [
  {
    "path": "/",
    "component": '../layouts/index.js' ,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": './index.js' 
      },
      {
        "path": "/home",
        "exact": true,
        "component": './index.js' 
      },
      {
        "path": "/asset",
        "exact": true,
        "component": './asset/index.tsx' 
      },
      {
        "path": "/os",
        "exact": true,
        "component": './os/index.tsx' 
      },
      {
        "path": "/indicatorview",
        "exact": true,
        "component": './indicatorview/index.tsx' 
      },
      {
        "path": "/region",
        "exact": true,
        "component": './region/index.tsx' 
      },
    ]
  }
]