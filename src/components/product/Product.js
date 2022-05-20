import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../center_components/FormWrapper";
import Frame from "../../center_components/Frame";
import StepsProduct from "./StepsProduct";

const Product = () => {
  const navigate = useNavigate();
  const [current] = useState(0);

  // const onNext = useCallback(() => {
  //   setCurrent((prev) => prev + 1);
  // }, []);

  // const onBack = useCallback(() => {
  //   setCurrent((prev) => prev - 1);
  // }, []);

  return (
    <Frame label="เพิ่มสินค้าใหม่" onBack={() => navigate("/")}>
      <FormWrapper>
        <StepsProduct current={current} />
      </FormWrapper>
    </Frame>
  );
};

export default memo(Product);
