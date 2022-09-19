import React, { useState, useEffect } from "react";

import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Tabs,
  Switch,
  Box,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import API_URL from "../../config/api";
import API_URL_form from "../../config/apiForm";
import imgaeprofilepng from "../../image/blank_profile.png";


import Loanuser from "./Loanuser";
import { Modal } from "antd";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import OpenNotification from "../notification/OpenNotification";
import ErrorMessage from "../ErrorMessage";
import HomeIcon from "@mui/icons-material/Home";

import FaceIcon from "@mui/icons-material/Face";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import configapi from "../../config/configapi";
import LockIcon from "@mui/icons-material/Lock";

function Adduser({ isModalVisible, showModal, get_Alluser, allUser, getId }) {
  const URL_HOST = `${configapi.API_SERVER}`;
  // const URL_HOST = `${process.env.REACT_APP_NODE_HOST_URL}`;

  const [bankIndex, setBankIndex] = useState(-1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [useaddress, setUseaddress] = useState("");
  const [userbankname, setUserbankname] = useState("");
  const [idbank, setIdbank] = useState("");

  const [loanuser,setLoanuser] = useState(null);

  const [imageprofile, setImageprofile] = useState({});
  const [imagefront, setImagefront] = useState({});
  const [imageback, setImageback] = useState({});

  const [imageprofileBackup, setImageprofileBackup] = useState({});
  const [imagefrontBackup, setImagefrontBackup] = useState({});
  const [imagebackBackup, setImagebackBackup] = useState({});

  const [checkimage1, setCheckimage1] = useState(false);
  const [checkimage2, setCheckimage2] = useState(false);
  const [checkimage3, setCheckimage3] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imagePreviewUrlFront, setImagePreviewUrlFront] = useState(null);
  const [imagePreviewUrlBack, setImagePreviewUrlBack] = useState(null);

  const [switchChecked, setSwitchChecked] = useState(true);
  const [getBank, setGetBank] = useState([]);

  const [msgErr1, setMsgErr1] = useState("");
  const [msgErr2, setMsgErr2] = useState("");

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeStatus = (event) => {
    console.log(event.target.value);
    setBankIndex(event.target.value);
   
  };

  useEffect(() => {
    clearForm();
    get_Bank();
    if (getId != null) {
      
      const findone = allUser.find((obj) => {
        return obj.id === getId;
      });
  

      setForm(findone);
    }
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

  const handleUploadImage = (e) => {
    if (e.target.files[0].size > 20315594) {
      OpenNotification({ message: "ขนาดรูปภาพต้องไม่เกิน 20 MB", type: 3 });
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageprofile(file);
      setImagePreviewUrl(reader.result);
      setCheckimage1(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDelImage = (e) => {
    setCheckimage1(true);
    setImageprofile({});
    setImagePreviewUrl(null);
  };

  const handleUploadImageFront = (e) => {
    if (e.target.files[0].size > 20315594) {
      OpenNotification({ message: "ขนาดรูปภาพต้องไม่เกิน 20 MB", type: 3 });
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagefront(file);
      setImagePreviewUrlFront(reader.result);
      setCheckimage2(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDelImageFront = (e) => {
    setImagefront({});
    setImagePreviewUrlFront(null);
    setCheckimage2(true);
  };

  const handleUploadImageBack = (e) => {
    if (e.target.files[0].size > 20315594) {
      OpenNotification({ message: "ขนาดรูปภาพต้องไม่เกิน 20 MB", type: 3 });
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageback(file);
      setImagePreviewUrlBack(reader.result);
      setCheckimage3(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDelImageBack = (e) => {
    setImageback({});
    setImagePreviewUrlBack(null);
    setCheckimage3(true);
  };

  const setForm = (findone) => {
    setFirstname(findone.firstname);
    setLastname(findone.lastname);

    setPassword(findone.password);
    setBankIndex(findone.bankusers.length!=0?findone.bankusers[0].bankId:-1);
    setUserbankname(findone.bankusers.length!=0?findone.bankusers[0].name:"");
    setIdbank(findone.bankusers.length!=0?findone.bankusers[0].idbank:"");
    setCity(findone.city);
    setZipcode(findone.zipcode);
    setUseaddress(findone.useaddress);
    setPhone(findone.phone);
    setSwitchChecked(findone.use === 1 ? true : false);
    setImagePreviewUrl(
      findone.imageprofile !== null
        ? `${URL_HOST}${findone.imageprofile}`
        : null
    );
    setImageprofileBackup(findone.imageprofile);
    setImagefrontBackup(findone.imagefront);
    setImagePreviewUrlFront(
      findone.imagefront !== null ? `${URL_HOST}${findone.imagefront}` : null
    );
    setImagebackBackup(findone.imageback);
    setImagePreviewUrlBack(
      findone.imageback !== null ? `${URL_HOST}${findone.imageback}` : null
    );
    setLoanuser(findone.loanstates.length!=0?findone.loanstates:null)

  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    
    setPassword("");
    setBankIndex(-1);
    setIdbank("");
    setUserbankname("");
    setCity("");
    setZipcode("");
    setUseaddress("");
    setPhone("");
    setSwitchChecked(true);
  };

  const CreateUser = async (e) => {
    if (phone === ""||phone.length!==10) {
      setMsgErr1("กรุณากรอกเบอร์โทรให้ถูกต้องและมี 10 ตัวด้วย");
      setValue("1");
      return;
    }
    setMsgErr1("");

    if (password === "" || password.length < 8) {
      setMsgErr2("กรุณากรอกรหัสผ่านให้ถูกต้องและมี 8 ตัวอักษร");
      setValue("1");
      return;
    }
    const formData = new FormData();
    formData.append("imageprofile", imageprofile);
    formData.append("imagefront", imagefront);
    formData.append("imageback", imageback);
    formData.append("firstname", firstname.length === 0 ? "" : firstname);
    formData.append("lastname", lastname.length === 0 ? "" : lastname);
    formData.append("password", password);
    formData.append("useaddress", useaddress);
    formData.append("phone", phone);
    formData.append("use", switchChecked ? 1 : 0);

    setMsgErr2("");

    e.preventDefault();

    await API_URL_form.post(`api/people/newPeople`, formData)
      .then((res) => {
        if(res.data.id!=null){
          Bankuser(res.data.id);
        }
        
        OpenNotification({ message: "เพิ่ม user เรียบร้อย", type: 1 });
        showModal();
        get_Alluser();
        clearForm();
        
      })
      .catch((err) => {
        err.response.data.status === 400
          ? OpenNotification({ message: "เบอร์โทรนี้ถูกใช้งานแล้ว", type: 3 })
          : OpenNotification({ message: "เกิดข้อผิดพลาด", type: 4 });
      });
  };

  const UpdateUser = async (e) => {
    try {
      if (checkimage1 && imageprofileBackup !== null) {
        let string = "";
        const array = imageprofileBackup.split("\\");
        string = "./" + array.join("/");

        await API_URL.post(`api/people/deleteimageprofile`, {
          id: getId,
          imageprofileBackup: string,
        });
      }
    } catch (e) {}
    try {
      if (checkimage2 && imagefrontBackup !== null) {
        let string = "";
        const array = imagefrontBackup.split("\\");
        string = "./" + array.join("/");

        await API_URL.post(`api/people/deleteimagefront`, {
          id: getId,
          imagefrontBackup: string,
        });
      }
    } catch (e) {}

    try {
      if (checkimage3 && imagebackBackup !== null) {
        let string = "";
        const array = imagebackBackup.split("\\");
        string = "./" + array.join("/");

        await API_URL.post(`api/people/deleteimageback`, {
          id: getId,
          imagebackBackup: string,
        });
      }
    } catch (e) {}

    e.preventDefault();
    if (phone === ""||phone.length!==10) {
      setMsgErr1("กรุณากรอกเบอร์โทรให้ถูกต้องและมี 10 ตัวด้วย");
      setValue("1");
      return;
    }
    setMsgErr1("");
    if (password === ""|| password.length<8) {
      setMsgErr2("กรุณากรอกรหัสผ่านด้วยและมีอย่างน้อย 8 ตัวอักษร");
      setValue("1");
      return;
    }

    setMsgErr2("");

    const formData = new FormData();
    formData.append("imageprofile", imageprofile);
    formData.append("imagefront", imagefront);
    formData.append("imageback", imageback);
    formData.append("firstname", firstname.length === 0 ? "" : firstname);
    formData.append("lastname", lastname.length === 0 ? "" : lastname);
    formData.append("useaddress", useaddress);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("use", switchChecked ? 1 : 0);

    await API_URL_form.put(`api/people/updatePeople/${getId}`, formData)
      .then((res) => {
        Bankuser(getId);
        OpenNotification({ message: "แก้ไข user เรียบร้อย", type: 1 });
        showModal();
        get_Alluser();
        clearForm();
        return res.data;
      })
      .catch((err) => {
        OpenNotification({
          message: "เกิดข้อผิดพลาดหรือเบอร์โทรนี้มีคนใช้แล้ว",
          type: 3,
        });
      });
  };

  const Bankuser = async(id)=>{
    if(userbankname!==""&&idbank!==""&&bankIndex!==-1){
      await await API_URL.post(`api/bank/newbankuser`, {
        name: userbankname,
        idbank: idbank,
        peopleId: id,
        bankId: bankIndex,
  
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        OpenNotification({
          message: "เกิดข้อผิดพลาดในการจัดการบัญชี",
          type: 3,
        });
      });
    }
  };

  return (
    <div>
      <Modal
        style={{
          top: 10,
        }}
        title={getId === null ? "เพิ่ม user" : "แก้ไข user"}
        visible={isModalVisible}
        onOk={showModal}
        onCancel={showModal}
        width={900}
        footer={[
          <div className=" text-center flex justify-center">
            {getId === null ? (
              <button
                onClick={CreateUser}
                className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-gray-900 hover:bg-gray-700 shadow-md"
              >
                บันทึก
              </button>
            ) : (
              <button
                onClick={UpdateUser}
                className="text-center text-white font-semibold  px-10 py-2 rounded-md bg-orange-500 hover:bg-orange-800 shadow-md"
              >
                แก้ไข
              </button>
            )}

            <div className="mx-5 md:mx-16 "></div>
            <button
              onClick={showModal}
              className="bg-transparent hover:bg-gray-100 text-black font-semibold  py-2 px-10 border border-gray-900 hover:border-transparent rounded"
            >
              ยกเลิก
            </button>
          </div>,
        ]}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" ,p:0}}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              className="p-0"
            >
              <Tab label="ข้อมูลส่วนตัว" value="1" />
              <Tab label="รูปบัตรประชาชน" value="2" />
              <Tab label="บัญชีธนาคาร" value="3" />
              <Tab label="สถานะการกู้" value="4" />
            </Tabs>

          </Box>
          <TabPanel value="1" sx={{p:0}}>
            <form
              className="w-6/6 md:w-4/6 mx-auto mt-5"
              encType="multipart/form-data"
              method="post"
            >
              <div className="flex items-end">
                <div>
                  <img
                    src={imagePreviewUrl ? imagePreviewUrl : imgaeprofilepng}
                    style={{ width: "150px", height: "150px" }}
                    alt="nice"
                    className="rounded-full border-2 border-black"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = imagePreviewUrl; // prevents looping
                      currentTarget.src = imgaeprofilepng;
                    }}
                  />
                </div>
                <div>
                  <IconButton onClick={handleDelImage}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </div>
              </div>

              <div className="md:flex w-full justify-between mb-3">
                <div>
                  <input
                    name="imageprofile"
                    onChange={handleUploadImage}
                    className="inputfile1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                </div>
                <div className="flex px-5 py-1 bg-slate-100 rounded-md w-4/4 md:w-2/6 my-4 md:my-0">
                  <p className="text-md mr-1 my-auto">การใช้งาน</p>
                  <Switch
                    name="use"
                    color="secondary"
                    checked={switchChecked}
                    onChange={() => {
                      setSwitchChecked(!switchChecked);
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full md:w-6/6 mx-auto">
                <TextField
                  name="firstname"
                  autoComplete="off"
                  size="small"
                  id="outlined-textarea"
                  label="ชื่อ"
                  placeholder="ชื่อ"
                  onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
                  className="w-6/6"
                  InputProps={{
                    startAdornment: (
                      <FaceIcon position="start" className="mr-5"></FaceIcon>
                    ),
                  }}
                  fullWidth
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <div className="w-8"></div>
                <TextField
                  name="lastname"
                  size="small"
                  id="outlined-textarea"
                  label="นามสกุล"
                  onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
                  autoComplete="off"
                  placeholder="นามสกุล"
                  className="w-6/6"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <FaceIcon position="start" className="mr-5"></FaceIcon>
                    ),
                  }}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <Divider className="my-3 h-4" sx={{ borderBottomWidth: 4 }} />
              <div className="flex w-full md:w-6/6 mx-auto my-5">
                <TextField
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="small"
                  type={"tel"}
                  id="outlined-textarea"
                  label="เบอร์โทร"
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  autoComplete="off"
                  placeholder="เบอร์โทร"
                  className="w-6/6"
                  inputProps={{ maxLength: 10 }}
                  InputProps={{
                    startAdornment: (
                      <PhoneAndroidIcon
                        position="start"
                        className="mr-5"
                      ></PhoneAndroidIcon>
                    ),
                  }}
                  fullWidth
                  required
                />
              </div>
              {msgErr1 ? <ErrorMessage message={msgErr1} /> : <></>}
              <div className="flex w-full md:w-6/6 mx-auto my-5">
                <TextField
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="outlined-textarea"
                  type={"tel"}
                  size="small"
                  label="Password"
                  autoComplete="off"
                  placeholder="รหัสผ่าน"
                  className="w-6/6"
                  // inputProps={{ maxLength: 13 }}
                  InputProps={{
                    startAdornment: (
                      <LockIcon position="start" className="mr-5"></LockIcon>
                    ),
                  }}
                  required
                  fullWidth
                />
              </div>

              {msgErr2 ? <ErrorMessage message={msgErr2} /> : <></>}
              
              <div className="flex w-full md:w-6/6 mx-auto my-5">
                <TextField
                  name="useaddress"
                  placeholder="ที่อยู่"
                  multiline
                  label="ที่อยู่"
                  className="w-6/6"
                  size="small"
                  id="outlined-textarea"
                  rows={2}
                  value={useaddress}
                  onChange={(e) => setUseaddress(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <HomeIcon position="start" className="mr-5"></HomeIcon>
                    ),
                  }}
                />
              </div>
            </form>
          </TabPanel>
          <TabPanel value="2" sx={{p:0}}>
            <form
              className="w-6/6 md:w-4/6 mx-auto mt-5"
              encType="multipart/form-data"
              method="post"
            >
              <div className="flex justify-center mt-8">
                <div className="w-full rounded-lg shadow-xl bg-gray-50">
                  <div className="m-4">
                    <div>
                      <label className="inline-block mb-2 text-gray-500">
                        อัพโหลดรูปบัตรประชาชน ( หน้า )
                      </label>
                      <IconButton onClick={handleDelImageFront}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      {imagePreviewUrlFront ? (
                        <img
                          className="rounded-sm"
                          src={imagePreviewUrlFront && imagePreviewUrlFront}
                          style={{ height: "200px" }}
                          alt="nice2"
                        />
                      ) : (
                        <label className="flex flex-col w-full h-52 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center pt-7 mt-16">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              เลือกไฟล์รูปภาพ
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="opacity-0"
                            name="imagefront"
                            onChange={handleUploadImageFront}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <div className="w-full rounded-lg shadow-xl bg-gray-50">
                  <div className="m-4">
                    <div>
                      <label className="inline-block mb-2 text-gray-500">
                        อัพโหลดรูปบัตรประชาชน ( หลัง )
                      </label>
                      <IconButton onClick={handleDelImageBack}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      {imagePreviewUrlBack ? (
                        <img
                          className="rounded-sm"
                          src={imagePreviewUrlBack && imagePreviewUrlBack}
                          style={{ height: "200px" }}
                          alt="nice2"
                        />
                      ) : (
                        <label className="flex flex-col w-full h-52 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center pt-7 mt-16">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              เลือกไฟล์รูปภาพ
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="opacity-0"
                            name="imageback"
                            onChange={handleUploadImageBack}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </TabPanel>
          <TabPanel value="3" sx={{p:0}}>
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
                  onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
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
            </form>
          </TabPanel>
          <TabPanel value="4" sx={{p:0}}><div
              className="w-6/6  mx-auto mt-5"
            ><Loanuser loanuser={loanuser}  get_Alluser={get_Alluser} setForm={setForm}/></div></TabPanel>
        </TabContext>
      </Modal>
    </div>
  );
}

export default Adduser;
