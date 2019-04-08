import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';

const generateMenus = data => {
  return data.map(item => {
    if (item.childrens) {
      return (
        <Menu.SubMenu
          key={item.key}
          title={
            <span>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
          </span>
          }
        >
          {generateMenus(item.childrens)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span className="nav-text">{item.title}</span>
        </Link>
      </Menu.Item>
    )
  })
}

export default ({ menus, ...props }) => {
  
  return (
    <Menu {...props}>
      {generateMenus(menus)}
    </Menu>
  )
}