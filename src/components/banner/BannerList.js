import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Frame from "../../center_components/Frame";
import BaseButton from "../../center_components/BaseButton";
import FilterBanner from "./FilterBanner";
import IconSvg from "../../center_components/IconSvg";
import Table from "../../center_components/Table";
import BaseImage from "../../center_components/BaseImage";
import ErrorPage from "../../center_components/ErrorPage";
import { ReactComponent as eye_icon } from "../../assets/icons/eye.svg";
import { ReactComponent as delete_icon } from "../../assets/icons/delete.svg";
import { ReactComponent as drag_icon } from "../../assets/icons/drag.svg";
import { Space } from "antd";
import { Action, Box } from "../../style/common";
import { SortableHandle } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getFormatDate } from "../../utils/utils";
import useSWR from "swr";
import { getModalConfirm } from "../../center_components/ModalConfirm";
import { getNotification } from "../../center_components/Notification";

const DragHandle = SortableHandle(() => (
  <IconSvg src={drag_icon} fontSize={18} onClick={() => null} />
));

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
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search] = useDebounce(filters.search, 500);
  const apiBannerList = useMemo(() => {
    const isAllStatus = filters.status === "1";
    const status =
      filters.status === "2"
        ? "เตรียมใช้งาน"
        : filters.status === "3"
        ? "กำลังใช้งาน"
        : "หมดอายุ";
    const statusQuery = !isAllStatus ? `&status=${status}` : "";
    return `/data/list/banner?search=${search}${statusQuery}`;
  }, [search, filters.status]);

  const { data: bannerList, error, mutate } = useSWR(apiBannerList);

  useEffect(() => {
    bannerList && setDataSource([...bannerList]);
  }, [bannerList]);

  const onFilters = useCallback((type, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onDelete = useCallback(
    async (bannerId) => {
      setLoading(true);
      const { default: axios } = await import("axios");
      try {
        await axios.put("/delete/banner", { bannerId });
        const response = await mutate();
        const banners = response.map((banner, index) => ({
          bannerId: banner?.id,
          sequence: index + 1,
        }));
        await axios.put("/edit/sequence/banner", { banners });
        await mutate();
        setLoading(false);
        getNotification({
          type: "success",
          message: "ลบหมวดหมู่สินค้าสำเร็จ",
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

  const onSaveSequence = useCallback(async () => {
    setLoading(true);
    const { default: axios } = await import("axios");
    try {
      const banners = dataSource.map((banner) => ({
        bannerId: banner?.id,
        sequence: banner?.sequence,
      }));
      await axios.put("/edit/sequence/banner", { banners });
      await mutate();
      setLoading(false);
      setSortable(false);
      getNotification({
        type: "success",
        message: "แก้ไขลำดับแบนเนอร์สำเร็จ",
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      getNotification({
        type: "error",
        message: "เกิดข้อผิดพลาด",
      });
    }
  }, [dataSource, mutate]);

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
          <BaseImage src={image} width={200} height={80} objectFit="contain" />
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
        render: (date) => getFormatDate(date),
      },
      {
        title: "วันที่สิ้นสุด",
        dataIndex: "endDate",
        width: "10%",
        render: (date) => getFormatDate(date),
      },
      {
        title: "วันที่อัปเดต",
        dataIndex: "updatedTime",
        width: "10%",
        render: (date) => getFormatDate(date),
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
                onClick={() => navigate(`/banner-info?bannerId=${record?.key}`)}
              >
                <IconSvg src={eye_icon} fontSize={18} />
              </Action>
              <Action
                justify="center"
                align="center"
                onClick={() =>
                  getModalConfirm({
                    message: "คุณต้องการจะแบนเนอร์นี้ใช่หรือไม่?",
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
  }, [sortable, navigate, onDelete]);

  const displayProductList = useMemo(
    () => (
      <Frame
        label={sortable ? "จัดเรียงแบนเนอร์" : "แบนเนอร์"}
        loading={!bannerList || loading}
        extra={
          !sortable && (
            <Space size={20}>
              {bannerList?.length > 0 && (
                <BaseButton
                  bgColor="#D9E3D9"
                  color="#044700"
                  onClick={() => setSortable(true)}
                >
                  จัดเรียงแบนเนอร์
                </BaseButton>
              )}
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
        footer={
          sortable && (
            <BaseButton bgColor="#044700" color="#fff" onClick={onSaveSequence}>
              บันทึก
            </BaseButton>
          )
        }
        onBack={sortable ? () => setSortable(false) : undefined}
      >
        {!sortable && (
          <FilterBanner
            search={filters.search}
            status={filters.status}
            onFilters={onFilters}
          />
        )}
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          emptyText="ไม่พบแแบนเนอร์"
          sortable={sortable}
          setDataSource={setDataSource}
        />
      </Frame>
    ),
    [
      bannerList,
      columns,
      dataSource,
      filters.search,
      filters.status,
      sortable,
      loading,
      navigate,
      onFilters,
      onSaveSequence,
    ]
  );

  if (error) return <ErrorPage message={error?.response?.data} />;

  return displayProductList;
};

export default memo(Categories);
