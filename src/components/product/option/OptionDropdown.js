import { memo, useCallback, useMemo } from "react";
import Dropdown from "../../../center_components/form/Dropdown";

const OptionDropdown = ({ typeOption, setTypeOption, onSetEnable }) => {
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

  return (
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
