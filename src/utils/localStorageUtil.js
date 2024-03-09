const STORAGE_KEY = "userProfiles";
// Mock "API" to do some CRUD operations around user profile based on localStorage
// In a real world scenario, we would be interacting with actual APIs

export const saveProfile = (profile) => {
  const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const newProfiles = profiles.filter((p) => p.email !== profile.email);
  newProfiles.push(profile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfiles));
};

export const getProfileByEmail = (email) => {
  const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return profiles.find((p) => p.email === email);
};

export const deleteProfile = (email) => {
  const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const newProfiles = profiles.filter((p) => p.email !== email);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfiles));
};

export const validateLogin = (email, password) => {
  const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return profiles.find((p) => p.email === email && p.password === password);
};
