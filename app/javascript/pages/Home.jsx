import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";

export default () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/v1/categories/index");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  }

  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-5 bg-dark rounded-5">
        <Header />
        <Hero />
      </div>
      <Categories categories={categories} />
    </div>
  );
};
