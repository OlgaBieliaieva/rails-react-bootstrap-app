import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
//   const [thumb, setThumb] = useState("");
//   const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const stringToArray = (str) => {
    return str.split(",")
  }

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";

    if (
      title.length == 0 ||
      category.length == 0 ||
      area.length == 0 ||
      description.length == 0 ||
    //   time.length == 0 ||
    //   thumb.length == 0 ||
      ingredients.length == 0 ||
      instructions.length == 0
    )
      return;

    const body = {
      title,
      category,
      area,
      ingredients: stringToArray(ingredients),
      time,
      thumb,
      description: stripHtmlEntities(description),
      instructions: stripHtmlEntities(instructions),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeTitle">Recipe title</label>
              <input
                type="text"
                name="title"
                id="recipeTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeCategory">Recipe category</label>
              <input
                type="text"
                name="category"
                id="recipeCategory"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCategory)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeArea">Recipe area </label>
              <input
                type="text"
                name="area"
                id="recipeArea"
                className="form-control"
                required
                onChange={(event) => onChange(event, setArea)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">Recipe description </label>
              <input
                type="text"
                name="description"
                id="recipeDescription"
                className="form-control"
                required
                onChange={(event) => onChange(event, setDescription)}
              />
            </div>   
                    
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                onChange={(event) => onChange(event, setIngredients)}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            
            <label htmlFor="instructions">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instructions"
              name="instructions"
              rows="5"
              required
              onChange={(event) => onChange(event, setInstructions)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
