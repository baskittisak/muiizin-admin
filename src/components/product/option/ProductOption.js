import { memo, useCallback, useMemo, useState } from "react";
import { SpaceContainer } from "../../../style/common";
import Options from "./Options";
import OptionType from "./OptionType";

const ProductOption = () => {
  const [option, setOption] = useState(null);
  const [optionEnable, setOptionEnable] = useState({
    size: false,
    color: false,
  });

  const onSetOptionEnable = useCallback((type, value) => {
    setOptionEnable((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const displayOption = useMemo(() => {
    if (option) {
      return (
        <OptionType
          sizeEnable={optionEnable.size}
          colorEnable={optionEnable.color}
          onSetEnble={onSetOptionEnable}
        />
      );
    } else {
      return <>Image</>;
    }
  }, [option, optionEnable.color, optionEnable.size, onSetOptionEnable]);

  return (
    <SpaceContainer direction="vertical" size={30}>
      <Options option={option} setOption={setOption} />
      {option !== null && displayOption}
    </SpaceContainer>
  );
};

export default memo(ProductOption);
