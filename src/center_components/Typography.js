import { memo } from "react";
import styled, { css } from "styled-components";
import Typo from "antd/lib/typography";

const TypoContainer = styled(Typo)`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};

  ${({ size }) =>
    size &&
    css`
      font-size: ${`${size}px`};
    `};

  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `};

  ${({ height }) =>
    height &&
    css`
      line-height: ${`${height}px`};
    `};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `};
`;

const Typography = ({
  color,
  fontSize = 16,
  fontWeight = 400,
  lineHeight,
  children,
  onClick,
}) => {
  return (
    <TypoContainer
      color={color}
      size={fontSize}
      weight={fontWeight}
      height={lineHeight}
      onClick={onClick}
    >
      {children}
    </TypoContainer>
  );
};

export default memo(Typography);
