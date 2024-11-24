import React, { useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { SubmitFormButton } from "./Buttons";

const SignUpForm = ({ onClose }) => {
  const handleSubmit = () => {
    onClose();
  };
  return (
    <Form>
      <FormLabel className="w-100">
        <input
          type="text"
          name="name"
          id="name"
          className="w-100 form-control"
          placeholder="Name"
          required
          // onChange={(event) => onChange(event, setTitle)}
        />
      </FormLabel>
      <FormLabel className="w-100">
        <input
          type="text"
          name="email"
          id="email"
          className="w-100 form-control"
          placeholder="Email"
          required
          // onChange={(event) => onChange(event, setTitle)}
        />
      </FormLabel>
      <FormLabel className="w-100">
        <input
          type="password"
          name="password"
          id="password"
          className="w-100 form-control"
          placeholder="Password"
          required
          // onChange={(event) => onChange(event, setTitle)}
        />
      </FormLabel>
      <SubmitFormButton text="Create" action={handleSubmit} />
    </Form>
  );
};
export default SignUpForm;
