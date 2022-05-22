import { memo } from "react";
import styled from "styled-components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Container = styled.div`
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }

  .ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: none;
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border-radius: 3px 3px 0px 0px;
    background: #d9e3d9;
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 2px;
  }

  .ant-tabs-tab-btn {
    color: #8aa399;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ffffff;
  }

  .ant-tabs-tab-active {
    background: #044700;
  }

  .ant-tabs-tabpane {
    padding: 18px 20px;
    border: 1px solid #044700;
    border-radius: 0 5px 5px;
  }
`;

const TabsLanguage = ({ children, activeKey = "th", onChange }) => {
  return (
    <Container>
      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        onChange={onChange}
      >
        <TabPane tab="TH" key="th">
          {children}
        </TabPane>
        <TabPane tab="EN" key="en">
          {children}
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default memo(TabsLanguage);
