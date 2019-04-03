export default {
  list: [
    { key: '/', title: '首页', icon: 'home', childrens: null },
    {
      key: 'sset', 
      title: '资产统计',
      icon: 'switcher',
      childrens: [
          { key: '/asset', title: '资产', childrens: null, icon: null},
          { key: '/os', title: '操作系统', childrens: null, icon: null},
      ]
    }
  ]
}