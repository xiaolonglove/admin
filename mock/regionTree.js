export default {
  'get /api/getRegionTree': (req, res) => {
    
    setTimeout(() => {
      res.json(
        [
          {
            "guid": "0",
            "title": "全网",
            "parentnodes": null,
            "authStatus": null,
            "img": "icon-home",
            "value": "-1",
            "hasChildren": false,
            "complete": true,
            "children": [
              {
                "guid": "8bfd3f74839242828cd34fd9da6123f0",
                "title": "级联单位1",
                "parentnodes": "0",
                "img": "icon-cput",
                "children": [
                  {
                    "guid": "6dfd3f74839242828cd34fd9da6123a1",
                    "title": "下级单位1",
                    "parentnodes": "8bfd3f74839242828cd34fd9da6123f0",
                    "authStatus": null,
                    "img": "icon-cput",
                    "children": [],
                    "value": "6dfd3f74839242828cd34fd9da6123a1",
                    "hasChildren": false,
                    "complete": true
                  },
                ],
                "value": "8bfd3f74839242828cd34fd9da6123f0",
              },
              {
                "guid": "59f623886cc342e18d3fba544b8c9f02",
                "title": "级联单位2",
                "parentnodes": "0",
                "img": "icon-cput",
                "children": [],
                "value": "59f623886cc342e18d3fba544b8c9f02",
              }
            ]
          }
        ]
      )
    }, 300)
  }
}