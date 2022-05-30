import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import IconSvg from "../../center_components/IconSvg";
import BaseButton from "../../center_components/BaseButton";
import Table from "../../center_components/Table";
import FilterProduct from "../product/FilterProduct";
import { ReactComponent as close_icon } from "../../assets/icons/close.svg";
import { Modal, Space } from "antd";
import { mockProduct } from "../product/data/defaultData";

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

const Name = styled.div`
  text-align: left;
`;

const ModalProductList = ({ visible, onCancel, onOk }) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "1",
    status: "1",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
        width: "30%",
        render: (name) => <Name>{name}</Name>,
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
      <FilterProduct
        search={filters.search}
        category={filters.category}
        status={filters.status}
        onFilters={onFilters}
      />
      <Table
        columns={columns}
        dataSource={mockProduct}
        page={page}
        rowSelection={rowSelection}
        totalData={20}
        onChange={(e) => setPage(e.current)}
      />
    </ModalContainer>
  );
};

export default memo(ModalProductList);
