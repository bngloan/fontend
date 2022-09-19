import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import { getCurrentUser,logout } from "../services/auth.service";
import {
  TextField,
  Divider,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

import ErrorMessage from "./ErrorMessage";

import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Editaccount() {
  const [token] = useState(getCurrentUser());
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [insertpass, setInsertpass] = useState("");
  const [password, setPassword] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmnewpass, setConfirmnewpass] = useState("");
  const [msgErr1, setMsgErr1] = useState("");
  const [msgErr2, setMsgErr2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (token) {
      get_admin();
    }
  }, []);

  const get_admin = async () => {
    await API_URL.get(`api/admin/oneAdmin/${token.id}`)
      .then((res) => {
        const admin = res.data.user;
        if (admin !== null) {
          setName(admin.name);
          setUsername(admin.username);
          setPassword(admin.password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateUser = async (e) => {
    e.preventDefault();
    if(username.length===0){
        setMsgErr2("กรุณากรอก username");
      return;
    }
    if (password !== insertpass) {
      setMsgErr1("กรอกรหัสผ่านเดิมไม่ถูกต้อง");
      return;
    }
    setMsgErr1("");
    if (newpass !== confirmnewpass) {
      setMsgErr2("กรอกรหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    setMsgErr2("");
    e.preventDefault();
    await API_URL.put(`api/admin/updateAdmin/${token.id}`, {
      name: name === "" ? "" : name,
      username: username,
      password: newpass.length!==0?newpass:password,
    })
      .then((res) => {
        alert("แก้ไขข้อมูลบัญชีเรียบร้อย!!!! โปรดเข้าสู่ระบบใหม่");
        handleLogout();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  return (
    <div style={{ height: "700px" }} className="flex justify-center">
      <form className="w-full md:w-4/6 bg-white p-5 rounded-md">
        <div className="w-full mx-auto my-5">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            size="small"
            label="ชื่อ"
            autoComplete="off"
            placeholder="ชื่อ"
            className="w-6/6"
            InputProps={{
              startAdornment: (
                <FaceIcon position="start" className="mr-5"></FaceIcon>
              ),
            }}
            
            fullWidth
          />
        </div>
        <div className="w-full mx-auto my-5">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            size="small"
            label="Username"
            autoComplete="off"
            placeholder="Username"
            className="w-6/6"
            InputProps={{
              startAdornment: (
                <AccountBoxIcon
                  position="start"
                  className="mr-5"
                ></AccountBoxIcon>
              ),
            }}
            required
            fullWidth
          />
        </div>
        <Divider className="my-5" sx={{ borderBottomWidth: 4 }}>
        <Chip label="เปลี่ยนรหัสผ่าน" /></Divider> 
        <div className="w-full mx-auto my-5">
          <TextField
          name="password"
           size="small"
            
            autoComplete="off"
            label="รหัสผ่านเดิม"
            value={insertpass}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setInsertpass(e.target.value)}
            InputProps={{
              startAdornment: (
                <HttpsIcon
                  position="start"
                  className="mr-5"
                ></HttpsIcon>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          {msgErr1 ? <ErrorMessage message={msgErr1} /> : <></>}
        </div>
        <Divider className="" sx={{ borderBottomWidth: 4 }} />
        <div className="w-full mx-auto my-5">
          <TextField
          name="password"
           size="small"
            
            autoComplete="off"
            label="รหัสผ่านใหม่"
            value={newpass}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setNewpass(e.target.value)}
            InputProps={{
              startAdornment: (
                <HttpsIcon
                  position="start"
                  className="mr-5"
                ></HttpsIcon>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <div className="mt-5">
          <TextField
          
          name="password"
           size="small"
            
            autoComplete="off"
            label="ยืนยันรหัสผ่านใหม่"
            value={confirmnewpass}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirmnewpass(e.target.value)}
            InputProps={{
              startAdornment: (
                <HttpsIcon
                  position="start"
                  className="mr-5"
                ></HttpsIcon>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          </div>
          {msgErr2 ? <ErrorMessage message={msgErr2} /> : <></>}
        </div>
        <div className="text-center">
        <button
                onClick={UpdateUser}
                className="text-center text-white font-semibold  px-20 py-4 text-md rounded-md bg-gray-900 hover:bg-gray-800 shadow-md"
              >
                บันทึก
              </button>
        </div>

      </form>
    </div>
  );
}

export default Editaccount;
