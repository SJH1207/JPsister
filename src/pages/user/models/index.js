import { login } from '@/services/user';

export default {
  namespace: 'user',
  state: {
    token: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    // 登录
    *login({ payload, callback }, { call, put, select }) {
      const state = yield select((state) => state);
      console.log('state', state);
      const response = yield call(login, {
        username: payload.username,
        password: payload.password,
      });
      if (response && response.code === 200) {
        if (callback) callback(response);
        if (payload.autoLogin) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('nickname', response.nickname);
        }

        yield put({
          type: 'updateState',
          payload: {
            token: response.token,
          },
        });
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
