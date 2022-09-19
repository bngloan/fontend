import React, { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import SidebarData from "./SidebarData";
import { Avatar } from "@mui/material";
import "./NavBar.css";
import profile from "../../icon/user.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { logout ,getCurrentUser} from "../../services/auth.service";
import logoweb from '../../icon/BNG-logo.png'

import { IconContext } from "react-icons";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { push as Menu } from "react-burger-menu";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [token] = useState(getCurrentUser());
  const showSidebar = () => setSidebar(!sidebar);
  const [selectedKey, setSelectedKey] = useState("0");
  
  const { pathname } = useLocation();

  useEffect(() => {
    pathname_appbar();
    console.log(pathname);
  }, [pathname]);
  var pathname_appbar;
  token != null && token.roles[0] === "ROLE_MOD"
    ? (pathname_appbar = () => {
        switch (pathname) {
          case "/admin":
            setSelectedKey("0");
            break;
          case "/admin/reqloan":
            setSelectedKey("1");
            break;
          case "/admin/all_user":
            setSelectedKey("2");
            break;
          case "/admin/all_admin":
            setSelectedKey("3");
            break;

          case "/admin/edit_account":
            setSelectedKey("4");
            break;
        }
      })
    : (pathname_appbar = () => {
        switch (pathname) {
          case "/admin":
            setSelectedKey("0");
            break;
          case "/admin/reqloan":
            setSelectedKey("1");
            break;
          case "/admin/all_user":
            setSelectedKey("2");
            break;

          case "/admin/edit_account":
            setSelectedKey("3");
            break;
        }
      });

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar flex justify-between">
          <Link to="#" className="menu-bars w-1/3">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="w-1/3 flex justify-center"><img src={logoweb} className="w-5/6 md:w-1/6" alt="logobng"/></div>
          <div className="w-1/3"></div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
              
            </li>
            
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
                <li key={index} className={pathname===item.path?`${item.cName} navselect`:`${item.cName}`}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        
            <li className="nav-text">
              <Link to="#" className="py-3 px-5 mt-16 " onClick={handleLogout}>
                <ExitToAppIcon className="mr-2" />
                logout
              </Link>
            </li>
         </ul>
         </nav> 
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
