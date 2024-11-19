import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";

export default () => {
  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-5 bg-dark rounded-5">
        <Header />
        <Hero />
      </div>
      <Categories />
    </div>
  );
};
