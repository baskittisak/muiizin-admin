import { memo } from "react";
import styled, { css } from "styled-components";
import { Space } from "antd";
import { Box, SpaceContainer } from "../../../style/common";
import Typography from "../../../center_components/Typography";
import IconSvg from "../../../center_components/IconSvg";
import OptionSize from "./OptionSize";
import OptionColor from "./OptionColor";
import { ReactComponent as checked_icon } from "../../../assets/icons/check.svg";

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
      border-bottom: 0;
      border-radius: 3px 3px 0 0;
    `};
`;

const Square = styled(Box)`
  width: 14px;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 2px;

  ${({ active }) =>
    active &&
    css`
      background-color: #044700;
    `};
`;

const ContentOption = styled.div`
  padding: 0 14px 18px;
  border: 1px solid #044700;
  border-top: 0;
  border-radius: 0 0 3px 3px;
`;

const OptionType = ({
  sizeEnable,
  colorEnable,
  optionSize,
  optionColor,
  onSetEnble,
  onSetSize,
  onSetColor,
  onSetColorImage,
}) => {
  return (
    <SpaceContainer direction="vertical" size={10}>
      <Space size={0}>
        <Typography fontSize={18} lineHeight={20} color="#828282">
          ประเภทตัวเลือก
        </Typography>
        <Typography fontSize={18} lineHeight={20} color="#F9414C">
          *
        </Typography>
      </Space>
      <SpaceContainer direction="vertical" size={20}>
        <SpaceContainer direction="vertical" size={0}>
          <Option
            size={10}
            active={sizeEnable ? 1 : 0}
            onClick={() => onSetEnble("size", !sizeEnable)}
          >
            <Square justify="center" align="center" active={sizeEnable}>
              {sizeEnable && (
                <IconSvg src={checked_icon} fontSize={10} heightable={false} />
              )}
            </Square>
            <Typography
              fontSize={18}
              lineHeight={20}
              color={sizeEnable ? "#044700" : "#4F4F4F"}
            >
              Size
            </Typography>
          </Option>
          {sizeEnable && (
            <ContentOption>
              <OptionSize optionSize={optionSize} onSetSize={onSetSize} />
            </ContentOption>
          )}
        </SpaceContainer>
        <SpaceContainer direction="vertical" size={0}>
          <Option
            size={10}
            active={colorEnable ? 1 : 0}
            onClick={() => onSetEnble("color", !colorEnable)}
          >
            <Square justify="center" align="center" active={colorEnable}>
              {colorEnable && (
                <IconSvg src={checked_icon} fontSize={10} heightable={false} />
              )}
            </Square>
            <Typography
              fontSize={18}
              lineHeight={20}
              color={colorEnable ? "#044700" : "#4F4F4F"}
            >
              Color
            </Typography>
          </Option>
          {colorEnable && (
            <ContentOption>
              <OptionColor
                optionColor={optionColor}
                onSetColor={onSetColor}
                onSetColorImage={onSetColorImage}
              />
            </ContentOption>
          )}
        </SpaceContainer>
      </SpaceContainer>
    </SpaceContainer>
  );
};

export default memo(OptionType);
