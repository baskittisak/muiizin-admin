import { memo } from "react";
import PaginationAntd from "antd/lib/pagination";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  text-align: ${({ align }) => align};

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

const Pagination = ({
  defaultCurrent = 1,
  current,
  total,
  align = "center",
  onChange,
}) => {
  return (
    <PaginationWrapper align={align}>
      <PaginationAntd
        defaultCurrent={defaultCurrent}
        current={current}
        total={total}
        onChange={onChange && onChange}
      />
    </PaginationWrapper>
  );
};

export default memo(Pagination);
