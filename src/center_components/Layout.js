import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import LayoutAntd from "antd/lib/layout";
import Menu from "antd/lib/menu";
import IconSvg from "./IconSvg";
import BaseImage from "./BaseImage";
import Typography from "./Typography";
import { ReactComponent as product_icon } from "../assets/icons/product.svg";
import { ReactComponent as categories_icon } from "../assets/icons/categories.svg";
import { ReactComponent as banner_icon } from "../assets/icons/banner.svg";
import { ReactComponent as arrow_collapse_icon } from "../assets/icons/arrow_collapse.svg";
import { ReactComponent as user_icon } from "../assets/icons/user.svg";
import { ReactComponent as logout_icon } from "../assets/icons/logout.svg";
import muiizin_logo from "../assets/image/muiizin_logo.svg";
import { Box } from "../style/common";
import { Space } from "antd";

const { Sider } = LayoutAntd;

const LayoutContainer = styled.div`
  position: relative;
  width: 265px;
  height: 100vh;
  background-color: #044700;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.25);

  .ant-layout-sider {
    margin: auto;
    min-width: 100px !important;
  }

  .ant-layout-sider,
  .ant-menu,
  .ant-menu-item {
    background: #044700;
  }

  .ant-menu {
    color: #8aa399;
    font-size: 18px;
    font-weight: 400;
  }

  .ant-menu-item-selected {
    background-color: #fff4d6 !important;
    color: #044700;
    font-weight: 700;
    border-radius: 5px;
  }

  .ant-menu-inline .ant-menu-item::after {
    display: none;
  }

  .ant-menu-inline,
  .ant-menu-vertical {
    border: none;
  }

  .ant-menu-inline.ant-menu-root .ant-menu-item,
  .ant-menu-title-content,
  .ant-menu-item {
    transition: none;
  }

  .ant-menu-title-content {
    margin-left: 16px;
  }

  .ant-menu-item > div:first-child {
    margin-bottom: 9px;
  }

  :hover {
    .ant-menu-item.ant-menu-item-active {
      color: #8aa399;
    }
    .ant-menu-item-selected.ant-menu-item-active {
      color: #044700;
    }
  }

  ${({ collapsed }) =>
    collapsed &&
    css`
      width: 100px;
      transition: width 0.3s;

      .ant-menu-item {
        margin: 0 8px;
      }

      .ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
        padding: 4px calc(50% - 40px / 2) 0;
      }
    `};
`;

const Logo = styled(Box)`
  margin-bottom: 30px;

  ${({ collapsed }) =>
    collapsed &&
    css`
      .anticon svg {
        transform: rotate(180deg);
      }
    `};
`;

const Footer = styled(Box)`
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 0 20px;
  position: absolute;
  bottom: 0;

  ${({ collapsed }) =>
    collapsed &&
    css`
      height: 50px;
    `};
`;

const Body = styled.div`
  width: calc(100% - 265px);
  height: 100vh;
  padding: 25px;
  background-color: #ebf2eb;
  overflow-y: scroll;
  overflow-x: hidden;

  ${({ collapsed }) =>
    collapsed &&
    css`
      width: calc(100% - 100px);
    `};
`;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
      case "/product-list":
      case "/product":
        setActiveKey("1");
        break;
      case "/categories":
      case "/category":
        setActiveKey("2");
        break;
      case "/banner-list":
      case "/banner":
      case "/banner-info":
        setActiveKey("3");
        break;
      default:
        setActiveKey("1");
        break;
    }
  }, []);

  const colorActive = useCallback(
    (key) => {
      return key === activeKey ? "#044700" : "";
    },
    [activeKey]
  );

  const onLinkTo = useCallback((event) => {
    const { key } = event;
    const { link } = event.item.props;
    window.location.replace(link);
    setActiveKey(key);
  }, []);

  const menuItems = useMemo(
    () => [
      {
        key: "1",
        icon: (
          <IconSvg src={product_icon} color={colorActive("1")} fontSize={23} />
        ),
        label: "รายการสินค้า",
        link: "/product-list",
      },
      {
        key: "2",
        icon: (
          <IconSvg
            src={categories_icon}
            color={colorActive("2")}
            fontSize={23}
          />
        ),
        label: "หมวดหมู่สินค้า",
        link: "/categories",
      },
      {
        key: "3",
        icon: (
          <IconSvg src={banner_icon} color={colorActive("3")} fontSize={23} />
        ),
        label: "แบนเนอร์",
        link: "/banner-list",
      },
    ],
    [colorActive]
  );

  const menuSider = useMemo(
    () => (
      <LayoutContainer collapsed={collapsed}>
        <Sider width={233} trigger={null} collapsible collapsed={collapsed}>
          <Logo justify="space-between" align="center" collapsed={collapsed}>
            <BaseImage src={muiizin_logo} />
            <IconSvg
              src={arrow_collapse_icon}
              fontSize={24}
              onClick={() => setCollapsed((prev) => !prev)}
            />
          </Logo>
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeKey]}
            selectedKeys={[activeKey]}
            items={menuItems}
            onSelect={onLinkTo}
          />
        </Sider>
        <Footer
          justify={collapsed ? "center" : "space-between"}
          align="center"
          collapsed={collapsed}
        >
          {!collapsed && (
            <Space size={16}>
              <IconSvg src={user_icon} fontSize={40} />
              <Space direction="vertical" size={0}>
                <Typography
                  fontSize={18}
                  lineHeight={20}
                  fontWeight={700}
                  color="#FFF4D6"
                >
                  สมศักดิ์ มุ่งมานะ
                </Typography>
                <Typography fontSize={14} lineHeight={15} color="#E0E0E0">
                  Admin
                </Typography>
              </Space>
            </Space>
          )}
          <IconSvg
            src={logout_icon}
            fontSize={collapsed ? 20 : 18}
            heightable={false}
          />
        </Footer>
      </LayoutContainer>
    ),
    [activeKey, collapsed, menuItems, onLinkTo]
  );

  const body = useMemo(
    () => <Body collapsed={collapsed}>{children}</Body>,
    [children, collapsed]
  );

  return (
    <Box>
      {menuSider}
      {body}
    </Box>
  );
};

export default memo(Layout);
