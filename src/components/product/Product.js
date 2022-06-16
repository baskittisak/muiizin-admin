import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Space } from "antd";
import { objValuesArr } from "../../utils/utils";
import {
  defaultOption,
  defaultProductInfo,
  defaultOptionSize,
  defaultOptionColor,
} from "./data/defaultData";
import { useQuery } from "../../utils/useQuery";
import { getNotification } from "../../center_components/Notification";
import { useAuthContext } from "../../store/AuthContext";
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

const Product = () => {
  const navigate = useNavigate();
  const productId = useQuery("productId");
  const isEdit = useQuery("edit") === "true";
  const { user } = useAuthContext();
  const [current, setCurrent] = useState(0);
  const [productInfo, setProductInfo] = useState(defaultProductInfo);
  const [option, setOption] = useState(defaultOption);
  const [typeOption, setTypeOption] = useState("");
  const [productOption, setProductOption] = useState();
  const [productDetail, setProductDetail] = useState({
    th: "<p></p>",
    en: "<p></p>",
  });
  const [loading, setLoading] = useState(false);

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
      setTypeOption("1");
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
      setTypeOption("2");
    }
  }, [productId, productColor]);

  useEffect(() => {
    if (productId && productImages && productImages?.length !== 0) {
      const isSize = productSize?.length !== 0;
      setOption((prevState) => ({
        ...prevState,
        enable: isSize,
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
      isSize && setTypeOption("1");
    }
  }, [productId, productImages, productSize]);

  useEffect(() => {
    if (productId && productSize?.length !== 0 && productColor?.length !== 0) {
      setTypeOption("3");
    }
  }, [productColor?.length, productId, productSize?.length]);

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

  const onEdit = useCallback(() => {
    setCurrent(0);
    navigate(
      productId
        ? `/product?productId=${productId}&edit=true`
        : `/product?edit=true`
    );
  }, [productId, navigate]);

  const onSetEnable = useCallback((type, value) => {
    setOption((prevState) => ({
      ...prevState,
      [type]: value,
    }));
    !value && setTypeOption("");
  }, []);

  const onDeleteSize = useCallback(async (sizeId) => {
    const { default: axios } = await import("axios");
    try {
      await axios.put("/delete/size", { sizeId });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSetSize = useCallback(
    (type, index, value) => {
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
          const sizeId = newSize[index]?.id;
          productId && sizeId && onDeleteSize(sizeId);
          return { ...prevState, size: [...sizeDeleted] };
        } else {
          newSize[index].name = value;
          return { ...prevState, size: [...newSize] };
        }
      });
    },
    [productId, onDeleteSize]
  );

  const onDeleteColor = useCallback(async (colorId) => {
    const { default: axios } = await import("axios");
    try {
      await axios.put("/delete/color", { colorId });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSetColor = useCallback(
    (type, index, value, language) => {
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
          const colorId = newColor[index]?.id;
          productId && colorId && onDeleteColor(colorId);
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
    },
    [productId, onDeleteColor]
  );

  const onDeleteColorImage = useCallback(async (colorImageId) => {
    const { default: axios } = await import("axios");
    try {
      await axios.put("/delete/image/color", { colorImageId });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSetColorImage = useCallback(
    (type, index, value, indexDel) => {
      const isAdd = type === "add";
      setProductOption((prevState) => {
        const newColor = [...prevState?.color];
        if (isAdd) {
          if (productId) {
            const newImage = value.pop();
            newColor[index].images.push({ image: newImage });
          } else {
            newColor[index].images = value;
          }
          return { ...prevState, color: [...newColor] };
        } else {
          const imageDeleted = newColor[index].images.filter(
            (_, prevIndex) => prevIndex !== indexDel
          );
          const colorImageId = newColor[index].images[indexDel]?.id;
          productId && colorImageId && onDeleteColorImage(colorImageId);
          newColor[index].images = [...imageDeleted];
          return { ...prevState, color: [...newColor] };
        }
      });
    },
    [productId, onDeleteColorImage]
  );

  const onDeleteImage = useCallback(async (productImageId) => {
    const { default: axios } = await import("axios");
    try {
      await axios.put("/delete/image/product", { productImageId });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSetImage = useCallback(
    (type, value, index) => {
      const isAdd = type === "add";
      if (isAdd) {
        if (isSizeOnly) {
          if (productId) {
            const newImage = value.pop();
            setProductOption((prevState) => {
              const newImages = [...prevState?.images];
              newImages.push({ image: newImage });
              return { ...prevState, images: newImages };
            });
          } else {
            setProductOption((prevState) => ({
              ...prevState,
              images: value,
            }));
          }
        } else {
          if (productId) {
            const newImage = value.pop();
            setProductOption((prevState) => {
              const newOptions = [...prevState];
              newOptions.push({ image: newImage });
              return newOptions;
            });
          } else {
            setProductOption(value);
          }
        }
      } else {
        if (isSizeOnly) {
          setProductOption((prevState) => {
            const newImages = [...prevState?.images];
            const productImageId = newImages[index]?.id;
            productId && productImageId && onDeleteImage(productImageId);
            const imagesDeleted = newImages.filter(
              (_, prevIndex) => prevIndex !== index
            );
            return { ...prevState, images: imagesDeleted };
          });
        } else {
          setProductOption((prevState) => {
            const newImages = [...prevState];
            const productImageId = newImages[index]?.id;
            productId && productImageId && onDeleteImage(productImageId);
            return newImages.filter((_, prevIndex) => prevIndex !== index);
          });
        }
      }
    },
    [isSizeOnly, productId, onDeleteImage]
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

  const onSaveImage = useCallback(
    async (newProductId) => {
      const { default: axios } = await import("axios");
      const payload = {
        images: isSizeOnly ? productOption?.images : productOption,
        productId: newProductId,
      };
      productId
        ? await axios.put("/edit/product/image", payload)
        : await axios.post("/create/product/image", payload);
    },
    [productId, isSizeOnly, productOption]
  );

  const onSaveSize = useCallback(
    async (newProductId) => {
      const { default: axios } = await import("axios");
      const payload = {
        sizes: productOption?.size,
        productId: newProductId,
      };
      productId
        ? await axios.put("/edit/product/size", payload)
        : await axios.post("/create/product/size", payload);
    },
    [productId, productOption]
  );

  const onSaveColor = useCallback(
    async (newProductId) => {
      const { default: axios } = await import("axios");
      const payload = {
        colors: productOption?.color,
        productId: newProductId,
      };
      productId
        ? await axios.put("/edit/product/color", payload)
        : await axios.post("/create/product/color", payload);
    },
    [productId, productOption]
  );

  const onSave = useCallback(async () => {
    setLoading(true);
    const { default: axios } = await import("axios");
    try {
      const { key } = productInfo.status;
      const status =
        key === "1" ? "พร้อมส่ง" : key === "2" ? "พรีออเดอร์" : "หมดอายุ";
      const payload = {
        productId,
        name: productInfo.name,
        owner: productInfo.owner,
        price: productInfo.price,
        status,
        isOption: option.enable,
        detail: productDetail,
        updatedTime: Date.now(),
        categoryId: productInfo.category,
        adminId: user?.adminId,
      };
      const { data } = productId
        ? await axios.put("/edit/product", payload)
        : await axios.post("/create/product", payload);
      const newProductId = productId ? productId : data?.productId;
      if (option.enable) {
        if (isSizeOnly) {
          await onSaveSize(newProductId);
          await onSaveImage(newProductId);
        } else {
          option.size && onSaveSize(newProductId);
          option.color && onSaveColor(newProductId);
        }
      } else {
        await onSaveImage(newProductId);
      }
      setLoading(false);
      getNotification({
        type: "success",
        message: productId ? "แก้ไขสินค้าสำเร็จ" : "สร้างสินค้าสำเร็จ",
      });
      navigate(`/product?productId=${newProductId}&edit=false`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      getNotification({
        type: "error",
        message: "เกิดข้อผิดพลาด",
      });
    }
  }, [
    productInfo.status,
    productInfo.name,
    productInfo.owner,
    productInfo.price,
    productInfo.category,
    option.enable,
    option.size,
    option.color,
    productDetail,
    isSizeOnly,
    productId,
    user?.adminId,
    navigate,
    onSaveSize,
    onSaveImage,
    onSaveColor,
  ]);

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
              disabled={loading}
              onClick={onEdit}
            >
              แก้ไข
            </BaseButton>
            {(isEdit || !productId) && (
              <BaseButton
                width="90px"
                bgColor="#044700"
                color="#fff"
                loading={loading}
                onClick={onSave}
              >
                ยืนยัน
              </BaseButton>
            )}
          </>
        );
      default:
        return null;
    }
  }, [
    current,
    nextButton,
    prevButton,
    loading,
    productId,
    isEdit,
    onEdit,
    onSave,
  ]);

  const isLoading = useMemo(() => {
    return (
      loading ||
      (productId &&
        (!product || !productSize || !productColor || !productImages))
    );
  }, [loading, product, productId, productSize, productColor, productImages]);

  const label = useMemo(() => {
    return productId && current === 3 ? productInfo.name.th : "เพิ่มสินค้าใหม่";
  }, [current, productId, productInfo.name.th]);

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
      label={label}
      onBack={() => navigate("/")}
      footer={<Space size={50}>{displayButton}</Space>}
    >
      <FormWrapper>
        {current < 3 && <StepsProduct current={current} />}
        <FormWrapper>
          <Body>{displayStep}</Body>
        </FormWrapper>
      </FormWrapper>
    </Frame>
  );
};

export default memo(Product);
