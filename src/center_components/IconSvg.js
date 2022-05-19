import { memo } from "react";
import Icon from "@ant-design/icons";
import styled, { css } from "styled-components";

const IconContainer = styled.div`
  ${({ font_size }) =>
    font_size &&
    css`
      .anticon svg {
        font-size: ${`${font_size}px`};
      }
    `};

  ${({ color }) =>
    color &&
    css`
      path {
        fill: ${color};
      }
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `};
`;

const IconSvg = ({ src, fontSize, color, margin, onClick }) => {
  return (
    <IconContainer
      font_size={fontSize}
      color={color}
      margin={margin}
      onClick={onClick}
    >
      <Icon component={src} />
    </IconContainer>
  );
};

export default memo(IconSvg);
