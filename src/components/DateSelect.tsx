/**
 * 日期选择组件
 * Option: 
 * @param callBack {Function} 回调 => (date)
 */
import React from 'react';

export default class extends React.PureComponent<{ callBack: Function }> {

  state = {
    date: "week", //控制周月年的颜色
  }

  //天周年月查询
  searchClick = (value) => {
    
    if(value === this.state.date) return;
    this.setState({
      date: value
    });
    this.props.callBack(value)
  };
 
  render() {
    const {date} = this.state;

    return (
      <div style={{ padding: '0 18px 6px'}}>
        统计周期 【
        <a style={{ color: date == "week" ? "red" : "", padding: '0 6px' }}
          onClick={() => {
            this.searchClick("week");
          }}
        >
          周
        </a>
        <a style={{ color: date == "month" ? "red" : "", padding: '0 6px' }}
          onClick={() => {
            this.searchClick("month");
          }}
        >
          月
        </a>
        <a style={{ color: date == "year" ? "red" : "", padding: '0 6px' }}
          onClick={() => {
            this.searchClick("year");
          }}
        >
          年
        </a>
        】
      </div>
    )
  }
}