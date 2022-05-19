import { memo } from "react";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import Search from "../../center_components/filter/Search";

const ProductList = () => {
  return (
    <Frame
      label="รายการสินค้า"
      extra={
        <BaseButton bgColor="#044700" color="#FFFFFF" fontSize={16}>
          เพิ่มสินค้าใหม่
        </BaseButton>
      }
    >
      <Search label="ชื่อสินค้า" onChange={(value) => console.log(value)} />
    </Frame>
  );
};

export default memo(ProductList);
