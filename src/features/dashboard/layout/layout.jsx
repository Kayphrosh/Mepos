import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import Home from "../home/home";
import Users from "../user/users";
import AddNewUser from "../add-new-user/add-new-user";
import Roles from "../roles/roles";
import AddNewRole from "../add-new-role/add-new-role";
import Customers from "../customers/customers";
import ProductList from "../products/product-list/ProductList";
import Transaction from "../sales/transactions/transaction";
import ImportSales from "../sales/import-sales/import-sales";
import Variations from "../products/variations/Variations";
import Discounts from "../sales/discounts/discounts";
import Pos from "../sales/pos/Pos";
import "./layout.scss";
import SuspendedSales from "../sales/suspended-sales/suspended-sales";
import AddNewProduct from "../products/add-new-product/add-new-product";
import Units from "../products/units/Units";
import ProductCategory from "../products/category/category";
import Suppliers from "../contacts/suppliers/suppliers";
import CustomerGroups from "../contacts/customer-groups/customer-groups";
import PurchasesList from "../purchases/PurchasesList/PurchasesList";
import AddNewPurchase from "../purchases/add-new-purchase/AddNewPurchase";

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
            <Route path="/:storeId/transactions" element={<Transaction />} />
            <Route path="/suspended-sales" element={<SuspendedSales />} />
            <Route path="/import-sales" element={<ImportSales />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/add-new-product" element={<AddNewProduct />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/pos" element={<Pos />} />
            <Route path="/units" element={<Units />} />
            <Route path="/categories" element={<ProductCategory />} />
            <Route path="/variations" element={<Variations />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/customer-groups" element={<CustomerGroups />} />
            <Route path="/purchases-list" element={<PurchasesList />} />
            <Route path="/add-new-purchase" element={<AddNewPurchase />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
