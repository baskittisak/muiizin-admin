import { memo } from "react";
import UploadImage from "../../../center_components/UploadImage";
import { useQuery } from "../../../utils/useQuery";

const OptionImage = ({ images, onSetImage }) => {
  const productId = useQuery("productId");

  return (
    <UploadImage
      type="product"
      label="อัปโหลดรูปภาพสินค้า"
      labelDescription="(สามารถอัปโหลดได้มากกว่า 1 รูป)"
      isRequired
      imageList={productId ? images.map((image) => image?.image) : images}
      setImageList={(images) => onSetImage("add", images)}
      onDeleteImage={(index) => onSetImage("delete", "", index)}
    />
  );
};

export default memo(OptionImage);
