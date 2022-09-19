import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { Typography, FormControl, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/auth.service";
import Toast from "./Toast/Toast";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import logo from "../icon/BNG-logo.png";
import bg1 from "../image/bg1.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitLogin = async () => {
    await signin(username, password)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "เข้าสู่ระบบแล้ว",
        });
        navigate("/admin");
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div
      className="w-100 p-4  h-full"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundRepeat: "no-repeat",
        minHeight: "700px" ,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
      // style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
    >
      <div className="flex justify-center mb-5">
        <img src={logo} className="w-6/6 md:w-1/5" alt="logo" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 mx-auto text-center rounded-lg bg-gray-100 w-full md:w-1/3"
      >
        <Typography
          variant="h5"
          sx={{ mb: 2 }}
          component="div"
          style={{ color: "black" }}
        >
          เข้าสู่ระบบ
        </Typography>
        <div className=" mx-auto my-3 ">
          <Input
            size="large"
            className="ant-input-affix-wrapper form-input h-10 w-full rounded-md"
            autoComplete="off"
            placeholder="Username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mx-auto my-5">
          <Input.Password
            size="large"
            autoComplete="off"
            className="rounded-md h-10"
            placeholder="รหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockOutlined className="site-form-item-icon"  />}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <FormControl
          sx={{ m: 1, width: "80%" }}
    
          variant="standard"
        >
          {errorMessage ? <ErrorMessage message={errorMessage} /> : <></>}
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "75%" }}
     
          variant="standard"
        >
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              backgroundColor: "#000000",
              ":hover": {
                bgcolor: "#000033",
              },
              borderRadius: "10px",
            }}
          >
            เข้าสู่ระบบ
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
export default Login;
