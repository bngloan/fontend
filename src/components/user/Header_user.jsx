import React from "react";


import { useNavigate } from "react-router-dom";
import Userdashboard from "./Userdashboard";
import { useState,useEffect } from "react";
import User from "../user2/Login";

function Header_user() {
  const navigate = useNavigate();
  const [userId,setUserId] = useState(null);
 
  useEffect(() => {
    try{setUserId(JSON.parse(localStorage.getItem('awesomeLeadsTokenId')));}catch(e){setUserId(null)}
  }, []);

  return (
    <div>
        {userId===null ? (<User/>):(<Userdashboard/>)}
    </div>
  );
}

export default Header_user;
