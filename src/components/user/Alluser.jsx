import React, { useState, useEffect } from "react";
import API_URL from "../../config/api";
import { Table, Spin, Tooltip, Tag } from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";

import OpenNotification from "../notification/OpenNotification";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import Adduser from "./Adduser";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Alluser() {
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getId, setGetId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState(true);

  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    get_Alluser();
  }, []);

  const switchChange = (id)=>{
    console.log(id);
    setChecked(!checked);
  }

  const numberFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

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

  const get_Alluser = async () => {
    setAllUser([]);
    setAllUserBackup([]);
    setLoading(true);
    await API_URL.get(`api/people/allPeople`)
      .then((res) => {
        const getalluser = res.data;
        if (getalluser.length !== 0) {
          getalluser.map((item) => {
            Object.assign(item, {
              loanreq:
                item.loanstates.length != 0
                  ? item.loanstates[item.loanstates.length - 1].loanreq
                  : 0.0,
              status:
                item.loanstates.length != 0
                  ? item.loanstates[item.loanstates.length - 1].status
                  : 3,
              idbank:
                item.bankusers.length != 0 ? item.bankusers[0].idbank : "",
              idp: "BNG" + item.phone,
            });
          });
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
      title: "ยืนยันที่จะลบ user นี้?",
      text: user.firstname + "\t\t\t" + user.lastname,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (user.imageprofile !== null) {
            let string = "";
            const array = user.imageprofile.split("\\");
            string = "./" + array.join("/");

            await API_URL.post(`api/people/deleteimageprofile`, {
              id: getId,
              imageprofileBackup: string,
            });
          }
        } catch (e) {}
        try {
          if (user.imagedriving !== null) {
            let string = "";
            const array = user.imagedriving.split("\\");
            string = "./" + array.join("/");

            await API_URL.post(`api/people/deleteimagedriving`, {
              id: getId,
              imagedrivingBackup: string,
            });
          }
        } catch (e) {}
        await API_URL.delete(`api/people/deletePeople/${id}`)
          .then(() => {
            get_Alluser();
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
      title: "ชื่อ - นามสกุล",

      render: (allUser) => (
        <div className="text-xs  max-w-xl my-auto">
          {allUser.firstname}
          <br />
          {allUser.lastname}
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: "รหัสประจำตัว",
      dataIndex: "idp",
      render: (idp) => <p className="text-xs  max-w-xl my-auto"> {idp}</p>,
    },
    {
      title: "ชื่อ",
      dataIndex: "firstname",
      render: (firstname) => (
        <p className="text-xs  max-w-xl my-auto"> {firstname}</p>
      ),
      responsive: ["sm"],
    },

    {
      title: "นามสกุล",
      dataIndex: "lastname",

      render: (lastname) => (
        <p className="text-xs text-black my-auto px-2">{lastname}</p>
      ),
      responsive: ["sm"],
    },
    {
      title: "หมายเลขบัญชี",
      dataIndex: "idbank",

      render: (idbank) => (
        <p className="text-xs text-black my-auto px-2">
          {idbank !== "" ? idbank : "-"}
        </p>
      ),
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phone",
      align: "center",

      render: (phone) => (
        <p className="text-xs text-black my-auto px-2">{phone}</p>
      ),
    },
    {
      title: "password",
      dataIndex: "password",
      align: "center",

      render: (password) => (
        <p className="text-xs text-black my-auto px-2">{password}</p>
      ),
    },

    {
      title: "วงเงินที่ถอนได้",
      dataIndex: "amount",
      align: "center",

      render: (amount) => (
        <p className="text-xs text-black my-auto px-2">
          {numberFormat(amount)}
        </p>
      ),
    },
    {
      title: "เปิด - ปิด",
      dataIndex: "use",
      align: "center",
      width: "10%",
      render: (use) => (
        <>
          {use === 1 ? (
            <CheckCircleIcon fontSize="small" className="m-1 text-green-600" />
          ) : (
            <CancelIcon fontSize="small" className="m-1 text-red-600" />
          )}
          {/* <div className="toggle-button-cover">
            <div className="button-cover">
              <div className="btnsty3 b2" id="button-13">
                <input type="checkbox" className="checkbox" defaultChecked={use === 1?false:true} onChange={switchChange(index)}/>
                <div className="knobs">
                  <span></span>
                </div>
                <div className="layer"></div>
              </div>
            </div>
          </div> */}
        </>
      ),
      filters: [
        { text: "เปิด", value: 1 },
        { text: "ปิด", value: 0 },
      ],
      onFilter: (value, record) => {
        return record.use === value;
      },
    },

    {
      title: "สถานะกู้",
      dataIndex: "status",
      align: "center",
      width: "10%",
      ellipsis: {
        showTitle: false,
      },
      render: (status) => (
        <div>
          {status == 1 ? (
            <Tag color="geekblue" className="text-sm">
              อนุมัติแล้ว
            </Tag>
          ) : status == 0 ? (
            <Tag color="orange" className="text-sm">
              รออนุมัติ
            </Tag>
          ) : status == 2 ? (
            <Tag color="red" className="text-sm">
              ไม่อนุมัติ
            </Tag>
          ) : (
            <Tag color="green" className="text-sm">
              ยังไม่ได้กู้
            </Tag>
          )}
        </div>
      ),
      filters: [
        { text: "อนุมัติแล้ว", value: 1 },
        { text: "รออนุมัติ", value: 0 },
        { text: "ไม่อนุมัติ", value: 2 },
        { text: "ยังไม่ได้กู้", value: 3 },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },

    {
      title: "การจัดการ",
      align: "center",
      dataIndex: "id",
      key: "id",
      render: (id, allUser) => (
        <div className="flex justify-center">
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
    <div style={{ height: "100%", minHeight: "600px" }}>
      {isModalVisible ? (
        <Adduser
          isModalVisible={isModalVisible}
          showModal={showModal}
          get_Alluser={get_Alluser}
          allUser={allUser}
          getId={getId}
        />
      ) : (
        <></>
      )}

      <div className="my-2 md:flex items-end">
        <div className="w-full md:w-2/3 hidden md:flex items-center justify-center mb-3 md:mb-0">
          <div className=" w-1/2 flex my-auto">
            <div className="w-5/6 flex bg-sky-900 rounded-md  px-2 shadow-lg">
              <div className="py-3">
                <PermContactCalendarIcon
                  fontSize="small"
                  className="text-white mx-5 my-auto"
                />
              </div>
              <div className="ml-7 my-auto py-1 h-auto">
                <p className="text-sm font-semibold text-white drop-shadow-2xl shadow-black my-auto mr-4">
                  All User
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
              เพิ่ม User
            </button>
          </div>
        </div>

        <div className="w-full  flex md:hidden items-center justify-center mb-3">
          <div className=" w-1/2 flex bg-sky-900 rounded-md  px-2 shadow-lg my-auto mr-1">
            <div className="py-3">
              <PermContactCalendarIcon
                fontSize="small"
                className="text-white mx-5 my-auto"
              />
            </div>
            <div className="ml-7 my-auto py-1 h-auto">
              <p className="text-xs font-semibold text-white drop-shadow-2xl shadow-black my-auto mr-4 txtinfo">
                All User
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
                <p className="txtinfo my-auto">เพิ่ม User</p>
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
            label="ค้นหารหัสประจำตัว, ชื่อ, เบอร์โทร, อื่นๆ"
            // value={newpass}
            // onChange={(e) => setNewpass(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon position="end"></SearchIcon>,
            }}
            fullWidth
            value={inputSearch}
            onChange={(e) => {
              const currValue = e.target.value;
              setInputSearch(currValue);
              const filteredData = allUserBackup.filter(
                (entry) =>
                  entry.firstname
                    .toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry.lastname
                    .toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry.idbank
                  .toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry.password
                    .toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry.idp.toLowerCase().includes(currValue.toLowerCase()) ||
                  entry.phone.includes(currValue)
              );
              setAllUser(filteredData);
            }}
          />
        </div>
      </div>

      <div>
        <Table
          size="middle"
          scroll={{
            x: 800,
          }}
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
  );
}

export default Alluser;
