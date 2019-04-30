import { getMapValue } from '@/services/services';

export default {
  namespace: 'mapValue',
  state: {
    mapType: 'china',
    mapData: [],
    success: false
  },
  reducers: {
    reloadState(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *query({}, { select, call, put }){
      const mapValue = yield select(state => state.mapValue);
      if(mapValue.success) return;

      const result = yield call(getMapValue);
      if (result.success) {
        yield put({
          type: 'reloadState',
          payload: {
            mapType: result.data[1],
            mapData: result.data,
            success: true
          }
        });
      }
    }
  }
}

