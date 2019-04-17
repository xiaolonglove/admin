/**
 * 单位注册率TOP5
 */
import * as React from 'react';
import { initBar } from "@/common/js/echartsHelper";
import { getLevelLine } from "@/services/services";


export default class extends React.PureComponent<any> {

  componentDidMount() {
    this.getChartData()
  }

  componentDidUpdate() {
    this.getChartData()
  }

  getChartData = () => {
    const { guid, date } = this.props;
    getLevelLine('DeviceRegisterRate', guid, date).then(data => {
      if(Array.isArray(data)) {
        initBar('registerRateTop5_'+ guid, data, {suffix: '%', xname: '单位', yname: '百分比'})
      }
    })
  }

  render() {
    return <div id={ 'registerRateTop5_' + this.props.guid } style={{ width: "100%", height: "100%" }}></div>
  }
}