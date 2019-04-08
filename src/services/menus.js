export const menus =  [
  { key: '/', title: '首页', icon: 'home', childrens: null, parent: null },
  {
    key: 'terminal', 
    title: '终端',
    icon: 'switcher',
    parent: null,
    childrens: [
      { 
        key: 'asset', 
        title: '资产', 
        childrens: [
          { key: '/asset', title: '硬件资产', childrens: null, icon: null, parent: 'asset'},
          { key: '/os', title: '操作系统', childrens: null, icon: null, parent: 'asset'},
        ], 
        icon: null, 
        parent: 'terminal'
      },
      { 
        key: '/indel', 
        title: '指标', 
        childrens: null, 
        icon: null, 
        parent: 'terminal'
      }
    ]
  }
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