import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import entersiteimg from "../../image/bgblur.webp";
import bgcard from "../../image/card-bg7.jpg";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import configapi from "../../config/configapi";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenNotification from "../notification/OpenNotification";
import { Link } from "react-router-dom";
import {
  Table,
  InputAdornment,
  OutlinedInput,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import { Tag } from "antd";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1E293B",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Nav1dashboard({ userdata }) {
  const numberFormat = (number) => {
    return new Intl.NumberFormat().format(number) + ".00";
  };

  const numberFormat2 = (number) => {
    return new Intl.NumberFormat().format(number);
  };


  

  const copytoClipboard = () => {
    OpenNotification({ message: "คัดลอกลิงค์เรียบร้อย", type: 1 });
    navigator.clipboard.writeText(`${configapi.API_SERVER}register`);
  };
  return (
    <div>
      <div
        className="h-32 md:h-52 text-center flex items-center justify-center bg-image"
        style={{
          backgroundImage: `url(${entersiteimg})`,
          
        }}
      >
        <p className=" my-auto bg-text w-full    drop-shadow-lg">หน้าหลัก</p>
      </div>

      <div className="h-1 bg-orange-400 w-full"></div>
      <div className="md:flex  justify-center flex-wrap">
        <div className="w-full md:w-1/2 max-h-44 p-3 flex justify-center">
          <div
            className="rounded-lg w-full md:w-3/4  bg-blue-900 p-8  shadow-lg text-center "
            style={{
              backgroundImage: `url(${bgcard})`,
              backgroundPosition: "bottom",
              backgroundSize:"cover"
            }}
          >
            <p className="text-base md:text-lg text-black font-black">
              รหัสประจำตัว
            </p>
            <p className="text-base md:text-2xl text-black font-black">
              {userdata.idp}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 max-h-44 p-3 flex justify-center ">
          <Link
            to="/user/withdraw"
            className="rounded-lg w-full md:w-3/4   bg-blue-900 p-8  shadow-lg  "
            style={{
              backgroundImage: `url(${bgcard})`,
              backgroundPosition: "bottom",
              backgroundSize:"cover"
            }}
          >
            <p className="text-base md:text-lg text-black font-black">
              จำนวนเงินที่ถอนได้
            </p>
            <p className="text-base md:text-2xl text-black font-black">
              ฿ {numberFormat(userdata.amount)}
            </p>
          </Link>
        </div>
        <div className="md:flex w-full px-0 md:px-14">
          <div className="w-full md:w-1/3 max-h-44 p-3 flex justify-center hover:-mt-2">
            <Link
              to="/user/bankaccount"
              className="rounded-lg w-full  bg-blue-900 p-8  shadow-lg  "
              style={{
                backgroundImage: `url(${bgcard})`,
                backgroundPosition: "center",
                backgroundSize:"cover"
              }}
            >
              <div className="flex">
                <div className="w-3/4 text-left">
                  <p className="text-base md:text-lg text-black font-black">
                    ธนาคาร
                  </p>
                  <p className="text-base md:text-2xl text-black font-black">
                    {userdata.banklength} บัญชี
                  </p>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <AccountBalanceIcon fontSize="large" className="text-black" />
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full md:w-1/3 max-h-44 p-3 flex justify-center hover:-mt-2">
            <Link
              to="/user/credit"
              className="rounded-lg w-full  bg-blue-900 p-8  shadow-lg "
              style={{
                backgroundImage: `url(${bgcard})`,
              backgroundPosition: "center",
              backgroundSize:"cover"
              }}
            >
              <div className="flex">
                <div className="w-3/4 text-left">
                  <p className="text-base md:text-lg text-black font-black">
                    สินเชื่อ
                  </p>
                  <p className="text-base md:text-2xl text-black font-black">
                    {userdata.loanlength} รายการ
                  </p>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <MonetizationOnIcon fontSize="large" className="text-black" />
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full md:w-1/3 max-h-44 p-3 flex justify-center hover:-mt-2">
            <Link
              to="/user/credit"
              className="rounded-lg w-full  bg-blue-900 p-8  shadow-lg  "
              style={{
                backgroundImage: `url(${bgcard})`,
              backgroundPosition: "center",
              backgroundSize:"cover"
              }}
            >
              <div className="flex">
                <div className="w-3/4 text-left">
                  <p className="text-base md:text-lg text-black font-black">
                    อนุมัติแล้ว
                  </p>
                  <p className="text-base md:text-2xl text-black font-black">
                    {userdata.loanstatusallow} รายการ
                  </p>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <AssignmentTurnedInIcon
                    fontSize="large"
                    className="text-black"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full p-1 md:p-10">
          <div className="shadow-md w-full md:w-4/6 rounded-md mx-auto">
            <div className="bg-white p-3 md:p-6 rounded-md">
              <p className="text-black text-lg font-bold">ลิงค์แนะนำเพื่อน</p>
              <div className="w-full bg-slate-800 rounded-lg ">
                <div className="flex items-center  py-2 w-100">
                  <input
                    className=" appearance-none bg-transparent border-none w-full text-white font-bold mr-3 py-1 px-2 leading-tight focus:outline-none rounded-lg"
                    type="url"
                    defaultValue={`${configapi.API_SERVER}user/?=${userdata.idp}`}
                    disabled
                    placeholder="LINK"
                    aria-label="LINK"
                  />
                  <button
                    className="flex-shrink-0 mr-5 bg-blue-700 hover:bg-blue-500 border-blue-700 hover:border-blue-500 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    onClick={copytoClipboard}
                  >
                    <ContentCopyIcon className="mr-2" />
                    คัดลอก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full ">
            <div className="shadow-lg my-1 md:my-7 w-full md:w-5/6 p-3 md:p-7 mx-1 md:mx-auto bg-white rounded-lg ">
              <div className="flex my-2">
                <p className="my-auto text-md font-semibold">รายการสินเชื่อ</p>
              </div>

              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ชื่อ - นามสกุล</StyledTableCell>
                      <StyledTableCell align="center">จำนวน</StyledTableCell>
                      <StyledTableCell align="center">
                        จำนวนเงินผ่อนชำระ
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ค่างวดเงินผ่อน
                      </StyledTableCell>
                      <StyledTableCell align="center">งวดต่อไป</StyledTableCell>
                      <StyledTableCell align="center">จ่าย</StyledTableCell>
                      <StyledTableCell align="center">สถานะ</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userdata.loanstates.length !== 0 ? (
                      <>
                        {userdata.loanstates.map((item, index) => (
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              <div className="text-left">
                                <p className="text-md font-bold m-0 text-gray-700">
                                  {userdata.firstname}  {userdata.lastname}
                                </p>
                                <p className="text-blue-400 m-0 text-xs">
                                  สินเชื่อส่วนบุคคล
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div>
                                <p className="text-md font-bold m-0 text-gray-700">
                                  ฿{numberFormat2(item.loanreq)}
                                </p>
                                <p className="text-blue-400 m-0 text-xs">
                                  ฿
                                  {numberFormat2(
                                    (Math.round(
                                      item.loanreq+( item.loanreq *
                                        (item.loans.interest / 100))
                                    ))
                                  )}
                                  <br /> Need to pay
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div>
                                <p className="text-md font-bold m-0 text-gray-700">
                                  ฿
                                  {numberFormat2(
                                    (Math.round(
                                      (item.loanreq+( item.loanreq *
                                        (item.loans.interest / 100)))/item.loans.longtime
                                    ))
                                  )}
                                </p>
                                <p className="text-blue-400 m-0 text-xs">
                                  In Every {item.loans.longtime} Months
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div>
                                <p className="text-md font-bold m-0 text-gray-700">
                                  Total : {item.loans.longtime}
                                </p>
                                <p className="text-blue-400 m-0 text-xs">
                                  Given : 0
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              ...
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div>
                                <p className="text-md font-bold m-0 text-gray-700">
                                  ฿0.00
                                </p>
                                <p className="text-blue-400 m-0 text-xs">
                                  ฿
                                  {numberFormat2(
                                    (Math.round(
                                      item.loanreq+( item.loanreq *
                                        (item.loans.interest / 100))
                                    ))
                                  )}{" "}
                                  Remaining
                                </p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Tag
                                color={
                                  item.status === 0
                                    ? "orange"
                                    : item.status === 1
                                    ? "geekblue"
                                    : "red"
                                }
                              >
                                {item.status === 0
                                  ? "รออนุมัติ"
                                  : item.status === 1
                                  ? "อนุมัติแล้ว"
                                  : "ไม่อนุมัติ"}
                              </Tag>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </>
                    ) : (
                      <StyledTableRow>
                        {" "}
                        <TableCell
                          colSpan={7}
                          sx={{ textAlign: "center", fontSize: "20px" }}
                        >
                          ยังไม่มีการกู้
                        </TableCell>{" "}
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav1dashboard;
