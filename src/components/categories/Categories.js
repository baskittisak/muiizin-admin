import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import FilterCategories from "./FilterCategories";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import ErrorPage from "../../center_components/ErrorPage";
import ModalCategories from "./ModalCategories";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { ReactComponent as drag_icon } from "../../assets/icons/drag.svg";
import { Space } from "antd";
import { Action, Box } from "../../style/common";
import { SortableHandle } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";
import { getFormatDate } from "../../utils/utils";
import { useDebounce } from "use-debounce";
import useSWR from "swr";

const DragHandle = SortableHandle(() => (
  <IconSvg src={drag_icon} fontSize={18} onClick={() => null} />
));

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
`;

const Categories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [name, setName] = useState({ th: "", en: "" });
  const [dataSource, setDataSource] = useState([]);

  const [searchValue] = useDebounce(search, 500);
  const apiCategories = useMemo(() => {
    return `/data/list/category?search=${searchValue}`;
  }, [searchValue]);

  const { data: categories, error } = useSWR(apiCategories);

  useEffect(() => {
    categories && setDataSource([...categories]);
  }, [categories]);

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
        title: "ลำดับ",
        dataIndex: "sequence",
        width: "5%",
      },
      {
        title: "ชื่อภาษาไทย",
        dataIndex: "nameTH",
        width: "25%",
      },
      {
        title: "ชื่อภาษาอังกฤษ",
        dataIndex: "nameEN",
        width: "25%",
      },
      {
        title: "จำนวนสินค้า",
        dataIndex: "stock",
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
        render: (_, record) =>
          sortable ? (
            <DragHandle />
          ) : (
            <Space size={25}>
              <Action
                justify="center"
                align="center"
                onClick={() => navigate(`/category?categoryId=${record?.id}`)}
              >
                <IconSvg src={eye_icon} fontSize={18} />
              </Action>
              <Action
                justify="center"
                align="center"
                onClick={() => console.log(record?.id)}
              >
                <IconSvg src={delete_icon} fontSize={18} />
              </Action>
            </Space>
          ),
      },
    ];
  }, [sortable, navigate]);

  const displayProductList = useMemo(
    () => (
      <Frame
        loading={!categories}
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
        <FilterCategories search={search} setSearch={setSearch} />
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          sortable={sortable}
          setDataSource={setDataSource}
        />
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
    [categories, columns, dataSource, search, sortable]
  );

  if (error) return <ErrorPage message={error?.response?.data} />;

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
