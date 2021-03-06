/* 
	页面头部导航
*/
import React from 'react';
import { Breadcrumb } from 'antd';

export default (props) => {
  const { beadcrumb} = props;
  return (
		<Breadcrumb className="vrv-layout-title">
      {
        Array.isArray(beadcrumb) && beadcrumb.map(item => {
          if(item.path) {
            return <Breadcrumb.Item key={item.path}><a href={item.path}>{item.name}</a></Breadcrumb.Item>
          }
          return <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
        })
      }
    </Breadcrumb>
	)
}