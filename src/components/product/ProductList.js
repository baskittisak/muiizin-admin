import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import ErrorPage from "../../center_components/ErrorPage";
import BaseImage from "../../center_components/BaseImage";
import Pagination from "../../center_components/Pagination";
import FilterProduct from "./FilterProduct";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { Space } from "antd";
import { Action } from "../../style/common";
import { useNavigate } from "react-router-dom";
import { getFormatDate } from "../../utils/utils";
import { useDebounce } from "use-debounce";
import { getNotification } from "../../center_components/Notification";
import { getModalConfirm } from "../../center_components/ModalConfirm";
import useSWR from "swr";

const Name = styled(Space)`
  text-align: left;
`;

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "0",
    status: "1",
  });
  const [loading, setLoading] = useState(false);

  const [search] = useDebounce(filters.search, 500);
  const apiProductList = useMemo(() => {
    const searchQuery = search ? `&search=${search}` : "";
    const isAllStatus = filters.status === "1";
    const status =
      filters.status === "2"
        ? "พร้อมส่ง"
        : filters.status === "3"
        ? "พรีออเดอร์"
        : "สินค้าหมด";
    const statusQuery = !isAllStatus ? `&status=${status}` : "";
    const category =
      filters.category !== "0" ? `&category=${filters.category}` : "";
    return `/data/list/product?page=${page}${searchQuery}${category}${statusQuery}`;
  }, [filters.category, filters.status, page, search]);

  const { data: productList, error, mutate } = useSWR(apiProductList);

  useEffect(() => {
    if (filters.search || filters.category !== "0" || filters.status !== "1") {
      setPage(1);
    }
  }, [filters.category, filters.search, filters.status]);

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onDelete = useCallback(
    async (productId) => {
      setLoading(true);
      const { default: axios } = await import("axios");
      try {
        await axios.put("/delete/product", { productId });
        setPage(1);
        await mutate();
        setLoading(false);
        getNotification({
          type: "success",
          message: "ลบสินค้าสำเร็จ",
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
        getNotification({
          type: "error",
          message: "เกิดข้อผิดพลาด",
        });
      }
    },
    [mutate]
  );

  const isEmpty = useMemo(() => {
    return productList?.total === 0;
  }, [productList?.total]);

  const columns = useMemo(() => {
    return [
      {
        title: "ชื่อสินค้า",
        dataIndex: "name",
        width: "25%",
        render: (name, record) => (
          <Name size={16}>
            <BaseImage src={record?.image} width={45} height={45} />
            {name}
          </Name>
        ),
      },
      {
        title: "หมวดหมู่สินค้า",
        dataIndex: "category",
        width: "15%",
      },
      {
        title: "ราคา",
        dataIndex: "price",
        width: "15%",
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        width: "15%",
      },
      {
        title: "วันที่อัปเดต",
        dataIndex: "updatedTime",
        width: "15%",
        render: (date) => getFormatDate(date),
      },
      {
        title: "",
        dataIndex: "action",
        width: "15%",
        render: (_, record) => (
          <Space size={25}>
            <Action
              justify="center"
              align="center"
              onClick={() => navigate(`/product?productId=${record?.key}`)}
            >
              <IconSvg src={eye_icon} fontSize={18} />
            </Action>
            <Action
              justify="center"
              align="center"
              onClick={() =>
                getModalConfirm({
                  message: "คุณต้องการจะลบสินค้านี้ใช่หรือไม่?",
                  onConfirm: () => onDelete(record?.key),
                })
              }
            >
              <IconSvg src={delete_icon} fontSize={18} />
            </Action>
          </Space>
        ),
      },
    ];
  }, [navigate, onDelete]);

  if (error) return <ErrorPage message={error?.response?.data} />;

  return (
    <Frame
      label="รายการสินค้า"
      loading={!productList || loading}
      extra={
        <BaseButton
          bgColor="#044700"
          color="#FFFFFF"
          fontSize={16}
          onClick={() => navigate("/product")}
        >
          เพิ่มสินค้าใหม่
        </BaseButton>
      }
      footer={
        !isEmpty && (
          <Pagination
            current={page}
            total={productList?.total}
            onChange={setPage}
          />
        )
      }
      footerAlign="flex-start"
    >
      <FilterProduct
        search={filters.search}
        category={filters.category}
        status={filters.status}
        onFilters={onFilters}
      />
      <Table
        columns={columns}
        dataSource={productList?.data}
        pagination={false}
        emptyText="ไม่พบสินค้า"
      />
    </Frame>
  );
};

export default memo(ProductList);
