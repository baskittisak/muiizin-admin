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
import { useQuery } from "../../utils/useQuery";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import ErrorPage from "../../center_components/ErrorPage";
import StepsProduct from "./StepsProduct";
import ProductInfo from "./ProductInfo";
import ProductOption from "./option/ProductOption";
import ProductDetail from "./ProductDetail";
import ProductReview from "./ProductReview";
import useSWR from "swr";

const Body = styled.div`
  margin-bottom: 24px;
`;

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const Product = () => {
  const navigate = useNavigate();
  const productId = useQuery("productId");
  const [current, setCurrent] = useState(0);
  const [productInfo, setProductInfo] = useState(defaultProductInfo);
  const [option, setOption] = useState(defaultOption);
  const [typeOption, setTypeOption] = useState("");
  const [productOption, setProductOption] = useState();
  const [productDetail, setProductDetail] = useState({
    th: "<p></p>",
    en: "<p></p>",
  });

  const apiProduct = useMemo(() => {
    return productId && `/data/product/${productId}`;
  }, [productId]);

  const apiProductSize = useMemo(() => {
    return productId && `/data/product/option/size/${productId}`;
  }, [productId]);

  const apiProductColor = useMemo(() => {
    return productId && `/data/product/option/color/${productId}`;
  }, [productId]);

  const apiProductImage = useMemo(() => {
    return productId && `/data/product/images/${productId}`;
  }, [productId]);

  const { data: product, error: productError } = useSWR(apiProduct);
  const { data: productSize, error: sizeError } = useSWR(apiProductSize);
  const { data: productColor, error: colorError } = useSWR(apiProductColor);
  const { data: productImages, error: imagesError } = useSWR(apiProductImage);

  const isSizeOnly = useMemo(() => {
    return typeOption === "1";
  }, [typeOption]);

  useEffect(() => {
    if (productId && product) {
      setProductInfo(product);
      setProductDetail(product?.detail);
      setCurrent(3);
    }
  }, [product, productId]);

  useEffect(() => {
    if (productId && productSize && productSize?.length !== 0) {
      setOption((prevState) => ({
        ...prevState,
        enable: true,
        size: true,
      }));
      setProductOption((prevState) => {
        const optionData = { ...prevState };
        optionData.size = productSize;
        return optionData;
      });
    }
  }, [productId, productSize]);

  useEffect(() => {
    if (productId && productColor && productColor?.length !== 0) {
      setOption((prevState) => ({
        ...prevState,
        enable: true,
        color: true,
      }));
      setProductOption((prevState) => {
        const optionData = { ...prevState };
        optionData.color = productColor;
        return optionData;
      });
    }
  }, [productId, productColor]);

  useEffect(() => {
    if (productId && productImages && productImages?.length !== 0) {
      const isSize = productSize?.length !== 0;
      setOption((prevState) => ({
        ...prevState,
        enable: true,
        color: false,
        size: isSize,
      }));
      setProductOption((prevState) => {
        if (isSize) {
          const optionData = { ...prevState };
          optionData.size = productSize;
          optionData.images = productImages;
          return optionData;
        } else {
          return productImages;
        }
      });
    }
  }, [productId, productImages, productSize]);

  useEffect(() => {
    if (!productId && option.enable !== null) {
      setProductOption(() => {
        if (option.enable && typeOption) {
          const optionData = {};
          if (option.size) {
            optionData.size = defaultOptionSize;
          }
          if (option.color) {
            optionData.color = defaultOptionColor;
          }
          if (isSizeOnly) {
            optionData.images = [];
          }
          return optionData;
        } else {
          return [];
        }
      });
    }
  }, [
    productId,
    option.enable,
    option.size,
    option.color,
    isSizeOnly,
    typeOption,
  ]);

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
    !value && setTypeOption("");
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

  const onSetColor = useCallback((type, index, value, language) => {
    const isAdd = type === "add";
    const isDelete = type === "delete";
    setProductOption((prevState) => {
      const newColor = [...prevState?.color];
      if (isAdd) {
        newColor.push({
          name: {
            th: "",
            en: "",
          },
          code: "",
          images: [],
        });
        return { ...prevState, color: [...newColor] };
      } else if (isDelete) {
        const colorDeleted = newColor.filter(
          (_, prevIndex) => prevIndex !== index
        );
        return { ...prevState, color: [...colorDeleted] };
      } else {
        if (language) {
          newColor[index].name[language] = value;
        } else {
          newColor[index].code = value;
        }
        return { ...prevState, color: [...newColor] };
      }
    });
  }, []);

  const onSetColorImage = useCallback((type, index, value, indexDel) => {
    const isAdd = type === "add";
    setProductOption((prevState) => {
      const newColor = [...prevState?.color];
      if (isAdd) {
        newColor[index].images = value;
        return { ...prevState, color: [...newColor] };
      } else {
        const imageDeleted = newColor[index].images.filter(
          (_, prevIndex) => prevIndex !== indexDel
        );
        newColor[index].images = [...imageDeleted];
        return { ...prevState, color: [...newColor] };
      }
    });
  }, []);

  const onSetImage = useCallback(
    (type, value, index) => {
      const isAdd = type === "add";
      if (isAdd) {
        if (isSizeOnly) {
          setProductOption((prevState) => ({
            ...prevState,
            images: value,
          }));
        } else {
          setProductOption(value);
        }
      } else {
        if (isSizeOnly) {
          setProductOption((prevState) => {
            const newImage = [...prevState?.images];
            const imagesDeleted = newImage.filter(
              (_, prevIndex) => prevIndex !== index
            );
            return { ...prevState, images: imagesDeleted };
          });
        } else {
          setProductOption((prevState) => {
            const newImage = [...prevState];
            return newImage.filter((_, prevIndex) => prevIndex !== index);
          });
        }
      }
    },
    [isSizeOnly]
  );

  const onSetDetailTH = useCallback((value) => {
    setProductDetail((prevState) => ({
      ...prevState,
      th: value,
    }));
  }, []);

  const onSetDetailEN = useCallback((value) => {
    setProductDetail((prevState) => ({
      ...prevState,
      en: value,
    }));
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
            typeOption={typeOption}
            isSizeOnly={isSizeOnly}
            setTypeOption={setTypeOption}
            onSetEnable={onSetEnable}
            onSetSize={onSetSize}
            onSetColor={onSetColor}
            onSetColorImage={onSetColorImage}
            onSetImage={onSetImage}
          />
        );
      case 2:
        return (
          <ProductDetail
            detailTH={productDetail.th}
            detailEN={productDetail.en}
            onSetDetailTH={onSetDetailTH}
            onSetDetailEN={onSetDetailEN}
          />
        );
      case 3:
        return (
          <ProductReview
            productInfo={productInfo}
            optionEnable={option.enable}
            productOption={productOption}
            detailTH={productDetail.th}
            detailEN={productDetail.en}
            setCurrent={setCurrent}
          />
        );
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
    typeOption,
    isSizeOnly,
    productDetail.th,
    productDetail.en,
    onSetEnable,
    onSetSize,
    onSetColor,
    onSetColorImage,
    onSetImage,
    onSetDetailTH,
    onSetDetailEN,
  ]);

  const isProductNull = useMemo(() => {
    const values = [
      ...objValuesArr(productInfo.name),
      ...objValuesArr(productInfo.owner),
      productInfo.category,
      productInfo.price,
      productInfo.status.key,
    ];
    return values.includes("");
  }, [
    productInfo.category,
    productInfo.name,
    productInfo.owner,
    productInfo.price,
    productInfo.status.key,
  ]);

  const isOptionNull = useMemo(() => {
    const totalOption = productOption && objValuesArr(productOption).length;
    const initNull =
      option.enable === null || !productOption || totalOption === 0;

    if (totalOption !== 0) {
      const size = productOption?.size;
      const color = productOption?.color;
      const sizeName = size && size?.map((size) => size.name);
      const colorCode = color && color?.map((color) => color.code);
      const colorName =
        color && color?.flatMap((color) => objValuesArr(color.name));
      const colorImages = color && color?.map((color) => color.images?.length);
      const sizeIsNull = sizeName && sizeName.includes("");
      const colorIsNull =
        (colorCode && colorName && [...colorCode, ...colorName].includes("")) ||
        (colorImages && colorImages.includes(0));
      const imageIsNull = isSizeOnly && productOption?.images?.length === 0;

      return sizeIsNull || colorIsNull || imageIsNull;
    } else {
      return initNull;
    }
  }, [option.enable, productOption, isSizeOnly]);

  const isDetailNull = useMemo(() => {
    return productDetail.th === "<p></p>" || productDetail.en === "<p></p>";
  }, [productDetail.en, productDetail.th]);

  const isDisabled = useMemo(() => {
    switch (current) {
      case 0:
        return isProductNull;
      case 1:
        return isOptionNull;
      case 2:
        return isDetailNull;
      default:
        return false;
    }
  }, [current, isProductNull, isOptionNull, isDetailNull]);

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
            <BaseButton
              width="90px"
              bgColor="#D9E3D9"
              color="#044700"
              onClick={() => setCurrent(0)}
            >
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

  const isLoading = useMemo(() => {
    return (
      productId && (!product || !productSize || !productColor || !productImages)
    );
  }, [product, productId, productSize, productColor, productImages]);

  if (productError || sizeError || colorError || imagesError) {
    return (
      <ErrorPage
        message={
          productError?.response?.data ||
          sizeError?.response?.data ||
          colorError?.response?.data ||
          imagesError?.response?.data
        }
      />
    );
  }

  return (
    <Frame
      loading={isLoading}
      label="เพิ่มสินค้าใหม่"
      onBack={() => navigate("/")}
    >
      <FormWrapper>
        {current < 3 && <StepsProduct current={current} />}
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
