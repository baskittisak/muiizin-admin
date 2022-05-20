import { memo } from "react";
import UploadImage from "../../../center_components/UploadImage";

const OptionImage = () => {
  return (
    <UploadImage
      label="อัปโหลดรูปภาพสินค้า"
      labelDescription="(สามารถอัปโหลดได้มากกว่า 1 รูป)"
      isRequired
    />
  );
};

export default memo(OptionImage);
