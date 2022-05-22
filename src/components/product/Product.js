import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "../../style/common";
import { Space } from "antd";
import { objValuesArr } from "../../utils/utils";
import {
  defaultOption,
  defaultProductInfo,
  defaultOptionSize,
  defaultOptionColor,
} from "./data/defaultData";
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
  const [productInfo, setProductInfo] = useState(defaultProductInfo);
  const [option, setOption] = useState(defaultOption);
  const [productOption, setProductOption] = useState();

  useEffect(() => {
    if (option.enable !== null) {
      setProductOption(() => {
        if (option.enable) {
          const optionData = {};
          if (option.size) {
            optionData.size = defaultOptionSize;
          }
          if (option.color) {
            optionData.color = defaultOptionColor;
          }
          return optionData;
        } else {
          return [];
        }
      });
    }
  }, [option.enable, option.size, option.color]);

  const onNext = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const onPrev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const onSetEnable = useCallback((type, value) => {
    setOption((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSetSize = useCallback((type, index, value) => {
    const isAdd = type === "add";
    const isDelete = type === "delete";
    setProductOption((prevState) => {
      const newSize = [...prevState?.size];
      if (isAdd) {
        newSize.push({ name: "" });
        return { ...prevState, size: [...newSize] };
      } else if (isDelete) {
        const sizeDeleted = newSize.filter(
          (_, prevIndex) => prevIndex !== index
        );
        return { ...prevState, size: [...sizeDeleted] };
      } else {
        newSize[index].name = value;
        return { ...prevState, size: [...newSize] };
      }
    });
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
        return (
          <ProductOption
            optionEnable={option.enable}
            sizeEnable={option.size}
            colorEnable={option.color}
            productOption={productOption}
            onSetEnble={onSetEnable}
            onSetSize={onSetSize}
          />
        );
      case 2:
        return <ProductDetail />;
      case 3:
        return <>Product Review</>;
      default:
        return null;
    }
  }, [
    current,
    option.color,
    option.enable,
    option.size,
    productInfo,
    productOption,
    onSetEnable,
    onSetSize,
  ]);

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
      case 3:
        return (
          <>
            <BaseButton width="90px" bgColor="#D9E3D9" color="#044700">
              แก้ไข
            </BaseButton>
            <BaseButton width="90px" bgColor="#044700" color="#fff">
              ยืนยัน
            </BaseButton>
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
