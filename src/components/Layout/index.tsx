import React, { useEffect, useState } from 'react';
import { Affix, Layout, Menu, Statistic } from 'antd';

import type { AppProps, MenuProps } from 'antd';
import Branch from 'pages/branch';
import Unit from 'pages/unit';
const { Header, Sider, Content, Footer } = Layout;



const items: MenuProps['items'] = [
  { key: '1', label: '창고' },
  { key: '2', label: '유닛' },
];

const PageLayout: React.FC<AppProps> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('branch'); // 선택된 메뉴의 key
  
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
            <Menu selectedKeys={[selectedPage]} onClick={handleMenuClick}>
              <Menu.Item key={'1'}> 창고 </Menu.Item>
              <Menu.Item key={'2'}> 유닛 </Menu.Item>
            </Menu>
          </Sider>
        </Affix>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Content>
            {selectedPage === '1' && <Branch/>}
            {selectedPage === '2' && <Unit/>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
