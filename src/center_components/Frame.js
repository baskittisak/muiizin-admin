import { memo } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import IconSvg from "./IconSvg";
import { ReactComponent as arrow_icon } from "../assets/icons/arrow_left.svg";
import { Box } from "../style/common";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  padding: 32px 50px 26px;
  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const Header = styled(Box)`
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #d9e3d9;
`;

const BackButton = styled(Box)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
`;

const Loading = styled(Spin)`
  max-height: initial !important;

  > span {
    font-size: 24px;
    color: #044700;
  }
`;

const Frame = ({ label, extra, loading = false, children, onBack }) => {
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
        {children}
      </Container>
    </Loading>
  );
};

export default memo(Frame);
