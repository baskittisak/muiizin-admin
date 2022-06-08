import { memo, useCallback, useMemo } from "react";
import Search from "../../center_components/filter/Search";
import BaseButton from "../../center_components/BaseButton";
import { Space } from "antd";
import { Box } from "../../style/common";

const FilterCategories = ({ search, setSearch }) => {
  const isClear = useMemo(() => {
    return search !== "";
  }, [search]);

  const onClear = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <Box justify="space-between" align="flex-end">
      <Space size={25}>
        <Search
          label="ชื่อหมวดหมู่สินค้า"
          value={search}
          onChange={setSearch}
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
