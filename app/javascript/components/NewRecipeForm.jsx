import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, FormControl, FloatingLabel } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { BsTrash3 } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
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
  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      // .required("Choose ingredient"),
      measure: Yup.string(),
      // .required("Type quantity"),
    })
  ),
  time: Yup.string().required("Time is required"),
  instructions: Yup.string()
    .min(3, "Instructions must be at least 3 characters")
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

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    // const url = "/api/v1/recipes/create";

    // if (
    //   title.length == 0 ||
    //   category.length == 0 ||
    //   area.length == 0 ||
    //   description.length == 0 ||
    //   time.length == 0 ||
    //   thumb.length == 0 ||
    //   ingredients.length == 0 ||
    //   instructions.length == 0
    // )
    //   return;

    // const body = {
    //   title,
    //   category,
    //   area,
    //   ingredients: stringToArray(ingredients),
    //   time,
    //   thumb,
    //   description: stripHtmlEntities(description),
    //   instructions: stripHtmlEntities(instructions),
    // };
    // console.log(body);

    // const token = document.querySelector('meta[name="csrf-token"]').content;
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "X-CSRF-Token": token,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then((response) => navigate(`/recipe/${response.id}`))
    //   .catch((error) => console.log(error.message));
  };

  return (
    <div className="w-100 container container-fluid">
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            id="add-recipe-form"
            className="d-flex flex-column align-items-center justify-content-center gap-5 w-100 mb-5"
            noValidate
            onSubmit={handleSubmit}
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
                  rows={2}
                  name="title"
                  value={values.title}
                  className="form-control w-100 border-0 border-bottom rounded-0"
                  style={{
                    paddingRight: 68,
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
                  className="form-control w-100 border-0 border-bottom rounded-0"
                  style={{
                    paddingRight: 68,
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
              <div className="row row-cols-1 row-cols-md-2 justify-content-between">
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
            <FormGroup
              controlId="ingredients"
              className="container container-fluid"
            >
              <FieldArray name="ingredients">
                {({ insert, remove, push }) => (
                  <>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="row row-cols-1 row-cols-md-2 justify-content-between mb-3"
                        >
                          <div className="col-md-5">
                            <FloatingLabel
                              id={`ingredients.${index}.name`}
                              controlId={`ingredients.${index}.name`}
                              label="Recipe ingredient"
                              className="w-100"
                            >
                              <Form.Select
                                name={`ingredients.${index}.name`}
                                // value={`ingredients.${index}.name`}
                                className="form-control w-100 border-0 border-bottom rounded-0"
                                isInvalid={!!errors.ingredients}
                                isValid={
                                  touched.ingredients && !errors.ingredients
                                }
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
                          </div>
                          <div className="col-md-5">
                            <FloatingLabel
                              id={`ingredients.${index}.measure`}
                              controlId={`ingredients.${index}.measure`}
                              label="Type ingredient quantity"
                              className="w-100"
                            >
                              <FormControl
                                name={`ingredients.${index}.measure`}
                                // value={values.title}
                                className="form-control border-0 border-bottom rounded-0"
                                // style={{
                                //   resize: "none",
                                //   paddingRight: 68,
                                //   height: "fit-content",
                                // }}
                                placeholder="Type ingredient quantity"
                                isInvalid={!!errors.ingredients}
                                isValid={
                                  touched.ingredients && !errors.ingredients
                                }
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                            <FormControl.Feedback type="invalid">
                              {errors.ingredients}
                            </FormControl.Feedback>
                          </div>
                          <button
                            className="btn col-md-auto"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <BsTrash3 />
                          </button>
                        </div>
                      ))}
                    <button
                      className="btn px-3 py-2 border-2 border-dark rounded-pill bg-transparent text-uppercase"
                      type="button"
                      onClick={() => push({ ingredient: "", measure: "" })}
                    >
                      <BsPlus />
                      <span>Add ingredient</span>
                    </button>
                  </>
                )}
              </FieldArray>
            </FormGroup>
            <FormGroup controlId="time" className="w-100">
              <FloatingLabel
                id="new-recipe-time"
                controlId="time"
                label="Cooking time"
                className="w-100"
              >
                <FormControl
                  name="time"
                  value={values.time}
                  className="form-control w-100 pe-5"
                  placeholder="Time"
                  isInvalid={!!errors.time}
                  isValid={touched.time && !errors.time}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute fs-6 text-muted"
                  style={{ top: 20, right: 12 }}
                >
                  min
                </span>
              </FloatingLabel>
              <FormControl.Feedback type="invalid">
                {errors.time}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup controlId="instructions" className="w-100">
              <FloatingLabel
                id="new-recipe-instructions"
                controlId="instructions"
                label="Recipe instructions"
                className="w-100"
              >
                <FormControl
                  as="textarea"
                  rows={6}
                  name="instructions"
                  value={values.instructions}
                  className="form-control w-100"
                  style={{
                    paddingRight: 68,
                  }}
                  placeholder="instructions"
                  isInvalid={!!errors.instructions}
                  isValid={touched.instructions && !errors.instructions}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute fs-6 text-muted"
                  style={{ top: 20, right: 12 }}
                >
                  {values.instructions.length}/999
                </span>
              </FloatingLabel>
              <FormControl.Feedback type="invalid">
                {errors.instructions}
              </FormControl.Feedback>
            </FormGroup>

            <div className="w-100 d-flex align-items-center justify-content-center gap-3 ">
              <SubmitFormButton type="submit" text="Create" />
              <SubmitFormButton type="reset" text="Reset" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default NewRecipeForm;
