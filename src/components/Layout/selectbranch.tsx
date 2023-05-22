import { Button, Select, Statistic, Table } from 'antd';
import { stringify } from 'querystring';
import { start } from 'repl';
import unitJson from '../../pages/api/unit-item.json';

interface SelectProp {
  selectBranch: string;
}
type UnitProps ={
  unit: {
    id:number,
    branchId:number,
    unitName:string,
    numberOfUnitItems:number,
    width:number,
    depth:number,
    height:number,
    priceValue:number,
    createdAt:String,
    updatedAt:String
  }[];
}
type  BranchProps ={
  branch: {
      id: number;
      branchName: string;
      isAvailable: number;
      isExamined: number;
      numberOfUnits: number;
      createdAt: string;
      updatedAt: string;
    }[];
}
const SelectBranch: React.FC<SelectProp & UnitProps & BranchProps> = ({
  selectBranch,
  unit,
  branch,
}) => {
  const unitData = unit;
  const unitItemData = unitJson;
  // statistic에 사용할 변수
  // props로 받아온 state와 같은 branchId를 가진 유닛만 필터
  const unitFilter = unitData.filter((item) => {
    if (item.branchId === parseInt(selectBranch, 10)) return item;
  });
  // unit-item중 unitFilter요소의 id와 같은 unitID를 가진 unit-item의 요소를 필터
  const itemFilter = unitItemData
    .map((item) => {
      let status = '';
      let numberOfUnitItems;
      let unitName = '';
      let branchId;
      for (const filterItem of unitFilter) {
        if (filterItem.id === item.unitId) {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const today = new Date();
          numberOfUnitItems = filterItem.numberOfUnitItems;
          unitName = filterItem.unitName;
          branchId = filterItem.branchId;
          if (startDate <= today && endDate >= today) {
            status = '이용중';
          } else if (startDate > today) {
            status = '이용예정';
          } else if (endDate < today) {
            status = '이용종료';
          }
        }
      }
      if (status !== '')
        return { ...item, status, numberOfUnitItems, unitName, branchId };
    })
    .filter(Boolean);

    
    
  // 이용중
  const usingUnit = itemFilter.filter((item) => item?.status === '이용중');
  // 이용중 비율
  const useRatio = ((usingUnit.length / itemFilter.length) * 100).toFixed(0);
  // 이용예정
  const expectUnit = itemFilter.filter((item) => item?.status === '이용예정');
  // 이용종료
  const endUnit = itemFilter.filter((item) => item?.status === '이용종료');

  // statistic에 사용할 변수
  const status = {
    // 전체 유닛 갯수
    totalUnitLength: itemFilter.length,
    // 이용중
    usingUnit: usingUnit.length + '비율' + useRatio + '%',
    // 이용예정
    expectUnit: expectUnit.length,
    // 이용종료
    endUnit: endUnit.length,
  };

  // unitTable에서 사용할 배열 unit-item을 unitId별로 배열화
  const unitGroups: { [key: number]: any[] } = {}; // 문자열로 인덱스사용
  usingUnit.forEach((item) => {
    if (item?.unitId !== undefined) {
      if (!unitGroups[item.unitId]) {
        unitGroups[item.unitId] = [];
      }
      unitGroups[item.unitId].push(item);
    }
  });

  // unitTable에서 사용할 columns
  const unitColumns = [
    {
      title: '유닛',
      dataIndex: 'unitName',
      key: 'id',
      align: 'center',
    },
    {
      title: '총개수',
      dataIndex: 'numberOfUnitItems',
      key: 'id',
      align: 'center',
    },
    {
      title: '사용중',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: number) => {
        // unitId별로 모은 그룹에서 id에 해당하는배열의 크기
        const usingCount = unitGroups[id]?.length || 0;
        return usingCount;
      },
    },
    {
      title: '점유율',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: number) => {
        const findNumberOfUnitItems = itemFilter.find(
          (item) => item?.unitId === id,
        )?.numberOfUnitItems;
        const share = findNumberOfUnitItems
          ? unitGroups[id]?.length / findNumberOfUnitItems
          : 0;
        return findNumberOfUnitItems ? `${(share * 100).toFixed(0)}%` : null;
      },
    },
    {
      title: '너비',
      dataIndex: 'width',
      key: 'id',
      align: 'center',
    },
    {
      title: '길이',
      dataIndex: 'depth',
      key: 'id',
      align: 'center',
    },
    {
      title: '높이',
      dataIndex: 'height',
      key: 'id',
      align: 'center',
    },
    {
      title: '이용요금',
      dataIndex: 'priceValue',
      key: 'id',
      align: 'center',
    },
    {
      title: '관리',
      key: 'id',
      align: 'center',
      render: () => {
        const content = (
          <>
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('수정')}
            >
              수정
            </Button>
            ㅣ
            {/* 유닛페이지 5번 수정|더보기 버튼 */}
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('더보기')}
            >
              더보기
            </Button>
          </>
        ); // 관리탭에 표시할 내용
        const handleButtonClick = (buttonText: String) => {
          console.log(buttonText);
          if (buttonText === '더보기') {
            console.log(buttonText);
            console.log(buttonText);
          }
        };
        return (
          <div>
            <span>{content.props.children}</span>
          </div>
        );
      },
    },
  ];

  // unitItemTable에서 사용할 현재 지점의 id와 같은 brnachID를 가진 데이터만
  const filterUnitItem = itemFilter.filter(
    (item) => item?.branchId === parseInt(selectBranch),
  );
  //unitItemTable에 사용할 columns
  const unitItemColumns = [
    {
      title: '유닛아이템',
      dataIndex: 'unitItemName',
      key: 'id',
      align: 'center',
    },
    {
      title: '유닛',
      dataIndex: 'unitId',
      key: 'id',
      align: 'center',
      render: (unitId: number) => {
        const unit = filterUnitItem.find((item) => {
          return (
            item?.unitId === unitId && item?.branchId === parseInt(selectBranch)
          );
        });
        return unit ? unit.unitName : 'undefined';
      },
    },
    {
      title: '상태',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: number) => {
        const stat = filterUnitItem.find((item) => item?.id === id);
        return stat ? stat.status : 'undefined';
      },
    },
    {
      title: '이용기간 경과율',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: number) => {
        const unit = filterUnitItem.find((item) => item?.id === id);
        const startDate = unit ? new Date(unit.startDate).getTime() : null;
        const endDate = unit ? new Date(unit.endDate).getTime() : null;
        const currentDate = Date.now();
        if (!startDate || !endDate) {
          console.log('startDate or endDate Error');
          return null;
        }
        
        // 총 일수 밀리초로 변환
        const totalDate = Math.floor(
          (endDate - startDate) 
        );
        
        // 경과일
        const elapseDay = Math.floor(
          (currentDate - startDate) 
        );
        
        // 소숫점을 제외한 경과율
        let elapseRatio = ((elapseDay / totalDate) * 100).toFixed(0);

        // 이용이 종료됬다면 경과율을 100%로 표시
        if(currentDate > endDate){
          elapseRatio = '100' ;
        }
        return `${elapseRatio}%`;
      }
    },
    {
      title: '이용시작일',
      dataIndex: 'startDate',
      key: 'id',
      align: 'center',
      render: (text: string) => text.substring(0, 10).replaceAll('-', '.'),
    },
    {
      title: '이용종료일',
      dataIndex: 'endDate',
      key: 'id',
      align: 'center',
      render: (text: string) => text.substring(0, 10).replaceAll('-', '.'),
    },
    {
      title: '예약번호',
      dataIndex: '',
      key: 'id',
      align: 'center',
    },
    {
      title: '관리',
      key: 'id',
      align: 'center',
      render: () => {
        const content = (
          <>
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('수정')}
            >
              수정
            </Button>
            ㅣ
            {/* 유닛페이지 7번 수정|더보기 버튼 */}
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('더보기')}
            >
              더보기
            </Button>
          </>
        ); // 관리탭에 표시할 내용
        const handleButtonClick = (buttonText: String) => {
          console.log(buttonText);
          if (buttonText === '더보기') {
            console.log(buttonText);
            console.log(buttonText);
          }
        };
        return (
          <div>
            <span>{content.props.children}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' ,alignItems:'center'}}>
        {/* 유닛페이지 3번 해당 카테고리 정보 통계 */}
        <div
          style={{
            display: 'flex',
            width: '90%',
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom:'15px',
            border: '1px solid black',
          }}
        >
          <Statistic
            title="전체 유닛 갯수"
            value={status.totalUnitLength}
          ></Statistic>
          <Statistic title="이용중" value={status.usingUnit}></Statistic>
          <Statistic title="이용예정" value={status.expectUnit}></Statistic>
          <Statistic title="이용종료" value={status.endUnit}></Statistic>
        </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom:'50px'
        }}
      >
        <div style={{ border: '1px solid black', width: '90%' ,marginBottom:'15px'}}>
          {/* 유닛페이지 4번 유닛추가 버튼  */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin:'5px'
            }}
          >
            <Button onClick={() => console.log('+유닛추가')}>+유닛 추가</Button>
          </div>
          <Table
            style={{
              width: '95%',
              border: '1px solid black',
              margin:'10px'
            }}
            columns={unitColumns}
            dataSource={unitFilter}
            pagination={false}
          ></Table>
        </div>
        <div style={{ border: '1px solid black', width: '90%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '10px',
            }}
          >
            {/* 유니페이지 6번 유닛아이템 추가 버튼 */}
            <Button onClick={() => console.log('+유닛아이템 추가')}>
              +유닛아이템 추가
            </Button>
          </div>
          <Table
            style={{
              width: '95%',
              border: '1px solid black',
              margin: '10px',
            }}
            columns={unitItemColumns}
            dataSource={filterUnitItem}
            // pagination={} 페이지네이션 수정필요
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default SelectBranch;
