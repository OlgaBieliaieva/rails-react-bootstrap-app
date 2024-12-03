import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormControl,
  FloatingLabel,
  FormLabel,
} from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { BsTrash3 } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { SubmitFormButton } from "./Buttons";

const validationSchema = Yup.object().shape({
  thumb: Yup.mixed(),
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
      measure: Yup.string(),
    })
  ),
  time: Yup.string().required("Time is required"),
  instructions: Yup.string()
    .min(3, "Instructions must be at least 3 characters")
    .max(999, "Instructions must be no more 999 characters")
    .required("Instructions is required"),
});

let initialValues = {
  thumb: "",
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
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("thumb", values.thumb);
    formData.append("category", values.category);
    formData.append("area", values.area);
    formData.append("ingredients", JSON.stringify(values.ingredients));
    formData.append("time", values.time);
    formData.append("instructions", values.instructions);
    console.log(formData);

    try {
      const response = await axios.post("/api/v1/recipes/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log(response);
      resetForm();
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="w-100 container container-fluid">
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
          resetForm
        }) => (
          <Form
            id="add-recipe-form"
            className="d-flex flex-column align-items-center justify-content-center gap-5 w-100 mb-5"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormGroup controlId="thumb" className="w-100">
              {imagePreview ? (
                <div
                  className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center overflow-hidden p-0 m-0 mb-3"
                  style={{ borderRadius: 30}}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 400,
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-100 container container-fluid d-flex flex-column align-items-center justify-content-center overflow-hidden px-0 py-4 m-0 mb-3 border border-secondary-subtle"
                  style={{ width: "100%", maxHeight: 400, borderRadius: 30 }}
                >
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/de3wlojzp/image/upload/v1732287644/no-ingr_xcxuye.png"
                    alt="Preview"
                    style={{ maxWidth: 200, maxHeight: 200 }}
                  />
                </div>
              )}
              <FormLabel className="w-100">
                <FormControl
                  type="file"
                  name="thumb"
                  className="form-control w-100"
                  style={{
                    paddingRight: 68,
                  }}
                  isInvalid={!!errors.thumb}
                  isValid={touched.thumb && !errors.thumb}
                  onChange={(event) => {
                    setFieldValue("thumb", event.target.files[0]);
                    const imageUrl = URL.createObjectURL(event.target.files[0]);
                    setImagePreview(imageUrl);
                  }}
                />
              </FormLabel>
              <FormControl.Feedback type="invalid">
                {errors.thumb}
              </FormControl.Feedback>
            </FormGroup>
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
                {({ remove, push }) => (
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
                                className="form-control w-100 border-0 border-bottom rounded-0"
                                isInvalid={
                                  !!errors.ingredients &&
                                  !!errors.ingredients[index]?.name
                                }
                                isValid={
                                  touched.ingredients &&
                                  !errors.ingredients?.[index]?.name
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
                              {errors.ingredients &&
                                errors.ingredients[index]?.name}
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
                                className="form-control border-0 border-bottom rounded-0"
                                placeholder="Type ingredient quantity"
                                isInvalid={
                                  !!errors.ingredients &&
                                  !!errors.ingredients[index]?.measure
                                }
                                isValid={
                                  touched.ingredients &&
                                  !errors.ingredients?.[index]?.measure
                                }
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                            <FormControl.Feedback type="invalid">
                              {errors.ingredients &&
                                errors.ingredients[index]?.measure}
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
                      onClick={() => push({ name: "", measure: "" })}
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
                  className="form-control w-100 border-0 border-bottom rounded-0"
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
              <SubmitFormButton type="button" text="Reset" action={resetForm} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default NewRecipeForm;
