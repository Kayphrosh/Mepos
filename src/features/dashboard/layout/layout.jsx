import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from '../../../components/sidebar/Sidebar';
import Topbar from '../../../components/topbar/Topbar';
import Home from '../home/home';
import Users from '../user/users';
import AddNewUser from '../add-new-user/add-new-user';
import Roles from '../roles/roles';
import AddNewRole from '../add-new-role/add-new-role';
import Customers from '../customers/customers';
import ProductList from '../product-list/ProductList';
import Transactions from "../sales/transactions/transaction";
import ImportSales from "../sales/import-sales/import-sales";
import Discounts from '../discounts/discounts';


import "./layout.scss";
import SuspendedSales from "../sales/suspended-sales/suspended-sales";

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
            <Route path="/roles/add-new-role" element={<AddNewRole />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/suspended-sales" element={<SuspendedSales />} />
            <Route path="/import-sales" element={<ImportSales />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/discounts" element={<Discounts/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
