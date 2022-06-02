import { memo } from "react";
import styled from "styled-components";
import { Result } from "antd";
import { Box } from "../style/common";
import BaseButton from "./BaseButton";

const Container = styled(Box)`
  width: 100%;
  height: 100%;
`;

const ErrorPage = ({ message = "Sorry, something went wrong." }) => {
  return (
    <Container justify="center" align="center">
      <Result
        status="500"
        title={message}
        extra={
          <BaseButton onClick={() => window.location.reload()}>
            Refresh
          </BaseButton>
        }
      />
    </Container>
  );
};

export default memo(ErrorPage);
