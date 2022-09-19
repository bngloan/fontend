import React, { useState, useEffect } from "react";
import entersiteimg from "../../image/bgblur.webp";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Modal } from "antd";
import API_URL from "../../config/api";
import OpenNotification from "../notification/OpenNotification";
import ErrorMessage from "../ErrorMessage";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { Link } from "react-router-dom";

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

function Nav4bankaccount({ userdata, get_user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankIndex, setBankIndex] = useState(-1);
  const [userbankname, setUserbankname] = useState("");
  const [idbank, setIdbank] = useState("");
  const [getBank, setGetBank] = useState([]);
  const [msgErr1, setMsgErr1] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    get_Bank();
  }, []);

  const get_Bank = async () => {
    await API_URL.get(`api/bank/allbank`)
      .then((res) => {
        setGetBank(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Bankuser = async () => {
    if (userbankname !== "" && idbank !== "" && bankIndex !== -1) {
      await await API_URL.post(`api/bank/newbankuser`, {
        name: userbankname,
        idbank: idbank,
        peopleId: userdata.id,
        bankId: bankIndex,
      })
        .then((res) => {
          get_user();
          OpenNotification({ message: "เพิ่มบัญชีธนาคารเรียบร้อย", type: 1 });
          return res.data;
        })
        .catch((err) => {
          OpenNotification({
            message: "เกิดข้อผิดพลาดในการเพิ่มบัญชี",
            type: 3,
          });
        });
    } else {
      setMsgErr1("กรอกข้อมูลให้ถูกต้องและครบถ้วน");
    }
  };

  const handleChangeStatus = (event) => {
    setBankIndex(event.target.value);
  };

  return (
    <div>
      <div
        className="h-32 md:h-52 text-center flex items-center justify-center bg-image"
        style={{
          backgroundImage: `url(${entersiteimg})`,
        }}
      >
        <p className=" my-auto bg-text w-full    drop-shadow-lg">
          ยืนยันข้อมูลบัญชี
        </p>
      </div>
      <div className="h-1 bg-orange-500 w-full"></div>

      <Modal
        title="เพิ่มบัญชีธนาคาร"
        open={isModalOpen}
        onOk={handleOk}
        width={500}
        onCancel={handleCancel}
        footer={[
          <div className=" text-center flex justify-center">
            <button
              onClick={Bankuser}
              className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-gray-900 hover:bg-gray-700 shadow-md"
            >
              บันทึก
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
        <form className="w-6/6 md:w-4/6 mx-auto mt-5">
          <FormControl className="w-full">
            <InputLabel className="my-auto">เลือกธนาคาร</InputLabel>
            {getBank !== null && (
              <Select
                name="bankIndex"
                size="small"
                label="โปรดเลือกธนาคาร"
                value={bankIndex === -1 ? "" : bankIndex}
                onChange={handleChangeStatus}
                fullWidth
              >
                {getBank.length !== 0 &&
                  getBank.map((value, index) => (
                    <MenuItem key={index} value={value.id}>
                      {value.bankname}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </FormControl>
          <div className="flex w-full md:w-6/6 mx-auto my-5">
            <TextField
              name="username"
              value={userbankname}
              onChange={(e) => setUserbankname(e.target.value)}
              id="outlined-textarea"
              size="small"
              label="ชื่อ - นามสกุล"
              onKeyPress={(e) =>
                /[0-9]/.test(e.key) && e.preventDefault()
              }
              autoComplete="off"
              className="w-6/6"
              fullWidth
            />
          </div>
          <div className="flex w-full md:w-6/6 mx-auto my-5">
            <TextField
              name="idbank"
              value={idbank}
              onChange={(e) => setIdbank(e.target.value)}
              id="outlined-textarea"
              type={"tel"}
              size="small"
              label="หมายเลขบัญชี"
              autoComplete="off"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              inputProps={{ maxLength: 20 }}
              className="w-6/6"
              fullWidth
            />
          </div>
          {msgErr1 ? <ErrorMessage message={msgErr1} /> : <></>}
        </form>
      </Modal>

      <div className="w-full  px-0  md:px-5 lg:px-11 ">
        <div className="shadow-lg my-1 md:my-7 w-full md:w-5/6 p-3 md:p-7 mx-1 md:mx-auto bg-white rounded-lg ">
          <div className="flex justify-between my-2">
            <p className="my-auto text-md font-semibold">บัญชีธนาคาร</p>
            {userdata.bankusers.length === 0 ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer inline-block text-sm font-black px-4 py-2 leading-none border rounded border-transparent text-white bg-sky-400 hover:bg-sky-600 mt-4 lg:mt-0"
              >
                <AccountBalanceIcon /> เพิ่มบัญชีธนาคาร
              </button>
            ) : (
              <div className="flex justify-end text-right">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                  className="mx-auto "
                >
                  <button className="px-7 py-3 bg-green-600 hover:bg-green-900 rounded-lg text-white ">
                    <MarkUnreadChatAltIcon
                      className="my-auto mr-3"
                      fontSize="small"
                    />{" "}
                    ติดต่อเจ้าหน้าที่
                  </button>
                </a>
              </div>
            )}
          </div>

          <TableContainer component={Paper} >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">เลขที่บัญชี</StyledTableCell>
                  <StyledTableCell align="center">
                    ชื่อ - นามสกุล
                  </StyledTableCell>
                  <StyledTableCell align="center">ธนาคาร</StyledTableCell>
                  <StyledTableCell align="right" >การจัดการ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userdata !== null && (
                  <>
                    {userdata.bankusers.length !== 0 ? (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          <div className="text-left">
                            <p className="text-md font-bold m-0 text-gray-700">
                              {userdata.bankusers[0].idbank}
                            </p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div>
                            <p className="text-md font-bold m-0 text-gray-700">
                              {userdata.bankusers[0].name}
                            </p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div>
                            <p className="text-md font-bold m-0 text-gray-700">
                              {userdata.bankusers[0].banks.bankname}
                            </p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="right" className="inline-block">
                          <Link to="/user/credit">
                            <button className=" text-center text-xs  text-white font-semibold  px-14 py-2 rounded-md bg-gray-900 hover:bg-gray-700 shadow-md">
                              สินเชื่อส่วนบุคคล
                            </button>
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      <TableRow>
                        {" "}
                        <TableCell
                          colSpan={7}
                          sx={{ textAlign: "center", fontSize: "20px" }}
                        >
                          ยังไม่มีข้อมูลบัญชีธนาคาร
                        </TableCell>{" "}
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <div className="flex justify-end text-right mt-2">
          {userdata.bankusers.length !== 0 ? (
            <p className="text-red-500">
              ***หมายเหตุ :
              หากต้องการแก้ไขข้อมูลบัญชีธนาคารโปรดติดต่อเจ้าหน้าที่
            </p>
            ):(<></>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav4bankaccount;
