import React from 'react';
import { Row, Card, Table, Button, InputNumber, Input, message, Drawer, Icon, Badge, Popconfirm } from 'antd';
import Renders  from '@/utils/Renders';
import _ from 'lodash';
import { getChildCascadeAndSelf, hasChildRegion, delRegion} from "@/services/services";
import BreadcrumbTitle from "@/components/breadcrumbTitle";
import EditForm from "./editForm";
import './index.scss'

const authStatus = Renders.statusRender({
  error: {
    name: '未激活',
    value: '0'
  },
  success: {
    name: '激活',
    value: '1'
  }
}), 
validity_status = Renders.statusRender({
  error: {
    name: '无效',
    value: '0'
  },
  success: {
    name: '有效',
    value: '1'
  }
}),
initForm = {
  isShow: false,
  formType: 'add',
  formRow: {},
};

export default class extends React.PureComponent<any> {

	state = {
    regName: '',
    regIp: '',
    tableData: [],
    ...initForm
  }

  columns = [
    {
      title: '序号',
      width: 40,
      render:(text, row, i) =>
      i+1
    },
    {
      title: '级联名称',
      dataIndex: 'regName',
      // key: 'regName',
      width: 150,
    },
    {
      title: '管理级联IP',
      dataIndex: 'regIp',
      // key: 'regIp',
      width: 120,
    },
    {
      title: '级联代码',
      dataIndex: 'organCode',
      // key: 'organCode',
      width: 80,
    },
    {
      title: '版本',
      dataIndex: 'version',
      // key: 'version',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'authStatus',
      // key: 'authStatus',
      width: 120,
      render: authStatus
    },
    {
      title: '有效性',
      dataIndex: 'validity',
      // key: 'validity',
      width: 120,
      render: validity_status
    },
    {
      title: '排序',
      dataIndex: 'sortField',
      // key: 'sortField',
      width: 50,
    },
    {
      title: '反馈信息',
      dataIndex: 'message',
      // key: 'message',
      width: 120,
    },
    {
      title: '同步时间',
      dataIndex: 'synchronizationDate',
      // key: 'synchronizationDate',
    },
    {
      title: '操作',
      dataIndex: '',
      className: 'table-actions',
      render: (text, row, i) => {
        return [
          <Icon type="edit" title='编辑' onClick={() => {
            this.setState({
              isShow: true,
              formType: 'edit',
              formRow: row
            })
          }}></Icon>,
          <Popconfirm 
            title="是否删除该级联?" 
            onConfirm={() => { this.handleDelate(row)}} 
            okText="确定" 
            cancelText="取消"
          >
            <Icon type="delete" title={`删除`}></Icon>
          </Popconfirm>
        ]
      }
    },
  ]

  componentWillMount() {
    this.getTableData({guid: this.props.pane.guid})
  }

  handleAdd = () => {
    this.setState({
      isShow: true,
      formType: 'add',
      formRow: {}
    })
  }

  handleDelate = (row) => {
    hasChildRegion(row.guid).then((result) => {
      if('0' !== result) {
        message.warning("该级联含有下级级联，请先删除下级级联！");
        return;
      }

      delRegion(row.guid).then((res) => {
        if('0' !== result) {
          message.error("删除失败！");
          return;
        }
        message.success("删除成功！");
        this.getTableData({guid: this.props.pane.guid})
      })
      
    })
    console.log(row)
  }

  onCancelForm = () => {
    this.setState({...initForm});
    this.getTableData({guid: this.props.pane.guid})
  }

  getTableData = (param = {}) => {
    getChildCascadeAndSelf(param).then((result) => {
      if(Array.isArray(result)) {
        this.setState({
          tableData: result
        })
      }
    })
  }

  render() {
    const { pane } = this.props;
    const { regName, regIp, tableData, isShow, formRow, formType } = this.state;
    const online = tableData.filter(item => item.authStatus);
    const dataSource = tableData.filter(item => {
      return ('string' == typeof item.regName) && item.regName.includes(regName) && ('string' == typeof item.regIp) && item.regIp.includes(regIp) 
    })

    return (
      <Card bordered={false} className="regionPage" bodyStyle={{height: '100%', padding: 0}}>
        <Row type="flex" align="middle" style={{height: 60, borderTop: 0}}>
          级联名称
          <Input 
            onChange={(e) => {
              this.setState({
                regName: e.target.value
              })
            }}
            placeholder={ "请输入..."} 
            value={regName} 
            style={{width: 180, marginLeft: 8, marginRight: 16}}
          />
          级联IP
          <Input 
            onChange={(e) => {
              this.setState({
                regIp: e.target.value
              })
            }}
            placeholder={ "请输入..."} 
            value={regIp} 
            style={{width: 180, marginLeft: 8, marginRight: 16}}
          />
     
          <div className="toolbar">
            <Button icon="plus" type="primary" onClick={this.handleAdd}>新增</Button>
          </div>
        </Row>
        <Row className="table-box">
          <Table
            className="table"
            size="small"
            // rowKey='regIp'
            columns={this.columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: true }}
          ></Table>
        </Row>
        {
          isShow?
          <EditForm 
            isShow={isShow}
            upId={pane.guid}
            row={formRow}
            type={formType}
            len={dataSource.length}
            onCancel={ this.onCancelForm}
          />
          : ''
        }
      </Card>
    )
  }
}
