import { memo, useMemo } from "react";
import { SpaceContainer } from "../../../style/common";
import Options from "./Options";
import OptionImage from "./OptionImage";
import OptionType from "./OptionType";

const ProductOption = ({
  optionEnable,
  sizeEnable,
  colorEnable,
  productOption,
  onSetEnble,
  onSetSize,
}) => {
  const displayOption = useMemo(() => {
    if (optionEnable) {
      return (
        <OptionType
          sizeEnable={sizeEnable}
          colorEnable={colorEnable}
          optionSize={productOption?.size}
          onSetEnble={onSetEnble}
          onSetSize={onSetSize}
        />
      );
    } else {
      return <OptionImage />;
    }
  }, [
    optionEnable,
    sizeEnable,
    colorEnable,
    productOption,
    onSetEnble,
    onSetSize,
  ]);

  return (
    <SpaceContainer direction="vertical" size={30}>
      <Options
        option={optionEnable}
        setOption={(value) => onSetEnble("enable", value)}
      />
      {optionEnable !== null && displayOption}
    </SpaceContainer>
  );
};

export default memo(ProductOption);
