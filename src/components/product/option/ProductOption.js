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
  onSetColor,
  onSetColorImage,
}) => {
  const displayOption = useMemo(() => {
    if (optionEnable) {
      return (
        <OptionType
          sizeEnable={sizeEnable}
          colorEnable={colorEnable}
          optionSize={productOption?.size}
          optionColor={productOption?.color}
          onSetEnble={onSetEnble}
          onSetSize={onSetSize}
          onSetColor={onSetColor}
          onSetColorImage={onSetColorImage}
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
    onSetColor,
    onSetColorImage,
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
