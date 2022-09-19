import React from "react";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import API_URL from "../../config/api";
import OpenNotification from "../notification/OpenNotification";
import {
  OutlinedInput,

  TextField
} from "@mui/material";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(2);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [useaddress, setUseaddress] = useState("");
  const [idcard, setIdcard] = useState("");

  const [loginpassword, setLoingPassword] = useState("");
  const [loginphone, setLoginPhone] = useState("");

  const [msgErr1, setMsgErr1] = useState("");
  const [msgErr2, setMsgErr2] = useState("");

  const CreateUser = async (e) => {
    setMsgErr1("");
    if (
      firstname === "" ||
      lastname === "" ||
      phone === "" ||
      password === "" ||
      cpassword === "" ||
      useaddress === "" ||
      city === "" ||
      zipcode === ""
    ) {
      setMsgErr1("***กรอกข้อมูลให้ครบถ้วน***");
      return;
    }
    if (phone.length !== 10) {
      setMsgErr1("***กรอกข้อมูลเบอร์โทรให้ครบถ้วน***");
      return;
    }
    if (zipcode.length !== 5) {
      setMsgErr1("***กรอกข้อมูลรหัสไปรษณีย์ให้ครบถ้วน***");
      return;
    }
    if (password.length < 8) {
      setMsgErr1("***กรุณากรอกรหัสผ่านด้วยและมีอย่างน้อย 8 ตัวอักษร***");
      return;
    }
    if (password !== cpassword) {
      setMsgErr1("***กรุณากรอกรหัสผ่านให้ตรงกัน***");
      return;
    }

    await API_URL.post(`api/people/newPeople`, {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      password: password,
      useaddress: useaddress + " " + city + " " + zipcode,
      use: 1,
      imageprofile: null,
      imagefront: null,
      imageback: null,
    })
      .then((res) => {
        OpenNotification({
          message: "สมัครสมาชิกเรียบร้อย โปรดเข้าสู่ระบบ",
          type: 1,
        });
        setOpenTab(2);
        clearForm();
        setLoginPhone(phone);
        setLoingPassword(password);
      })
      .catch((err) => {
        err.response.data.status === 400
          ? OpenNotification({ message: "มีผู้ใช้ใช้เบอร์โทรนี้แล้ว", type: 3 })
          : OpenNotification({ message: "เกิดข้อผิดพลาด", type: 4 });
      });
  };

  const userloing = async (e) => {
    e.preventDefault();
    await API_URL.post(`api/people/onePeople`, {
      phone: loginphone,
      password: loginpassword,
    })
      .then((res) => {
        localStorage.setItem(
          "awesomeLeadsTokenId",
          JSON.stringify(res.data.user.id)
        );
        window.location.reload();
      })
      .catch((err) => {
        err.response.data.message === "user disable!"
          ? OpenNotification({ message: "User ถูกปิดใช้งาน", type: 3 })
          : setMsgErr2("เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง");
      });
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setPassword("");
    setCity("");
    setZipcode("");
    setUseaddress("");
    setPhone("");
    setCpassword("");
    setIdcard("");
  };

  return (
    <>
      <div className="flex flex-wrap fontFamilyKanit">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "myFont text-md font-bold uppercase px-5 py-2 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-green-600 hover:text-green-300"
                    : "text-green-600  bg-white hover:text-green-900")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                สมัครสมาชิก
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "myFont text-md font-bold uppercase px-5 py-2 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-green-600 hover:text-green-300"
                    : "text-green-600  bg-white hover:text-green-900")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                เข้าสู่ระบบ
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* tab1 */}

                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="flex items-center w-full   mx-auto ">
                    <div className="w-full">
                      <h1 className="text-2xl text-center font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                        กรอกข้อมูล
                      </h1>

                      <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            ชื่อ
                          </label>
                          {/* <input
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            type="text"
                            placeholder="นาย สมศักดิ์"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}
                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              /[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="จงเจริญ"
                            size="small"
                          />
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            นามสกุล
                          </label>
                          {/* <input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            type="text"
                            placeholder="จงเจริญ"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}
                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              /[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="จงเจริญ"
                            size="small"
                          />
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            หมายเลขโทรศัพท์
                          </label>
                          {/* <input
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                            type="phone"
                            
                            maxLength="10"
                            placeholder="xxx-xxx-xxxx"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}

                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            id="outlined-adornment-weight"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            // onChange={handleChange('weight')}
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              !/[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="xxx-xxx-xxxx"
                            size="small"
                            inputProps={{
                              maxLength: 10,
                            }}
                          />
                        </div>

                        <div className="">
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            เลขบัตรประจำตัวประชาชน
                          </label>
                          {/* <input
                            value={idcard}
                            onChange={(e) => setIdcard(e.target.value)}
                            type="text"
                            maxLength="13"
                            placeholder="x-xxx-xxxxx-xx-x"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}
                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            id="outlined-adornment-weight"
                            value={idcard}
                            onChange={(e) => setIdcard(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            // onChange={handleChange('weight')}
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              !/[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="x-xxx-xxxxx-xx-x"
                            size="small"
                            inputProps={{
                              maxLength: 13,
                            }}
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            ที่อยู่
                          </label>
                          <textarea
                            value={useaddress}
                            onChange={(e) => setUseaddress(e.target.value)}
                            type="text"
                            placeholder="399 ม.3 ลุมพินี ทาวน์วิลล์ ถนนพหลโยธิน"
                            className="block h-36 w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            จังหวัด
                          </label>
                          {/* <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="กรุงเทพฯ"
                            autoComplete="off"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}
                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            id="outlined-adornment-weight"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              /[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="กรุงเทพฯ"
                            size="small"
                          />
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            ประเทศ
                          </label>
                          <select
                            type="text"
                            placeholder=""
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          >
                            <option value="Thai">ไทย</option>
                          </select>
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            รหัสไปรษณีย์
                          </label>
                          {/* <input
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            maxLength="5"
                            type="tel"
                            autoComplete="off"
                            placeholder="10900"
                            className=" block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          /> */}
                          <OutlinedInput
                            sx={{
                              "& legend": { display: "none" },
                              "& fieldset": { top: 0 },
                            }}
                            id="outlined-adornment-weight"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            className="block w-full  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            // onChange={handleChange('weight')}
                            aria-describedby="outlined-weight-helper-text"
                            onKeyPress={(e) =>
                              !/[0-9]/.test(e.key) && e.preventDefault()
                            }
                            autoComplete="off"
                            placeholder="10900"
                            size="small"
                            inputProps={{
                              maxLength: 5,
                            }}
                          />
                        </div>

                        {/* <div className="hidden md:invisible">
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            รหัสไปรษณีย์
                          </label>
                          <input
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                          maxLength="5"
                            type="text"
                            autoComplete="off"
                            placeholder="10"
                            className=" block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div> */}

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            รหัสผ่าน
                          </label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="pass"
                            type="password"
                            autoComplete="off"
                            placeholder="กรอกรหัสผ่าน"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>

                        <div>
                          <label className="block mb-4 text-lg text-gray-600 dark:text-gray-200">
                            ยืนยันรหัสผ่าน
                          </label>
                          <input
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            autoComplete="off"
                            type="password"
                            placeholder="ยืนยันรหัสผ่าน"
                            className="block w-full px-5 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>
                      </form>
                      {msgErr1 ? (
                        <div className="mt-3 text-base w-full text-center">
                          {" "}
                          <ErrorMessage message={msgErr1} />{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                      <button
                        onClick={CreateUser}
                        className="flex items-center mt-5 w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
                      >
                        <span className="mx-auto myFont">สมัครสมาชิก</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 rtl:-scale-x-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* tab2 */}

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <h1 className="text-2xl text-center font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    เข้าสู่ระบบ
                  </h1>
                  <div className="mt-5">
                    <form>
                      <div>
                        <div className="myFont text-base font-bold text-gray-700 tracking-wide">
                          เบอร์โทรศัพท์
                        </div>
                        {/* <input
                          name="username"
                          value={loginphone}
                          maxLength="10"
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="w-full text-lg  py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          placeholder="xxx-xxx-xxxx"
                        /> */}
                        <TextField
                          value={loginphone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          id="standard-search"
                          variant="standard"
                          onKeyPress={(e) =>
                            !/[0-9]/.test(e.key) && e.preventDefault()
                          }
                          placeholder="xxx-xxx-xxxx"
                          size="small"
                          inputProps={{
                            maxLength: 10,
                          }}
                          fullWidth
                        />
                      </div>
                      <div className="mt-5">
                        <div className="flex justify-between items-center">
                          <div className="myFont text-base font-bold text-gray-700 tracking-wide">
                            รหัสผ่าน
                          </div>
                          <div>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://lin.ee/LtrrqGM"
                              className="myFont text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                            >
                              ลืมรหัสผ่าน?
                            </a>
                          </div>
                        </div>
                        <input
                          value={loginpassword}
                          onChange={(e) => setLoingPassword(e.target.value)}
                          className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="password"
                          placeholder="รหัสผ่าน"
                        />
                      </div>
                      {msgErr2 ? (
                        <div className="mt-3 text-base w-full text-center">
                          {" "}
                          <ErrorMessage message={msgErr2} />{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="mt-6">
                        <button
                          onClick={userloing}
                          className="myFont bg-green-600 text-gray-100 p-4 w-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                        >
                          เข้าสู่ระบบ
                        </button>
                      </div>
                    </form>
                    <div
                      className="myFont mt-12 text-sm font-display font-semibold text-gray-700 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                    >
                      ยังไม่มีบัญชีใช่ไหม{" "}
                      <a className="myFont cursor-pointer text-indigo-600 hover:text-indigo-800">
                        ลงทะเบียน
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs className="bg-pink-300" />;
    </>
  );
}
