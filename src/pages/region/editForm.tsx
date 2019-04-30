import React from 'react';
import { Button, Form, Drawer, Input, Row, Col, InputNumber, TreeSelect, Select, Alert, Icon, message } from 'antd';
import { connect } from 'dva';
import echarts from "echarts";
import 'echarts/map/js/china';
import { getSecuritydomainTree } from "@/services/services";


const Item = Form.Item,
TreeNode = TreeSelect.TreeNode;

class editForm extends React.PureComponent<any> {

  state = {
    treeData: [],
    expandMap: false,
    maplng: null,  // 当前点击的坐标
    maplat: null, // 当前点击的坐标
  }

  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  componentWillMount() {
    this.getTreeData()
  }

  handleChangeTree = (securityId) => {
    this.setState({ securityId });
  }

  onGeoCoord = (geoCoord) => {

    var lng = new Number(geoCoord[0]);
    var lat = new Number(geoCoord[1]);

    this.setState({
      maplng: lng.toFixed(4),
      maplat: lat.toFixed(4),
    })
  }

  getTreeData = () => {
    getSecuritydomainTree().then(treeData => {
      if(Array.isArray(treeData)) {
        this.setState({
          treeData
        })
      }
    })
  }

  render() {
    const { isShow, row, type, len, form } = this.props,
    { regName, securityId, regIp, port, organCode, serverType, sortField, validity, lat, lng} = row,
    { getFieldDecorator } = form,
    { treeData, expandMap, maplng, maplat } = this.state,
    formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    const renderTreeNodes = data => data.map((item) => {
      if (item.hasChildren) {
        return (
          <TreeNode title={item.text} value={item.id} key={item.id}>
            {renderTreeNodes(item.childNodes)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.text} value={item.id} key={item.id} />
    });
    
    return (
      <Drawer
        className="region-drawer"
        width={720}
        title={ 'add'=== type? '添加': '编辑'}
        visible={isShow}
        destroyOnClose
        onClose={this.props.onCancel}
      >   
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Item label='区域名称' { ...formItemLayout }>
                {getFieldDecorator(
                    'regName',
                    {
                      initialValue: undefined !== regName? regName: '',
                      rules: [
                        {required: true, message: '请输入区域名称!'},
                      ]
                    }
                  )(
                    <Input placeholder={ "请输入" }/>
                  )
                }
              </Item>
            </Col>
            <Col span={12}>
              <Item label='安全域' { ...formItemLayout }>
                {getFieldDecorator(
                    'securityId',
                    {
                      initialValue: undefined !== securityId? securityId: '',
                      rules: [ 
                        {required: true, message: '请输入安全域!'}
                      ]
                    }
                  )(
                    <TreeSelect
                      showSearch
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="请选择安全域"
                      allowClear
                      treeDefaultExpandAll
                      onChange={this.handleChangeTree}
                    >
                      {renderTreeNodes(treeData)}
                    </TreeSelect>
                  )
                }
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item label='区域IP' { ...formItemLayout }>
                {getFieldDecorator(
                    'regIp',
                    {
                      initialValue: undefined !== regIp? regIp: '',
                      rules: [ 
                        {required: true, whitespace: true, message: '请输入正确的区域IP!', pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
                      ]
                    }
                  )(
                    <Input placeholder={ "请输入" }/>
                  )
                }
              </Item>
            </Col>
            <Col span={12}>
              <Item label='区域端口号' { ...formItemLayout }>
                {getFieldDecorator(
                    'port',
                    {
                      initialValue: undefined !== port? port: '80',
                      rules: [
                        {required: true,  whitespace: true, message: '请输入正确的端口号!', pattern: /^\d*\.?\d+$/}
                      ]
                    }
                  )(
                    <Input min={0} style={{width: '100%'}} placeholder={ "请输入" }/>
                  )
                }
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item label='级联代码' { ...formItemLayout }>
                {getFieldDecorator(
                    'organCode',
                    {
                      initialValue: undefined !== organCode? organCode: '',
                      rules: [ 
                        {required: true, message: '请输入级联代码!'}
                      ]
                    }
                  )(
                    <InputNumber min={0} style={{width: '100%'}} placeholder={ "请输入" }/>
                  )
                }
              </Item>
            </Col>
            <Col span={12}>
              <Item label='服务器类型' { ...formItemLayout }>
                {getFieldDecorator(
                    'serverType',
                    {
                      initialValue: undefined !== serverType? serverType: 1,
                      rules: [ 
                        {required: true, message: '请选择服务器类型!'}
                      ]
                   }
                  )(
                    <Select>
                      <Select.Option value={1}>注册服务器</Select.Option>
                      <Select.Option value={0}>级联服务器</Select.Option>
                    </Select>
                  )
                }
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item label='排序字段' { ...formItemLayout }>
                {getFieldDecorator(
                    'sortField',
                    {
                      initialValue: undefined !== sortField? sortField: len+1+'',
                      rules: [ 
                        {required: true, message: '请输入排序字段!'}
                      ]
                    }
                  )(
                    <InputNumber min={0} style={{width: '100%'}} placeholder={ "请输入" }/>
                  )
                }
              </Item>
            </Col>
            <Col span={12}>
              <Item label='有效性' { ...formItemLayout }>
                {getFieldDecorator(
                    'validity',
                    {
                      initialValue: undefined !== validity? validity: 1,
                      rules: [ 
                        {required: true, message: '请选择有效性!'}
                      ]
                    }
                  )(
                    <Select 
                      style={{ width: 120 }} 
                    >
                      <Select.Option value={1}>有效</Select.Option>
                      <Select.Option value={0}>无效</Select.Option>
                    </Select>
                  )
                }
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Item label='坐标' labelCol={{ span: 14} } wrapperCol={ {span: 10}} >
                {getFieldDecorator(
                    'lng',
                    {initialValue: (maplng? maplng: lng) || ''}
                  )(
                    <Input style={{width: 110, position: 'relative', left: 6}} placeholder={ "经度" }/>
                  )
                }
              </Item>
            </Col>
            <Col span={6}>
              <Item label='' labelCol={{ span: 0} } wrapperCol={ {span: 10, offset: 6} }>
                {getFieldDecorator(
                    'lat',
                    {initialValue: (maplat? maplat: lat) || ''}
                  )(
                    <Input style={{width: 110}} placeholder={ "纬度" }/>
                  )
                }
              </Item>
            </Col>
          </Row>
          <RegionMapModel callback={this.onGeoCoord} lng={lng} lat={lat} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.props.onCancel} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </div>
        </Form>
        
      </Drawer>
    )
  }
}

export default Form.create({})(editForm)


class RegionMap extends React.PureComponent<any> {

  state = {
    expandMap: false,
  }

  time; 
  timer;
  flag = 1;

  componentWillMount() {
    this.props.dispatch({
      type: "mapValue/query"
    });
  }

  componentWillUnmount() {
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  toggleExpandMap = () => {
    this.setState({
      expandMap: !this.state.expandMap,
    });

    if(this.flag) {
      this.timer = setTimeout(() => {
        const { mapValue, lng, lat } = this.props;
        this.initMap('regionDrawerMap', mapValue.mapType, lng, lat)
      }, 0);
      this.flag = 0;
    } // 多次展开关闭地图情况下，只加载一次地图
  }

  initMap = (domId, mapType, lng, lat) => {
    var mapName = 'china';
    // var mapFeatures = echarts.getMap(mapName).geoJson;
  
    var option = {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      geo: {
        show: true,
        map: mapName,
        roam: true,
        label: {
          normal: {
            show: true,
            fontSize: 11,
            color: 'rgba(0, 0, 0, 0.6)'
          },
          emphasis: {
            color: "rgba(0, 0, 0, 0.8)",
            fontSize: 14,
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#5c5c5c'
          },
          emphasis: {
            borderColor: '#5c5c5c',
            areaColor: '#f1f5f7',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      },
      series: [
        {
          id: 'map',
          type: 'map',
          mapType: mapName,
          geoIndex: 0,
          aspectScale: 0.75, //长宽比
          roam: true,
          animation: false,
          // label: {
          //   normal: {
          //     show: true,
          //     fontSize: 12,
          //     color: 'rgba(0, 0, 0, 0.6)'
          //   },
          //   emphasis: {
          //     color: "rgba(0, 0, 0, 0.8)",
          //     fontSize: 14,
          //   }
          // },
          // itemStyle: {
          //   normal: {
          //     borderColor: '#5c5c5c'
          //   },
          //   emphasis: {
          //     borderColor: '#5c5c5c',
          //     areaColor: '#f1f5f7',
          //     shadowOffsetX: 0,
          //     shadowOffsetY: 0,
          //     shadowBlur: 20,
          //     borderWidth: 0,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)'
          //   }
          // },
          // data: []
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin', //气泡
          symbolSize: 24,
          label: {
            normal: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              color: 'red', //标志颜色
            }
          },
          zlevel: 6,
          data: [{name: '', value: [lng, lat, 0]}],
        },
      ]
    }


    // @ts-ignore
    const myChart = echarts.init(document.getElementById(domId));
    myChart.hideLoading();
    // @ts-ignore
    const eg = echarts.getInstanceByDom(document.getElementById(domId));
    if (eg) {
      eg.clear();
    }
    myChart.setOption(option);
    myChart.off("click");
    myChart.on("click", (params) => {

      // 防止多次点击
      var date = new Date().getTime();
      if(this.time) {
        var timeDiff = (date - this.time) / 1000;
        if(timeDiff < .5) {
          message.warning("点击过于频繁,请稍后再次操作！");
          return;
        }
      }
      this.time = date;

      // 获得物理坐标
      const x = params.event.offsetX, y = params.event.offsetY;
      // 获得地理坐标
      var geoCoord = myChart.convertFromPixel({seriesId: 'map'}, [x, y]);

      this.initMap(domId, mapType, geoCoord[0], geoCoord[1])
      const { callback } = this.props;
      if(callback) {
        callback(geoCoord)
      }
    });
  }

  render() {
    const { expandMap } = this.state;
    const { mapValue } = this.props;

    return (
        mapValue.success
        ?<div className="regionMap-box">
          <a style={{ position: 'absolute', top: -45, left: 355 }} onClick={this.toggleExpandMap}>
            { expandMap? '收起地图': '展开地图' }<Icon type={expandMap? 'up': 'down'} />
          </a>
          <Row className={expandMap? "chart": "chart hide"} >
            <Alert message="点击地图获取坐标" type="info" showIcon />
            <div className="chart-box">
              <div className="chart" id="regionDrawerMap"></div>
            </div>
          </Row>
        </div>
        : ''
    )
  }
}
const RegionMapModel = connect(({ mapValue }) => ({ mapValue }))(RegionMap)