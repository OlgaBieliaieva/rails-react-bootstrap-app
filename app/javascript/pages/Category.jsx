import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { AddButton } from "../components/Buttons";
import Select from "../components/Select";
import { BsArrowLeftShort } from "react-icons/bs";

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  const [category, setCategory] = useState("");
  const [areas, setAreas] = useState("");
  const [ingredients, setIngredients] = useState("");

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
          <div className="w-100 d-flex align-items-center justify-content-center gap-3">
            <Select data={areas} />
            <Select data={ingredients} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Category;
