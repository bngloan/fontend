import React, { useState, useEffect } from "react";
import header_logo from "../../icon/BNG-logo.png";
import API_URL from "../../config/api";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Nav1dashboard from "./Nav1dashboard";
import Nav2withdraw from "./Nav2withdraw";
import Nav3credit from "./Nav3credit";
import Nav4bankaccount from "./Nav4bankaccount";
import Nav5info from "./Nav5info";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import footer_bg from "../user2/img/footer_bg3.jpg";

import bngLogo from "../user2/img/BNG_logo2.png";



import social1 from "../user2/img/fb_logo.png";
import social2 from "../user2/img/line.webp";
import social3 from "../user2/img/website.png";
import social4 from "../user2/img/gmail.png";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import HelpIcon from "@mui/icons-material/Help";
import LaptopIcon from "@mui/icons-material/Laptop";
import GavelIcon from "@mui/icons-material/Gavel";

import "../../App.css";

import bg1 from "../../image/bg1.jpg";

import { push as Menu } from "react-burger-menu";

import LogoutIcon from "@mui/icons-material/Logout";
import configapi from '../../config/configapi'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function Userdashboard() {
  const [imageprofile, setImageprofile] = useState({});
  const [firstname ,setFirstname] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [userId] = useState(
    JSON.parse(localStorage.getItem("awesomeLeadsTokenId"))
  );

  useEffect(() => {
    get_user();
  }, []);

  const get_user = async () => {
    setLoading(true);
    await API_URL.get(`api/people/oneUserdata/${userId}`)
      .then((res) => {
        const getoneuser = res.data.user;
        if (getoneuser !== null) {
          setImageprofile(getoneuser.imageprofile!==null?`${configapi.API_SERVER}${getoneuser.imageprofile}`:null);
          setFirstname(getoneuser.firstname);
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
        logout();
      });
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("awesomeLeadsTokenId");
    window.location.reload();
  };
  return (
    <div className="fontFamilyKanit">
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          {/* <nav className="md:flex items-center justify-between  bg-gray-800 px-6 py-2 hidden w-full">
            <div className="flex items-center flex-shrink-0 text-white mr-6 w-1/6">
              <img src={header_logo} alt="headerlogo" className="w-6/6 " />
            </div>

            <div className="  flex justify-center  w-4/6">
              <div className="text-sm flex items-center">
                <Menu>
                  <Link
                    to="/user"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    หน้าแรก
                  </Link>
                  <Link
                    to="/user/withdraw"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    ถอน
                  </Link>
                  <Link
                    to="/user/credit"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    สินเชื่อ
                  </Link>
                  <Link
                    to="/user/bankaccount"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    ยืนยันข้อมูลบัญชี
                  </Link>
                  <Link
                    to="/user/info"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    ข้อมูลส่วนตัว
                  </Link>
                </Menu>
              </div>
            </div>
            <div className="w-1/6 flex justify-end">
              <button
                onClick={logout}
                className="inline-block text-sm font-black px-4 py-2 leading-none border rounded hover:text-white hover:border-white hover:bg-transparent border-transparent text-white bg-sky-400 mt-4 lg:mt-0"
              >
                <LogoutIcon fontSize="small" /> ออกจากระบบ
              </button>
            </div>
          </nav>

          <nav className="md:hidden">
            <section className="top-nav ">
              <div className="flex">
                <div className="flex items-center  text-white mr-6">
                  <img src={header_logo} alt="headerlogo" className="w-3/6" />
                </div>
              </div>
              <input id="menu-toggle" type="checkbox" />
              <label className="menu-button-container" htmlFor="menu-toggle">
                <div className="menu-button"></div>
              </label>
              <ul className="menu">
                <li>
                  <a
                    href="/th"
                    className="block mt-4 lg:inline-block lg:mt-0 text-purple-900 font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    หน้าแรก
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://lin.ee/ywio3Hy"
                    className="block mt-4 lg:inline-block lg:mt-0 text-purple-900 font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    ติดต่อ
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://lin.ee/ywio3Hy"
                    className="block mt-4 lg:inline-block lg:mt-0 text-purple-900 font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    รับเรื่อง
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="/login"
                    className="block mt-4 lg:inline-block lg:mt-0 text-purple-900 font-mono text-xl hover:text-purple-400 mr-4"
                  >
                    เข้าสู่ระบบ
                  </a>
                </li>
              </ul>
            </section>
          </nav> */}
          {/* //*************************************************************** */}
          <Menu   pageWrapId="page-wrap" width='250px'  isOpen={isOpen } onOpen={()=>setIsOpen(!isOpen) }  onClose={ ()=>setIsOpen(!isOpen) } customCrossIcon={ < HighlightOffIcon className="rounded-3xl"/>}>
          {/* <img
                src={imageprofile ? imageprofile : imgaeprofilepng}
                style={{ width: "90px", height: "90px" }}
                alt="nice"
                className="rounded-full border-2 border-black mx-auto"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = imageprofile; // prevents looping
                  currentTarget.src = imgaeprofilepng;
                }}
              />
              <p className="text-center ">{firstname}</p> */}
              <div className="h-3">

              </div>
            <ul className="nav-menu-items">
              <li className={pathname==="/user"?`nav-text navselect`:`nav-text`}  onClick={()=>setIsOpen(false)}>
                <Link
                  to="/user"
                  className=" block mt-4 lg:inline-block lg:mt-0 text-white font-mono text-xl  mr-4"
                >
                <HomeIcon className="mr-3"/>  หน้าแรก
                </Link>
              </li>
              <li className={pathname==="/user/withdraw"?`nav-text navselect`:`nav-text`}   onClick={()=>setIsOpen(false)}>
                <Link
                
                  to="/user/withdraw"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl  mr-4"
                >
                <PaymentIcon className="mr-3"/>  ถอน
                </Link>
              </li>
              <li className={pathname==="/user/credit"?`nav-text navselect`:`nav-text`} onClick={()=>setIsOpen(false)}>
                <Link
                  to="/user/credit"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl  mr-4"
                >
                 <PaidIcon className="mr-3"/> สินเชื่อ
                </Link>
              </li>
              <li className={pathname==="/user/bankaccount"?`nav-text navselect`:`nav-text`} onClick={()=>setIsOpen(false)}>
                <Link
                  to="/user/bankaccount"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl  mr-4"
                >
                  <AccountBalanceIcon className="mr-3"/> ยืนยันข้อมูลบัญชี
                </Link>
              </li>
              <li className={pathname==="/user/info"?`nav-text navselect`:`nav-text`} onClick={()=>setIsOpen(false)}>
                <Link
                  to="/user/info"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white  font-mono text-xl  mr-4"
                >
                 <PermContactCalendarIcon className="mr-3"/> ข้อมูลส่วนตัว
                </Link>
              </li>
              <div className="mx-2 h-px bg-white my-3"></div>
              <li className="nav-text" onClick={()=>setIsOpen(false)}>
              <button
                  onClick={logout}
                  className="inline-block text-sm font-bold px-4 py-2 leading-none border rounded hover:text-white hover:border-white hover:bg-transparent border-transparent text-white bg-sky-400 mt-4 lg:mt-0"
                >
                  <LogoutIcon fontSize="small" /> ออกจากระบบ
                </button>
              </li>
            </ul>
          </Menu>
          <div id="page-wrap">
            <nav className="flex items-center justify-between  bg-gray-800 px-6 py-3 md:py-5 lg:py-2  w-full fixed z-30 drop-shadow-xl max-h-20">
              <div className="w-1/6">
                <p></p>
              </div>
              <div className="flex items-center justify-center flex-shrink-0 text-white mr-6 w-1/6">
                <img
                  src={header_logo}
                  alt="headerlogo"
                  className="w-6/6 md:w-2/6"
                />
              </div>

              <div className="w-1/6 flex justify-end">
               
              </div>
            </nav>
            <div
              className="h-auto mt-8 md:mt-11"
              style={{
                backgroundImage: `url(${bg1})`,
                backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Nav1dashboard userdata={userdata} />}
                />
                <Route
                  path="/withdraw"
                  element={<Nav2withdraw userdata={userdata} />}
                />
                <Route
                  path="/credit"
                  element={
                    <Nav3credit userdata={userdata} get_user={get_user} userId={userId} />
                  }
                />
                <Route
                  path="/bankaccount"
                  element={
                    <Nav4bankaccount userdata={userdata} get_user={get_user} />
                  }
                />
                <Route
                  path="/info"
                  element={<Nav5info userdata={userdata} />}
                />
              </Routes>
              <footer
          className="bg-blue-gray-400"
          style={{
            backgroundImage: `url(${footer_bg})`,
            backgroundSize: "cover",
  
          }}
        >
          <div
            className=" container w-full px-5 hidden md:block  m-0 "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <h6 className="text-white text-left text-2xl  font-bold m-0 mx-5 mt-4">
              ติดต่อเรา
            </h6>
          </div>
          {/* desktop */}
          <div
            className="hidden container md:flex w-full m-0 p-0 "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <div className="w-1/3 md:block text-white ml-5">
              <div className="text-left">
                <img src={social1} className="w-5 md:w-14  mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  FACEBOOK
                </a>
              </div>
              <div className="text-left">
                <img
                  src={social2}
                  className="w-5 md:w-14   mx-5 my-2 inline "
                />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  LINE
                </a>
              </div>
              <div className="text-left">
                <img src={social3} className="w-5 md:w-14 mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  WEBSITE
                </a>
              </div>
              <div className="text-left">
                <img src={social4} className="w-5 md:w-14  mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  GMAIL
                </a>
              </div>
            </div>
            <div className=" px-5 py-10 mx-auto w-full md:w-1/3">
          <div className="flex flex-wrap w-full justify-center">
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <RssFeedIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-lg text-center">RSS</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <HelpIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-lg text-center">ข้อเสนอแนะ</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <LaptopIcon fontSize="large" className="text-center" />
              </div>
              <p className="md:text-xs lg:text-md text-center mt-6">ระบบอินทราเน็ต</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2 ">
                <GavelIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-xs text-center mt-6">สินเชื่อที่เกี่ยวข้อง</p>
            </div>
          </div>
        </div>
            <div className="w-full self-center flex md:w-1/3 md:block ">
              {/* <img src={logo} className="w-1/4 m-5 " /> */}
              <div className="flex justify-end  ">
                <img src={bngLogo} className="w-2/4 m-5 " />
              </div>
              <div className="block text-right text-white mr-5">
                <p className="p-0 m-1">บริษัท บีเอ็นจี จำกัด (มหาชน)</p>
                <p className="p-0 m-1">
                  บริการสินเชื่อที่จะดูแลคุณตลอดเวลา 24 ชั่วโมง
                </p>
                <p className="p-0 m-1">
                  ให้วงเงินสูงที่สุดในประเทศไทย ถึง 5 ล้านบาท
                </p>
                <p className="p-0 m-1">กู้ง่าย จ่ายไว ภายใน 10 นาทีเท่านั้น</p>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div
            className="md:hidden container block "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <div className="flex justify-center ">
              <img src={bngLogo} alt="logo" className="block w-1/2" />
            </div>
            <div className="block text-white mb-2 ">
              <p className="text-xs ">
                บริษัท บีเอ็นจี จำกัด (มหาชน)
                <br />
                บริการสินเชื่อที่จะดูแลคุณตลอดเวลา 24 ชั่วโมง
                <br />
                ให้วงเงินสูงที่สุดในประเทศไทย ถึง 5 ล้านบาท
                <br />
                กู้ง่าย จ่ายไว ภายใน 10 นาทีเท่านั้น
                <br />
              </p>
            </div>
            <div className="w-full flex gap-4 justify-center p-3 text-white">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social1} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social2} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social3} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social4} className="w-10 shadow-sm" />
              </a>
            </div>
          </div>

          <div
            className="text-white text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          >
            <p className="text-xs">© 2017 BNG.COM. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
            </div>
           
          </div>
         
        </>
      )}
    </div>
  );
}

export default Userdashboard;
