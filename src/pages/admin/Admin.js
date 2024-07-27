import React from "react";
import styles from "./Admin.module.scss";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Navbar from "../../components/admin/navbar/Navbar";
import ViewProducts from "../../components/admin/viewPoducts/ViewProducts";
import AddProduct from "../../components/admin/addProducts/AddProduct";
import Orders from "../../components/admin/orders/Orders";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
