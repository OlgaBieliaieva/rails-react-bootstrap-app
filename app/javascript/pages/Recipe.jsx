import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const Recipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isValidImg, setIsValidImg] = useState(true);
  let ingredientImg =
    "https://res.cloudinary.com/de3wlojzp/image/upload/v1732287644/no-ingr_xcxuye.png";

  useEffect(() => {
    const url = `/api/v1/recipes/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setRecipe(response.recipe);
        setIngredients(response.expanded_ingredients);
      })
      .catch(() => navigate("/recipes"));
  }, [params.id]);

  const handleError = () => setIsValidImg(false);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteRecipe = () => {
    const url = `/api/v1/recipes/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/recipes"))
      .catch((error) => console.log(error.message));
  };

  const ingredientList = () => {
    let ingredientList = "No ingredients available";

    if (ingredients.length > 0) {
      ingredientList = ingredients.map((ingredient, index) => (
        <div key={index} className="card p-1" style={{ maxWidth: 240 }}>
          <div className="row g-0">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              {isValidImg ? (
                <img
                  src={ingredient.image}
                  className="img-fluid rounded-start"
                  alt={ingredient.name}
                  onError={handleError}
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/de3wlojzp/image/upload/v1732287644/no-ingr_xcxuye.png"
                  className="img-fluid rounded-start"
                  alt={ingredient.name}
                  // onError={setIsValidImg(false)}
                />
              )}
            </div>
            <div className="col-md-9">
              <div className="card-body p-2">
                <h4 className="card-title" style={{ fontSize: 14 }}>
                  {ingredient.name}
                </h4>
                <p className="card-text">
                  <small
                    className="text-body-secondary"
                    style={{ fontSize: 12 }}
                  >
                    {ingredient.measure}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return ingredientList;
  };

  const recipeInstruction = addHtmlEntities(recipe.instructions);

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
              {recipe.title}
            </li>
          </ol>
        </nav>
      </div>
      <div
        className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center overflow-hidden p-0 m-0"
        style={{ borderRadius: 30 }}
      >
        <img
          src={recipe.thumb}
          alt={`${recipe.title} image`}
          style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
        />
      </div>
      <div className="w-100 container container-fluid">
        <h1 className="display-4">{recipe.title}</h1>
        <p className="lead text-muted">{recipe.description}</p>
      </div>

      <div className="container container-fluid w-100">
        <div className="row container container-fluid w-100">
          <div className="col-sm-12 col-lg-3 container container-fluid mb-5">
            <h5 className="mb-2">Ingredients</h5>
            <div className="row gap-2 justify-content-center">
              {ingredientList()}
            </div>
          </div>
          <div className="col-sm-12 col-lg-7 mb-5">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteRecipe}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
