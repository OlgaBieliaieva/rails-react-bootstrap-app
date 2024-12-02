import React, { useState, useContext } from "react";
import { Form, FormGroup, FormControl, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../components/userContext";
import { SubmitFormButton } from "./Buttons";
import authService from "../services/authService";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("It's not email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

let initialValues = {
  email: "",
  password: "",
};

const SignInForm = ({ onClose }) => {
  const { setUser } = useContext(UserContext);
  const [successToastIsShown, setSuccessToastIsShown] = useState(false);
  const [errorToastIsShown, setErrorToastIsShown] = useState(false);

  const handleSubmit = async ({ email, password }, { resetForm }) => {
    try {
      const data = await authService.login(email, password);
      console.log(data);
      setUser(data.user);
      setSuccessToastIsShown(true);
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.log(error);
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

            <SubmitFormButton type="submit" text="Sign in" />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInForm;
