import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import TabsLanguage from "../../../center_components/form/TabsLanguage";
import InputContainer from "../../../center_components/form/Input";
import Typography from "../../../center_components/Typography";
import UploadImage from "../../../center_components/UploadImage";
import { Box, SpaceContainer } from "../../../style/common";
import { Input, Space } from "antd";

const Header = styled.div`
  background: #d9e3d9;
  border: 1px solid #d9e3d9;
  border-bottom: 0;
  border-radius: 3px 3px 0px 0px;
  padding: 8px 12px;
`;

const Body = styled(SpaceContainer)`
  border: 1px solid #d9e3d9;
  border-top: 0;
  border-radius: 0px 0px 3px 3px;
  padding: 15px 14px 20px;
`;

const InputWrapper = styled.div`
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  > div {
    position: relative;
    top: 2px;
    left: 3px;
  }
`;

const InputColor = styled(Input)`
  cursor: pointer;
  -webkit-appearance: none;
  border: none;
  width: 30px;
  height: 30px;
  padding: 0;
`;

const OptionColor = () => {
  const [language, setLanguage] = useState("th");
  const [color, setColor] = useState();

  const onColorPicker = useCallback(() => {
    document.getElementById("color-picker").click();
  }, []);

  return (
    <SpaceContainer direction="vertical" size={20}>
      <SpaceContainer direction="vertical" size={0}>
        <Header>
          <Typography
            fontWeight={700}
            lineHeight={17}
            color="#4F4F4F"
          >{`ตัวเลือกที่ ${1}`}</Typography>
        </Header>
        <Body direction="vertical" size={20}>
          <TabsLanguage onChange={(value) => setLanguage(value)}>
            <InputContainer
              label={`ชื่อสีภาษา${language === "th" ? "ไทย" : "อังกฤษ"}`}
              maxLength={30}
              isRequired
              fontSize={16}
              lineHeight={17}
            />
          </TabsLanguage>
          <SpaceContainer direction="vertical" size={5}>
            <Space size={0}>
              <Typography lineHeight={17} color="#828282">
                รหัสสี
              </Typography>
              <Typography lineHeight={17} color="#F9414C">
                *
              </Typography>
            </Space>
            <InputWrapper onClick={onColorPicker}>
              <Space>
                <InputColor
                  id="color-picker"
                  type="color"
                  value={color || "#000"}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Typography
                  lineHeight={17}
                  color={color ? "#333333" : "#BDBDBD"}
                >
                  {color || "กรุณาเลือกรหัสสี"}
                </Typography>
              </Space>
            </InputWrapper>
          </SpaceContainer>
          <UploadImage
            label="อัปโหลดรูปภาพสินค้า"
            labelDescription="(สามารถอัปโหลดได้มากกว่า 1 รูป)"
            isRequired
            fontSize={16}
            lineHeight={17}
          />
        </Body>
      </SpaceContainer>
      <Box justify="center">
        <Typography fontWeight={700} lineHeight={17} color="#8AA399">
          + เพิ่มตัวเลือก
        </Typography>
      </Box>
    </SpaceContainer>
  );
};

export default memo(OptionColor);
