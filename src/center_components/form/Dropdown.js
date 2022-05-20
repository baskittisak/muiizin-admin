import { memo, useMemo } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import IconSvg from "../IconSvg";
import { ReactComponent as arrow_icon } from "../../assets/icons/arrow_down.svg";
import { Space, Menu, Dropdown } from "antd";
import { Box } from "../../style/common";

const SpaceContainer = styled(Space)`
  width: 100%;
`;

const DropdownContainer = styled(Dropdown)`
  cursor: pointer;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  border: 1px solid #d9d9d9;
  padding: 4px 11px;
  border-radius: 5px;
`;

const DropdownForm = ({
  label,
  menuItems,
  value,
  placeholder,
  fontSize = 18,
  lineHeight = 20,
  height = 38,
  isRequired,
  onChange,
}) => {
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
    <SpaceContainer direction="vertical" size={5}>
      <Space size={0}>
        <Typography fontSize={fontSize} lineHeight={lineHeight} color="#828282">
          {label}
        </Typography>
        {isRequired && (
          <Typography
            fontSize={fontSize}
            lineHeight={lineHeight}
            color="#F9414C"
          >
            *
          </Typography>
        )}
      </Space>
      <DropdownContainer overlay={menuList} height={height}>
        <Box align="center" justify="space-between">
          <Typography
            color={
              !menuSelected && placeholder ? "#BDBDBD" : "rgba(0, 0, 0, 0.85)"
            }
          >
            {menuSelected || placeholder}
          </Typography>
          <IconSvg src={arrow_icon} fontSize={15} />
        </Box>
      </DropdownContainer>
    </SpaceContainer>
  );
};

export default memo(DropdownForm);
