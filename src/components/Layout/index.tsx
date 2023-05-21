import React, { useState } from 'react';
import { Affix, Layout, Menu} from 'antd';
import type { AppProps, MenuProps } from 'antd';
import branchJson from '../../pages/api/branch.json';
import unitJson from '../../pages/api/unit.json'
import unitItemJson from '../../pages/api/unit-item.json'
import Branch from 'components/Layout/branch';
import Unit from 'components/Layout/unit';

const { Header, Sider, Content, Footer } = Layout;



const items: MenuProps['items'] = [
  { key: '1', label: '창고' },
  { key: '2', label: '유닛' },
];

export interface BranchProps {
  branch: {
    id: number;
    branchName: string;
    isAvailable: number;
    isExamined: number;
    numberOfUnits: number;
    createdAt: string;
    updatedAt: string;
  }[]
}

export interface UnitProps {
  unit : {
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
  }[]
}

export interface UnitItemProps {
  item : {
    id: number;
    unitId: number;
    unitItemName: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  }[]
}
const PageLayout: React.FC<AppProps> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('branch'); // 선택된 메뉴의 key
  const [branchData ,setBranchData] = useState(branchJson);
  const [unitData ,setUnitData] = useState(unitJson);
  const [unitItemData , setUnitItem] = useState(unitItemJson)
  const handleMenuClick = (e : {key : React.Key} ) => {
    setSelectedPage(e.key.toString());
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
              <Menu.Item key={'1'}> 창고 </Menu.Item>
              <Menu.Item key={'2'}> 유닛 </Menu.Item>
            </Menu>
          </Sider>
        </Affix>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Content>
            {/* branchData를 props로 넘겨주고 */}
            {selectedPage === '1' && <Branch branch={branchData}/>}  
            {selectedPage === '2' && <Unit unit={unitData} branch={branchData} item={unitItemData}/>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
