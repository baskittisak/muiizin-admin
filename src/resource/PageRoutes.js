import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../components/Login";
import ProductList from "../components/product/ProductList";
import Product from "../components/product/Product";
import Categories from "../components/categories/Categories";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(PageRoutes);
