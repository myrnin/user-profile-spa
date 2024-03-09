import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProfile, getProfileByEmail } from "../utils/localStorageUtil"; // Adjust the import path as necessary

const DeleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure and rename `email` to `userEmail`
  const { email: userEmail } = location.state || {};

  useEffect(() => {
    const handleDelete = () => {
      // Check if we actually have a user email to delete
      if (!userEmail) {
        alert("No profile specified for deletion.");
        navigate("/"); // Redirect somewhere relevant in case of error
        return;
      }

      const profileExists = getProfileByEmail(userEmail);
      if (!profileExists) {
        alert("Profile not found.");
        navigate("/"); // Redirect as appropriate
        return;
      }

      // Confirm deletion with the user
      const confirmed = window.confirm(
        "Are you sure you want to delete this profile?"
      );
      if (confirmed) {
        deleteProfile(userEmail);
        alert("Profile deleted successfully.");
        navigate("/"); // Redirect to the homepage or login page
      } else {
        navigate(-1); // Go back to the previous page if not confirmed
      }
    };

    handleDelete();
  }, [navigate, userEmail]); // Only run on component mount and when userEmail changes

  // Since the deletion is handled within useEffect, we might not need to render anything
  // or just a simple message indicating the process is happening.
  return <div>Deleting profile...</div>;
};

export default DeleteProfile;
