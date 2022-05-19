import { memo } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import IconSvg from "../IconSvg";
import { ReactComponent as search_icon } from "../../assets/icons/search.svg";
import { Space, Input } from "antd";

const InputSearch = styled(Input)`
  width: 200px;
`;

const Search = ({ label, value, onChange }) => {
  return (
    <Space direction="vertical" size={5}>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Space>
  );
};

export default memo(Search);
