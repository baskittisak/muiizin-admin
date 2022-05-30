import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import FilterBanner from "./FilterBanner";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import BaseImage from "../../center_components/BaseImage";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { ReactComponent as drag_icon } from "../../assets/icons/drag.svg";
import { Space } from "antd";
import { Action, Box } from "../../style/common";
import { mockBanner } from "./data/defaultData";
import { SortableHandle } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";

const DragHandle = SortableHandle(() => (
  <IconSvg src={drag_icon} fontSize={18} onClick={() => null} />
));

const Footer = styled(Box)`
  height: 80px;
  padding-top: 24px;
`;

const Status = styled(Box)`
  height: 30px;
  width: 80px;
  border-radius: 5px;

  ${({ status }) =>
    status === "เตรียมใช้งาน" &&
    css`
      background-color: #dbe7f3;
      color: #3699ff;
    `};

  ${({ status }) =>
    status === "กำลังใช้งาน" &&
    css`
      background-color: #d2ecdf;
      color: #00a651;
    `};

  ${({ status }) =>
    status === "หมดอายุ" &&
    css`
      background-color: #f2f2f2;
      color: #828282;
    `};
`;

const Categories = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    status: "1",
  });
  const [sortable, setSortable] = useState(false);
  const [dataSource, setDataSource] = useState(mockBanner);

  useEffect(() => {
    setDataSource((prevState) => {
      const newData = [...prevState];
      return newData.map((data, index) => ({
        ...data,
        index,
        sequence: index + 1,
      }));
    });
  }, []);

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: "ลำดับ",
        dataIndex: "sequence",
        width: "5%",
      },
      {
        title: "รูปภาพแบนเนอร์",
        dataIndex: "image",
        width: "25%",
        render: (image) => (
          <BaseImage src={image} width={200} height={80} objectFit="cover" />
        ),
      },
      {
        title: "ชื่อแบนเนอร์",
        dataIndex: "name",
        width: "20%",
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        width: "10%",
        render: (status) => (
          <Status justify="center" align="center" status={status}>
            {status}
          </Status>
        ),
      },
      {
        title: "วันที่เริ่มใช้งาน",
        dataIndex: "startDate",
        width: "10%",
      },
      {
        title: "วันที่สิ้นสุด",
        dataIndex: "endDate",
        width: "10%",
      },
      {
        title: "วันที่สร้าง",
        dataIndex: "createdTime",
        width: "10%",
      },
      {
        title: "",
        dataIndex: "action",
        width: "10%",
        render: (_, record) =>
          sortable ? (
            <DragHandle />
          ) : (
            <Space size={25}>
              <Action
                justify="center"
                align="center"
                onClick={() => navigate(`/banner?bannerId=${record?.key}`)}
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
  }, [sortable, navigate]);

  const displayProductList = useMemo(
    () => (
      <Frame
        label={sortable ? "จัดเรียงแบนเนอร์" : "แบนเนอร์"}
        extra={
          !sortable && (
            <Space size={20}>
              <BaseButton
                bgColor="#D9E3D9"
                color="#044700"
                onClick={() => setSortable(true)}
              >
                จัดเรียงแบนเนอร์
              </BaseButton>
              <BaseButton
                bgColor="#044700"
                color="#fff"
                onClick={() => navigate("/banner")}
              >
                เพิ่มแบนเนอร์
              </BaseButton>
            </Space>
          )
        }
        onBack={sortable ? () => setSortable(false) : undefined}
      >
        <FilterBanner
          search={filters.search}
          status={filters.status}
          onFilters={onFilters}
        />
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
    [
      columns,
      dataSource,
      filters.search,
      filters.status,
      sortable,
      navigate,
      onFilters,
    ]
  );

  return <>{displayProductList}</>;
};

export default memo(Categories);
