import React from 'react';
import { Row, Col, Card, Table, Popover, Button, Radio, Badge } from 'antd';
import DateSelect from '@/components/DateSelect';
import SearchForm from '@/components/SearchForm';
import { extend } from '@/common/js/utils';
import { getAntivirusRateDetails } from "@/services/services";
import AssetBar from './assetBar';
import AssetPie from './assetPie';
import AssetRing from './assetRing';


export default class extends React.PureComponent<any> {

  state = {
    date: 'week',
    activeKey: 'assetTabPane1',
    tabs: [
			{
				title: '终端信息',
				key: 'assetTabPane1',
			},
		], // 页签列表
    // terminalType: 'DeviceAll', // 设备注册情况
    tableData: [], // 表格数据
  }
  columns = [
    {
      title: '设备名称',
      key: 'DeviceName',
      dataIndex: 'DeviceName',
      width: 130,
    },
    {
      title: 'IP地址',
      key: 'IPAddres',
      dataIndex: 'IPAddres',
      width: 130,
      render: (text, editObject) => {
        if("string" == typeof text && text.includes(';')) {
          text = text.replace(';','\n')
        }
        return text
      }
    },
    {
      title: 'MAC地址',
      key: 'MacAddress',
      dataIndex: 'MacAddress',
      width: 130,
      render: (text, editObject) => {
        if("string" == typeof text && text.includes(';')) {
          text = text.replace(';','\n')
        }
        return text
      }
    },
    {
      title: '单位',
      key: 'DeptName',
      dataIndex: 'DeptName',
      width: 100,
    },
    {
      title: '部门',
      key: 'OfficeName',
      dataIndex: 'OfficeName',
      width: 100,
    },
    {
      title: '设备类型',
      key: 'DeviceType',
      dataIndex: 'DeviceType',
      width: 100,
    },
    {
      title: '是否注册',
      key: 'Registered',
      dataIndex: 'Registered',
      width: 85,
      render(val) {
        return ('1' == val) ? <Badge status='success' text='已注册' />:<Badge status='default' text='未注册' />
      },
    },
    {
      title: '是否开机',
      key: 'RunStatus',
      dataIndex: 'RunStatus',
      width: 85,
      render(val) {
        return ('1' == val) ? <Badge status='success' text='已开机' />:<Badge status='default' text='未开机' />
      }
    },
    {
      title: '防病毒品牌',
      key: 'KvsCompany',
      dataIndex: 'KvsCompany',
      width: 85,
      className: 'IPAddres',
    },
    {
      title: '操作系统',
      key: 'OSType',
      dataIndex: 'OSType',
    }
  ]

  componentWillMount() {
    const param = {'indicator': 'DeviceAll', 'regId': this.props.pane.guid, 'registered': 1, 'UserName': '', 'OfficeName': '', 'DeviceName': '', 'IPAddres': ''};
    this.getTerminalDetails(param) // 终端信息表格
  }

  componentDidMount() {
  }

  getTerminalDetails = (param) => {
    getAntivirusRateDetails(param).then(data => {
      if(Array.isArray(data)) {
        this.setState({
          tableData: data
        })
      }
    })
  }

  onSelectDate = (date) => {
    if(date === this.state.date) return;
		this.setState({ date })
  }
  
  onSearchForm = (items) => {
    const param = {'indicator': 'DeviceAll', 'regId': this.props.pane.guid, 'registered': 1, 'UserName': '', 'OfficeName': '', 'DeviceName': '', 'IPAddres': ''};
    const _param = extend({}, param, items)
    this.getTerminalDetails(_param) // 终端信息表格
  }

  onChangeTable = (pagination, filters, sorter, data) => {
    console.log(pagination)
  }

  search = (value) => {
    
  }

  render() {
    const { guid } = this.props.pane;
    const { tabs, activeKey, date } = this.state;

    return (
      <div className='assetPage'>
        <DateSelect
          callBack={this.onSelectDate}
        />
        <Row className="middle" gutter={8}>
          <Col span={6}>
            <Card title="设备注册情况" bordered={false} className='echarts'>
              <AssetRing guid={guid} date={date} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="单位注册率TOP5" bordered={false} className='echarts'>
              <AssetBar guid={guid} date={date} />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="终端版本分布" bordered={false} className='echarts'>
              <AssetPie guid={guid} date={date} />
            </Card>
          </Col>
        </Row>
        <Row className="bottom">
          <Card title="终端信息" bordered={false} className='chart' >
            <Row type="flex" align="middle" style={{height: 50, borderTop: 0}}>
              <Popover
                content={<SearchForm callBack={this.onSearchForm} items={['UserName', 'OfficeName', 'DeviceName', 'IPAddres']}></SearchForm>}
                trigger="click"
                placement="right"
                title="选择查询条件"
              >
                <Button icon="search">查询</Button>
              </Popover>
            </Row>
            <Row className="tablewarp">
              <Table
                size="small"
                className="table"
                rowKey='Guid'
                columns={this.columns}
                indentSize={0}
                dataSource={this.state.tableData}
                onChange={this.onChangeTable}
                pagination={{ pageSize: 10, showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100', '500'] }}
                scroll={{ y: true }}
              ></Table>
            </Row>
          </Card>
        </Row>
      </div>
    )
  }
}

