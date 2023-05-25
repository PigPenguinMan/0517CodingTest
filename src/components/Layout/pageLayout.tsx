import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { Affix, Layout, Menu } from 'antd';
import type { AppProps, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Branch = dynamic(() => import('../../components/Layout/branch'));
const Unit = dynamic(() => import('../../pages/unit/[unitId]'));
const { Header, Sider, Content, Footer } = Layout;
const items: MenuProps['items'] = [
  {
    key: 'branch',
    label: '창고'
  },
  {
    key: 'unit',
    label: '유닛'
  },
];

type UnitProps = {
  unit: {
    id: number;
    branchId: number;
    unitName: string;
    numberOfUnitItems: number;
    width: number;
    depth: number;
    height: number;
    priceValue: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
type BranchProps = {
  branch: {
    id: number;
    branchName: string;
    isAvailable: number;
    isExamined: number;
    numberOfUnits: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
type UnitItemProps = {
  item: {
    id: number;
    unitId: number;
    unitItemName: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updateAt: string;
  }[];
};
const PageLayout: React.FC<AppProps> = ({ children }) => {
  
  const [selectedPage, setSelectedPage] = useState('branch'); // 선택된 메뉴의 key
  const [firstLoad, setFirstLoad] = useState(true);
  const [branchData, setBranchData] = useState<BranchProps['branch']>([]);
  const [unitData, setUnitData] = useState<UnitProps['unit']>([]);
  const [unitItemData, setUnitItemData] = useState<UnitItemProps['item']>([]);
  const [unitId,setUnitId] = useState(1)
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (id ) {
  //     setSelectedPage(id.toString());
  //   }
  // }, [router.query]);

  useEffect(() => {
    if (firstLoad) {
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
      fetchUnitItemData();
    }
    setFirstLoad(false);
  }, []);
  // 메뉴버튼을 클릭했을때의 함수
  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedPage(key)
    if (key === 'branch') {
      setSelectedPage(key);
    } else if (key === 'unit') {
      setSelectedPage(key);
      router.push(`/unit/${unitId}`)
    }
  };
  
  const getPageComponent = () => {
    if (selectedPage === 'branch') {
      return <Branch branch={branchData} />;
    }
    if (selectedPage === 'unit') {
      return <Unit unit={unitData} branch={branchData} item={unitItemData} />;
    }
    return null;
  };
  
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
          <Sider style={{ background: 'white', height: '100vh' }}>
            {/* 창고페이지 1번 창고/유닛 페이지 선택 */}
            <Menu
              selectedKeys={[selectedPage]}
              onClick={handleMenuClick}
              items={items}
            ></Menu>
          </Sider>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Content>
    {getPageComponent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
