export const menus =  [
  { key: '/', title: '首页', icon: 'home', childrens: null, parent: null },
  {
    key: 'asset', 
    title: '资产统计',
    icon: 'switcher',
    parent: null,
    childrens: [
      { 
        key: '/asset', 
        title: '资产', 
        childrens: null, 
        icon: null, 
        parent: 'asset'
      },
      { 
        key: '/os', 
        title: '操作系统', 
        childrens: null, 
        icon: null, 
        parent: 'asset'
      }
    ]
  },
  {
    key: 'indicator', 
    title: '指标分析',
    icon: 'switcher',
    parent: null,
    childrens: [
      { 
        key: '/indicatorview', 
        title: '指标概览', 
        childrens: null, 
        icon: null, 
        parent: 'indicator'
      },
      { 
        key: '/registeredRate', 
        title: '注册率', 
        childrens: null, 
        icon: null, 
        parent: 'indicator'
      }
    ]
  },
]

export const menusGroup = getLists(menus)

function getLists(arr) {
  let lists = [];
  var handleList = (arr) => {
    arr.forEach(item => {
      lists.push(item);
      const { childrens } = item;
      if(childrens) {
        handleList(childrens)
      }
    });
  }
  handleList(arr)
  return lists;
}