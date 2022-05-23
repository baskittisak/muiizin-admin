import { memo, useCallback } from "react";
import Input from "../../../center_components/form/Input";
import IconSvg from "../../../center_components/IconSvg";
import Typography from "../../../center_components/Typography";
import { Box, SpaceContainer } from "../../../style/common";
import { ReactComponent as delete_icon } from "../../../assets/icons/delete.svg";

const OptionSize = ({ optionSize, onSetSize }) => {
  const suffixDelete = useCallback(
    (index) => {
      return optionSize?.length > 2 ? (
        <IconSvg src={delete_icon} onClick={() => onSetSize("delete", index)} />
      ) : (
        <span />
      );
    },
    [optionSize?.length, onSetSize]
  );

  return (
    <SpaceContainer direction="vertical" size={20}>
      <SpaceContainer direction="vertical" size={10}>
        {optionSize &&
          optionSize.map((size, index) => (
            <Input
              key={index}
              placeholder={`ระบุตัวเลือกที่ ${index + 1}`}
              value={size.name}
              onChange={(value) => onSetSize("edit", index, value)}
              suffix={suffixDelete(index)}
            />
          ))}
      </SpaceContainer>
      <Box justify="center">
        <Typography
          fontWeight={700}
          color="#8AA399"
          onClick={() => onSetSize("add")}
        >
          + เพิ่มตัวเลือก
        </Typography>
      </Box>
    </SpaceContainer>
  );
};

export default memo(OptionSize);
