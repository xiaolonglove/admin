"use strict";
/*
  echarts助手
  封装常用图表，柱状图，折线图， 仪表盘，地图数据
 */
import echarts from "echarts";
import { extend } from './utils';

export {
  initBar,
  initLine,
  initPie,
  initGauge
}

const EMPY_NODE = `<div class="ant-empty ant-empty-normal"><div class="ant-empty-image">
<img alt="暂无数据" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"></div>
<p class="ant-empty-description">暂无数据</p>
</div>`

/**
 * 初始化柱状图
 * @param  id {String}  domid
 * @param  data {Array} 数据 => [{name: 'a', value: 0}, ...]
 * @param  param {Object} 常用参数 => { title: '', suffix: '', xname: '', yname: '', dataZoomShow: false }
 * @param  sOption {Object} 配置项(可不传)
 */
function initBar(id, data = [], param, sOption = null ) {
  const $id = document.getElementById(id);
  if(!data || 0 === data.length) {
    $id.innerHTML = EMPY_NODE
    return
  }
  const xAxisDate = [];
  data.forEach(item => {
    xAxisDate.push(item.name);
  })
  // @ts-ignore
  const myChart = echarts.init($id);
  myChart.hideLoading();
  // @ts-ignore
  const eg = echarts.getInstanceByDom($id);
  if (eg) {
    eg.clear();
  }
  let _param = {
    title: '',
    suffix: '',
    xname: '',
    yname: '',
    dataZoomShow: false
  }
  if (param && Object.prototype.toString.call(param) === '[object Object]') {
    _param = extend({}, _param, param)
  }

  let option = {
    title: {
      text: _param.title
    },
    grid : {
      borderWidth : 0,
      x : 50,
      y : 30,
      x2 : 50,
      y2 : 40
    },
    tooltip: {
      trigger : 'item',
      formatter : "{b}\<br/>{c}"+ (_param.suffix || ''),
      textStyle : {
        fontSize : 12
      }
    },
    dataZoom : {
      show : _param.dataZoomShow,
      zoomLock : false,
      showDetail : false,
      bottom : 0,
      height : 18,
      start : 0,
      end : _param.dataZoomShow? (function(len) {
        var r = (10 * 80.0 / len);
        if (r > 80) {
          r = 80;
        }
        return r;
      })(data.length): null
    },
    xAxis: {
      name: _param.xname || '',
      type : 'category',
      data : xAxisDate,
      axisTick: {
        alignWithLabel: true
      },
      interval:0,
      axisLabel: {
        interval:0,
        rotate: 30,
        showMinLabel: true,
        showMaxLabel: true,
        formatter : function(value) {
          const len = 5;
          // value = value.replace(/[\r\n]/g,"").substr(0, len); //去掉回车换行
          // var d = [], i = 0;
          // var temp;
          // while (true) {
          //   temp = value.substr(i * 5, 5);
          //   d.push(temp);
          //   i++;
          //   if (temp < 5) {
          //     break;
          //   }
          // }
          // return d.join('\n');

          return value.length > len ? value.substring(0, len) + "..." : value;
        }
      }
    },
    yAxis: {
      name : _param.yname || '',
      nameTextStyle : {
        color : '#000'
      },
      min : 0,
      axisLine : {
        lineStyle : {
          color : '#000'
        }
      },
      axisLabel : {
        textStyle : {
          color : "#000"
        },
        formatter: function (value, index) {
          if(1000 <= value) {
            value = value + "";
            value = value.substring(0, (value.length - 3)) + "K";
          }
          return value
      }
      }
    },
    series: [
      {
        data: data,
        type: "bar",
        barMaxWidth : 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              formatter: function(p) {
                return "%" === _param.suffix? p.value + "%" : p.value;
              }
            }
          }
      },
      }
    ]
  }
  
  if (sOption && Object.prototype.toString.call(sOption) === '[object Object]') {
    option = extend({}, option, sOption)
  }

  myChart.setOption(option)
  
  window.addEventListener("resize", e => {
    if (myChart) {
      myChart.resize();
    }
    e.stopPropagation();
  })
}

/**
 * 初始折线图
 * @param  id {String}  domid
 * @param  data {Array} 数据 => [{name: 'a', value: 0}, ...]
 * @param  param {Object} 常用参数 => { title: '', suffix: '', yname: '' }
 * @param  sOption {Object} 配置项(可不传)
 * initLine('charts', lineData, {suffix: '%', xname: '天', yname: '百分比'})
 */
