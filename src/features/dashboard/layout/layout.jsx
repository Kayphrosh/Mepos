import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from '../../../components/sidebar/Sidebar';
import Topbar from '../../../components/topbar/Topbar';
import Home from '../home/home';
import Users from '../user/users';
import AddNewUser from '../add-new-user/add-new-user';
import Roles from '../roles/roles';

import './layout.scss';

const DashboardLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add-new-user" element={<AddNewUser />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
