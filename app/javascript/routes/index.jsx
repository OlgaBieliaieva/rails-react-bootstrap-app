import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "../components/userContext";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";
import NewRecipe from "../pages/NewRecipe";
import Category from "../pages/Category";

export default (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/recipe/new" element={<NewRecipe />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </Router>
  </UserProvider>
);
