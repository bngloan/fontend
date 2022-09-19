import React, { useEffect, useState } from "react";
import API_URL from "../../config/api";
import { Tag } from "antd";
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
import OpenNotification from "../notification/OpenNotification";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

function Loanuser({ loanuser,get_Alluser }) {
  const [status, setStatus] = useState(-1);

  useEffect(() => {
    if (loanuser !== null) {

      loanuser.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
      if(loanuser.length>5){
          loanuser.length = 5;
      }
      setStatus(loanuser[0].status);
    }
  }, []);

  const numberFormat=(number)=>{
    return new Intl.NumberFormat().format(number);
  }

  const handleChangeStatus = async(event) => {
    setStatus(event.target.value);

    await API_URL.post(`api/loan/updateloanuser`, {
      id:loanuser[0].id,
      status: event.target.value,
      peopleId: loanuser[0].peopleId,
      loanreq: loanuser[0].loanreq
    })
      .then((res) => {
        OpenNotification({ message: "อัพเดทสถานะเรียบร้อย", type: 1 });
        get_Alluser()
        loanuser[0].status = event.target.value
        setStatus(event.target.value);
        return res.data;
      })
      .catch((err) => {
        OpenNotification({ message: "มีข้อผิดพลาด", type: 3 });
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>เลขที่เงินกู้ | วางแผน</StyledTableCell>
              <StyledTableCell align="center">จำนวน</StyledTableCell>
              <StyledTableCell align="center">
                จำนวนเงินผ่อนชำระ
              </StyledTableCell>
              <StyledTableCell align="center">ค่างวดเงินผ่อน</StyledTableCell>
              <StyledTableCell align="center">งวดต่อไป</StyledTableCell>
              <StyledTableCell align="center">จ่าย</StyledTableCell>
              <StyledTableCell align="center">สถานะ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loanuser !== null ? (
                <>
                {loanuser.map((item,index)=>
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
                        ฿{numberFormat((Math.round(
                          item.loanreq *
                            (item.loans.interest / 100) *
                            100
                        ) / 100)*item.loans.longtime)}<br/> Need to pay
                      </p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      <p className="text-md font-bold m-0 text-gray-700">
                      ฿
                        {numberFormat(Math.round(
                          item.loanreq *
                            (item.loans.interest / 100) *
                            100
                        ) / 100)}
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
                      <p className="text-blue-400 m-0 text-xs">Given : 0</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">...</StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      <p className="text-md font-bold m-0 text-gray-700">
                        ฿0.00
                      </p>
                      <p className="text-blue-400 m-0 text-xs">
                        ฿{numberFormat((Math.round(
                          item.loanreq *
                            (item.loans.interest / 100) *
                            100
                        ) / 100)*item.loans.longtime)} Remaining
                      </p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tag
                      color={
                        item.status=== 0
                          ? "orange"
                          : item.status=== 1
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
                )}
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
              )
              // <TableBody sx={{mx:'auto',textAlign:"center"}}><p className='text-lg font-bold p-10'>No data.</p></TableBody>
            }
          </TableBody>
        </Table>
      </TableContainer>
      {loanuser !== null && (
        <div className="flex w-full md:w-6/6 mx-auto mt-10">
          <TextField
            name="loanreq"
            autoComplete="off"
            size="small"
            id="outlined-textarea"
            label="ยอดที่ต้องการกู้"
            className="w-6/6"
            fullWidth
            value={loanuser !== null ? loanuser[0].loanreq : 0}
            disabled
          />
          <div className="w-8"></div>
          <FormControl className="w-full">
            <InputLabel className="my-auto">สถานะ</InputLabel>
            <Select
              name="status"
              size="small"
              label="สถานะ"
              value={status === -1 ? "" : status}
              onChange={handleChangeStatus}
              fullWidth
            >
              <MenuItem value={1}>อนุมัติ</MenuItem>
              <MenuItem value={2}>ไม่อนุมัติ</MenuItem>
              <MenuItem value={0}>รออนุมัติ</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default Loanuser;
