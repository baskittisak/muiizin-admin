import { memo } from "react";
import Image from "antd/lib/image";
import styled, { css } from "styled-components";

const ImageContainer = styled(Image)`
  ${({ object_fit }) =>
    object_fit &&
    css`
      object-fit: ${object_fit};
    `};
`;

const BaseImage = ({ src, preview = false, width, height, objectFit }) => {
  return (
    <ImageContainer
      src={src}
      preview={preview}
      width={width}
      height={height}
      object_fit={objectFit}
    />
  );
};

export default memo(BaseImage);
