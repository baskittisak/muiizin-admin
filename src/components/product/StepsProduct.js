import { memo } from "react";
import { Steps } from "antd";
import styled from "styled-components";

const { Step } = Steps;

const StepsContainer = styled(Steps)`
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background: #fff4d6;
    border-color: #fff4d6;
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: #bdbdbd;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-icon
    .ant-steps-icon,
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title,
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title,
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #584207;
    font-weight: 700;
  }

  .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon,
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #bdbdbd;
    font-weight: 700;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after,
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #bdbdbd;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: #584207;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #584207;
  }
`;

const steps = ["ข้อมูลสินค้า", "ตัวเลือกและรูปภาพ", "รายละเอียดสินค้า"];

const StepsProduct = ({ current }) => {
  return (
    <StepsContainer current={current} labelPlacement="vertical">
      {steps.map((step) => (
        <Step key={step} title={step} />
      ))}
    </StepsContainer>
  );
};

export default memo(StepsProduct);
