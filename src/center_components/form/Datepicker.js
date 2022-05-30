import { memo, useCallback } from "react";
import styled from "styled-components";
import { Space } from "antd";
import { SpaceContainer } from "../../style/common";
import DatepickerContainer from "../Datepicker";
import Typography from "../Typography";
import dayjs from "dayjs";

const DatepickerWrapper = styled.div`
  .ant-picker {
    width: 100%;
  }
`;

const ONE_DAY = 3600 * 1000 * 24;

const Datepicker = ({
  label,
  isRequired,
  startDate,
  endDate,
  isStart = true,
  onChange,
}) => {
  const disabledStartDate = useCallback(
    (current) => {
      const valueCurrent = current.valueOf();
      const isPast = valueCurrent < Date.now() - ONE_DAY;
      const endDateMinusOneDay = endDate - ONE_DAY;
      return !startDate && endDate
        ? valueCurrent > endDateMinusOneDay || isPast
        : isPast;
    },
    [startDate, endDate]
  );

  const disabledEndDate = useCallback(
    (current) => {
      const valueCurrent = current.valueOf();
      const isPast = valueCurrent < Date.now() - ONE_DAY;
      const startDatePlusOneDay = startDate + ONE_DAY;
      return !startDate ? isPast : valueCurrent < startDatePlusOneDay;
    },
    [startDate]
  );

  return (
    <SpaceContainer direction="vertical" size={5}>
      <Space size={0}>
        <Typography fontSize={18} lineHeight={20} color="#828282">
          {label}
        </Typography>
        {isRequired && (
          <Typography fontSize={18} lineHeight={20} color="#F9414C">
            *
          </Typography>
        )}
      </Space>
      <DatepickerWrapper>
        <DatepickerContainer
          placeholder="ระบุวัน"
          format="DD-MM-YYYY"
          showToday={false}
          disabledDate={(current) =>
            isStart ? disabledStartDate(current) : disabledEndDate(current)
          }
          onChange={(date) => onChange(date?.valueOf())}
          value={
            isStart
              ? startDate
                ? dayjs(startDate)
                : undefined
              : endDate
              ? dayjs(endDate)
              : undefined
          }
          getPopupContainer={(trigger) => trigger.parentElement}
        />
      </DatepickerWrapper>
    </SpaceContainer>
  );
};

export default memo(Datepicker);
