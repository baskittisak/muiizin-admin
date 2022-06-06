import { memo, useMemo } from "react";
import styled from "styled-components";
import { Box } from "../style/common";
import Typography from "./Typography";

const Value = styled.div`
  text-align: right;
`;

const Info = ({ label, value }) => {
  const isNormal = useMemo(() => {
    return typeof value === "string" || typeof value === "number";
  }, [value]);

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
      {isNormal && (
        <Value>
          <Typography fontSize={18} lineHeight={22} color="#4F4F4F">
            {value}
          </Typography>
        </Value>
      )}
      {!isNormal && value}
    </Box>
  );
};

export default memo(Info);
