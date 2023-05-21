import { Select, Statistic, Table } from 'antd';

import React, { useState } from 'react';
import { BranchProps, UnitItemProps, UnitProps } from '.';
import SelectBranch from './selectbranch';



const UnitPage: React.FC<UnitProps & BranchProps & UnitItemProps> = ({
  unit,
  branch,
  item,
}) => {
    const [selectedBranch,setSelectedBranch] = useState('1');
  const unitData = unit;
  const branchData = branch;
  const unitItem = item;

  // Select에 표시할 defaultValue
  const defaultValue = unitData.map((unitItem) => {
    const match = branchData.find(
      (branchItem) => branchItem.id === unitItem.branchId,
    );
    return {
      value: unitItem.id,
      label: match ? match.branchName : '',
    };
  });

  // Select의 onSelect에 사용할 콜백함수 
  const handleSelect =(value :string)=> {
    setSelectedBranch(value);
  }

  // Statistic의 이용중 비교
  const dateFilter = unitItem.map((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const today = new Date();
    let status;
    if (startDate <= today && endDate >= today) {
      status = '이용중';
    } else if (startDate > today) {
      status = '이용예정';
    } else if (endDate < today) {
      status = '이용종료';
    }
    return { ...item, status };
  });

  // 이용중 
  const usingUnit = dateFilter.filter((item) => item.status === '이용중');
  // 이용중 비율
  const useRatio = ((usingUnit.length / unitItem.length) * 100).toFixed(0);
  // 이용예정
  const expectUnit = dateFilter.filter((item) => item.status === '이용예정');
  // 이용종료
  const endUnit = dateFilter.filter((item)=> item.status === '이용종료');

  



  //   statistic에 사용할 변수
  const status = {
    // 전체 유닛 갯수
    totalUnitLength: unitData.length,
    // 이용중
    usingUnit: dateFilter.length+'비율'+useRatio+'%',
    // 이용예정
    expectUnit : expectUnit.length,
    // 이용종료
    endUnit : endUnit.length,
  };
  return (

        <div>
         <h1>유닛</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          지점 :{' '}
          <Select 
            onSelect={handleSelect}
            defaultValue={defaultValue && defaultValue[0].label}
            
            options={defaultValue}
            style={{ width: '90%' }}
          />
        </div>
        {selectedBranch && <SelectBranch selectBranch={selectedBranch} unit={unit} branch={branch}/> }
    </div>
   
  );
};

export default UnitPage;
