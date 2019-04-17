
/**
 * 带终端级联树的高阶组件
 * type 0全网 1本级
 */
import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Card, Col, Tabs } from 'antd';
// import '@/common/style/common.scss';
// import '@/common/style/layout.scss';
import BreadcrumbTitle from "@/components/BreadcrumbTitle";
import RegionTree from '@/components/RegionTree';

export default (Comp: any, type: Number = 0) => {

	class RegionTreeSlot extends React.PureComponent<any>{

		state = {
			panes: [], // 页签列表
			activeKey: '',
			searchValue: '',
			autoExpandParent: true, // 是否自动展开父节点
		}
		
		componentWillMount() {
			this.props.dispatch({
				type: "regionTree/query",
				payload: {
					type
				}
			});
		}

		componentWillReceiveProps(nextProps) {
			const { treeData } = nextProps.regionTree;
			if(treeData.length) {
				this.setState({
					panes: treeData.slice(0, 1),
					activeKey: treeData[0].guid,
				})
			}
		}

		onEditTabs = (targetKey, action) => {
			this[action](targetKey);
		}

		remove = (targetKey) => {
			let activeKey = this.state.activeKey;
			let lastIndex;
			const { panes } = this.state;

			panes.forEach((pane, i) => {
				if (pane.guid === targetKey) {
					lastIndex = i - 1;
				}
			});
			// 过滤掉要删除的元素
			const newPanes = panes.filter(pane => pane.guid !== targetKey);
			if (newPanes.length && activeKey === targetKey) {
				if (lastIndex >= 0) {
					activeKey = newPanes[lastIndex].guid;
				} else {
					activeKey = newPanes[0].guid;
				}
			}
			this.setState({ activeKey, panes: newPanes });
		}

		onSelectTree = (parent, node) => {
			const { guid, title } = node;
			const { panes } = this.state;
			
			if(this.state.activeKey === guid) return;

			const pan = panes.filter(item => {
				return item.guid === guid
			})  
			!pan.length && (
				panes.push({
					title,
					guid
				})
			) //如果没有，就增加到标签列表

			this.setState({activeKey: guid, panes })
		}
		
		render() {
			
			const { beadcrumb, regionTree } = this.props;
			const { treeData, type } = regionTree;
			const { panes, activeKey, searchValue, autoExpandParent } = this.state;
			
			return (
				<div className="vrv-layout">
					<BreadcrumbTitle beadcrumb={beadcrumb.list}/>
					<Row className="vrv-layout-content">
						{
							treeData.length
							?<Layout>
								<Layout.Sider width={230} className="sider">
									<RegionTree
										treeData={treeData}
										selectedKeys={activeKey}
										callBack={this.onSelectTree}
									/>
								</Layout.Sider>
								<Layout.Content className="content"	>
										<Tabs className="tabs" 
											hideAdd
											type="editable-card"
											activeKey={activeKey}
											onChange={(activeKey) => this.setState({
												activeKey
											})}
											onEdit={this.onEditTabs}
										>
											{
												panes.map(pane => 
													<Tabs.TabPane 
														tab={pane.title} 
														key={pane.guid} 
														// forceRender
														closable={ '0' === pane.guid? false: true}
													>
														<Comp pane={pane} />
													</Tabs.TabPane>
												)
											}
										</Tabs>
								</Layout.Content>
							</Layout>
							: ''
						}
					</Row>
				</div>
			)
		}
	}

	return connect(({ regionTree, beadcrumb }) => ({ regionTree, beadcrumb }))(RegionTreeSlot)
}