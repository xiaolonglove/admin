/**
 * 设备注册情况
 */
import * as React from 'react';
import echarts from "echarts";
import { initPie } from "@/common/js/echartsHelper";
import { getIndicateValue } from "@/services/services";


export default class extends React.PureComponent<any> {

  componentDidMount() {
    this.getChartData()
  }

  componentDidUpdate() {
    this.getChartData()
  }

  getChartData = () => {
    const { guid, date } = this.props;
    getIndicateValue('DeviceRegisterCount,DeviceRegisteredCount', guid, date).then(data => {
      const { DeviceRegisterCount, DeviceRegisteredCount } = data, unDeviceRegisterCount = DeviceRegisterCount - DeviceRegisteredCount;
      this.setRingEcharts('equipment_'+ guid, "", [{name: '已注册', value: DeviceRegisterCount},{name: '未注册', value: unDeviceRegisterCount}])
    })
  }

  // 环形图
  setRingEcharts = (domId, title, data, option = null) =>{
    const $id = document.getElementById(domId);
    if(!data || 0 === data.length) {
      $id.innerHTML = '图表无数据！'
      return
    }

    const xData = data.map(item => {
      return {
        "name": item.name,
        "icon": "circle",
      }
    });

    var setting = {
      title: {
        text: title,
        left: '43%',
        textStyle: {
          fontWeight: 400,
          fontSize: 15
        }
      },
      backgroundColor : 'transparent',
      color : ["#3e68a9","#3db2b2","#57b06d","#e9c84b","#d65d72","#735b9e"],
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 10
      },
      legend: {
        orient: 'horizontal',
        width: 100,
        height: 150,
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        left: '80',
        bottom: '35%',
        textStyle: {
          fontSize: 14,
        },
        formatter: function(name) {
          for (let i = 0; i < data.length; i++) {
            if (name == data[i].name) {
              return name + '  ' + data[i].value ;
            }
          }
        },
        data: xData
      },
      tooltip : {
        trigger : 'item',
        formatter : "{b} {d}%",
        textStyle : {
          fontSize : 12
        }
      },
      calculable : false,
      series : [ {
        name : '',
        type : 'pie',
        radius : [ '75%', '88%' ],
        center : [ '140', '50%' ],
        label: {
          normal: {
            show: false
          }
        },
        data : data
      } ]
    };
    
    let myChart = null;
    // @ts-ignore
    myChart = echarts.init($id);
    myChart.hideLoading();
    // @ts-ignore
    let eg = echarts.getInstanceByDom($id);
    if (eg) {
      eg.clear();
    }

    myChart.setOption(setting);

    window.addEventListener("resize", e => {
      if (myChart) {
        myChart.resize();
      }
      e.stopPropagation();
    })
  };

  render() {
    return <div id={ 'equipment_' + this.props.guid } style={{ width: "100%", height: "100%" }}></div>
  }
}