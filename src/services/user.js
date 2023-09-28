import { extend } from 'umi-request';

const request = extend({
  prefix: '/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 登录
export const login = async (data) => {
  console.log('data', data);
  return request.post('/login', {
    data,
  });
};

// 校验token
export const checkToken = async (data) => {
  console.log('data', data);
  return request.post('/checkToken', {
    data,
  });
};
