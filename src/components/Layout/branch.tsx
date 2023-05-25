import { Button, Statistic, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type BranchPageProps = {
  branch?: {
    id: number;
    branchName: string;
    isAvailable: number;
    isExamined: number;
    numberOfUnits: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
const BranchPage = ({ branch }: BranchPageProps)=> {
  const router = useRouter();
  const {id} = router.query;
  
  const [showContent, setShowContent] = useState(false);
  const branchData = branch;
  
  // //   // 운영중
  const available = branchData?.filter((item) => item.isAvailable === 1);
  // //   // 미운영중
  const unavailable = branchData?.filter((item) => item.isAvailable === 0);
  // //   // 검수완료
  const examined = branchData?.filter((item) => item.isExamined === 0);
  // //   // 검수중
  const examining = branchData?.filter((item) => item.isExamined === 1);
  // //   // 검수반려
  const reject = branchData?.filter((item) => item.isExamined === 2);
  //table에 사용할 column
  const columns = [
    {
      title: '순번',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '창고명',
      dataIndex: 'branchName',
      key: 'id',
      align: 'center',
    },
    {
      title: '운영상태',
      dataIndex: 'isAvailable',
      key: 'id',
      align: 'center',
      render: (text: String) => (text === '0' ? '미운영' : '운영중'),
    },
    {
      title: '검수상태',
      dataIndex: 'isExamined',
      key: 'id',
      align: 'center',
      render: (text: Number) => {
        if (text === 0) {
          return '검수중';
        } if (text === 1) {
          return '검수완료';
        } else {
          return '검수반려';
        }
      },
    },
    {
      title: '유닛',
      dataIndex: 'numberOfUnits',
      key: 'id',
      align: 'center',
      /* 창고페이지 4번 유닛 */
      render: (numberOfUnits: number , record : any) =>
      <Button 
      type='text'
      onClick={() => {
        const branchId = record.key ;
        router.push('/')
      }}> {numberOfUnits}개</Button> ,

    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'id',
      align: 'center',
      render: (text: String) => text.substring(0, 10), // 등록일을 받아올떄 substring으로 10글자까지만 받아오기
    },
    {
      title: '수정일',
      dataIndex: 'updatedAt',
      key: 'id',
      align: 'center',
      render: (text: String) => text.substring(0, 10),
    },
    {
      title: '관리',
      key: 'id',
      align: 'center',
      render: () => {
        /* 창고페이지 5번 창고|유닛|예약|더보기 */
        const content = (
          <>
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('창고')}
            >
              창고
            </Button>
            |
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('유닛')}
            >
              유닛
            </Button>
            |
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('예약')}
            >
              예약
            </Button>
            |
            <Button
              type="text"
              style={{ padding: '4px 4px' }}
              onClick={() => handleButtonClick('더보기')}
            >
              더보기
            </Button>
          </>
        ); // 관리탭에 표시할 내용

        const omittedContent = content.props.children.slice(0, 6); //content가 6
        const handleToggle = () => {
          setShowContent(!showContent);
        }; //더보기 버튼 토글
        const handleButtonClick = (buttonText: String) => {
          console.log(buttonText);
          if (buttonText === '더보기') {
            handleToggle();
            console.log(buttonText);
            console.log(buttonText);
          }
        };
        return (
          <div>
            {showContent ? (
              content
            ) : (
              <>
                <span>{omittedContent}</span>
                {content.props.children.length > 6 && (
                  <Button
                    type="text"
                    style={{ padding: '4px 4px' }}
                    onClick={handleToggle}
                  >
                    ...
                  </Button> //글자가 일정수 이상일떄 뒤를 생략하고 ... 으로 표시 ...을 누르면 전체 내용 표시
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h1>창고</h1>
      {/* 창고페이지 2번 창고정보통계 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          border: '1px solid black',
          margin: '30px',
        }}
      >
        <Statistic title="전체" value={branchData?.length} />
        <Statistic title="검수중" value={examining?.length} />
        <Statistic title="검수완료" value={examined?.length} />
        <Statistic title="검수반려" value={reject?.length} />
        <Statistic title="미운영" value={unavailable?.length} />
        <Statistic title="운영중" value={available?.length} />
      </div>

      <div
        style={{
          display: 'flex',
          margin: '30px',
          border: '1px solid black',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '10px 10px',
          }}
        >
          {/* 창고페이지 3번 창고추가 */}
          <Button onClick={() => console.log('+창고추가')}>+창고 추가</Button>
        </div>
        <Table
          style={{
            width: '95%',
            border: '1px solid black',
            margin: '10',
          }}
          columns={columns}
          dataSource={branchData}
          bordered
          /* 창고 페이지 6번 페이지네이션 */
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} / 총 ${total} 건`,
            pageSize: 10, 
            size: 'small',
            itemRender: (page, type, originalElement) => {
              const handleButtonHover = (event: any) => {
                event.target.style.backgroundColor = 'transparent';
              };
              const handleButtonClick = (event: any) => {
                event.preventDefault();
                event.target.style.backgroundColor = 'transparent';
                event.target.style.color = 'inherit';
              };
              switch (type) {
                case 'prev':
                  return (
                    <Button
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                      style={{ outline: 'none' }}
                      type="text"
                    >
                      {'<<'}
                    </Button>
                  );
                case 'next':
                  return (
                    <Button
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                      type="text"
                      style={{ outline: 'none' }}
                    >
                      {'>>'}
                    </Button>
                  );
                case 'page':
                  return (
                    <Button
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                      type="text"
                      style={{ outline: 'none' }}
                    >
                      {page}
                    </Button>
                  );
                case 'jump-next':
                case 'jump-prev':
                  return (
                    <Button
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                      type="text"
                      style={{ outline: 'none' }}
                    >
                      ...
                    </Button>
                  );
                default:
                  return originalElement;
              }
            },
          }}
        ></Table>
      </div>
    </div>
  );
};

export default BranchPage;
