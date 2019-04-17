import request from '@/common/js/request';

export function getRegionTree() {
  return request('/api/getRegionTree');
}