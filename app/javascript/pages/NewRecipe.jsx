import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NewRecipeForm from "../components/NewRecipeForm";
import Footer from "../components/Footer";

const NewRecipe = () => {
  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center gap-4">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-2 bg-dark rounded-5">
        <Header />
      </div>
      <div className="w-100 container container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/recipes">Recipes</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              New recipe
            </li>
          </ol>
        </nav>
      </div>
      <main className="w-100">
        <div className="w-100 container container-fluid">
          <h1 className="font-weight-normal ">Create new recipe</h1>
          <p className="lead text-muted mb-3">
            Add a new recipe to our awesome recipe collection.
          </p>
        </div>
        <NewRecipeForm />
      </main>
      <Footer />
    </div>
  );
};

export default NewRecipe;
