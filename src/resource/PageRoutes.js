import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../components/ProductList";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(PageRoutes);
