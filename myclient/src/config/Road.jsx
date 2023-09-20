import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import AddProduct from "../pages/cog/AddProduct";
import UDProduct from "../pages/cog/UDProduct";
import Cart from "../pages/cart/Cart";
import LoginPage from "../pages/cog/LoginPage";

const Road = () =>{
    return(
        <Routes>
        {/* <Route path="/products/ud" exact element={<UDProduct/>}/>
        <Route path="/products/add" exact element={<AddProduct/>}/>
        <Route path="/owner/login" exact element={<LoginPage/>}/> */}
        <Route path="/cart" exact element={<Cart/>}/>
        <Route path="/products" exact element={<Product/>}/>
        <Route path="/" exact element={<Home/>}/>
    </Routes>
    )
}
export default Road