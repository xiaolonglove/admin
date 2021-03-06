/**
 * echarts 折线图组件
 * @param domId {String} 
 * @param data {Array} > [{name: '', value: 0}]
 * @param param {Object} 
 * @param option 
 */
import React from 'react';
import { initLine } from "@/common/js/echartsHelper";
import { Empty } from 'antd';

export default class extends React.PureComponent<any> {

  timer = null

  componentDidMount() {
    const { domId, data, param, option } = this.props;

    if(!Array.isArray(data) || !data.length) return;

    this.timer = setTimeout(()=>{
      initLine(domId, data, param, option)
    }, 0);
  }

  componentWillUnmount() {
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  render() {
    const { data } = this.props;

    return (Array.isArray(data) && data.length)
      ? <div id={ this.props.domId } style={{ width: "100%", height: "100%" }}></div>
      :<Empty />;
  }
}