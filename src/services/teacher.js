import { extend } from 'umi-request';

const request = extend({
  prefix: '/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 查询
export const search = async (data) => {
  return request.post('/search', {
    data,
  });
};
// 新增
export const add = async (data) => {
  return request.post('/add', {
    data,
  });
};
// 编辑
export const edit = async (data) => {
  return request.post('/edit', {
    data,
  });
};
// 删除
export const del = async (data) => {
  return request.post('/del', {
    data,
  });
};
