
/**
 * 带终端级联树的高阶组件
 * type 0全网 1本级
 */
import React from 'react';
import { Layout, Row, Card, Col, Tabs } from 'antd';


// export default (Comp: any, type: Number = 0) => {
export default (Comp, type) => {
	class RegionTreeSlot extends React.Component {
		render() {
			const pane = {a: 1}
			return (
				<div>
					我是高阶组件层
					<Comp pane={pane}/>
				</div>
			)
		}
	}
  return RegionTreeSlot
}