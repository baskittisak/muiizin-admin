import { memo } from "react";
import Input from "../../../center_components/form/Input";
import Typography from "../../../center_components/Typography";
import { Box, SpaceContainer } from "../../../style/common";

const OptionSize = ({ optionSize, onSetSize }) => {
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
            />
          ))}
      </SpaceContainer>
      <Box justify="center">
        <Typography
          fontWeight={700}
          lineHeight={17}
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
