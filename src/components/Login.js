import { memo, useCallback, useMemo, useState } from "react";
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
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getNotification } from "../center_components/Notification";
import { useAuthContext } from "../store/AuthContext";

const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 65px);
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

  .ant-input {
    background-color: #f6f9f6;
    border: none;
    height: 50px;
    font-size: 24px;
  }

  .ant-input-group-addon {
    font-size: 18px;
    background-color: transparent;
    border: none;
    padding: 5px 11px 0;

    > span {
      cursor: pointer;
    }
  }

  :focus,
  .ant-input:focus {
    outline: none;
    box-shadow: none;
  }
`;

// const ForgetPassword = styled(Box)`
//   margin-top: 10px;
// `;

const Footer = styled(Box)`
  width: 100%;
  height: 65px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    #fff4d6;
  padding: 0 50px;
`;

const Login = () => {
  const { setToken, setUser } = useAuthContext();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSetData = useCallback((type, value) => {
    setAuthData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }, []);

  const onSetShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onLogIn = useCallback(async () => {
    setLoading(true);
    const { default: axios } = await import("axios");
    try {
      delete axios.defaults.headers.common["Authorization"];
      const { data } = await axios.post("/login", authData);
      const token = data?.token;
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("muiizin", JSON.stringify(data));
      setToken(token);
      setUser(data);
      onSetData("email", "");
      onSetData("password", "");
      getNotification({ type: "success", message: "เข้าสู่ระบบสำเร็จ" });
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data;
      const isNotfound = errorMsg === "User not found";
      const isInCorrect = errorMsg === "Incorrect password";
      const message = isNotfound
        ? "ไม่พบข้อมูลผู้ใช้งาน"
        : isInCorrect
        ? "รหัสผ่านไม่ถูกต้อง"
        : "เกิดข้อผิดพลาด";
      getNotification({ type: "error", message });
      setLoading(false);
    }
  }, [authData, setToken, setUser, onSetData]);

  const inputPassword = useMemo(
    () => (
      <InputContainer
        type={showPassword ? "text" : "password"}
        addonAfter={
          showPassword ? (
            <EyeOutlined onClick={onSetShowPassword} />
          ) : (
            <EyeInvisibleOutlined onClick={onSetShowPassword} />
          )
        }
        value={authData.password}
        onChange={(e) => onSetData("password", e.target.value)}
      />
    ),
    [showPassword, authData.password, onSetShowPassword, onSetData]
  );

  return (
    <>
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
            <InputContainer
              type="email"
              value={authData.email}
              onChange={(e) => onSetData("email", e.target.value)}
            />
          </div>
          <div>
            <Box align="baseline">
              <IconSvg src={key_icon} fontSize={16} margin="0 8px 0 0" />
              <Typography fontSize={24} lineHeight={26} color="#828282">
                รหัสผ่าน
              </Typography>
            </Box>
            {inputPassword}
            {/* <ForgetPassword direction="column" align="flex-end">
              <Typography color="#828282" underline>
                ลืมรหัสผ่าน?
              </Typography>
            </ForgetPassword> */}
          </div>
          <BaseButton
            width="100%"
            height={50}
            fontSize={20}
            bgColor="#044700"
            color="#FFF"
            disabled={!authData.email || !authData.password}
            loading={loading}
            onClick={onLogIn}
          >
            เข้าสู่ระบบ
          </BaseButton>
        </FormContainer>
      </Container>
      <Footer justify="space-between" align="center">
        <Typography fontSize={14} lineHeight={15} color="#044700">
          COPYRIGHT 2022, Muiizin Co., Ltd
        </Typography>
        <Typography fontSize={14} lineHeight={15} color="#044700">
          v 1.0.0
        </Typography>
      </Footer>
    </>
  );
};

export default memo(Login);
