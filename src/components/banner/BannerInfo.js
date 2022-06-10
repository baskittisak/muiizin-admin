import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../center_components/BaseButton";
import BaseImage from "../../center_components/BaseImage";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import Info from "../../center_components/Info";
import Typography from "../../center_components/Typography";
import ErrorPage from "../../center_components/ErrorPage";
import { useQuery } from "../../utils/useQuery";
import { Box, SpaceContainer } from "../../style/common";
import { Space } from "antd";
import { getFormatDate } from "../../utils/utils";
import useSWR from "swr";

const ImageWrapper = styled.div`
  width: 100%;

  .ant-image {
    width: 100%;
  }
`;

const BannerInfo = () => {
  const navigate = useNavigate();
  const bannerId = useQuery("bannerId");
  const [language, setLanguage] = useState("th");

  const apiBanner = useMemo(() => {
    return bannerId && `/data/banner/${bannerId}`;
  }, [bannerId]);

  const { data: banner, error } = useSWR(apiBanner);

  const coloStatus = useMemo(() => {
    switch (banner?.status) {
      case "เตรียมใช้งาน":
        return "#3699ff";
      case "กำลังใช้งาน":
        return "#00a651";
      case "หมดอายุ":
        return "#828282";
      default:
        return "";
    }
  }, [banner?.status]);

  const bannerImage = useMemo(() => {
    return banner?.image?.[language]?.[0];
  }, [banner?.image, language]);

  if (error) return <ErrorPage message={error?.response?.data} />;

  return (
    <Frame
      label="ข้อมูลแบนเนอร์"
      loading={bannerId && !banner}
      onBack={() => navigate("/banner-list")}
      extra={
        <BaseButton
          bgColor="#D9E3D9"
          color="#044700"
          onClick={() => navigate(`/banner?bannerId=${bannerId}`)}
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
                  color={coloStatus}
                >
                  {banner?.status}
                </Typography>
              }
            />
            <Info label="ลำดับการแสดง" value={"#" + banner?.sequence} />
            <Info label="ชื่อแบนเนอร์" value={banner?.name} />
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
                <BaseImage src={bannerImage} height={180} objectFit="contain" />
              </ImageWrapper>
            </SpaceContainer>
            <Info
              label="วันที่เริ่มใช้งาน"
              value={getFormatDate(banner?.date?.start)}
            />
            <Info
              label="วันที่สิ้นสุด"
              value={getFormatDate(banner?.date?.end)}
            />
            {banner?.isProduct && (
              <SpaceContainer direction="vertical" size={16}>
                <Info
                  label="แสดงรายการสินค้า"
                  value={`${banner?.products?.length} รายการ`}
                />
                {banner?.products?.map((product, index) => (
                  <Box
                    key={product?.bannerProductId}
                    justify="space-between"
                    align="center"
                  >
                    <Typography color="#4F4F4F" width="70%">
                      {index + 1 + ". " + product?.name}
                    </Typography>
                    <BaseImage src={product?.image} width={45} height={45} />
                  </Box>
                ))}
              </SpaceContainer>
            )}
          </SpaceContainer>
        </FormWrapper>
      </FormWrapper>
    </Frame>
  );
};

export default memo(BannerInfo);
