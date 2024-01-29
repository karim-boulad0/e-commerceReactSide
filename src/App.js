import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Website/Auth/Login";
import SignUp from "./Pages/Website/Auth/SignUp";
import Logout from "./Pages/Website/Auth/Logout";
import GoogleCaLLBack from "./Pages/Website/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import Spinner from "./Components/Global/Spinner";
import Users from "./Pages/Dashboard/users/Users";
import User from "./Pages/Dashboard/users/User";
import AddUser from "./Pages/Dashboard/users/AddUser";
import ForBiden from "./Components/Dashboard/403";
import ForBiden4 from "./Components/Global/404";
import RequireBack from "./Pages/Website/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories/Categories";
import AddCategory from "./Pages/Dashboard/Categories/AddCategory";
import Category from "./Pages/Dashboard/Categories/Category";
import Products from "./Pages/Dashboard/products/Products";
import AddProduct from "./Pages/Dashboard/products/AddProduct";
import CategoryProducts from "./Pages/Website/webShow/CategoryProducts";
import UserProfile from "./Pages/Dashboard/users/UserProfile";
import Product from "./Pages/Dashboard/products/Product";
import WebsiteProduct from "./Pages/Website/webShow/WebsiteProduct";
import UserDetails from "./Pages/Website/webShow/UserDetails";
import MainWebSiteLayout from "./Components/Website/webShow/MainWebSiteLayout";
import HomePage from "./Pages/Website/webShow/HomePage";
import About from "./Pages/Website/webShow/About";
import Settings from "./Pages/Dashboard/settings/Settings";
import { useState } from "react";
import SiteCategories from "./Pages/Website/webShow/SiteCategories";
import OrderItems from "./Pages/Website/webShow/OrderItems";
import WebSiteOrders from "./Pages/Website/webShow/Orders";
import Orders from "./Pages/Dashboard/orders/Orders";
import Order from "./Pages/Dashboard/orders/Order";
import Notifications from "./Pages/Dashboard/notifications/Notifications";
import Statistic from "./Pages/Dashboard/statistic/Statistic";

export default function App({ PropNotification }) {
  const [setting, setSetting] = useState(0);
  function updateSettings() {
    setSetting((prev) => prev + 1);
  }

  return (
    <>
      <Routes>
        {/* global  */}
        <Route element={<ForBiden />} path="/dashboard/403"></Route>
        <Route path="/*" element={<ForBiden4 />}></Route>
        <Route path="/spinner" element={<Spinner />}></Route>
        <Route element={<RequireBack />}>
          <Route path="/" element={<Login />}></Route>
        </Route>
        {/* website routes */}
        <Route path="/index" element={<MainWebSiteLayout />}>
          <Route path="categories" element={<SiteCategories />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="userDetails" element={<UserDetails />}></Route>
          <Route path="" element={<HomePage />}></Route>
          <Route path="HomePage" element={<HomePage />}></Route>
          <Route path="carts" element={<OrderItems />}></Route>
          <Route path="orders" element={<WebSiteOrders />}></Route>

          {/* categories of website */}
          <Route
            path="categoryProducts/:id"
            element={<CategoryProducts />}
          ></Route>
          <Route path="product/:id" element={<WebsiteProduct />}></Route>
        </Route>

        {/* public routes auth  */}

        {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route element={<RequireBack />}>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route
          path="/auth/google/callback"
          element={<GoogleCaLLBack />}
        ></Route>
        {/* protected routes */}
        <Route element={<RequireAuth AllowedRole={["1995", "1996", "1999"]} />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                setting={setting}
                PropNotification={PropNotification}
              />
            }
          >
            <Route
              path="settings"
              element={<Settings updateSettings={updateSettings} />}
            ></Route>
            <Route path="notifications" element={<Notifications />}></Route>
            <Route path="userProfile" element={<UserProfile />}></Route>

            <Route element={<RequireAuth AllowedRole={["1995"]} />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="user/add" element={<AddUser />}></Route>
              <Route path="users/:id" element={<User />}></Route>
            </Route>
            <Route element={<RequireAuth AllowedRole={["1995"]} />}>
              <Route path="orders" element={<Orders />}></Route>
              <Route element={<Order />} path="orders/:id"></Route>
            </Route>
            <Route element={<RequireAuth AllowedRole={["1995"]} />}>
              <Route path="statistic" element={<Statistic />}></Route>
            </Route>

            <Route element={<RequireAuth AllowedRole={["1999", "1995"]} />}>
              {/* Categories  */}
              <Route path="categories" element={<Categories />}></Route>
              <Route path="category/add" element={<AddCategory />}></Route>
              <Route path="categories/:id" element={<Category />}></Route>
              {/* products */}
              <Route path="products" element={<Products />}></Route>
              <Route path="product/add" element={<AddProduct />}></Route>
              <Route path="products/:id" element={<Product />}></Route>
              {/* products */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
