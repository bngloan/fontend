import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header_user from './components/user/Header_user';
import Header from './components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/th_TH';
import Alladmin from './components/admin_components/Alladmin';
import Alluser from './components/user/Alluser';


import Dashboard from './components/Dashboard/Dashboard';
import ReqLoan from './components/RequestLoan/ReqLoan';

import Userdashboard from './components/user/Userdashboard';
import Nav1dashboard from './components/user/Nav1dashboard';
import Nav2withdraw from './components/user/Nav2withdraw';
import Nav3credit from './components/user/Nav3credit';
import Nav4bankaccount from './components/user/Nav4bankaccount';
import Nav5info from './components/user/Nav5info';
import User from './components/user2/User';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={frFR}>
      <BrowserRouter>
        <Routes>

          <Route path="/admin/*" element={<App />} ></Route>
          
          <Route path='/*' element={<Dashboard/>} ></Route>
          <Route path='/admin/*' element={<ReqLoan/>} ></Route>
          <Route path="/admin/*" element={<Alluser />} ></Route>
          <Route path="/admin/*" element={<Alladmin />} ></Route>

          <Route path="/*" element={<Header />} ></Route>
          
          <Route path="/user/*" element={<Header_user />} ></Route>
         
          <Route path="/*" element={<Userdashboard />} ></Route>
          <Route path="/*" element={<Nav1dashboard />} ></Route>
          <Route path="/user/*" element={<Nav2withdraw />} ></Route>
          <Route path="/user/*" element={<Nav3credit />} ></Route>
          <Route path="/user/*" element={<Nav4bankaccount />} ></Route>
          <Route path="/user/*" element={<Nav5info />} ></Route>
          
          
          <Route path="/" element={<User />} ></Route>


        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
