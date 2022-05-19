import { memo, useCallback, useMemo, useState } from "react";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import Search from "../../center_components/filter/Search";
import Dropdown from "../../center_components/filter/Dropdown";
import { Space } from "antd";

const ProductList = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "1",
    status: "1",
  });

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const categoriesItems = useMemo(
    () => [
      {
        key: "1",
        label: "ทั้งหมด",
      },
      {
        key: "2",
        label: "2nd menu item",
      },
      {
        key: "3",
        label: "3rd menu item",
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
        label: "2nd menu item",
      },
      {
        key: "3",
        label: "3rd menu item",
      },
    ],
    []
  );

  return (
    <Frame
      label="รายการสินค้า"
      extra={
        <BaseButton bgColor="#044700" color="#FFFFFF" fontSize={16}>
          เพิ่มสินค้าใหม่
        </BaseButton>
      }
    >
      <Space size={25}>
        <Search
          label="ชื่อสินค้า"
          value={filters.search}
          onChange={(value) => onFilters("search", value)}
        />
        <Dropdown
          label="หมวดหมู่สินค้า"
          menuItems={categoriesItems}
          value={filters.category}
          onChange={(value) => onFilters("category", value)}
        />
        <Dropdown
          label="สถานะ"
          menuItems={statusItems}
          value={filters.status}
          onChange={(value) => onFilters("status", value)}
        />
      </Space>
    </Frame>
  );
};

export default memo(ProductList);
