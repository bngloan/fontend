import React, { useState, useEffect } from "react";
import entersiteimg from "../../image/bgblur.webp";
import { Tabs, Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import API_URL from "../../config/api";
import loanimg1 from "../../image/loanselect/loan1.webp";
import loanimg2 from "../../image/loanselect/loan2.webp";
import loanimg3 from "../../image/loanselect/loan3.webp";
import loanimg4 from "../../image/loanselect/loan4.webp";
import loanimg5 from "../../image/loanselect/loan5.webp";
import { Modal,Tag } from "antd";
import ErrorMessage from "../ErrorMessage";
import OpenNotification from "../notification/OpenNotification";
import Swal from 'sweetalert2'
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f3f3f",
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

function Nav3credit({  userId }) {
  const [userdata, setUserdata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanreq, setLoanreq] = useState(0);
  const [allloan, setAllloan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("1");
  const [interest, setInterest] = useState(0);
  const [longtime, setLongtime] = useState(0);
  const [loanId, setLoanid] = useState(null);
  const [msgErr1, setMsgErr1] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleOk = (e) => {
    e.preventDefault();

    if(userdata.bankusers.length===0){
      Swal.fire({
        title: '<strong>ไม่มีข้อมูลบัญชีธนาคาร</strong>',
        icon: 'warning',
        html:
          "โปรดเพิ่มบัญชีธนาคารก่อนทำรายการ",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
        '<a  rel="noopener noreferrer" href="/user/bankaccount" class="mx-auto flex justify-center text-white asty1">'+
          ' <button>'+
          '<i class="fa fa-university" aria-hidden="true"></i>&emsp;เพิ่มบัญชีธนาคาร</button></a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonAriaLabel: 'Thumbs down'
      })
      return;
    }

    setMsgErr1("");
    if (loanreq < 30000 || loanreq > 5000000 ) {
      setMsgErr1("*** ป้อนจำนวนเงินกู้ให้ถูกต้อง ***");
      return;
    }
    if (userdata.loanstates.length !== 0) {
      if (userdata.loanstates[0].status === 2) {
        CreateLoan();
      } else if( userdata.loanstates[0].status === 1) {
        Swal.fire({
          title: '<strong>มีข้อผิดพลาดในการทำรายการ</strong>',
          icon: 'warning',
          html:
            "โปรดแจ้งเจ้าหน้าที่เพื่อทำการตรวจสอบ",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<a target="_blank" rel="noopener noreferrer" href="https://lin.ee/LtrrqGM" class="mx-auto flex justify-center text-white asty1">'+
            ' <button>'+
            '<i class="fa fa-comments" aria-hidden="true"></i>&emsp;ติดต่อเจ้าหน้าที่</button></a>',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonAriaLabel: 'Thumbs down'
        })
      }else{
        OpenNotification({ message: "คุณมีคำร้องอยู่แล้ว", type: 2 });
       
      }
    } else {
      CreateLoan();
    }

    setIsModalOpen(false);
    setValue("2");
    setLoanreq(0);
    window.scrollTo(0, 0);
    
  };

  const get_user = async () => {

    await API_URL.get(`api/people/oneUserdata/${userId}`)
      .then((res) => {
        const getoneuser = res.data.user;
        if (getoneuser !== null) {
          Object.assign(getoneuser, {
            loanlength:
              getoneuser.loanstates.length != 0 ? getoneuser.loanstates.length : 0,
            loanstatusallow:
              getoneuser.loanstates.length != 0
                ? getoneuser.loanstates[getoneuser.loanstates.length - 1].status === 1
                  ? 1
                  : 0
                : 0,
            banklength: getoneuser.bankusers.length != 0 ? 1 : 0,
            idp: "BNG" + getoneuser.phone,
          });
          if (getoneuser.loanstates.length !== 0) {
            getoneuser.loanstates.sort((a, b) =>
              b.createdAt > a.createdAt ? 1 : -1
            );
            if (getoneuser.loanstates.length > 5) {
              getoneuser.loanstates.length = 5;
            }
          }

          setUserdata(getoneuser);
        }
      })
      .catch((err) => {
        console.log(err);

      });

  };

  const CreateLoan = async () => {


    await API_URL.post(`api/loan/newloan`, {
      loanreq: loanreq,
      peopleId: userdata.id,
      loanId: loanId,
    })
      .then((res) => {
        OpenNotification({ message: "ยื่นคำร้องเรียบร้อย", type: 1 });
        get_user();
        setValue("2");
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (index) => {
    setIsModalOpen(true);
    setLongtime(allloan[index].longtime);
    setInterest(allloan[index].interest);
    setLoanid(allloan[index].id);
  };

  useEffect(() => {
    getLoan();
    get_user();
  }, []);

  const getLoan = async () => {
    setLoading(true);
    await API_URL.get(`api/loan/getallloan`)
      .then((res) => {
        setAllloan(res.data);
        return res.data;
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
    <div>
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div
        className="h-32 md:h-52 text-center flex items-center justify-center bg-image"
        style={{
          backgroundImage: `url(${entersiteimg})`,
        }}
      >
        <p className=" my-auto bg-text w-full    drop-shadow-lg">สินเชื่อ</p>
      </div>
          <div className="h-1 bg-orange-400 w-full"></div>
          <Modal
            title="สินเชื่อ"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <div className=" text-center flex justify-center">
                <button
                  onClick={handleOk}
                  className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-gray-900 hover:bg-gray-700 shadow-md"
                >
                  ยื่นคำร้อง
                </button>
                <div className="mx-5 md:mx-16 "></div>
                <button
                  onClick={handleCancel}
                  className="bg-transparent hover:bg-gray-100 text-black font-semibold  py-2 px-10 border border-gray-900 hover:border-transparent rounded"
                >
                  ยกเลิก
                </button>
              </div>,
            ]}
          >
            <div className="flex w-full md:w-6/6 mx-auto my-5">
              <OutlinedInput
               sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                id="outlined-adornment-amount"
                value={loanreq}
                onChange={(e) => setLoanreq(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">฿</InputAdornment>
                }
                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                inputProps={{ maxLength: 7 }}
                label=" "
                placeholder="30,000 - 5,000,000"
                fullWidth
              />
            </div>
            <p className="text-red-700">
              *** จำนวนเงินกู้ 30,000 ถึง 5,000,000
            </p>
            <p className="font-bold">อัตราดอกเบี้ย {interest} %</p>
            <p className="font-bold">ระยะเวลาในการผ่อนชำระ {longtime} เดือน</p>
            {msgErr1 ? (
              <div className="mt-5 mx-auto flex justify-end">
              <ErrorMessage  message={msgErr1} />
              </div>
             
            ) : (
              <></>
            )}
          </Modal>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 0 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="white"
                indicatorColor="primary"
                className="p-1 mx-auto text-center bg-gray-800 text-white"
                centered
              >
                <Tab label="สินเชื่อ" value="1" />
                <Tab label="ประวัติ" value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <div className="w-full px-4 py-3 md:px-10 lg:px-28">
                <div className="flex flex-wrap w-full ">
                  <div className="w-full md:w-1/3 rounded-md ">
                    <div className="md:px-4">
                      <img
                        src={loanimg1}
                        alt="loan1"
                        className="rounded-md relative"
                      />
                      <div className="flex justify-center my-2  divide-y divide-y-reverse divide-green-400 text-center ">
                        <button
                          onClick={() => handleSelect(0)}
                          className="py-3 px-20  text-white font-medium text-base shadow-2xl drop-shadow-xl rounded-md bg-green-600 hover:bg-green-700"
                        >
                          เลือกยอดกู้
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 rounded-md ">
                    <div className="md:px-4">
                      <img
                        src={loanimg2}
                        alt="loan1"
                        className="rounded-md relative"
                      />
                      <div className="flex justify-center my-2  divide-y divide-y-reverse divide-green-400 text-center ">
                        <button
                          onClick={() => handleSelect(1)}
                          className="py-3 px-20  text-white font-medium text-base shadow-2xl drop-shadow-xl rounded-md bg-green-600 hover:bg-green-700"
                        >
                          เลือกยอดกู้
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 rounded-md ">
                    <div className="md:px-4">
                      <img
                        src={loanimg3}
                        alt="loan1"
                        className="rounded-md relative"
                      />
                      <div className="flex justify-center my-2  divide-y divide-y-reverse divide-green-400 text-center ">
                        <button
                          onClick={() => handleSelect(2)}
                          className="py-3 px-20  text-white font-medium text-base shadow-2xl drop-shadow-xl rounded-md bg-green-600 hover:bg-green-700"
                        >
                          เลือกยอดกู้
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex justify-center mt-0 md:mt-6">
                    <div className="w-full md:w-1/3 rounded-md ">
                      <div className="md:px-4">
                        <img
                          src={loanimg4}
                          alt="loan1"
                          className="rounded-md relative"
                        />
                        <div className="flex justify-center my-2  divide-y divide-y-reverse divide-green-400 text-center ">
                          <button
                            onClick={() => handleSelect(3)}
                            className="py-3 px-20  text-white font-medium text-base shadow-2xl drop-shadow-xl rounded-md bg-green-600 hover:bg-green-700"
                          >
                            เลือกยอดกู้
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 rounded-md ">
                      <div className="md:px-4">
                        <img
                          src={loanimg5}
                          alt="loan1"
                          className="rounded-md relative"
                        />
                        <div className="flex justify-center my-2  divide-y divide-y-reverse divide-green-400 text-center ">
                          <button
                            onClick={() => handleSelect(4)}
                            className="py-3 px-20  text-white font-medium text-base shadow-2xl drop-shadow-xl rounded-md bg-green-600 hover:bg-green-700 "
                          >
                            เลือกยอดกู้
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <div className="w-full  px-0  md:px-11 ">
                <div className="shadow-lg my-1 md:my-7 w-full md:w-5/6 p-3 md:p-7 mx-1 md:mx-auto bg-white rounded-lg ">
                  <div className="flex my-2">
                    <p className="my-auto text-md font-semibold">
                      รายการสินเชื่อ
                    </p>
                  </div>

                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            เลขที่เงินกู้ | วางแผน
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            จำนวน
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            จำนวนเงินผ่อนชำระ
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            ค่างวดเงินผ่อน
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            งวดต่อไป
                          </StyledTableCell>
                          <StyledTableCell align="center">จ่าย</StyledTableCell>
                          <StyledTableCell align="center">
                            สถานะ
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {userdata!==null?(<>
                        {userdata.loanstates.length!==0 ? (
                          <>
                            {userdata.loanstates.map((item, index) => (
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  <div className="text-left">
                                    <p className="text-md font-bold m-0 text-gray-700">
                                      {item.idloanstate}
                                    </p>
                                    <p className="text-blue-400 m-0 text-xs">
                                      สินเชื่อส่วนบุคคล
                                    </p>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <div>
                                    <p className="text-md font-bold m-0 text-gray-700">
                                      ฿{numberFormat(item.loanreq)}
                                    </p>
                                    <p className="text-blue-400 m-0 text-xs">
                                      ฿
                                      {numberFormat(
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
                                      {numberFormat(
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
                                      {numberFormat(
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
                        </>):(<></>)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </>
      )}
    </div>
  );
}

export default Nav3credit;
