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
`;

const IconSvg = ({ src, fontSize, color, margin }) => {
  return (
    <IconContainer font_size={fontSize} color={color} margin={margin}>
      <Icon component={src} />
    </IconContainer>
  );
};

export default memo(IconSvg);
