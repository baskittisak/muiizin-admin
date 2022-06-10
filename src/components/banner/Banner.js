import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import Input from "../../center_components/form/Input";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import UploadImage from "../../center_components/UploadImage";
import Datepicker from "../../center_components/form/Datepicker";
import IconSvg from "../../center_components/IconSvg";
import BaseButton from "../../center_components/BaseButton";
import ModalProductList from "./ModalProductList";
import BaseImage from "../../center_components/BaseImage";
import Typography from "../../center_components/Typography";
import ErrorPage from "../../center_components/ErrorPage";
import { Action, Box, SpaceContainer } from "../../style/common";
import { Col, Row, Space } from "antd";
import { ReactComponent as check_icon } from "../../assets/icons/check.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { defaultBannerData } from "./data/defaultData";
import { useQuery } from "../../utils/useQuery";
import { getNotification } from "../../center_components/Notification";
import useSWR from "swr";

const CheckboxContainer = styled(Space)`
  cursor: pointer;
`;

const Checkbox = styled(Box)`
  width: 14px;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 2px;

  ${({ active }) =>
    active &&
    css`
      background-color: #044700;
    `};
`;

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const Banner = () => {
  const navigate = useNavigate();
  const bannerId = useQuery("bannerId");
  const [language, setLanguage] = useState("th");
  const [banner, setBanner] = useState(defaultBannerData);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiBanner = useMemo(() => {
    return bannerId && `/data/banner/${bannerId}`;
  }, [bannerId]);

  const isProduct = useMemo(() => {
    return banner.isProduct && banner.products.length !== 0;
  }, [banner.isProduct, banner.products]);

  const apiProducts = useMemo(() => {
    const productIds = banner.products.map(
      (product) => product?.productId || product
    );
    return isProduct && `/data/list/product?productIds=${productIds}`;
  }, [isProduct, banner.products]);

  const { data: bannerData, error } = useSWR(apiBanner);
  const { data: products, error: productsError } = useSWR(apiProducts);

  useEffect(() => {
    bannerData && setBanner({ ...bannerData });
  }, [bannerData]);

  useEffect(() => {
    if (isProduct && products) {
      const productList = products?.data?.map((product) => ({
        productId: +product?.key,
        name: product?.name,
        image: product?.image,
      }));
      setBanner((prevState) => ({
        ...prevState,
        products: productList,
      }));
    }
  }, [bannerId, isProduct, products]);

  const onSetBanner = useCallback((type, value, subType) => {
    setBanner((prevState) => {
      const newData = { ...prevState };
      if (subType) {
        newData[type][subType] = value;
      } else {
        newData[type] = value;
      }
      return newData;
    });
  }, []);

  const onSave = useCallback(async () => {
    setLoading(true);
    const { default: axios } = await import("axios");
    try {
      const payload = {
        ...banner,
        updatedTime: Date.now(),
      };
      const { data } = await axios.post("/create/banner", payload);
      const newBannerId = data?.bannerId;
      if (banner.isProduct) {
        const productIds = banner.products.map(
          (product) => product?.productId || product
        );
        const payloadProduct = {
          bannerId: newBannerId,
          productIds,
        };
        await axios.post("/create/banner/product", payloadProduct);
      }
      setLoading(false);
      getNotification({
        type: "success",
        message: "สร้างแบนเนอร์สำเร็จ",
      });
      setBanner({ ...defaultBannerData });
      navigate(`/banner-info?bannerId=${newBannerId}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      getNotification({
        type: "error",
        message: "เกิดข้อผิดพลาด",
      });
    }
  }, [banner, navigate]);

  const onDeleteProduct = useCallback(async (bannerProductId) => {
    const { default: axios } = await import("axios");
    try {
      await axios.put("/delete/product/banner", { bannerProductId });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onDelete = useCallback(
    (productId) => {
      setBanner((prevState) => {
        const newProduct = [...prevState.products];
        const bannerProductId = bannerData?.products?.find(
          (product) => product?.productId === productId
        )?.bannerProductId;
        bannerId && bannerProductId && onDeleteProduct(bannerProductId);
        const productDeleted = newProduct.filter(
          (product) => product?.productId !== productId
        );
        return { ...prevState, products: productDeleted };
      });
    },
    [bannerId, bannerData?.products, onDeleteProduct]
  );

  const isDisabled = useMemo(() => {
    return (
      !banner.name ||
      banner.image.en.length === 0 ||
      banner.image.th.length === 0 ||
      !banner.date.start ||
      !banner.date.end ||
      (banner.isProduct && banner.products.length === 0)
    );
  }, [
    banner.date.end,
    banner.date.start,
    banner.image.en.length,
    banner.image.th.length,
    banner.isProduct,
    banner.name,
    banner.products.length,
  ]);

  const isLoading = useMemo(() => {
    return (bannerId && !bannerData) || (isProduct && !products) || loading;
  }, [isProduct, bannerData, bannerId, loading, products]);

  if (error || productsError) {
    return (
      <ErrorPage
        message={error?.response?.data || productsError?.response?.data}
      />
    );
  }

  return (
    <Frame
      loading={isLoading}
      label="เพิ่มแบนเนอร์"
      onBack={() => navigate("/banner-list")}
    >
      <FormWrapper>
        <FormWrapper>
          <SpaceContainer direction="vertical" size={30}>
            <Input
              label="ชื่อแบนเนอร์"
              maxLength={50}
              isRequired
              value={banner?.name}
              onChange={(value) => onSetBanner("name", value)}
            />
            <TabsLanguage onChange={setLanguage}>
              <UploadImage
                type="banner"
                label={`รูปภาพแบนเนอร์ภาษา${
                  language === "th" ? "ไทย" : "อังกฤษ"
                }`}
                isRequired
                maximum={1}
                imageList={banner.image[language]}
                setImageList={(images) =>
                  onSetBanner("image", images, language)
                }
                onDeleteImage={() => onSetBanner("image", [], language)}
              />
            </TabsLanguage>
            <Row gutter={[20, 0]}>
              <Col span={12}>
                <Datepicker
                  label="วันที่เริ่มใช้งาน"
                  isRequired
                  startDate={banner.date.start}
                  endDate={banner.date.end}
                  onChange={(date) => onSetBanner("date", date, "start")}
                />
              </Col>
              <Col span={12}>
                <Datepicker
                  label="วันที่สิ้นสุด"
                  isRequired
                  isStart={false}
                  startDate={banner.date.start}
                  endDate={banner.date.end}
                  onChange={(date) => onSetBanner("date", date, "end")}
                />
              </Col>
            </Row>
            <CheckboxContainer
              size={10}
              onClick={() => onSetBanner("isProduct", !banner.isProduct)}
            >
              <Checkbox
                justify="center"
                align="center"
                active={banner.isProduct}
              >
                {banner.isProduct && (
                  <IconSvg src={check_icon} fontSize={10} heightable={false} />
                )}
              </Checkbox>
              <Typography fontSize={18} lineHeight={20} color="#4F4F4F">
                ต้องการแสดงสินค้า
              </Typography>
            </CheckboxContainer>
            {banner.isProduct && (
              <BaseButton
                bgColor="#D9E3D9"
                color="#044700"
                width="100%"
                onClick={() => setVisible(true)}
              >
                เลือกสินค้า
              </BaseButton>
            )}
            {isProduct &&
              banner.products?.map((product, index) => (
                <Box
                  key={product?.bannerProductId || index}
                  justify="space-between"
                  align="center"
                >
                  <Typography color="#4F4F4F" width="70%">
                    {index + 1 + ". " + product?.name}
                  </Typography>
                  <Space size={25}>
                    <BaseImage src={product?.image} width={45} height={45} />
                    <Action
                      justify="center"
                      align="center"
                      onClick={() => onDelete(product?.productId)}
                    >
                      <IconSvg
                        src={delete_icon}
                        fontSize={19}
                        heightable={false}
                      />
                    </Action>
                  </Space>
                </Box>
              ))}
          </SpaceContainer>
        </FormWrapper>
      </FormWrapper>
      <Footer justify="center" align="center">
        <BaseButton
          width="90px"
          bgColor="#044700"
          color="#fff"
          disabled={isDisabled}
          onClick={onSave}
        >
          ยืนยัน
        </BaseButton>
      </Footer>
      <ModalProductList
        visible={visible}
        products={banner.products}
        onCancel={() => setVisible(false)}
        onOk={(products) => onSetBanner("products", products)}
      />
    </Frame>
  );
};

export default memo(Banner);
