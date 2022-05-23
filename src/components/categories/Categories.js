import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import FilterCategories from "./FilterCategories";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { ReactComponent as drag_icon } from "../../assets/icons/drag.svg";
import { Space } from "antd";
import { Action, Box } from "../../style/common";
import ModalCategories from "./ModalCategories";

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
`;

const Categories = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "1",
  });
  const [visible, setVisible] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [name, setName] = useState({ th: "", en: "" });

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSetName = useCallback((value, language) => {
    setName((prevState) => ({
      ...prevState,
      [language]: value,
    }));
  }, []);

  const onSave = useCallback(() => {
    console.log(name.th);
    console.log(name.en);
    onSetName("", "th");
    onSetName("", "en");
    setVisible(false);
  }, [name.en, name.th, onSetName]);

  const columns = useMemo(() => {
    return [
      {
        title: "ชื่อภาษาไทย",
        dataIndex: "nameTH",
        width: "20%",
      },
      {
        title: "ชื่อภาษาอังกฤษ",
        dataIndex: "nameEN",
        width: "20%",
      },
      {
        title: "จำนวนสินค้า",
        dataIndex: "stock",
        width: "15%",
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        width: "15%",
      },
      {
        title: "วันที่สร้าง",
        dataIndex: "createdTime",
        width: "15%",
      },
      {
        title: "",
        dataIndex: "action",
        width: "15%",
        render: (_, record) =>
          sortable ? (
            <IconSvg src={drag_icon} fontSize={18} />
          ) : (
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
  }, [sortable]);

  const dataSource = useMemo(() => {
    return [
      {
        key: "1",
        nameTH: "กระเป๋า",
        nameEN: "Bags",
        stock: 50,
        status: "ใช้งาน",
        createdTime: "01/02/2022",
      },
      {
        key: "2",
        nameTH: "หมวก",
        nameEN: "Hats",
        stock: 50,
        status: "ใช้งาน",
        createdTime: "01/02/2022",
      },
      {
        key: "3",
        nameTH: "เสื้อผ้า",
        nameEN: "Clothing",
        stock: 50,
        status: "ใช้งาน",
        createdTime: "01/02/2022",
      },
      {
        key: "4",
        nameTH: "ผ้า",
        nameEN: "Fabric",
        stock: 50,
        status: "ใช้งาน",
        createdTime: "01/02/2022",
      },
      {
        key: "5",
        nameTH: "เครื่องประดับ",
        nameEN: "Jewelry",
        stock: 50,
        status: "ใช้งาน",
        createdTime: "01/02/2022",
      },
      {
        key: "6",
        nameTH: "ของฝาก",
        nameEN: "Accessory Gifts",
        stock: 50,
        status: "ปิดชั่วคราว",
        createdTime: "01/02/2022",
      },
    ];
  }, []);

  const displayProductList = useMemo(
    () => (
      <Frame
        label={sortable ? "จัดเรียงหมวดหมู่" : "หมวดหมู่สินค้า"}
        extra={
          !sortable && (
            <Space size={20}>
              <BaseButton
                bgColor="#D9E3D9"
                color="#044700"
                onClick={() => setSortable(true)}
              >
                จัดเรียงหมวดหมู่
              </BaseButton>
              <BaseButton
                bgColor="#044700"
                color="#fff"
                onClick={() => setVisible(true)}
              >
                เพิ่มหมวดหมู่
              </BaseButton>
            </Space>
          )
        }
        onBack={sortable ? () => setSortable(false) : undefined}
      >
        <FilterCategories
          search={filters.search}
          status={filters.status}
          onFilters={onFilters}
        />
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        {sortable && (
          <Footer justify="center" align="center">
            <BaseButton
              bgColor="#044700"
              color="#fff"
              onClick={() => setSortable(false)}
            >
              บันทึก
            </BaseButton>
          </Footer>
        )}
      </Frame>
    ),
    [columns, dataSource, filters.search, filters.status, sortable, onFilters]
  );

  return (
    <>
      {displayProductList}
      <ModalCategories
        visible={visible}
        value={name}
        onChange={onSetName}
        onCancel={() => setVisible(false)}
        onOk={onSave}
      />
    </>
  );
};

export default memo(Categories);
