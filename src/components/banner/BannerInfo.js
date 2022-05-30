import { memo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../center_components/BaseButton";
import BaseImage from "../../center_components/BaseImage";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import Info from "../../center_components/Info";
import Typography from "../../center_components/Typography";
import { Box, SpaceContainer } from "../../style/common";
import { Space } from "antd";
import { mockProduct } from "../product/data/defaultData";
import mock_banner_1 from "../../assets/image/mock_banner_1.png";

const ImageWrapper = styled.div`
  width: 100%;

  .ant-image {
    width: 100%;
  }
`;

const BannerInfo = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");

  return (
    <Frame
      label="ข้อมูลแบนเนอร์"
      onBack={() => navigate("/banner-list")}
      extra={
        <BaseButton
          bgColor="#D9E3D9"
          color="#044700"
          onClick={() => navigate("/banner?bannerId=?")}
        >
          แก้ไข
        </BaseButton>
      }
    >
      <FormWrapper>
        <FormWrapper>
          <SpaceContainer direction="vertical" size={30}>
            <Info
              label="สถานะ"
              value={
                <Typography
                  fontSize={18}
                  lineHeight={20}
                  fontWeight={700}
                  color="#3699FF"
                >
                  เตรียมใช้งาน
                </Typography>
              }
            />
            <Info label="ลำดับการแสดง" value="#4" />
            <Info label="ชื่อแบนเนอร์" value="Banner_5" />
            <Info label="สถานะ" value="เตรียมใช้งาน" />
            <SpaceContainer direction="vertical" size={10}>
              <Info
                label="รูปภาพแบนเนอร์"
                value={
                  <Space size={4}>
                    <Typography
                      fontSize={18}
                      lineHeight={20}
                      fontWeight={language === "th" ? 700 : 400}
                      color={language === "th" ? "#044700" : "#828282"}
                      onClick={() => setLanguage("th")}
                    >
                      TH
                    </Typography>
                    <Typography fontSize={18} lineHeight={20} color="#828282">
                      |
                    </Typography>
                    <Typography
                      fontSize={18}
                      lineHeight={20}
                      fontWeight={language === "en" ? 700 : 400}
                      color={language === "en" ? "#044700" : "#828282"}
                      onClick={() => setLanguage("en")}
                    >
                      EN
                    </Typography>
                  </Space>
                }
              />
              <ImageWrapper>
                <BaseImage src={mock_banner_1} height={180} />
              </ImageWrapper>
            </SpaceContainer>
            <Info label="วันที่เริ่มใช้งาน" value="01/03/2022" />
            <Info label="วันที่สิ้นสุด" value="31/03/2022" />
            <SpaceContainer direction="vertical" size={16}>
              <Info label="แสดงรายการสินค้า" value="4 รายการ" />
              {mockProduct.map((product, index) => (
                <Box key={product.key} justify="space-between" align="center">
                  <Typography color="#4F4F4F" width="70%">
                    {index + 1 + ". " + product.name}
                  </Typography>
                  <BaseImage src={product.image} width={45} height={45} />
                </Box>
              ))}
            </SpaceContainer>
          </SpaceContainer>
        </FormWrapper>
      </FormWrapper>
    </Frame>
  );
};

export default memo(BannerInfo);
