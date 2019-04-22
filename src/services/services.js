import request from '@/common/js/request';
import { urlParam } from '@/common/js/utils';

// {
//   method: 'POST',
//   body: {guid},
// }

export function getRegionTree() {
  return request('/api/getRegionTree');
}

/** 获取指标数值
 * @param indicateCode 指标code
 * @param tclasshelperId 级联id
 * @return {Object}
 */
export async function getIndicateValue(indicateCode, tclasshelperId, date) {
 
  return new Promise((res, rej) => {
    const data = {
      week: {
        DeviceRegisterCount: 12353, // 应注册
        DeviceRegisteredCount: 5957, // 已注册
      },
      month: {
        DeviceRegisterCount: 46412, // 应注册
        DeviceRegisteredCount: 45957, // 已注册
      },
      year: {
        DeviceRegisterCount: 72353, // 应注册
        DeviceRegisteredCount: 65957, // 已注册
      },
    }
    res(data[date]);
  })

  // return request(`/api/getIndicateValue`);
}

/** 获取指标率列表
 * @param indicateCode 指标code
 * @param tclasshelperId 级联id
 * @return {Array}
 */
export async function getLevelLine(indicateCode, tclasshelperId, date) {
 
  return request(`/api/getLevelLine?${urlParam({indicateCode, tclasshelperId, date})}`);

}

/** 获取版本号数量列表  (资产统计/资产) 
 * @param indicateCode 指标code
 * @param tclasshelperId 级联id
 * @return {Array}
 */
export async function getPatchRate(tclasshelperId, date) {
 
  return new Promise((res, rej) => {
    const data = [
      {name: "版本号1", value: 34},
      {name: "版本号2", value: 48},
      {name: "版本号3", value: 80},
      {name: "版本号4", value: 18},
      {name: "版本号5", value: 10},
    ]
    res(data);
  })
}

/** 获取终端信息表格  (资产统计/资产) 
 * @param param {Object} 查询参数
 * @return {Array}
 */
