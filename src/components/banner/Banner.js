import { memo, useCallback, useMemo, useState } from "react";
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
import { Action, Box, SpaceContainer } from "../../style/common";
import { Col, Row, Space } from "antd";
import { ReactComponent as check_icon } from "../../assets/icons/check.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { defaultBannerData } from "./data/defaultData";
import { mockProduct } from "../product/data/defaultData";

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
  const [language, setLanguage] = useState("th");
  const [banner, setBanner] = useState(defaultBannerData);
  const [visible, setVisible] = useState(false);

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

  return (
    <Frame label="เพิ่มแบนเนอร์" onBack={() => navigate("/banner-list")}>
      <FormWrapper>
        <FormWrapper>
          <SpaceContainer direction="vertical" size={30}>
            <Input
              label="ชื่อแบนเนอร์"
              maxLength={50}
              isRequired
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
            {banner.isProduct &&
              banner.products.length !== 0 &&
              mockProduct.map((product, index) => (
                <Box key={product.key} justify="space-between" align="center">
                  <Typography color="#4F4F4F" width="70%">
                    {index + 1 + ". " + product.name}
                  </Typography>
                  <Space size={25}>
                    <BaseImage src={product.image} width={45} height={45} />
                    <Action justify="center" align="center">
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
          onClick={() => navigate("/banner-info")}
        >
          ยืนยัน
        </BaseButton>
      </Footer>
      <ModalProductList
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(products) => onSetBanner("products", products)}
      />
    </Frame>
  );
};

export default memo(Banner);
