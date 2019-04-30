const beadcrumbs = {
  '/': [{name: '终端首页', path: '/'}],
  '/home': [{name: '终端首页', path: '/'}],
  '/asset': [{name: '资产统计', path: null}, {name: '资产', path: '/asset'}],
  '/indicatorview': [{name: '指标分析', path: null}, {name: '指标概览', path: '/indicatorview'}],
  '/region': [{name: '终端配置', path: null}, {name: '终端级联配置', path: '/region'}],
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