export async function getAntivirusRateDetails(param) {
 
  return new Promise((res, rej) => {
    const data = [
      {
      "Guid": "8bfd3f748393s2828cd34fd9da6123f0",
      "ClassID": "79",
      "DeviceID": "13920.0",
      "DevOnlyID": "0.0",
      "UserName": "",
      "DeviceName": "ZHANGZHOU01",
      "IPAddres": "11.52.81.162",
      "MacAddress": "0CDA411DC20F",
      "OfficeName": "",
      "DeptName": "",
      "DeviceType": "",
      "Registered": "0",
      "RunStatus": "1",
      "KvsCompany": "",
      "KvsVersion": null,
      "KvsVer": null,
      "OSType": "",
      "UnInstallTime": "",
      "RegisterTime": "2018-09-05 11:41:50",
      "DeviceDesc": "",
      "AgentVersion": "",
      "Tel": "",
      "LastTime": "2018-10-29 14:01:35",
      "DiskSerial": "",
      "DomainName": "",
      "FloorNumber": "",
      "RegCode": null,
      "RegName": "级联单位2",
      "RegIp": "192.168.119.7",
      "UpID": "0",
      "Version": "5.2018.0809.1010",
      "MapCode": "",
      "AuthStatus": 1,
      "OrganCode": "1",
      "sortField": "1",
      "lng": "",
      "lat": "",
      "serverType": "1",
      "securityId": "ff808081555219080155521bb4300006",
      "Message": "",
      "SynchronizationDate": "2018-08-15 02:31:52",
      "validity": 1,
      "totalNum": "13145"
      },
      {
      "Guid": "8bfd3f74839112828cd34fd9da6123f0",
      "ClassID": "99",
      "DeviceID": "10130.0",
      "DevOnlyID": "3523857117.0",
      "UserName": "俞莉莉",
      "DeviceName": "闽SMS俞莉莉TJK",
      "IPAddres": "11.52.60.229",
      "MacAddress": "6C0B849A2FDE",
      "OfficeName": "TJK",
      "DeptName": "三明市",
      "DeviceType": "Windows台式机",
      "Registered": "1",
      "RunStatus": "1",
      "KvsCompany": "360天擎",
      "KvsVersion": null,
      "KvsVer": null,
      "OSType": "WINDOWS 7 PROFESSIONAL, 32-BIT(6.1.7601.2.1.0.256.1.48.0.0)",
      "UnInstallTime": "",
      "RegisterTime": "2017-05-18 08:19:33",
      "DeviceDesc": "05988966085",
      "AgentVersion": "6.6.1709.30.01",
      "Tel": "05988966085",
      "LastTime": "2018-10-29 15:13:46",
      "DiskSerial": "WD-WCC3F5HCPLKS;WD-WCC3F5HCPLKS",
      "DomainName": "--",
      "FloorNumber": "",
      "RegCode": null,
      "RegName": "级联单位2",
      "RegIp": "192.168.119.7",
      "UpID": "0",
      "Version": "5.2018.0809.1010",
      "MapCode": "",
      "AuthStatus": 1,
      "OrganCode": "1",
      "sortField": "1",
      "lng": "",
      "lat": "",
      "serverType": "1",
      "securityId": "ff808081555219080155521bb4300006",
      "Message": "",
      "SynchronizationDate": "2018-08-15 02:31:52",
      "validity": 1,
      "totalNum": "13145"
      },
      {
      "Guid": "8bfd3f7483924282d1d34fd9da6123f0",
      "ClassID": "44",
      "DeviceID": "7815.0",
      "DevOnlyID": "647085746.0",
      "UserName": "蔡晨霓",
      "DeviceName": "闽CLS蔡晨霓XDB2",
      "IPAddres": "11.52.18.201",
      "MacAddress": "4437E6C79EFA",
      "OfficeName": "XDB",
      "DeptName": "长乐市",
      "DeviceType": "Windows台式机",
      "Registered": "1",
      "RunStatus": "1",
      "KvsCompany": "360天擎",
      "KvsVersion": null,
      "KvsVer": null,
      "OSType": "Windows XP Professional(5.1.2600.2.3.0.256.1.0.0.0)",
      "UnInstallTime": "",
      "RegisterTime": "2017-10-12 15:56:42",
      "DeviceDesc": "059128922090",
      "AgentVersion": "6.6.1709.30.01",
      "Tel": "059128922090",
      "LastTime": "2018-10-29 14:59:03",
      "DiskSerial": "S1DDN0VT;K5TD9KB4321",
      "DomainName": "--",
      "FloorNumber": "",
      "RegCode": null,
      "RegName": "级联单位2",
      "RegIp": "192.168.119.7",
      "UpID": "0",
      "Version": "5.2018.0809.1010",
      "MapCode": "",
      "AuthStatus": 1,
      "OrganCode": "1",
      "sortField": "1",
      "lng": "",
      "lat": "",
      "serverType": "1",
      "securityId": "ff808081555219080155521bb4300006",
      "Message": "",
      "SynchronizationDate": "2018-08-15 02:31:52",
      "validity": 1,
      "totalNum": "13145"
      }
    ]
    res(data);
  })

  // assetsDetails/getAntivirusRateDetails
}

/** 获取操作系统数量轴   (资产统计/操作系统)
 * @param tclasshelperId 级联id
 * @return {Array}
 */
export async function getOperatingSystem(tclasshelperId = "") {
 
  return new Promise((res, rej) => {
    const data = [
      {name: "Windows 7", value: 5634},
      {name: "Windows XP", value: 2248},
      {name: "Windows 10", value: 1180},
      {name: "Windows 8", value: 18},
    ]
    res(data);
  })
}

/** 获取XP系统区域排名   (资产统计/操作系统)
 * @param tclasshelperId 级联id
 * @return Array
 */
export async function getOperatingSystemXpTop(tclasshelperId = "") {
 
  return new Promise((res, rej) => {
    const data = [
      {
      "os_xp": 2198,
      "regName": "级联单位2"
      },
      {
      "os_xp": 765,
      "regName": "级联单位1"
      }
    ]
    res(data);
  })
}
/** 获取WIN7系统区域排名 (资产统计/操作系统)
 * @param tclasshelperId 级联id
 * @return {Array}
 */
export async function getOperatingSystemWin7Top(tclasshelperId = "") {
 
  return new Promise((res, rej) => {
    const data = [
      {
      "os_7": 2285,
      "regName": "级联单位2"
      },
      {
      "os_7": 1825,
      "regName": "级联单位1"
      },
    ]
    res(data);
  })
}