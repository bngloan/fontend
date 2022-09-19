import React, { useState, useEffect } from "react";
import API_URL from "../../config/api";
import { Table, Spin } from "antd";

import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton, TextField } from "@mui/material";

import OpenNotification from "../notification/OpenNotification";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import AddAdmin from "./Addadmin";
import { getCurrentUser } from "../../services/auth.service";
import PersonIcon from '@mui/icons-material/Person';

function Alladmin() {
  const [token] = useState(getCurrentUser());
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getId, setGetId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    get_Alladmin();
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible === true) {
      setGetId(null);
    }
  };

  const showModalEdit = (id) => {
    setGetId(id);
    showModal();
  };

  const get_Alladmin = async () => {
    setLoading(true);
    await API_URL.get(`api/admin/allAdmin`)
      .then((res) => {
        const getalluser = res.data.users;
        if (getalluser.length !== 0) {
          getalluser.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
          setAllUser(getalluser);
          setAllUserBackup(getalluser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const showDeleteConfirm = (id, user) => {
    Swal.fire({
      title: "ยืนยันที่จะลบ admin นี้?",
      text: user.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        API_URL.delete(`api/admin/deleteAdmin/${id}`)
          .then(() => {
            get_Alladmin();
            OpenNotification({ message: "ลบเรียบร้อย", type: 1 });
          })
          .catch((err) => {
            console.log(err);
            OpenNotification({ message: "เกิดข้อผิดพลาด", type: 4 });
          });
      }
    });
  };

  const columns_alluser = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      render: (name) => <p className="text-xs  max-w-xl my-auto"> {name}</p>,
    },

    {
      title: "username",
      dataIndex: "username",

      render: (username) => (
        <p className="text-xs text-black my-auto px-2">{username}</p>
      ),
    },
    {
      title: "password",
      dataIndex: "password",
      render: (password) => (
        <p className="text-xs text-black my-auto px-2">{password}</p>
      ),
    },
    {
      title: "การจัดการ",
      align: "center",
      dataIndex: "id",
      width: "8%",
      key: "id",
      render: (id, allUser) => (
        <div className="flex">
          <IconButton onClick={() => showModalEdit(id)}>
            <DriveFileRenameOutlineIcon fontSize="small" color="warning" />
          </IconButton>

          <IconButton onClick={() => showDeleteConfirm(id, allUser)}>
            <DeleteForeverIcon fontSize="small" color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      {token != null && token.roles[0] === "ROLE_MOD" && (
        <div style={{ height: "100%", minHeight: "600px" }}>
          {isModalVisible ? (
            <AddAdmin
              isModalVisible={isModalVisible}
              showModal={showModal}
              get_Alladmin={get_Alladmin}
              allUser={allUser}
              getId={getId}
            />
          ) : (
            <></>
          )}

          <div className="my-2 md:flex items-end">
            {/* <div className="w-full md:w-2/3 flex items-center justify-center mb-3 md:mb-0">
              <div className="bg-orange-500 rounded-md  px-2 shadow-lg w-1/2 flex my-auto">
                <div className="py-3">
                  <AdminPanelSettingsIcon
                    fontSize="small"
                    className="text-white mx-5 my-auto"
                  />
                </div>
                <div className="ml-7 my-auto py-1">
                  <p className="text-sm font-semibold text-white drop-shadow-2xl shadow-black my-auto mr-4">
                    All Admin
                  </p>
                  <p className="text-md my-auto md:text-sm font-semibold text-white drop-shadow-2xl shadow-black">
                    {allUser.length}
                  </p>
                </div>
              </div>
              <div className=" md:my-auto w-1/2  mx-auto md:ml-10 text-center">
                <button
                  onClick={showModal}
                  className=" text-center py-3 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-xs md:text-md"
                >
                  <AddCircleIcon className="my-auto mr-5" />
                  เพิ่ม Admin
                </button>
              </div>
            </div> */}


            <div className="w-full md:w-2/3 hidden md:flex items-center justify-center mb-3 md:mb-0">
          <div className=" w-1/2 flex my-auto">
            <div className="w-5/6 flex bg-lime-900 rounded-md  px-2 shadow-lg">
              <div className="py-3">
                <PersonIcon
                  fontSize="small"
                  className="text-white mx-5 my-auto"
                />
              </div>
              <div className="ml-7 my-auto py-1 h-auto">
                <p className="text-sm font-semibold text-white drop-shadow-2xl shadow-black my-auto mr-4">
                  All Admin
                </p>
                <p className="truncate text-md my-auto md:text-sm font-semibold text-white drop-shadow-2xl shadow-black">
                  {allUser.length}
                </p>
              </div>
            </div>
          </div>
          <div className="my-auto w-1/2  mx-auto md:ml-10 text-center">
            <button
              onClick={showModal}
              className=" justify-center text-center py-3 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-sm md:text-md"
            >
              <AddCircleIcon className="my-auto mr-1 md:mr-5" />
              เพิ่ม Admin
            </button>
          </div>
        </div>

        <div className="w-full  flex md:hidden items-center justify-center mb-3">
          <div className=" w-1/2 flex bg-lime-900 rounded-md  px-2 shadow-lg my-auto mr-1">
            <div className="py-3">
              <AdminPanelSettingsIcon
                fontSize="small"
                className="text-white mx-5 my-auto"
              />
            </div>
            <div className="ml-7 my-auto py-1 h-auto">
              <p className="text-xs font-semibold text-white drop-shadow-2xl shadow-black my-auto mr-4 txtinfo">
                All Admin
              </p>
              <p className="truncate text-md my-auto md:text-sm font-semibold text-white drop-shadow-2xl shadow-black txtinfo">
                {allUser.length}
              </p>
            </div>
          </div>
          <div className="my-auto w-1/2  mx-auto md:ml-10 text-center">
            <button
              onClick={showModal}
              className=" w-full justify-center text-center py-3 md:py-2 px-10 rounded-md shadow-lg bg-red-500 hover:bg-red-700 text-white text-xs txtinfo"
            >
              <div className="flex justify-center">
                <AddCircleIcon
                  fontSize="small"
                  className="my-auto mr-1 md:mr-5"
                />
                <p className="txtinfo my-auto">เพิ่ม Admin</p>
              </div>
            </button>
          </div>
        </div>




            <div className="w-full md:w-1/3 mx-auto  flex">
              <TextField
                className="bg-white rounded-md"
                name="password"
                size="small"
                color="secondary"
                id="outlined-textarea"
                autoComplete="off"
                label="ค้นหา"
                value={inputSearch}
                // onChange={(e) => setNewpass(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon position="end"></SearchIcon>,
                }}
                fullWidth
                onChange={(e) => {
                  const currValue = e.target.value;
                  setInputSearch(currValue);
                  const filteredData = allUserBackup.filter(
                    (entry) =>
                      entry.name
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry.username
                        .toLowerCase()
                        .includes(currValue.toLowerCase()) ||
                      entry.password
                        .toLowerCase()
                        .includes(currValue.toLowerCase())
                  );
                  setAllUser(filteredData);
                }}
              />
            </div>
          </div>

          <div>
            <Table
              size="middle"
              pagination={{ pageSize: 15 }}
              rowKey="id"
              columns={columns_alluser}
              dataSource={allUser}
              loading={{
                indicator: (
                  <div>
                    <Spin size="large" />
                  </div>
                ),
                spinning: loading,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Alladmin;
