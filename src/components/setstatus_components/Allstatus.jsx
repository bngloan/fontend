import React, { useState, useEffect } from "react";
import API_URL from "../../config/api";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Table, Spin } from "antd";
import Swal from "sweetalert2";
import OpenNotification from "../notification/OpenNotification";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Addstatus from "./Addstatus";

function Allstatus() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getStatus, setGetStatus] = useState([]);
  const [dataSource, setDataSource] = useState(getStatus);
  const [getId, setGetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    get_Status();
  }, []);

  const get_Status = async () => {
    await API_URL.get(`api/setstatus/allStatus`)
      .then((res) => {
        const allStatus = res.data;
        if (allStatus.length !== 0) {
          allStatus.shift();
          allStatus.map((item, index) => {
            Object.assign(item, { key: index });
          });
        }
        setDataSource(allStatus);
        setGetStatus(allStatus);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
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

  const showDeleteConfirm = (id, getStatus) => {
    Swal.fire({
      title: "ยืนยันที่จะลบสถานะนี้?",
      text: getStatus.status,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        API_URL.delete(`api/setstatus/deleteStatus/${id}`)
          .then(() => {
            get_Status();
            OpenNotification({ message: "ลบเรียบร้อย", type: 1 });
          })
          .catch((err) => {
            OpenNotification({ message: "เกิดข้อผิดพลาด", type: 4 });
          });
      }
    });
  };

  const columns_status = [
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (status) => (
        <p className="text-xs ml-5  max-w-xl my-auto"> {status}</p>
      ),
    },
    {
      title: "การจัดการ",
      align: "center",
      dataIndex: "id",
    //   key:"id",
      render: (id, getStatus) => (
        <div className="flex justify-center">
          <IconButton onClick={() => showModalEdit(id)}>
            <DriveFileRenameOutlineIcon fontSize="small" color="warning" />
          </IconButton>

          <IconButton onClick={() => showDeleteConfirm(id, getStatus)}>
            <DeleteForeverIcon fontSize="small" color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "100%",minHeight:"600px" }}>
      {isModalVisible ? (
        <Addstatus
          isModalVisible={isModalVisible}
          showModal={showModal}
          get_Status={get_Status}
          allstatus={getStatus}
          getId={getId}
        />
      ) : (
        <></>
      )}
      <div className="w-full md:w-3/6  md:flex justify-between mb-2 mx-auto">
        <div className="flex justify-center mb-1 md:mb-0">
        <button
          onClick={showModal}
          className=" text-center py-2 px-5 rounded-lg shadow-lg bg-purple-500 hover:bg-purple-700 text-white text-xs md:text-lg"
        >
          <AddCircleIcon className="my-auto mr-5" />
          เพิ่มสถานะ
        </button>
        </div>
        
        <div className="p-3 bg-white rounded-lg shadow-sm w-full md:w-4/6 mr-4">
          <div className="flex  justify-center items-center">
            <div className="flex-auto w-70 ">
              <div className="flex items-center  w-6/6">
                <SearchIcon className="mr-3 " />
                <input
                  value={inputSearch}
                  className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                  placeholder="ค้นหาสถานะ"
                  onChange={(e) => {
                    const currValue = e.target.value;
                    setInputSearch(currValue);
                    const filteredData = dataSource.filter((entry) =>
                      entry.status.includes(currValue)
                    );
                    setGetStatus(filteredData);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/6 mx-auto">
        <Table
          size="middle"
          pagination={{ pageSize: 20 }}
          rowKey="id"
          columns={columns_status}
          dataSource={getStatus}
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

export default Allstatus;
