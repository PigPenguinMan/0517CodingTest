import React from 'react';
import { Affix, Layout, Menu } from 'antd';

import type { AppProps, MenuProps } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const items: MenuProps['items'] = [
  { key: '1', label: '창고' },
  { key: '2', label: '유닛' },
];

const PageLayout: React.FC<AppProps> = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
        <Affix>
          <Sider style={{ background: 'white', height: '100vh' }}>
            <Menu items={items} />
          </Sider>
        </Affix>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
