import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import Typography from "../../center_components/Typography";
import FormWrapper from "../../center_components/FormWrapper";
import Info from "../../center_components/Info";
import BaseImage from "../../center_components/BaseImage";
import Pagination from "../../center_components/Pagination";
import Search from "../../center_components/filter/Search";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import Input from "../../center_components/form/Input";
import ErrorPage from "../../center_components/ErrorPage";
import { useQuery } from "../../utils/useQuery";
import { useNavigate } from "react-router-dom";
import { Box, SpaceContainer } from "../../style/common";
import { Space } from "antd";
import { useDebounce } from "use-debounce";
import { getNotification } from "../../center_components/Notification";
import useSWR from "swr";

const SearchWrapper = styled.div`
  margin-top: -20px;
`;

const Category = () => {
  const navigate = useNavigate();
  const categoryId = useQuery("categoryId");
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("th");
  const [categoryData, setCategoryData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const apiCategory = useMemo(() => {
    return categoryId && `/data/category/${categoryId}`;
  }, [categoryId]);

  const [search] = useDebounce(searchValue, 500);
  const apiProducts = useMemo(() => {
    return (
      categoryId &&
      `/data/list/product?page=${page}&search=${search}&category=${categoryId}`
    );
  }, [page, search, categoryId]);

  const { data: category, error: categoryError, mutate } = useSWR(apiCategory);
  const { data: products, error: productsError } = useSWR(apiProducts);

  useEffect(() => {
    category && setCategoryData(category);
  }, [category]);

  useEffect(() => {
    searchValue && setPage(1);
  }, [searchValue]);

  const onSetCategoryData = useCallback((type, value) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSave = useCallback(async () => {
    setLoading(true);
    const { default: axios } = await import("axios");
    try {
      const payload = {
        categoryId,
        nameEN: categoryData?.nameEN,
        nameTH: categoryData?.nameTH,
        sequence: categoryData?.sequence,
        updatedTime: Date.now(),
      };
      await axios.put("/edit/category", payload);
      await mutate();
      setLoading(false);
      setIsEdit(false);
      getNotification({
        type: "success",
        message: "แก้ไขหมวดหมู่สินค้าสำเร็จ",
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      getNotification({
        type: "error",
        message: "เกิดข้อผิดพลาด",
      });
    }
  }, [
    categoryData?.nameEN,
    categoryData?.nameTH,
    categoryData?.sequence,
    categoryId,
    mutate,
  ]);

  const categoryName = useMemo(() => {
    return isEdit
      ? "แก้ไขหมวดหมู่สินค้า"
      : categoryData?.nameTH + "/" + categoryData?.nameEN;
  }, [isEdit, categoryData?.nameEN, categoryData?.nameTH]);

  const isTH = useMemo(() => {
    return language === "th";
  }, [language]);

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
        <Info label="รายการสินค้า" value={`${categoryData?.stock} รายการ`} />
        {categoryData?.stock >= 1 && (
          <SearchWrapper>
            <Search
              width="100%"
              placeholder="ค้นหารายการสินค้า"
              value={searchValue}
              onChange={setSearchValue}
            />
          </SearchWrapper>
        )}
        {products?.data?.map((product, index) => (
          <Box key={product?.key} justify="space-between" align="center">
            <Typography color="#4F4F4F" width="70%">
              {index + 1 + ". " + product?.name}
            </Typography>
            <BaseImage src={product?.image} width={45} height={45} />
          </Box>
        ))}
      </SpaceContainer>
    ),
    [categoryData?.stock, products?.data, searchValue]
  );

  const displayCategory = useMemo(
    () => (
      <SpaceContainer direction="vertical" size={15}>
        <SpaceContainer direction="vertical" size={30}>
          {displayName}
          {!isEdit && (
            <Info label="ลำดับหมวดหมู่" value={"#" + categoryData?.sequence} />
          )}
          {(!isEdit || (isEdit && categoryData?.stock >= 1)) && productList}
        </SpaceContainer>
        {categoryData?.stock > 10 && (
          <Pagination
            current={page}
            total={categoryData?.stock}
            onChange={setPage}
          />
        )}
      </SpaceContainer>
    ),
    [
      categoryData?.sequence,
      categoryData?.stock,
      productList,
      displayName,
      page,
      isEdit,
    ]
  );

  const displayButton = useMemo(
    () =>
      isEdit && (
        <Space size={50}>
          <BaseButton
            width="95px"
            bgColor="#F2F2F2"
            color="#4F4F4F"
            disabled={loading}
            onClick={() => setIsEdit(false)}
          >
            ยกเลิก
          </BaseButton>
          <BaseButton
            width="95px"
            bgColor="#044700"
            color="#fff"
            loading={loading}
            onClick={onSave}
          >
            บันทึก
          </BaseButton>
        </Space>
      ),
    [isEdit, loading, onSave]
  );

  const isLoading = useMemo(() => {
    return categoryId && (!category || !products);
  }, [category, categoryId, products]);

  if (categoryError || productsError) {
    return (
      <ErrorPage
        message={categoryError?.response?.data || productsError?.response?.data}
      />
    );
  }

  return (
    <Frame
      label={categoryName}
      loading={isLoading}
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
      footer={displayButton}
      onBack={!isEdit ? () => navigate("/categories") : undefined}
    >
      <FormWrapper>
        <FormWrapper>{displayCategory}</FormWrapper>
      </FormWrapper>
    </Frame>
  );
};

export default memo(Category);
