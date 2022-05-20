import { memo, useMemo } from "react";
import styled from "styled-components";
import Dropdown from "../../center_components/form/Dropdown";
import Input from "../../center_components/form/Input";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import { Space } from "antd";

const SpaceContainer = styled(Space)`
  width: 100%;
`;

const ProductInfo = () => {
  const categoriesItems = useMemo(
    () => [
      {
        key: "1",
        label: "ทั้งหมด",
      },
      {
        key: "2",
        label: "กระเป๋า",
      },
      {
        key: "3",
        label: "หมอน",
      },
      {
        key: "4",
        label: "หมวก",
      },
    ],
    []
  );

  const statusItems = useMemo(
    () => [
      {
        key: "1",
        label: "ทั้งหมด",
      },
      {
        key: "2",
        label: "พร้อมส่ง",
      },
      {
        key: "3",
        label: "พรีออเดอร์",
      },
    ],
    []
  );

  return (
    <SpaceContainer direction="vertical" size={30}>
      <TabsLanguage onChange={(key) => console.log(key)}>
        <Input label="ชื่อสินค้าภาษาไทย" isRequired maxLength={150} />
      </TabsLanguage>
      <TabsLanguage onChange={(key) => console.log(key)}>
        <Input label="ชื่อผู้ผลิตภาษาไทย" isRequired maxLength={100} />
      </TabsLanguage>
      <Dropdown
        label="หมวดหมู่สินค้า"
        menuItems={categoriesItems}
        placeholder="กรุณาเลือกหมวดหมู่สินค้า"
        isRequired
      />
      <Input
        type="number"
        label="ราคาสินค้า"
        placeholder="0"
        suffix="THB"
        isRequired
      />
      <Dropdown
        label="สถานะสินค้า"
        menuItems={statusItems}
        placeholder="กรุณาเลือกสถานะ"
        isRequired
      />
    </SpaceContainer>
  );
};

export default memo(ProductInfo);
