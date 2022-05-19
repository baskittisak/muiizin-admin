import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../center_components/Frame";

const Product = () => {
  const navigate = useNavigate();

  return <Frame label="เพิ่มสินค้าใหม่" onBack={() => navigate("/")}></Frame>;
};

export default memo(Product);
