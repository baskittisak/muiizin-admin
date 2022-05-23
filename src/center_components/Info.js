import { memo } from "react";
import { Box } from "../style/common";
import Typography from "./Typography";

const Info = ({ label, value }) => {
  return (
    <Box justify="space-between">
      <Typography
        fontSize={18}
        lineHeight={20}
        fontWeight={700}
        color="#4F4F4F"
      >
        {label}
      </Typography>
      <Typography fontSize={18} lineHeight={22} color="#4F4F4F">
        {value}
      </Typography>
    </Box>
  );
};

export default memo(Info);
