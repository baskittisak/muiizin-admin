import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import Typography from "../../center_components/Typography";
import FormWrapper from "../../center_components/FormWrapper";
import Info from "../../center_components/Info";
import IconSvg from "../../center_components/IconSvg";
import BaseImage from "../../center_components/BaseImage";
import Pagination from "../../center_components/Pagination";
import Toggle from "../../center_components/Toggle";
import Search from "../../center_components/filter/Search";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import Input from "../../center_components/form/Input";
import { mockCategories, mockProduct } from "./data/defaultData";
import { useQuery } from "../../utils/useQuery";
import { useNavigate } from "react-router-dom";
import { Action, Box, SpaceContainer } from "../../style/common";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { Space } from "antd";

const Footer = styled(Box)`
  height: 80px;
  margin-top: 50px;
  padding-top: 24px;
  border-top: 1px solid #d9e3d9;
`;

const SearchWrapper = styled.div`
  margin-top: -20px;
`;

const Category = () => {
  const navigate = useNavigate();
  const categoryId = useQuery("categoryId");
  const [isEdit, setIsEdit] = useState(false);
  const [current, setCurrent] = useState(1);
  const [language, setLanguage] = useState("th");
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    setCategoryData(() =>
      mockCategories?.find((category) => category?.key === categoryId)
    );
  }, [categoryId]);

  const onSetCategoryData = useCallback((type, value) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const categoryName = useMemo(() => {
    const category = mockCategories?.find(
      (category) => category?.key === categoryId
    );
    return category?.nameTH + "/" + category?.nameEN;
  }, [categoryId]);

  const isTH = useMemo(() => {
    return language === "th";
  }, [language]);

  const status = useMemo(
    () => (
      <Info
        label="สถานะ"
        value={
          isEdit ? (
            <Toggle
              checked={categoryData?.status === "ใช้งาน"}
              onChange={(checked) =>
                onSetCategoryData("status", checked ? "ใช้งาน" : "ปิดใช้งาน")
              }
            />
          ) : (
            categoryData?.status
          )
        }
      />
    ),
    [isEdit, categoryData?.status, onSetCategoryData]
  );

  const displayName = useMemo(
    () =>
      isEdit ? (
        <TabsLanguage onChange={setLanguage}>
          <Input
            label={`ชื่อหมวดหมู่ภาษา${isTH ? "ไทย" : "อังกฤษ"}`}
            value={isTH ? categoryData?.nameTH : categoryData?.nameEN}
            isRequired
            maxLength={50}
            onChange={(value) =>
              onSetCategoryData(isTH ? "nameTH" : "nameEN", value)
            }
          />
        </TabsLanguage>
      ) : (
        <Info label="ชื่อหมวดหมู่" value={categoryName} />
      ),
    [
      isTH,
      categoryData?.nameTH,
      categoryData?.nameEN,
      categoryName,
      isEdit,
      onSetCategoryData,
    ]
  );

  const productList = useMemo(
    () => (
      <SpaceContainer direction="vertical" size={5}>
        <Info label="รายการสินค้า" value={`50 รายการ`} />
        {isEdit && (
          <SearchWrapper>
            <Search width="100%" placeholder="ค้นหารายการสินค้า" />
          </SearchWrapper>
        )}
        {mockProduct.map((product, index) => (
          <Box key={product.id} justify="space-between" align="center">
            <Typography color="#4F4F4F" width="70%">
              {index + 1 + ". " + product.name}
            </Typography>
            <Space size={25}>
              <BaseImage src={product.image} width={45} height={45} />
              {isEdit && (
                <Action justify="center" align="center">
                  <IconSvg src={delete_icon} fontSize={19} heightable={false} />
                </Action>
              )}
            </Space>
          </Box>
        ))}
      </SpaceContainer>
    ),
    [isEdit]
  );

  const displayCategory = useMemo(
    () => (
      <SpaceContainer direction="vertical" size={15}>
        <SpaceContainer direction="vertical" size={30}>
          {status}
          {displayName}
          {!isEdit && (
            <Info label="ลำดับหมวดหมู่" value={"#" + categoryData?.key} />
          )}
          {productList}
        </SpaceContainer>
        <Pagination current={current} total={20} onChange={setCurrent} />
      </SpaceContainer>
    ),
    [categoryData?.key, status, productList, displayName, current, isEdit]
  );

  const displayButton = useMemo(
    () =>
      isEdit && (
        <Footer justify="center" align="center">
          <Space size={50}>
            <BaseButton
              width="95px"
              bgColor="#F2F2F2"
              color="#4F4F4F"
              onClick={() => setIsEdit(false)}
            >
              ยกเลิก
            </BaseButton>
            <BaseButton
              width="95px"
              bgColor="#044700"
              color="#fff"
              onClick={() => setIsEdit(false)}
            >
              บันทึก
            </BaseButton>
          </Space>
        </Footer>
      ),
    [isEdit]
  );

  return (
    <Frame
      label={categoryName}
      onBack={!isEdit ? () => navigate("/categories") : undefined}
      extra={
        !isEdit && (
          <BaseButton
            width="90px"
            bgColor="#D9E3D9"
            color="#044700"
            onClick={() => setIsEdit(true)}
          >
            แก้ไข
          </BaseButton>
        )
      }
    >
      <FormWrapper>
        <FormWrapper>{displayCategory}</FormWrapper>
      </FormWrapper>
      {displayButton}
    </Frame>
  );
};

export default memo(Category);
