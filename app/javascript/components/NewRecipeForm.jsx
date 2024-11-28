import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, FormControl, FloatingLabel } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { SubmitFormButton } from "./Buttons";

const validationSchema = Yup.object().shape({
  //   thumb: Yup.string(),
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be no more 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description must be no more 200 characters")
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
  area: Yup.string().required("Area is required"),
  // ingredients: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string().required("Choose ingredient"),
  //     measure: Yup.string().required("Type quantity"),
  //   })
  // ),
  time: Yup.string().required("Time is required"),
  instructions: Yup.string()
    .max(999, "Instructions must be no more 999 characters")
    .required("Instructions is required"),
});

let initialValues = {
  //   thumb: "",
  title: "",
  description: "",
  category: "",
  area: "",
  ingredients: [
    {
      name: "",
      measure: "",
    },
  ],
  time: "",
  instructions: "",
};

const NewRecipeForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState("");
  const [areas, setAreas] = useState("");
  const [ingredientsList, setIngredientsList] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchAreas();
    fetchIngredients();
  }, []);

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
      setIngredientsList(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
    }
  }

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const stringToArray = (str) => {
    return str.split(",");
  };

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
      time.length == 0 ||
      thumb.length == 0 ||
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
    console.log(body);

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

  //   const allCategories = categories?.map((item, index) => (
  //     <option
  //       key={index}
  //       value={item.name}
  //       id={`${item.db_id ? item.db_id : item.id}`}
  //     >
  //       {item.name}
  //     </option>
  //   ));
  console.log(categories);
  console.log(areas);
  console.log(ingredientsList);

  return (
    <div className="w-100 container container-fluid">
      <Formik
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            id="add-recipe-form"
            className="d-flex flex-column align-items-center justify-content-center gap-4 w-100"
            noValidate
            // onSubmit={handleSubmit}
          >
            <FormGroup controlId="title" className="w-100">
              <FloatingLabel
                id="new-recipe-title"
                controlId="title"
                label="Recipe title"
                className="w-100"
              >
                <FormControl
                  as="textarea"
                  rows={3}
                  name="title"
                  value={values.title}
                  className="form-control w-100"
                  style={{
                    resize: "none",
                    paddingRight: 68,
                    height: "fit-content",
                  }}
                  placeholder="Title"
                  isInvalid={!!errors.title}
                  isValid={touched.title && !errors.title}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute fs-6 text-muted"
                  style={{ top: 20, right: 12 }}
                >
                  {values.title.length}/100
                </span>
              </FloatingLabel>
              <FormControl.Feedback type="invalid">
                {errors.title}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup controlId="description" className="w-100">
              <FloatingLabel
                id="new-recipe-description"
                controlId="description"
                label="Recipe description"
                className="w-100"
              >
                <FormControl
                  as="textarea"
                  rows={6}
                  name="description"
                  value={values.description}
                  className="form-control w-100"
                  style={{
                    resize: "none",
                    paddingRight: 68,
                    height: "fit-content",
                  }}
                  placeholder="description"
                  isInvalid={!!errors.description}
                  isValid={touched.description && !errors.description}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute fs-6 text-muted"
                  style={{ top: 20, right: 12 }}
                >
                  {values.description.length}/200
                </span>
              </FloatingLabel>
              <FormControl.Feedback type="invalid">
                {errors.description}
              </FormControl.Feedback>
            </FormGroup>
            <div className="container container-fluid">
              <div className="row row-cols-1 row-cols-md-2 row-gap-3">
                <FormGroup controlId="category" className="col">
                  <FloatingLabel
                    id="new-recipe-category"
                    controlId="category"
                    label="Recipe category"
                    className="w-100"
                  >
                    <Form.Select
                      name="category"
                      value={values.category}
                      className="form-control w-100 border-0 border-bottom rounded-0"
                      isInvalid={!!errors.category}
                      isValid={touched.category && !errors.category}
                      onChange={handleChange}
                    >
                      <option className="text-muted">Choose category</option>
                      {categories.length > 0 &&
                        categories.map((item, index) => (
                          <option
                            key={index}
                            value={item.name}
                            id={`${item.db_id ? item.db_id : item.id}`}
                          >
                            {item.name}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    {errors.category}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="area" className="col">
                  <FloatingLabel
                    id="new-recipe-area"
                    controlId="area"
                    label="Recipe area"
                    className="w-100"
                  >
                    <Form.Select
                      name="area"
                      value={values.area}
                      className="form-control w-100 border-0 border-bottom rounded-0"
                      isInvalid={!!errors.area}
                      isValid={touched.area && !errors.area}
                      onChange={handleChange}
                    >
                      <option className="text-muted">Choose area</option>
                      {areas.length > 0 &&
                        areas.map((item, index) => (
                          <option
                            key={index}
                            value={item.name}
                            id={`${item.db_id ? item.db_id : item.id}`}
                          >
                            {item.name}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    {errors.area}
                  </FormControl.Feedback>
                </FormGroup>
              </div>
            </div>
            <FormGroup controlId="ingredient" className="col">
              <FieldArray name="ingredients">
                {({ insert, remove, push }) => (
                  <>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <div key={index} className="container container-fluid">
                          <div className="row row-cols-1 row-cols-md-2 row-gap-3">
                            <FloatingLabel
                              id={`ingredients.${index}.name`}
                              controlId="ingredient"
                              label="Recipe ingredient"
                              className="w-100"
                            >
                              <Form.Select
                                name={`ingredients.${index}.name`}
                                // value={`ingredients.${index}.name`}
                                className="form-control w-100 border-0 border-bottom rounded-0"
                                isInvalid={!!errors.area}
                                isValid={touched.area && !errors.area}
                                onChange={handleChange}
                              >
                                <option className="text-muted">
                                  Choose ingredient
                                </option>
                                {ingredientsList.length > 0 &&
                                  ingredientsList.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.name}
                                      id={`${
                                        item.db_id ? item.db_id : item.id
                                      }`}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                              </Form.Select>
                            </FloatingLabel>
                            <FormControl.Feedback type="invalid">
                              {errors.ingredients}
                            </FormControl.Feedback>
                            <FloatingLabel
                              id={`ingredients.${index}.measure`}
                              controlId="ingredient-measure"
                              label="Ingredient quantity"
                              className="w-100"
                            >
                              <FormControl
                                name={`ingredients.${index}.measure`}
                                // value={values.title}
                                className="form-control"
                                // style={{
                                //   resize: "none",
                                //   paddingRight: 68,
                                //   height: "fit-content",
                                // }}
                                placeholder="Type ingredient quantity"
                                isInvalid={!!errors.title}
                                isValid={touched.title && !errors.title}
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                            <FormControl.Feedback type="invalid">
                              {errors.title}
                            </FormControl.Feedback>
                            {/* <label
                            htmlFor={`anotherColors.${index}.manufacturerCode`}
                            className={styles.formLabel}
                          >
                            Артикул виробника
                            <Field
                              className={styles.formInput}
                              type="text"
                              id={`anotherColors.${index}.manufacturerCode`}
                              name={`anotherColors.${index}.manufacturerCode`}
                              placeholder="Введіть артикул з коробки..."
                            />
                            <ErrorMessage
                              name={`anotherColors.${index}.manufacturerCode`}
                            >
                              {(message) => (
                                <p className={styles.errorText}>{message}</p>
                              )}
                            </ErrorMessage>
                          </label> */}

                            {/* <button type="button" onClick={() => remove(index)}>
                            <CrossSmallIcon />
                          </button> */}
                          </div>
                        </div>
                      ))}
                    {/* <button
                    className={styles.downloadButton}
                    type="button"
                    onClick={() =>
                      push({ colorName: "", manufacturerCode: "" })
                    }
                  >
                    Додати колір
                  </button> */}
                  </>
                )}
              </FieldArray>
            </FormGroup>
            {/* <FormGroup controlId="email" className="w-100">
              <FormControl
                type="email"
                name="email"
                value={values.email}
                className="form-control w-100 rounded-pill"
                placeholder="Email"
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                onChange={handleChange}
              />
              <FormControl.Feedback type="invalid">
                {errors.email}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup controlId="password" className="w-100">
              <FormControl
                type="password"
                name="password"
                value={values.password}
                className="form-control w-100 rounded-pill"
                placeholder="Password"
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                onChange={handleChange}
              />
              <FormControl.Feedback type="invalid">
                {errors.password}
              </FormControl.Feedback>
            </FormGroup> */}

            {/* <SubmitFormButton text="Create" /> */}
          </Form>
        )}
      </Formik>
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
        <div className="form-group">
          <label htmlFor="recipeTime">Time</label>
          <input
            type="text"
            name="time"
            id="recipeTime"
            className="form-control"
            required
            onChange={(event) => onChange(event, setTime)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipeThumb">Photo</label>
          <input
            type="text"
            name="thumb"
            id="recipeThumb"
            className="form-control"
            required
            onChange={(event) => onChange(event, setThumb)}
          />
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
  );
};
export default NewRecipeForm;
