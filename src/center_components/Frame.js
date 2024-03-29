import { memo } from "react";
import styled, { css } from "styled-components";
import Typography from "./Typography";
import IconSvg from "./IconSvg";
import { ReactComponent as arrow_icon } from "../assets/icons/arrow_left.svg";
import { Box, Loading } from "../style/common";
import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  padding: 32px 50px 26px;
  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: calc(100vh - 52px);
`;

const Header = styled(Box)`
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #d9e3d9;
`;

const Body = styled.div`
  height: calc(90% - 32px);
  overflow-y: scroll;

  ${({ footer }) =>
    footer &&
    css`
      height: calc(90% - 112px);
    `};
`;

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const BackButton = styled(Box)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
`;

const Frame = ({
  label,
  extra,
  loading = false,
  children,
  footer = null,
  footerAlign = "center",
  onBack,
}) => {
  return (
    <Loading spinning={loading} indicator={<LoadingOutlined spin />}>
      <Container>
        <Header justify="space-between" align="center">
          <Space size={12}>
            {onBack && (
              <BackButton justify="center" align="center" onClick={onBack}>
                <IconSvg src={arrow_icon} fontSize={20} />
              </BackButton>
            )}
            <Typography
              fontSize={28}
              lineHeight={30}
              fontWeight={700}
              color="#333333"
            >
              {label}
            </Typography>
          </Space>
          {extra && extra}
        </Header>
        <Body footer={footer}>{children}</Body>
        {footer && (
          <Footer justify={footerAlign} align="center">
            {footer}
          </Footer>
        )}
      </Container>
    </Loading>
  );
};

export default memo(Frame);
