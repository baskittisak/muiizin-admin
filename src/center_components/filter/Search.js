import { memo } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import IconSvg from "../IconSvg";
import { ReactComponent as search_icon } from "../../assets/icons/search.svg";
import { Input } from "antd";
import { SpaceContainer } from "../../style/common";

const InputSearch = styled(Input)`
  .ant-input {
    font-size: 16px;
  }
  height: 35px;
  width: ${({ width }) => width};
`;

const Search = ({
  label,
  value,
  placeholder = "",
  width = "200px",
  onChange,
}) => {
  return (
    <SpaceContainer direction="vertical" size={5}>
      <Typography
        fontSize={18}
        lineHeight={20}
        fontWeight={700}
        color="#828282"
      >
        {label}
      </Typography>
      <InputSearch
        prefix={<IconSvg src={search_icon} fontSize={20} />}
        placeholder={placeholder}
        value={value}
        width={width}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </SpaceContainer>
  );
};

export default memo(Search);
