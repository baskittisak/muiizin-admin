import { memo } from "react";
import Button from "antd/lib/button";
import styled, { css } from "styled-components";

const ButtonContainer = styled(Button)`
  border-radius: 5px;
  font-weight: 700;
  border: none;
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
  font-size: ${({ font_size }) => `${font_size}px`};
  line-height: ${({ line_height }) => `${line_height}px`};

  ${({ bg_color }) =>
    bg_color &&
    css`
      background-color: ${bg_color};

      :hover,
      :focus {
        background-color: ${bg_color};
      }
    `};

  ${({ color }) =>
    color &&
    css`
      color: ${color};

      :hover,
      :focus {
        color: ${color};
      }
    `};

  :hover,
  :focus {
    border: none;
  }
`;

const BaseButton = ({
  width = "fit-content",
  height = 38,
  fontSize = 18,
  lineHeight = 20,
  bgColor,
  color,
  children,
  onClick
}) => {
  return (
    <ButtonContainer
      font_size={fontSize}
      height={height}
      line_height={lineHeight}
      width={width}
      bg_color={bgColor}
      color={color}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
};

export default memo(BaseButton);
