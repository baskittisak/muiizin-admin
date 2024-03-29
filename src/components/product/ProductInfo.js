import { memo, useCallback, useMemo, useState } from "react";
import Dropdown from "../../center_components/form/Dropdown";
import Input from "../../center_components/form/Input";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import { SpaceContainer } from "../../style/common";
import { Empty, Skeleton } from "antd";
import useSWR from "swr";

const ProductInfo = ({ productInfo, setProductInfo }) => {
  const [language, setLanguage] = useState({
    name: "th",
    owner: "th",
  });

  const { data: categories, error: categoriesError } = useSWR(
    "/data/list/filter/category?type=create"
  );

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
        const isStatus = type === "status";
        if (isStatus) {
          setProductInfo((prevState) => ({
            ...prevState,
            status: {
              key: value,
            },
          }));
        } else {
          setProductInfo((prevState) => ({
            ...prevState,
            [type]: value,
          }));
        }
      }
    },
    [setProductInfo]
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
      {
        key: "3",
        label: "สินค้าหมด",
      },
    ],
    []
  );

  if (categoriesError) return <Empty />;
  if (!categories) return <Skeleton active />;

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
        menuItems={categories}
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
        value={productInfo.status.key}
        isRequired
        onChange={(value) => onSetProductInfo("status", value)}
      />
    </SpaceContainer>
  );
};

export default memo(ProductInfo);
