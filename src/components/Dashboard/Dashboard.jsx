import React, { useEffect, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import API_URL from "../../config/api";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1F2937",
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

function Dashboard() {
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approv, setApprov] = useState(0);
  const [waitapprov, setWaitapprov] = useState(0);
  const [disapprov, setDisapprov] = useState(0);
  const [noloan, setNoloan] = useState(0);
  const [summary, setSummary] = useState(0);
  const [waitsummary, setWaitsummary] = useState(0);

  useEffect(() => {
    get_Alluser();
  }, []);

  const get_Alluser = async () => {
    var noloan = 0;
    var approv = 0;
    var disapprov = 0;
    var waitapprov = 0;
    var summary = 0;
    var waitsummary = 0;
    setLoading(true);
    await API_URL.get(`api/people/allPeople`)
      .then((res) => {
        const getalluser = res.data;

        if (getalluser.length !== 0) {
          getalluser.map((item) => {
            summary += item.amount;
            if (item.loanstates.length !== 0) {
              if (item.loanstates[0].status === 0)
                waitsummary += item.loanstates[item.loanstates.length-1].loanreq;
            }

            if (item.loanstates.length === 0) {
              noloan += 1;
            } else if (item.loanstates[item.loanstates.length-1].status === 1) {
              approv += 1;
            } else if (item.loanstates[item.loanstates.length-1].status === 0) {
              waitapprov += 1;
            } else if (item.loanstates[item.loanstates.length-1].status === 2) {
              disapprov += 1;
            }
            Object.assign(item, {
              loanreq:
                item.loanstates.length != 0 ? item.loanstates[item.loanstates.length-1].loanreq : 0.0,
              status:
                item.loanstates.length != 0 ? item.loanstates[0].status : 2,
              idbank:
                item.bankusers.length != 0 ? item.bankusers[0].idbank : null,
              idp: "BNG" + item.phone,
            });
          });
          getalluser.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
          if(getalluser.length>10){
            getalluser.length = 10;
          }
          
          setNoloan(noloan);
          setApprov(approv);
          setDisapprov(disapprov);
          setWaitapprov(waitapprov);
          setSummary(summary);
          setWaitsummary(waitsummary);
          setAllUser(getalluser);
          setAllUserBackup(getalluser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const numberFormat=(number)=>{
    return new Intl.NumberFormat().format(number);
  }

  return (
    <div style={{ height: "100%", minHeight: "600px" }}>
      <div className="md:flex">
        <div className="pl-1 pr-1 w-full  md:w-1/4 h-32 bg-green-700  rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">อนุมัติแล้ว</p>
              <div className="flex ">
                <p className="text-2xl my-auto">{approv} </p>
                <p className="ml-2 text-md  align-bottom">รายการ</p>
              </div>
            </div>
            <div className="my-auto truncate">
              <AssignmentTurnedInIcon
                style={{ fontSize: 60 }}
                className="text-green-700"
              />
            </div>
          </div>
        </div>

        <div className="pl-1 pr-1 w-full md:w-1/4 h-32 bg-yellow-500  rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">รออนุมัติ</p>
              <div className="flex ">
                <p className="text-2xl my-auto">{waitapprov} </p>
                <p className="ml-2 text-md  align-bottom">รายการ</p>
              </div>
            </div>
            <div className="my-auto truncate">
              <HourglassTopIcon
                style={{ fontSize: 60 }}
                className="text-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="pl-1 pr-1 w-full md:w-1/4 h-32 bg-red-500  rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">
                ไม่อนุมัติและยังไม่ได้กู้
              </p>
              <div className="flex ">
                <p className="text-2xl my-auto">{noloan + disapprov} </p>
                <p className="ml-2 text-md  align-bottom">รายการ</p>
              </div>
            </div>
            <div className="my-auto truncate">
              <DoDisturbOnIcon
                style={{ fontSize: 60 }}
                className="text-red-500"
              />
            </div>
          </div>
        </div>
        <div className="pl-1 pr-1 w-full  md:w-1/4 h-32 bg-green-400 rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">User ทั้งหมด</p>
              <p className="text-2xl my-auto">{allUser.length}</p>
            </div>
            <div className="my-auto truncate">
              <AssignmentIndIcon
                style={{ fontSize: 60 }}
                className="text-green-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex">
        <div className="pl-1 pr-1 w-full md:w-1/2 h-32 bg-sky-500  rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">
                จำนวนเงินที่อนุมัติแล้ว
              </p>
              <p className="text-2xl my-auto text-left">฿ {numberFormat(summary)}</p>
            </div>
            <div className="my-auto truncate">
              <AccountBalanceWalletIcon
                style={{ fontSize: 60 }}
                className="text-sky-500"
              />
            </div>
          </div>
        </div>
        <div className="pl-1 pr-1 w-full md:w-1/2 h-32 bg-gray-500  rounded-lg shadow-md mt-4 md:m-4">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto truncate">
              <p className="font-medium text-2xl my-auto">
                จำนวนเงินกู้รออนุมัติ
              </p>
              <p className="text-2xl my-auto text-left ">฿ {numberFormat(waitsummary)}</p>
            </div>
            <div className="my-auto truncate">
              <CurrencyExchangeIcon
                style={{ fontSize: 60 }}
                className="text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-4/6 mx-auto">
        <p className="text-center text-sm font-bold">User ล่าสุด</p>
        <TableContainer component={Paper} >
          <Table aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ลำดับ</StyledTableCell>
                <StyledTableCell>รหัสประจำตัว</StyledTableCell>
                <StyledTableCell align="left">ชื่อ - นามสกุล</StyledTableCell>
                <StyledTableCell align="center">วงเงินที่ต้องการกู้</StyledTableCell>
                <StyledTableCell align="center">เบอร์โทร</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                allUser.length !== 0 ? (
                  <>
                    {allUser.map((alluser, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          <p className="text-md font-bold m-0 text-gray-700">
                            {index + 1}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <p className="text-md font-bold m-0 text-gray-700">
                            {alluser.idp}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <p className="text-md font-bold m-0 text-gray-700">
                            {alluser.firstname} {alluser.lastname}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <p className="text-md font-bold m-0 text-gray-700">
                            {numberFormat(alluser.loanreq)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <p className="text-md font-bold m-0 text-gray-700">
                            {alluser.phone}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    {" "}
                    <TableCell
                      colSpan={7}
                      sx={{ textAlign: "center", fontSize: "20px" }}
                    >
                      ยังไม่มี User
                    </TableCell>{" "}
                  </TableRow>
                )
                // <TableBody sx={{mx:'auto',textAlign:"center"}}><p className='text-lg font-bold p-10'>No data.</p></TableBody>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dashboard;
