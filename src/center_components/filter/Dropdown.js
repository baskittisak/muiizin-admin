import { memo, useMemo } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import IconSvg from "../IconSvg";
import { ReactComponent as arrow_icon } from "../../assets/icons/arrow_down.svg";
import { Space, Menu, Dropdown } from "antd";
import { Box } from "../../style/common";

const DropdownContainer = styled(Dropdown)`
  cursor: pointer;
  width: 200px;
  height: 35px;
  border: 1px solid #d9d9d9;
  padding: 4px 11px;
  border-radius: 5px;
`;

const DropdownFilter = ({ label, menuItems, value, onChange }) => {
  const menuList = useMemo(
    () => (
      <Menu
        selectedKeys={[value]}
        items={menuItems}
        onClick={(e) => onChange && onChange(e.key)}
      />
    ),
    [value, menuItems, onChange]
  );

  const menuSelected = useMemo(() => {
    return menuItems?.find((item) => item?.key === value)?.label;
  }, [menuItems, value]);

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
      <DropdownContainer overlay={menuList}>
        <Box align="center" justify="space-between">
          <Typography color="rgba(0, 0, 0, 0.85)">{menuSelected}</Typography>
          <IconSvg src={arrow_icon} fontSize={15} />
        </Box>
      </DropdownContainer>
    </Space>
  );
};

export default memo(DropdownFilter);
