import { memo } from "react";
import styled from "styled-components";
import InputAntd from "antd/lib/input";
import Space from "antd/lib/space";
import Typography from "../Typography";
import { Box } from "../../style/common";

const SpaceContainer = styled(Space)`
  width: 100%;
`;

const InputContainer = styled(InputAntd)`
  width: 100%;
  height: ${({ height }) => `${height}px`};

  .ant-input {
    font-size: ${({ font_size }) => `${font_size}px`};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Input = ({
  label,
  type = "text",
  fontSize = 18,
  lineHeight = 20,
  isRequired,
  value,
  placeholder,
  maxLength,
  suffix,
  height = 38,
  onChange,
}) => {
  return (
    <SpaceContainer direction="vertical" size={5}>
      <Box justify="space-between">
        <Space size={0}>
          <Typography
            fontSize={fontSize}
            lineHeight={lineHeight}
            color="#828282"
          >
            {label}
          </Typography>
          {isRequired && (
            <Typography
              fontSize={fontSize}
              lineHeight={lineHeight}
              color="#F9414C"
            >
              *
            </Typography>
          )}
        </Space>
        {maxLength && (
          <Typography
            fontSize={fontSize}
            lineHeight={lineHeight}
            color="#828282"
          >
            {value?.length || 0}/{maxLength}
          </Typography>
        )}
      </Box>
      <InputContainer
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        height={height}
        font_size={fontSize}
        onWheel={(e) => e.currentTarget.blur()}
        onChange={(e) => onChange && onChange(e.target.value)}
        suffix={
          suffix && (
            <Typography
              fontSize={fontSize}
              lineHeight={lineHeight}
              color="#BDBDBD"
            >
              {suffix}
            </Typography>
          )
        }
      />
    </SpaceContainer>
  );
};

export default memo(Input);
