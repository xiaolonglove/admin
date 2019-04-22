/**
 * echarts 饼图组件
 * @param domId {String} 
 * @param data {Array} > [{name: '', value: 0}]
 * @param option 
 */
import React from 'react';
import { initPie } from "@/common/js/echartsHelper";
import { Empty } from 'antd';

export default class extends React.PureComponent<any> {

  timer = null

  componentDidMount() {
    const { domId, data, option } = this.props;

    if(!Array.isArray(data) || !data.length) return;

    this.timer = setTimeout(()=>{
      initPie(domId, data, option)
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