function initLine(id, data = [], param, sOption = null ) {

  const $id = document.getElementById(id);
  if(!data || 0 === data.length) {
    $id.innerHTML = EMPY_NODE
    return
  }
  // @ts-ignore
  const myChart = echarts.init($id);
  myChart.hideLoading();
  // @ts-ignore
  const eg = echarts.getInstanceByDom($id);
  if (eg) {
    eg.clear();
  }
  let _param = {
    title: '',
    suffix: '',
    xname: '',
    yname: '',
  }
  
  if (param && Object.prototype.toString.call(param) === '[object Object]') {
    _param = extend({}, _param, param)
  }

  let xAxisDate = [], 
  unit = "天", 
  yAxis = {
    name : _param.yname || '',
    axisLabel: {
      formatter: '{value}'
    }
  };

  data.forEach(item => {
    xAxisDate.push(item.name);
  });

  if (xAxisDate.length === 24) {
    unit = "时";
  }
  if (xAxisDate.length === 12) {
    unit = "月";
  }
  if('%' === _param.suffix) {
    yAxis = {
      min : 0,
      max : 100,
      axisLabel: {
        formatter: '{value}%'
      }
    }
  }

  let option = {
    title: {
      text: _param.title
    },
    color : [ '#2595d4', '#1bb2d8', '#99d2dd', '#88b0bb', '#1c7099', '#038cc4', '#75abd0', '#afd6dd' ],
    grid : {
      borderWidth : 0,
      x : 45,
      y : 25,
      x2 : 45,
      y2 : 40
    },
    tooltip: {
      trigger : 'axis',
      formatter : "{b}\<br/>{c}"+ (_param.suffix || ''),
      textStyle : {
        fontSize : 12
      }
    },
    xAxis: {
      type: "category",
      name: unit,
      boundaryGap: false,
      data: xAxisDate,
      axisLabel: {
        rotate: 45,
        formatter : function(value) {
          value = value.replace(/[\r\n]/g,"").substr(0,12); //去掉回车换行,只显示10个
          var d = [], i = 0;
          var temp;
          while (true) {
            temp = value.substr(i * 6, 6);
            d.push(temp);
            i++;
            if (temp < 6) {
              break;
            }
          }
          return d.join('\n');
        }
      }
    },
    yAxis: yAxis,
    series: [
      {
        data: data,
        type: "line",
      }
    ]
  }

  if (sOption && Object.prototype.toString.call(sOption) === '[object Object]') {
    option = extend({}, option, sOption)
  }
  myChart.setOption(option)

  window.addEventListener("resize", e => {
    if (myChart) {
      myChart.resize();
    }
    e.stopPropagation();
  })
}

/**
 * 初始饼图
 * @param  id {String}  domid
 * @param  data {Array} 数据 => [{name: 'a', value: 0}, ...]
 * @param  sOption {Object} 配置项(可不传)
 */
function initPie(id, data = [], sOption = null) {

  const $id = document.getElementById(id);
  if(!data || 0 === data.length) {
    $id.innerHTML = EMPY_NODE
    return
  }

  // @ts-ignore
  const myChart = echarts.init($id);
  myChart.hideLoading();
  // @ts-ignore
  const eg = echarts.getInstanceByDom($id);
  if (eg) {
    eg.clear();
  }

  let option = {
    title: {
      text: ""
    },
    color : ["#3e68a9","#3db2b2","#57b06d","#e9c84b","#d65d72","#735b9e",'#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#9c27b0', '#009688' ],
    tooltip : {
      trigger: 'item',
      formatter: "{b} <br/>数量: {c} <br/>占比: {d}%"
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 10
    },
    legend: {
      // type: 'scroll',
      orient: 'vertical',
      x : 'right',
      right: 0,
      top: 10,
      bottom: 20,
      formatter: function(name) {
        for (let i = 0; i < data.length; i++) {
          if (name === data[i].name) {
            return name + '(' + data[i].value + ')';
          }
        }
      },
      data: data
    },
    series : [{
      name: '',
      type: 'pie',
      clockWise: false,
      // radius: ["40%", "55%"],
      radius : [ 30, 100 ],
      center: ['50%', '50%'],
      data: data
    }]
  }

  if (sOption && Object.prototype.toString.call(sOption) === '[object Object]') {
    option = extend({}, option, sOption)
  }

  myChart.setOption(option)

  window.addEventListener("resize", e => {
    if (myChart) {
      myChart.resize();
    }
    e.stopPropagation();
  })
  
}

/**
 * 初始仪表盘
 * @param  id {String}  domid
 * @param  value 
 * @param  name 
 * @param  sOption {Object} 配置项(可不传)
 */
function initGauge(id, value, name, sOption = null) {
  !value && (value = 0);
  !name && (name = '');
  // @ts-ignore
  const $id = document.getElementById(id);
  const myChart = echarts.init($id);
  myChart.hideLoading();
  // @ts-ignore
  const eg = echarts.getInstanceByDom($id);
  if (eg) {
    eg.clear();
  }

  let option = {
    backgroundColor : 'transparent',
    series: [{
      textStyle: {
        color: '#fff'
      },
      type: 'gauge',
      radius : 135,
      center : [ '50%', '95%' ],
      splitNumber: 10,
      startAngle : 180,
      endAngle : 0,
      axisLine: {
        show: true,
        lineStyle: {
          width: 15,
          color: [
            [
              1, 
              new echarts.graphic.LinearGradient( 0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5c53de'
                },
                {
                  offset: 1,
                  color: '#18c8ff'
                }
              ])
            ],
            // [
            //   1, '#87858e'
            // ]
          ]
        }
      },
      axisTick: { // 坐标轴小标记
        show: true, // 属性show控制显示与否，默认不显示
        splitNumber: 5, // 每份split细分多少段
        length: 6, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
            color: '#eee',
            width: 1,
            type: 'solid'
        }
      },
      splitLine: { // 分隔线
        length: 20, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      pointer: {
        width: 5,
        length : '90%',
      },
      itemStyle: {
        color : 'rgba(206, 209, 214, 0.8)'
      },
      detail: {
        show: true,
        offsetCenter: [0, -30],
        textStyle: {
          fontSize: 25,
          color : 'auto'
        },
        formatter : '{value}%',
      },
      data : [ {
        value : value,
        name : name
      } ]
    }]
  }

  if (sOption && Object.prototype.toString.call(sOption) === '[object Object]') {
    option = extend({}, option, sOption)
  }

  myChart.setOption(option)

  window.addEventListener("resize", e => {
    if (myChart) {
      myChart.resize();
    }
    e.stopPropagation();
  })
  
}