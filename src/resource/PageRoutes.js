import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../components/Login";
import ProductList from "../components/product/ProductList";
import Product from "../components/product/Product";
import Categories from "../components/categories/Categories";
import Category from "../components/categories/Category";
import BannerList from "../components/banner/BannerList";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category" element={<Category />} />
        <Route path="/banner-list" element={<BannerList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(PageRoutes);
