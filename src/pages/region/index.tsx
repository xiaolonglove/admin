/* 
	安全域配置
*/
import React from 'react';
import HOCRegionTree from '@/components/HOCRegionTree';
import RegionPage from './regionPage';


const Page = (props) => {
	const { pane } = props;
  return (
		<RegionPage pane={pane} />
	)
}

export default HOCRegionTree(Page, 1)