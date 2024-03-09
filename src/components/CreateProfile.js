import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveProfile, getProfileByEmail } from "../utils/localStorageUtil"; // Adjust the import path as necessary

const phoneRegExp = /^\+?[1-9]\d{1,14}$/; // A simple regex for international phone numbers.

// Validation schema using Yup
const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test("unique-email", "Email is already in use", function (value) {
      const profile = getProfileByEmail(value);
      return !profile;
    }),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z]).{2,}$/, "Must contain 2 uppercase letters")
    .matches(/^(?=.*[0-9]).{2,}$/, "Must contain 2 numbers")
    .matches(/^(?=.*[!@#$%^&*]).{1,}$/, "Must contain 1 special character")
    .min(10, "Password must be at least 10 characters")
    .max(32, "Password must not exceed 32 characters"),
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .notRequired(),
  favoriteColor: Yup.string().required("Favorite color is required"),
});

const CreateProfile = ({ history }) => {
  return (
    <div>
      <h1>Create Profile</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          fullName: "",
          phoneNumber: "",
          favoriteColor: "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          saveProfile(values);
          setSubmitting(false);
          alert("Profile created successfully!");
          // Redirect to login or view profile page as needed
          // history.push('/login');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            <label htmlFor="fullName">Full Name</label>
            <Field name="fullName" type="text" />
            <ErrorMessage name="fullName" component="div" />

            <label htmlFor="phoneNumber">Phone Number</label>
            <Field name="phoneNumber" type="text" />
            <ErrorMessage name="phoneNumber" component="div" />

            <label htmlFor="favoriteColor">Favorite Color</label>
            <Field name="favoriteColor" as="select">
              <option value="">Select a Color</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="black">Black</option>
              <option value="orange">Orange</option>
            </Field>
            <ErrorMessage name="favoriteColor" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProfile;
