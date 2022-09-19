import React, { useState, useEffect } from "react";

import "../App.css";
import "./NavBar/NavBar.css"
import Alluser from "./user/Alluser";
import Alladmin from "./admin_components/Alladmin";

import Editaccount from "./Editaccount";
import { logout,getCurrentUser } from "../services/auth.service";
import { Route, Routes, useLocation,Link } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ReqLoan from "./RequestLoan/ReqLoan";
import { push as Menu } from "react-burger-menu";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SidebarData from "./NavBar/SidebarData";
import logoweb from '../icon/BNG-logo.png';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar } from "@mui/material";
import profile from "../icon/user.png";
import bg from "./user2/img/bg.jpg";

function Header() {
  const [token] = useState(getCurrentUser());
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {

  }, [pathname]);

  const handleLogout = () => {
    window.location.reload();
    logout();
  };



  return (
    <div className="App">
      <Menu
        pageWrapId="page-wrap"
        width="250px"
        isOpen={isOpen}
        onOpen={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(!isOpen)}
        customCrossIcon={<HighlightOffIcon className="rounded-3xl" />}
      >
        <div className="h-3"></div>
        <ul className="nav-menu-items">
        <Avatar
        src={profile}
        className="mx-auto"
        sx={{ width: 70, height: 70 }}
      />
      <p className="text-base text-white text-center mt-1">
        {" "}
        {token && token.name}
        <br />{" "}
        {token && token.roles[0] === "ROLE_MOD"
          ? "[ SUPER ADMIN ]"
          : "[ ADMIN ]"}{" "}
      </p>

        {SidebarData.map((item, index) => {
              return (
                <li key={index} className={pathname===item.path?`${item.cName} navselect`:`${item.cName}`} onClick={()=>setIsOpen(false)}>
                  <Link to={item.path}  className=" block mt-4 lg:inline-block lg:mt-0 text-white font-mono text-xl  mr-4">
                    {item.icon}
                    <span className="ml-5">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <div className="mx-2 h-px bg-white"></div>
            <li className="nav-text">
              <Link to="#" className="py-3 px-5 mt-16 " onClick={handleLogout}>
                <ExitToAppIcon className="mr-2" />
                logout
              </Link>
            </li>
        </ul>
      </Menu>

      <div  id="page-wrap" style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}>
      <nav className="flex items-center justify-between  bg-gray-800 px-6 py-3 md:py-5 lg:py-2  w-full fixed z-30 drop-shadow-xl">
              <div className="w-1/3">
                <p></p>
              </div>
              <div className="w-1/3 flex justify-center"><img src={logoweb} className="w-3/6 md:w-1/6" alt="logobng"/></div>

              <div className="w-1/3 flex justify-end">
               
              </div>
            </nav>
            <div className="p-2 mt-16 md:mt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reqloan" element={<ReqLoan />} />
          <Route path="/all_user" element={<Alluser />} />
          <Route path="/edit_account" element={<Editaccount />} />

          {token != null && token.roles[0] === "ROLE_MOD" && (
            <Route path="/all_admin" element={<Alladmin />} />
          )}
        </Routes>
        </div>
      </div>
    </div>
  );
}
export default Header;
