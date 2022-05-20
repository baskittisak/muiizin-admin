import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "../../style/common";
import { Space } from "antd";
import { objValuesArr } from "../../utils/utils";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import StepsProduct from "./StepsProduct";
import ProductInfo from "./ProductInfo";
import ProductOption from "./option/ProductOption";
import ProductDetail from "./ProductDetail";

const Body = styled.div`
  margin-bottom: 24px;
  /* height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: block !important;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #8aa399;
    border-radius: 5px;
  } */
`;

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const Product = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [productInfo, setProductInfo] = useState({
    name: {
      th: "",
      en: "",
    },
    owner: {
      th: "",
      en: "",
    },
    category: "",
    price: "",
    status: "",
  });

  const onNext = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const onPrev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const displayStep = useMemo(() => {
    switch (current) {
      case 0:
        return (
          <ProductInfo
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case 1:
        return <ProductOption />;
      case 2:
        return <ProductDetail />;
      default:
        return null;
    }
  }, [current, productInfo]);

  const isProductNull = useMemo(() => {
    const values = [
      ...objValuesArr(productInfo.name),
      ...objValuesArr(productInfo.owner),
      productInfo.category,
      productInfo.price,
      productInfo.status,
    ];
    return values.includes("");
  }, [
    productInfo.category,
    productInfo.name,
    productInfo.owner,
    productInfo.price,
    productInfo.status,
  ]);

  const isDisabled = useMemo(() => {
    switch (current) {
      case 0:
        return isProductNull;
      default:
        return false;
    }
  }, [current, isProductNull]);

  const nextButton = useMemo(
    () => (
      <BaseButton
        width="90px"
        bgColor="#044700"
        color="#fff"
        onClick={onNext}
        disabled={isDisabled}
      >
        ถัดไป
      </BaseButton>
    ),
    [isDisabled, onNext]
  );

  const prevButton = useMemo(
    () => (
      <BaseButton
        width="90px"
        bgColor="#D9E3D9"
        color="#044700"
        onClick={onPrev}
      >
        ย้อนกลับ
      </BaseButton>
    ),
    [onPrev]
  );

  const displayButton = useMemo(() => {
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
  }, [current, nextButton, prevButton]);

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
