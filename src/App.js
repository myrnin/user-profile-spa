import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateProfile from "./components/CreateProfile";
// import ViewProfile from "./components/ViewProfile";
// import EditProfile from "./components/EditProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        {/* <Route path="/view-profile" element={<ViewProfile />} /> */}
        {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
