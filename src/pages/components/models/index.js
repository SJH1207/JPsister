import { search, add, edit, del } from '@/services/teacher';

export default {
  namespace: 'teacher',
  state: {},

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    // 查询
    *search({ payload, callback }, { call, put, select }) {
      const response = yield call(search, {
        ...payload,
      });
      if (response && response.code === 200) {
        if (callback) callback(response);
      }
    },
    // 新增
    *add({ payload, callback }, { call, put, select }) {
      const response = yield call(add, {
        ...payload,
      });
      if (response && response.code === 200) {
        if (callback) callback(response);
      }
    },
    // 编辑
    *edit({ payload, callback }, { call, put, select }) {
      const response = yield call(edit, {
        ...payload,
      });
      if (response && response.code === 200) {
        if (callback) callback(response);
      }
    },
    // 删除
    *del({ payload, callback }, { call, put, select }) {
      const response = yield call(del, {
        ...payload,
      });
      if (response && response.code === 200) {
        if (callback) callback(response);
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      console.log(state, payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
