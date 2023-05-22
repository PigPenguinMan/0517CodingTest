import React, { useEffect, useState } from 'react';
import { Affix, Layout, Menu } from 'antd';
import type { AppProps, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import Branch from 'pages/branch/[id]';
import Unit from 'pages/unit/[unitId]';

const { Header, Sider, Content, Footer } = Layout;
const items: MenuProps['items'] = [
  { key: '1', label: '창고' },
  { key: '2', label: '유닛' },
];
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
type UnitItemProps={
  item: {
    id:number,
    unitId:number,
    unitItemName:string,
    startDate:string,
    endDate:string,
    createdAt:string,
    updateAt:string
  }[]
}
const PageLayout: React.FC<AppProps> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('1'); // 선택된 메뉴의 key
  const [branchData, setBranchData] = useState<BranchProps['branch']>([]);
  const [unitData, setUnitData] = useState<UnitProps['unit']>([]);
  const [unitItemData,setUnitItemData] =useState<UnitItemProps['item']>([])
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id ) {
      setSelectedPage(id.toString());
    }
  }, [router.query]);

  useEffect(()=>{
    const fetchBranchData = async () => {
      try {
        const response = await fetch('/api/branch'); // 적절한 API 경로로 변경
        const data = await response.json();
        setBranchData(data);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    const fetchUnitData = async () => {
      try {
        const response = await fetch('/api/unit'); // 적절한 API 경로로 변경
        const data = await response.json();
        setUnitData(data);
      } catch (error) {
        console.error('Error fetching unit data:', error);
      }
    };
    const fetchUnitItemData = async () => {
      try {
        const response = await fetch('/api/unit-item'); // 적절한 API 경로로 변경
        const data = await response.json();
        setUnitItemData(data);
      } catch (error) {
        console.error('Error fetching unit data:', error);
      }
    };

    fetchBranchData();
    fetchUnitData();
    fetchUnitItemData()
  },[])
  // 메뉴버튼을 클릭했을때의 함수
  const handleMenuClick = ({ key }: { key: string }) => {
    if(selectedPage !== key){
      setSelectedPage(key);
      if (key === '1') {
        router.push(`/branch/1`);
      } else if (key === '2') {
        router.push(`/unit/1`);
      }
    }
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
        <Affix>
          <Sider style={{ background: 'white', height: '100vh' }}>
            {/* 창고페이지 1번 창고/유닛 페이지 선택 */}
            <Menu selectedKeys={[selectedPage]} onClick={handleMenuClick}>
            
            </Menu>
          </Sider>
        </Affix>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Content>
            {selectedPage === '1' && <Branch branch={branchData} />}
            {selectedPage === '2' && <Unit unit={unitData} branch={branchData} item={unitItemData} />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
