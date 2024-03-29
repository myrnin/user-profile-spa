import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfileByEmail } from "../utils/localStorageUtil"; // Adjust the import path as necessary

const ViewProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log({ location });
  const { email: userEmail } = location.state || {};

  const profile = getProfileByEmail(userEmail);

  if (!profile) {
    return <div>No profile found</div>;
  }

  const { email, fullName, phoneNumber, favoriteColor } = profile;

  return (
    <div style={{ color: favoriteColor }}>
      <h1>{`${fullName} Profile`}</h1>
      <p>Email: {email}</p>
      <p>Phone Number: {phoneNumber}</p>
      <p>Favorite Color: {favoriteColor}</p>
      <button onClick={() => navigate("/edit-profile", { state: { email } })}>
        Edit Profile
      </button>
      <button onClick={() => navigate("/delete-profile", { state: { email } })}>
        Delete Profile
      </button>
    </div>
  );
};

export default ViewProfile;
