/**
 * 终端级联组件
 * Option: 
 * @param  callBack {Function} 回调 => (parent, data)
 * @param  selectedKeys {String} 设置选中的树节点
 */
import React from 'react';
import { connect } from 'dva';
import { Tree, Card, Input } from 'antd';
const Search = Input.Search;

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const guid = node.guid;
    dataList.push({ guid, title: node.title, parentnodes: node.parentnodes});
    if (node.children) {
      generateList(node.children);
    }
  }
};

export default class extends React.Component<any> {

  state = {
    searchValue: '',
    expandedKeys: ['0'], // 展开指定的树节点
    autoExpandParent: true, // 是否自动展开父节点
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     expandedKeys: [nextProps.treeData[0].guid]
  //   })
  // }

  // 避免父组件状态更改，重复渲染
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.searchValue != nextState.searchValue
    || this.state.expandedKeys != nextState.expandedKeys 
    || this.state.autoExpandParent != nextState.autoExpandParent 
    || this.props.selectedKeys != nextProps.selectedKeys 
    || this.props.treeData != nextProps.treeData
  }

  searchChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return item.parentnodes;
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.push("0");
    this.setState({
      expandedKeys: expandedKeys,
      searchValue: value
    });
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

 
  render() {
    const {searchValue, expandedKeys, autoExpandParent} = this.state;
    const { selectedKeys, treeData } = this.props;
    // console.log(expandedKeys);
    generateList(treeData);

    const renderTreeNodes = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
        // @ts-ignore
        <Tree.TreeNode title={title} key={item.guid} data={item} parent={item.parentnodes} dataRef={item}>
          {renderTreeNodes(item.children)}
        </Tree.TreeNode>
        )
      }
      // @ts-ignore
      return <Tree.TreeNode title={title} key={item.guid} data={item} parent={item.parentnodes} dataRef={item} />;
    });

    return (
      <Card title={'终端级联'} bordered={false} className="chart">
        <div style={{
          height: '36px',
          lineHeight: '36px',
          padding: '0px 6px',
          borderBottom: '1px solid #eeeeee',
          }}>
          <Search placeholder="查询" onChange={this.searchChange} size="small" />
        </div>
        {
          treeData.length > 0 ? 
          <Tree
            showLine
            defaultExpandAll
            expandedKeys={ expandedKeys }
            defaultExpandedKeys={[treeData[0].guid]}
            selectedKeys={[selectedKeys]}
            onExpand={this.onExpand}
            autoExpandParent={autoExpandParent}
            onSelect={(evt, node) => { this.props.callBack(node.selectedNodes[0].props.parent, node.selectedNodes[0].props.data) }}
          >
            {renderTreeNodes(treeData)}
          </Tree>
          : ''
        }
      </Card>
    )
  }
}