import React from "react";
import { Link } from "react-router-dom";
import { BsArrowDownRightCircle } from "react-icons/bs";

const RecipesList = ({ recipes }) => {
  const allRecipes = recipes?.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card h-100 mb-4" >
        <img
          src={recipe.thumb}
          className="card-img-top"
          style={{ width: "100%", height: "60%", objectFit: "cover" }}
          alt={`${recipe.title} image`}
        />

        <div
          className="card-body"
          style={{
            position: "relative",
            height: 150,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <h3 className="card-title" style={{ maxHeight: 70, overflow: "hidden", textOverflow: "ellipsis" }}>{recipe.title}</h3>
          <p
            className="text-muted"
            style={{ height: 50, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {recipe.description}
          </p>
          <Link
            to={`/recipe/${recipe.id}`}
            className="btn"
            style={{ position: "absolute", bottom: 8, right: 8 }}
          >
            <BsArrowDownRightCircle style={{ width: 32, height: 32 }} />
          </Link>
        </div>
      </div>
    </div>
  ));

  const noRecipes = (
    <div className="w-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <section className="w-100 container container-fluid">
      <div className="container d-flex align-items-center">
        <div className="w-100 row" style={{ rowGap: 16 }}>
          {recipes?.length > 0 ? allRecipes : noRecipes}
        </div>
      </div>
    </section>
  );
};
export default RecipesList;
