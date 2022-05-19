import { memo, useCallback, useState } from "react";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import FilterProduct from "./FilterProduct";

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

  return (
    <Frame
      label="รายการสินค้า"
      extra={
        <BaseButton bgColor="#044700" color="#FFFFFF" fontSize={16}>
          เพิ่มสินค้าใหม่
        </BaseButton>
      }
    >
      <FilterProduct
        search={filters.search}
        category={filters.category}
        status={filters.status}
        onFilters={onFilters}
      />
    </Frame>
  );
};

export default memo(ProductList);
