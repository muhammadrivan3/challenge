import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";

const Pathway = () =>{
    <Routes>
        <Route path="/product" exact element={<Product/>}/>
        <Route path="/" exact element={<Home/>}/>
    </Routes>
}
export default Pathway