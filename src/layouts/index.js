import React, { Component } from 'react';
import withRouter from 'umi/withRouter';
import { Layout, Icon } from 'antd';
import  './index.scss';
import menus  from '@/services/menus.js';
import SiderMenu from './SiderMenu';

const { Header, Sider, Content } = Layout;

class Index extends Component {
  state = {
    collapsed: false,
    selectedKey: '',
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  getKeys = (arr, name) => {
    let _data = [];
      const parent = arr.filter(item => {
        if(item.key === name) {

        }
        return 
      })
     
      return _data;
  }

  render() {

    const { children, location } = this.props;
    const { pathname } = location;
    if ('/login' === pathname) {
      return <div>我只是个假页面</div>;
    }else if('/404' === pathname) {
      return children;
    }

    
    var getLists = (arr) => {
      let lists = [];
      var handleList = (arr) => {
        arr.forEach(item => {
          lists.push(item);
          const { childrens } = item;
          if(childrens) {
            handleList(childrens)
          }
        });
      }
      handleList(arr)
      return lists;
    }
    const lists = getLists(menus);
    // console.log(lists);

    var keys = this.getKeys(lists, pathname)
    // console.log(keys);

    return (
      <Layout className="layout">
        <Sider
          trigger={null}
          breakpoint="lg"
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <SiderMenu 
            menus={menus}
            theme="dark"
            mode="inline"
            openKeys={['asset']}
            // selectedKeys={[pathname]}
          />
        </Sider>
        <Layout className="layout-right">
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            padding: 8, minHeight: 280,
          }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Index);