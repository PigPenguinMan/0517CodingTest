import React, { useEffect, useState } from 'react';
import { Affix, Layout, Menu } from 'antd';
import type { AppProps, MenuProps } from 'antd';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Branch = dynamic(()=> import('../../pages/branch/[id]'))
const Unit = dynamic(()=>import('../../pages/unit/[unitId]'))
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
  
  const [firstLoad ,setFirstLoad] =useState(true)
  const [branchData, setBranchData] = useState<BranchProps['branch']>([]);
  const [unitData, setUnitData] = useState<UnitProps['unit']>([]);
  const [unitItemData,setUnitItemData] =useState<UnitItemProps['item']>([])
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id ) {
      setSelectedPage(id.toString());
    }
  }, [router.query]);

  useEffect(()=>{
    const fetchBranchData = async () => {
      try {
        const response = await fetch('/api/branch'); 
        const data = await response.json();
        setBranchData(data);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    const fetchUnitData = async () => {
      try {
        const response = await fetch('/api/unit'); 
        const data = await response.json();
        setUnitData(data);
      } catch (error) {
        console.error('Error fetching unit data:', error);
      }
    };
    const fetchUnitItemData = async () => {
      try {
        const response = await fetch('/api/unit-item'); 
        const data = await response.json();
        setUnitItemData(data);
      } catch (error) {
        console.error('Error fetching unitItem data:', error);
      }
    };

    fetchBranchData();
    fetchUnitData();
    fetchUnitItemData()
    setFirstLoad(false)
  },[])
  // 메뉴버튼을 클릭했을때의 함수
  const handleMenuClick = ({ key }: { key: string }) => {
    if(selectedPage !== key ){

      if (key === '1') {
        setSelectedPage(key)
        // console.log('key1',key);
        // router.replace('/branch/[id]', '/branch/1');
      } else if (key === '2') {      
        setSelectedPage(key)
        // console.log('key2',key);
        // router.replace('/unit/[unitId]', '/unit/1');
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
            <Menu selectedKeys={[selectedPage]} onClick={handleMenuClick} items={items}>
              
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
