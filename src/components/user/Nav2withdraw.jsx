import React from "react";
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
  TextField,
  styled,
} from "@mui/material";
import Swal from "sweetalert2";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useState } from "react";
import { Modal } from "antd";
import ErrorMessage from "../ErrorMessage";

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//***************************************************************************** */

function Nav2withdraw({ userdata }) {
  const [money, setMoney] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msgErr1, setMsgErr1] = useState("");

  const handleOpen = () =>{
    if(userdata.amount===0){
      Swal.fire({
        title: '<strong>คุณยังไม่มีรายการสินเชื่อ</strong>',
        icon: 'warning',
        html:
          "โปรดยื่นสินเชื่อส่วนบุคคลเพื่อทำการถอนได้",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
        '<a  rel="noopener noreferrer" href="/user/credit" class="mx-auto flex justify-center text-white asty1">'+
        ' <button>'+
        '<i class="fa fa-credit-card" aria-hidden="true"></i>&emsp;ไปยังหน้าสินเชื่อ</button></a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonAriaLabel: 'Thumbs down'
      });
      return;
    }
    setIsModalOpen(true);
  }

  const handleOk = () => {
    if(money>userdata.amount||money===0||money<1000){
      setMsgErr1("ป้อนจำนวนเงินถอนให้ถูกต้อง");
      return;
    }

      let timerInterval;
      Swal.fire({
        title: "กำลังยื่นเรื่องการถอนของคุณ",
        // html: "I will close in <b></b> milliseconds.",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
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
        }
      });
    
    setMsgErr1("");
    setMoney(0);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMsgErr1("");
  };

  const numberFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div>
      <div
        className="h-32 md:h-52 text-center flex items-center justify-center bg-image"
        style={{
          backgroundImage: `url(${entersiteimg})`,
   
        }}
      >
        <p className=" my-auto bg-text w-full    drop-shadow-lg">ถอน</p>
      </div>
      <div className="h-1 bg-orange-400 w-full"></div>

      <Modal
        title="ถอนเงิน"
        open={isModalOpen}
        onOk={handleOk}
        width={500}
        onCancel={handleCancel}
        footer={[
          <div className=" text-center flex justify-center">
            <button
              onClick={handleOk}
              className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-gray-900 hover:bg-gray-700 shadow-md"
            >
              ถอน
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
          <div className="flex-col w-full md:w-6/6 mx-auto my-5">
            <TextField
              name="money"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              id="outlined-textarea"
              type={"tel"}
              size="small"
              label="ป้อนจำนวนเงิน"
              autoComplete="off"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              inputProps={{ maxLength: 7 }}
              className="w-6/6"
              fullWidth
            />
            <p className="text-red-500 mt-2">*** ถอนขั้นต่ำ 1,000 บาท</p>
          </div>
          
          <div className="text-center p-3 bg-slate-100 rounded-md">
            <PriceChangeIcon fontSize="large" sx={{ my: 1 }} />
            <p className="text-lg ">ยอดเงินที่ถอนได้ของฉัน</p>

            <p className="text-2xl font-extrabold">
              ฿ {numberFormat(userdata.amount)}
            </p>
          </div>
          {msgErr1 ? (
              <div className="mt-5 mx-auto">
              <ErrorMessage  message={msgErr1} />
              </div>
             
            ) : (
              <></>
            )}
        </form>
      </Modal>

      <div className="w-full  px-0  md:px-11 ">
        <div className="shadow-lg my-1 md:my-7 w-full md:w-5/6 p-3 md:p-7 mx-1 md:mx-auto bg-white rounded-lg ">
          <div className="flex justify-between my-2">
            <p className="my-auto text-md font-semibold">รายการถอน</p>
            <button
              onClick={handleOpen}
              className="inline-block text-sm font-black px-4 py-2 leading-none border rounded border-transparent text-white bg-sky-400 hover:bg-sky-600 mt-4 lg:mt-0"
            >
              <PaymentsIcon sx={{ mr: 1 }} /> ถอน
            </button>
          </div>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">รหัสการถอน</StyledTableCell>
                  <StyledTableCell>จำนวนเงินที่ถอน</StyledTableCell>
                  <StyledTableCell align="center">เวลาทำการ</StyledTableCell>
                  <StyledTableCell align="center">
                    วงเงินที่เหลือ
                  </StyledTableCell>
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {" "}
                  <TableCell
                    colSpan={7}
                    sx={{ textAlign: "center", fontSize: "20px" }}
                  >
                    ยังไม่มีรายการถอน
                  </TableCell>{" "}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Nav2withdraw;
