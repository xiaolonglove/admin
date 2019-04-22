/**
 * echarts 仪表盘组件
 * @param domId {String} 
 * @param value {String} 
 * @param name {String} 
 * @param option {Object} 
 */
import React from 'react';
import { initGauge } from "@/common/js/echartsHelper";

export default class extends React.PureComponent<any> {

  timer = null

  componentDidMount() {
    const { domId, value, name, option } = this.props;
    this.timer = setTimeout(()=>{
      initGauge(domId, value, name, option)
    }, 0);
  }

  componentWillUnmount() {
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  render() {
    return  <div id={ this.props.domId } style={{ width: "100%", height: "100%" }}></div>
  }
}