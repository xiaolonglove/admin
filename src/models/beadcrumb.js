const beadcrumbs = {
  '/': [{name: '终端首页', path: '#/'}],
  '/home': [{name: '终端首页', path: '#/'}],
  '/asset': [{name: '资产统计', path: null}, {name: '资产', path: '#/asset'}],
}

export default {
  namespace: 'beadcrumb',
  state: {
    list: [],
  },
  reducers: {
    querySuccess(state, action){
      return {...state, ...action.payload};
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路由信息，发起 action query，获取数据
      history.listen(location => {
        const list = beadcrumbs[location.pathname] || [];
        dispatch({
          type: 'querySuccess',
          payload: {
            list,
          }
        });
      })
    }
  }
}
