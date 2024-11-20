import React, { useState, useEffect, useRef } from "react";

const RecipesList = ()=> {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setCategories(res))
      .catch((err) => console.log(err));
  }, []);

  const allCategories = categories.map((category, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card h-100 mb-4" style={{ maxHeight: 404 }}>
        <img
          src={category.image}
          className="card-img-top"
          style={{ width: "100%", height: "50%", objectFit: "cover" }}
          alt={`${category.name} image`}
        />

        <div className="card-body position-relative" style={{ maxHeight: 200 }}>
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
  ));
  //   const noCategories = (
  //     <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
  //       <h4>
  //         No categories yet. Why not <Link to="/new_recipe">create one</Link>
  //       </h4>
  //     </div>
  //   );
    return (
<section className="w-100 container container-fluid">
        <div className="container">
          <div className="w-100 row" style={{ rowGap: 16 }}>
            {categories.length > 0 && allCategories}
          </div>
        </div>
      </section>
    )
}
export default RecipesList