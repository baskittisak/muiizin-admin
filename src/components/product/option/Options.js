import { memo, useMemo } from "react";
import styled, { css } from "styled-components";
import { Box, SpaceContainer } from "../../../style/common";
import { Col, Row, Space } from "antd";
import Typography from "../../../center_components/Typography";

const Option = styled(Space)`
  cursor: pointer;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  padding: 18px 14px;

  ${({ active }) =>
    active &&
    css`
      border: 1px solid #044700;
    `};
`;

const Circle = styled(Box)`
  width: 16px;
  height: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 100%;

  ${({ active }) =>
    active &&
    css`
      border: 1px solid #044700;
    `};

  ${({ inside, active }) =>
    inside === "true" &&
    css`
      width: 10px;
      height: 10px;

      ${active &&
      css`
        background-color: #044700;
      `};
    `};
`;

const Options = ({ option, setOption }) => {
  const isOptionTrue = useMemo(() => {
    return option !== null && option ? 1 : 0;
  }, [option]);

  const isOptionFalse = useMemo(() => {
    return option !== null && !option ? 1 : 0;
  }, [option]);

  return (
    <SpaceContainer direction="vertical" size={10}>
      <Space size={0}>
        <Typography fontSize={18} lineHeight={20} color="#828282">
          ตัวเลือกสินค้า
        </Typography>
        <Typography fontSize={18} lineHeight={20} color="#F9414C">
          *
        </Typography>
      </Space>
      <Row gutter={[20, 0]}>
        <Col span={12}>
          <Option
            size={10}
            onClick={() => setOption(true)}
            active={isOptionTrue}
          >
            <Circle justify="center" align="center" active={isOptionTrue}>
              <Circle inside="true" active={isOptionTrue} />
            </Circle>
            <Typography
              fontSize={18}
              lineHeight={20}
              color={isOptionTrue ? "#044700" : "#828282"}
            >
              มี
            </Typography>
          </Option>
        </Col>
        <Col span={12}>
          <Option
            size={10}
            onClick={() => setOption(false)}
            active={isOptionFalse}
          >
            <Circle justify="center" align="center" active={isOptionFalse}>
              <Circle inside="true" active={isOptionFalse} />
            </Circle>
            <Typography
              fontSize={18}
              lineHeight={20}
              color={isOptionFalse ? "#044700" : "#828282"}
            >
              ไม่มี
            </Typography>
          </Option>
        </Col>
      </Row>
    </SpaceContainer>
  );
};

export default memo(Options);
