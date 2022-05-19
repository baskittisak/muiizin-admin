import { memo, useCallback, useMemo } from "react";
import Search from "../../center_components/filter/Search";
import Dropdown from "../../center_components/filter/Dropdown";
import BaseButton from "../../center_components/BaseButton";
import { Space } from "antd";
import { Box } from "../../style/common";

const FilterProduct = ({ search, category, status, onFilters }) => {
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

  const isClear = useMemo(() => {
    return search || category !== "1" || status !== "1";
  }, [category, search, status]);

  const onClear = useCallback(() => {
    onFilters("search", "");
    onFilters("category", "1");
    onFilters("status", "1");
  }, [onFilters]);

  return (
    <Box justify="space-between" align="flex-end">
      <Space size={25}>
        <Search
          label="ชื่อสินค้า"
          value={search}
          onChange={(value) => onFilters("search", value)}
        />
        <Dropdown
          label="หมวดหมู่สินค้า"
          menuItems={categoriesItems}
          value={category}
          onChange={(value) => onFilters("category", value)}
        />
        <Dropdown
          label="สถานะ"
          menuItems={statusItems}
          value={status}
          onChange={(value) => onFilters("status", value)}
        />
      </Space>
      {isClear && (
        <BaseButton bgColor="#D9E3D9" color="#044700" onClick={onClear}>
          ล้าง
        </BaseButton>
      )}
    </Box>
  );
};

export default memo(FilterProduct);
