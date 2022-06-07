import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import IconSvg from "../../center_components/IconSvg";
import BaseButton from "../../center_components/BaseButton";
import Table from "../../center_components/Table";
import BaseImage from "../../center_components/BaseImage";
import FilterProduct from "../product/FilterProduct";
import { ReactComponent as close_icon } from "../../assets/icons/close.svg";
import { Empty, Modal, Space } from "antd";
import { Loading } from "../../style/common";
import { useDebounce } from "use-debounce";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR from "swr";

const ModalContainer = styled(Modal)`
  width: 650px !important;

  .ant-modal-content {
    width: 900px;
  }

  .ant-modal-title {
    color: #333333;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }

  .ant-modal-header,
  .ant-modal-footer {
    padding: 22px 32px;
  }

  .ant-modal-close {
    top: 8px;
    right: 32px;
  }

  .ant-modal-close-x {
    width: 18px;
    height: 18px;
  }
`;

const Name = styled(Space)`
  text-align: left;
`;

const ModalProductList = ({ visible, onCancel, onOk }) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "0",
    status: "1",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const { data: productList, error } = useSWR(apiProductList);

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSelect = useCallback(() => {
    onOk(selectedRowKeys);
    onCancel();
  }, [selectedRowKeys, onOk, onCancel]);

  const totalSelected = useMemo(() => {
    return selectedRowKeys.length;
  }, [selectedRowKeys.length]);

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: setSelectedRowKeys,
    }),
    [selectedRowKeys]
  );

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
        width: "20%",
      },
      {
        title: "ราคา",
        dataIndex: "price",
        width: "20%",
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
      },
    ];
  }, []);

  return (
    <ModalContainer
      title="เลือกสินค้า"
      closeIcon={<IconSvg src={close_icon} />}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Space size={16}>
          <BaseButton
            width="95px"
            bgColor="#F2F2F2"
            color="#4F4F4F"
            onClick={onCancel}
          >
            ยกเลิก
          </BaseButton>
          <BaseButton
            width="95px"
            bgColor="#044700"
            color="#fff"
            disabled={totalSelected === 0}
            onClick={onSelect}
          >
            เลือก {totalSelected ? `(${totalSelected})` : ""}
          </BaseButton>
        </Space>
      }
    >
      {error && <Empty />}
      {!error && (
        <Loading spinning={!productList} indicator={<LoadingOutlined spin />}>
          <FilterProduct
            search={filters.search}
            category={filters.category}
            status={filters.status}
            onFilters={onFilters}
          />
          <Table
            columns={columns}
            dataSource={productList?.data}
            page={page}
            totalData={productList?.total}
            rowSelection={rowSelection}
            onChange={(e) => setPage(e.current)}
          />
        </Loading>
      )}
    </ModalContainer>
  );
};

export default memo(ModalProductList);
