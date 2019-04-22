/* 
	指标概览
*/
import React from 'react';
import HOCRegionTree from '@/components/HOCRegionTree';
import IndicatorviewPage from './indicatorviewPage';

const Indicatorview = (props) => {
	const { pane } = props;
  return (
		<IndicatorviewPage pane={pane} />
	)
}

export default HOCRegionTree(Indicatorview)
