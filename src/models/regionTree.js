import { getRegionTree } from '@/services/services';

export default {
  namespace: 'regionTree',
  state: {
    treeData: [],
    guids: [],
    type: 0 //0全网 1不含全网
  },
  reducers: {
    querySuccess(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *query({ payload }, { select, call, put }){
      
      const { type } = payload;
      const { data } = yield call(getRegionTree);
      // 全网 or 不含全网
      const treeData = type? (data[0].children || []): data;
      const guids = getGuids(treeData);

      yield put({
        type: 'querySuccess',
        payload: {
          treeData,
          guids,
          type
        }
      });
    }
  }
}

function getGuids(arr) {
  let _arr = [];
  if(Array.isArray(arr) && arr.length ) {
    arr.forEach(item => {
      let arr_ = []
      _arr.push(item.guid)
      arr_ = getGuids(item.children)
      _arr = _arr.concat(arr_)
    })
  }
  return _arr;
}