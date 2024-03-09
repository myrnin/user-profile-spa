import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveProfile, getProfileByEmail } from "../utils/localStorageUtil"; // Adjust the import path as necessary

// Validation Schema
const EditProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z]).{2,}/, "Must contain at least 2 uppercase letters")
    .matches(/^(?=.*[0-9]).{2,}/, "Must contain at least 2 numbers")
    .matches(
      /^(?=.*[!@#$%^&*]).{1,}/,
      "Must contain at least 1 special character"
    )
    .min(10, "Password must be at least 10 characters long")
    .max(32, "Password must not exceed 32 characters"),
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters long")
    .required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .nullable(),
  favoriteColor: Yup.string().required("Favorite color is required"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log({ location });

  const { email: userEmail } = location.state || {};

  const profile = getProfileByEmail(userEmail);

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div>
      <h1>Edit {profile.fullName}'s Profile</h1>
      <Formik
        initialValues={{
          email: profile.email,
          password: profile.password,
          fullName: profile.fullName,
          phoneNumber: profile.phoneNumber || "",
          favoriteColor: profile.favoriteColor,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          saveProfile(values);
          setSubmitting(false);
          alert("Profile updated successfully!");
          navigate("/view-profile", { state: { email: profile.email } }); // Redirect to the ViewProfile page or adjust as needed
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" disabled />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field name="fullName" type="text" />
              <ErrorMessage
                name="fullName"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field name="phoneNumber" type="text" />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
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
              <ErrorMessage
                name="favoriteColor"
                component="div"
                className="errorMessage"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
