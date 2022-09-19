import React, { useState, useEffect } from "react";
import API_URL from "../../config/api";
import dayjs from "dayjs";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import OpenNotification from "../notification/OpenNotification";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function ReqLoan() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_Alluser();
    const interval = setInterval(() => {
      get_Alluser();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const allowLoan = async (loanreq, peopleId, id) => {
    await API_URL.post(`api/loan/updateloanuser`, {
      id: id,
      status: 1,
      peopleId: peopleId,
      loanreq: loanreq,
    })
      .then((res) => {
        OpenNotification({ message: "อนุมัติเรียบร้อย", type: 1 });
        get_Alluser();
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };
  const noLoan = async (loanreq, peopleId, id) => {
    await API_URL.post(`api/loan/updateloanuser`, {
      id: id,
      status: 2,
      peopleId: peopleId,
      loanreq: loanreq,
    })
      .then((res) => {
        OpenNotification({ message: "ไม่อนุมัติ", type: 2 });
        get_Alluser();
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };
  const numberFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const get_Alluser = async () => {
    setAllUser([]);
    setLoading(true);
    await API_URL.get(`api/loan/getreqloan`)
      .then((res) => {
        const getalluser = res.data;
        if (getalluser.length !== 0) {
          getalluser.map((item) => {
            Object.assign(item, {
              idp: "BNG" + item.people.phone,
            });
          });
          getalluser.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
          console.log(getalluser);
          setAllUser(getalluser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <div
      style={{ height: "100%", minHeight: "600px" }}
      className="fontFamilyKanit"
    >
      <button
        onClick={get_Alluser}
        className="bg-black hover:bg-gray-800 text-white shadow-md font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <AutorenewIcon className="fill-current w-4 h-4 mr-2"></AutorenewIcon>
        <span>โหลดข้อมูลใหม่</span>
      </button>
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          {allUser.length !== 0 ? (
            <div className="flex flex-wrap w-full">
              {allUser.map((val, index) => (
                <div className="w-full md:w-1/2 lg:w-1/3 " key={index}>
                  <div className="bg-white shadow-xl rounded-lg mx-0 md:mx-1 my-2 md:my-1">
                    <div className="p-5 flex divide-y divide-yellow-400 md:divide-y-8">
                      <div className="w-3/6 my-auto">
                        <p className="text-gray-500 m-0 text-base">เวลา :</p>
                        <p className="font-semibold mb-3 text-md">
                          {dayjs(val.createdAt).format("YYYY-MM-DD HH:mm")}
                        </p>
                        <p className="text-gray-500 m-0 text-base">
                          รหัสประจำตัว :
                        </p>
                        <p className="font-semibold mb-3 text-base">
                          {val.idp}
                        </p>
                        <p className="text-gray-500 m-0 text-base">
                          ชื่อ - นามสกุล :
                        </p>
                        <p className="font-semibold mb-3 text-base">
                          {val.people.firstname} {val.people.lastname}
                        </p>
                        <p className="text-gray-500 m-0 text-base">
                          เบอร์โทร :
                        </p>
                        <p className="font-semibold mb-3 text-base">
                          {val.people.phone}
                        </p>
                      </div>
                      <div className="w-3/6 m-1 md:m-5  p-3 md:p-7 bg-gray-200 rounded-md shadow-md">
                        <p className="font-semibold mb-3 text-xs md:text-md">
                          จำนวนวงเงินที่ต้องการกู้
                        </p>
                        <p className="text-2xl font-bold text-red-700">
                          {numberFormat(val.loanreq)}
                        </p>
                        <p className="text-gray-500 m-0 text-base">
                          สินเชื้อที่เลือก :
                        </p>
                        <p className="font-semibold mb-3 text-base">
                          อัตราดอกเบี้ย {val.loans.interest} %
                        </p>
                        <p className="font-semibold mb-3 text-base">
                          ระยะเวลาในการผ่อนชำระ {val.loans.longtime} เดือน
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 h-1 p-0 m-0"></div>
                    <div className="p-5 text-center">
                      <button
                        onClick={() =>
                          allowLoan(val.loanreq, val.people.id, val.id)
                        }
                        className="mx-3 py-2 px-6  bg-green-600  text-center font-medium rounded-md text-white hover:bg-green-800 drop-shadow-lg shadow-md"
                      >
                        อนุมัติ
                      </button>

                      <button
                        onClick={() =>
                          noLoan(val.loanreq, val.people.id, val.id)
                        }
                        className="mx-3 py-2 px-6 bg-red-600 text-center font-medium rounded-md text-white hover:bg-red-800 drop-shadow-lg shadow-md"
                      >
                        ไม่อนุมัติ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto flex-col justify-center w-full text-center my-10">
              <FolderOffIcon fontSize="large" />
              <p className="text-2xl text-center font-bold">
                ไม่มีข้อมูลรออนุมัติ
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReqLoan;
