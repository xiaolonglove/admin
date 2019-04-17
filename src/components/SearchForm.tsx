/**
 * 查询框组件
 * Option: 
 * @param callBack {Function} 回调 => (items)
 * @param items {Array} 搜索项 ['UserName', 'OfficeName', 'DeviceName', 'IPAddres' ...]
 */
import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

/*输入框样式*/
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
},
labels = {
  UserName: "使用人",
  DeptName: "单位名称",
  OfficeName: "部门名称",
  DeviceName: "设备名称",
  IPAddres: "设备IP",
  PatchName: "补丁号",
}

class SearchForm extends React.PureComponent<any> {

  // 重置
  resetInput = () => {
    this.props.form.setFieldsValue({
      UserName: "",
      DeptName: "",
      OfficeName: "",
      DeviceName: "",
      IPAddres: "",
      PatchName: "",
    })
  }

  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.callBack(values)
      }
    })
  }

  render() {
    const { items } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} style={{width: 360}}>
        {
          !!items.length
          ? items.map(name => {
            const label = labels[name] || '';
            return <Form.Item label={ label } { ...formItemLayout }>
            {getFieldDecorator(
                name,
                {initialValue: ""}
              )(
                <Input placeholder={ "请输入"+label }/>
              )
            }
          </Form.Item>
          })
          :''
        }
        <Row type="flex" justify="end" align="middle" style={{border: 0}}>
          <Button onClick={this.resetInput} style={{marginRight: 8}}>重置</Button>
          <Button type="primary" htmlType="submit">查询</Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create({})(SearchForm)