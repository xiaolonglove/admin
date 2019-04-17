/* 
	资产
*/
import React from 'react';
import './asset.scss'
import HOCRegionTree from '@/components/HOCRegionTree';
import AssetPage from './assetPage';


const Page = (props) => {
	const { pane } = props;
  return (
		<AssetPage pane={pane} />
	)
}

export default HOCRegionTree(Page)