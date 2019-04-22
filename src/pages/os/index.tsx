/* 
	操作系统
*/
import React from 'react';
import "./os.scss";
import HOCRegionTree from '@/components/HOCRegionTree';
import OsPage from './osPage';

const Os = (props) => {
	const { pane } = props;
  return (
		<OsPage pane={pane} />
	)
}

export default HOCRegionTree(Os)
