import { memo, useCallback, useMemo } from "react";
import Search from "../../center_components/filter/Search";
import Dropdown from "../../center_components/filter/Dropdown";
import BaseButton from "../../center_components/BaseButton";
import { Empty, Skeleton, Space } from "antd";
import { Box } from "../../style/common";
import useSWR from "swr";

const FilterProduct = ({ search, category, status, onFilters }) => {
  const { data: categories, error: categoriesError } = useSWR(
    "/data/list/filter/category"
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
      {
        key: "4",
        label: "สินค้าหมด",
      },
    ],
    []
  );

  const isClear = useMemo(() => {
    return search || category !== "0" || status !== "1";
  }, [category, search, status]);

  const onClear = useCallback(() => {
    onFilters("search", "");
    onFilters("category", "0");
    onFilters("status", "1");
  }, [onFilters]);

  if (categoriesError) return <Empty />;
  if (!categories) return <Skeleton active />;

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
          menuItems={categories}
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
