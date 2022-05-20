import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import { Box } from "../../style/common";
import { Space } from "antd";
import ProductInfo from "./ProductInfo";
import StepsProduct from "./StepsProduct";

const Body = styled.div`
  height: 400px;
  margin-bottom: 24px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: block !important;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #8aa399;
    border-radius: 5px;
  }
`;

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const Product = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const onNext = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const onPrev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const displayStep = useMemo(() => {
    switch (current) {
      case 0:
        return <ProductInfo />;
      default:
        return null;
    }
  }, [current]);

  const displayButton = useMemo(() => {
    const nextButton = (
      <BaseButton width="90px" bgColor="#044700" color="#fff" onClick={onNext}>
        ถัดไป
      </BaseButton>
    );

    const prevButton = (
      <BaseButton
        width="90px"
        bgColor="#D9E3D9"
        color="#044700"
        onClick={onPrev}
      >
        ย้อนกลับ
      </BaseButton>
    );

    switch (current) {
      case 0:
        return nextButton;
      case 1:
      case 2:
        return (
          <>
            {prevButton}
            {nextButton}
          </>
        );
      default:
        return null;
    }
  }, [current, onNext, onPrev]);

  return (
    <Frame label="เพิ่มสินค้าใหม่" onBack={() => navigate("/")}>
      <FormWrapper>
        <StepsProduct current={current} />
        <FormWrapper>
          <Body>{displayStep}</Body>
        </FormWrapper>
      </FormWrapper>
      <Footer justify="center" align="center">
        <Space size={50}>{displayButton}</Space>
      </Footer>
    </Frame>
  );
};

export default memo(Product);
