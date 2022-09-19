import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Modal } from "antd";
import API_URL from "../../config/api";
import OpenNotification from "../notification/OpenNotification";
import ArticleIcon from '@mui/icons-material/Article';
import ErrorMessage from "../ErrorMessage";

function Addstatus({
  isModalVisible,
  showModal,
  get_Status,
  allstatus,
  getId,
}) {
  const [status_name, setStatus_name] = useState("");
  const [msgErr1, setMsgErr1] = useState("");


  useEffect(() => {
    setStatus_name("");
    if (getId != null) {
      const findone = allstatus.find((obj) => {
        return obj.id === getId;
      });
      setStatus_name(findone.status);
    }
  }, []);

  const CreateStatus = async (e) => {
    if (status_name === "") {
      setMsgErr1("กรุณากรอกสถานะ");
      return;
    }
    setMsgErr1("");

    e.preventDefault();

    await API_URL.post(`api/setstatus/newStatus`, {
      status: status_name,
    })
      .then((res) => {
        OpenNotification({ message: "เพิ่มสถานะเรียบร้อย", type: 1 });
        showModal();
        get_Status();
        setStatus_name("");
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };

  const UpdateStatus = async (e) => {
    if(status_name===""){
      setMsgErr1("กรุณากรอกสถานะ");
      return;
    }
    setMsgErr1("");

    e.preventDefault();
    await API_URL.put(`api/setstatus/updateStatus/${getId}`, {
        status: status_name,
    })
      .then((res) => {
        OpenNotification({ message: "เพิ่มสถานะเรียบร้อย", type: 1 });
        showModal();
        get_Status();
        setStatus_name("");
        return res.data;
      })
      .catch((err) => {
         OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };

  return (
    <div>
      <Modal
        style={{
          top: 10,
        }}
        title={getId === null ? "เพิ่มสถานะ" : "แก้ไขสถานะ"}
        visible={isModalVisible}
        onOk={showModal}
        onCancel={showModal}
        width={600}
        footer={[
          <div className=" text-center flex justify-center">
            {getId === null ? (
              <button
                onClick={CreateStatus}
                className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-purple-500 hover:bg-purple-800 shadow-md"
              >
                เพิ่ม
              </button>
            ) : (
              <button
                onClick={UpdateStatus}
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
          <div className="w-full md:w-6/6 mx-auto my-5">
            <TextField
              value={status_name}
              onChange={(e) => setStatus_name(e.target.value)}
              id="outlined-textarea"
              size="small"
              label="สถานะ"
              autoComplete="off"
              placeholder="สถานะ"
              className="w-6/6"
              InputProps={{
                startAdornment: (
                  <ArticleIcon position="start" className="mr-5"></ArticleIcon>
                ),
              }}
              required
              fullWidth
            />
            {msgErr1 ? <ErrorMessage message={msgErr1} /> : <></>}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Addstatus;
