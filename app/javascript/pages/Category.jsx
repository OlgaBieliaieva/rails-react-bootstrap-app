import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
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

const Category = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  const [category, setCategory] = useState("");
  const [areas, setAreas] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState("");

  useEffect(() => {
    fetchCategory();
  }, [params.id, location.search]);

  useEffect(() => {
    fetchAreas();
    fetchIngredients();
  }, []);

  async function fetchCategory() {
    try {
      const response = await axios.get(
        `/api/v1/categories/show/${params.id}${
          location.search ?? location.search
        }`
      );
      setCategory(response.data.category);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching areas:", error.message);
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
    if (name === "area") {
      const ingredient = searchParams.get("ingredient");
      const newParams = ingredient
        ? { area: value, ingredient }
        : { area: value };
      setSearchParams(newParams);
    } else {
      const area = searchParams.get("area");
      const newParams = area
        ? { area, ingredient: value ?? "" }
        : { ingredient: value ?? "" };
      setSearchParams(newParams);
    }
  };

  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-2 bg-dark rounded-5">
        <Header />
        <section className="w-75 py-3 d-flex flex-column align-items-center justify-content-center gap-3">
          <h1
            className="text-light text-center text-capitalize"
            style={{ fontSize: 56 }}
          >
            {category.name}
          </h1>
          <p className="text-light text-center fs-4">{category.description}</p>
          <AddLinkButton path={"/recipe/new"} text="Add recipe" />
        </section>
      </div>
      <main>
        <div className="w-100 d-flex flex-column gap-3 pt-3 px-5">
          <div>
            <Link to={backLinkRef.current} className="w-100 text-dark">
              <BsArrowLeftShort style={{ width: 32, height: 32 }} />
              <span className="fs-5">Back</span>
            </Link>
          </div>
          <section>
            {areas.length > 0 && ingredients.length > 0 ? (
              <form className="row g-3" id="filter-form">
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
        </div>
        {recipes ? <RecipesList recipes={recipes} /> : null}
      </main>
      <Footer />
    </div>
  );
};
export default Category;
