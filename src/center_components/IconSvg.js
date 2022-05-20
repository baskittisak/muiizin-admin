import { memo } from "react";
import Icon from "@ant-design/icons";
import styled, { css } from "styled-components";

const IconContainer = styled.div`
  ${({ font_size, heightable }) =>
    font_size &&
    css`
      ${heightable &&
      css`
        height: ${`${font_size}px`};
      `};

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

const IconSvg = ({
  src,
  fontSize,
  heightable = true,
  color,
  margin,
  onClick,
}) => {
  return (
    <IconContainer
      font_size={fontSize}
      heightable={heightable}
      color={color}
      margin={margin}
      onClick={onClick}
    >
      <Icon component={src} />
    </IconContainer>
  );
};

export default memo(IconSvg);
