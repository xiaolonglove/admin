import React, { Component } from 'react';
import withRouter from 'umi/withRouter';
import { Layout, Icon, Menu } from 'antd';
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

  render() {
    const { children, location } = this.props;

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
            // selectedKeys={[this.state.selectedKey]}
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