import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import TabsLanguage from "../../../center_components/form/TabsLanguage";
import InputContainer from "../../../center_components/form/Input";
import Typography from "../../../center_components/Typography";
import UploadImage from "../../../center_components/UploadImage";
import IconSvg from "../../../center_components/IconSvg";
import { Box, SpaceContainer } from "../../../style/common";
import { Space } from "antd";
import { DebounceInput } from "react-debounce-input";
import { ReactComponent as delete_icon } from "../../../assets/icons/delete.svg";

const Header = styled(Box)`
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

const InputColor = styled(DebounceInput)`
  cursor: pointer;
  -webkit-appearance: none;
  border: none;
  width: 30px;
  height: 30px;
  padding: 0;
`;

const OptionColor = ({ optionColor, onSetColor, onSetColorImage }) => {
  const [language, setLanguage] = useState(["th", "th"]);

  const onSetLanguage = useCallback((index, value) => {
    setLanguage((prevState) => {
      const newLanguage = [...prevState];
      newLanguage[index] = value;
      return newLanguage;
    });
  }, []);

  const onAddColor = useCallback(() => {
    setLanguage((prevState) => {
      const newLanguage = [...prevState];
      newLanguage.push("th");
      return newLanguage;
    });
    onSetColor("add");
  }, [onSetColor]);

  const onDeleteColor = useCallback(
    (index) => {
      setLanguage((prevState) => {
        const newLanguage = [...prevState];
        return newLanguage.filter((_, prevIndex) => prevIndex !== index);
      });
      onSetColor("delete", index);
    },
    [onSetColor]
  );

  const onColorPicker = useCallback((index) => {
    document.getElementById(`color-picker-${index}`).click();
  }, []);

  const deleteIcon = useCallback(
    (index) => {
      return (
        optionColor?.length > 2 && (
          <IconSvg src={delete_icon} onClick={() => onDeleteColor(index)} />
        )
      );
    },
    [optionColor?.length, onDeleteColor]
  );

  return (
    <SpaceContainer direction="vertical" size={20}>
      {optionColor &&
        optionColor.map((color, index) => (
          <SpaceContainer key={index} direction="vertical" size={0}>
            <Header justify="space-between">
              <Typography
                fontWeight={700}
                lineHeight={17}
                color="#4F4F4F"
              >{`ตัวเลือกที่ ${index + 1}`}</Typography>
              {deleteIcon(index)}
            </Header>
            <Body direction="vertical" size={20}>
              <TabsLanguage
                activeKey={language[index]}
                onChange={(value) => onSetLanguage(index, value)}
              >
                <InputContainer
                  label={`ชื่อสีภาษา${
                    language[index] === "th" ? "ไทย" : "อังกฤษ"
                  }`}
                  maxLength={30}
                  isRequired
                  value={color.name[language[index]]}
                  fontSize={16}
                  lineHeight={17}
                  onChange={(value) =>
                    onSetColor("edit", index, value, language[index])
                  }
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
                <InputWrapper onClick={() => onColorPicker(index)}>
                  <Space>
                    <InputColor
                      id={`color-picker-${index}`}
                      type="color"
                      value={color.code || "#000000"}
                      debounceTimeout={300}
                      onChange={(e) =>
                        onSetColor("edit", index, e.target.value)
                      }
                    />
                    <Typography
                      lineHeight={17}
                      color={color.code ? "#333333" : "#BDBDBD"}
                    >
                      {color.code || "กรุณาเลือกรหัสสี"}
                    </Typography>
                  </Space>
                </InputWrapper>
              </SpaceContainer>
              <UploadImage
                type="product"
                label="อัปโหลดรูปภาพสินค้า"
                labelDescription="(สามารถอัปโหลดได้มากกว่า 1 รูป)"
                isRequired
                fontSize={16}
                lineHeight={17}
                imageList={color.images}
                setImageList={(images) => onSetColorImage("add", index, images)}
                onDeleteImage={(indexDel) =>
                  onSetColorImage("delete", index, "", indexDel)
                }
              />
            </Body>
          </SpaceContainer>
        ))}
      <Box justify="center">
        <Typography
          fontWeight={700}
          lineHeight={17}
          color="#8AA399"
          onClick={onAddColor}
        >
          + เพิ่มตัวเลือก
        </Typography>
      </Box>
    </SpaceContainer>
  );
};

export default memo(OptionColor);
