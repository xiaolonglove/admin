import mockjs from 'mockjs';

export default {
  'GET /api/users': mockjs.mock({
    'list|100': [{ name: '@name', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};