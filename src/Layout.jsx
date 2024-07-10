import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header";

function Layout() {

  return (
    <div className="">
      <div className="bg-gray-200">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;