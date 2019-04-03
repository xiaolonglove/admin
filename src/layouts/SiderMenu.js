import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';

const renderMenuItem = ({ key, title, icon, ...props }) => 
  <Menu.Item
    key={key}
    {...props}
  >
    <Link to={key}>
        {icon && <Icon type={icon} />}
        <span className="nav-text">{title}</span>
    </Link>
  </Menu.Item>;

const renderSubMenu = ({ key, title, icon, childrens, ...props }) => 
  <Menu.SubMenu
    key={key}
    {...props}
    title={
      <span>
        {icon && <Icon type={icon} />}
        <span className="nav-text">{title}</span>
      </span>
    }
  >
    {childrens && childrens.map(item => renderMenuItem(item))}
  </Menu.SubMenu>;


export default ({ menus, ...props }) => {
  const { list } = menus;
  console.log(list)
  return (
    <Menu {...props}>
      {list && list.length && list.map(item => 
        item.childrens ? renderSubMenu(item) : renderMenuItem(item)
      )}
    </Menu>
  )
}