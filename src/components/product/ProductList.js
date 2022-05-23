import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import FilterProduct from "./FilterProduct";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { Space } from "antd";
import { Action } from "../../style/common";
import { useNavigate } from "react-router-dom";

const Name = styled.div`
  text-align: left;
`;

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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

  const columns = useMemo(() => {
    return [
      {
        title: "ชื่อสินค้า",
        dataIndex: "name",
        width: "25%",
        render: (name) => <Name>{name}</Name>,
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
              onClick={() => console.log(record?.key)}
            >
              <IconSvg src={eye_icon} fontSize={18} />
            </Action>
            <Action
              justify="center"
              align="center"
              onClick={() => console.log(record?.key)}
            >
              <IconSvg src={delete_icon} fontSize={18} />
            </Action>
          </Space>
        ),
      },
    ];
  }, []);

  const dataSource = useMemo(() => {
    return [
      {
        key: "1",
        name: "กระเป๋ากระจูด จ.ระยอง คนพื้นเมืองทำเพื่อ คนเมือง",
        category: "กระเป๋า",
        price: 850,
        status: "พร้อมส่ง",
        updatedTime: "01/02/2022",
      },
      {
        key: "2",
        name: "หมอนอิง จ.กาญจนบุรี อิงของเก่าให้เข้า ยุคใหม่",
        category: "หมอน",
        price: 650,
        status: "พรีออเดอร์",
        updatedTime: "01/02/2022",
      },
      {
        key: "3",
        name: "OTOP SELECT หมวกแก๊ปผ้าไหมแท้​ทอมือ",
        category: "หมวก",
        price: 1500,
        status: "พรีออเดอร์",
        updatedTime: "01/02/2022",
      },
      {
        key: "4",
        name: "กระเป๋ากระจูด จ.ระยอง คนพื้นเมืองทำเพื่อ คนเมือง",
        category: "กระเป๋า",
        price: 850,
        status: "พร้อมส่ง",
        updatedTime: "01/02/2022",
      },
      {
        key: "5",
        name: "หมอนอิง จ.กาญจนบุรี อิงของเก่าให้เข้า ยุคใหม่",
        category: "หมอน",
        price: 650.0,
        status: "พรีออเดอร์",
        updatedTime: "01/02/2022",
      },
      {
        key: "6",
        name: "OTOP SELECT หมวกแก๊ปผ้าไหมแท้​ทอมือ",
        category: "หมวก",
        price: 1500.0,
        status: "พรีออเดอร์",
        updatedTime: "01/02/2022",
      },
    ];
  }, []);

  return (
    <Frame
      label="รายการสินค้า"
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
    >
      <FilterProduct
        search={filters.search}
        category={filters.category}
        status={filters.status}
        onFilters={onFilters}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        page={page}
        totalData={20}
        onChange={(e) => setPage(e.current)}
      />
    </Frame>
  );
};

export default memo(ProductList);
