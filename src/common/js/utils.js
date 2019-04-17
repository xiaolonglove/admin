"use strict";

// 计算率值
function countRate(num1, num2) {
  const _num1 = parseInt(num1, 10), _num2 = parseInt(num2, 10);
  if(!_num1 || !_num2) return 0;
  if(_num1 === _num2) return 100;
  return parseFloat((_num1 / _num2 * 100).toFixed(2))
}

// 格式化详情的率值
function formatRate(cellvalue) {
  let val = "";
  cellvalue = parseFloat(cellvalue)
  cellvalue >= 100 && (val = "100%")
  cellvalue < 100 && (val = cellvalue + "%")
  return val
}

// 对象扩展(浅)
var extend = (this && this.extend) || function () {
  extend = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return extend.apply(this, arguments);
};

/**
 * url参数格式化
 * @param obj {Object} 
 * @return {String} "id=1&a=2"
 */
const urlParam = (obj) => {
  let url = ''
  for (var k in obj) {
    let value = obj[k] !== undefined ? obj[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export {
  countRate,
  formatRate,
  extend, 
  urlParam,
}