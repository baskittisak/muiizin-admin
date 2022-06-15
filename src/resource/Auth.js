import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";

const Auth = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(Auth);
