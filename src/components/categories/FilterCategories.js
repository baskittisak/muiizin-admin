import { memo, useCallback, useMemo } from "react";
import Search from "../../center_components/filter/Search";
import Dropdown from "../../center_components/filter/Dropdown";
import BaseButton from "../../center_components/BaseButton";
import { Space } from "antd";
import { Box } from "../../style/common";

const FilterCategories = ({ search, status, onFilters }) => {
  const statusItems = useMemo(
    () => [
      {
        key: "1",
        label: "ทั้งหมด",
      },
      {
        key: "2",
        label: "ใช้งาน",
      },
      {
        key: "3",
        label: "ปิดชั่วคราว",
      },
    ],
    []
  );

  const isClear = useMemo(() => {
    return search || status !== "1";
  }, [search, status]);

  const onClear = useCallback(() => {
    onFilters("search", "");
    onFilters("status", "1");
  }, [onFilters]);

  return (
    <Box justify="space-between" align="flex-end">
      <Space size={25}>
        <Search
          label="ชื่อหมวดหมู่สินค้า"
          value={search}
          onChange={(value) => onFilters("search", value)}
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

export default memo(FilterCategories);
