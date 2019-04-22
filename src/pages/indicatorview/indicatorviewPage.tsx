/* 
	指标概览
*/
import React from 'react';
import { Row, Col, Card, Table, Empty } from 'antd';
// import { getIpusageList, getIPRate } from "@/services/services";
import EchartsGauge from '@/components/EchartsGauge';
import EchartsBar from '@/components/EchartsBar';
import './indicatorview.scss';


export default class extends React.PureComponent<any> {
	state = {
    tableData1: [],
    tableData2: [],
    registerRate: "",
    patchInstallRate: "",
  }

  componentWillMount() {
    this.getData(this.props.pane.guid)
  }

  columns1 = [
    {
      title: '类型',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '数量',
      dataIndex: 'value',
      width: 150,
    }
  ]

  columns2 = [
    {
      title: '类型',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '数量',
      dataIndex: 'value',
      width: 150,
      render: (text, editObject) => {
        return text + "%"
      }
    }
  ]

  getData = (guid) => {
    // getIPRate(guid).then((result) => {
    //   this.setState({
    //     gaugeValue: result,
    //   })
    // })
    // getIpusageList(guid).then((result) => {
    //   if(Array.isArray(result)) {
    //     this.setState({
    //       tableData: rows,
    //     })
    //   }
    // })
  }
    

  render() {
    const { guid } = this.props.pane;
    const { tableData1, tableData2, registerRate, patchInstallRate } = this.state;

    return (
      <div className="indicatorview">
        <Row className="top" gutter={8}>
          <Col span={10} className="col">
            <Card title={'0' === guid ?'各公司平均注册率': '注册率'} bordered={false} className='chart'>
            {
              ("" == registerRate)
              ? <Empty />
              : <EchartsGauge domId={'ipusageWholeGauge_' + guid} value={registerRate} option={{series: getSeries(registerRate)}}/>
            }
            </Card>
          </Col>
          <Col span={14} className="col">
            <Card title="终端注册数" bordered={false} className='chart'>
              <Table
                size="small"
                columns={this.columns1}
                indentSize={0}
                dataSource={tableData1}
                pagination={ false }
              ></Table>
            </Card>
          </Col>
        </Row>
        <Row className="bottom" gutter={8}>
          <Col span={10} className="col">
            <Card title={'0' === guid ?'各公司平均重要补丁安装率': '重要补丁安装率'} bordered={false} className='chart'>
            {
              ("" == patchInstallRate)
              ? <Empty />
              : <EchartsGauge domId={'ipusageWholeGau1ge_' + guid} value={patchInstallRate} option={{series: getSeries(patchInstallRate)}}/>
            }
            </Card>
          </Col>
          <Col span={14} className="col">
            <Card title="终端重要补丁安装率" bordered={false} className='chart'>
              <Table
                size="small"
                columns={this.columns2}
                indentSize={0}
                dataSource={tableData2}
                pagination={ false }
              ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function getSeries(value) {
  return [{
    textStyle: {
      color: '#fff'
    },
    type: 'gauge',
    radius : 135,
    center : [ '50%', '70%' ],
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
      name : ""
    } ]
  }]
}