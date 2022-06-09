import { memo, useMemo } from "react";
import { SpaceContainer } from "../../../style/common";
import { useQuery } from "../../../utils/useQuery";
import Options from "./Options";
import OptionType from "./OptionType";
import OptionImage from "./OptionImage";
import OptionDropdown from "./OptionDropdown";

const ProductOption = ({
  optionEnable,
  sizeEnable,
  colorEnable,
  productOption,
  typeOption,
  isSizeOnly,
  setTypeOption,
  onSetEnable,
  onSetSize,
  onSetColor,
  onSetColorImage,
  onSetImage,
}) => {
  const productId = useQuery("productId");

  const displayOption = useMemo(() => {
    if (optionEnable) {
      return (
        <SpaceContainer direction="vertical" size={20}>
          <OptionDropdown
            productId={productId}
            typeOption={typeOption}
            setTypeOption={setTypeOption}
            onSetEnable={onSetEnable}
          />
          {typeOption && (
            <OptionType
              typeOption={typeOption}
              sizeEnable={sizeEnable}
              colorEnable={colorEnable}
              optionSize={productOption?.size}
              optionColor={productOption?.color}
              onSetSize={onSetSize}
              onSetColor={onSetColor}
              onSetColorImage={onSetColorImage}
            />
          )}
          {isSizeOnly && (
            <OptionImage
              images={productOption?.images}
              onSetImage={onSetImage}
            />
          )}
        </SpaceContainer>
      );
    } else {
      if (Array.isArray(productOption)) {
        return <OptionImage images={productOption} onSetImage={onSetImage} />;
      }
    }
  }, [
    productId,
    optionEnable,
    typeOption,
    setTypeOption,
    sizeEnable,
    colorEnable,
    productOption,
    isSizeOnly,
    onSetEnable,
    onSetSize,
    onSetColor,
    onSetColorImage,
    onSetImage,
  ]);

  return (
    <SpaceContainer direction="vertical" size={30}>
      {!productId && (
        <Options
          option={optionEnable}
          setOption={(value) => onSetEnable("enable", value)}
        />
      )}
      {optionEnable !== null && displayOption}
    </SpaceContainer>
  );
};

export default memo(ProductOption);
