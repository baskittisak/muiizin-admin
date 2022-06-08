import Modal from "antd/lib/modal";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";

export const getModalConfirm = ({ message, description, onConfirm }) => {
  Modal.confirm({
    title: message,
    icon: <ExclamationCircleOutlined />,
    content: description,
    onOk() {
      onConfirm();
    },
    okText: "ยืนยัน",
    cancelText: "ยกเลิก",
  });
};
