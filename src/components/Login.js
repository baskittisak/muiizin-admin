import { memo } from "react";
import styled from "styled-components";
import { Box } from "../style/common";
import BaseImage from "../center_components/BaseImage";
import Typography from "../center_components/Typography";
import IconSvg from "../center_components/IconSvg";
import BaseButton from "../center_components/BaseButton";
import muiizin_logo_auth from "../assets/image/muiizin_logo_auth.png";
import { ReactComponent as email_icon } from "../assets/icons/email.svg";
import { ReactComponent as key_icon } from "../assets/icons/key.svg";
import { Input, Space } from "antd";

const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #fff4d6;
`;

const FormContainer = styled(Space)`
  width: 500px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 48px 33px;
  margin-top: 20px;
`;

const InputContainer = styled(Input)`
  background: #f6f9f6;
  height: 50px;
  border-radius: 5px;
  border: none;
  font-size: 24px;

  :focus {
    outline: none;
    box-shadow: none;
  }
`;

const ForgetPassword = styled(Box)`
  margin-top: 10px;
`;

const Login = () => {
  return (
    <Container direction="column" justify="center" align="center">
      <BaseImage src={muiizin_logo_auth} />
      <FormContainer direction="vertical" size={25}>
        <div>
          <Box align="baseline">
            <IconSvg src={email_icon} fontSize={16} margin="0 8px 0 0" />
            <Typography fontSize={24} lineHeight={26} color="#828282">
              อีเมล์
            </Typography>
          </Box>
          <InputContainer type="email" />
        </div>
        <div>
          <Box align="baseline">
            <IconSvg src={key_icon} fontSize={16} margin="0 8px 0 0" />
            <Typography fontSize={24} lineHeight={26} color="#828282">
              รหัสผ่าน
            </Typography>
          </Box>
          <InputContainer type="password" />
          <ForgetPassword direction="column" align="flex-end">
            <Typography lineHeight={17} color="#828282" underline>
              ลืมรหัสผ่าน?
            </Typography>
          </ForgetPassword>
        </div>
        <BaseButton
          width="100%"
          height={50}
          fontSize={20}
          bgColor="#044700"
          color="#FFF"
        >
          เข้าสู่ระบบ
        </BaseButton>
      </FormContainer>
    </Container>
  );
};

export default memo(Login);
