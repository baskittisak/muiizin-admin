import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import Typography from "../../center_components/Typography";
import IconSvg from "../../center_components/IconSvg";
import BaseImage from "../../center_components/BaseImage";
import Info from "../../center_components/Info";
import { Box, SpaceContainer } from "../../style/common";
import { Tabs } from "antd";
import { ReactComponent as checked_icon } from "../../assets/icons/checked.svg";
import { ReactComponent as edit_icon } from "../../assets/icons/edit.svg";

const { TabPane } = Tabs;

const Space = styled(SpaceContainer)`
  .ant-space-item {
    width: ${({ width }) => width || "100%"};
  }
`;

const TabsContaier = styled.div`
  margin: 30px 0 50px;

  .ant-tabs-top > .ant-tabs-nav,
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }

  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }

  .ant-tabs-tab {
    width: 100%;
    font-size: 24px;
    line-height: 26px;
    display: flex;
    justify-content: center;
  }

  .ant-tabs-tab-btn {
    color: #828282;
    transition: none;
  }

  .ant-tabs-tab:hover {
    color: #828282;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #8aa399;
    font-weight: 700;
    text-shadow: none;
  }

  .ant-tabs-ink-bar {
    background: #8aa399;
  }
`;

const Checked = styled(Box)`
  width: 14px;
  height: 14px;
  background-color: #d2ecdf;
  border-radius: 1px;
`;

const EditWrapper = styled(Box)`
  cursor: pointer;
  width: 28px;
  height: 28px;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
`;

const Color = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color};
  border-radius: 2px;
`;

const ImageWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
`;

const HTMLReader = styled.div`
  margin-top: 26px;
`;

const Title = memo(({ label, onEdit }) => (
  <Box justify="space-between">
    <Typography fontSize={24} lineHeight={26} fontWeight={700} color="#333333">
      {label}
    </Typography>
    <EditWrapper justify="center" align="center" onClick={onEdit}>
      <IconSvg src={edit_icon} fontSize={17} />
    </EditWrapper>
  </Box>
));

const ProductReview = ({
  productInfo,
  optionEnable,
  productOption,
  detailTH,
  detailEN,
  setCurrent,
}) => {
  const [language, setLanguage] = useState("th");

  const categoriesItems = useMemo(
    () => [
      {
        key: "1",
        name: {
          th: "กระเป๋า",
          en: "Bag",
        },
      },
      {
        key: "2",
        name: {
          th: "หมอน",
          en: "Pillow",
        },
      },
      {
        key: "3",
        name: {
          th: "หมวก",
          en: "Hat",
        },
      },
    ],
    []
  );

  const statusItems = useMemo(
    () => [
      {
        key: "1",
        name: {
          th: "พร้อมส่ง",
          en: "Ready to Ship",
        },
      },
      {
        key: "2",
        name: {
          th: "พรีออเดอร์",
          en: "Pre-order",
        },
      },
      {
        key: "3",
        name: {
          th: "สินค้าหมด",
          en: "Out of Stock",
        },
      },
    ],
    []
  );

  const category = useMemo(() => {
    const findCategory = categoriesItems.find(
      (category) => category.key === productInfo.category
    );
    return findCategory?.name[language];
  }, [categoriesItems, language, productInfo.category]);

  const status = useMemo(() => {
    const findStatus = statusItems.find(
      (status) => status.key === productInfo.status
    );
    return findStatus?.name[language];
  }, [statusItems, language, productInfo.status]);

  const optionSize = useMemo(() => {
    return productOption?.size;
  }, [productOption?.size]);

  const optionColor = useMemo(() => {
    return productOption?.color;
  }, [productOption?.color]);

  const isImage = useMemo(() => {
    return !optionSize && !optionColor;
  }, [optionColor, optionSize]);

  return (
    <>
      <Box justify="center">
        <Typography
          fontSize={24}
          lineHeight={26}
          fontWeight={700}
          color="#333333"
        >
          ตัวอย่างข้อมูลสินค้า
        </Typography>
      </Box>
      <TabsContaier>
        <Tabs defaultActiveKey={language} onChange={setLanguage}>
          <TabPane tab="ภาษาไทย" key="th" />
          <TabPane tab="ภาษาอังกฤษ" key="en" />
        </Tabs>
      </TabsContaier>
      <SpaceContainer direction="vertical" size={50}>
        <Space direction="vertical" size={26}>
          <Title label="ข้อมูลสินค้า" onEdit={() => setCurrent(0)} />
          <Space direction="vertical" size={16}>
            <Info label="ชื่อสินค้า" value={productInfo.name[language]} />
            <Info label="ผู้ผลิต" value={productInfo.owner[language]} />
            <Info label="หมวดหมู่สินค้า" value={category} />
            <Info label="ราคาสินค้า" value={productInfo.price} />
            <Info label="สถานะ" value={status} />
          </Space>
        </Space>
        <Space direction="vertical" size={26}>
          <Title label="ตัวเลือกและรูปภาพสินค้า" onEdit={() => setCurrent(1)} />
          {isImage && (
            <Space width="initial" size={10}>
              {productOption?.map((image, indexImg) => (
                <ImageWrapper key={indexImg} justify="center" align="center">
                  <BaseImage src={image} width={65} height={65} />
                </ImageWrapper>
              ))}
            </Space>
          )}
          {!isImage && (
            <Space direction="vertical" size={16}>
              {optionEnable && (
                <Space width="initial">
                  <Checked justify="center" align="center">
                    <IconSvg
                      src={checked_icon}
                      fontSize={10}
                      heightable={false}
                    />
                  </Checked>
                  <Typography
                    fontSize={18}
                    lineHeight={20}
                    fontWeight={700}
                    color="#4F4F4F"
                  >
                    เป็นสินค้าที่มีตัวเลือก
                  </Typography>
                </Space>
              )}
              {optionSize && (
                <Info label="ไซส์" value={optionSize?.length + " ตัวเลือก"} />
              )}
              {optionSize && (
                <Typography fontSize={18} lineHeight={20} color="#4F4F4F">
                  - {optionSize?.map((size) => size.name).join(", ")}
                </Typography>
              )}
              {optionColor && (
                <Info label="สี" value={optionColor?.length + " ตัวเลือก"} />
              )}
              {optionColor &&
                optionColor?.map((color, index) => (
                  <Space key={index} direction="vertical" size={16}>
                    <Space width="initial">
                      <Space size={5} width="initial">
                        <Typography
                          fontSize={18}
                          lineHeight={20}
                          color="#4F4F4F"
                        >
                          -
                        </Typography>
                        <Color color={color.code} />
                      </Space>
                      <Typography fontSize={18} lineHeight={20} color="#4F4F4F">
                        {color.name[language]}
                      </Typography>
                    </Space>
                    <Space width="initial" size={10}>
                      {color.images.map((image, indexImg) => (
                        <ImageWrapper
                          key={indexImg}
                          justify="center"
                          align="center"
                        >
                          <BaseImage src={image} width={65} height={65} />
                        </ImageWrapper>
                      ))}
                    </Space>
                  </Space>
                ))}
            </Space>
          )}
        </Space>
        <Space direction="vertical" size={0}>
          <Title label="รายละเอียดสินค้า" onEdit={() => setCurrent(2)} />
          <HTMLReader
            dangerouslySetInnerHTML={{
              __html: language === "th" ? detailTH : detailEN,
            }}
          />
        </Space>
      </SpaceContainer>
    </>
  );
};

export default memo(ProductReview);
