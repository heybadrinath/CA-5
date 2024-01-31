import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/Home";
function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
      </Routes>
    </>
  );
}

export default AllRoutes;
