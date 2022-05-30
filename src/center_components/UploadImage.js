import { createRef, memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Image, Space, Button, Spin } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Box } from "../style/common";
import Typography from "./Typography";

const Upload = styled(Box)`
  position: relative;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  width: 105px;
  height: 105px;
  border-radius: 2px;

  .ant-btn {
    background-color: #fafafa;
    width: 105px;
    height: 104px;
    outline: none;
    box-shadow: none;
    border: none;

    :hover,
    :focus,
    :active {
      color: initial;
      border: none;
    }
    > span {
      margin-top: 16px;
    }
  }

  .anticon {
    position: absolute;
    z-index: 1;
    top: 30%;
  }
`;

const ImageWrapper = styled(Space)`
  flex-wrap: wrap;
`;

const ManageImageWrapper = styled(Space)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0 0 0 / 50%);
  opacity: 0;
  justify-content: center;

  .ant-space-item {
    width: initial;
  }
`;

const ManageImage = styled(Box)`
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 50%);

  .anticon {
    font-size: 16px;
  }

  .anticon svg path {
    fill: #fff;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  :hover ${ManageImageWrapper} {
    opacity: 1;
    transition: 0.3s;
  }
`;

const CLOUND_NAME = "muiizin";
const UPLOAD_PRESET = "muiizin";

const UploadImage = ({
  type,
  label,
  labelDescription,
  fontSize = 18,
  lineHeight = 20,
  isRequired,
  maximum = 10,
  imageList,
  setImageList,
  onDeleteImage,
}) => {
  const inputRef = createRef();
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    async (e) => {
      const { default: axios } = await import("axios");
      setLoading(true);
      const file = await e.target.files[0];
      const payload = new FormData();
      payload.append("file", file);
      payload.append("folder", type);
      payload.append("upload_preset", UPLOAD_PRESET);
      try {
        const response = await axios({
          method: "POST",
          url: `https://api.Cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`,
          data: payload,
        });
        const url = response?.data?.secure_url;
        const newImageList = [...imageList];
        newImageList.push(url);
        setImageList(newImageList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    },
    [type, imageList, setImageList]
  );

  const onBrowseFile = useCallback(() => {
    inputRef.current.click();
  }, [inputRef]);

  const onPreview = useCallback((index) => {
    setActivePreview(index);
    setVisiblePreview(true);
  }, []);

  const totalImage = useMemo(() => {
    return imageList?.length;
  }, [imageList?.length]);

  return (
    <Space direction="vertical" size={5}>
      <Space size={4}>
        <Space size={0}>
          <Typography
            fontSize={fontSize}
            lineHeight={lineHeight}
            color="#828282"
          >
            {label}
          </Typography>
          {isRequired && (
            <Typography
              fontSize={fontSize}
              lineHeight={lineHeight}
              color="#F9414C"
            >
              *
            </Typography>
          )}
        </Space>
        {labelDescription && (
          <Typography
            fontSize={fontSize - 4}
            lineHeight={lineHeight - 4}
            color="#BDBDBD"
          >
            {labelDescription}
          </Typography>
        )}
      </Space>
      <Space direction="vertical" size={8}>
        <ImageWrapper size={16}>
          {imageList?.map((image, index) => (
            <ImageContainer key={index.toString()}>
              <Image
                width={105}
                height={105}
                src={image}
                preview={{
                  visible: visiblePreview && activePreview === index,
                  mask: null,
                  onVisibleChange: () => setVisiblePreview(false),
                }}
              />
              <ManageImageWrapper size={8}>
                <ManageImage
                  justify="center"
                  align="center"
                  onClick={() => onPreview(index)}
                >
                  <EyeOutlined />
                </ManageImage>
                <ManageImage
                  justify="center"
                  align="center"
                  onClick={() => onDeleteImage(index)}
                >
                  <DeleteOutlined />
                </ManageImage>
              </ManageImageWrapper>
            </ImageContainer>
          ))}
          {totalImage < maximum && (
            <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
              <Upload justify="center" align="center">
                <PlusOutlined />
                <Button onClick={onBrowseFile}>Upload</Button>
                <input
                  type="file"
                  ref={inputRef}
                  hidden
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleChange(e)}
                />
              </Upload>
            </Spin>
          )}
        </ImageWrapper>
      </Space>
    </Space>
  );
};

export default memo(UploadImage);
