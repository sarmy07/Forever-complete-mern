import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { ToastContainer } from "react-toastify";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/pages/Dashboard";
import AllProducts from "./pages/admin/pages/AllProducts";
import AddProducts from "./pages/admin/pages/AddProducts";
import Orders from "./pages/admin/pages/Orders";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto p-4">
      <Router>
        <ScrollToTop />
        <ToastContainer autoClose={2000} hideProgressBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/user/:id" element={<MyOrders />} />

          {/* admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/add-new-product" element={<AddProducts />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}
