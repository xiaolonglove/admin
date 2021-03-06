import React, { Component } from 'react';
import withRouter from 'umi/withRouter';
import { Layout, Icon, LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import  './index.scss';
import { menus, menusGroup }  from '@/services/menus.js';
import SiderMenu from './SiderMenu';

const { Header, Sider, Content } = Layout;

class Index extends Component {
  state = {
    collapsed: false,
    selectedKey: '',
    openKeys: []
  };

  componentDidMount() {
    this.setMenuOpen(this.props);
  }

  setMenuOpen = props => {
    const { pathname } = props.location;
    if('/login' === pathname || '/404' === pathname) {
      return
    }
    var openKeys = this.getKeys(menusGroup, pathname)
  
    this.setState({
      openKeys,
      selectedKey: pathname
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  menuClick = e => {
    const openKeys = this.state.openKeys.filter(item => item !== e.key);
    this.setState({
      openKeys,
      selectedKey: e.key,
    });
  };

  getKeys = (arr, name) => {
    let _data = [];
    handleFilter(arr, name)

    function handleFilter(arr, name) {
      const elm = arr.filter(item => {
        return item.key === name
      })
      if (elm.length) {
        const parent = elm[0].parent
        if (parent) {
          _data.push(parent)
          handleFilter(arr, parent)
        }
      }
    }
    return _data;
  }

  render() {

    const { children, location } = this.props;
    const { pathname } = location;
    const { selectedKey, openKeys } = this.state;
    if ('/login' === pathname) {
      return <div>我只是个假页面</div>;
    }else if('/404' === pathname) {
      return children;
    }

    return (
      <LocaleProvider locale={zh_cn}>
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
              openKeys={openKeys}
              onClick={this.menuClick}
              selectedKeys={[selectedKey]}
              onOpenChange={openKeys => {
                this.setState({
                  openKeys,
                })
              }}
            />
          </Sider>
          <Layout className="layout-right">
            <Header style={{ background: '#fff', padding: 0 }} className='admin-header'>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ padding: 8, minHeight: 280}} className='admin-content'>
              {children}
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default withRouter(Index);