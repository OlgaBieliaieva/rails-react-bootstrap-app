import React, { useState, useContext } from "react";
import { Form, FormGroup, FormControl, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../components/userContext";
import { SubmitFormButton } from "./Buttons";
import authService from "../services/authService";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be no more 20 characters")
    .required("Name is required"),
  email: Yup.string().email("It's not email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

let initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignUpForm = ({ onClose }) => {
  const { setUser } = useContext(UserContext);
  const [successToastIsShown, setSuccessToastIsShown] = useState(false);
  const [errorToastIsShown, setErrorToastIsShown] = useState(false);

  const handleSubmit = async (
    { name, email, password, passwordConfirm },
    { resetForm }
  ) => {
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return; // add notification
    }
    try {
      const data = await authService.register(
        name,
        email,
        password,
        passwordConfirm
      );
      setUser(data.user);
      setSuccessToastIsShown(true);
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setErrorToastIsShown(true); // add notification
      resetForm();
    }
  };

  return (
    <>
      {successToastIsShown && (
        <Toast
          onClose={() => setSuccessToastIsShown(false)}
          show={successToastIsShown}
          delay={3000}
          autohide
          bg="success"
          className="position-absolute top-0 end-0"
        >
          <Toast.Header>
            <strong className="me-auto">Congratulations!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Woohoo, you registered successfully!
          </Toast.Body>
        </Toast>
      )}
      {errorToastIsShown && (
        <Toast
          onClose={() => setErrorToastIsShown(false)}
          show={errorToastIsShown}
          delay={3000}
          autohide
          bg="danger"
          className="position-absolute top-0 end-0"
        >
          <Toast.Header>
            <strong className="me-auto">Error!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Email is already registered
          </Toast.Body>
        </Toast>
      )}
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            id="sign-up-form"
            className="d-flex flex-column align-items-center justify-content-center gap-3 w-100"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormGroup controlId="name" className="w-100">
              <FormControl
                type="text"
                name="name"
                value={values.name}
                className="form-control w-100 rounded-pill"
                placeholder="Name"
                isInvalid={!!errors.name}
                isValid={touched.name && !errors.name}
                onChange={handleChange}
              />
              <FormControl.Feedback type="invalid">
                {errors.name}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup controlId="email" className="w-100">
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
            </FormGroup>

            <FormGroup controlId="passwordConfirm" className="w-100">
              <FormControl
                type="password"
                name="passwordConfirm"
                value={values.passwordConfirm}
                className="form-control w-100 rounded-pill"
                placeholder="Confirm password"
                isValid={touched.passwordConfirm && !errors.passwordConfirm}
                isInvalid={!!errors.passwordConfirm}
                onChange={handleChange}
              />
              <FormControl.Feedback type="invalid">
                {errors.passwordConfirm}
              </FormControl.Feedback>
            </FormGroup>

            <SubmitFormButton type="submit" text="Create" />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignUpForm;
