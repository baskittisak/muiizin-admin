import { Space } from "antd";
import { memo, useCallback, useMemo } from "react";
import Dropdown from "../../../center_components/form/Dropdown";
import Typography from "../../../center_components/Typography";

const OptionDropdown = ({
  productId,
  typeOption,
  setTypeOption,
  onSetEnable,
}) => {
  const menuItems = useMemo(
    () => [
      {
        key: "1",
        label: "Size อย่างเดียว",
      },
      {
        key: "2",
        label: "Color อย่างเดียว",
      },
      {
        key: "3",
        label: "Size + Color",
      },
    ],
    []
  );

  const onChange = useCallback(
    (key) => {
      switch (key) {
        case "1":
          onSetEnable("size", true);
          onSetEnable("color", false);
          break;
        case "2":
          onSetEnable("size", false);
          onSetEnable("color", true);
          break;
        case "3":
          onSetEnable("size", true);
          onSetEnable("color", true);
          break;
        default:
          break;
      }
      setTypeOption(key);
    },
    [setTypeOption, onSetEnable]
  );

  return productId ? (
    <Space size={0}>
      <Typography fontSize={18} lineHeight={20} color="#828282">
        ประเภทตัวเลือก
      </Typography>
      <Typography fontSize={18} lineHeight={20} color="#F9414C">
        *
      </Typography>
    </Space>
  ) : (
    <Dropdown
      label="ประเภทตัวเลือก"
      placeholder="ระบุประเภทตัวเลือก"
      isRequired
      value={typeOption}
      menuItems={menuItems}
      onChange={onChange}
    />
  );
};

export default memo(OptionDropdown);
