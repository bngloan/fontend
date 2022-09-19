import React, { useState } from "react";
import { Menu } from "antd";

import profile from "../icon/user.png";
import { Avatar, Divider } from "@mui/material";
import { logout, getCurrentUser } from "../services/auth.service";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

import { Link } from "react-router-dom";

const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const [token] = useState(getCurrentUser());

  const styledTopics = [];

  topics.forEach((topic, index) =>
    token != null && token.roles[0] === "ROLE_MOD"
      ? styledTopics.push({
          label: (
            <div>
              {index === 0 ? (
                <Link to="/admin">
                  <DonutSmallIcon className="mr-2" />
                </Link>
              ) : index === 1 ? (
                <Link to="/admin/reqloan">
                  <CrisisAlertIcon className="mr-2" />
                </Link>
              ) : index === 2 ? (
                <Link to="/admin/all_user">
                  <PermContactCalendarIcon className="mr-2" />
                </Link>
              ) : index === 3 ? (
                <Link to="/admin/all_admin">
                  <AdminPanelSettingsIcon className="mr-2" />
                </Link>
              ) : index === 4 ? (
                <Link to="/admin/edit_account">
                  <ManageAccountsIcon className="mr-2" />
                </Link>
              ) : (
                ""
              )}
              {topic}
            </div>
          ),
          key: index,
          onClick: changeSelectedKey,
        })
      : styledTopics.push({
          label: (
            <div>
              {index === 0 ? (
                <Link to="/admin">
                  <DonutSmallIcon className="mr-2" />
                </Link>
              ) : index === 1 ? (
                <Link to="/admin/reqloan">
                  <CrisisAlertIcon className="mr-2" />
                </Link>
              ) : index === 2 ? (
                <Link to="/admin/all_user">
                  <PermContactCalendarIcon className="mr-2" />
                </Link>
              ) : index === 3 ? (
                <Link to="/admin/edit_account">
                  <ManageAccountsIcon className="mr-2" />
                </Link>
              ) : (
                ""
              )}
              {topic}
            </div>
          ),
          key: index,
          onClick: changeSelectedKey,
        })
  );

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  return (
    <div>
      <Avatar
        src={profile}
        className="mx-auto mt-10 mb-3"
        sx={{ width: 70, height: 70 }}
      />
      <p className="text-lg text-center">
        {" "}
        {token && token.name}
        <br />{" "}
        {token && token.roles[0] === "ROLE_MOD"
          ? "[ SUPER ADMIN ]"
          : "[ ADMIN ]"}{" "}
      </p>
      <Divider />
      <Menu mode="inline" selectedKeys={[selectedKey]} items={styledTopics} />

      {/* </Menu> */}
      <Divider />
      <div>
        <button className="py-3 px-5 mt-16 " onClick={handleLogout}>
          <ExitToAppIcon className="mr-2" />
          logout
        </button>
        <Divider />
      </div>
    </div>
  );
};
export default TopicMenu;
