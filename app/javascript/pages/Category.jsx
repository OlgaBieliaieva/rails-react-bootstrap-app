import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "../components/Header";
import { AddButton } from "../components/Buttons";
import Select from "../components/Select";
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
  const [targetArea, setTargetArea] = useState(null);
  const [targetIngredient, setTargetIngredient] = useState(null);
  const defaultItem = { name: "All" };

  useEffect(() => {
    const url = `/api/v1/categories/show/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setCategory(res))
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    const url = `/api/v1/areas/index`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setAreas(res))
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    const url = `/api/v1/ingredients/index`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setIngredients(res))
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    const url = `/api/v1/recipes/index${location.search ?? location.search}`;
    console.log(url);
    
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }, [searchParams]);

  const handleSelect = (name = null, id = null, value = "All") => {
    console.log(name);
    console.log(id);
    console.log(value);

    if (name === "area") {
      setTargetArea(value);
      const ingredient = searchParams.get("ingredient");
      console.log(ingredient);

      const newParams = ingredient
        ? { area: value, ingredient }
        : { area: value };
      setSearchParams(newParams);
    } else {
      setTargetIngredient(value);
      const area = searchParams.get("area");
      const newParams = area
        ? { area, ingredient: value ?? "" }
        : { ingredient: value ?? "" };
      setSearchParams(newParams);
    }
  };
  console.log(location);
  console.log(recipes);
  
  

  return (
    <div className="w-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center gap-2 bg-dark rounded-5">
        <Header />
        <div className="w-75 py-3 d-flex flex-column align-items-center justify-content-center gap-3">
          <h1
            className="text-light text-center text-capitalize"
            style={{ fontSize: 56 }}
          >
            {category.name}
          </h1>
          <p className="text-light text-center fs-4">{category.description}</p>
          <AddButton text="Add recipe" />
        </div>
      </div>
      <div className="w-100 d-flex flex-column gap-3 pt-3 px-5">
        <Link to={backLinkRef.current} className="w-100 text-dark">
          <BsArrowLeftShort style={{ width: 32, height: 32 }} />
          <span className="fs-5">Back</span>
        </Link>
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
      </div>
    </div>
  );
};
export default Category;
