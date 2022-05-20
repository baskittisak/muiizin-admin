import { memo } from "react";
import Input from "../../../center_components/form/Input";
import Typography from "../../../center_components/Typography";
import { Box, SpaceContainer } from "../../../style/common";

const OptionSize = () => {
  return (
    <SpaceContainer direction="vertical" size={20}>
      <SpaceContainer direction="vertical" size={10}>
        <Input placeholder={`ระบุตัวเลือกที่ ${1}`} />
        <Input placeholder={`ระบุตัวเลือกที่ ${2}`} />
      </SpaceContainer>
      <Box justify="center">
        <Typography fontWeight={700} lineHeight={17} color="#8AA399">
          + เพิ่มตัวเลือก
        </Typography>
      </Box>
    </SpaceContainer>
  );
};

export default memo(OptionSize);
