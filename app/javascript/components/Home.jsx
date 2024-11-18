import React from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";



export default () => {
 
  return (
  <div className="vw-100 p-4 primary-color d-flex flex-column align-items-center justify-content-center">
    <div className="w-100 jumbotron jumbotron-fluid bg-dark rounded-5">
      <header className="w-100 p-4 d-flex justify-content-between text-light">
        <p>Recipes</p>
        <nav>
          <ul className="w-100 d-flex gap-3">
            <li>Home</li>
            <li>Add recipe</li>
          </ul>
        </nav>
        <div>
          <img
            // className={styles.userBarAvatar}
            src="https://res.cloudinary.com/de3wlojzp/image/upload/v1731961136/noUserPhoto_phuwu9.jpg"
            alt="user"
            width={32}
            height={32}
          />
        </div>
      </header>
      <div className="container secondary-color">
        <h1 className="display-4">Food Recipes</h1>
        <p className="lead">
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr className="my-4" />
        <Link to="/recipes" className="btn btn-lg custom-button" role="button">
          View Recipes
        </Link>
      </div>
    </div>
    <Categories />
  </div>
)};
