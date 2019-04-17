/**
 * 终端版本号分布
 */
import * as React from 'react';
import { initPie } from "@/common/js/echartsHelper";
import { getPatchRate } from "@/services/services";


export default class extends React.PureComponent<any> {

  componentDidMount() {
    this.getChartData()
  }

  componentDidUpdate() {
    this.getChartData()
  }

  getChartData = () => {
    const { guid, date } = this.props;
    getPatchRate(guid, date).then(data => {
      if(Array.isArray(data)) {
        const option = {
          legend: {
            orient: 'vertical',
            x : 'right',
            icon: 'circle',
            right: 0,
            top: 10,
            itemHeight: 8,
            itemWidth: 8,
            bottom: 20,
            padding: 0,
            data: data
          },
          series: [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ["40%", "55%"], 
            center: ['35%', '50%'],
            data: data
          }]
        }
        initPie('patchRate_'+ guid, data, option)
      }
    })
  }



  render() {
    return <div id={ 'patchRate_' + this.props.guid } style={{ width: "100%", height: "100%" }}></div>
  }
}