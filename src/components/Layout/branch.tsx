import { Statistic, Table } from 'antd';

import React from 'react';
import branchJson from '../../pages/api/branch.json';
const BranchPage = () => {
  const branchData = branchJson;
  // 운영중
  const available = branchJson.filter((item) => item.isAvailable === 1);
  // 미운영중
  const unavailable = branchJson.filter((item) => item.isAvailable === 0);
  // 검수완료
  const examined = branchJson.filter((item) => item.isExamined === 0);
  // 검수중
  const examining = branchJson.filter((item) => item.isExamined === 1);
  // 검수반려
  const reject = branchJson.filter((item) => item.isExamined === 2);

  //table에 사용할 column
  const columns = [
    {
      title:'순번',
      dataIndex:'id',
      key:'id',
      align:'center'
    },
    {
      title:'창고명',
      dataIndex:'branchName',
      key:'branchName',
      align:'center'
    },
    {
      title:'운영상태',
      dataIndex:'isAvailable',
      key:'isAvailable',
      align:'center',
      render:(text:String) => text === '0' ? '미운영' : '운영중' 
    },
    {
      title:'검수상태',
      dataIndex:'isExamined',
      key:'isExamined',
      align:'center',
      render:(text:Number) => {
        if (text === 0){
            return '검수중'
        } if (text === 1){
             return '검수완료'
        } else {
            return '검수반려'
        }
      }
    },
    {
      title:'유닛',
      dataIndex:'numberOfUnits',
      key:'numberOfUnits',
      align:'center',
      render:(text:String) => text + '개'
    },
    {
      title:'등록일',
      dataIndex:'createdAt',
      key:'createdAt',
      align:'center',
      render:(text:String) => text.substring(0, 10), // 등록일을 받아올떄 substring으로 10글자까지만 받아오기
    },
    {
      title:'수정일',
      dataIndex:'updatedAt',
      key:'updatedAt',
      align:'center',
      render:(text:String) => text.substring(0, 10),
    },
    {
      title:'관리',
      key:'management',
      align:'center',
      render(text:String) => {
        // 05/18 관리탭 진행중
      }
    },
  ];
  return (
    <div>
      <h1>창고</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          border: '1px solid black',
          margin: '30px 30px',
        }}
      >
        <Statistic title="전체" value={branchData.length} />
        <Statistic title="검수중" value={examining.length} />
        <Statistic title="검수완료" value={examined.length} />
        <Statistic title="검수반려" value={reject.length} />
        <Statistic title="미운영" value={unavailable.length} />
        <Statistic title="운영중" value={available.length} />
      </div>

      <div
        style={{
          display: 'flex',
          height: '350px',
          margin: '50px 30px',
        }}
      >
        <Table columns={columns} dataSource={branchData}></Table>
      </div>
    </div>
  );
};

export default BranchPage;
