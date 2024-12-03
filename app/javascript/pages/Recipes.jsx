import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { AddLinkButton } from "../components/Buttons";
import Select from "../components/Select";
import RecipesList from "../components/RecipesList";
import Footer from "../components/Footer";
import { BsArrowLeftShort } from "react-icons/bs";

const Recipes = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState("");
  const [areas, setAreas] = useState("");
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, [location.search]);

  useEffect(() => {
    fetchCategories();
    fetchAreas();
    fetchIngredients();
  }, []);

  async function fetchRecipes() {
    try {
      const response = await axios.get(
        `/api/v1/recipes/index/${location.search ?? location.search}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/v1/categories/index");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  }

  async function fetchAreas() {
    try {
      const response = await axios.get("/api/v1/areas/index");
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error.message);
    }
  }

  async function fetchIngredients() {
    try {
      const response = await axios.get("/api/v1/ingredients/index");
      setIngredients(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
    }
  }

  const handleSelect = (name = null, value = "All") => {
    if (name === "category") {
      const area = searchParams.get("area");
      const ingredient = searchParams.get("ingredient");

      const newParams = {
        category: value,
        area: area ?? "All",
        ingredient: ingredient ?? "All",
      };

      setSearchParams(newParams);
    } else if (name === "area") {
      const category = searchParams.get("category");
      const ingredient = searchParams.get("ingredient");
      const newParams = {
        category: category ?? "All",
        area: value,
        ingredient: ingredient ?? "All",
      };

      setSearchParams(newParams);
    } else {
      const category = searchParams.get("category");
      const area = searchParams.get("area");
      const newParams = {
        category: category ?? "All",
        area: area ?? "All",
        ingredient: value,
      };
      setSearchParams(newParams);
    }
  };

  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center gap-4">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-2 bg-dark rounded-5">
        <Header />
        <section className="w-75 py-3 d-flex flex-column align-items-center justify-content-center gap-3">
          <h1
            className="text-light text-center text-capitalize"
            style={{ fontSize: 56 }}
          >
            Recipes for every occasion
          </h1>
          <p className="text-light text-center fs-4">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
          <AddLinkButton path={"/recipe/new"} text="Add recipe" />
        </section>
      </div>
      <main>
        <section className="w-100 d-flex flex-column gap-3 pt-3 px-5">
          <div>
            <Link to={backLinkRef.current} className="text-dark">
              <BsArrowLeftShort style={{ width: 32, height: 32 }} />
              <span className="fs-5">Back</span>
            </Link>
          </div>
          {areas.length > 0 &&
          ingredients.length > 0 &&
          categories.length > 0 ? (
            <form className="row g-3" id="filter-form">
              <div className="col">
                <Select
                  data={categories}
                  label="Choose category"
                  name="category"
                  onSelect={handleSelect}
                />
              </div>
              <div className="col">
                <Select
                  data={areas}
                  label="Choose area"
                  name="area"
                  onSelect={handleSelect}
                />
              </div>
              <div className="col">
                <Select
                  data={ingredients}
                  label="Choose ingredient"
                  name="ingredient"
                  onSelect={handleSelect}
                />
              </div>
            </form>
          ) : null}
        </section>
        {recipes ? <RecipesList recipes={recipes} /> : noRecipe}
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
