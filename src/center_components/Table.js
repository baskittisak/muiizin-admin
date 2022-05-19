import { memo } from "react";
import styled from "styled-components";
import TableAntd from "antd/lib/table";
import Typography from "./Typography";

const Container = styled.div`
  margin-top: 40px;

  .ant-typography {
    margin-bottom: 10px !important;
  }
`;

const TableContainer = styled(TableAntd)`
  .ant-table table {
    text-align: center;
    font-size: 16px;
  }

  .ant-table-thead > tr > th {
    color: #584207;
    font-weight: 700;
    text-align: center;
    background: #fff4d6;
    border-bottom: none;
    padding: 13px 16px;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #edeeef;
    color: #4f4f4f;
  }

  .ant-pagination-item,
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
  }

  .ant-pagination-item a,
  .ant-pagination-item a:hover,
  .ant-pagination-prev:not(.ant-pagination-disabled)
    .ant-pagination-item-link:hover,
  .ant-pagination-next:not(.ant-pagination-disabled)
    .ant-pagination-item-link:hover {
    color: #4f4f4f;
  }

  .ant-pagination-item-active {
    background-color: #044700;
    border: 1px solid #044700;
  }

  .ant-pagination-item-active a,
  .ant-pagination-item-active a:hover {
    color: #ffffff;
  }
`;

const Table = ({
  label,
  dataSource,
  columns,
  pagination = true,
  page,
  totalData,
  onChange,
}) => {
  return (
    <Container>
      {label && (
        <Typography
          fontSize={18}
          lineHeight={20}
          fontWeight={700}
          color="#4F4F4F"
        >
          {label}
        </Typography>
      )}
      <TableContainer
        dataSource={dataSource}
        columns={columns}
        pagination={
          pagination && {
            defaultCurrent: page,
            current: page,
            total: totalData,
            pageSize: 10,
            position: ["bottomLeft"],
          }
        }
        onChange={onChange}
      />
    </Container>
  );
};

export default memo(Table);
