import { memo } from "react";
import styled, { css } from "styled-components";
import { Switch } from "antd";

const Container = styled.div`
  .ant-switch-checked {
    background: #d2ecdf;
  }

  ${({ checked }) =>
    checked &&
    css`
      .ant-switch-handle::before {
        background-color: #00a651;
        box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
      }
    `};
`;

const Toggle = ({ checked, onChange }) => {
  return (
    <Container checked={checked}>
      <Switch checked={checked} onChange={onChange} />
    </Container>
  );
};

export default memo(Toggle);
