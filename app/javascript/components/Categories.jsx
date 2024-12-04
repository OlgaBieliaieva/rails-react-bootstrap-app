import React from "react";
import { Link } from "react-router-dom";
import { BsArrowDownRightCircle } from "react-icons/bs";

const Categories = ({ categories, isLoading }) => {
  const allCategories = categories.map((category, index) =>
    index % 2 ? (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card h-100 mb-4" style={{ maxHeight: 404 }}>
          <img
            src={category.image}
            className="card-img-top"
            style={{ width: "100%", height: "50%", objectFit: "cover" }}
            alt={`${category.name} image`}
          />

          <div
            className="card-body position-relative"
            style={{ maxHeight: 200 }}
          >
            <h3 className="card-title">{category.name}</h3>
            <p className="text-muted" style={{ textOverflow: "ellipsis" }}>
              {category.description}
            </p>
            <Link
              to={`/category/${category.id}`}
              className="btn"
              style={{ position: "absolute", bottom: 8, right: 8 }}
            >
              <BsArrowDownRightCircle style={{ width: 32, height: 32 }} />
            </Link>
          </div>
        </div>
      </div>
    ) : null
  );
  const noCategories = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No categories yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <section className="w-100 container container-fluid text-center">
      <div className=" w-100 container py-5">
        <h2 className="display-4">Categories</h2>
        <p className="lead text-muted">
          Discover a limitless world of culinary possibilities and enjoy
          exquisite recipes that combine taste, style and the warm atmosphere of
          the kitchen.
        </p>
      </div>
      <div className="container w-100">
        <div className="w-100 row" style={{ rowGap: 16 }}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : categories.length > 0 ? (
            <>
              {allCategories}
              <div className="col-md-6 col-lg-4">
                <div
                  className="card h-100 mb-4 d-flex align-items-center justify-content-center bg-dark fw-bold fs-1"
                  style={{ maxHeight: 404 }}
                >
                  <Link
                    to="/recipes"
                    className="link-underline link-underline-opacity-0 text-light"
                  >
                    All recipes
                  </Link>
                </div>
              </div>
            </>
          ) : (
            noCategories
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
