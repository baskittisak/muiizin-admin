import { memo } from "react";
import { Col, Row } from "antd";

const FormWrapper = ({ children }) => {
  return (
    <Row>
      <Col span={16} offset={4}>
        {children}
      </Col>
      <Col span={4} />
    </Row>
  );
};

export default memo(FormWrapper);
