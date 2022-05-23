import { memo, useMemo, useState } from "react";
// import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import Typography from "../../center_components/Typography";
import FormWrapper from "../../center_components/FormWrapper";
import Info from "../../center_components/Info";
import IconSvg from "../../center_components/IconSvg";
import BaseImage from "../../center_components/BaseImage";
import { mockCategories, mockProduct } from "./data/defaultData";
import { useQuery } from "../../utils/useQuery";
import { useNavigate } from "react-router-dom";
import { Action, Box, SpaceContainer } from "../../style/common";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { Space } from "antd";
import Pagination from "../../center_components/Pagination";

const Category = () => {
  const navigate = useNavigate();
  const categoryId = useQuery("categoryId");
  const [isEdit, setIsEdit] = useState(false);
  const [current, setCurrent] = useState(1);

  const categoryData = useMemo(() => {
    return mockCategories?.find((category) => category?.key === categoryId);
  }, [categoryId]);

  const categoryName = useMemo(() => {
    return categoryData?.nameTH + "/" + categoryData?.nameEN;
  }, [categoryData?.nameEN, categoryData?.nameTH]);

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
        <FormWrapper>
          <SpaceContainer direction="vertical" size={15}>
            <SpaceContainer direction="vertical" size={30}>
              <Info label="สถานะ" value={categoryData?.status} />
              <Info label="ชื่อหมวดหมู่" value={categoryName} />
              <Info label="ลำดับหมวดหมู่" value={"#" + categoryData?.key} />
              <SpaceContainer direction="vertical" size={5}>
                <Info label="รายการสินค้า" value={`50 รายการ`} />
                {mockProduct.map((product, index) => (
                  <Box key={product.id} justify="space-between" align="center">
                    <Typography color="#4F4F4F" width="70%">
                      {index + 1 + ". " + product.name}
                    </Typography>
                    <Space size={25}>
                      <BaseImage src={product.image} width={45} height={45} />
                      {isEdit && (
                        <Action justify="center" align="center">
                          <IconSvg
                            src={delete_icon}
                            fontSize={19}
                            heightable={false}
                          />
                        </Action>
                      )}
                    </Space>
                  </Box>
                ))}
              </SpaceContainer>
            </SpaceContainer>
            <Pagination current={current} total={20} onChange={setCurrent} />
          </SpaceContainer>
        </FormWrapper>
      </FormWrapper>
    </Frame>
  );
};

export default memo(Category);
