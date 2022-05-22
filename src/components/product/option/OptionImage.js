import { memo } from "react";
import UploadImage from "../../../center_components/UploadImage";

const OptionImage = ({ images, onSetImage }) => {
  return (
    <UploadImage
      type="product"
      label="อัปโหลดรูปภาพสินค้า"
      labelDescription="(สามารถอัปโหลดได้มากกว่า 1 รูป)"
      isRequired
      imageList={images}
      setImageList={(images) => onSetImage("add", images)}
      onDeleteImage={(index) => onSetImage("delete", "", index)}
    />
  );
};

export default memo(OptionImage);
