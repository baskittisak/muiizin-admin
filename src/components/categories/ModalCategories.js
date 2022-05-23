import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import IconSvg from "../../center_components/IconSvg";
import TabsLanguage from "../../center_components/form/TabsLanguage";
import Input from "../../center_components/form/Input";
import BaseButton from "../../center_components/BaseButton";
import { ReactComponent as close_icon } from "../../assets/icons/close.svg";
import { Modal, Space } from "antd";

const ModalContainer = styled(Modal)`
  .ant-modal-title {
    color: #333333;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }

  .ant-modal-header,
  .ant-modal-footer {
    padding: 22px 32px;
  }

  .ant-modal-close {
    top: 8px;
    right: 32px;
  }

  .ant-modal-close-x {
    width: 18px;
    height: 18px;
  }
`;

const ModalCategories = ({ visible, value, onChange, onCancel, onOk }) => {
  const [language, setLanguage] = useState("th");

  const isDisabled = useMemo(() => {
    return value.en === "" || value.th === "";
  }, [value.en, value.th]);

  const onClose = useCallback(() => {
    setLanguage("th");
    onCancel();
  }, [onCancel]);

  const onSave = useCallback(() => {
    setLanguage("th");
    onOk();
  }, [onOk]);

  return (
    <ModalContainer
      title="เพิ่มหมวดหมู่"
      closeIcon={<IconSvg src={close_icon} />}
      visible={visible}
      onCancel={onClose}
      footer={
        <Space size={16}>
          <BaseButton
            width="95px"
            bgColor="#F2F2F2"
            color="#4F4F4F"
            onClick={onClose}
          >
            ยกเลิก
          </BaseButton>
          <BaseButton
            width="95px"
            bgColor="#044700"
            color="#fff"
            disabled={isDisabled}
            onClick={onSave}
          >
            บันทึก
          </BaseButton>
        </Space>
      }
    >
      <TabsLanguage activeKey={language} onChange={setLanguage}>
        <Input
          label={`ชื่อหมวดหมู่ภาษา${language === "th" ? "ไทย" : "อังกฤษ"}`}
          value={value[language]}
          isRequired
          maxLength={50}
          onChange={(value) => onChange(value, language)}
        />
      </TabsLanguage>
    </ModalContainer>
  );
};

export default memo(ModalCategories);
