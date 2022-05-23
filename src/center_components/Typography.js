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

    ${({ width }) =>
    width &&
    css`
      width: ${`${width}`};
    `};

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
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
  lineHeight = 17,
  underline,
  width,
  children,
  onClick,
}) => {
  return (
    <TypoContainer
      color={color}
      size={fontSize}
      weight={fontWeight}
      height={lineHeight}
      underline={underline ? 1 : 0}
      width={width}
      onClick={onClick}
    >
      {children}
    </TypoContainer>
  );
};

export default memo(Typography);
