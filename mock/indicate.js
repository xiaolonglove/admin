import mockjs from 'mockjs';

export default {
  // 'GET /api/getLevelLine': mockjs.mock({
  //   'list|5': [{ name: '@city', 'value': (Math.random() * 100).toFixed(2) }],
  // }),
  'GET /api/getLevelLine': (req, res) => {
    const params = req.query;
    const {indicateCode, tclasshelperId, date} = params;

    const data = mockjs.mock({
      'list|5': [{ name: '@city', 'value|1-100': 100 }],
    })
    return res.json(data.list)
  },
};
