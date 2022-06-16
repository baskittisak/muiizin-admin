import { memo, useCallback } from "react";
import styled from "styled-components";
import TableAntd from "antd/lib/table";
import Typography from "./Typography";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Empty } from "antd";

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

  .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    outline: none;
    box-shadow: none;
  }

  .ant-checkbox-inner:hover {
    border-color: #d9d9d9;
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after,
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #044700;
    border-color: #044700;
  }
`;

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

const Table = ({
  label,
  dataSource,
  columns,
  pagination = true,
  page,
  emptyText,
  rowSelection,
  totalData,
  sortable,
  setDataSource,
  onChange,
}) => {
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        setDataSource &&
          setDataSource((prevState) => {
            const newData = arrayMoveImmutable(
              [...prevState].slice(),
              oldIndex,
              newIndex
            ).filter((el) => !!el);
            return newData.map((data, index) => ({
              ...data,
              sequence: index + 1,
            }));
          });
      }
    },
    [setDataSource]
  );

  const DraggableContainer = useCallback(
    (props) => (
      <SortableBody
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    ),
    [onSortEnd]
  );

  const DraggableBodyRow = useCallback(
    ({ className, style, ...restProps }) => {
      const index = dataSource.findIndex(
        (x) => x.index === restProps["data-row-key"]
      );
      return <SortableItem index={index} {...restProps} />;
    },
    [dataSource]
  );

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
        rowKey={sortable ? "index" : undefined}
        components={
          sortable && {
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }
        }
        locale={{
          emptyText: (
            <Empty description={emptyText} />
          ),
        }}
        rowSelection={rowSelection && rowSelection}
        onChange={onChange && onChange}
      />
    </Container>
  );
};

export default memo(Table);
