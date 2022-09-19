import React, { useState, useEffect } from "react";
import { TextField, Divider } from "@mui/material";
import { register } from "../../services/auth.service";
import API_URL from "../../config/api";

import { Modal } from "antd";
import OpenNotification from "../notification/OpenNotification";
import ErrorMessage from "../ErrorMessage";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HttpsIcon from "@mui/icons-material/Https";

import FaceIcon from '@mui/icons-material/Face';

function AddAdmin({ isModalVisible, showModal, get_Alladmin, allUser, getId }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msgErr1, setMsgErr1] = useState("");
  const [msgErr2, setMsgErr2] = useState("");

  useEffect(() => {
    clearForm();
    if (getId != null) {
      const findone = allUser.find((obj) => {
        return obj.id === getId;
      });
      setForm(findone);
    }
  }, []);

  const setForm = (findone) => {
    setName(findone.name);
    setUsername(findone.username);
    setPassword(findone.password);
  };

  const clearForm = () => {
    setName("");
    setUsername("");
    setPassword("");
  };

  const CreateUser = async (e) => {
    if (username === "") {
      setMsgErr1("กรุณากรอก username");
      return;
    }
    setMsgErr1("");
    if (password === "") {
      setMsgErr2("กรุณากรอก password");
      return;
    }

    setMsgErr2("");

    e.preventDefault();

    try {
      const res = await register(name, username, password);
      if (res.status === 200) {
        OpenNotification({ message: "เพิ่ม admin เรียบร้อย", type: 1 });
        showModal();
        get_Alladmin();
      } else {
        alert(res.data);
      }
    } catch (err) {
      err.response.data.status === 400
        ? OpenNotification({ message: "มี admin นี้อยู่แล้ว", type: 3 })
        : OpenNotification({ message: "เกิดข้อผิดพลาด", type: 4 });
    }
  };

  const UpdateUser = async (e) => {
    if (username === "") {
      setMsgErr1("กรุณากรอก username");
      return;
    }
    setMsgErr1("");
    if (password === "") {
      setMsgErr2("กรุณากรอก password");
      return;
    }

    setMsgErr2("");
    e.preventDefault();
    await API_URL.put(`api/admin/updateAdmin/${getId}`, {
      name: name === "" ? "" : name,
      username: username,
      password: password,
    })
      .then((res) => {
        OpenNotification({ message: "แก้ไข admin เรียบร้อย", type: 1 });
        showModal();
        get_Alladmin();
        clearForm();
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มี admin นี้อยู่แล้ว", type: 3 });
      });
  };

  return (
    <div>
      <Modal
        style={{
          top: 10,
        }}
        title={getId === null ? "เพิ่ม admin" : "แก้ไข admin"}
        visible={isModalVisible}
        onOk={showModal}
        onCancel={showModal}
        width={900}
        footer={[
          <div className=" text-center flex justify-center">
            {getId === null ? (
              <button
                onClick={CreateUser}
                className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-purple-500 hover:bg-purple-800 shadow-md"
              >
                บันทึก
              </button>
            ) : (
              <button
                onClick={UpdateUser}
                className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-orange-500 hover:bg-orange-800 shadow-md"
              >
                แก้ไข
              </button>
            )}

            <div className="mx-5 md:mx-16 "></div>
            <button
              onClick={showModal}
              className="bg-transparent hover:bg-gray-100 text-black font-semibold  py-2 px-10 border border-purple-500 hover:border-transparent rounded"
            >
              ยกเลิก
            </button>
          </div>,
        ]}
      >
        <form className="w-6/6 md:w-4/6 mx-auto mt-5">
          <div className="flex w-full md:w-6/6 mx-auto my-5">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-textarea"
              size="small"
              label="ชื่อ"
              autoComplete="off"
              placeholder="ชื่อ"
              className="w-6/6"
              InputProps={{
                startAdornment: (
                  <FaceIcon
                    position="start"
                    className="mr-5"
                  ></FaceIcon>
                ),
              }}
              required
              fullWidth
            />
          </div>
          <Divider className="" sx={{ borderBottomWidth: 4 }} />
          <div className="w-full md:w-6/6 mx-auto my-5">
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-textarea"
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
            {msgErr1 ? <ErrorMessage message={msgErr1} /> : <></>}
          </div>

          <div className=" w-full md:w-6/6 mx-auto my-5">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              id="outlined-textarea"
              label="รหัสผ่าน"
              autoComplete="off"
              placeholder="รหัสผ่าน"
              className="w-6/6"
              InputProps={{
                startAdornment: (
                  <HttpsIcon position="start" className="mr-5"></HttpsIcon>
                ),
              }}
              required
              fullWidth
            />
            {msgErr2 ? <ErrorMessage message={msgErr2} /> : <></>}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddAdmin;
