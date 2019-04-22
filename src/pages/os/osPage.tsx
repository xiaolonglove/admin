import React from 'react';
import { Tabs, Row, Col, Card, Table, Icon, Empty } from 'antd';
import { getOperatingSystem, getOperatingSystemXpTop, getOperatingSystemWin7Top } from "@/services/services";
import EchartsPie from '@/components/EchartsPie';


const columns1 = [
  {
    title: '类型',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '数量',
    dataIndex: 'value',
    width: 150,
  }
],
columns2 = [
  {
    title: '区域名称',
    dataIndex: 'regName',
    width: 150,
  },
  {
    title: '数量',
    dataIndex: 'os_xp',
    width: 150,
  }
],
columns3 = [
  {
    title: '区域名称',
    dataIndex: 'regName',
    width: 150,
  },
  {
    title: '数量',
    dataIndex: 'os_7',
    width: 150,
  }
]

export default class extends React.Component<any> {
  state = {
    activeKey: 'osTabPane1',
    tabs: [
			{
				title: '操作系统统计',
				key: 'osTabPane1',
			}
		], // 页签列表
    tabPaneData1: [], // 表格数据1
    tabPaneData2: [], // 表格数据2
    tabPaneData3: [], // 表格数据3
  }

  componentWillMount() {
    const { guid } = this.props.pane;

    this.getTabPaneData1(guid)
    if('0' === guid) {
      this.setState({
        tabs: [
          {
            title: '操作系统统计',
            key: 'osTabPane1',
          },
          {
            title: 'XP系统区域排名',
            key: 'osTabPane2',
          },
          {
            title: 'WIN7系统区域排名',
            key: 'osTabPane3',
          },
        ]
      })
      this.getTabPaneData2(guid)
      this.getTabPaneData3(guid)
    }
  }

  componentDidMount() {
  }

  // 避免父组件状态更改，重复渲染图表
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeKey != nextState.activeKey
    || this.state.tabPaneData1 != nextState.tabPaneData1
    || this.state.tabPaneData2 != nextState.tabPaneData2
    || this.state.tabPaneData3 != nextState.tabPaneData3
  }

  getTabPaneData1 = (guid) => {
    getOperatingSystem(guid).then(data => {
      if(Array.isArray(data)) {
        this.setState({
          tabPaneData1: data,
        })
      }
    })
  }

  getTabPaneData2 = (guid) => {
    getOperatingSystemXpTop(guid).then(data => {
      if(Array.isArray(data)) {
        this.setState({
          tabPaneData2: data
        })
      }
    })
  }

  getTabPaneData3 = (guid) => {
    getOperatingSystemWin7Top(guid).then(data => {
      if(Array.isArray(data)) {
        this.setState({
          tabPaneData3: data
        })
      }
    })
  }


  render() {
    const { guid } = this.props.pane;
    const { activeKey, tabs, tabPaneData1, tabPaneData2, tabPaneData3 } = this.state;
    
    return (
      <Row className="osPage" gutter={8}>
        <Col span={12}>
          <Card title="操作系统统计" bordered={false} className='chart'>
            {
              tabPaneData1.length
              ? <EchartsPie domId={ 'osPie_'+guid } data={tabPaneData1} />
              : <Empty />
            }
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} className='chart'>
            <Tabs 
              hideAdd
              animated={true}
              type="editable-card"
              defaultActiveKey="0"
              activeKey={activeKey}
              onChange={(activeKey) => this.setState({ activeKey })}
            >
              {

                tabs.map((item, i) => {
                  let dataSource = [], columns = [];
                  switch (item.key) {
                    case 'osTabPane1':
                      dataSource = tabPaneData1;
                      columns = columns1;
                      break;
                    case 'osTabPane2':
                      dataSource = tabPaneData2;
                      columns = columns2;
                      break;
                    case 'osTabPane3':
                      dataSource = tabPaneData3;
                      columns = columns3;
                      break;
                    default:
                      dataSource = tabPaneData1
                      columns = columns1;
                      break;
                  }
                  return (
                    <Tabs.TabPane 
                      tab={item.title} 
                      key={item.key} 
                      closable={false}
                    >
                      <Table
                        size="small"
                        columns={columns}
                        pagination={false}
                        dataSource={dataSource}
                      ></Table>
                    </Tabs.TabPane>
                  )
                })

              }
            </Tabs>
          </Card>
        </Col>
      </Row>
    )
  }
}

