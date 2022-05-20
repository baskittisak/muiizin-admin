import { memo, useCallback, useMemo, useState } from "react";
import Dropdown from "../../center_components/form/Dropdown";
import Input from "../../center_components/form/Input";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import { SpaceContainer } from "../../style/common";

const ProductInfo = ({ productInfo, setProductInfo }) => {
  const [language, setLanguage] = useState({
    name: "th",
    owner: "th",
  });

  const onSetLanguage = useCallback((type, value) => {
    setLanguage((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSetProductInfo = useCallback(
    (type, value, language) => {
      if (language) {
        setProductInfo((prevState) => ({
          ...prevState,
          [type]: {
            ...prevState[type],
            [language]: value,
          },
        }));
      } else {
        setProductInfo((prevState) => ({
          ...prevState,
          [type]: value,
        }));
      }
    },
    [setProductInfo]
  );

  const categoriesItems = useMemo(
    () => [
      {
        key: "1",
        label: "กระเป๋า",
      },
      {
        key: "2",
        label: "หมอน",
      },
      {
        key: "3",
        label: "หมวก",
      },
    ],
    []
  );

  const statusItems = useMemo(
    () => [
      {
        key: "1",
        label: "พร้อมส่ง",
      },
      {
        key: "2",
        label: "พรีออเดอร์",
      },
    ],
    []
  );

  return (
    <SpaceContainer direction="vertical" size={30}>
      <TabsLanguage onChange={(key) => onSetLanguage("name", key)}>
        <Input
          label={`ชื่อสินค้าภาษา${language.name === "th" ? "ไทย" : "อังกฤษ"}`}
          value={productInfo.name[language.name]}
          isRequired
          maxLength={150}
          onChange={(value) => onSetProductInfo("name", value, language.name)}
        />
      </TabsLanguage>
      <TabsLanguage onChange={(key) => onSetLanguage("owner", key)}>
        <Input
          label={`ชื่อผู้ผลิตภาษา${language.owner === "th" ? "ไทย" : "อังกฤษ"}`}
          value={productInfo.owner[language.owner]}
          isRequired
          maxLength={100}
          onChange={(value) => onSetProductInfo("owner", value, language.owner)}
        />
      </TabsLanguage>
      <Dropdown
        label="หมวดหมู่สินค้า"
        menuItems={categoriesItems}
        placeholder="กรุณาเลือกหมวดหมู่สินค้า"
        value={productInfo.category}
        isRequired
        onChange={(value) => onSetProductInfo("category", value)}
      />
      <Input
        type="number"
        label="ราคาสินค้า"
        placeholder="0"
        suffix="THB"
        value={productInfo.price}
        isRequired
        onChange={(value) => onSetProductInfo("price", value)}
      />
      <Dropdown
        label="สถานะสินค้า"
        menuItems={statusItems}
        placeholder="กรุณาเลือกสถานะ"
        value={productInfo.status}
        isRequired
        onChange={(value) => onSetProductInfo("status", value)}
      />
    </SpaceContainer>
  );
};

export default memo(ProductInfo);
