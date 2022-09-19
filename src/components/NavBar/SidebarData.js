import React, { useState } from "react";

import { Avatar, Divider } from "@mui/material";
import { logout, getCurrentUser } from "../../services/auth.service";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

const token = getCurrentUser();
let SidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <DonutSmallIcon />,
    cName: "nav-text",
  },
  {
    title: "รออนุมัติ",
    path: "/admin/reqloan",
    icon: <CrisisAlertIcon />,
    cName: "nav-text",
  },
  {
    title: "จัดการ User",
    path: "/admin/all_user",
    icon: <PermContactCalendarIcon />,
    cName: "nav-text",
  },
  {
    title: "ตั้งค่าบัญชี",
    path: "/admin/edit_account",
    icon: <ManageAccountsIcon />,
    cName: "nav-text",
  },
];
if (token != null && token.roles[0] === "ROLE_MOD") {
  SidebarData = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <DonutSmallIcon />,
      cName: "nav-text",
    },
    {
      title: "รออนุมัติ",
      path: "/admin/reqloan",
      icon: <CrisisAlertIcon />,
      cName: "nav-text",
    },
    {
      title: "จัดการ User",
      path: "/admin/all_user",
      icon: <PermContactCalendarIcon />,
      cName: "nav-text",
    },

    {
      title: "จัดการ Admin",
      path: "/admin/all_admin",
      icon: <AdminPanelSettingsIcon />,
      cName: "nav-text",
    },
    {
      title: "ตั้งค่าบัญชี",
      path: "/admin/edit_account",
      icon: <ManageAccountsIcon />,
      cName: "nav-text",
    },
  ];
}
export default SidebarData;
