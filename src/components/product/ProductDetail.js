import { memo, useMemo, useState } from "react";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import InputEditor from "../../center_components/InputEditor";
import Typography from "../../center_components/Typography";
import { SpaceContainer } from "../../style/common";
import { Space } from "antd";

const ProductDetail = ({
  detailTH,
  detailEN,
  onSetDetailTH,
  onSetDetailEN,
}) => {
  const [language, setLanguage] = useState("th");

  const InputEditorTH = useMemo(
    () =>
      language === "th" && (
        <InputEditor value={detailTH} language="th" onChange={onSetDetailTH} />
      ),
    [language, detailTH, onSetDetailTH]
  );

  const InputEditorEn = useMemo(
    () =>
      language === "en" && (
        <InputEditor value={detailEN} language="en" onChange={onSetDetailEN} />
      ),
    [language, detailEN, onSetDetailEN]
  );

  return (
    <TabsLanguage onChange={(value) => setLanguage(value)}>
      <SpaceContainer direction="vertical" size={5}>
        <Space size={0}>
          <Typography fontSize={18} lineHeight={20} color="#828282">
            รายละเอียดสินค้าภาษา{language === "th" ? "ไทย" : "อังกฤษ"}
          </Typography>
          <Typography fontSize={18} lineHeight={20} color="#F9414C">
            *
          </Typography>
        </Space>
        {InputEditorTH}
        {InputEditorEn}
      </SpaceContainer>
    </TabsLanguage>
  );
};

export default memo(ProductDetail);
